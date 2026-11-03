"use client";

import React, { useEffect, useState } from "react";
import { services, localeDefaults } from "@/data/services";
import { useLanguage } from "@/context/language-context";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

export interface PartnerServicesProps {
    className?: string;
}

export function PartnerServices({ className }: PartnerServicesProps) {
    const { locale } = useLanguage();
    const [activeHash, setActiveHash] = useState<string>("");

    const texts = localeDefaults[locale] || localeDefaults.fr;

    useEffect(() => {
        const handleHash = () => {
            const hash = window.location.hash.replace("#", "");
            if (hash) {
                setActiveHash(hash);
            }
        };

        handleHash();
        window.addEventListener("hashchange", handleHash);
        return () => window.removeEventListener("hashchange", handleHash);
    }, []);

    return (
        <div id="services-section" className={cn("relative w-full", className)}>
            {/* En-tête épuré et minimaliste */}
            <header className="relative w-full pt-20 pb-10 px-4 text-center scroll-mt-28">
                <span className="text-sm font-mono text-primary uppercase block mb-3">
                    {texts.sectionBadge}
                </span>
                <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground">
                    {texts.sectionTitle}
                </h2>
            </header>

            {/* Sections entières par service */}
            <div className="w-full flex flex-col">
                {services.map((service, index) => {
                    const content = service[locale] || service.fr;
                    const isTargeted = activeHash === service.id;

                    return (
                        <section
                            key={service.id}
                            id={service.id}
                            className={cn(
                                "relative w-full min-h-[80vh] md:min-h-[85vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 scroll-mt-24 overflow-hidden transition-all duration-500",
                                isTargeted && "ring-2 ring-primary ring-inset"
                            )}
                        >
                            {/* IMAGE DE FOND CLAIREMENT VISIBLE AVEC OVERLAY ADAPTÉ LIGHT & DARK */}
                            <div className="absolute inset-0 -z-10 select-none pointer-events-none">
                                <Image
                                    src={service.thumbnail}
                                    alt={content.title}
                                    height={400}
                                    width={400}
                                    priority={false}

                                    className="w-full h-full object-cover object-center opacity-60 "
                                    loading="lazy"
                                />
                                {/* Overlay partiel translucide : lumineux en light mode, tamisé en dark mode */}
                                <div className="absolute inset-0 bg-white/55 dark:bg-black/50 transition-colors duration-500" />
                                <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-white/50 dark:from-black/85 dark:via-transparent dark:to-black/50 transition-colors duration-500" />
                            </div>

                            {/* TABLEAU MINIMALISTE DE CASES ADAPTÉ LIGHT & DARK */}
                            <div className="relative max-w-5xl w-full mx-auto overflow- bg-white/75 dark:bg-black/45 backdrop-blur-md shadow-xl dark:shadow-2xl transition-all duration-500">
                                {/* LIGNE SUPÉRIEURE DU TABLEAU */}
                                <div className="grid grid-cols-1 md:grid-cols-12 border-b border-neutral-200/90 dark:border-white/20">
                                    {/* Case 1 : Index & Tag (décalage haut-gauche au survol) */}
                                    <div className="md:col-span-4 p-6 sm:p-8 border-b md:border-b-0 md:border-r border-neutral-200/90 dark:border-white/20 transition-all duration-300 ease-out hover:-translate-y-2 hover:-translate-x-1.5 hover:bg-white/95 dark:hover:bg-black/60 hover:border-neutral-300 dark:hover:border-white/40 hover:shadow-2xl hover:border ">
                                        <span className="text-4xl sm:text-5xl font-mono font-black text-neutral-900 dark:text-white/95 tracking-tighter block mb-3">
                                            #{String(index + 1).padStart(2, "0")}
                                        </span>
                                        <span className="inline-block text-xs font- px-3 py-1 bg-neutral-900/10 text-neutral-900 border border-neutral-900/15 dark:bg-white/15 dark:text-white/90 dark:border-white/20 backdrop-blur-xs">
                                            {content.tag}
                                        </span>
                                    </div>

                                    {/* Case 2 : Titre & Sous-titre (décalage haut-droite au survol) */}
                                    <div className="md:col-span-8 p-6 sm:p-8 flex flex-col justify-center transition-all duration-300 ease-out hover:-translate-y-2 hover:translate-x-1.5 hover:bg-white/95 dark:hover:bg-black/60 hover:border-neutral-300 dark:hover:border-white/40 hover:shadow-2xl hover:border">
                                        <p className="uppercase font-thin tracking-tight text-neutral-600 dark:text-white/70 mb-1.5">
                                            {content.subtitle}
                                        </p>
                                        <h3 className="text-2xl sm:text-4xl font-extrabold text-neutral-950 dark:text-white tracking-tight">
                                            {content.title}
                                        </h3>
                                    </div>
                                </div>

                                {/* LIGNE INFÉRIEURE DU TABLEAU */}
                                <div className="grid grid-cols-1 md:grid-cols-12">
                                    {/* Case 3 : Description concise (décalage bas-gauche au survol) */}
                                    <div className="md:col-span-7 p-6 sm:p-8 border-b md:border-b-0 md:border-r border-neutral-200/90 dark:border-white/20 flex flex-col justify-center transition-all duration-300 ease-out hover:translate-y-2 hover:-translate-x-1.5 hover:bg-white/95 dark:hover:bg-black/60 hover:border-neutral-300 dark:hover:border-white/40 hover:shadow-2xl hover:border">
                                        <p className="text-base sm:text-lg text-neutral-800 dark:text-white/90 font-thin leading-relaxed">
                                            {content.description}
                                        </p>
                                    </div>

                                    {/* Case 4 : Points essentiels et Action (décalage bas-droite au survol) */}
                                    <div className="md:col-span-5 p-6 sm:p-8 flex flex-col justify-between gap-6 transition-all duration-300 ease-out hover:translate-y-2 hover:translate-x-1.5 hover:bg-white/95 dark:hover:bg-black/60 hover:border-neutral-300 dark:hover:border-white/40 hover:shadow-2xl hover:border">
                                        {content.features && content.features.length > 0 && (
                                            <ul className="space-y-2">
                                                {content.features.map((feature, fIndex) => (
                                                    <li
                                                        key={fIndex}
                                                        className="flex items-center gap-2.5 text-xs sm:text-sm text-neutral-700 dark:text-white/85 font-thin leading-relaxed"
                                                    >
                                                        <span className="w-6 h-[1px] bg-primary shrink-0" />
                                                        <span>{feature}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}

                                        <div className="flex items-center justify-end gap-4 pt-2">
                                            <Link
                                                href={`/contact?serviceId=${content?.title?.replaceAll(" ", "-")}`}
                                                className=""
                                            >
                                                <Button
                                                    //    onClick={}
                                                    className=""
                                                >
                                                    <span>{texts.contactUs}</span>
                                                    <Icon icon="bitcoin-icons:arrow-right-outline" className="w-3.5 h-3.5" />
                                                </Button>
                                            </Link>

                                            {/* {service.externalLink && service.externalLink !== "#" && (
                                                <Button
                                                    onClick={() => window.open(service.externalLink, "_blank")}
                                                >
                                                    <span>{texts.discover}</span>
                                                    <Icon icon="solar:arrow-right-up-linear" className="w-3 h-3" />
                                                </Button>
                                            )} */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    );
                })}
            </div>
        </div>
    );
}

export const PartnerServicesPage = PartnerServices;
export default PartnerServices;
