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
    <footer className="w-full bg-[#050505] text-gray-400 py-12 px-6 md:px-12 border-t border-[var(--surface-border)]">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          
          <div className="flex flex-col items-center md:items-start">
            <h2 className="font-bold tracking-tighter text-2xl text-white mb-2">
              Ind.<span className="text-[var(--accent)]">Ideation</span>
            </h2>
            <p className="text-sm">Premium Digital Agency</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 text-sm">
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
        
        <div className="w-full h-px bg-[var(--surface-border)] my-8"></div>
        
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 gap-4">
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
