export interface ServiceItem {
  slug: string;
  icon: string;
  titleFr: string;
  titleEn: string;
  descFr: string;
  descEn: string;
  featuresFr: string[];
  featuresEn: string[];
}

export interface ServiceCategory {
  slug: string;
  icon: string;
  titleFr: string;
  titleEn: string;
  descFr: string;
  descEn: string;
  items: ServiceItem[];
}

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    slug: "sites-internet",
    icon: "Globe",
    titleFr: "Création de sites internet",
    titleEn: "Website creation",
    descFr:
      "Des sites web modernes, performants et optimisés SEO pour valoriser votre image de marque.",
    descEn:
      "Modern, performant and SEO-optimized websites to enhance your brand image.",
    items: [
      {
        slug: "site-vitrine",
        icon: "Layout",
        titleFr: "Site vitrine",
        titleEn: "Showcase website",
        descFr: "Présentez votre activité avec élégance et convertissez vos visiteurs en clients.",
        descEn: "Present your business elegantly and convert visitors into clients.",
        featuresFr: ["Design sur mesure", "Responsive", "SEO optimisé", "Formulaire de contact"],
        featuresEn: ["Custom design", "Responsive", "SEO optimized", "Contact form"],
      },
      {
        slug: "site-institutionnel",
        icon: "Building2",
        titleFr: "Site institutionnel",
        titleEn: "Institutional website",
        descFr: "Sites professionnels pour administrations, écoles et grandes organisations.",
        descEn: "Professional sites for administrations, schools and large organizations.",
        featuresFr: ["Accessibilité WCAG", "Multilingue", "Gestion de contenu", "Sécurité renforcée"],
        featuresEn: ["WCAG accessibility", "Multilingual", "Content management", "Enhanced security"],
      },
      {
        slug: "e-commerce",
        icon: "ShoppingCart",
        titleFr: "Site e-commerce",
        titleEn: "E-commerce website",
        descFr: "Boutiques en ligne performantes avec paiement sécurisé et gestion des stocks.",
        descEn: "Performant online stores with secure payment and inventory management.",
        featuresFr: ["Paiement en ligne", "Gestion produits", "Analytics", "Mobile-first"],
        featuresEn: ["Online payment", "Product management", "Analytics", "Mobile-first"],
      },
      {
        slug: "blog",
        icon: "FileText",
        titleFr: "Blog professionnel",
        titleEn: "Professional blog",
        descFr: "Plateformes éditoriales pour partager votre expertise et améliorer votre SEO.",
        descEn: "Editorial platforms to share your expertise and improve your SEO.",
        featuresFr: ["CMS intégré", "Catégories & tags", "Newsletter", "Partage social"],
        featuresEn: ["Integrated CMS", "Categories & tags", "Newsletter", "Social sharing"],
      },
    ],
  },
  {
    slug: "applications-web",
    icon: "Code2",
    titleFr: "Développement d'applications web",
    titleEn: "Web application development",
    descFr:
      "Applications web sur mesure pour automatiser vos processus et booster votre productivité.",
    descEn:
      "Custom web applications to automate your processes and boost productivity.",
    items: [
      {
        slug: "erp",
        icon: "Database",
        titleFr: "ERP",
        titleEn: "ERP",
        descFr: "Systèmes de gestion intégrés adaptés à votre organisation.",
        descEn: "Integrated management systems tailored to your organization.",
        featuresFr: ["Modules personnalisés", "Reporting", "Multi-utilisateurs", "API"],
        featuresEn: ["Custom modules", "Reporting", "Multi-user", "API"],
      },
      {
        slug: "crm",
        icon: "Users",
        titleFr: "CRM",
        titleEn: "CRM",
        descFr: "Gérez vos relations clients et optimisez votre pipeline commercial.",
        descEn: "Manage customer relationships and optimize your sales pipeline.",
        featuresFr: ["Suivi leads", "Automatisation", "Tableaux de bord", "Intégrations"],
        featuresEn: ["Lead tracking", "Automation", "Dashboards", "Integrations"],
      },
      {
        slug: "logiciels-metiers",
        icon: "Cog",
        titleFr: "Logiciels métiers",
        titleEn: "Business software",
        descFr: "Solutions spécialisées pour vos processus métier uniques.",
        descEn: "Specialized solutions for your unique business processes.",
        featuresFr: ["Sur mesure", "Workflows", "Sécurité", "Scalabilité"],
        featuresEn: ["Custom-built", "Workflows", "Security", "Scalability"],
      },
      {
        slug: "saas",
        icon: "Cloud",
        titleFr: "Plateformes SaaS",
        titleEn: "SaaS platforms",
        descFr: "Produits logiciels en mode abonnement, multi-tenant et évolutifs.",
        descEn: "Subscription-based, multi-tenant and scalable software products.",
        featuresFr: ["Multi-tenant", "Abonnements", "API REST", "Monitoring"],
        featuresEn: ["Multi-tenant", "Subscriptions", "REST API", "Monitoring"],
      },
    ],
  },
  {
    slug: "applications-mobiles",
    icon: "Smartphone",
    titleFr: "Développement mobile",
    titleEn: "Mobile development",
    descFr:
      "Applications mobiles natives et hybrides pour Android et iOS.",
    descEn:
      "Native and hybrid mobile applications for Android and iOS.",
    items: [
      {
        slug: "android",
        icon: "Smartphone",
        titleFr: "Android",
        titleEn: "Android",
        descFr: "Applications natives Android performantes et intuitives.",
        descEn: "Performant and intuitive native Android applications.",
        featuresFr: ["Kotlin/Java", "Material Design", "Play Store", "Notifications push"],
        featuresEn: ["Kotlin/Java", "Material Design", "Play Store", "Push notifications"],
      },
      {
        slug: "ios",
        icon: "TabletSmartphone",
        titleFr: "iOS",
        titleEn: "iOS",
        descFr: "Applications iPhone et iPad avec une expérience utilisateur premium.",
        descEn: "iPhone and iPad apps with a premium user experience.",
        featuresFr: ["Swift", "App Store", "Face ID", "Widgets"],
        featuresEn: ["Swift", "App Store", "Face ID", "Widgets"],
      },
      {
        slug: "hybride",
        icon: "Layers",
        titleFr: "Applications hybrides",
        titleEn: "Hybrid applications",
        descFr: "Une seule base de code pour Android et iOS, déploiement rapide.",
        descEn: "Single codebase for Android and iOS, fast deployment.",
        featuresFr: ["React Native", "Flutter", "Cross-platform", "Maintenance simplifiée"],
        featuresEn: ["React Native", "Flutter", "Cross-platform", "Simplified maintenance"],
      },
    ],
  },
  {
    slug: "hebergement-maintenance",
    icon: "Server",
    titleFr: "Hébergement et maintenance",
    titleEn: "Hosting and maintenance",
    descFr:
      "Infrastructure sécurisée et maintenance proactive pour garantir la disponibilité.",
    descEn:
      "Secure infrastructure and proactive maintenance to ensure availability.",
    items: [
      {
        slug: "hebergement",
        icon: "HardDrive",
        titleFr: "Hébergement sécurisé",
        titleEn: "Secure hosting",
        descFr: "Serveurs haute performance avec SSL, sauvegardes et monitoring 24/7.",
        descEn: "High-performance servers with SSL, backups and 24/7 monitoring.",
        featuresFr: ["SSL/HTTPS", "CDN", "Sauvegardes auto", "Uptime 99.9%"],
        featuresEn: ["SSL/HTTPS", "CDN", "Auto backups", "99.9% uptime"],
      },
      {
        slug: "maintenance-corrective",
        icon: "Wrench",
        titleFr: "Maintenance corrective",
        titleEn: "Corrective maintenance",
        descFr: "Correction rapide des bugs et incidents pour minimiser les interruptions.",
        descEn: "Quick bug fixes and incident resolution to minimize downtime.",
        featuresFr: ["Support réactif", "SLA garanti", "Hotfix", "Monitoring"],
        featuresEn: ["Responsive support", "Guaranteed SLA", "Hotfix", "Monitoring"],
      },
      {
        slug: "maintenance-evolutive",
        icon: "ArrowUpCircle",
        titleFr: "Maintenance évolutive",
        titleEn: "Evolutionary maintenance",
        descFr: "Évolutions fonctionnelles et mises à jour technologiques continues.",
        descEn: "Functional evolutions and continuous technology updates.",
        featuresFr: ["Nouvelles fonctionnalités", "Mises à jour", "Optimisations", "Roadmap"],
        featuresEn: ["New features", "Updates", "Optimizations", "Roadmap"],
      },
    ],
  },
  {
    slug: "conseil-digital",
    icon: "Lightbulb",
    titleFr: "Conseil et accompagnement digital",
    titleEn: "Digital consulting and support",
    descFr:
      "Audit, stratégie et accompagnement pour réussir votre transformation numérique.",
    descEn:
      "Audit, strategy and support to succeed in your digital transformation.",
    items: [
      {
        slug: "audit",
        icon: "Search",
        titleFr: "Audit digital",
        titleEn: "Digital audit",
        descFr: "Analyse complète de votre écosystème digital et recommandations.",
        descEn: "Complete analysis of your digital ecosystem and recommendations.",
        featuresFr: ["Audit technique", "Audit SEO", "Audit sécurité", "Rapport détaillé"],
        featuresEn: ["Technical audit", "SEO audit", "Security audit", "Detailed report"],
      },
      {
        slug: "accompagnement",
        icon: "Handshake",
        titleFr: "Accompagnement",
        titleEn: "Support",
        descFr: "Coaching et formation pour vos équipes sur les outils digitaux.",
        descEn: "Coaching and training for your teams on digital tools.",
        featuresFr: ["Formation", "Coaching", "Documentation", "Support continu"],
        featuresEn: ["Training", "Coaching", "Documentation", "Ongoing support"],
      },
      {
        slug: "transformation",
        icon: "Rocket",
        titleFr: "Transformation digitale",
        titleEn: "Digital transformation",
        descFr: "Stratégie globale pour moderniser vos processus et outils.",
        descEn: "Global strategy to modernize your processes and tools.",
        featuresFr: ["Stratégie", "Roadmap", "Change management", "KPIs"],
        featuresEn: ["Strategy", "Roadmap", "Change management", "KPIs"],
      },
    ],
  },
];

export function getServiceCategory(slug: string) {
  return SERVICE_CATEGORIES.find((c) => c.slug === slug);
}

export function getAllServiceItems() {
  return SERVICE_CATEGORIES.flatMap((cat) =>
    cat.items.map((item) => ({ ...item, category: cat }))
  );
}
