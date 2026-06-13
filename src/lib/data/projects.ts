import { prisma } from "@/lib/prisma";
import { FALLBACK_PROJECTS } from "./fallback";

export async function getFeaturedProjects() {
  try {
    const projects = await prisma.project.findMany({
      where: { published: true, featured: true },
      orderBy: { order: "asc" },
      take: 6,
    });
    if (projects.length > 0) return projects;
    return FALLBACK_PROJECTS.filter((p) => p.featured);
  } catch {
    return FALLBACK_PROJECTS.filter((p) => p.featured);
  }
}

export async function getAllProjects() {
  try {
    const projects = await prisma.project.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
    });
    if (projects.length > 0) return projects;
    return FALLBACK_PROJECTS;
  } catch {
    return FALLBACK_PROJECTS;
  }
}

export async function getProjectBySlug(slug: string) {
  try {
    const project = await prisma.project.findUnique({ where: { slug } });
    if (project) return project;
    return FALLBACK_PROJECTS.find((p) => p.slug === slug) || null;
  } catch {
    return FALLBACK_PROJECTS.find((p) => p.slug === slug) || null;
  }
}

export async function getBlogPosts() {
  try {
    const posts = await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
    });
    if (posts.length > 0) return posts;
    return FALLBACK_POSTS;
  } catch {
    return FALLBACK_POSTS;
  }
}

export async function getBlogPostBySlug(slug: string) {
  try {
    const post = await prisma.blogPost.findUnique({ where: { slug } });
    if (post) return post;
    return FALLBACK_POSTS.find((p) => p.slug === slug) || null;
  } catch {
    return FALLBACK_POSTS.find((p) => p.slug === slug) || null;
  }
}

const FALLBACK_POSTS = [
  {
    id: "1",
    slug: "nextjs-2026-tendances",
    titleFr: "Next.js en 2026 : les tendances à suivre",
    titleEn: "Next.js in 2026: trends to watch",
    excerptFr: "Découvrez les dernières évolutions de Next.js et comment elles transforment le développement web moderne.",
    excerptEn: "Discover the latest Next.js evolutions and how they transform modern web development.",
    contentFr: "Le développement web continue d'évoluer rapidement. Next.js reste le framework de référence pour les applications React performantes...",
    contentEn: "Web development continues to evolve rapidly. Next.js remains the reference framework for performant React applications...",
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
    category: "Développement web",
    tags: ["Next.js", "React", "Web"],
    published: true,
    publishedAt: new Date("2026-03-15"),
    authorName: "KDIGIT",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    slug: "ia-transformation-digitale",
    titleFr: "L'IA au service de la transformation digitale",
    titleEn: "AI for digital transformation",
    excerptFr: "Comment l'intelligence artificielle révolutionne les processus métier et améliore la productivité.",
    excerptEn: "How artificial intelligence revolutionizes business processes and improves productivity.",
    contentFr: "L'intelligence artificielle n'est plus un concept futuriste. Elle s'intègre désormais dans les solutions digitales...",
    contentEn: "Artificial intelligence is no longer a futuristic concept. It now integrates into digital solutions...",
    coverImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800",
    category: "Intelligence artificielle",
    tags: ["IA", "Innovation", "Digital"],
    published: true,
    publishedAt: new Date("2026-02-20"),
    authorName: "KDIGIT",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    slug: "cybersecurite-pme",
    titleFr: "Cybersécurité : les bonnes pratiques pour les PME",
    titleEn: "Cybersecurity: best practices for SMEs",
    excerptFr: "Protégez votre entreprise avec ces recommandations essentielles en matière de sécurité informatique.",
    excerptEn: "Protect your business with these essential IT security recommendations.",
    contentFr: "La cybersécurité est devenue un enjeu majeur pour les PME. Voici les mesures essentielles à mettre en place...",
    contentEn: "Cybersecurity has become a major issue for SMEs. Here are the essential measures to implement...",
    coverImage: "https://images.unsplash.com/photo-1550751827-4bd374c1f58b?w=800",
    category: "Cybersécurité",
    tags: ["Sécurité", "PME", "Protection"],
    published: true,
    publishedAt: new Date("2026-01-10"),
    authorName: "KDIGIT",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
