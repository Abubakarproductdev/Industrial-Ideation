"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextReveal from "./TextReveal";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "Quantum Fintech",
    category: "Web App & Identity",
    image: "/quantum.jpg",
    color: "#2a2a2a"
  },
  {
    title: "Aether Lifestyle",
    category: "E-Commerce",
    image: "/aether.jpg",
    color: "#c9a96e"
  },
  {
    title: "Nexus Motors",
    category: "3D Web Experience",
    image: "/nexus.jpg",
    color: "#1a1a1a"
  }
];

export default function Work() {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Parallax effect on images
    const images = gsap.utils.toArray('.project-image');
    images.forEach(img => {
      gsap.fromTo(img, 
        { yPercent: -20 },
        {
          yPercent: 20,
          ease: "none",
          scrollTrigger: {
            trigger: img.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section id="work" ref={sectionRef} className="py-32 w-full bg-[var(--background)]">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
          <div>
            <TextReveal className="text-sm uppercase tracking-[0.2em] text-[var(--accent)] font-medium mb-4 block">
              Selected Work
            </TextReveal>
            <TextReveal delay={0.2} className="text-5xl md:text-7xl font-bold tracking-tight max-w-2xl">
              Proof of Concept.
            </TextReveal>
          </div>
          <a href="#" className="flex items-center gap-2 group text-lg border-b border-[var(--surface-border)] pb-1 hover:border-white transition-colors">
            View Archive 
            <ArrowUpRight size={20} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <div className="flex flex-col gap-32">
          {projects.map((project, index) => (
            <div key={index} className="group relative w-full flex flex-col md:flex-row gap-8 md:gap-16 items-center">
              
              <div className={`w-full md:w-3/5 overflow-hidden rounded-2xl glass ${index % 2 !== 0 ? 'md:order-2' : ''} relative aspect-[4/3] group-hover:shadow-[0_0_40px_rgba(201,169,110,0.1)] transition-shadow duration-700`}>
                {/* Fallback color if image is missing */}
                <div 
                  className="absolute inset-0 w-full h-[140%] -top-[20%] project-image bg-cover bg-center"
                  style={{ 
                    backgroundImage: `url(${project.image})`,
                    backgroundColor: project.color
                  }}
                >
                  {/* Empty state overlay so it looks good even without image */}
                  <div className="w-full h-full bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                
                {/* "View" cursor replacement could be added here */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-90 group-hover:scale-100">
                  <div className="w-24 h-24 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white font-medium border border-white/20">
                    Explore
                  </div>
                </div>
              </div>
              
              <div className={`w-full md:w-2/5 ${index % 2 !== 0 ? 'md:text-right md:order-1' : ''}`}>
                <div className="text-[var(--accent)] font-mono text-sm mb-4">{String(index + 1).padStart(2, '0')}</div>
                <h3 className="text-4xl md:text-5xl font-bold mb-4">{project.title}</h3>
                <p className="text-xl text-gray-400">{project.category}</p>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
