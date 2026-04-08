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
    <section id="about" className="section-shell section-space relative w-full overflow-hidden bg-[#050505]">
      {/* Abstract Background */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[var(--accent)]/5 to-transparent pointer-events-none"></div>
      
      <div className="section-inner relative z-10">
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-20">
          
          <div className="w-full lg:w-1/2 space-y-6 md:space-y-8">
            <h2 className="text-sm uppercase tracking-[0.2em] text-[var(--accent)] font-medium">
              Our Philosophy
            </h2>
            
            <div className="space-y-3 text-3xl font-medium leading-tight md:text-5xl">
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

          <div ref={statsRef} className="grid w-full grid-cols-1 gap-6 pt-2 sm:grid-cols-2 lg:w-1/2 lg:gap-8 xl:gap-10 content-center">
            {stats.map((stat, i) => (
              <div key={i} className="stat-item border-l border-[var(--surface-border)] pl-6 py-4 md:pl-8">
                <div className="mb-3 text-4xl font-bold text-white md:text-5xl xl:text-6xl">{stat.value}</div>
                <div className="text-sm text-gray-500 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
