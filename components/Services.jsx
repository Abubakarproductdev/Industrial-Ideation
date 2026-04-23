"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSnapshot } from "valtio";
import { AnimatePresence } from "framer-motion";
import ServicesGalleryCanvas from "./ServicesGalleryCanvas";
import { resetServicesGalleryState, setServicesGalleryProgress, galleryState, setSelectedProject } from "./servicesGalleryState";
import { projects } from "./servicesData";
import ProjectDetail from "./ProjectDetail";

export default function Services() {
  const sectionRef = useRef(null);
  const { selectedProject } = useSnapshot(galleryState);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    resetServicesGalleryState();

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: `+=${projects.length * 320}`,
      pin: true,
      scrub: 0.8,
      anticipatePin: 1,
      onUpdate: (self) => {
        setServicesGalleryProgress(self.progress);
      },
      onLeaveBack: () => {
        setServicesGalleryProgress(0);
      },
      onLeave: () => {
        setServicesGalleryProgress(1);
      },
    });

    return () => {
      trigger.kill();
      resetServicesGalleryState();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative h-screen w-full overflow-hidden bg-[#000000]"
    >
      <div className="relative h-full w-full">
        <ServicesGalleryCanvas items={projects} />
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectDetail
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
