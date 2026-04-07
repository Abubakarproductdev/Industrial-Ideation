"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef(null);
  const percentRef = useRef(null);
  const barRef = useRef(null);

  useEffect(() => {
    // Simulate loading progress
    let currentProgress = 0;
    
    // In a real app with 3D/heavy assets, you would tie this to actual loading events
    // For this implementation, we use a timed simulation that feels authentic
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 10) + 1;
      
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        
        // Animation out
        const tl = gsap.timeline({
          onComplete: onComplete
        });
        
        tl.to(percentRef.current, {
          y: -50,
          opacity: 0,
          duration: 0.5,
          ease: "power2.in"
        })
        .to(barRef.current, {
          scaleX: 0,
          transformOrigin: "right",
          duration: 0.5,
          ease: "power2.inOut"
        }, "-=0.3")
        .to(containerRef.current, {
          yPercent: -100,
          duration: 1,
          ease: "expo.inOut"
        });
      }
      
      setProgress(currentProgress);
    }, 150);
    
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505] text-white"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex flex-col items-center">
        
        {/* Loading text / Brand */}
        <div className="overflow-hidden mb-8">
          <div ref={percentRef} className="text-sm uppercase tracking-[0.3em] text-[var(--accent)] font-medium">
            Industrial Ideation — {progress}%
          </div>
        </div>
        
        {/* Progress Bar Container */}
        <div className="w-64 h-[1px] bg-white/20 relative overflow-hidden">
          {/* Active Progress line */}
          <div 
            ref={barRef}
            className="absolute top-0 left-0 h-full bg-[var(--accent)] origin-left"
            style={{ 
              width: `${progress}%`,
              transition: 'width 0.2s ease-out'
            }}
          ></div>
        </div>
        
      </div>
    </div>
  );
}
