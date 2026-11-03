"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import { useLanguage } from "@/context/language-context";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  className?: string;
}

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const { locale, switchLanguage, isTransitioning } = useLanguage();

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isTransitioning) return;
    switchLanguage();
  };

  const currentFlag = locale === "fr" ? "cif:fr" : "tabler-flags:united-kingdom";
  const tooltip =
    locale === "fr"
      ? "Langue : Français (cliquer pour passer en Anglais)"
      : "Language: English (click to switch to French)";

  return (
    <motion.button
      type="button"
      onClick={handleToggle}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      disabled={isTransitioning}
      title={tooltip}
      aria-label={tooltip}
      className={cn(
        "relative flex items-center justify-center",
        " bg-background/60 hover:bg-muted/80 backdrop-blur-xs",
        "shadow-xs transition-colors cursor-pointer shrink-0 overflow-hidden",
        isTransitioning && "opacity-80 pointer-events-none",
        className
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={locale}
          initial={{ scale: 0.3, rotate: -70, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          exit={{ scale: 0.3, rotate: 70, opacity: 0 }}
          transition={{ type: "spring", stiffness: 450, damping: 24 }}
          className="flex items-center justify-center"
        >
          <Icon icon={currentFlag} className="w-5 h-5  shadow-xs" />
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
}

export default LanguageSwitcher;
