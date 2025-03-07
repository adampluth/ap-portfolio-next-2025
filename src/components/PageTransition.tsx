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
      {/* Page Transition Effect with a Cyberpunk Gradient */}
      <AnimatePresence mode="wait">
        {isTransitioning && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="fixed inset-0 z-30 bg-gradient-to-tr from-[#0f172a] via-[#7b2cbf] to-[#21d4fd]" // Cyberpunk gradient
          />
        )}
      </AnimatePresence>

      {/* Persistent Background AFTER Transition Completes */}
      {backgroundActive && (
        <div className="fixed inset-0 z-10 bg-gradient-to-tr from-[#0f172a] via-[#7b2cbf] to-[#21d4fd]" />
      )}

      {/* Ensure Page Content is Visible After Transition */}
      <div className={`relative z-20 transition-opacity duration-500 ${isTransitioning ? "opacity-0" : "opacity-100"}`}>
        {children}
      </div>
    </div>
  );
}
