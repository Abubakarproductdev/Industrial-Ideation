"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextReveal from "./TextReveal";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const projects = [
  {
    title: "Industrial Manufacturing Designs",
    category: "Mechanical Drawings",
    image: "/quantum.jpg",
    color: "#000000ff",
    slug: "industrial-manufacturing-designs"
  },
  {
    title: "Blender Studio",
    category: "Rendering and Animation",
    image: "/aether.jpg",
    color: "#ffffffff",
    slug: "blender-studio"
  },
  {
    title: "Prototype Designs",
    category: "3D printing + Assembly",
    image: "/nexus.jpg",
    color: "#491d1dff",
    slug: "prototype-designs"
  }
];

export default function Work() {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Parallax effect on images
    const images = gsap.utils.toArray('.project-image');
    images.forEach(img => {
      gsap.fromTo(img,
        { yPercent: -20 },
        {
          yPercent: 20,
          ease: "none",
          scrollTrigger: {
            trigger: img.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section id="work" ref={sectionRef} className="section-shell section-space-lg w-full bg-[var(--background)]">
      <div className="section-inner">
        <div className="mb-16 flex flex-col gap-8 md:mb-24 md:flex-row md:items-end md:justify-between">
          <div className="space-y-5">
            <TextReveal className="block text-sm uppercase tracking-[0.2em] text-[var(--accent)] font-medium">
              Selected Work
            </TextReveal>
            <TextReveal delay={0.2} className="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl md:text-7xl">
              Proof of Concept.
            </TextReveal>
          </div>
          <Link href="#" className="group flex items-center gap-2 self-start border-b border-[var(--surface-border)] pb-1 text-base transition-colors hover:border-white md:self-auto md:text-lg">
            View Archive
            <ArrowUpRight size={20} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="flex flex-col gap-20 md:gap-28 xl:gap-32">
          {projects.map((project, index) => (
            <Link href={`/work/${project.slug}`} key={index} className="group relative flex w-full flex-col items-start gap-10 md:flex-row md:items-center md:gap-16 lg:gap-20">

              <div className={`w-full md:w-3/5 overflow-hidden rounded-2xl glass ${index % 2 !== 0 ? 'md:order-2' : ''} relative aspect-[4/3] group-hover:shadow-[0_0_40px_rgba(201,169,110,0.1)] transition-shadow duration-700`}>
                {/* Fallback color if image is missing */}
                <div
                  className="absolute inset-0 w-full h-[140%] -top-[20%] project-image bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${project.image})`,
                    backgroundColor: project.color
                  }}
                >
                  {/* Empty state overlay so it looks good even without image */}
                  <div className="w-full h-full bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>

                {/* "View" cursor replacement could be added here */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-90 group-hover:scale-100">
                  <div className="w-24 h-24 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white font-medium border border-white/20">
                    Explore
                  </div>
                </div>
              </div>

              <div className={`w-full md:w-2/5 ${index % 2 !== 0 ? 'md:text-right md:order-1' : ''}`}>
                <div className="mb-4 font-mono text-sm text-[var(--accent)]">{String(index + 1).padStart(2, '0')}</div>
                <h3 className="mb-5 text-3xl font-bold sm:text-4xl md:text-5xl">{project.title}</h3>
                <p className="text-lg text-gray-400 md:text-xl">{project.category}</p>
              </div>

            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
