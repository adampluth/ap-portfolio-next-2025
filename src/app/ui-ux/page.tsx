"use client";

import { useState, useEffect } from "react";
import ThumbGallery from "@/components/ThumbGallery";
import { motion } from "framer-motion";

export default function UIUXPage() {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setShowContent(true), 600);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="ui-ux min-h-screen w-full max-w-6xl mx-auto pt-24 p-6">
      <div className="relative flex flex-col min-h-screen">
        {/* Render Only After Delay */}
        {showContent && (
          <>
            {/* Animated Header */}
            <motion.h1
              variants={{
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
              }}
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
              className="relative text-5xl mt-6 font-extrabold text-center"
            >
              {/* Diffused Glow Background */}
              <span className="absolute -inset-4 scale-125 blur-3xl opacity-50 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400"></span>

              {/* Main Gradient Text */}
              <span className="relative bg-gradient-to-r from-purple-400 via-pink-200 to-cyan-200 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(255,105,180,0.7)]">
                Development & UI/UX Portfolio
              </span>
            </motion.h1>

            {/* Blurb */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
              className="text-lg text-gray-300 text-center mt-4"
            >
              A showcase of my work in front-end development, UI/UX design, and digital twin visualization.
              Every project highlights a unique approach to interactive experiences, performance, and aesthetics.
            </motion.p>

            {/* Thumbnail Gallery */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
              className="mt-8 flex-grow"
            >
              <ThumbGallery />
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}
