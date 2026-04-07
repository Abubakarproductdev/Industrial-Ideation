"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const testimonials = [
  {
    quote: "Working with Industrial Ideation transformed our digital presence completely. They didn't just build a website; they built a brand experience.",
    author: "Elena M.",
    role: "CMO, Quantum Fintech",
    company: "Quantum"
  },
  {
    quote: "The level of polish and attention to detail they bring to the table is unmatched. Our conversion rates doubled within the first month of launch.",
    author: "David R.",
    role: "Founder, Aether Lifecycle",
    company: "Aether"
  },
  {
    quote: "Their technical architecture is as beautiful as their design. The seamless 3D experiences they built for us perform flawlessly on all devices.",
    author: "Sarah K.",
    role: "Product Director, Nexus",
    company: "Nexus Motors"
  },
  {
    quote: "A rare breed of agency that truly understands both the creative and the highly technical. They delivered beyond our highest expectations.",
    author: "Michael T.",
    role: "CEO, Vertex Systems",
    company: "Vertex"
  }
];

export default function Testimonials() {
  const scrollerRef = useRef(null);

  useEffect(() => {
    // Infinite horizontal scroll
    if (scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);
      
      // Clone items for seamless loop
      scrollerContent.forEach(item => {
        const duplicatedItem = item.cloneNode(true);
        scrollerRef.current.appendChild(duplicatedItem);
      });

      gsap.to(scrollerRef.current, {
        xPercent: -50,
        ease: "none",
        duration: 30, // Adjust speed here
        repeat: -1
      });
    }
  }, []);

  return (
    <section className="py-32 w-full bg-[var(--background)] overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 mb-16 text-center">
        <h2 className="text-sm uppercase tracking-[0.2em] text-[var(--accent)] font-medium mb-4">
          Client Feedback
        </h2>
        <h3 className="text-4xl md:text-5xl font-bold">
          Don't just take our word for it.
        </h3>
      </div>

      <div className="flex overflow-hidden group">
        <div 
          ref={scrollerRef} 
          className="flex gap-8 px-4 w-max group-hover:[animation-play-state:paused]"
        >
          {testimonials.map((item, idx) => (
            <div 
              key={idx} 
              className="w-[350px] md:w-[450px] glass p-8 md:p-10 rounded-2xl flex flex-col justify-between"
            >
              <div className="mb-8">
                <div className="flex gap-1 mb-6 text-[var(--accent)]">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <p className="text-lg md:text-xl leading-relaxed text-gray-200">
                  "{item.quote}"
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--surface-border)] to-[var(--background)] border border-[var(--surface-border)] flex items-center justify-center font-bold text-lg">
                  {item.author[0]}
                </div>
                <div>
                  <h4 className="font-bold">{item.author}</h4>
                  <p className="text-sm text-gray-400">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
