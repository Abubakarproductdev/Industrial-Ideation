"use client";

import { ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <footer className="section-shell w-full border-t border-[var(--surface-border)] bg-[#050505] py-12 text-gray-400">
      <div className="section-inner">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          
          <div className="flex flex-col items-center gap-2 md:items-start">
            <h2 className="text-2xl font-bold tracking-tighter text-white">
              Ind.<span className="text-[var(--accent)]">Ideation</span>
            </h2>
            <p className="text-sm">Premium Digital Agency</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm">
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-white transition-colors">Dribbble</a>
          </div>
          
          <button 
            onClick={scrollToTop}
            className="w-12 h-12 rounded-full border border-[var(--surface-border)] flex items-center justify-center hover:bg-white hover:text-black transition-colors"
            aria-label="Scroll to top"
          >
            <ArrowUp size={20} />
          </button>

        </div>
        
        <div className="my-8 h-px w-full bg-[var(--surface-border)]"></div>
        
        <div className="flex flex-col items-center justify-between gap-4 text-center text-xs text-gray-600 md:flex-row md:text-left">
          <p>&copy; {new Date().getFullYear()} Industrial Ideation. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-gray-300">Privacy Policy</a>
            <a href="#" className="hover:text-gray-300">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
