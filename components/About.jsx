"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextReveal from "./TextReveal";

const stats = [
  { value: "50+", label: "Projects Completed" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "10+", label: "Industry Awards" },
  { value: "24/7", label: "Innovation Mindset" }
];

export default function About() {
  const statsRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const statElements = statsRef.current.querySelectorAll('.stat-item');
    
    gsap.fromTo(statElements,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 80%",
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section id="about" className="py-32 w-full bg-[#050505] relative overflow-hidden">
      {/* Abstract Background */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[var(--accent)]/5 to-transparent pointer-events-none"></div>
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row gap-20">
          
          <div className="w-full lg:w-1/2">
            <h2 className="text-sm uppercase tracking-[0.2em] text-[var(--accent)] font-medium mb-12">
              Our Philosophy
            </h2>
            
            <div className="text-3xl md:text-5xl font-medium leading-tight mb-12">
              <TextReveal delay={0.1}>Design is not just what it looks like and feels like.</TextReveal>
              <TextReveal delay={0.3} className="text-[var(--accent)]">Design is how it works.</TextReveal>
            </div>
            
            <TextReveal delay={0.5} className="text-xl text-gray-400 leading-relaxed max-w-xl">
              We operate at the intersection of aesthetics and engineering. 
              Our mission is to help ambitious brands navigate the digital landscape 
              by creating platforms that are as robust in their architecture as they 
              are beautiful in their execution.
            </TextReveal>
          </div>

          <div ref={statsRef} className="w-full lg:w-1/2 grid grid-cols-2 gap-8 lg:gap-12 content-center">
            {stats.map((stat, i) => (
              <div key={i} className="stat-item border-l border-[var(--surface-border)] pl-8 py-4">
                <div className="text-5xl md:text-6xl font-bold font-outfit mb-2 text-white">{stat.value}</div>
                <div className="text-sm text-gray-500 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
