import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Geist_Mono, Inter } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/context/language-context";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bricolage",
  axes: ["opsz", "wdth"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://safaridew.com"),
  title: {
    default: "Safaridew | Startup Technologique & Agence Numérique à Lubumbashi (RDC)",
    template: "%s | Safaridew",
  },
  description:
    "Safaridew est une startup technologique et une agence de services numériques basée à Lubumbashi, en République démocratique du Congo. Nous propulsons organisations et entreprises grâce aux technologies modernes et réponons aux besoins spécifiques en apportant des solutions adaptées et innovantes.",
  applicationName: "Safaridew",
  authors: [{ name: "Safaridew", url: "https://safaridew.com" }],
  generator: "Next.js",
  keywords: [
    "Safaridew",
    "startup technologique",
    "agence de services numériques",
    "Lubumbashi",
    "République démocratique du Congo",
    "RDC",
    "développement application mobile Lubumbashi",
    "développement web Congo",
    "agence digitale Lubumbashi",
    "intelligence artificielle Afrique",
    "transformation digitale Katanga",
    "rebranding et identité de marque",
    "tech startup DRC",
    "digital agency Lubumbashi",
  ],
  referrer: "origin-when-cross-origin",
  creator: "Safaridew",
  publisher: "Safaridew",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
    languages: {
      "fr-CD": "/?lang=fr",
      "en-US": "/?lang=en",
    },
  },
  openGraph: {
    title: "Safaridew | Startup Technologique & Agence Numérique (RDC)",
    description:
      "Safaridew est une startup technologique et une agence de services numériques basée à Lubumbashi, en République démocratique du Congo.",
    url: "https://safaridew.com",
    siteName: "Safaridew",
    locale: "fr_CD",
    alternateLocale: ["en_US", "fr_FR"],
    type: "website",
    images: [
      {
        url: "/assets/logos/logo_large_default.svg",
        width: 1200,
        height: 630,
        alt: "Safaridew - Startup Technologique & Agence Numérique à Lubumbashi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Safaridew | Startup Technologique & Agence Numérique (RDC)",
    description:
      "Startup technologique et agence de services numériques basée à Lubumbashi, en République démocratique du Congo.",
    creator: "@safaridew",
    images: ["/assets/logos/logo_large_default.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/assets/logos/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: ["/favicon.ico"],
    apple: [{ url: "/assets/logos/icon.svg" }],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": "https://safaridew.com/#organization",
      name: "Safaridew",
      legalName: "Safaridew",
      url: "https://safaridew.com",
      logo: "https://safaridew.com/assets/logos/icon.svg",
      image: "https://safaridew.com/assets/logos/logo_large_default.svg",
      description:
        "Safaridew est une startup technologique et une agence de services numériques basée à Lubumbashi, en République démocratique du Congo.",
      email: "hello@safaridew.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Numéro 17, Avenue Kilela Balanda",
        addressLocality: "Lubumbashi",
        addressRegion: "Haut-Katanga",
        addressCountry: "CD",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: -11.66089,
        longitude: 27.47938,
      },
      sameAs: [
        "https://www.linkedin.com/company/safaridew",
        "https://www.facebook.com/safaridew",
      ],
      areaServed: [
        {
          "@type": "Country",
          name: "République démocratique du Congo",
        },
        {
          "@type": "Place",
          name: "Afrique",
        },
        {
          "@type": "Place",
          name: "International",
        },
      ],
      knowsAbout: [
        "Stratégie Digitale",
        "Développement d'applications mobiles iOS et Android",
        "Identité de marque et rebranding",
        "Intelligence Artificielle et Automatisation",
        "Cybersécurité et Cloud Computing",
        "Systèmes ERP et logiciels sur-mesure",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Services Numériques Safaridew",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Stratégie Digitale",
              description:
                "Transformation & Conseil technologique pour organisations.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Applications Mobiles",
              description:
                "Conception et développement d'applications mobiles iOS, Android et multiplateforme adaptées aux réalités locales.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Identité de marque & Rebranding",
              description:
                "Création d'identités visuelles mémorables et design systems cohérents.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Intelligence Artificielle & Automatisation",
              description:
                "Intégration d'IA, LLM, agents intelligents et automatisation des flux métiers.",
            },
          },
        ],
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://safaridew.com/#website",
      url: "https://safaridew.com",
      name: "Safaridew",
      publisher: {
        "@id": "https://safaridew.com/#organization",
      },
      inLanguage: ["fr-CD", "en-US"],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      suppressHydrationWarning
      className={cn(
        "antialiased scroll-smooth",
        fontMono.variable,
        inter.variable,
        "font-sans",
        bricolage.className
      )}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
