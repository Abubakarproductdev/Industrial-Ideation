import { Portal, render } from "solid-js/web";
import {
  For,
  Match,
  Show,
  Switch,
  createEffect,
  createMemo,
  createSignal,
  on,
  onCleanup,
  onMount,
  splitProps,
} from "solid-js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import {
  approachSteps,
  categories,
  categoryLabel,
  categoryShort,
  contact,
  contextImages,
  featured,
  getProject,
  isVideo,
  legacyRedirect,
  projects,
} from "./data.js";
import "./styles.css";

gsap.registerPlugin(ScrollTrigger);

const reducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

const asset = (path) => encodeURI(path);

// Studio images ship with a 1200px copy for grids (see tools/studio)
const srcSet = (path) =>
  path.startsWith("/studio/")
    ? `${path.replace(/\.jpg$/, "-1200.jpg")} 1200w, ${path} 2400w`
    : undefined;

// ── Smooth scroll ─────────────────────────────────────────────────────
if ("scrollRestoration" in history) history.scrollRestoration = "manual";

const lenis = reducedMotion
  ? null
  : new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // Measure the scroll limit live: pages render after Lenis starts and
      // change height on every route, so cached dimensions would go stale.
      __experimental__naiveDimensions: true,
    });

if (lenis) {
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

function scrollToY(y, smooth = false) {
  if (lenis) lenis.scrollTo(y, { immediate: !smooth, force: true });
  else window.scrollTo({ top: y, behavior: smooth ? "smooth" : "auto" });
}

function scrollToHash(hash) {
  const el = document.querySelector(hash);
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { offset: -24 });
  else el.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
}

function lockScroll(locked) {
  document.documentElement.classList.toggle("is-locked", locked);
  if (lenis) (locked ? lenis.stop() : lenis.start());
}

// ── Router ────────────────────────────────────────────────────────────
const normalizePath = (p) => (p.length > 1 ? p.replace(/\/+$/, "") : p);
const readLocation = () => ({
  path: normalizePath(window.location.pathname),
  search: window.location.search,
  hash: window.location.hash,
});

const [route, setRoute] = createSignal(readLocation());

function navigate(to, { replace = false } = {}) {
  const prev = route();
  history[replace ? "replaceState" : "pushState"](null, "", to);
  const next = readLocation();
  setRoute(next);
  if (next.path === prev.path && next.search === prev.search) {
    if (next.hash) scrollToHash(next.hash);
    else if (!replace) scrollToY(0, true);
  }
}

window.addEventListener("popstate", () => setRoute(readLocation()));

// Client-side navigation for a plain <a>. Use this directly when the anchor
// needs a directive (use:reveal), since directives don't work on components.
function onLinkClick(e) {
  if (
    e.defaultPrevented ||
    e.button !== 0 ||
    e.metaKey ||
    e.ctrlKey ||
    e.shiftKey ||
    e.altKey
  )
    return;
  const url = new URL(e.currentTarget.href, window.location.origin);
  if (url.origin !== window.location.origin) return;
  e.preventDefault();
  navigate(`${url.pathname}${url.search}${url.hash}`);
}

function Link(props) {
  const [local, rest] = splitProps(props, ["onClick", "children"]);
  const handle = (e) => {
    local.onClick?.(e);
    onLinkClick(e);
  };
  return (
    <a {...rest} onClick={handle}>
      {local.children}
    </a>
  );
}

// ── Scroll reveal (directive: use:reveal={delayMs}) ──────────────────
const revealObserver =
  "IntersectionObserver" in window
    ? new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-in");
              revealObserver.unobserve(entry.target);
            }
          }
        },
        { rootMargin: "0px 0px -6% 0px", threshold: 0.06 },
      )
    : null;

function reveal(el, value) {
  const delay = typeof value === "function" ? value() : 0;
  el.classList.add("reveal");
  if (typeof delay === "number") el.style.setProperty("--d", `${delay}ms`);
  if (!revealObserver || reducedMotion) {
    el.classList.add("is-in");
    return;
  }
  revealObserver.observe(el);
  onCleanup(() => revealObserver.unobserve(el));
}

