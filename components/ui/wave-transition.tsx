"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import { type Locale } from "@/context/language-context";

interface WaveTransitionProps {
  isActive: boolean;
  targetLocale: Locale | null;
  onMidpoint: () => void;
  onComplete: () => void;
}

export function WaveTransition({
  isActive,
  targetLocale,
  onMidpoint,
  onComplete,
}: WaveTransitionProps) {
  useEffect(() => {
    if (!isActive) return;

    // Midpoint: screen is fully covered by waves, switch language
    const midpointTimer = setTimeout(() => {
      onMidpoint();
    }, 450);

    // Complete: waves have completely exited at the bottom
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 1200);

    return () => {
      clearTimeout(midpointTimer);
      clearTimeout(completeTimer);
    };
  }, [isActive, onMidpoint, onComplete]);

  if (!isActive || !targetLocale) return null;

  const targetFlag = targetLocale === "fr" ? "circle-flags:fr" : "circle-flags:uk";
  const title =
    targetLocale === "fr" ? "Passage en Français" : "Switching to English";
  const subtitle =
    targetLocale === "fr" ? "Balayage de la langue..." : "Sweeping content...";

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden">
      <AnimatePresence>
        {/* WAVE LAYER 1 - Translucent Cyan/Emerald Accent (Leads the sweep) */}
        <motion.div
          key="wave-layer-1"
          initial={{ y: "-130vh" }}
          animate={{ y: "130vh" }}
          transition={{ duration: 1.05, ease: [0.45, 0.05, 0.55, 0.95] }}
          className="absolute inset-x-0 w-full flex flex-col pointer-events-none"
        >
          {/* Top Edge Wave */}
          <motion.div
            animate={{ x: [-25, 25, -25] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            className="w-[120%] -translate-x-[10%] h-24 text-primary/30 fill-current"
          >
            <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="w-full h-full">
              <path d="M0,45 C320,95 640,-10 960,60 C1200,95 1360,20 1440,40 L1440,100 L0,100 Z" />
            </svg>
          </motion.div>

          {/* Body */}
          <div className="w-full h-[85vh] bg-gradient-to-b from-primary/30 via-primary/20 to-primary/35 backdrop-blur-xs" />

          {/* Bottom Edge Wave */}
          <motion.div
            animate={{ x: [25, -25, 25] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            className="w-[120%] -translate-x-[10%] h-24 text-primary/35 fill-current"
          >
            <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="w-full h-full">
              <path d="M0,0 L1440,0 L1440,60 C1280,10 1040,95 720,40 C400,-15 160,85 0,50 Z" />
            </svg>
          </motion.div>
        </motion.div>

        {/* WAVE LAYER 2 - Medium Density Wave (Opposite oscillation) */}
        <motion.div
          key="wave-layer-2"
          initial={{ y: "-130vh" }}
          animate={{ y: "130vh" }}
          transition={{ duration: 1.1, delay: 0.07, ease: [0.42, 0, 0.58, 1] }}
          className="absolute inset-x-0 w-full flex flex-col pointer-events-none"
        >
          {/* Top Edge Wave */}
          <motion.div
            animate={{ x: [30, -30, 30] }}
            transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
            className="w-[120%] -translate-x-[10%] h-28 text-primary/50 dark:text-primary/40 fill-current"
          >
            <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="w-full h-full">
              <path d="M0,60 C240,10 600,90 900,30 C1200,80 1380,25 1440,55 L1440,100 L0,100 Z" />
            </svg>
          </motion.div>

          {/* Body */}
          <div className="w-full h-[90vh] bg-gradient-to-b from-primary/50 via-primary/40 to-primary/60 backdrop-blur-sm" />

          {/* Bottom Edge Wave */}
          <motion.div
            animate={{ x: [-30, 30, -30] }}
            transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
            className="w-[120%] -translate-x-[10%] h-28 text-primary/60 dark:text-primary/50 fill-current"
          >
            <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="w-full h-full">
              <path d="M0,0 L1440,0 L1440,45 C1240,90 920,15 640,75 C360,20 160,95 0,40 Z" />
            </svg>
          </motion.div>
        </motion.div>

        {/* WAVE LAYER 3 - Main Opaque Backdrop with Center Message */}
        <motion.div
          key="wave-layer-3"
          initial={{ y: "-130vh" }}
          animate={{ y: "130vh" }}
          transition={{ duration: 1.18, delay: 0.14, ease: [0.4, 0, 0.4, 1] }}
          className="absolute inset-x-0 w-full flex flex-col pointer-events-none"
        >
          {/* Top Edge Wave */}
          <motion.div
            animate={{ x: [-20, 20, -20] }}
            transition={{ duration: 1.3, repeat: Infinity, ease: "easeInOut" }}
            className="w-[120%] -translate-x-[10%] h-32 text-background dark:text-card fill-current filter drop-shadow-md"
          >
            <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="w-full h-full">
              <path d="M0,50 C360,15 720,85 1080,25 C1280,65 1380,30 1440,45 L1440,100 L0,100 Z" />
            </svg>
          </motion.div>



          {/* Bottom Edge Wave */}
          <motion.div
            animate={{ x: [20, -20, 20] }}
            transition={{ duration: 1.3, repeat: Infinity, ease: "easeInOut" }}
            className="w-[120%] -translate-x-[10%] h-32 text-background dark:text-card fill-current filter drop-shadow-lg"
          >
            <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="w-full h-full">
              <path d="M0,0 L1440,0 L1440,50 C1260,20 980,85 700,30 C420,80 180,25 0,60 Z" />
            </svg>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default WaveTransition;

