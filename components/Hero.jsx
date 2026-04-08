"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { MoveDown } from "lucide-react";
import TextReveal from "./TextReveal";
import MagneticButton from "./MagneticButton";

import { motion } from "framer-motion";

// Lazy load the 3D scene to improve initial page load performance
const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 z-0 bg-[var(--background)] animate-pulse opacity-20"></div>
});

export default function Hero() {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // Subtle parallax on scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      }
    });

    tl.to(textRef.current, {
      y: 150,
      opacity: 0,
      ease: "none"
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <HeroScene />
      
      {/* Radial Gradient Overlay to make text readable */}
      <div className="absolute inset-0 z-1 bg-gradient-to-t from-[var(--background)] via-[var(--background)]/40 to-transparent pointer-events-none"></div>
      <div className="absolute inset-0 z-1 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[var(--background)]/50 to-[var(--background)] pointer-events-none"></div>
      
      {/* Content */}
      <div 
        ref={textRef}
        className="section-shell relative z-10 flex flex-col items-center justify-center pt-24 md:pt-28"
      >
        <div className="section-inner flex flex-col items-center text-center">
          <TextReveal delay={0.2} className="max-w-5xl text-5xl font-bold tracking-tighter leading-tight md:text-7xl lg:text-8xl">
            We Build Ideas That Move Industries.
          </TextReveal>
          
          <TextReveal delay={0.8} className="mt-6 max-w-2xl text-lg text-gray-400 md:mt-8 md:text-xl">
            A premium design and development agency accelerating digital transformation
            through innovative strategy and cinematic web experiences.
          </TextReveal>
          
          <div className="mt-10 flex flex-col items-center gap-4 opacity-0 animate-[fadeIn_1s_ease-out_1.5s_forwards] sm:flex-row md:mt-12 md:gap-6">
            <MagneticButton className="w-full rounded-full bg-white px-8 py-4 font-medium text-black hover:bg-gray-200 sm:w-auto">
              View Our Work
            </MagneticButton>
            <MagneticButton className="glass w-full rounded-full px-8 py-4 font-medium text-white hover:bg-[var(--surface-border)] sm:w-auto">
              Start a project
            </MagneticButton>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-0 animate-[fadeIn_1s_ease-out_2s_forwards]">
        <span className="text-xs tracking-widest uppercase text-gray-500 font-medium">Scroll</span>
        <div className="w-8 h-12 rounded-full border border-[var(--surface-border)] glass flex justify-center p-2">
          <motion.div 
            animate={{ 
              y: [0, 12, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <MoveDown size={14} className="text-[var(--accent)]" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
