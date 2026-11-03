"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { WaveTransition } from "@/components/ui/wave-transition";

export type Locale = "fr" | "en";

interface LanguageContextType {
  locale: Locale;
  targetLocale: Locale | null;
  isTransitioning: boolean;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  switchLanguage: (next?: Locale) => void;
  t: (key: string) => string;
}

const translations: Record<Locale, Record<string, string>> = {
  fr: {
    "nav.blog": "Blog",
    "nav.about": "À propos",
    "nav.services": "Services",
    "nav.contact": "Contact",
    "hero.title": "La société Ultime de l'innovation panafricaine.",
    "hero.description":
      "Safaridew est une entreprise enregistrée en RDC🇨🇩 qui développe et propose des solutions innovantes pour aider de manière directe ou indirecte, à résoudre certains problèmes du quotidien, pour rendre agréable la vie de ses partenaires.",
    "hero.viewDetail": "Voir le détail",
    "page.readyTitle": "Projet prêt !",
    "page.readyDesc": "Vous pouvez maintenant ajouter des composants et commencer à construire.",
    "page.readyButton": "Bouton",
    "page.readyHint": "(Appuyez sur d pour basculer en mode sombre)",
  },
  en: {
    "nav.blog": "Blog",
    "nav.about": "About",
    "nav.services": "Services",
    "nav.contact": "Contact",
    "hero.title": "The Ultimate Pan-African Innovation Studio.",
    "hero.description":
      "Safaridew is an enterprise registered in the DRC🇨🇩 that develops and delivers innovative solutions to directly or indirectly resolve everyday challenges, enriching the lives of its partners.",
    "hero.viewDetail": "View details",
    "page.readyTitle": "Project ready!",
    "page.readyDesc": "You may now add components and start building.",
    "page.readyButton": "Button",
    "page.readyHint": "(Press d to toggle dark mode)",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("fr");
  const [targetLocale, setTargetLocale] = useState<Locale | null>(null);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("safaridew-locale") as Locale;
      if (saved === "fr" || saved === "en") {
        setLocaleState(saved);
      }
    } catch {
      // Local storage not available (SSR / private browsing)
    }
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    try {
      localStorage.setItem("safaridew-locale", newLocale);
    } catch {
      // Ignore storage errors
    }
  }, []);

  // Trigger the wave transition to switch language
  const switchLanguage = useCallback(
    (requestedLocale?: Locale) => {
      if (isTransitioning) return; // Prevent double-trigger during animation

      const next = requestedLocale ?? (locale === "fr" ? "en" : "fr");
      if (next === locale) return;

      setTargetLocale(next);
      setIsTransitioning(true);
    },
    [locale, isTransitioning]
  );

  const toggleLocale = useCallback(() => {
    switchLanguage();
  }, [switchLanguage]);

  // Midpoint callback: waves cover the screen, flip the language!
  const handleMidpoint = useCallback(() => {
    if (targetLocale) {
      setLocale(targetLocale);
    }
  }, [targetLocale, setLocale]);

  // Completion callback: waves finished sweeping
  const handleComplete = useCallback(() => {
    setIsTransitioning(false);
    setTargetLocale(null);
  }, []);

  const t = useCallback(
    (key: string): string => {
      const dict = translations[locale];
      const fallbackDict = translations.fr;
      return dict?.[key] ?? fallbackDict?.[key] ?? key;
    },
    [locale]
  );

  return (
    <LanguageContext.Provider
      value={{
        locale,
        targetLocale,
        isTransitioning,
        setLocale,
        toggleLocale,
        switchLanguage,
        t,
      }}
    >
      {children}

      {/* Full-screen oscillating wave transition overlay */}
      <WaveTransition
        isActive={isTransitioning}
        targetLocale={targetLocale}
        onMidpoint={handleMidpoint}
        onComplete={handleComplete}
      />
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
