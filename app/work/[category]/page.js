"use client";

import { useState, use } from "react";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { workCategories } from "@/components/workData";
import ProjectDetail from "@/components/ProjectDetail";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function WorkCategoryPage({ params }) {
  const resolvedParams = use(params);
  const categorySlug = resolvedParams.category;
  
  const categoryData = workCategories[categorySlug];
  const [selectedProject, setSelectedProject] = useState(null);

  if (!categoryData) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--background)] text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Category Not Found</h1>
          <Link href="/#work" className="text-[var(--accent)] hover:underline">Return to Work</Link>
        </div>
      </div>
    );
  }

  return (
    <SmoothScroll>
      <main className="min-h-screen bg-[var(--background)] pt-32 pb-20">
        <Navbar />
        
        <div className="section-shell section-space-lg w-full">
          <div className="section-inner">
            <div className="mb-12 md:mb-20 flex flex-col items-start gap-6">
              <Link href="/#work" className="group flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                Back to Projects
              </Link>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white">
                {categoryData.title}
              </h1>
              <p className="max-w-2xl text-lg text-gray-400 md:text-xl">
                {categoryData.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
              {categoryData.projects.map((project, index) => (
                <motion.div 
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="group cursor-pointer flex flex-col gap-5"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-zinc-900 glass group-hover:shadow-[0_0_30px_rgba(201,169,110,0.15)] transition-all duration-500">
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                      style={{ backgroundImage: `url('${project.coverImage}')` }}
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                    
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-90 group-hover:scale-100">
                      <div className="w-20 h-20 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white font-medium border border-white/20">
                        View
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-white">{project.title}</h3>
                    <p className="mt-2 text-gray-400 line-clamp-2">{project.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        
        <Footer />

        <AnimatePresence>
          {selectedProject && (
            <ProjectDetail 
              project={selectedProject} 
              onClose={() => setSelectedProject(null)} 
            />
          )}
        </AnimatePresence>
      </main>
    </SmoothScroll>
  );
}
