"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { useLanguage } from "@/context/language-context";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

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

              <div className="relative h-20 w-46 overflow-hidden flex items-center justify-center">
                <Image
                  src="/assets/logos/logo_large_default.svg"
                  alt="Safaridew Logo"
                  width={200}
                  height={150}
                  className="w-full h-full object-cover hidden dark:block"
                />

                <Image
                  src="/assets/logos/logo_large_black.svg"
                  alt="Safaridew Logo"
                  width={200}
                  height={150}
                  className="w-full h-full object-cover dark:hidden"
                />
              </div>



              {/* <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-sm font-light">
                {t.tagline}
              </p> */}
            </div>

            {/* Réseaux sociaux : Uniquement LinkedIn & Facebook */}
            <div className="flex items-center gap-2 pt-1">
              <Link
                href="https://linkedin.com/company/safaridew"
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn"
                className="w-16 h-16 border border-border/80 bg-background/50 hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all shadow-xs"
              >
                <Icon icon="simple-icons:linkedin" className="size-8" />
              </Link>
              <Link
                href="https://facebook.com/share/1A2skUuKke/?mibexid=wwXlfr"
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook"
                className="w-16 h-16 border border-border/80 bg-background/50 hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all shadow-xs"
              >
                <Icon icon="simple-icons:facebook" className="size-8" />
              </Link>

              <Link
                href="https://instagram.com/safaridew_"
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram"
                aria-disabled
                className="w-16 h-16 border border-border/80 bg-background/50 hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all shadow-xs"
              >
                <Icon icon="lets-icons:insta-fill" className="size-10" />
              </Link>
            </div>
          </div>

          {/* COLONNE 2 : NAVIGATION (TEAM, PROJETS, CARRIÈRE SEULEMENT) */}
          <div className="md:col-span-3 space-y-4">
            <h3 className="text-sm font-light uppercase">
              {t.navTitle}
            </h3>
            <ul className="space-y-2.5">
              {t.navLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-block hover:underline"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLONNE 3 : NOUS TROUVER (ADRESSE SIMPLE GMAPS, EMAIL & BOOK A CALL CAL.COM) */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="text-sm font-light uppercase ">
              {t.contactTitle}
            </h3>

            <div className="space-y-3 text-sm">
              {/* Adresse avec lien direct Google Maps */}
              <Link
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group/addr inline-flex items-start gap-2.5 text-muted-foreground hover:text-foreground transition-colors leading-relaxed "
                title="Google Maps"
              >
                <Icon
                  icon="solar:map-point-linear"
                  className="w-4 h-4 text-primary shrink-0 mt-0.5 group-hover/addr:translate-y-[-1px] transition-transform"
                />
                <span className="hover:underline text-">N° 17, Avenue Kilela Balanda - Lubumbashi</span>
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
                  className="group"
                >
                  <Button className="flex items-center">
                    <Icon icon="solar:calendar-linear" className="size-4" />
                    <span className="font-light text-sm">{t.bookACall}</span>
                    <Icon icon="bitcoin-icons:arrow-right-outline" className="size-5 ml-0.5 -rotate-45  group-hover:translate-x-1 transition-transform" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* BAS DE PAGE MINIMALISTE (COPYRIGHT & RETOUR HAUT, AUCUN LIEN LÉGAL) */}
        <div className="pt-6 flex items-center justify-between text-xs text-muted-foreground font-light">
          <span>
            © {currentYear} Safaridew SARLU. {t.copyright}
          </span>

          <Button
            onClick={scrollToTop}
            title={t.backToTop}
            variant={"outline"}
          >
            <span>{t.backToTop}</span>
            <Icon icon="flowbite:angle-up-outline" className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
