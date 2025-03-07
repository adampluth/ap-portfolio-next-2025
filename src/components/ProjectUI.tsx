"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ChevronLeft } from "lucide-react";
import ProjectImageGallery from "@/components/ProjectImageGallery";

interface ProjectUIProps {
  project: { title: string; company: string; description: string };
  images: string[];
}

export default function ProjectUI({ project, images }: ProjectUIProps) {
  return (
    <div className="max-w-8xl mx-auto overflow-hidden">
      {/* Back Button - Icon on Mobile, Full Button on Desktop */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
        className="fixed top-16 left-4 z-50"
      >
        <Link href="/ui-ux">
          {/* Mobile Button (Icon Only) */}
          <button className="btn btn-sm glass hover:bg-purple-500/60 active:bg-purple-500/50 btn-circle md:hidden">
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Desktop Button (Full Width) */}
          <button className="hidden md:inline-flex btn btn-sm glass hover:bg-purple-500/60 active:bg-purple-500/50 rounded-md">
            <ChevronLeft className="w-5 h-5 mr-2" />
            Back to Projects
          </button>
        </Link>
      </motion.div>

      {/* Responsive Grid Layout */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
        className="grid grid-cols-1 lg:grid-cols-4 gap-6"
      >
        {/* Project Details (Left Column - Sticky only on md and above) */}
        <div className="md:col-span-1 md:sticky md:top-28 self-start text-center space-y-4 md:px-8 lg:pl-6">
          
          {/* Motion-Animated Title */}
          <motion.h1
            initial={{ opacity: 0.8, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, repeat: Infinity, direction: "alternate" }}
            className="relative text-5xl lg:text-4xl xl:text-5xl font-extrabold text-white text-center px-6 mt-20 sm:mt-28 md:mt-10"
          >
            {/* Diffused Glow Background */}
            <span className="absolute -inset-4 scale-125 blur-3xl opacity-50 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400"></span>

            {/* Main Gradient Text */}
            <span className="relative bg-gradient-to-r from-purple-400 via-pink-300 to-cyan-200  bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(255,105,180,0.7)]">
              {project.title}
            </span>
          </motion.h1>

          <p className="text-lg text-gray-400">{project.company}</p>
          <p className="mt-2 text-gray-300">{project.description}</p>
        </div>

        {/* Image Gallery (Right Column - Scrolls) */}
        <div className="md:col-span-3 overflow-auto max-h-[100vh] pt-4 sm:pt-12 md:pt-48 lg:pt-28 pb-14 p-6">
          <ProjectImageGallery images={images} title={project.title} />
        </div>
      </motion.div>
    </div>
  );
}
