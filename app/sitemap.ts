import type { MetadataRoute } from "next";
import servicesData from "@/data/services.json";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://safaridew.com";
  const now = new Date();

  // Root site URL
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: {
        languages: {
          fr: `${baseUrl}/?lang=fr`,
          en: `${baseUrl}/?lang=en`,
        },
      },
    },
    {
      url: `${baseUrl}/#services`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/team`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projets`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/career`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  // Specific service anchors
  const serviceRoutes: MetadataRoute.Sitemap = (servicesData.services || []).map((service) => ({
    url: `${baseUrl}/#${service.id}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  return [...routes, ...serviceRoutes];
}
