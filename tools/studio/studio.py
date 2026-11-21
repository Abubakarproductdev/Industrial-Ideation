"""
Studio pass — re-stage product renders on a clean, neutral studio backdrop.

No generative AI. Product pixels are never redrawn:
  1. Estimate the original backdrop's light field B (smooth, product excluded).
  2. out = I * (T / B)^alpha   — swap backdrop light B for studio light T.
     alpha = 1 on the backdrop, lower on the product (soft mask), so the
     product keeps its own exposure while the backdrop is relit.
  3. Extend / reframe the canvas with the synthetic backdrop so the product
     sits centred with breathing room at the requested aspect.
  4. Gentle filmic finish + fine grain to unify the set.

usage: python -I studio.py <public_dir> <out_dir> <job_name|all> [--preview]
"""
import sys, os, json
import numpy as np
import cv2

FAMILIES = {
    # base RGB (0-1) at the bright centre, edge falloff (multiplier at corners)
    "paper":    {"rgb": (0.925, 0.922, 0.914), "falloff": 0.90},  # warm-neutral light grey
    "cool":     {"rgb": (0.880, 0.895, 0.905), "falloff": 0.88},  # cool light grey
    "graphite": {"rgb": (0.205, 0.205, 0.207), "falloff": 0.55},  # deep charcoal
}


def load(path):
    im = cv2.imdecode(np.fromfile(path, np.uint8), cv2.IMREAD_UNCHANGED)
    if im.ndim == 3 and im.shape[2] == 4:  # flatten alpha onto white
        a = im[..., 3:4].astype(np.float32) / 255
        im = (im[..., :3].astype(np.float32) * a + 255 * (1 - a)).astype(np.uint8)
    return im[..., ::-1].astype(np.float32) / 255.0  # RGB 0-1


def srgb_to_lin(x):
    return np.where(x <= 0.04045, x / 12.92, ((x + 0.055) / 1.055) ** 2.4)


def lin_to_srgb(x):
    x = np.clip(x, 0, None)
    return np.where(x <= 0.0031308, x * 12.92, 1.055 * np.power(x, 1 / 2.4) - 0.055)


def estimate_backdrop(lin, iters=6, border=0.06):
    """Smooth backdrop light field (linear RGB) via robust normalized convolution
    in log space at low resolution. Returns (B_full, outlier_score_full)."""
    H, W = lin.shape[:2]
    s = 320 / max(H, W)
    small = cv2.resize(lin, (max(8, int(W * s)), max(8, int(H * s))), interpolation=cv2.INTER_AREA)
    h, w = small.shape[:2]
    L = np.log(small + 1e-4)
    # initial weights: border band only
    wgt = np.zeros((h, w), np.float32)
    b = max(2, int(min(h, w) * border))
    wgt[:b, :] = wgt[-b:, :] = 1
    wgt[:, :b] = wgt[:, -b:] = 1
    sigma = 0.11 * np.hypot(h, w)
    for it in range(iters):
        num = cv2.GaussianBlur(L * wgt[..., None], (0, 0), sigma)
        den = cv2.GaussianBlur(wgt, (0, 0), sigma)[..., None] + 1e-6
        fit = num / den
        res = np.abs(L - fit).max(axis=2)
        bg = wgt > 0.5 if it == 0 else res < thr
        mad = np.median(res[bg]) + 1e-3
        thr = max(0.06, 4.0 * mad)
        wgt = (res < thr).astype(np.float32)
        if it < 2:  # keep border trusted early on
            wgt[:b, :] = np.maximum(wgt[:b, :], 0.5)
            wgt[-b:, :] = np.maximum(wgt[-b:, :], 0.5)
        sigma = max(0.06 * np.hypot(h, w), sigma * 0.85)
    B = np.exp(cv2.resize(fit, (W, H), interpolation=cv2.INTER_CUBIC))
    score = cv2.resize(res / thr, (W, H), interpolation=cv2.INTER_LINEAR)
    return B, score


