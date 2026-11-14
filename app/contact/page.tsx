"use client";

import React, { useState, useEffect, useTransition, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Icon } from "@iconify/react";
import { NavBar } from "@/components/Blocks/Navbar";
import { Footer } from "@/components/Blocks/Footer";
import { useLanguage } from "@/context/language-context";
import { sendContactMessage } from "@/app/actions/contact";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const contactContent = {
    fr: {
        badge: "Contact & Échanges",
        title: "Nous serons ravis de vous écouter",
        subtitle:
            "Une question, une demande de renseignement sur nos solutions ou sur le projet Vira, un besoin d'accompagnement ou une suggestion ? Notre équipe basée à Lubumbashi est à votre écoute.",
        formTitle: "Envoyez-nous un message",
        formSubtitle:
            "Remplissez ce formulaire et un accusé de réception vous sera immédiatement transmis par email.",
        nameLabel: "Nom complet",
        namePlaceholder: "ex: John Doe",
        emailLabel: "Votre Adresse email",
        emailPlaceholder: "ex: votre@email.com",
        subjectLabel: "Objet ou motif de votre message",
        subjectPlaceholder: "ex: Renseignement, Projet Vira, Stratégie Digitale...",
        messageLabel: "Votre message",
        messagePlaceholder:
            "Écrivez votre message, vos questions ou vos remarques ici...",
        sendButton: "Envoyer le message",
        sendingButton: "Envoi en cours...",
        successTitle: "Message envoyé avec succès !",
        successDesc:
            "Merci pour votre message. Un accusé de réception vous a été transmis par email. Notre équipe vous répondra dans les plus brefs délais.",
        errorTitle: "Une erreur est survenue",
        officeTitle: "Siège social",
        officeAddress:
            "Numéro 17, Avenue Kilela Balanda\nLubumbashi, Haut-Katanga\nRépublique démocratique du Congo",
        officeMaps: "Ouvrir dans Google Maps",
        emailTitle: "Contact direct",
        responseTime: "Délai de réponse moyen : moins de 24h ouvrées",
        socialTitle: "Suivez nos innovations",
    },
    en: {
        badge: "Contact & Inquiries",
        title: "We'll be happy to hear from you",
        subtitle:
            "A question, an inquiry about our solutions or the Vira project, technical guidance, or a suggestion? Our team based in Lubumbashi is here for you.",
        formTitle: "Send us a message",
        formSubtitle:
            "Fill out this simple form and an acknowledgement receipt will be immediately delivered to your email.",
        nameLabel: "Full Name",
        namePlaceholder: "e.g., John Doe",
        emailLabel: "Your Email adress",
        emailPlaceholder: "e.g., your@email.com",
        subjectLabel: "Subject or Reason for Contact",
        subjectPlaceholder: "e.g., Inquiry, Vira Project, Digital Strategy...",
        messageLabel: "Your Message",
        messagePlaceholder: "Write your message, questions, or remarks here...",
        sendButton: "Send Message",
        sendingButton: "Sending...",
        successTitle: "Message sent successfully!",
        successDesc:
            "Thank you for contacting us. An acknowledgement receipt has been delivered to your email. Our team will follow up promptly.",
        errorTitle: "An error occurred",
        officeTitle: "Headquarters",
        officeAddress:
            "Number 17, Avenue Kilela Balanda\nLubumbashi, Haut-Katanga\nDemocratic Republic of the Congo",
        officeMaps: "Open in Google Maps",
        emailTitle: "Direct Email",
        responseTime: "Average response time: within 24 business hours",
        socialTitle: "Follow our updates",
    },
};

const googleMapsUrl = "https://maps.app.goo.gl/ibJdk5ge8sGcS9tD8";

