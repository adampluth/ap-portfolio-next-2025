"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Hero() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen text-white overflow-hidden">

      {/* Content Wrapper */}
      <div className="relative z-10 flex flex-col items-center text-center space-y-6 px-6">
        {/* Logo */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Image 
            src="/img/AP-logo-2020-150.png" 
            alt="My Logo" 
            width={220} 
            height={220} 
            className="w-48 md:w-60"
          />
        </motion.div>

        {/* Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-6xl font-bold"
        >
          Welcome to My Portfolio
        </motion.h1>

        {/* Subheadline */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
          className="text-lg md:text-2xl text-gray-300 max-w-[700px]"
        >
          Front-End Architect | Senior Software Engineer | Digital Twins | OT/ICS Cybersecurity | UI/UX & Data Visualization
        </motion.p>

        {/* Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}
          className="flex flex-wrap justify-center gap-4 mt-4"
        >
          <Link href="/ui-ux">
            <button className="px-6 py-3 text-lg font-medium btn btn-md glass bg-teal-700/60 rounded-lg transition hover:bg-gray-200">
              Portfolio
            </button>
          </Link>
          <Link href="/about">
            <button className="px-6 py-3 text-lg font-medium btn btn-md glass bg-teal-700/60 rounded-lg transition hover:bg-gray-200">
              About Me
            </button>
          </Link>
          <div className="flex space-x-4">
            {/* GitHub Button */}
            <a href="https://github.com/adampluth" target="_blank" rel="noopener noreferrer">
              <button className="btn btn-circle btn-md glass bg-teal-700/60 hover:bg-teal-700/50 active:bg-teal-700/40 transition">
                <FaGithub className="w-6 h-6 text-white" />
              </button>
            </a>

            {/* LinkedIn Button */}
            <a href="https://www.linkedin.com/in/adampluth/" target="_blank" rel="noopener noreferrer">
              <button className="btn btn-circle btn-md glass bg-blue-600/60 hover:bg-blue-600/50 active:bg-blue-600/40 transition">
                <FaLinkedin className="w-6 h-6 text-white" />
              </button>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
