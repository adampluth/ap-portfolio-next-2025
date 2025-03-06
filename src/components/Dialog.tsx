"use client";

import { useEffect } from "react";
import { ReactNode } from "react";
import { X } from "lucide-react";
import { motion } from "framer-motion";

interface DialogProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Dialog({ title, isOpen, onClose, children }: DialogProps) {
  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = ""; // Re-enable scrolling
    }

    return () => {
      document.body.style.overflow = ""; // Cleanup on unmount
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-md z-50">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} 
        animate={{ opacity: 1, scale: 1 }} 
        exit={{ opacity: 0, scale: 0.95 }} 
        className="bg-white dark:bg-gray-900 rounded-lg shadow-lg max-w-3xl w-full overflow-hidden"
      >
        {/* Header with Fixed Title and Close Button */}
        <div className="flex justify-between items-center px-6 py-4 border-b dark:border-gray-800">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-md">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="max-h-[75vh] overflow-y-auto p-6">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
