"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "Work", href: "#work" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 left-0 z-50 flex w-full justify-center px-[var(--section-pad-x)] py-4 transition-all duration-500"
      >
        <div
          className={`flex w-full items-center justify-between rounded-full px-5 transition-all duration-500 sm:px-6 md:px-7 ${scrolled ? "glass py-3 shadow-lg" : "bg-transparent py-4"
            }`}
        >
          {/* Logo */}
          <a href="#" className="flex-shrink-0 z-50">
            <h1 className={`font-bold tracking-tighter ${scrolled ? 'text-xl' : 'text-2xl'} transition-all duration-500`}>
              <span className="text-white">Ind.</span>
              <span className="text-gradient-accent">Ideation</span>
            </h1>
          </a>

          {/* Desktop Links */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link, i) => (
              <a
                key={i}
                href={link.href}
                className="text-sm text-gray-300 hover:text-white transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--accent)] transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>


          <div className="hidden md:block">
            <a
              href="#contact"
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${scrolled
                ? 'bg-white text-black hover:bg-gray-200'
                : 'bg-[var(--surface)] border border-[var(--surface-border)] text-white hover:bg-white hover:text-black'
                }`}
            >
              Start Project
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="z-50 flex items-center md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white focus:outline-none"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="glass fixed inset-0 z-40 bg-[var(--background)] px-[var(--section-pad-x)] pt-24 md:hidden"
          >
            <div className="mt-12 flex flex-col items-center gap-8 text-2xl font-medium">
              {navLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-white hover:text-[var(--accent)] transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-4 px-8 py-3 bg-[var(--accent)] text-black rounded-full text-lg hover:bg-[var(--accent-light)] transition-colors"
              >
                Start Project
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
