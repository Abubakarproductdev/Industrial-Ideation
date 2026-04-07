"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextReveal from "./TextReveal";

const services = [
  {
    title: "Strategy",
    description: "We dive deep into your industry to uncover opportunities and define a roadmap that positions your brand for long-term success.",
    features: ["Market Research", "Brand Positioning", "Digital Transformation", "Product Strategy"]
  },
  {
    title: "Design",
    description: "Cinematic, minimalist, and deeply intentional. We create visual systems that communicate value instantly and build trust.",
    features: ["UI/UX Design", "Brand Identity", "Motion Graphics", "3D Art Direction"]
  },
  {
    title: "Development",
    description: "Lightning-fast, scalable architectures. We build software that performs flawlessly under pressure and feels like magic.",
    features: ["Web Applications", "Mobile Apps", "Creative Coding", "Custom Infrastructures"]
  },
  {
    title: "Innovation",
    description: "Integrating next-generation technologies to keep you ahead of the curve. From WebGL to AI-driven experiences.",
    features: ["AI Integration", "WebGL Experiences", "AR/VR Concepts", "Emerging Tech"]
  }
];

export default function Services() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Create horizontal scroll effect
    const totalScroll = cardsRef.current.length * 100;
    
    gsap.to(cardsRef.current, {
      xPercent: -100 * (cardsRef.current.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        pin: true,
        scrub: 1,
        start: "top top",
        end: `+=${totalScroll}%`,
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} id="services" className="w-full h-screen relative overflow-hidden bg-[var(--background)] flex items-center">
      {/* Background Graphic */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-[var(--surface-border)] opacity-20 z-0"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-[var(--surface-border)] opacity-10 z-0"></div>
      
      <div className="absolute top-12 left-6 md:left-12 z-20">
        <h2 className="text-sm uppercase tracking-[0.2em] text-[var(--accent)] font-medium">Our Expertise</h2>
      </div>

      {/* Horizontal scrolling container */}
      <div ref={containerRef} className="flex relative w-[400vw] h-full items-center">
        {services.map((service, index) => (
          <div 
            key={index}
            ref={(el) => (cardsRef.current[index] = el)}
            className="w-[100vw] px-6 md:px-24 flex flex-col md:flex-row items-center justify-between z-10"
          >
            <div className="w-full md:w-1/2 text-left mb-12 md:mb-0">
              <div className="text-[var(--accent)] text-xl font-mono mb-4 text-gradient-accent">0{index + 1} //</div>
              <h3 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">{service.title}</h3>
              <p className="text-xl text-gray-400 max-w-xl mb-8 leading-relaxed">
                {service.description}
              </p>
              
              <ul className="space-y-4">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-4 text-gray-300">
                    <div className="w-2 h-2 rounded-full bg-[var(--accent)] opacity-50"></div>
                    <span className="text-lg">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="w-full md:w-5/12 h-[40vh] md:h-[60vh] glass rounded-3xl p-8 relative overflow-hidden flex items-center justify-center">
               <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/10 to-transparent"></div>
               {/* Abstract representation of service */}
               <div className="relative text-9xl font-bold text-white/5 font-outfit select-none">
                 {service.title.substring(0, 2)}
               </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