def product_mask(score, lin, B):
    """Soft product mask from outlier score. Shadows (darker, same hue as the
    backdrop) are kept out of the hard product core."""
    m = np.clip((score - 1.0) / 1.5, 0, 1)
    # chroma difference vs backdrop helps separate coloured products from grey shadows
    ratio = (lin + 1e-4) / (B + 1e-4)
    lum = ratio.mean(axis=2, keepdims=True)
    chroma = np.abs(ratio / (lum + 1e-4) - 1).max(axis=2)
    # local edge energy: products have edges, soft shadows don't
    g = cv2.cvtColor(lin_to_srgb(lin).astype(np.float32), cv2.COLOR_RGB2GRAY)
    edges = cv2.GaussianBlur(np.abs(cv2.Laplacian(g, cv2.CV_32F, ksize=3)), (0, 0), 3)
    edges = np.clip(edges / (np.percentile(edges, 99) + 1e-6), 0, 1)
    shadowish = (lum[..., 0] < 0.92) & (chroma < 0.06) & (edges < 0.08)
    m = np.where(shadowish, m * 0.25, m)
    k = max(3, int(0.004 * max(m.shape)) | 1)
    m = cv2.dilate(m, np.ones((k, k), np.uint8))
    m = cv2.GaussianBlur(m, (0, 0), max(2, 0.006 * max(m.shape)))
    return np.clip(m, 0, 1)


def studio_field(H, W, family, level, cx=0.5, cy=0.42):
    """Clean studio light: soft elliptical pool, slightly brighter above centre,
    gentle floor darkening toward the bottom."""
    fam = FAMILIES[family]
    yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)
    nx = (xx / W - cx) / 0.75
    ny = (yy / H - cy) / 0.85
    r = np.sqrt(nx * nx + ny * ny)
    fall = fam["falloff"] + (1 - fam["falloff"]) * np.exp(-(r ** 2) * 1.6)
    floor = 1 - 0.04 * np.clip((yy / H - 0.55) / 0.45, 0, 1)
    base = np.array(fam["rgb"], np.float32) * level
    return srgb_to_lin(np.clip(base[None, None, :] * (fall * floor)[..., None], 0, 1))


def finish(srgb, grain=0.010, seed=7):
    # gentle filmic shoulder on highlights + slight toe lift (soft blacks)
    x = np.clip(srgb, 0, None)
    x = np.where(x > 0.80, 0.80 + (1 - np.exp(-(x - 0.80) / 0.22)) * 0.19, x)
    x = 0.012 + x * (1 - 0.012)
    rng = np.random.default_rng(seed)
    n = rng.normal(0, 1, x.shape[:2]).astype(np.float32)
    n = cv2.GaussianBlur(n, (0, 0), 0.6)
    x = x + n[..., None] * grain
    return np.clip(x, 0, 1)