function ContactFormSection() {
    const { locale } = useLanguage();
    const t = contactContent[locale] || contactContent.fr;
    const searchParams = useSearchParams();

    // Détection du paramètre d'URL (ex: /contact?serviceId=Stratégie-Digitale ou service=... ou subject=...)
    const serviceIdParam =
        searchParams.get("serviceId") ||
        searchParams.get("service") ||
        searchParams.get("subject") ||
        "";

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState(
        serviceIdParam ? serviceIdParam.replace(/-/g, " ") : ""
    );
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (serviceIdParam) {
            setSubject(serviceIdParam.replace(/-/g, " "));
        }
    }, [serviceIdParam]);

    const [isPending, startTransition] = useTransition();
    const [status, setStatus] = useState<{
        type: "idle" | "success" | "error";
        message?: string;
    }>({ type: "idle" });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus({ type: "idle" });

        startTransition(async () => {
            const result = await sendContactMessage({
                name,
                email,
                subject,
                message,
                locale,
            });

            if (result.success) {
                setStatus({
                    type: "success",
                    message: result.message,
                });
                setName("");
                setEmail("");
                setSubject(serviceIdParam ? serviceIdParam.replace(/-/g, " ") : "");
                setMessage("");
            } else {
                setStatus({
                    type: "error",
                    message: result.message,
                });
            }
        });
    };

    return (
        <section className="relative pt-32 pb-20 md:pt-36 md:pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
            {/* EN-TÊTE DE SECTION */}
            <div className="max-w-3xl mb-12 md:mb-16">
                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                    <span className="h-0.5 w-8 bg-amber-500" />
                    {t.badge}
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
                    {t.title}
                </h1>
                <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
                    {t.subtitle}
                </p>
            </div>

            {/* GRILLE PRINCIPALE : FORMULAIRE + INFORMATIONS */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
                {/* COLONNE GAUCHE (7 COLONNES) : FORMULAIRE SIMPLE DANS UN CARD */}
                <div className="lg:col-span-7">
                    <Card className="border border-border/80 bg-card/60 dark:bg-zinc-900/50 backdrop-blur-md shadow-sm">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-xl font-bold text-foreground">
                                {t.formTitle}
                            </CardTitle>
                            <CardDescription className="text-xs sm:text-sm text-muted-foreground">
                                {t.formSubtitle}
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-5">
                            {/* RETOUR STATUT / ACCUSÉ DE RÉCEPTION */}
                            {status.type === "success" && (
                                <div className="rounded-none border border-emerald-500/30 bg-emerald-500/10 p-4 text-emerald-900 dark:text-emerald-200 flex items-start gap-3">
                                    <Icon
                                        icon="lucide:check-circle-2"
                                        className="size-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5"
                                    />
                                    <div className="space-y-1">
                                        <p className="font-semibold text-sm">{t.successTitle}</p>
                                        <p className="text-xs sm:text-sm text-emerald-800 dark:text-emerald-300">
                                            {status.message || t.successDesc}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {status.type === "error" && (
                                <div className="rounded-none border border-rose-500/30 bg-rose-500/10 p-4 text-rose-900 dark:text-rose-200 flex items-start gap-3">
                                    <Icon
                                        icon="lucide:alert-circle"
                                        className="size-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5"
                                    />
                                    <div className="space-y-1">
                                        <p className="font-semibold text-sm">{t.errorTitle}</p>
                                        <p className="text-xs sm:text-sm text-rose-800 dark:text-rose-300">
                                            {status.message}
                                        </p>
                                    </div>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-5">
                                {/* NOM */}
                                <div className="space-y-2">
                                    <Label htmlFor="name">
                                        {t.nameLabel} <span className="text-amber-500">*</span>
                                    </Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        type="text"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder={t.namePlaceholder}
                                        disabled={isPending}
                                    />
                                </div>

                                {/* EMAIL */}
                                <div className="space-y-2">
                                    <Label htmlFor="email">
                                        {t.emailLabel} <span className="text-amber-500">*</span>
                                    </Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder={t.emailPlaceholder}
                                        disabled={isPending}
                                    />
                                </div>

                                {/* SUJET : CHAMP TEXTE SIMPLE PRÉ-REMPLI SI PARAMÈTRE DANS L'URL */}
                                <div className="space-y-2">
                                    <Label htmlFor="subject">
                                        {t.subjectLabel}
                                    </Label>
                                    <Input
                                        id="subject"
                                        name="subject"
                                        type="text"
                                        value={subject}
                                        onChange={(e) => setSubject(e.target.value)}
                                        placeholder={t.subjectPlaceholder}
                                        disabled={isPending}
                                    />
                                </div>

                                {/* MESSAGE */}
                                <div className="space-y-2">
                                    <Label htmlFor="message">
                                        {t.messageLabel} <span className="text-amber-500">*</span>
                                    </Label>
                                    <Textarea
                                        id="message"
                                        name="message"
                                        rows={5}
                                        maxLength={5000}
                                        required
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder={t.messagePlaceholder}
                                        disabled={isPending}
                                        className="min-h-32 max-h-72"
                                    />
                                    <div className="text-right">
                                        <span className="text-sm text-gray-500 dark:text-gray-400">{message.length}/5000</span>
                                    </div>

                                </div>

                                {/* BOUTON D'ENVOI */}
                                <Button
                                    type="submit"
                                    disabled={isPending}
                                    size="lg"
                                    className="w-full h-11 text-sm font-semibold rounded-none cursor-pointer group"
                                >
                                    {isPending ? (
                                        <>
                                            <Icon
                                                icon="material-symbols-light:clock-loader-10"
                                                className="size-6 animate-spin "
                                            />
                                            <span>{t.sendingButton}</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>{t.sendButton}</span>
                                            <Icon icon="hugeicons:send" className="size-5 group-hover:rotate-45 transition-all" />
                                        </>
                                    )}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>

                {/* COLONNE DROITE (5 COLONNES) : Maps embed */}
                <div className="lg:col-span-5 space-y-6 dark:saturate-50  ">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3948.3340823856565!2d27.47302557510128!3d-11.649720788556971!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19723fb973f1f421%3A0x35854ff29bd99d52!2sSafaridew!5e1!3m2!1sfr!2scd!4v1794678584214!5m2!1sfr!2scd" allowFullScreen loading="lazy" referrerPolicy="strict-origin-when-cross-origin" className="w-full h-full max-h-150 "></iframe>
                </div>
            </div>
        </section>
    );
}

export default function ContactPage() {
    return (
        <main className="relative flex min-h-screen flex-col overflow-x-hidden bg-background text-foreground transition-colors">
            <NavBar />

            <Suspense
                fallback={
                    <div className="flex-1 flex items-center justify-center p-24">
                        <Icon
                            icon="lucide:loader-2"
                            className="size-6 animate-spin text-amber-500"
                        />
                    </div>
                }
            >
                <ContactFormSection />
            </Suspense>
            <Footer />
        </main>
    );
}
