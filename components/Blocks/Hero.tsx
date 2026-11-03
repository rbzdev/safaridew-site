"use client";

import React from "react";
import {
  HeroParallax,
  type Product,
} from "@/components/Blocks/hero-parallax";
import { getHeroProducts, type Locale } from "@/data/services";
import { useLanguage } from "@/context/language-context";

export interface HeroSectionProps {
  products?: Product[];
  locale?: Locale;
  title?: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
}

export const defaultProducts: Product[] = getHeroProducts("fr");

export { defaultProducts as products };

export function Hero({
  products,
  locale: propLocale,
  title,
  description,
  className,
}: HeroSectionProps) {
  const { locale: globalLocale } = useLanguage();
  const activeLocale = propLocale ?? globalLocale;
  const activeProducts = products ?? getHeroProducts(activeLocale);

  const localizedTitle =
    title ??
    (activeLocale === "en" ? (
      <>
        The Ultimate <br /> Pan-African Innovation <br /> Studio.
      </>
    ) : (
      <>
        La société <br /> Ultime de l'innovation <br /> panafricaine.
      </>
    ));

  const localizedDescription =
    description ??
    (activeLocale === "en"
      ? "Safaridew is an enterprise registered in the DRC🇨🇩 that develops and delivers innovative solutions to directly or indirectly resolve everyday challenges, enriching the lives of its partners."
      : "Safaridew est une entreprise enregistrée en RDC🇨🇩 qui développe et propose des solutions innovantes pour aider de manière directe ou indirecte, à résoudre certains problèmes du quotidien, pour rendre agréable la vie de ses partenaires.");

  return (
    <section className={className}>
      <HeroParallax
        products={activeProducts}
        title={localizedTitle}
        description={localizedDescription}
      />
    </section>
  );
}

export const HeroSection = Hero;
export default Hero;