def process(src_path, job):
    srgb = load(src_path)
    lin = srgb_to_lin(srgb)
    H, W = lin.shape[:2]
    B, score = estimate_backdrop(lin)
    mask = product_mask(score, lin, B)

    # match studio level to the original backdrop brightness, then nudge
    bg_luma = float(np.median(lin_to_srgb(B).mean(axis=2)))
    fam = FAMILIES[job.get("family", "paper")]
    fam_luma = float(np.mean(fam["rgb"]))
    level = job.get("level", 1.0)
    if job.get("match", False):
        level *= bg_luma / fam_luma

    # ── frame: product bbox → canvas at the requested aspect ─────────────
    core = (mask > 0.35).astype(np.uint8)
    ys, xs = np.where(core > 0)
    if len(xs) == 0:
        ys, xs = np.array([0, H - 1]), np.array([0, W - 1])
    x0, x1 = np.percentile(xs, [0.3, 99.7]); y0, y1 = np.percentile(ys, [0.3, 99.7])
    x0, x1, y0, y1 = [float(v) for v in (x0, x1, y0, y1)]
    if "bbox" in job:  # manual bbox in fractions of the source
        bx0, by0, bx1, by1 = job["bbox"]
        x0, x1, y0, y1 = bx0 * W, bx1 * W, by0 * H, by1 * H
    pw, ph = x1 - x0, y1 - y0
    aspect = job.get("aspect", W / H)
    fill = job.get("fill", 0.62)  # product size relative to canvas (limiting dim)
    cw = max(pw / fill, ph * aspect / fill)
    ch = cw / aspect
    ccx = (x0 + x1) / 2 + job.get("dx", 0) * cw
    ccy = (y0 + y1) / 2 + job.get("dy", 0.03) * ch  # sit slightly below centre
    cx0, cy0 = ccx - cw / 2, ccy - ch / 2
    if job.get("mode") == "crop":  # scene-like source: never extend, only crop
        k = min(1.0, W / cw, H / ch)
        cw, ch = cw * k, ch * k
        if cw < W * 0.999 and ch < H * 0.999:  # grow to the largest fitting frame
            g = min(W / cw, H / ch)
            cw, ch = cw * g, ch * g
        cx0 = float(np.clip(ccx - cw / 2, 0, W - cw))
        cy0 = float(np.clip(ccy - ch / 2, 0, H - ch))

    out_long = job.get("long", 2400)
    max_up = job.get("max_up", 1.7)
    scale = min(out_long / max(cw, ch), max_up)
    OW, OH = int(round(cw * scale)), int(round(ch * scale))

    # affine: source -> output canvas
    M = np.float32([[scale, 0, -cx0 * scale], [0, scale, -cy0 * scale]])
    warp = lambda a, interp=cv2.INTER_LANCZOS4: cv2.warpAffine(
        a, M, (OW, OH), flags=interp, borderMode=cv2.BORDER_REPLICATE)
    lin_o = warp(lin)
    B_o = warp(B, cv2.INTER_LINEAR)
    m_o = warp(mask, cv2.INTER_LINEAR)
    inside = cv2.warpAffine(np.ones((H, W), np.float32), M, (OW, OH), flags=cv2.INTER_LINEAR,
                            borderMode=cv2.BORDER_CONSTANT, borderValue=0)
    # feather the seam between original pixels and synthetic extension
    fe = max(3, int(job.get("feather", 0.035) * min(OW, OH)))
    inside = cv2.erode(inside, np.ones((3, 3), np.uint8), iterations=1)
    inside = cv2.GaussianBlur(inside, (0, 0), fe / 2.5)
    inside = np.clip((inside - 0.02) / 0.96, 0, 1)

    # studio field centred on the product
    pcx = ((x0 + x1) / 2 - cx0) / cw
    pcy = ((y0 + y1) / 2 - cy0) / ch
    T = studio_field(OH, OW, job.get("family", "paper"), level, cx=pcx, cy=min(0.5, pcy - 0.05))

    a_prod = job.get("alpha_product", 0.55)
    alpha = 1 - (1 - a_prod) * m_o
    gain = np.power((T + 1e-4) / (B_o + 1e-4), alpha[..., None])
    relit = lin_o * gain
    # outside the source we only have the studio backdrop
    out_lin = relit * inside[..., None] + T * (1 - inside[..., None])

    if job.get("exposure"):
        out_lin *= 2 ** job["exposure"]
    out = lin_to_srgb(out_lin)
    if job.get("sharpen", 0):
        blur = cv2.GaussianBlur(out, (0, 0), 1.2)
        out = out + (out - blur) * job["sharpen"]
    out = finish(out, grain=job.get("grain", 0.010))
    return (out * 255 + 0.5).astype(np.uint8), mask


def main():
    public, outdir, which = sys.argv[1], sys.argv[2], sys.argv[3]
    preview = "--preview" in sys.argv
    jobs = json.load(open(os.path.join(os.path.dirname(__file__), "jobs.json"), encoding="utf-8"))
    os.makedirs(outdir, exist_ok=True)
    for job in jobs:
        if which != "all" and job["out"] not in which.split(","):
            continue
        img, mask = process(os.path.join(public, job["src"]), job)
        bgr = img[..., ::-1]
        if preview:
            s = 900 / max(bgr.shape[:2])
            bgr = cv2.resize(bgr, None, fx=s, fy=s, interpolation=cv2.INTER_AREA)
        params = [cv2.IMWRITE_JPEG_QUALITY, 88, cv2.IMWRITE_JPEG_PROGRESSIVE, 1,
                  cv2.IMWRITE_JPEG_OPTIMIZE, 1]
        path = os.path.join(outdir, job["out"] + ".jpg")
        cv2.imencode(".jpg", bgr, params)[1].tofile(path)
        if not preview:  # grid-sized copy for fast tiles
            s = 1200 / max(bgr.shape[:2])
            small = cv2.resize(bgr, None, fx=s, fy=s, interpolation=cv2.INTER_AREA)
            cv2.imencode(".jpg", small, params)[1].tofile(os.path.join(outdir, job["out"] + "-1200.jpg"))
        if preview:
            m = (cv2.resize(mask, (300, int(300 * mask.shape[0] / mask.shape[1]))) * 255).astype(np.uint8)
            cv2.imwrite(os.path.join(outdir, job["out"] + "_mask.png"), m)
        print(f"{job['out']:28s} {img.shape[1]}x{img.shape[0]}  <- {job['src']}")


if __name__ == "__main__":
    main()
