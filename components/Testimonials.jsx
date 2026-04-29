"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const testimonials = [
  {
    quote: "Working with Industrial Ideation transformed our digital presence completely. They didn't just build a website; they built a brand experience.",
    author: "Elena M.",
    role: "CMO, Quantum Fintech"
  },
  {
    quote: "The level of polish and attention to detail they bring to the table is unmatched. Our conversion rates doubled within the first month of launch.",
    author: "David R.",
    role: "Founder, Aether Lifecycle"
  },
  {
    quote: "Their technical architecture is as beautiful as their design. The seamless 3D experiences they built for us perform flawlessly on all devices.",
    author: "Sarah K.",
    role: "Product Director, Nexus"
  },
  {
    quote: "A rare breed of agency that truly understands both the creative and the highly technical. They delivered beyond our highest expectations.",
    author: "Michael T.",
    role: "CEO, Vertex Systems"
  }
];

export default function Testimonials() {
  const scrollerRef = useRef(null);

  useEffect(() => {
    if (scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);
      
      // Clone items for seamless loop
      scrollerContent.forEach(item => {
        const duplicatedItem = item.cloneNode(true);
        scrollerRef.current.appendChild(duplicatedItem);
      });

      // Animating from -50 to 0 makes it scroll endlessly from Left to Right
      gsap.fromTo(scrollerRef.current, 
        { xPercent: -50 },
        {
          xPercent: 0,
          ease: "none",
          duration: 35, // Adjust this to make it faster/slower
          repeat: -1
        }
      );
    }
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-black py-32 md:py-40 border-y border-[var(--surface-border)]">
      
      {/* Golden Ambient Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-[var(--accent)]/10 blur-[120px] rounded-full pointer-events-none"></div>

      {/* Header */}
      <div className="relative z-10 mx-auto mb-16 flex max-w-7xl flex-col items-center px-6 text-center md:mb-20">
        <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-[var(--accent)]">
          Client Feedback
        </h2>
        <h3 className="text-4xl font-black uppercase tracking-tighter text-white sm:text-5xl md:text-6xl">
          The <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-light)] via-[var(--accent)] to-[var(--accent-dark)]">Gold Standard.</span>
        </h3>
      </div>

      {/* Marquee Track */}
      <div className="flex overflow-hidden py-10">
        <div 
          ref={scrollerRef} 
          className="flex w-max gap-6 px-4 md:gap-8 hover:[animation-play-state:paused]"
        >
          {testimonials.map((item, idx) => (
            <div 
              key={idx} 
              // Medium sizing (w-[320px] to md:w-[400px]) with golden hover effects
              className="group relative flex w-[320px] flex-col justify-between overflow-hidden rounded-3xl border border-[var(--surface-border)] bg-[#050505] p-8 transition-all duration-500 hover:-translate-y-2 hover:border-[var(--accent)] hover:shadow-[0_0_40px_rgba(201,169,110,0.15)] md:w-[400px] md:p-10"
            >
              {/* Crazy subtle gold gradient inside the card on hover */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[var(--accent)]/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>

              {/* Decorative Big Quote Mark */}
              <div className="absolute -top-4 right-6 text-8xl font-black leading-none text-[var(--accent)]/10 transition-colors duration-500 group-hover:text-[var(--accent)]/30">
                &quot;
              </div>

              <div className="relative z-10 mb-10">
                {/* 5 Golden Stars */}
                <div className="mb-5 flex gap-1 text-[var(--accent)]">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <p className="text-base font-medium leading-relaxed text-gray-300 md:text-lg">
                  {item.quote}
                </p>
              </div>
              
              {/* Avatar and Info */}
              <div className="relative z-10 flex items-center gap-4">
                {/* Golden Avatar */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[var(--accent)]/50 bg-gradient-to-br from-[var(--accent-dark)] to-black text-lg font-black text-[var(--accent-light)] shadow-[0_0_15px_rgba(201,169,110,0.2)]">
                  {item.author[0]}
                </div>
                <div>
                  <h4 className="text-base font-bold text-white group-hover:text-[var(--accent-light)] transition-colors">
                    {item.author}
                  </h4>
                  <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                    {item.role}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}