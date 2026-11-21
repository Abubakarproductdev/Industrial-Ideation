// ─────────────────────────────────────────────────────────────────────
// Industrial Ideation — site content
// Every image and video referenced here lives in /public.
// ─────────────────────────────────────────────────────────────────────

// Fill these in to show the mail / Instagram / LinkedIn icons in the
// footer and menu. Empty values are hidden automatically.
export const contact = {
  email: "",
  instagram: "",
  linkedin: "",
};

export const categories = [
  { id: "manufacturing", label: "Manufacturing Design" },
  { id: "rendering", label: "Blender Studio" },
  { id: "prototype", label: "Prototyping" },
];

export const categoryLabel = (id) =>
  categories.find((c) => c.id === id)?.label ?? id;

const boat = (n) =>
  `/BoatDesign/Leisure Boat ZD 12.8 Closed Deck - V2-Upgrade 1 - Image ${n}.jpg`;

export const projects = [
  // ── Blender Studio ────────────────────────────────────────────────
  {
    slug: "boat-design",
    title: "Leisure Boat ZD 12.8",
    category: "rendering",
    tag: "rendering",
    description:
      "An exceptional leisure boat featuring a closed deck design, prioritising both aerodynamics and passenger comfort. Model V2-Upgrade 1 showcases refined hull lines and a modern aesthetic suited for luxury cruising.",
    cover: boat(14),
    media: [
      boat(1), boat("2-B"), boat(3), boat(4), boat(5), boat(7), boat(8),
      boat(9), boat(10), boat(11), boat(12), boat(13), boat(14),
    ],
    caseStudy: [
      { title: "Focus", content: "High-end visualisation for presentation and product storytelling." },
      { title: "Work", list: ["Surface modelling review", "Realistic materials", "Lighting and reflection setup", "Presentation-ready camera angles"] },
      { title: "Outcome", content: "A luxury leisure boat concept shown through a complete visual gallery." },
    ],
  },
  {
    slug: "spam-packaging",
    title: "Spam Packaging Design",
    category: "rendering",
    tag: "packaging",
    description:
      "A bold, modern take on traditional packaging — revitalising the brand identity with vibrant graphics and practical, consumer-friendly structure.",
    cover: "/spamPackgingDesign/showing off the jerky.png",
    media: [
      "/spamPackgingDesign/CLOSE UP.png",
      "/spamPackgingDesign/ANIMATION_03.mp4",
      "/spamPackgingDesign/Screenshot 2025-09-15 054011.png",
      "/spamPackgingDesign/logo of the cap facing forward.png",
      "/spamPackgingDesign/showing off the jerky.png",
    ],
    caseStudy: [
      { title: "Goal", content: "Create packaging that is both visually appealing and structurally practical." },
      { title: "Engineering Thinking", list: ["Foldable structure design", "Optimised for mass production (die-cutting process)"] },
      { title: "DFM", list: ["Flat pattern designed for sheet cutting", "Minimised material waste", "Easy fold lines for assembly"] },
      { title: "Outcome", content: "Packaging ready for manufacturing and branding." },
    ],
  },
  {
    slug: "greenhouse",
    title: "GreenHouse Rendering",
    category: "rendering",
    tag: "architecture",
    description:
      "A futuristic, sustainable greenhouse concept — integrating smart environmental controls and optimised natural light, and visually explaining the greenhouse effect through realistic rendering.",
    cover: "/GreenHouse Design/1.jpg",
    media: [
      "/GreenHouse Design/1.jpg",
      "/GreenHouse Design/2.jpg",
      "/GreenHouse Design/3.jpg",
      "/GreenHouse Design/4.jpg",
    ],
    caseStudy: [
      { title: "Goal", content: "Visually explain the greenhouse effect." },
      { title: "Approach", list: ["Scene showing heat trapping", "Light simulation for clarity", "Realistic landscaping and material balance"] },
      { title: "Outcome", content: "A clear educational and presentation render set." },
    ],
  },

  // ── Prototyping ───────────────────────────────────────────────────
  {
    slug: "autofade-trimmer",
    title: "AutoFade Trimmer",
    category: "prototype",
    tag: "product",
    description:
      "A handheld trimmer that automatically adjusts cutting length using a distance-based system for consistent hair fading.",
    cover: "/studio/trimmer-1.jpg",
    media: ["/studio/trimmer-1.jpg", "/studio/trimmer-2.jpg", "/studio/trimmer-3.jpg"],
    caseStudy: [
      { title: "Project Goal", content: "Design a handheld trimmer that automatically adjusts cutting length using a distance-based system to assist in consistent hair fading." },
      { title: "Core Engineering Concept", list: ["Dual motor system", "Motor 1 → blade cutting", "Motor 2 → vertical blade adjustment", "Distance sensor feeds input to adjust blade height"] },
      { title: "Mechanical Design", list: ["Linear motion mechanism (lead screw / guided rail) for blade height control", "Parallel alignment between blade and guide rails to avoid uneven cutting", "Compact motor packaging within a handheld form factor"] },
      { title: "DFM", list: ["Housing split into injection-mouldable halves", "No undercuts → simplified mould design", "Standardised screw bosses for assembly", "Reduced part count to improve assembly time"] },
      { title: "Tolerances & Fits", list: ["Sliding parts → clearance fit (0.1–0.2 mm)", "Motor mounts → tight fit for vibration control", "Blade alignment → high-precision tolerance (~±0.05 mm)"] },
      { title: "Prototyping Plan", list: ["Initial prototype 3D printed in PLA/ABS", "Testing blade movement smoothness, sensor accuracy and grip comfort"] },
      { title: "Key Challenges", list: ["Stability during blade movement", "Vibration from dual motors", "Keeping the internal layout compact"] },
      { title: "Outcome", content: "A working mechanical concept ready for functional prototyping, with a clear upgrade path to electronics integration." },
    ],
  },
  {
    slug: "perfume-bottle",
    title: "Perfume Bottle",
    category: "prototype",
    tag: "product",
    description:
      "An elegant perfume bottle that emphasises minimalist luxury — clear amber glass and restrained metallic accents for a timeless presentation.",
    cover: "/studio/perfume-1.jpg",
    media: ["/studio/perfume-1.jpg", "/studio/perfume-2.jpg", "/studio/perfume-3.jpg"],
    caseStudy: [
      { title: "Goal", content: "Create a perfume bottle presentation that feels minimal, premium and shelf-ready." },
      { title: "Design Direction", list: ["Clear glass massing for luxury cues", "Simple cap and shoulder proportions", "Visuals focused on material and silhouette"] },
      { title: "Confidential Scope", content: "Brand strategy, packaging dimensions and supplier details are private." },
      { title: "Outcome", content: "A refined fragrance bottle concept with restrained styling and premium material emphasis." },
    ],
  },
  {
    slug: "heated-hair-brush",
    title: "Premium Heated Boar Bristle Hair Brush",
    category: "prototype",
    tag: "product",
    description:
      "A premium heated hair brush integrating boar bristles for professional-grade styling at home.",
    cover: "/studio/brush-1.jpg",
    media: ["/studio/brush-1.jpg", "/Brush/2.png"],
    drawings: ["/Brush/drawings.png"],
    caseStudy: [
      { title: "Project Goal", content: "Design a premium heated hair brush with boar bristle styling cues and a manufacturable handheld body." },
      { title: "Engineering Approach", list: ["Handle geometry shaped for grip comfort", "Brush head planned around bristle placement and heat distribution", "Assembly layout supported by drawing documentation"] },
      { title: "Drawings", content: "A public drawing sheet shows the design intent without exposing every private production detail." },
      { title: "Outcome", content: "A polished grooming product with visual styling, CAD direction and supporting drawings." },
    ],
  },
  {
    slug: "waterproof-trash-can",
    title: "Waterproof Car Trash Can",
    category: "prototype",
    tag: "automotive",
    description:
      "A compact, waterproof trash can engineered specifically for automotive interiors.",
    cover: "/studio/trash-1.jpg",
    media: [
      "/studio/trash-1.jpg",
      "/Car Trash Can/image.png",
      "/Car Trash Can/WhatsApp Video 2025-05-18 at 12.27.19 AM.mp4",
      "/Car Trash Can/WhatsApp Image 2025-05-28 at 11.21.27 PM (1).jpeg",
      "/Car Trash Can/WhatsApp Image 2025-05-28 at 11.21.29 PM (1).jpeg",
      "/Car Trash Can/WhatsApp Image 2025-05-28 at 11.21.29 PM.jpeg",
    ],
    caseStudy: [
      { title: "Project Goal", content: "Design a compact waterproof bin suited to automotive interiors and daily use." },
      { title: "Design Approach", list: ["Space-efficient body for car placement", "Water-resistant containment for spills and waste", "Easy access and removal for cleaning"] },
      { title: "Confidential Scope", content: "Detailed drawings, sealing specs and production dimensions are private." },
      { title: "Outcome", content: "A practical car accessory supported by product renders, reference photos and motion media." },
    ],
  },
  {
    slug: "oil-massager",
    title: "Wall-Mounted Massage Oil Sprayer",
    category: "prototype",
    tag: "product",
    description:
      "A wall-mounted oil sprayer combining oil dispensing and massage in one ergonomic device, with a precision dispenser for controlled application.",
    cover: "/OilMessager/untitled.10.png",
    media: [
      "/OilMessager/untitled.12.png",
      "/OilMessager/untitled.10.png",
      "/OilMessager/untitled.11.png",
      "/studio/oil-1.jpg",
    ],
    caseStudy: [
      { title: "Goal", content: "Combine oil dispensing and massage in one device." },
      { title: "Mechanical Design", list: ["Internal oil chamber", "Roller mechanism for even spreading", "Controlled flow outlet"] },
      { title: "DFM", list: ["Leak-proof sealing design", "Threaded or snap-fit assembly", "Designed for plastic moulding"] },
      { title: "Challenges", list: ["Preventing leakage", "Smooth roller motion"] },
      { title: "Outcome", content: "A concept ready for prototyping with a clear internal layout." },
    ],
  },
  {
    slug: "smart-infant-chair",
    title: "Smart Infant Care Chair",
    category: "prototype",
    tag: "product",
    description:
      "A smart infant care chair concept with integrated sensors and ergonomic support for child safety.",
    cover: "/child infant chair/1.png",
    media: [
      "/child infant chair/3.png",
      "/child infant chair/new (1).mp4",
      "/child infant chair/1.png",
      "/child infant chair/2.png",
      "/studio/chair-1.jpg",
    ],
    caseStudy: [
      { title: "Project Goal", content: "Prototype a smart infant care chair with a supportive form and product-grade presentation." },
      { title: "Design Approach", list: ["Stable structure for infant support", "Soft visual language suited to care environments", "Video added to show the mechanism clearly"] },
      { title: "Confidential Scope", content: "Sensor layout, safety validation, electronics and exact dimensions are confidential." },
      { title: "Outcome", content: "A smart care product represented through renders and a video preview." },
    ],
  },
  {
    slug: "golf-putting-tool",
    title: "Golf Putting Improvement Tool",
    category: "prototype",
    tag: "sport",
    description:
      "Engineering drawings and a physical prototype for a tool that improves golf putting accuracy.",
    cover: "/golf Pudding pRACTICE TOOL/1.png",
    media: [
      "/golf Pudding pRACTICE TOOL/1.png",
      "/golf Pudding pRACTICE TOOL/2.png",
      "/golf Pudding pRACTICE TOOL/3.png",
    ],
    drawings: ["/golf Pudding pRACTICE TOOL/DRAWING.png"],
    caseStudy: [
      { title: "Project Goal", content: "Build a practice aid that helps golfers develop consistent putting alignment and stroke control." },
      { title: "Prototype Approach", list: ["Ground contact for reliable positioning", "Simple training geometry", "Drawing sheet communicating the core mechanical idea"] },
      { title: "Drawings", content: "A public drawing is included for clarity; detailed tolerances and manufacturing notes remain private." },
      { title: "Outcome", content: "A prototype-ready putting tool with visuals and drawing support." },
    ],
  },
  {
    slug: "window-clamp-arcaswiss",
    title: "3D Printed Window Clamp on ArcaSwiss Plate",
    category: "prototype",
    tag: "accessory",
    description:
      "A precision 3D printed window clamp designed to interface with ArcaSwiss plate mounting systems.",
    cover: "/5.jpg",
    media: ["/5.jpg"],
    caseStudy: [
      { title: "Project Goal", content: "A compact 3D printed clamp that mounts securely to a window using an ArcaSwiss-style plate." },
      { title: "Design Focus", list: ["Strong clamping geometry", "Compact printed form", "Mounting interface alignment for camera or accessory use"] },
      { title: "Confidential Scope", content: "Exact dimensions, clamp force targets and print settings are private." },
      { title: "Outcome", content: "A functional prototype intended for quick iteration and real-world mounting tests." },
    ],
  },
  {
    slug: "miswak-holder",
    title: "Miswak Holder",
    category: "prototype",
    tag: "everyday carry",
    description:
      "A hygienic, portable miswak holder designed for everyday carry and storage.",
    cover: "/miswak holder/2.png",
    media: ["/miswak holder/2.png"],
    caseStudy: [
      { title: "Project Goal", content: "A hygienic holder for carrying and storing miswak, simple and portable." },
      { title: "Design Approach", list: ["Slim protective body", "Ventilation and cleanliness for daily use", "Minimal exterior for pocket or bag carry"] },
      { title: "Confidential Scope", content: "Internal dimensions and closure details are private." },
      { title: "Outcome", content: "A compact holder focused on hygiene, portability and clean everyday use." },
    ],
  },

  // ── Manufacturing Design ──────────────────────────────────────────
  {
    slug: "water-bottle-sleeves",
    title: "Water Bottle Sleeve",
    category: "manufacturing",
    tag: "manufacturing",
    description:
      "Durable, stylish protective sleeves for water bottles — improving insulation and grip, designed for real production.",
    cover: "/studio/sleeve-1.jpg",
    media: [
      "/studio/sleeve-1.jpg",
      "/studio/sleeve-2.jpg",
      "/studio/sleeve-3.jpg",
      "/studio/sleeve-4.jpg",
    ],
    caseStudy: [
      { title: "Project Goal", content: "Design a sleeve ready for real production — not just a concept." },
      { title: "Engineering Approach", list: ["Designed from exact bottle dimensions", "Material flexibility considered (silicone / rubber)"] },
      { title: "DFM", list: ["Uniform wall thickness → avoids shrinkage", "Draft angles for mould release", "No sharp internal corners → reduced stress points"] },
      { title: "Tolerances", list: ["Inner diameter slightly undersized for a tight grip fit (~0.5–1 mm interference depending on material)"] },
      { title: "Prototyping", list: ["Flexible material simulation", "Fit testing with the actual bottle"] },
      { title: "Outcome", content: "Delivered production-ready CAD and drawings." },
    ],
  },
  {
    slug: "retractable-marker",
    title: "Retractable Marker",
    category: "manufacturing",
    tag: "manufacturing",
    description:
      "A pressure-control learning tool — the tip retracts under excessive force, helping kids learn controlled writing pressure.",
    cover: "/studio/marker-1.jpg",
    media: ["/studio/marker-1.jpg", "/studio/marker-2.jpg"],
    caseStudy: [
      { title: "Project Goal", content: "A marker that helps kids learn controlled writing pressure using a retractable tip mechanism." },
      { title: "Core Innovation", list: ["Tip retracts slightly when excessive force is applied", "Encourages consistent, light pressure"] },
      { title: "Mechanical System", list: ["Spring-loaded nib mechanism", "Internal guide tube for controlled linear motion", "Stopper system to prevent over-retraction"] },
      { title: "DFM", list: ["Designed for plastic injection moulding", "Snap-fit assembly to reduce screws", "Minimal internal parts → lower cost", "Standard off-the-shelf spring"] },
      { title: "Tolerances & Fits", list: ["Nib → smooth sliding fit (~0.05–0.1 mm clearance)", "Spring compression range carefully calculated", "Seal area → tight tolerance to reduce ink drying"] },
      { title: "Prototyping", list: ["3D printed housing", "Off-the-shelf spring testing", "Iterations on retraction force and writing comfort"] },
      { title: "Key Challenges", list: ["Balancing retraction force", "Preventing ink leakage", "Durability under repeated use"] },
      { title: "Outcome", content: "A functional educational tool combining usability with behavioural learning." },
    ],
  },
  {
    slug: "water-flosser-mold",
    title: "Water Flosser Mould Design",
    category: "manufacturing",
    tag: "tooling",
    description:
      "Injection mould design for a precision water flosser, engineered for mass production.",
    cover: "/quantum.jpg",
    media: ["/quantum.jpg"],
    caseStudy: [
      { title: "Project Goal", content: "A production-minded mould concept for a compact water flosser body with clean external surfacing." },
      { title: "Engineering Focus", list: ["Parting strategy for the moulded housing", "Consistent wall thickness for predictable flow", "Clear service and assembly logic for internal parts"] },
      { title: "Confidential Scope", content: "Detailed mould drawings, internal fit data and tooling decisions are confidential." },
      { title: "Outcome", content: "A portfolio snapshot of a manufacturing-oriented concept prepared for tooling review." },
    ],
  },
  {
    slug: "injection-molding-paintbrush",
    title: "Wand-Style Paintbrush for Injection Moulding",
    category: "manufacturing",
    tag: "tooling",
    description:
      "A wand-style paintbrush designed for injection moulding — an ergonomic grip with efficient manufacturing.",
    cover: "/2.jpg",
    media: ["/2.jpg"],
    caseStudy: [
      { title: "Project Goal", content: "An ergonomic wand-style paintbrush that can move from concept styling to moulded production." },
      { title: "Design Approach", list: ["Grip form shaped for controlled strokes", "Simple body split suited to plastic manufacturing", "Rounded surfaces to reduce stress areas"] },
      { title: "Confidential Scope", content: "Tooling drawings and exact dimensions are private, so only the presentation image is included." },
      { title: "Outcome", content: "A clean concept balancing hand comfort, visual simplicity and manufacturable geometry." },
    ],
  },
  {
    slug: "laser-cutting-sheet-metal",
    title: "Laser-Cut Complex Sheet Metal",
    category: "manufacturing",
    tag: "fabrication",
    description:
      "Complex sheet metal components engineered for precision laser cutting with optimised DFM.",
    cover: "/3.jpg",
    media: ["/3.jpg"],
    caseStudy: [
      { title: "Project Goal", content: "Prepare complex sheet metal geometry for laser cutting while keeping fabrication practical." },
      { title: "DFM Focus", list: ["Cut paths arranged for clean profiles", "Bends and edges considered for downstream forming", "Complexity balanced against fabrication cost"] },
      { title: "Confidential Scope", content: "Flat patterns, tolerances and client manufacturing files are confidential." },
      { title: "Outcome", content: "A fabrication-ready design direction, represented publicly through selected imagery." },
    ],
  },
  {
    slug: "wooden-powerbank",
    title: "Wooden Cost-Saving Powerbank",
    category: "manufacturing",
    tag: "electronics",
    description:
      "An eco-friendly powerbank with a wooden housing that reduces manufacturing cost while keeping a premium feel.",
    cover: "/4.jpg",
    media: ["/4.jpg"],
    caseStudy: [
      { title: "Project Goal", content: "A cost-conscious powerbank enclosure with a warm wooden exterior and simplified construction." },
      { title: "Design Approach", list: ["Minimal external form for a premium feel", "Material choice to reduce production cost", "Compact shell planned around internal electronics"] },
      { title: "Confidential Scope", content: "Internal layout, supplier assumptions and electrical packaging are private." },
      { title: "Outcome", content: "A refined enclosure focused on simplicity, tactility and efficient production." },
    ],
  },
];

