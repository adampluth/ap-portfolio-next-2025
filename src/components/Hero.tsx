"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Hero() {
  return (
    <div 
      className="
        relative 
        flex 
        flex-col 
        items-center 
        justify-center 
        min-h-screen 
        text-white 
        overflow-hidden
      "
    >
      {/* Animated Background Overlay */}
      <div 
        className="
          absolute 
          inset-0 
          bg-black/40  
          z-0
        " 
      />

      {/* Content Wrapper */}
      <div 
        className="
          relative 
          z-10 
          flex 
          flex-col 
          items-center 
          text-center 
          space-y-6 
          px-6
        "
      >
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
            className="w-36 md:w-48 lg:w-60 pt-6 md:pt-0"
          />
        </motion.div>

        {/* Enhanced Title */}
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
            text-3xl
            md:text-5xl 
            font-extrabold 
            text-center 
            leading-tight
            px-2
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
              via-pink-200 
              to-cyan-200 
              bg-clip-text 
              text-transparent 
              drop-shadow-[0_0_25px_rgba(255,105,180,0.7)]
            "
          >
            Building the Future of UI & Digital Twins
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
          className="
            text-md 
            md:text-xl 
            text-gray-300 
            max-w-[700px]
            px-2
          "
        >
          {/* Mobile Version (breaks into two lines differently) */}
          <span className="block sm:hidden">
            Front-End Architect | Senior Software Engineer <br />
            Digital Twins | OT/ICS Cybersecurity <br />
            UI/UX & Data Visualization
          </span>

          {/* Desktop Version (default format) */}
          <span className="hidden sm:block">
            Front-End Architect | Senior Software Engineer | Digital Twins <br />
            OT/ICS Cybersecurity | UI/UX & Data Visualization
          </span>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}
          className="
            flex 
            flex-wrap 
            justify-center 
            gap-4 
            mt-4
          "
        >
          <Link href="/ui-ux">
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
              Portfolio
            </button>
          </Link>

          <Link href="/about">
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
              About Me
            </button>
          </Link>

          {/* Social Links */}
          <div className="flex space-x-4">
            {/* GitHub */}
            <a 
              href="https://github.com/adampluth" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <button 
                className="
                  btn 
                  btn-circle 
                  btn-md 
                  glass 
                  bg-teal-700/60 
                  hover:bg-teal-700/50 
                  active:bg-teal-700/40 
                  transition
                "
              >
                <FaGithub className="w-6 h-6 text-white !shadow-lg" />
              </button>
            </a>

            {/* LinkedIn */}
            <a 
              href="https://www.linkedin.com/in/adampluth/" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <button 
                className="
                  btn 
                  btn-circle 
                  btn-md 
                  glass 
                  bg-blue-600/60 
                  hover:bg-blue-600/50 
                  active:bg-blue-600/40 
                  transition
                "
              >
                <FaLinkedin className="w-6 h-6 text-white !shadow-lg" />
              </button>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
