import servicesData from "./services.json";

export type Locale = "fr" | "en";

export interface ServiceTranslation {
  title: string;
  subtitle: string;
  description: string;
  tag: string;
  features: string[];
}

export interface ServiceItem {
  id: string;
  thumbnail: string;
  externalLink?: string;
  fr: ServiceTranslation;
  en: ServiceTranslation;
}

export interface ServicesFile {
  localeDefaults: {
    fr: {
      sectionBadge: string;
      sectionTitle: string;
      sectionDescription: string;
      allServices: string;
      keyFeatures: string;
      discover: string;
      contactUs: string;
      searchPlaceholder: string;
    };
    en: {
      sectionBadge: string;
      sectionTitle: string;
      sectionDescription: string;
      allServices: string;
      keyFeatures: string;
      discover: string;
      contactUs: string;
      searchPlaceholder: string;
    };
  };
  services: ServiceItem[];
}

export const services: ServiceItem[] = servicesData.services as ServiceItem[];
export const localeDefaults = servicesData.localeDefaults;

/**
 * Transforms service items into Hero Parallax product items
 * with smooth scroll anchor links `#${service.id}`.
 */
export function getHeroProducts(locale: Locale = "fr") {
  return services.map((service) => ({
    id: service.id,
    title: service[locale]?.title || service.fr.title,
    description: service[locale]?.description || service.fr.description,
    link: `#${service.id}`,
    thumbnail: service.thumbnail,
  }));
}

export default servicesData;

