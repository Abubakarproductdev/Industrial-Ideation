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
        ]
      },
      {
        id: "injection-molding-paintbrush",
        title: "Injection Molding Wand Style Paintbrush Design",
        description: "A wand-style paintbrush designed for injection molding — combining ergonomic grip with efficient manufacturing.",
        coverImage: "/2.jpg",
        images: [
          "/2.jpg"
        ]
      },
      {
        id: "laser-cutting-sheet-metal",
        title: "Laser Cutting Complex Sheet Metal Designs",
        description: "Complex sheet metal components engineered for precision laser cutting with optimized DFM.",
        coverImage: "/3.jpg",
        images: [
          "/3.jpg"
        ]
      },
      {
        id: "wooden-powerbank",
        title: "Wooden Cost Saving Powerbank Design",
        description: "An eco-friendly powerbank design utilizing wooden housing to reduce manufacturing costs while maintaining premium aesthetics.",
        coverImage: "/4.jpg",
        images: [
          "/4.jpg"
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
        ]
      },
      {
        id: "window-clamp-arcaswiss",
        title: "3D Printed Window Clamp on ArcaSwiss Plate",
        description: "A precision 3D printed window clamp designed to interface with ArcaSwiss plate mounting systems.",
        coverImage: "/5.jpg",
        images: [
          "/5.jpg"
        ]
      },
      {
        id: "heated-hair-brush",
        title: "Premium Heated Boar Bristles Hair Brush Design",
        description: "A premium heated hair brush integrating boar bristles for professional-grade styling at home.",
        coverImage: "/6.jpg",
        images: [
          "/6.jpg"
        ]
      },
      {
        id: "waterproof-trash-can",
        title: "Waterproof Car Trash Can Design",
        description: "A compact, waterproof trash can engineered specifically for automotive interiors.",
        coverImage: "/7.jpg",
        images: [
          "/7.jpg"
        ]
      },
      {
        id: "miswak-holder",
        title: "Miswak Holder Design",
        description: "A hygienic and portable miswak holder designed for everyday carry and storage.",
        coverImage: "/8.jpg",
        images: [
          "/8.jpg"
        ]
      },
      {
        id: "golf-putting-tool",
        title: "Prototype Drawing for Golf Putting Improvement Tool",
        description: "Engineering drawings and prototype design for a tool to improve golf putting accuracy.",
        coverImage: "/9.jpg",
        images: [
          "/9.jpg"
        ]
      },
      {
        id: "smart-infant-chair",
        title: "Prototyping 3D Smart Infant Care Chair",
        description: "A smart infant care chair concept with integrated sensors and ergonomic support for child safety.",
        coverImage: "/10.jpg",
        images: [
          "/10.jpg"
        ]
      }
    ]
  }
};
