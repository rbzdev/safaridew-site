"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { useLanguage } from "@/context/language-context";
import { cn } from "@/lib/utils";

export interface FooterProps {
  className?: string;
}

const footerContent = {
  fr: {
    tagline: "L'innovation technologique panafricaine au service de vos ambitions.",
    navTitle: "Navigation",
    navLinks: [
      { name: "Team", href: "#team" },
      { name: "Projets", href: "#projects" },
      { name: "Carrières", href: "#careers" },
    ],
    contactTitle: "Nous trouver",
    email: "hello@safaridew.com",
    bookACall: "Réserver un appel",
    copyright: "Tous droits réservés.",
    backToTop: "Haut de page",
  },
  en: {
    tagline: "Pan-African technological innovation empowering your boldest ambitions.",
    navTitle: "Navigation",
    navLinks: [
      { name: "Team", href: "#team" },
      { name: "Projects", href: "#projects" },
      { name: "Careers", href: "#careers" },
    ],
    contactTitle: "Find Us",
    email: "hello@safaridew.com",
    bookACall: "Book a call",
    copyright: "All rights reserved.",
    backToTop: "Back to top",
  },
};

const googleMapsUrl =
  "https://maps.app.goo.gl/ibJdk5ge8sGcS9tD8";
const calComUrl = "https://cal.com/safaridew";

export function Footer({ className }: FooterProps) {
  const { locale } = useLanguage();
  const t = footerContent[locale] || footerContent.fr;
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className={cn(
        "relative w-full border-t border-border/60 bg-background/80 dark:bg-zinc-950/80 backdrop-blur-md text-foreground transition-colors",
        className
      )}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-16">
        {/* GRILLE PRINCIPALE MINIMALISTE : 3 COLONNES */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-border/50">
          {/* COLONNE 1 : MARQUE & RÉSEAUX (LINKEDIN & FACEBOOK SEULEMENT) */}
          <div className="md:col-span-5 flex flex-col justify-between space-y-5">
            <div>
              <Link href="/" className="inline-flex items-center gap-3 group/brand">
                <div className="relative w-9 h-9 rounded-xl overflow-hidden bg-background border border-border shadow-xs p-1 flex items-center justify-center transition-transform group-hover/brand:scale-105">
                  <Image
                    src="/assets/logos/icon.svg"
                    alt="Safaridew Logo"
                    width={36}
                    height={36}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-xl font-black tracking-tight text-foreground">
                  Safaridew
                </span>
              </Link>

              <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-sm font-light">
                {t.tagline}
              </p>
            </div>

            {/* Réseaux sociaux : Uniquement LinkedIn & Facebook */}
            <div className="flex items-center gap-2 pt-1">
              <a
                href="https://linkedin.com/company/safaridew"
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn"
                className="w-8 h-8 rounded-full border border-border/80 bg-background/50 hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all shadow-xs"
              >
                <Icon icon="simple-icons:linkedin" className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://facebook.com/safaridew"
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook"
                className="w-8 h-8 rounded-full border border-border/80 bg-background/50 hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all shadow-xs"
              >
                <Icon icon="simple-icons:facebook" className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* COLONNE 2 : NAVIGATION (TEAM, PROJETS, CARRIÈRE SEULEMENT) */}
          <div className="md:col-span-3 space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-primary">
              {t.navTitle}
            </h3>
            <ul className="space-y-2.5">
              {t.navLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLONNE 3 : NOUS TROUVER (ADRESSE SIMPLE GMAPS, EMAIL & BOOK A CALL CAL.COM) */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-primary">
              {t.contactTitle}
            </h3>

            <div className="space-y-3 text-sm">
              {/* Adresse avec lien direct Google Maps */}
              <Link
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group/addr inline-flex items-start gap-2.5 text-muted-foreground hover:text-foreground transition-colors leading-relaxed"
                title="Google Maps"
              >
                <Icon
                  icon="solar:map-point-linear"
                  className="w-4 h-4 text-primary shrink-0 mt-0.5 group-hover/addr:translate-y-[-1px] transition-transform"
                />
                <span className="hover:underline">N° 17, Avenue Kilela Balanda - Lubumbashi</span>
              </Link>

              {/* Adresse email directe */}
              <div className="flex items-center gap-2.5">
                <Icon icon="solar:letter-linear" className="w-4 h-4 text-primary shrink-0" />
                <a
                  href={`mailto:${t.email}`}
                  className="text-muted-foreground hover:text-foreground hover:underline transition-colors"
                >
                  {t.email}
                </a>
              </div>

              {/* Lien Book a call vers cal.com */}
              <div className="pt-1">
                <a
                  href={calComUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-xs"
                >
                  <Icon icon="solar:calendar-linear" className="w-3.5 h-3.5" />
                  <span>{t.bookACall}</span>
                  <Icon icon="solar:arrow-right-up-linear" className="w-3 h-3 ml-0.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* BAS DE PAGE MINIMALISTE (COPYRIGHT & RETOUR HAUT, AUCUN LIEN LÉGAL) */}
        <div className="pt-6 flex items-center justify-between text-xs text-muted-foreground font-light">
          <span>
            © {currentYear} Safaridew SARL. {t.copyright}
          </span>

          <button
            type="button"
            onClick={scrollToTop}
            title={t.backToTop}
            className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors p-1 rounded-md hover:bg-muted"
          >
            <span>{t.backToTop}</span>
            <Icon icon="solar:arrow-up-linear" className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
