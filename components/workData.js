export const workCategories = {
  "industrial-manufacturing-designs": {
    title: "Industrial Manufacturing Designs",
    description: "Our core engineering and mechanical design portfolio — from mold design to sheet metal and cost-saving manufacturing solutions.",
    projects: [
      {
        id: "water-bottle-sleeves",
        title: "Water Bottle Sleeve Design",
        description: "Durable and stylish protective sleeves for water bottles, designed for real production.",
        coverImage: "/waterbottlesleeves/no2.png",
        images: [
          "/waterbottlesleeves/no2.png",
          "/waterbottlesleeves/no3.jpeg",
          "/waterbottlesleeves/no4.png"
        ],
        caseStudy: [
          { title: "Project Goal", content: "Design a sleeve ready for real production (not just concept)." },
          { title: "Engineering Approach", list: ["Designed based on exact bottle dimensions", "Considered material flexibility (silicone / rubber)"] },
          { title: "DFM", list: ["Uniform wall thickness → avoids shrinkage issues", "Draft angles added for mold release", "No sharp internal corners → reduces stress points"] },
          { title: "Tolerances", list: ["Inner diameter slightly smaller for tight grip fit (~0.5–1 mm interference depending on material)"] },
          { title: "Prototyping", list: ["Flexible material simulation", "Fit testing with actual bottle"] },
          { title: "Outcome", content: "Delivered production-ready CAD + drawings" }
        ]
      },
      {
        id: "retractable-marker",
        title: "Retractable Marker",
        description: "A pressure-control learning tool designed to help kids learn controlled writing pressure.",
        coverImage: "/marker/5.png",
        images: [
          "/marker/5.png",
          "/marker/fourth.png"
        ],
        caseStudy: [
          { title: "Project Goal", content: "Design a marker that helps kids learn controlled writing pressure using a retractable tip mechanism." },
          { title: "Core Innovation", list: ["Marker tip retracts slightly when excessive force is applied", "Encourages kids to maintain consistent and light pressure"] },
          { title: "Mechanical System", list: ["Spring-loaded nib mechanism", "Internal guide tube for controlled linear motion", "Stopper system to prevent over-retraction"] },
          { title: "DFM Considerations", list: ["Designed for plastic injection molding", "Snap-fit assembly to reduce screws", "Minimal internal parts → lower cost", "Standard spring component (off-the-shelf)"] },
          { title: "Tolerances & Fits", list: ["Nib movement → smooth sliding fit (~0.05–0.1 mm clearance)", "Spring compression range carefully calculated", "Seal area → tight tolerance to reduce ink drying"] },
          { title: "Prototyping", list: ["3D printed housing", "Off-the-shelf spring testing", "Iterations based on: Force required to retract tip, Writing comfort"] },
          { title: "Key Challenges", list: ["Balancing retraction force (not too soft, not too hard)", "Preventing ink leakage", "Maintaining durability with repeated use"] },
          { title: "Outcome", content: "A functional educational tool concept combining usability + behavioral learning." }
        ]
      },
      {
        id: "water-flosser-mold",
        title: "Water Flosser Mold Design",
        description: "Injection mold design for a precision water flosser, engineered for mass production.",
        coverImage: "/quantum.jpg",
        images: [
          "/quantum.jpg"
        ],
        caseStudy: [
          { title: "Project Goal", content: "Develop a production-minded mold concept for a compact water flosser body with clean external surfacing." },
          { title: "Engineering Focus", list: ["Parting strategy for molded housing", "Consistent wall thickness for predictable flow", "Clear service and assembly logic for internal parts"] },
          { title: "Confidential Scope", content: "Detailed mold drawings, internal fit data, and tooling decisions are confidential and are not shown publicly." },
          { title: "Outcome", content: "A visual portfolio snapshot of a manufacturing-oriented concept prepared for deeper tooling review." }
        ]
      },
      {
        id: "injection-molding-paintbrush",
        title: "Injection Molding Wand Style Paintbrush Design",
        description: "A wand-style paintbrush designed for injection molding — combining ergonomic grip with efficient manufacturing.",
        coverImage: "/2.jpg",
        images: [
          "/2.jpg"
        ],
        caseStudy: [
          { title: "Project Goal", content: "Create an ergonomic wand-style paintbrush form that can move from concept styling toward molded production." },
          { title: "Design Approach", list: ["Grip form shaped for controlled strokes", "Simple body split suitable for plastic manufacturing", "Rounded surfaces to reduce sharp stress areas"] },
          { title: "Confidential Scope", content: "Tooling drawings and exact dimensional details are private, so only the presentation render is included." },
          { title: "Outcome", content: "A clean product concept balancing hand comfort, visual simplicity, and manufacturable geometry." }
        ]
      },
      {
        id: "laser-cutting-sheet-metal",
        title: "Laser Cutting Complex Sheet Metal Designs",
        description: "Complex sheet metal components engineered for precision laser cutting with optimized DFM.",
        coverImage: "/3.jpg",
        images: [
          "/3.jpg"
        ],
        caseStudy: [
          { title: "Project Goal", content: "Prepare complex sheet metal geometry for laser cutting while keeping fabrication practical." },
          { title: "DFM Focus", list: ["Cut paths arranged for clean profiles", "Bends and edges considered for downstream forming", "Part complexity balanced against fabrication cost"] },
          { title: "Confidential Scope", content: "Flat patterns, tolerances, and client-specific manufacturing files are confidential." },
          { title: "Outcome", content: "A fabrication-ready design direction represented publicly through selected portfolio imagery." }
        ]
      },
      {
        id: "wooden-powerbank",
        title: "Wooden Cost Saving Powerbank Design",
        description: "An eco-friendly powerbank design utilizing wooden housing to reduce manufacturing costs while maintaining premium aesthetics.",
        coverImage: "/4.jpg",
        images: [
          "/4.jpg"
        ],
        caseStudy: [
          { title: "Project Goal", content: "Explore a cost-conscious powerbank enclosure using a warm wooden exterior and simplified construction." },
          { title: "Design Approach", list: ["Minimal external form for a premium feel", "Material choice used to reduce perceived and production cost", "Compact shell planned around internal electronics packaging"] },
          { title: "Confidential Scope", content: "Internal layout, supplier assumptions, and electrical packaging details are private." },
          { title: "Outcome", content: "A refined enclosure concept focused on simplicity, tactility, and efficient production." }
        ]
      }
    ]
  },
  "blender-studio": {
    title: "Blender Studio",
    description: "High-quality rendering, texturing, 3D visualization, and character animation.",
    projects: [
      {
        id: "greenhouse",
        title: "GreenHouse Rendering",
        description: "A futuristic and sustainable greenhouse concept — visually explaining the greenhouse effect through realistic rendering.",
        coverImage: "/GreenHouse Design/1.jpg",
        images: [
          "/GreenHouse Design/1.jpg",
          "/GreenHouse Design/2.jpg",
          "/GreenHouse Design/3.jpg"
        ],
        caseStudy: [
          { title: "Goal", content: "Visually explain greenhouse effect" },
          { title: "Approach", list: ["Scene showing heat trapping", "Light simulation for clarity"] },
          { title: "Outcome", content: "Clear educational rendering" }
        ]
      },
      {
        id: "boat-design",
        title: "Leisure Boat ZD 12.8",
        description: "An exceptional leisure boat featuring a closed deck design — high-end visualization for presentation.",
        coverImage: "/BoatDesign/Leisure Boat ZD 12.8 Closed Deck - V2-Upgrade 1 - Image 1.jpg",
        images: [
          "/BoatDesign/Leisure Boat ZD 12.8 Closed Deck - V2-Upgrade 1 - Image 1.jpg",
          "/BoatDesign/Leisure Boat ZD 12.8 Closed Deck - V2-Upgrade 1 - Image 2-B.jpg",
          "/BoatDesign/Leisure Boat ZD 12.8 Closed Deck - V2-Upgrade 1 - Image 3.jpg"
        ],
        caseStudy: [
          { title: "Focus", content: "High-end visualization for presentation" },
          { title: "Work", list: ["Surface modeling", "Realistic materials", "Lighting + reflections"] },
          { title: "Outcome", content: "Presentation-ready visuals" }
        ]
      },
      {
        id: "spam-packaging",
        title: "Spam Packaging Design",
        description: "A bold, modern take on traditional packaging — visually appealing and structurally practical.",
        coverImage: "/spamPackgingDesign/CLOSE UP.png",
        images: [
          "/spamPackgingDesign/CLOSE UP.png",
          "/spamPackgingDesign/Screenshot 2025-09-15 054011.png",
          "/spamPackgingDesign/showing off the jerky.png"
        ],
        caseStudy: [
          { title: "Goal", content: "Create packaging that is both visually appealing and structurally practical" },
          { title: "Engineering Thinking", list: ["Focus on foldable structure design", "Optimized for mass production (die-cutting process)"] },
          { title: "DFM", list: ["Designed flat pattern for sheet cutting", "Minimized material waste", "Easy fold lines for assembly"] },
          { title: "Outcome", content: "Packaging ready for manufacturing and branding" }
        ]
      },
      {
        id: "character-animations",
        title: "Detailed Character Animations",
        description: "High-end character animation work showcasing fluid motion, rigging, and cinematic storytelling.",
        coverImage: "/aether.jpg",
        images: [
          "/aether.jpg"
        ],
        caseStudy: [
          { title: "Goal", content: "Present a cinematic character animation direction with strong motion quality and polished visual staging." },
          { title: "Creative Work", list: ["Character motion blocking", "Lighting and camera presentation", "Animation polish for a premium studio look"] },
          { title: "Confidential Scope", content: "Rig files, production scene data, and client animation breakdowns are private." },
          { title: "Outcome", content: "A public-facing animation snapshot representing the quality of the larger confidential production work." }
        ]
      }
    ]
  },
  "prototype-designs": {
    title: "Prototype Designs",
    description: "3D printing, assembly, physical prototyping, and production-ready concepts.",
    projects: [
      {
        id: "autofade-trimmer",
        title: "AutoFade Trimmer",
        description: "A handheld trimmer that automatically adjusts cutting length using a distance-based system for consistent hair fading.",
        coverImage: "/trimmer/first.png",
        images: [
          "/trimmer/first.png",
          "/trimmer/second.png",
          "/trimmer/third.png"
        ],
        caseStudy: [
          { title: "Project Goal", content: "Design a handheld trimmer that automatically adjusts cutting length using a distance-based system to assist in consistent hair fading." },
          { title: "Core Engineering Concept", list: ["Dual motor system:", "Motor 1 → blade cutting", "Motor 2 → vertical blade adjustment", "Distance sensor → feeds input to adjust blade height"] },
          { title: "Mechanical Design Approach", list: ["Designed a linear motion mechanism (lead screw / guided rail concept) for blade height control", "Ensured parallel alignment between blade and guide rails to avoid uneven cutting", "Used compact motor packaging to fit within handheld form factor"] },
          { title: "DFM (Design for Manufacturing)", list: ["Split housing into injection-moldable halves", "Avoided undercuts → simplified mold design", "Standardized screw bosses for assembly", "Reduced part count to improve assembly time"] },
          { title: "Tolerances & Fits", list: ["Sliding parts → clearance fit (0.1–0.2 mm)", "Motor mounts → tight fit for vibration control", "Blade alignment → high precision tolerance (~±0.05 mm)"] },
          { title: "Prototyping Plan", list: ["Initial prototype using 3D printing (PLA/ABS)", "Testing: Blade movement smoothness, Sensor accuracy, User grip comfort"] },
          { title: "Key Challenges", list: ["Maintaining stability during blade movement", "Avoiding vibration from dual motors", "Keeping internal layout compact"] },
          { title: "Outcome", content: "A working mechanical concept ready for functional prototyping with clear upgrade path to electronics integration." }
        ]
      },
      {
        id: "capless-marker",
        title: "Capless Marker",
        description: "An innovative capless marker design with auto-sealing mechanism to prevent ink drying.",
        coverImage: "/marker/5.png",
        images: [
          "/marker/5.png",
          "/marker/fourth.png"
        ],
        caseStudy: [
          { title: "Project Goal", content: "Design a marker that can protect the nib without relying on a removable cap." },
          { title: "Mechanical Idea", list: ["Auto-sealing front mechanism", "Compact internal sliding or shutter movement", "User-friendly one-piece daily carry form"] },
          { title: "Confidential Scope", content: "Internal mechanism drawings and seal geometry are confidential, so only external visuals are shown." },
          { title: "Outcome", content: "A practical marker concept focused on convenience, ink protection, and reduced lost-cap frustration." }
        ]
      },
      {
        id: "oil-massager",
        title: "Industrial Design Wall Mounted Massage Oil Sprayer",
        description: "A wall-mounted oil sprayer combining oil dispensing and massage in one ergonomic device.",
        coverImage: "/OilMessager/untitled.10.png",
        images: [
          "/OilMessager/untitled.10.png",
          "/OilMessager/untitled.11.png",
          "/OilMessager/untitled.12.png"
        ],
        caseStudy: [
          { title: "Goal", content: "Combine oil dispensing + massage in one device" },
          { title: "Mechanical Design", list: ["Internal oil chamber", "Roller mechanism for even spreading", "Controlled flow outlet"] },
          { title: "DFM", list: ["Leak-proof sealing design", "Threaded or snap-fit assembly", "Designed for plastic molding"] },
          { title: "Challenges", list: ["Prevent leakage", "Smooth roller motion"] },
          { title: "Outcome", content: "Concept ready for prototyping with clear internal layout" }
        ]
      },
      {
        id: "perfume-bottle",
        title: "Perfume Bottle",
        description: "An elegant perfume bottle design that emphasizes minimalist luxury with clear glass and metallic accents.",
        coverImage: "/PerfumeBottle/3.JPG",
        images: [
          "/PerfumeBottle/3.JPG",
          "/PerfumeBottle/4.JPG",
          "/PerfumeBottle/5.JPG"
        ],
        caseStudy: [
          { title: "Goal", content: "Create a perfume bottle presentation that feels minimal, premium, and shelf-ready." },
          { title: "Design Direction", list: ["Clear glass massing for luxury cues", "Simple cap and shoulder proportions", "Presentation visuals focused on material and silhouette"] },
          { title: "Confidential Scope", content: "Brand strategy, packaging dimensions, and supplier details are private." },
          { title: "Outcome", content: "A refined fragrance bottle concept with restrained styling and premium material emphasis." }
        ]
      },
      {
        id: "window-clamp-arcaswiss",
        title: "3D Printed Window Clamp on ArcaSwiss Plate",
        description: "A precision 3D printed window clamp designed to interface with ArcaSwiss plate mounting systems.",
        coverImage: "/5.jpg",
        images: [
          "/5.jpg"
        ],
        caseStudy: [
          { title: "Project Goal", content: "Create a compact 3D printed clamp that can mount securely around a window interface using an ArcaSwiss-style plate." },
          { title: "Design Focus", list: ["Strong clamping geometry", "Compact printed form", "Mounting interface alignment for camera or accessory use"] },
          { title: "Confidential Scope", content: "Exact dimensions, clamp force targets, and print settings are private." },
          { title: "Outcome", content: "A functional prototype concept intended for quick iteration and real-world mounting tests." }
        ]
      },
      {
        id: "heated-hair-brush",
        title: "Premium Heated Boar Bristles Hair Brush Design",
        description: "A premium heated hair brush integrating boar bristles for professional-grade styling at home.",
        coverImage: "/Brush/main.png",
        images: [
          "/Brush/main.png",
          "/Brush/2.png"
        ],
        drawings: [
          "/Brush/drawings.png"
        ],
        caseStudy: [
          { title: "Project Goal", content: "Design a premium heated hair brush with boar bristle styling cues and a manufacturable handheld body." },
          { title: "Engineering Approach", list: ["Handle geometry shaped for grip comfort", "Brush head planned around bristle placement and heat distribution", "Assembly layout supported by drawing documentation"] },
          { title: "Drawings", content: "A public drawing sheet is included to show the design intent without exposing every private production detail." },
          { title: "Outcome", content: "A polished grooming product concept with visual styling, CAD direction, and supporting drawings." }
        ]
      },
      {
        id: "waterproof-trash-can",
        title: "Waterproof Car Trash Can Design",
        description: "A compact, waterproof trash can engineered specifically for automotive interiors.",
        coverImage: "/Car Trash Can/image.png",
        images: [
          "/Car Trash Can/image.png",
          "/Car Trash Can/small.png",
          "/Car Trash Can/WhatsApp Image 2025-05-28 at 11.21.27 PM (1).jpeg",
          "/Car Trash Can/WhatsApp Image 2025-05-28 at 11.21.29 PM (1).jpeg",
          "/Car Trash Can/WhatsApp Image 2025-05-28 at 11.21.29 PM.jpeg",
          "/Car Trash Can/WhatsApp Video 2025-05-18 at 12.27.19 AM.mp4"
        ],
        caseStudy: [
          { title: "Project Goal", content: "Design a compact waterproof trash bin suited for automotive interiors and daily use." },
          { title: "Design Approach", list: ["Space-efficient body for car placement", "Water-resistant containment for spills and waste", "Easy access and removal for cleaning"] },
          { title: "Confidential Scope", content: "Detailed drawings, sealing specs, and production dimensions are private, so the public detail focuses on visual and functional evidence." },
          { title: "Outcome", content: "A practical car accessory concept supported by product renders, reference photos, and motion media." }
        ]
      },
      {
        id: "miswak-holder",
        title: "Miswak Holder Design",
        description: "A hygienic and portable miswak holder designed for everyday carry and storage.",
        coverImage: "/miswak holder/2.png",
        images: [
          "/miswak holder/2.png"
        ],
        caseStudy: [
          { title: "Project Goal", content: "Create a hygienic holder for carrying and storing miswak while keeping the form simple and portable." },
          { title: "Design Approach", list: ["Slim protective body", "Ventilation and cleanliness considered for daily use", "Minimal exterior form for pocket or bag carry"] },
          { title: "Confidential Scope", content: "Internal dimensions and closure details are private because no public drawing package is attached." },
          { title: "Outcome", content: "A compact holder concept focused on hygiene, portability, and clean everyday use." }
        ]
      },
      {
        id: "golf-putting-tool",
        title: "Prototype Drawing for Golf Putting Improvement Tool",
        description: "Engineering drawings and prototype design for a tool to improve golf putting accuracy.",
        coverImage: "/golf Pudding pRACTICE TOOL/1.png",
        images: [
          "/golf Pudding pRACTICE TOOL/1.png",
          "/golf Pudding pRACTICE TOOL/2.png",
          "/golf Pudding pRACTICE TOOL/3.png"
        ],
        drawings: [
          "/golf Pudding pRACTICE TOOL/DRAWING.png"
        ],
        caseStudy: [
          { title: "Project Goal", content: "Develop a physical practice aid that helps golfers build more consistent putting alignment and stroke control." },
          { title: "Prototype Approach", list: ["Ground-contact form for repeatable positioning", "Simple training geometry visible in product renders", "Drawing sheet used to communicate the core mechanical idea"] },
          { title: "Drawings", content: "A public drawing is included for concept clarity while detailed tolerances and manufacturing notes remain private." },
          { title: "Outcome", content: "A prototype-ready putting tool concept with visuals and drawing support." }
        ]
      },
      {
        id: "smart-infant-chair",
        title: "Prototyping 3D Smart Infant Care Chair",
        description: "A smart infant care chair concept with integrated sensors and ergonomic support for child safety.",
        coverImage: "/child infant chair/1.png",
        images: [
          "/child infant chair/1.png",
          "/child infant chair/2.png",
          "/child infant chair/3.png",
          "/child infant chair/4.png",
          "/child infant chair/new (1).mp4"
        ],
        caseStudy: [
          { title: "Project Goal", content: "Prototype a smart infant care chair concept with a supportive form and integrated product-style presentation." },
          { title: "Design Approach", list: ["Stable chair structure for infant support", "Soft visual language suited to care environments", "Media set expanded with video to show the concept more clearly"] },
          { title: "Confidential Scope", content: "Sensor layout, safety validation, electronics, and exact dimensions are confidential and not included publicly." },
          { title: "Outcome", content: "A smart care product concept represented through multiple renders and a video preview." }
        ]
      }
    ]
  }
};