// ── Tile settings for the work grids ──────────────────────────────────
// tone:  "dark" = dark image → white hover caption; "light" = black caption
// shape: tile proportion in the Portfolio grid — tall (4:5), square, wide (3:2)
// discipline: line that fades in at the bottom of a tile on hover
const tiles = {
  "boat-design": ["dark", "wide", "3D Visualisation · Rendering"],
  "spam-packaging": ["light", "tall", "Packaging · Rendering"],
  greenhouse: ["dark", "wide", "Architecture · Rendering"],
  "autofade-trimmer": ["dark", "wide", "Product Design · Mechanism"],
  "perfume-bottle": ["light", "tall", "Product Design · Glass"],
  "heated-hair-brush": ["light", "wide", "Product Design · Drawings"],
  "waterproof-trash-can": ["light", "tall", "Product Design · Automotive"],
  "oil-massager": ["dark", "square", "Product Design · Mechanism"],
  "smart-infant-chair": ["light", "wide", "Product Design · Prototype"],
  "golf-putting-tool": ["dark", "wide", "Prototype · Drawings"],
  "window-clamp-arcaswiss": ["dark", "tall", "Prototype · 3D Printing"],
  "miswak-holder": ["dark", "square", "Product Design · Everyday Carry"],
  "water-bottle-sleeves": ["light", "tall", "Manufacturing · DFM"],
  "retractable-marker": ["light", "wide", "Manufacturing · Mechanism"],
  "water-flosser-mold": ["light", "square", "Manufacturing · Mould Design"],
  "injection-molding-paintbrush": ["light", "wide", "Manufacturing · Injection Moulding"],
  "laser-cutting-sheet-metal": ["dark", "tall", "Manufacturing · Laser Cutting"],
  "wooden-powerbank": ["dark", "tall", "Manufacturing · Enclosure"],
};
for (const p of projects) {
  const [tone, shape, discipline] = tiles[p.slug] ?? ["light", "square", categoryLabel(p.category)];
  Object.assign(p, { tone, shape, discipline });
}

