import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";
import { SERVICE_CATEGORIES } from "@/lib/data/services";
import { FALLBACK_PROJECTS } from "@/lib/data/fallback";
import { getAllProductSlugs } from "@/lib/data/products";

const baseUrl = SITE.url;

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/a-propos",
    "/services",
    "/realisations",
    "/blog",
    "/contact",
    "/devis",
    "/mentions-legales",
    "/confidentialite",
  ];

  const locales = ["", "/en"];

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const page of staticPages) {
      entries.push({
        url: `${baseUrl}${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === "" ? "weekly" : "monthly",
        priority: page === "" ? 1 : 0.8,
      });
    }

    for (const cat of SERVICE_CATEGORIES) {
      entries.push({
        url: `${baseUrl}${locale}/services/${cat.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }

    for (const project of FALLBACK_PROJECTS) {
      entries.push({
        url: `${baseUrl}${locale}/realisations/${project.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }

    for (const slug of getAllProductSlugs()) {
      entries.push({
        url: `${baseUrl}${locale}/produits/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }
  }

  return entries;
}
