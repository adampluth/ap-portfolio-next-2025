"use client";

import { useEffect, ReactNode } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface DialogProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Dialog({ title, isOpen, onClose, children }: DialogProps) {
  // Prevent background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="
            fixed
            inset-0
            flex
            items-center
            justify-center
            bg-black/60
            backdrop-blur-md
            z-50
          "
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="
              bg-gray-900/90
              dark:bg-gray-900
              border border-gray-700/60
              shadow-xl
              max-w-3xl
              w-full
              overflow-hidden
              rounded-lg
              backdrop-blur-xl
            "
          >
            {/* Header with Title and Close Button */}
            <div
              className="
                flex
                justify-between
                items-center
                px-6
                py-4
                border-b
                border-gray-800/60
                bg-gradient-to-r
                from-purple-500/30
                via-pink-500/30
                to-cyan-400/30
                backdrop-blur-md
              "
            >
              <h2 className="text-lg font-semibold text-white">{title}</h2>
              <button
                onClick={onClose}
                className="
                  p-2
                  rounded-md
                  text-white
                  hover:bg-gray-800/50
                  transition
                "
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="max-h-[75vh] overflow-y-auto p-6 text-gray-300">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
