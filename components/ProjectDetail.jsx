import { motion } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";

export default function ProjectDetail({ project, onClose }) {
  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/95 backdrop-blur-md"
      data-lenis-prevent="true"
    >
      <div className="relative min-h-screen w-full px-[var(--section-pad-x)] py-24 sm:py-28 md:py-36 lg:py-40">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="group fixed right-5 top-5 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20 sm:right-8 sm:top-8 md:right-12 md:top-12"
        >
          <X className="h-6 w-6 transition-transform group-hover:rotate-90" />
        </button>

        <div className="mx-auto max-w-[var(--page-max-width)]">
          {/* Header text */}
          <div className="mb-16 max-w-3xl md:mb-24 lg:mb-28">
            <motion.h1
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl font-light tracking-tight text-white md:text-6xl lg:text-7xl"
            >
              {project.title}
            </motion.h1>
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 text-lg font-light leading-relaxed text-zinc-400 md:mt-10 md:text-xl"
            >
              {project.description}
            </motion.p>
          </div>

          {/* Masonry-like Grid for Images */}
          <div className="columns-1 gap-7 sm:columns-2 md:gap-8 lg:columns-3 lg:gap-10">
            {project.images.map((src, index) => {
              const isVideo = src.toLowerCase().endsWith(".mp4");
              return (
                <motion.div
                  key={src}
                  initial={{ scale: 0.8, opacity: 0, y: 50 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.4 + index * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="mb-7 break-inside-avoid overflow-hidden rounded-xl bg-zinc-900 md:mb-8 lg:mb-10"
                >
                  {isVideo ? (
                    <video
                      src={src}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-auto object-cover"
                    />
                  ) : (
                    <img
                      src={src}
                      alt={`${project.title} - Image ${index + 1}`}
                      className="w-full h-auto object-cover transition-transform duration-700 hover:scale-105"
                      loading="lazy"
                    />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