// Short label shown first in each tile's tag, e.g. "Prototype · Perfume Bottle"
export const categoryShort = (id) =>
  ({ manufacturing: "Manufacturing", rendering: "Blender Studio", prototype: "Prototype" })[id] ?? id;

// Home page "Featured Work" layout, top to bottom:
//   full = one 16:9 tile across the page
//   tall (4:5) / wide (3:2) = half-width tiles; consecutive half tiles are
//   packed into two gap-free columns (shorter column's tiles grow to fit)
//   fixed: true = never stretch this tile (product would get cropped)
export const featured = [
  { slug: "boat-design", size: "full" },
  { slug: "perfume-bottle", size: "tall" },
  { slug: "heated-hair-brush", size: "wide", fixed: true },
  { slug: "spam-packaging", size: "tall" },
  { slug: "waterproof-trash-can", size: "tall" },
  { slug: "autofade-trimmer", size: "full" },
  { slug: "water-bottle-sleeves", size: "tall" },
  { slug: "oil-massager", size: "wide" },
  { slug: "smart-infant-chair", size: "wide", fixed: true },
  { slug: "retractable-marker", size: "full" },
];

export const getProject = (slug) => projects.find((p) => p.slug === slug);

export const isVideo = (src) => /\.(mp4|webm|mov)$/i.test(src);

