"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import ProjectImageGallery from "@/components/ProjectImageGallery";

interface ProjectUIProps {
  project: { title: string; company: string; description: string };
  images: string[];
}

export default function ProjectUI({ project, images }: ProjectUIProps) {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setShowContent(true), 600);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div 
      className="
        max-w-8xl 
        mx-auto 
        overflow-hidden
      "
    >
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
        className="
          fixed 
          top-16 
          left-4 
          z-50
        "
      >
        <Link href="/ui-ux">
          {/* Mobile Button (Icon Only) */}
          <button 
            className="
              btn 
              btn-sm 
              glass 
              hover:bg-purple-500/60 
              active:bg-purple-500/50 
              btn-circle 
              md:hidden
            "
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Desktop Button */}
          <button 
            className="
              hidden 
              md:inline-flex 
              btn 
              btn-sm 
              glass 
              hover:bg-purple-500/60 
              active:bg-purple-500/50 
              rounded-md
            "
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Back to Projects
          </button>
        </Link>
      </motion.div>

      {/* Content Delay */}
      {showContent && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
          className="
            grid 
            grid-cols-1 
            lg:grid-cols-4 
            gap-6
          "
        >
          {/* Project Details */}
          <div 
            className="
              md:col-span-1 
              md:sticky 
              md:top-28 
              self-start 
              text-center 
              space-y-4 
              md:px-8 
              lg:pl-6
            "
          >
            {/* Motion-Animated Title */}
            <motion.h1
              initial="initial"
              animate="animate"
              whileInView={{ scale: [1, 1.05, 1] }}
              transition={{
                duration: 1.2,
                ease: "easeOut",
                scale: {
                  duration: 3.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                },
              }}
              className="
                relative 
                text-5xl 
                lg:text-4xl 
                xl:text-5xl 
                font-extrabold 
                text-white 
                text-center 
                px-6 
                mt-20 
                sm:mt-28 
                md:mt-10
              "
            >
              {/* Diffused Glow Background */}
              <span 
                className="
                  absolute 
                  -inset-4 
                  scale-125 
                  blur-3xl 
                  opacity-50 
                  bg-gradient-to-r 
                  from-purple-500 
                  via-pink-500 
                  to-cyan-400
                "
              />

              {/* Main Gradient Text */}
              <span 
                className="
                  relative 
                  bg-gradient-to-r 
                  from-purple-400 
                  via-pink-300 
                  to-cyan-200 
                  bg-clip-text 
                  text-transparent 
                  drop-shadow-[0_0_25px_rgba(255,105,180,0.7)]
                "
              >
                {project.title}
              </span>
            </motion.h1>

            <p 
              className="
                text-lg 
                text-gray-400
              "
            >
              {project.company}
            </p>

            <p 
              className="
                mt-2 
                text-gray-300
              "
            >
              {project.description}
            </p>
          </div>

          {/* Image Gallery */}
          <div 
            className="
              md:col-span-3 
              overflow-auto 
              max-h-[100vh] 
              pt-4 
              sm:pt-12 
              md:pt-48 
              lg:pt-28 
              pb-14 
              p-6
            "
          >
            <ProjectImageGallery images={images} title={project.title} />
          </div>
        </motion.div>
      )}
    </div>
  );
}