// gsap.context scoped to a root element, reverted when the component unmounts
function useGsap(getRoot, setup) {
  onMount(() => {
    if (reducedMotion) return;
    const ctx = gsap.context(setup, getRoot());
    onCleanup(() => ctx.revert());
  });
}

// ── Icons ─────────────────────────────────────────────────────────────
function Icon(props) {
  const paths = {
    menu: (
      <>
        <path d="M3 7h18" />
        <path d="M3 12h18" />
        <path d="M3 17h18" />
      </>
    ),
    close: (
      <>
        <path d="M6 6l12 12" />
        <path d="M18 6 6 18" />
      </>
    ),
    "arrow-right": (
      <>
        <path d="M4 12h16" />
        <path d="m14 6 6 6-6 6" />
      </>
    ),
    "arrow-left": (
      <>
        <path d="M20 12H4" />
        <path d="m10 6-6 6 6 6" />
      </>
    ),
    "arrow-up": (
      <>
        <path d="M12 20V4" />
        <path d="m6 10 6-6 6 6" />
      </>
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="1.5" />
        <path d="m3.5 6 8.5 7 8.5-7" />
      </>
    ),
    instagram: (
      <>
        <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" />
      </>
    ),
    linkedin: (
      <>
        <rect x="3.5" y="3.5" width="17" height="17" rx="2" />
        <path d="M8 10.5v6" />
        <path d="M8 7.6v.01" />
        <path d="M12 16.5v-3.6a2.4 2.4 0 0 1 4.8 0v3.6" />
        <path d="M12 10.5v6" />
      </>
    ),
  };
  return (
    <svg
      class={props.class}
      width={props.size ?? 20}
      height={props.size ?? 20}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      {paths[props.name]}
    </svg>
  );
}

const socialLinks = () =>
  [
    contact.email && { name: "mail", label: "Email", href: `mailto:${contact.email}` },
    contact.instagram && { name: "instagram", label: "Instagram", href: contact.instagram },
    contact.linkedin && { name: "linkedin", label: "LinkedIn", href: contact.linkedin },
  ].filter(Boolean);

// ── App shell ─────────────────────────────────────────────────────────
function App() {
  const [menuOpen, setMenuOpen] = createSignal(false);

  const projectSlug = createMemo(() => {
    const m = route().path.match(/^\/portfolio\/([^/]+)$/);
    return m ? decodeURIComponent(m[1]) : null;
  });

  // Redirect URLs from the previous version of the site
  createEffect(() => {
    const { path, search } = route();
    const target = legacyRedirect(path, search);
    if (target) navigate(target, { replace: true });
  });

  // New page → top of page (or #hash), then recalc scroll triggers
  createEffect(
    on(
      () => route().path,
      () => {
        setMenuOpen(false);
        requestAnimationFrame(() => {
          const hash = route().hash;
          if (hash) scrollToHash(hash);
          else scrollToY(0);
          ScrollTrigger.refresh();
        });
      },
      { defer: true },
    ),
  );

  window.addEventListener("load", () => ScrollTrigger.refresh());

  return (
    <>
      <Header onMenu={() => setMenuOpen(true)} menuOpen={menuOpen()} />
      <Menu open={menuOpen()} onClose={() => setMenuOpen(false)} />
      <Switch fallback={<NotFound />}>
        <Match when={route().path === "/"}>
          <Home />
        </Match>
        <Match when={route().path === "/portfolio"}>
          <PortfolioPage />
        </Match>
        <Match when={projectSlug()} keyed>
          {(slug) => <ProjectPage slug={slug} />}
        </Match>
        <Match when={route().path === "/approach"}>
          <ApproachPage />
        </Match>
        <Match when={legacyRedirect(route().path, route().search)}>
          <main class="page" />
        </Match>
      </Switch>
      <Footer />
    </>
  );
}

function usePageTitle(title) {
  createEffect(() => {
    const t = typeof title === "function" ? title() : title;
    document.title = t ? `${t} — Industrial Ideation` : "Industrial Ideation — Industrial Design & Engineering Studio";
  });
}

