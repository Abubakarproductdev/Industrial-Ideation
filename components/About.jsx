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
    <section id="about" className="section-shell section-space-lg relative w-full overflow-hidden bg-[#050505]">
      {/* Abstract Background */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[var(--accent)]/5 to-transparent pointer-events-none"></div>
      
      <div className="section-inner relative z-10">
        <div className="flex flex-col gap-16 lg:flex-row lg:gap-24 xl:gap-28">
          
          <div className="w-full space-y-8 md:space-y-10 lg:w-1/2">
            <h2 className="text-sm uppercase tracking-[0.2em] text-[var(--accent)] font-medium">
              Our Philosophy
            </h2>
            
            <div className="space-y-4 text-3xl font-medium leading-tight md:space-y-5 md:text-5xl">
              <TextReveal delay={0.1}>Design is not just what it looks like and feels like.</TextReveal>
              <TextReveal delay={0.3} className="text-[var(--accent)]">Design is how it works.</TextReveal>
            </div>
            
            <TextReveal delay={0.5} className="reading-width text-lg text-gray-400 md:text-xl">
              We operate at the intersection of aesthetics and engineering. 
              Our mission is to help ambitious brands navigate the digital landscape 
              by creating platforms that are as robust in their architecture as they 
              are beautiful in their execution.
            </TextReveal>
          </div>

          <div ref={statsRef} className="grid w-full grid-cols-1 content-center gap-8 pt-4 sm:grid-cols-2 lg:w-1/2 lg:gap-10 xl:gap-12">
            {stats.map((stat, i) => (
              <div key={i} className="stat-item border-l border-[var(--surface-border)] py-5 pl-6 md:py-6 md:pl-8">
                <div className="mb-4 text-4xl font-bold text-white md:text-5xl xl:text-6xl">{stat.value}</div>
                <div className="text-sm text-gray-500 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
