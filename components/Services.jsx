"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ServicesGalleryCanvas from "./ServicesGalleryCanvas";
import { resetServicesGalleryState, setServicesGalleryProgress } from "./servicesGalleryState";

const galleryImages = [
  "/1.jpg",
  "/2.jpg",
  "/3.jpg",
  "/4.jpg",
  "/5.jpg",
  "/6.jpg",
  "/7.jpg",
  "/8.jpg",
  "/9.jpg",
  "/10.jpg",
  "/11.jpg",
  "/12.jpg",
];

export default function Services() {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    resetServicesGalleryState();

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: `+=${galleryImages.length * 320}`,
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
        <ServicesGalleryCanvas items={galleryImages} />
      </div>
    </section>
  );
}
