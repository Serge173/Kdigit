import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("admin123", 12);

  await prisma.user.upsert({
    where: { email: "admin@kdigit.com" },
    update: {},
    create: {
      email: "admin@kdigit.com",
      passwordHash,
      name: "Administrateur",
      role: "ADMIN",
    },
  });

  const projects = [
    {
      slug: "agilestest",
      clientName: "AGILESTEST",
      titleFr: "Plateforme de tests agiles",
      titleEn: "Agile testing platform",
      descriptionFr: "Développement d'une plateforme web complète pour la gestion et l'automatisation des tests agiles en entreprise.",
      descriptionEn: "Development of a complete web platform for managing and automating agile testing in enterprise.",
      technologies: ["React", "Next.js", "TypeScript", "PostgreSQL", "Docker"],
      resultsFr: "Réduction de 60% du temps de test, adoption par 500+ utilisateurs, disponibilité 99.9%.",
      resultsEn: "60% reduction in testing time, adoption by 500+ users, 99.9% availability.",
      coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
      screenshots: ["https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800", "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800"],
      featured: true,
      order: 1,
    },
    {
      slug: "aurore",
      clientName: "Aurore",
      titleFr: "Site institutionnel Aurore",
      titleEn: "Aurore institutional website",
      descriptionFr: "Création d'un site institutionnel moderne et accessible pour une organisation à vocation sociale.",
      descriptionEn: "Creation of a modern and accessible institutional website for a social organization.",
      technologies: ["Next.js", "Tailwind CSS", "CMS", "SEO"],
      resultsFr: "Trafic organique +85%, accessibilité WCAG AA, temps de chargement < 2s.",
      resultsEn: "Organic traffic +85%, WCAG AA accessibility, loading time < 2s.",
      coverImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
      screenshots: ["https://images.unsplash.com/photo-1497366216548-37526070297c?w=800"],
      featured: true,
      order: 2,
    },
    {
      slug: "ecommerce-fashion",
      clientName: "FashionCo",
      titleFr: "Boutique e-commerce mode",
      titleEn: "Fashion e-commerce store",
      descriptionFr: "Plateforme e-commerce haute performance avec paiement sécurisé et gestion avancée des stocks.",
      descriptionEn: "High-performance e-commerce platform with secure payment and advanced inventory management.",
      technologies: ["Next.js", "Stripe", "PostgreSQL", "Redis"],
      resultsFr: "CA en ligne +120%, panier moyen +35%, taux de conversion 4.2%.",
      resultsEn: "Online revenue +120%, average cart +35%, conversion rate 4.2%.",
      coverImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800",
      screenshots: ["https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800"],
      featured: true,
      order: 3,
    },
  ];

  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: project,
      create: project,
    });
  }

  const posts = [
    {
      slug: "nextjs-2026-tendances",
      titleFr: "Next.js en 2026 : les tendances à suivre",
      titleEn: "Next.js in 2026: trends to watch",
      excerptFr: "Découvrez les dernières évolutions de Next.js et comment elles transforment le développement web moderne.",
      excerptEn: "Discover the latest Next.js evolutions and how they transform modern web development.",
      contentFr: "Le développement web continue d'évoluer rapidement. Next.js reste le framework de référence pour les applications React performantes, avec le App Router, le Server Components et l'optimisation automatique des performances.\n\nChez KDIGIT, nous utilisons Next.js pour créer des sites et applications ultra-performants, optimisés pour le SEO et l'expérience utilisateur.",
      contentEn: "Web development continues to evolve rapidly. Next.js remains the reference framework for performant React applications, with App Router, Server Components and automatic performance optimization.\n\nAt KDIGIT, we use Next.js to create ultra-performant sites and applications, optimized for SEO and user experience.",
      coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
      category: "Développement web",
      tags: ["Next.js", "React", "Web"],
      published: true,
      publishedAt: new Date("2026-03-15"),
    },
    {
      slug: "ia-transformation-digitale",
      titleFr: "L'IA au service de la transformation digitale",
      titleEn: "AI for digital transformation",
      excerptFr: "Comment l'intelligence artificielle révolutionne les processus métier et améliore la productivité.",
      excerptEn: "How artificial intelligence revolutionizes business processes and improves productivity.",
      contentFr: "L'intelligence artificielle n'est plus un concept futuriste. Elle s'intègre désormais dans les solutions digitales pour automatiser les tâches répétitives, analyser les données et améliorer la prise de décision.\n\nKDIGIT intègre l'IA dans ses solutions pour offrir à ses clients un avantage compétitif durable.",
      contentEn: "Artificial intelligence is no longer a futuristic concept. It now integrates into digital solutions to automate repetitive tasks, analyze data and improve decision-making.\n\nKDIGIT integrates AI into its solutions to offer clients a lasting competitive advantage.",
      coverImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800",
      category: "Intelligence artificielle",
      tags: ["IA", "Innovation", "Digital"],
      published: true,
      publishedAt: new Date("2026-02-20"),
    },
  ];

  for (const post of posts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: post,
      create: post,
    });
  }

  const heroSlides = [
    {
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
    },
    {
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
    },
    {
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
    },
    {
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
    },
    {
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
    },
    {
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
    },
  ];

  for (const slide of heroSlides) {
    await prisma.heroSlide.upsert({
      where: { slug: slide.slug },
      update: slide,
      create: slide,
    });
  }

  console.log("✅ Seed completed");
  console.log("   Admin: admin@kdigit.com / admin123");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
