import { prisma } from "@/lib/prisma";

export interface HeroSlideData {
  id: string;
  slug: string;
  badgeFr: string;
  badgeEn: string;
  titleFr: string;
  titleEn: string;
  highlightFr: string;
  highlightEn: string;
  subtitleFr: string;
  subtitleEn: string;
  image: string;
  ctaHref: string;
  ctaSecondaryHref: string;
  order: number;
  published: boolean;
}

export const FALLBACK_HERO_SLIDES: HeroSlideData[] = [
  {
    id: "0",
    slug: "bienvenue",
    badgeFr: "Bienvenue",
    badgeEn: "Welcome",
    titleFr: "Bienvenue sur",
    titleEn: "Welcome to",
    highlightFr: "KDIGIT",
    highlightEn: "KDIGIT",
    subtitleFr:
      "L'innovation numérique au service de votre croissance. Nous créons des solutions web, mobiles et logicielles sur mesure pour propulser votre activité.",
    subtitleEn:
      "Digital innovation at the service of your growth. We build custom web, mobile and software solutions to power your business.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80",
    ctaHref: "/a-propos",
    ctaSecondaryHref: "/services",
    order: 0,
    published: true,
  },
  {
    id: "1",
    slug: "transformation",
    badgeFr: "Solutions digitales innovantes",
    badgeEn: "Innovative digital solutions",
    titleFr: "Transformez votre vision en",
    titleEn: "Transform your vision into",
    highlightFr: "réalité digitale",
    highlightEn: "digital reality",
    subtitleFr:
      "KDIGIT accompagne les entreprises et particuliers dans leur transformation digitale grâce à des solutions web, mobiles et logicielles innovantes.",
    subtitleEn:
      "KDIGIT supports businesses and individuals in their digital transformation with innovative web, mobile and software solutions.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80",
    ctaHref: "/devis",
    ctaSecondaryHref: "/services",
    order: 1,
    published: true,
  },
  {
    id: "5",
    slug: "invitation-de-baby",
    badgeFr: "Produit phare KDIGIT",
    badgeEn: "KDIGIT flagship product",
    titleFr: "InvitationDeBaby —",
    titleEn: "InvitationDeBaby —",
    highlightFr: "invitations digitales bébé",
    highlightEn: "digital baby invitations",
    subtitleFr:
      "Cartes d'invitation numériques pour naissance, baptême, anniversaire, baby shower et plus encore.",
    subtitleEn:
      "Digital invitation cards for birth, baptism, birthday, baby shower and more.",
    image: "/images/products/invitation-de-baby.png",
    ctaHref: "/produits/invitation-de-baby",
    ctaSecondaryHref: "/devis",
    order: 2,
    published: true,
  },
  {
    id: "2",
    slug: "web",
    badgeFr: "Création de sites internet",
    badgeEn: "Website creation",
    titleFr: "Des sites web",
    titleEn: "Modern websites",
    highlightFr: "modernes & performants",
    highlightEn: "modern & performant",
    subtitleFr:
      "Sites vitrines, e-commerce et plateformes institutionnelles optimisés SEO pour booster votre visibilité.",
    subtitleEn:
      "Showcase sites, e-commerce and institutional platforms, SEO-optimized to boost your visibility.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&q=80",
    ctaHref: "/devis",
    ctaSecondaryHref: "/services/sites-internet",
    order: 3,
    published: true,
  },
  {
    id: "3",
    slug: "mobile",
    badgeFr: "Applications mobiles",
    badgeEn: "Mobile applications",
    titleFr: "Applications",
    titleEn: "Native & hybrid",
    highlightFr: "Android & iOS",
    highlightEn: "Android & iOS apps",
    subtitleFr:
      "Développement d'applications mobiles natives et hybrides, intuitives et performantes.",
    subtitleEn:
      "Native and hybrid mobile app development, intuitive and performant.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1920&q=80",
    ctaHref: "/devis",
    ctaSecondaryHref: "/services/applications-mobiles",
    order: 4,
    published: true,
  },
  {
    id: "4",
    slug: "software",
    badgeFr: "Logiciels métiers & SaaS",
    badgeEn: "Business software & SaaS",
    titleFr: "Solutions logicielles",
    titleEn: "Software solutions",
    highlightFr: "sur mesure",
    highlightEn: "tailored to you",
    subtitleFr:
      "ERP, CRM, plateformes SaaS et logiciels métiers conçus pour automatiser vos processus.",
    subtitleEn:
      "ERP, CRM, SaaS platforms and business software designed to automate your processes.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&q=80",
    ctaHref: "/devis",
    ctaSecondaryHref: "/services/applications-web",
    order: 5,
    published: true,
  },
];

export async function getHeroSlides(): Promise<HeroSlideData[]> {
  try {
    const slides = await prisma.heroSlide.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
    });
    if (slides.length > 0) return slides;
    return FALLBACK_HERO_SLIDES;
  } catch {
    return FALLBACK_HERO_SLIDES;
  }
}

export async function getAllHeroSlidesAdmin() {
  try {
    return await prisma.heroSlide.findMany({ orderBy: { order: "asc" } });
  } catch {
    return [];
  }
}

export async function getHeroSlideById(id: string) {
  try {
    return await prisma.heroSlide.findUnique({ where: { id } });
  } catch {
    return null;
  }
}
