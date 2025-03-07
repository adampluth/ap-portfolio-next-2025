"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function AboutPage() {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setShowContent(true), 600);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div 
      className="
        relative 
        min-h-screen 
        flex 
        flex-col 
        items-center 
        justify-center 
        px-6 
        md:px-12 
        text-center
      "
    >
      {/* Diffused Glow Background */}
      <div 
        className="
          absolute 
          inset-0 
          -z-10
        "
      >
        <div 
          className="
            fixed 
            inset-0 
            bg-radial-gradient 
            mix-blend-overlay 
            opacity-50
          "
        />
      </div>

      {/* Render Only After Delay */}
      {showContent && (
        <>
          {/* Animated Heading */}
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
            className="
              relative 
              text-5xl 
              md:text-6xl 
              font-extrabold 
              text-center 
              text-white
            "
          >
            {/* Diffused Glow */}
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
                via-pink-400 
                to-cyan-300 
                bg-clip-text 
                text-transparent 
                drop-shadow-[0_0_25px_rgba(255,105,180,0.7)]
              "
            >
              About Me
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            className="
              mt-6 
              max-w-2xl 
              text-lg 
              md:text-xl 
              text-gray-300 
              leading-relaxed
            "
          >
            {"I'm a "}
            <span 
              className="
                bg-gradient-to-r 
                from-cyan-400 
                to-teal-300 
                bg-clip-text 
                text-transparent 
                font-semibold
              "
            >
              Visualization Scientist
            </span>{" "}
            and{" "}
            <span 
              className="
                bg-gradient-to-r 
                from-purple-400 
                to-pink-400 
                bg-clip-text 
                text-transparent 
                font-semibold
              "
            >
              Front-End Architect
            </span>{" "}
            specializing in{" "}
            <span className="text-cyan-300">
              Digital Twin interfaces
            </span>,{" "}
            <span className="text-purple-300">
              ICS cybersecurity
            </span>, and{" "}
            <span className="text-pink-300">
              modern UI design
            </span>.
          </motion.p>

          {/* Resume & Contact */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
            className="
              mt-8 
              flex 
              gap-4
            "
          >
            {/* Resume Button */}
            <Link href="https://drive.google.com/drive/folders/1-04XwFQObXBbg_M8yVS_ZIV33_RlzIAe">
              <button
                className="
                  px-6
                  py-3
                  text-lg
                  font-medium
                  btn
                  btn-md
                  glass
                  !shadow-lg
                  text-white
                  bg-teal-700/60
                  rounded-lg
                  transition
                  hover:bg-teal-600/80
                "
              >
                My Resume
              </button>
            </Link>

            {/* Contact Button */}
            <Link href="/contact">
              <button
                className="
                  px-6
                  py-3
                  text-lg
                  font-medium
                  btn
                  btn-md
                  glass
                  !shadow-lg
                  text-white
                  bg-teal-700/60
                  rounded-lg
                  transition
                  hover:bg-teal-600/80
                "
              >
                Get in Touch
              </button>
            </Link>
          </motion.div>
        </>
      )}
    </div>
  );
}
