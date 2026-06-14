import { getSiteUrl } from "@/lib/site-url";

export const SITE = {
  name: "KDIGIT",
  logo: "/images/kdigit-logo.png",
  slogan: "L'innovation numérique au service de votre croissance",
  sloganEn: "Digital innovation at the service of your growth",
  description:
    "KDIGIT accompagne les entreprises et particuliers dans leur transformation digitale grâce à des solutions web, mobiles et logicielles innovantes.",
  descriptionEn:
    "KDIGIT supports businesses and individuals in their digital transformation with innovative web, mobile and software solutions.",
  email: "Skeayeni@gmail.com",
  phone: "+225 07 08 96 76 24",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "2250708967624",
  address: "Cocody, Abidjan, Côte d'Ivoire",
  url: getSiteUrl(),
  social: {
    linkedin: "https://linkedin.com/company/kdigit",
    facebook: "https://facebook.com/kdigit",
    twitter: "https://twitter.com/kdigit",
    instagram: "https://instagram.com/kdigit",
  },
} as const;

export const COLORS = {
  primary: "#F97316",
  primaryDark: "#EA580C",
  accent: "#22C55E",
  accentDark: "#16A34A",
  secondary: "#14532D",
  background: "#FFFFFF",
} as const;

export const STATS = [
  { value: "150+", labelFr: "Projets réalisés", labelEn: "Projects delivered" },
  { value: "98%", labelFr: "Clients satisfaits", labelEn: "Satisfied clients" },
  { value: "8+", labelFr: "Années d'expérience", labelEn: "Years of experience" },
  { value: "24/7", labelFr: "Support technique", labelEn: "Technical support" },
] as const;

export const WHY_CHOOSE = [
  {
    icon: "Zap",
    titleFr: "Expertise technique",
    titleEn: "Technical expertise",
    descFr:
      "Une équipe senior maîtrisant les dernières technologies web, mobile et cloud.",
    descEn:
      "A senior team mastering the latest web, mobile and cloud technologies.",
  },
  {
    icon: "Shield",
    titleFr: "Sécurité & fiabilité",
    titleEn: "Security & reliability",
    descFr:
      "Solutions sécurisées, conformes aux standards et protégées contre les menaces.",
    descEn:
      "Secure solutions compliant with standards and protected against threats.",
  },
  {
    icon: "Users",
    titleFr: "Accompagnement personnalisé",
    titleEn: "Personalized support",
    descFr:
      "Un interlocuteur dédié et une méthodologie agile adaptée à vos objectifs.",
    descEn:
      "A dedicated contact and agile methodology tailored to your goals.",
  },
  {
    icon: "TrendingUp",
    titleFr: "ROI mesurable",
    titleEn: "Measurable ROI",
    descFr:
      "Des solutions orientées performance avec des indicateurs de succès clairs.",
    descEn:
      "Performance-oriented solutions with clear success indicators.",
  },
] as const;

export const METHODOLOGY = [
  {
    step: "01",
    titleFr: "Analyse & découverte",
    titleEn: "Analysis & discovery",
    descFr: "Compréhension approfondie de vos besoins, contraintes et objectifs business.",
    descEn: "Deep understanding of your needs, constraints and business goals.",
  },
  {
    step: "02",
    titleFr: "Conception & stratégie",
    titleEn: "Design & strategy",
    descFr: "Architecture technique, UX/UI et planification des livrables.",
    descEn: "Technical architecture, UX/UI and deliverable planning.",
  },
  {
    step: "03",
    titleFr: "Développement agile",
    titleEn: "Agile development",
    descFr: "Sprints itératifs avec démonstrations régulières et feedback continu.",
    descEn: "Iterative sprints with regular demos and continuous feedback.",
  },
  {
    step: "04",
    titleFr: "Tests & déploiement",
    titleEn: "Testing & deployment",
    descFr: "Tests rigoureux, mise en production sécurisée et formation des équipes.",
    descEn: "Rigorous testing, secure deployment and team training.",
  },
  {
    step: "05",
    titleFr: "Support & évolution",
    titleEn: "Support & evolution",
    descFr: "Maintenance, optimisations continues et accompagnement à long terme.",
    descEn: "Maintenance, continuous optimization and long-term support.",
  },
] as const;

export const TESTIMONIALS = [
  {
    name: "Marie Dupont",
    roleFr: "Directrice, PME Tech",
    roleEn: "Director, Tech SME",
    contentFr:
      "KDIGIT a transformé notre présence digitale. Le site est moderne, performant et nos leads ont augmenté de 40%.",
    contentEn:
      "KDIGIT transformed our digital presence. The site is modern, performant and our leads increased by 40%.",
    rating: 5,
  },
  {
    name: "Jean Martin",
    roleFr: "CEO, AGILESTEST",
    roleEn: "CEO, AGILESTEST",
    contentFr:
      "Une équipe réactive et professionnelle. Notre plateforme web a été livrée dans les délais avec une qualité exceptionnelle.",
    contentEn:
      "A responsive and professional team. Our web platform was delivered on time with exceptional quality.",
    rating: 5,
  },
  {
    name: "Sophie Laurent",
    roleFr: "Responsable IT, Mairie",
    roleEn: "IT Manager, City Hall",
    contentFr:
      "KDIGIT a su répondre aux exigences de notre administration avec un logiciel métier sur mesure et sécurisé.",
    contentEn:
      "KDIGIT met our administration's requirements with a custom, secure business software.",
    rating: 5,
  },
] as const;

export const TEAM = [
  {
    name: "Koffi D.",
    roleFr: "Fondateur & CEO",
    roleEn: "Founder & CEO",
    bioFr: "Expert en transformation digitale avec plus de 10 ans d'expérience.",
    bioEn: "Digital transformation expert with over 10 years of experience.",
  },
  {
    name: "Amina S.",
    roleFr: "Lead Developer",
    roleEn: "Lead Developer",
    bioFr: "Spécialiste full-stack React, Next.js et architectures cloud.",
    bioEn: "Full-stack specialist in React, Next.js and cloud architectures.",
  },
  {
    name: "Thomas R.",
    roleFr: "Designer UX/UI",
    roleEn: "UX/UI Designer",
    bioFr: "Créateur d'expériences digitales premium et intuitives.",
    bioEn: "Creator of premium and intuitive digital experiences.",
  },
] as const;

export const SERVICE_TYPES = [
  { value: "website", labelFr: "Création de site internet", labelEn: "Website creation" },
  { value: "webapp", labelFr: "Application web", labelEn: "Web application" },
  { value: "mobile", labelFr: "Application mobile", labelEn: "Mobile application" },
  { value: "software", labelFr: "Logiciel métier", labelEn: "Business software" },
  { value: "hosting", labelFr: "Hébergement & maintenance", labelEn: "Hosting & maintenance" },
  { value: "consulting", labelFr: "Conseil digital", labelEn: "Digital consulting" },
  { value: "other", labelFr: "Autre", labelEn: "Other" },
] as const;
