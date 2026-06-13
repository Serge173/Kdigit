import { z } from "zod";
import { slugify } from "@/lib/utils";

export const projectSchema = z.object({
  clientName: z.string().min(1).max(100),
  titleFr: z.string().min(1).max(200),
  titleEn: z.string().min(1).max(200),
  slug: z.string().min(1).max(100).optional(),
  descriptionFr: z.string().min(10),
  descriptionEn: z.string().min(10),
  technologies: z.string().transform((s) => s.split(",").map((t) => t.trim()).filter(Boolean)),
  resultsFr: z.string().min(1),
  resultsEn: z.string().min(1),
  coverImage: z.string().url(),
  screenshots: z
    .string()
    .optional()
    .default("")
    .transform((s) => s.split("\n").map((t) => t.trim()).filter(Boolean)),
  featured: z.coerce.boolean().optional().default(false),
  published: z.coerce.boolean().optional().default(true),
  order: z.coerce.number().int().optional().default(0),
});

export const articleSchema = z.object({
  titleFr: z.string().min(1).max(200),
  titleEn: z.string().min(1).max(200),
  slug: z.string().min(1).max(100).optional(),
  excerptFr: z.string().min(10),
  excerptEn: z.string().min(10),
  contentFr: z.string().min(20),
  contentEn: z.string().min(20),
  coverImage: z.union([z.string().url(), z.literal("")]).optional().default(""),
  category: z.string().min(1),
  tags: z.string().transform((s) => s.split(",").map((t) => t.trim()).filter(Boolean)),
  published: z.coerce.boolean().optional().default(false),
  authorName: z.string().optional().default("KDIGIT"),
});

export const userSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  password: z.string().min(6).optional(),
  role: z.enum(["ADMIN", "EDITOR", "VIEWER"]),
  active: z.coerce.boolean().optional().default(true),
});

export const heroSlideSchema = z.object({
  badgeFr: z.string().min(1).max(100),
  badgeEn: z.string().min(1).max(100),
  titleFr: z.string().min(1).max(200),
  titleEn: z.string().min(1).max(200),
  highlightFr: z.string().min(1).max(100),
  highlightEn: z.string().min(1).max(100),
  subtitleFr: z.string().min(10),
  subtitleEn: z.string().min(10),
  slug: z.string().min(1).max(100).optional(),
  image: z.string().url(),
  ctaHref: z.string().min(1).default("/devis"),
  ctaSecondaryHref: z.string().min(1).default("/services"),
  order: z.coerce.number().int().optional().default(0),
  published: z.coerce.boolean().optional().default(true),
});

export function resolveSlug(slug: string | undefined, title: string) {
  return slug?.trim() || slugify(title);
}
