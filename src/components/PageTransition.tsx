"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [backgroundActive, setBackgroundActive] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/") {
      setBackgroundActive(false);
      return;
    }

    setIsTransitioning(true);

    const timeout = setTimeout(() => {
      setIsTransitioning(false);
      setBackgroundActive(true);
    }, 800);

    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <div className="relative">
      {/* Page Transition Effect */}
      <AnimatePresence mode="wait">
        {isTransitioning && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="fixed inset-0 bg-black z-50"
          />
        )}
      </AnimatePresence>

      {/* Persistent Background AFTER Transition Completes */}
      {backgroundActive && (
        <div className="fixed inset-0 bg-black -z-10" />
      )}

      {/* Content (hidden until transition finishes to prevent blinking) */}
      <div className={`${isTransitioning ? "opacity-0" : "opacity-100"} transition-opacity duration-500`}>
        {children}
      </div>
    </div>
  );
}
