"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function TextReveal({ children, className = "", delay = 0 }) {
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Check if children is a string, then we split by characters
    const textToAnimate = typeof children === 'string' ? children : '';
    
    if (textToAnimate) {
      const chars = containerRef.current.querySelectorAll('.reveal-char');
      
      gsap.fromTo(chars, 
        { y: 100, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          stagger: 0.02, 
          duration: 0.8, 
          ease: "back.out(1.7)",
          delay: delay,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
          }
        }
      );
    } else {
      // Fallback for non-string children
      gsap.fromTo(containerRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
          }
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [children, delay]);

  if (typeof children === 'string') {
    return (
      <div ref={containerRef} className={`overflow-hidden ${className}`}>
        {children.split('').map((char, index) => (
          <span 
            key={index} 
            className="reveal-char inline-block"
            style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
          >
            {char}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