export const approachSteps = [
  {
    n: "01",
    title: "Research & Brief",
    text: "We start with the problem, not the product: who uses it, where it lives, what it must cost and how it will actually be made. Constraints are defined before a single line is drawn.",
    image: "/8.jpg",
  },
  {
    n: "02",
    title: "Sketch & Ideation",
    text: "Rapid hand sketches explore dozens of directions quickly. The strongest ideas are pushed further in proportion, ergonomics and mechanism.",
    image: "/quantum.webp",
  },
  {
    n: "03",
    title: "CAD & Design for Manufacturing",
    text: "Production-minded CAD from day one — wall thickness, draft angles, parting lines, snap-fits and tolerances are engineered in, not patched on later.",
    image: "/golf Pudding pRACTICE TOOL/DRAWING.png",
  },
  {
    n: "04",
    title: "Prototype & Test",
    text: "3D printed prototypes put the design in hand. We test fit, force, comfort and assembly, then iterate until the mechanism behaves exactly as intended.",
    image: "/nexus.jpg",
  },
  {
    n: "05",
    title: "Render & Deliver",
    text: "Photoreal Blender renders and animation tell the product's story, delivered alongside production-ready CAD and drawings for your manufacturer.",
    image: boat(4),
  },
];

// Interior photography used on the Approach page
export const contextImages = ["/12.jpg", "/7.jpg", "/9.jpg", "/6.jpg", "/10.jpg", "/11.jpg"];

