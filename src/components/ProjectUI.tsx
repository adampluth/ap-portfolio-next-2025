"use client";

import Link from "next/link";
import { motion } from "motion/react";
import ProjectImageGallery from "@/components/ProjectImageGallery";

interface ProjectUIProps {
  project: { title: string; company: string; description: string };
  images: string[];
}

export default function ProjectUI({ project, images }: ProjectUIProps) {
  return (
    <div className="max-w-8xl mx-auto p-6">
      {/* Back Button */}
      <div className="fixed flex w-full">
        <Link href="/ui-ux">
          <button className="mb-4 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition">
            ← Back to Projects
          </button>
        </Link>
      </div>

      {/* Responsive Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-20">
        {/* Project Details (Left Column - Sticky only on md and above) */}
        <div className="md:col-span-1 md:sticky md:top-20 self-start text-center space-y-4">
          
          {/* Motion-Animated Title */}
          <motion.h1
            initial={{ opacity: 0.8, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, repeat: Infinity, direction: "alternate" }}
            className="relative text-5xl font-extrabold text-white text-center"
          >
            {/* ✅ Improved Diffused Glow Background */}
            <span className="absolute -inset-4 scale-125 blur-3xl opacity-50 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400"></span>

            {/* ✅ Main Gradient Text with a Softer Glow */}
            <span className="relative bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-300 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(255,105,180,0.7)]">
              {project.title}
            </span>
          </motion.h1>

          <p className="text-lg text-gray-400">{project.company}</p>
          <p className="mt-2 text-gray-300">{project.description}</p>
        </div>

        {/* Image Gallery (Right Column - Scrolls) */}
        <div className="md:col-span-3 overflow-auto max-h-[80vh]">
          <ProjectImageGallery images={images} title={project.title} />
        </div>
      </div>
    </div>
  );
}
