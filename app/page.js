"use client";

import { useState } from "react";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Work from "@/components/Work";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      
      <SmoothScroll>
        <main className={`min-h-screen bg-[var(--background)] transition-opacity duration-1000 ${loading ? 'opacity-0 h-screen overflow-hidden' : 'opacity-100'}`}>
          <Navbar />
          <Hero />
          <Services />
          <Work />
          <About />
          <Testimonials />
          <Contact />
          <Footer />
        </main>
      </SmoothScroll>
    </>
  );
}