// Old URLs from the previous site → new routes
const legacyCategory = {
  "industrial-manufacturing-designs": "manufacturing",
  "blender-studio": "rendering",
  "prototype-designs": "prototype",
};
const legacyService = {
  boat: "boat-design",
  greenhouse: "greenhouse",
  oilmessager: "oil-massager",
  perfumebottle: "perfume-bottle",
  marker: "retractable-marker",
  spampackaging: "spam-packaging",
  trimmer: "autofade-trimmer",
  waterbottlesleeves: "water-bottle-sleeves",
};
const legacyProject = {
  "water-bottle-sleeves": "water-bottle-sleeves",
  "boat-design": "boat-design",
};

export function legacyRedirect(path, search) {
  const work = path.match(/^\/work\/([^/]+)$/);
  if (work) {
    const project = new URLSearchParams(search).get("project");
    if (project) return `/portfolio/${legacyProject[project] ?? project}`;
    const cat = legacyCategory[decodeURIComponent(work[1])];
    return cat ? `/portfolio?category=${cat}` : "/portfolio";
  }
  const service = path.match(/^\/services\/([^/]+)$/);
  if (service) {
    const slug = legacyService[decodeURIComponent(service[1])];
    return slug ? `/portfolio/${slug}` : "/portfolio";
  }
  return null;
}