// ── Header + menu ─────────────────────────────────────────────────────
function Header(props) {
  return (
    <header class="site-header">
      <Link href="/" class="wordmark" aria-label="Industrial Ideation — home">
        Industrial Ideation
      </Link>
      <button
        type="button"
        class="icon-btn"
        aria-label="Open menu"
        aria-expanded={props.menuOpen}
        aria-controls="site-menu"
        onClick={props.onMenu}
      >
        <Icon name="menu" size={22} />
      </button>
    </header>
  );
}

const menuItems = [
  { href: "/", label: "Home" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/approach", label: "Our Approach" },
];

function Menu(props) {
  let panel;
  let closeBtn;
  let lastFocus;

  createEffect(
    on(
      () => props.open,
      (open) => {
        lockScroll(open);
        if (open) {
          lastFocus = document.activeElement;
          requestAnimationFrame(() => closeBtn?.focus());
        } else if (lastFocus) {
          lastFocus.focus?.();
          lastFocus = null;
        }
      },
      { defer: true },
    ),
  );

  const onKey = (e) => {
    if (!props.open) return;
    if (e.key === "Escape") props.onClose();
    if (e.key === "Tab") {
      const focusables = panel.querySelectorAll("a, button");
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  };
  onMount(() => window.addEventListener("keydown", onKey));
  onCleanup(() => window.removeEventListener("keydown", onKey));

  return (
    <div
      id="site-menu"
      ref={panel}
      class="menu"
      classList={{ "is-open": props.open }}
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      aria-hidden={!props.open}
      inert={!props.open ? true : undefined}
    >
      <div class="menu__bar">
        <Link href="/" class="wordmark wordmark--light" onClick={props.onClose}>
          Industrial Ideation
        </Link>
        <button
          ref={closeBtn}
          type="button"
          class="icon-btn icon-btn--light"
          aria-label="Close menu"
          onClick={props.onClose}
        >
          <Icon name="close" size={22} />
        </button>
      </div>
      <nav class="menu__nav" aria-label="Primary">
        <For each={menuItems}>
          {(item, i) => (
            <Link
              href={item.href}
              class="menu__link"
              classList={{ "is-current": route().path === item.href }}
              style={{ "--i": i() }}
              onClick={props.onClose}
            >
              <span class="menu__num">0{i() + 1}</span>
              {item.label}
            </Link>
          )}
        </For>
      </nav>
      <div class="menu__foot">
        <span>Industrial design &amp; engineering studio</span>
        <Show when={socialLinks().length}>
          <div class="social">
            <For each={socialLinks()}>
              {(s) => (
                <a href={s.href} aria-label={s.label} target={s.name === "mail" ? undefined : "_blank"} rel="noreferrer">
                  <Icon name={s.name} size={18} />
                </a>
              )}
            </For>
          </div>
        </Show>
      </div>
    </div>
  );
}

// ── Home ──────────────────────────────────────────────────────────────
function Home() {
  usePageTitle(null);
  const twoCols = useMedia("(min-width: 800px)");
  // Group the featured list into full-width tiles and runs of half tiles
  const blocks = [];
  for (const f of featured) {
    const project = getProject(f.slug);
    if (!project) continue;
    if (f.size === "full") {
      blocks.push({ full: project });
    } else {
      const item = { project, shape: f.size, ar: SHAPE_AR[f.size], fixed: !!f.fixed };
      const last = blocks[blocks.length - 1];
      if (last?.halves) last.halves.push(item);
      else blocks.push({ halves: [item] });
    }
  }
  return (
    <main class="route">
      <Reel />
      <div class="sheet">
        <TitleSection />
        <section class="work" id="work">
          <div class="work__bar">
            <h2 class="work__title">Featured Work</h2>
            <Link href="/portfolio" class="work__all">
              All projects <span class="work__count">{projects.length}</span>
              <Icon name="arrow-right" size={14} />
            </Link>
          </div>
          <div class="feature">
            <For each={blocks}>
              {(block, b) =>
                block.full ? (
                  <Tile project={block.full} class="ar-full" eager={b() === 0} sizes="100vw" />
                ) : (
                  <Masonry
                    cols={twoCols() ? 2 : 1}
                    items={block.halves}
                    sizes="(max-width: 799px) 100vw, 50vw"
                  />
                )
              }
            </For>
          </div>
        </section>
        <About />
      </div>
    </main>
  );
}

// Portrait screens get the 9:16 cut of the reel; follows rotation/resizes
const portraitQuery = window.matchMedia("(max-aspect-ratio: 1/1)");
const [portrait, setPortrait] = createSignal(portraitQuery.matches);
portraitQuery.addEventListener("change", (e) => setPortrait(e.matches));
const reelBase = () =>
  portrait()
    ? "/hero/industrial-ideation-hero-mobile-1080x1920"
    : "/hero/industrial-ideation-hero-1920x1080";
const reelPoster = () =>
  portrait()
    ? "/hero/industrial-ideation-hero-poster-mobile-1080x1920.jpg"
    : "/hero/industrial-ideation-hero-poster-1920x1080.jpg";

function Reel() {
  let section;
  let inner;
  let shade;
  let meta;
  let video;

  onMount(() => {
    video.muted = true;
    video.defaultMuted = true;
    if (!reducedMotion) video.play().catch(() => {});

    // Pause the reel while it's off-screen
    const io = new IntersectionObserver(([entry]) => {
      if (reducedMotion) return;
      if (entry.isIntersecting) video.play().catch(() => {});
      else video.pause();
    });
    io.observe(section);
    onCleanup(() => io.disconnect());
  });

  // Swap to the other cut when the screen changes orientation
  createEffect(
    on(
      portrait,
      () => {
        video.load();
        if (!reducedMotion) video.play().catch(() => {});
      },
      { defer: true },
    ),
  );

  useGsap(
    () => section,
    () => {
      const st = {
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: true,
      };
      gsap.to(inner, { yPercent: 38, scale: 1.06, ease: "none", scrollTrigger: st });
      gsap.to(shade, { opacity: 1, ease: "none", scrollTrigger: st });
      gsap.to(meta, {
        opacity: 0,
        y: -40,
        ease: "none",
        scrollTrigger: { ...st, end: "35% top" },
      });
    },
  );

  return (
    <section class="reel" ref={section} aria-label="Industrial Ideation showreel">
      <div class="reel__inner" ref={inner}>
        <video
          ref={video}
          class="reel__video"
          autoplay
          muted
          loop
          playsinline
          preload="auto"
          poster={reelPoster()}
          aria-hidden="true"
        >
          <source src={`${reelBase()}.webm`} type="video/webm" />
          <source src={`${reelBase()}.mp4`} type="video/mp4" />
        </video>
      </div>
      <div class="reel__shade" ref={shade} />
      <div class="reel__meta" ref={meta}>
        <p class="reel__tag">
          Industrial design
          <br />
          &amp; engineering studio
        </p>
        <button
          type="button"
          class="reel__scroll"
          onClick={() => scrollToY(section.offsetHeight, true)}
        >
          Scroll
          <span class="reel__line" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}

function TitleSection() {
  let root;
  let l1;
  let l2;

  useGsap(
    () => root,
    () => {
      // Blur-in as the heading arrives
      gsap.fromTo(
        [l1, l2],
        { opacity: 0, filter: "blur(22px)", y: 60 },
        {
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
          duration: 1.4,
          ease: "expo.out",
          stagger: 0.12,
          scrollTrigger: { trigger: root, start: "top 72%" },
        },
      );
      // Words drift apart while scrolling past
      const st = { trigger: root, start: "top top", end: "bottom top", scrub: 0.6 };
      gsap.to(l1, { xPercent: -26, yPercent: -40, ease: "none", scrollTrigger: st });
      gsap.to(l2, { xPercent: 26, yPercent: -10, ease: "none", scrollTrigger: st });
    },
  );

  return (
    <section class="title" ref={root}>
      <h1 class="title__h">
        <span class="title__line" ref={l1}>
          Industrial
        </span>
        <span class="title__line" ref={l2}>
          Ideation
        </span>
      </h1>
    </section>
  );
}

function About() {
  return (
    <section class="section about" id="about">
      <div class="about__body">
        <h2 class="h2" use:reveal>
          About Industrial Ideation
        </h2>
        <p use:reveal={60}>
          Industrial Ideation is an industrial design and engineering studio
          specialising in innovative, functional product design. With a portfolio
          that runs from moulded consumer goods to luxury boats, we combine
          creativity with technical expertise to deliver products that can
          actually be made.
        </p>
        <p use:reveal={120}>
          Our team is passionate about solving complex problems through
          thoughtful design. We work closely with our clients — from first sketch
          to production-ready CAD, prototypes and photoreal renders — to
          understand their needs and bring their vision to life.
        </p>
        <div use:reveal={180}>
          <Link href="/approach" class="link-under">
            Learn about our approach <Icon name="arrow-right" size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ── Masonry (gap-free columns) ────────────────────────────────────────
function useMedia(query) {
  const mq = window.matchMedia(query);
  const [matches, setMatches] = createSignal(mq.matches);
  const onChange = (e) => setMatches(e.matches);
  mq.addEventListener("change", onChange);
  onCleanup(() => mq.removeEventListener("change", onChange));
  return matches;
}

const SHAPE_AR = { tall: 0.8, square: 1, wide: 1.5 };

// Items go into the currently shortest column (by aspect-ratio height),
// so columns stay balanced. Columns stretch to equal height in CSS and the
// non-fixed tiles of shorter columns grow slightly — no white gaps.
function Masonry(props) {
  const columns = createMemo(() => {
    const cols = Array.from({ length: props.cols }, () => ({ h: 0, items: [] }));
    props.items.forEach((item, i) => {
      const target = cols.reduce((a, b) => (b.h < a.h - 1e-6 ? b : a));
      target.items.push({ ...item, i });
      target.h += 1 / item.ar;
    });
    return cols;
  });
  return (
    <div class="masonry" style={{ "--cols": props.cols }}>
      <For each={columns()}>
        {(col, c) => (
          <div class="masonry__col">
            <For each={col.items}>
              {(item, r) => (
                <Tile
                  project={item.project}
                  class={`ar-${item.shape}${item.fixed ? " is-fixed" : ""}`}
                  eager={item.i < (props.eagerCount ?? 0)}
                  delay={c() * 70 + r() * 20}
                  sizes={props.sizes}
                />
              )}
            </For>
          </div>
        )}
      </For>
    </div>
  );
}

// ── Work tile (shared by Featured Work and Portfolio) ────────────────
function Tile(props) {
  const p = props.project;
  let text;
  // Long tags scroll sideways on hover instead of being cut off
  const measure = () => {
    const over = text.scrollWidth - text.clientWidth;
    text.classList.toggle("is-overflow", over > 0);
    text.style.setProperty("--shift", `${-(over + 6)}px`);
  };
  return (
    <a
      href={`/portfolio/${p.slug}`}
      class="tile"
      // classList (not class) so the reveal directive's classes survive
      classList={{ [props.class ?? ""]: !!props.class, "tile--dark": p.tone === "dark" }}
      onClick={onLinkClick}
      onMouseEnter={measure}
      use:reveal={props.delay ?? 0}
    >
      <div class="tile__media">
        <img
          srcset={srcSet(p.cover)}
          sizes={props.sizes ?? "(max-width: 799px) 100vw, 50vw"}
          src={asset(p.cover)}
          alt=""
          loading={props.eager ? "eager" : "lazy"}
          decoding="async"
          style={p.focus ? { "object-position": p.focus } : undefined}
        />
      </div>
      <div class="tile__ui">
        <span class="chip">
          <span class="chip__text" ref={text}>
            <span class="chip__track">
              <span>{categoryShort(p.category)}</span>
              <span class="chip__dot" aria-hidden="true">
                ·
              </span>
              <span>{p.title}</span>
            </span>
          </span>
          <Icon name="arrow-right" size={12} class="chip__arrow" />
        </span>
        <span class="tile__meta">{p.discipline}</span>
      </div>
    </a>
  );
}

// ── Portfolio ─────────────────────────────────────────────────────────
function PortfolioPage() {
  usePageTitle("Portfolio");
  const [query, setQuery] = createSignal("");
  const four = useMedia("(min-width: 1101px)");
  const three = useMedia("(min-width: 800px)");
  const two = useMedia("(min-width: 521px)");
  const cols = () => (four() ? 4 : three() ? 3 : two() ? 2 : 1);
  const tabs = [
    { id: "all", label: "All" },
    { id: "manufacturing", label: "Manufacturing" },
    { id: "rendering", label: "Rendering" },
    { id: "prototype", label: "Prototype" },
  ];
  const countFor = (id) =>
    id === "all" ? projects.length : projects.filter((p) => p.category === id).length;

  const active = createMemo(() => {
    const c = new URLSearchParams(route().search).get("category");
    return categories.some((x) => x.id === c) ? c : "all";
  });
  const items = createMemo(() => {
    const q = query().trim().toLowerCase();
    return projects.filter(
      (p) =>
        (active() === "all" || p.category === active()) &&
        (!q ||
          [p.title, p.discipline, p.tag, categoryLabel(p.category), p.description]
            .join(" ")
            .toLowerCase()
            .includes(q)),
    );
  });

  const select = (id) =>
    navigate(id === "all" ? "/portfolio" : `/portfolio?category=${id}`, { replace: true });

  const placeholder = () =>
    active() === "all" ? "Search projects" : `Search ${categoryLabel(active())}`;

  return (
    <main class="page route portfolio">
      <h1 class="sr-only">Portfolio</h1>
      <div class="controls">
        <div class="seg" role="tablist" aria-label="Filter projects">
          <For each={tabs}>
            {(t) => (
              <button
                type="button"
                role="tab"
                aria-selected={active() === t.id}
                class="seg__btn"
                classList={{ "is-active": active() === t.id }}
                onClick={() => select(t.id)}
              >
                <span>{t.label}</span>
                <span class="seg__count">{countFor(t.id)}</span>
              </button>
            )}
          </For>
        </div>
        <label class="search">
          <span class="sr-only">Search projects</span>
          <input
            type="search"
            placeholder={placeholder()}
            value={query()}
            onInput={(e) => setQuery(e.currentTarget.value)}
          />
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true">
            <circle cx="10.5" cy="10.5" r="6.5" />
            <path d="m20 20-4.8-4.8" />
          </svg>
        </label>
      </div>

      <Show
        when={items().length}
        fallback={
          <div class="empty">
            <p>No projects match “{query()}”.</p>
            <button type="button" class="link-under" onClick={() => setQuery("")}>
              Clear search
            </button>
          </div>
        }
      >
        <div class="all-grid">
          <Masonry
            cols={cols()}
            items={items().map((p) => ({
              project: p,
              shape: p.shape,
              ar: SHAPE_AR[p.shape],
              fixed: p.shape === "wide", // wide shots crop badly when stretched
            }))}
            eagerCount={4}
            sizes="(max-width: 520px) 100vw, (max-width: 799px) 50vw, (max-width: 1100px) 33vw, 25vw"
          />
        </div>
      </Show>
    </main>
  );
}

// ── Project detail ────────────────────────────────────────────────────
function ProjectPage(props) {
  const project = getProject(props.slug);
  usePageTitle(project?.title ?? "Not found");
  if (!project) return <NotFound />;

  const index = projects.indexOf(project);
  const next = projects[(index + 1) % projects.length];
  const gallery = project.media.filter((m) => m !== project.cover);
  const viewable = [project.cover, ...gallery, ...(project.drawings ?? [])].filter(
    (m) => !isVideo(m),
  );
  const [lightbox, setLightbox] = createSignal(-1);
  const open = (src) => setLightbox(viewable.indexOf(src));

  return (
    <main class="page route project">
      <header class="project__head">
        <a href={`/portfolio?category=${project.category}`} class="back" onClick={onLinkClick} use:reveal>
          <Icon name="arrow-left" size={16} /> {categoryLabel(project.category)}
        </a>
        <h1 class="project__title" use:reveal={60}>
          {project.title}
        </h1>
        <p class="project__lede" use:reveal={120}>
          {project.description}
        </p>
      </header>

      <figure class="project__cover" use:reveal>
        <button type="button" class="zoom" onClick={() => open(project.cover)} aria-label="View image full screen">
          <img src={asset(project.cover)} alt={project.title} decoding="async" />
        </button>
      </figure>

      <section class="case">
        <h2 class="case__label" use:reveal>
          Case study
        </h2>
        <dl class="case__list">
          <For each={project.caseStudy}>
            {(row) => (
              <div class="case__row" use:reveal>
                <dt>{row.title}</dt>
                <dd>
                  <Show when={row.list} fallback={<p>{row.content}</p>}>
                    <ul>
                      <For each={row.list}>{(li) => <li>{li}</li>}</For>
                    </ul>
                  </Show>
                </dd>
              </div>
            )}
          </For>
        </dl>
      </section>

      <Show when={gallery.length}>
        <section class="gallery">
          <For each={gallery}>
            {(src, i) => (
              <figure class="gallery__item" classList={{ "is-wide": i() % 3 === 0 }} use:reveal={(i() % 2) * 80}>
                <Show
                  when={isVideo(src)}
                  fallback={
                    <button type="button" class="zoom" onClick={() => open(src)} aria-label="View image full screen">
                      <img src={asset(src)} alt={`${project.title} — view ${i() + 2}`} loading="lazy" decoding="async" />
                    </button>
                  }
                >
                  <video src={asset(src)} autoplay muted loop playsinline preload="metadata" />
                </Show>
              </figure>
            )}
          </For>
        </section>
      </Show>

      <Show when={project.drawings?.length}>
        <section class="drawings">
          <h2 class="case__label" use:reveal>
            Drawings
          </h2>
          <For each={project.drawings}>
            {(src) => (
              <figure class="drawings__item" use:reveal>
                <button type="button" class="zoom" onClick={() => open(src)} aria-label="View drawing full screen">
                  <img src={asset(src)} alt={`${project.title} — technical drawing`} loading="lazy" decoding="async" />
                </button>
              </figure>
            )}
          </For>
        </section>
      </Show>

      <Link href={`/portfolio/${next.slug}`} class="next">
        <span class="next__label">Next project</span>
        <span class="next__title">
          {next.title} <Icon name="arrow-right" size={28} />
        </span>
      </Link>

      <Lightbox images={viewable} index={lightbox()} setIndex={setLightbox} title={project.title} />
    </main>
  );
}

function Lightbox(props) {
  let closeBtn;
  const isOpen = () => props.index >= 0;
  const step = (d) =>
    props.setIndex((props.index + d + props.images.length) % props.images.length);

  createEffect(
    on(isOpen, (open) => {
      lockScroll(open);
      if (open) requestAnimationFrame(() => closeBtn?.focus());
    }, { defer: true }),
  );
  onCleanup(() => lockScroll(false));

  const onKey = (e) => {
    if (!isOpen()) return;
    if (e.key === "Escape") props.setIndex(-1);
    if (e.key === "ArrowRight") step(1);
    if (e.key === "ArrowLeft") step(-1);
  };
  onMount(() => window.addEventListener("keydown", onKey));
  onCleanup(() => window.removeEventListener("keydown", onKey));

  return (
    <Show when={isOpen()}>
      <Portal>
      <div class="lightbox" role="dialog" aria-modal="true" aria-label={`${props.title} gallery`}>
        <img src={asset(props.images[props.index])} alt={`${props.title} — image ${props.index + 1}`} />
        <div class="lightbox__bar">
          <span>
            {props.index + 1} / {props.images.length}
          </span>
          <div class="lightbox__ctrls">
            <Show when={props.images.length > 1}>
              <button type="button" class="icon-btn icon-btn--light" aria-label="Previous image" onClick={() => step(-1)}>
                <Icon name="arrow-left" />
              </button>
              <button type="button" class="icon-btn icon-btn--light" aria-label="Next image" onClick={() => step(1)}>
                <Icon name="arrow-right" />
              </button>
            </Show>
            <button ref={closeBtn} type="button" class="icon-btn icon-btn--light" aria-label="Close gallery" onClick={() => props.setIndex(-1)}>
              <Icon name="close" />
            </button>
          </div>
        </div>
      </div>
      </Portal>
    </Show>
  );
}

// ── Approach ──────────────────────────────────────────────────────────
function ApproachPage() {
  usePageTitle("Our Approach");
  return (
    <main class="page route approach">
      <section class="page-head">
        <h1 class="h1" use:reveal>
          Our Approach
        </h1>
        <p class="lede" use:reveal={80}>
          From the first sketch to the production line. Every product we design
          is engineered to be made — beautiful on screen, and practical on the
          factory floor.
        </p>
      </section>

      <ol class="steps">
        <For each={approachSteps}>
          {(s, i) => (
            <li class="step" classList={{ "is-flip": i() % 2 === 1 }}>
              <div class="step__text" use:reveal>
                <span class="step__n">{s.n}</span>
                <h2 class="h2">{s.title}</h2>
                <p>{s.text}</p>
              </div>
              <figure class="step__media" use:reveal={100}>
                <img src={asset(s.image)} alt={s.title} loading="lazy" decoding="async" />
              </figure>
            </li>
          )}
        </For>
      </ol>

      <section class="section contexts">
        <div class="section__head">
          <h2 class="h2" use:reveal>
            Designed for real spaces
          </h2>
          <p class="muted" use:reveal={80}>
            Products earn their place in homes, cars and workshops.
          </p>
        </div>
        <div class="contexts__grid">
          <For each={contextImages}>
            {(src, i) => (
              <figure class="contexts__item" use:reveal={(i() % 3) * 80}>
                <img src={asset(src)} alt="" loading="lazy" decoding="async" />
              </figure>
            )}
          </For>
        </div>
      </section>

      <section class="section cta">
        <p class="muted" use:reveal>
          See it in practice
        </p>
        <a href="/portfolio" class="cta__link" onClick={onLinkClick} use:reveal={80}>
          View the portfolio <Icon name="arrow-right" size={40} />
        </a>
      </section>
    </main>
  );
}

function NotFound() {
  usePageTitle("Page not found");
  return (
    <main class="page route notfound">
      <h1 class="h1">Page not found</h1>
      <p class="muted">The page you're looking for has moved or doesn't exist.</p>
      <Link href="/" class="link-under">
        Back to home <Icon name="arrow-right" size={16} />
      </Link>
    </main>
  );
}

// ── Footer ────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer class="footer">
      <div class="footer__top">
        <div class="footer__brand">
          <Link href="/" class="footer__logo" aria-label="Industrial Ideation — home">
            <img src="/logo.png" alt="" width="44" height="44" />
            <span>Industrial Ideation</span>
          </Link>
          <p>
            An industrial design studio with a strong portfolio of
            manufacturable products and a history of satisfied clients.
          </p>
        </div>
        <nav class="footer__nav" aria-label="Footer">
          <For each={menuItems}>
            {(item) => (
              <Link href={item.href} class="footer__link">
                {item.label}
              </Link>
            )}
          </For>
        </nav>
        <Show when={socialLinks().length}>
          <div class="social">
            <For each={socialLinks()}>
              {(s) => (
                <a href={s.href} aria-label={s.label} target={s.name === "mail" ? undefined : "_blank"} rel="noreferrer">
                  <Icon name={s.name} size={18} />
                </a>
              )}
            </For>
          </div>
        </Show>
      </div>
      <div class="footer__bottom">
        <p>© {new Date().getFullYear()} Industrial Ideation. All rights reserved.</p>
        <button type="button" class="footer__top-btn" onClick={() => scrollToY(0, true)}>
          Back to top <Icon name="arrow-up" size={14} />
        </button>
      </div>
    </footer>
  );
}

render(() => <App />, document.getElementById("root"));
