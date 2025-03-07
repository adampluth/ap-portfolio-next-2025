"use client";

import React from "react";
import ThumbGallery from "@/components/ThumbGallery";
import { motion } from "motion/react";

export default function UIUXPage() {
  return (
    <div className="ui-ux max-w-6xl mx-auto p-6">
      <motion.h1 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
        className="text-4xl font-bold mb-6"
      >
        Development and UI/UX
      </motion.h1>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
      >
        <ThumbGallery />
      </motion.div>
    </div>
  );
}
