"use client";

import React from "react";
import Link from "next/link";
import { type ServiceItem, localeDefaults } from "@/data/services";
import { useLanguage } from "@/context/language-context";
import { NavBar } from "@/components/Blocks/Navbar";
import { Footer } from "@/components/Blocks/Footer";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";

interface ServiceDetailViewProps {
  service: ServiceItem;
}

export function ServiceDetailView({ service }: ServiceDetailViewProps) {
  const { locale } = useLanguage();
  const texts = localeDefaults[locale] || localeDefaults.fr;
  const content = service[locale] || service.fr;

  return (
    <main className="relative min-h-screen flex flex-col bg-background text-foreground overflow-x-hidden">
      <NavBar />

      {/* Hero Header for Service */}
      <div className="relative w-full min-h-[60vh] md:min-h-[70vh] flex items-end px-4 sm:px-6 lg:px-8 pb-16 pt-32 overflow-hidden border-b border-border/40">
        {/* Background Image */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <img
            src={service.thumbnail}
            alt={content.title}
            className="w-full h-full object-cover object-center opacity-60 dark:opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />
        </div>

        <div className="max-w-5xl mx-auto w-full">
          {/* Back link */}
          <Link
            href={`/#${service.id}`}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-muted-foreground hover:text-foreground mb-6 px-3.5 py-1.5 rounded-full border border-border/80 bg-background/70 backdrop-blur-md transition-colors w-fit"
          >
            <Icon icon="solar:arrow-left-linear" className="w-4 h-4" />
            <span>{locale === "en" ? "Back to all services" : "Retour à tous les services"}</span>
          </Link>

          <div className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 backdrop-blur-xs mb-3">
            {content.tag}
          </div>

          <p className="text-sm sm:text-base font-medium text-muted-foreground uppercase tracking-widest mb-2">
            {content.subtitle}
          </p>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-foreground">
            {content.title}
          </h1>
        </div>
      </div>

      {/* Content Body */}
      <section className="max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Detailed Overview */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <h2 className="text-xs font-mono font-bold tracking-widest text-primary uppercase mb-3">
                {locale === "en" ? "Overview" : "Présentation"}
              </h2>
              <p className="text-lg sm:text-xl text-foreground/90 font-light leading-relaxed">
                {content.description}
              </p>
            </div>

            {/* Features list */}
            {content.features && content.features.length > 0 && (
              <div className="pt-6 border-t border-border/60">
                <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-4">
                  {texts.keyFeatures}
                </h3>
                <ul className="space-y-4">
                  {content.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 p-4 rounded-xl border border-border/60 bg-card/60 backdrop-blur-xs"
                    >
                      <Icon
                        icon="solar:check-circle-bold"
                        className="w-5 h-5 text-primary shrink-0 mt-0.5"
                      />
                      <span className="text-sm sm:text-base text-foreground/90 font-medium">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right: Contact & Action Card */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 p-8 rounded-2xl border border-border/80 bg-card/80 backdrop-blur-md shadow-xl flex flex-col gap-6">
              <div>
                <span className="text-xs font-mono font-bold text-primary tracking-widest uppercase block mb-1">
                  Safaridew Solution
                </span>
                <h3 className="text-xl font-bold text-foreground">
                  {locale === "en" ? "Interested in this service?" : "Intéressé par ce service ?"}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground mt-2 leading-relaxed">
                  {locale === "en"
                    ? "Let's discuss how we can tailor this solution to your organization's specific needs."
                    : "Échangeons sur la façon dont nous pouvons adapter cette solution aux besoins spécifiques de votre organisation."}
                </p>
              </div>

              <div className="flex flex-col gap-3 pt-2">
                <Button className="w-full rounded-full py-6 font-bold shadow-md">
                  <span>{texts.contactUs}</span>
                  <Icon icon="solar:arrow-right-linear" className="w-4 h-4 ml-2" />
                </Button>

                <Link
                  href="/#services-section"
                  className="w-full text-center py-2.5 rounded-full text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors border border-border/60"
                >
                  {locale === "en" ? "Explore other services" : "Découvrir les autres services"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer on detail view */}
      <Footer />
    </main>
  );
}

export default ServiceDetailView;

