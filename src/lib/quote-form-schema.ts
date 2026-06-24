import { z } from "zod";
import { SERVICE_TYPES } from "@/lib/constants";

export type QuoteOption = { id: string; labelFr: string; labelEn: string };

export const SOLUTION_TYPE_VALUES = SERVICE_TYPES.map((s) => s.value) as [
  "website",
  "webapp",
  "mobile",
  "software",
  "hosting",
  "consulting",
  "other",
];

export type SolutionType = (typeof SOLUTION_TYPE_VALUES)[number];

export const QUOTE_GOALS: QuoteOption[] = [
  { id: "present_company", labelFr: "Présenter mon activité / marque", labelEn: "Present my business / brand" },
  { id: "sell_online", labelFr: "Vendre produits ou services en ligne", labelEn: "Sell products or services online" },
  { id: "more_clients", labelFr: "Obtenir plus de clients", labelEn: "Get more clients" },
  { id: "automate", labelFr: "Automatiser des processus", labelEn: "Automate processes" },
  { id: "manage_data", labelFr: "Centraliser et gérer des données", labelEn: "Centralize and manage data" },
  { id: "internal_tool", labelFr: "Outil interne pour mon équipe", labelEn: "Internal tool for my team" },
  { id: "customer_portal", labelFr: "Portail client / self-service", labelEn: "Customer portal / self-service" },
  { id: "appointments", labelFr: "Prises de rendez-vous / réservations", labelEn: "Appointments / bookings" },
  { id: "productivity", labelFr: "Améliorer la productivité", labelEn: "Improve productivity" },
  { id: "analytics", labelFr: "Suivi, statistiques & reporting", labelEn: "Tracking, analytics & reporting" },
  { id: "digitize", labelFr: "Digitaliser une activité existante", labelEn: "Digitize an existing activity" },
  { id: "launch_mvp", labelFr: "Lancer un MVP / prototype", labelEn: "Launch an MVP / prototype" },
];

export const QUOTE_PAGES: QuoteOption[] = [
  { id: "home", labelFr: "Accueil", labelEn: "Home" },
  { id: "about", labelFr: "À propos", labelEn: "About" },
  { id: "services", labelFr: "Services / offres", labelEn: "Services / offers" },
  { id: "shop", labelFr: "Boutique / catalogue", labelEn: "Shop / catalog" },
  { id: "gallery", labelFr: "Galerie / portfolio", labelEn: "Gallery / portfolio" },
  { id: "blog", labelFr: "Blog / actualités", labelEn: "Blog / news" },
  { id: "contact", labelFr: "Contact", labelEn: "Contact" },
  { id: "quote", labelFr: "Demande de devis", labelEn: "Quote request" },
  { id: "dashboard", labelFr: "Espace membre / dashboard", labelEn: "Member area / dashboard" },
  { id: "admin", labelFr: "Back-office / administration", labelEn: "Back-office / admin" },
];

export const QUOTE_PLATFORMS: QuoteOption[] = [
  { id: "web", labelFr: "Web (navigateur)", labelEn: "Web (browser)" },
  { id: "ios", labelFr: "iOS (iPhone / iPad)", labelEn: "iOS (iPhone / iPad)" },
  { id: "android", labelFr: "Android", labelEn: "Android" },
  { id: "desktop", labelFr: "Application desktop (Windows / Mac)", labelEn: "Desktop app (Windows / Mac)" },
  { id: "pwa", labelFr: "PWA (web + mobile)", labelEn: "PWA (web + mobile)" },
];

export const QUOTE_SOFTWARE_MODULES: QuoteOption[] = [
  { id: "crm", labelFr: "CRM / gestion clients", labelEn: "CRM / client management" },
  { id: "inventory", labelFr: "Stock & inventaire", labelEn: "Inventory & stock" },
  { id: "billing", labelFr: "Facturation & paiements", labelEn: "Billing & payments" },
  { id: "hr", labelFr: "RH / personnel", labelEn: "HR / staff" },
  { id: "reports", labelFr: "Rapports & tableaux de bord", labelEn: "Reports & dashboards" },
  { id: "workflow", labelFr: "Workflows & validations", labelEn: "Workflows & approvals" },
  { id: "documents", labelFr: "Gestion documentaire", labelEn: "Document management" },
  { id: "api", labelFr: "API & intégrations tierces", labelEn: "API & third-party integrations" },
  { id: "custom", labelFr: "Modules sur mesure", labelEn: "Custom modules" },
];

export const QUOTE_INTEGRATIONS: QuoteOption[] = [
  { id: "payment", labelFr: "Paiement en ligne", labelEn: "Online payment" },
  { id: "whatsapp", labelFr: "WhatsApp Business", labelEn: "WhatsApp Business" },
  { id: "sms", labelFr: "SMS / notifications", labelEn: "SMS / notifications" },
  { id: "email", labelFr: "Email / newsletters", labelEn: "Email / newsletters" },
  { id: "maps", labelFr: "Géolocalisation / cartes", labelEn: "Geolocation / maps" },
  { id: "erp", labelFr: "ERP / logiciel existant", labelEn: "ERP / existing software" },
  { id: "social", labelFr: "Réseaux sociaux", labelEn: "Social media" },
  { id: "analytics", labelFr: "Google Analytics / tracking", labelEn: "Google Analytics / tracking" },
  { id: "ai", labelFr: "Intelligence artificielle / chatbot", labelEn: "AI / chatbot" },
];

export const QUOTE_SHOP_FEATURES: QuoteOption[] = [
  { id: "photos", labelFr: "Photos", labelEn: "Photos" },
  { id: "description", labelFr: "Description", labelEn: "Description" },
  { id: "price", labelFr: "Prix", labelEn: "Price" },
  { id: "stock", labelFr: "Gestion du stock", labelEn: "Stock management" },
];

export const QUOTE_PAYMENTS: QuoteOption[] = [
  { id: "orange_money", labelFr: "Orange Money", labelEn: "Orange Money" },
  { id: "mtn_money", labelFr: "MTN Money", labelEn: "MTN Money" },
  { id: "moov_money", labelFr: "Moov Money", labelEn: "Moov Money" },
  { id: "card", labelFr: "Carte bancaire", labelEn: "Bank card" },
  { id: "cod", labelFr: "Paiement à la livraison", labelEn: "Cash on delivery" },
  { id: "invoice", labelFr: "Facturation / virement", labelEn: "Invoice / bank transfer" },
];

export const QUOTE_DELIVERY: QuoteOption[] = [
  { id: "pickup", labelFr: "Retrait sur place", labelEn: "In-store pickup" },
  { id: "home", labelFr: "Livraison à domicile", labelEn: "Home delivery" },
  { id: "national", labelFr: "Livraison nationale", labelEn: "National delivery" },
  { id: "international", labelFr: "Livraison internationale", labelEn: "International delivery" },
];

export const QUOTE_HOSTING_NEEDS: QuoteOption[] = [
  { id: "hosting", labelFr: "Hébergement web / cloud", labelEn: "Web / cloud hosting" },
  { id: "domain", labelFr: "Nom de domaine", labelEn: "Domain name" },
  { id: "ssl", labelFr: "Certificat SSL / sécurité", labelEn: "SSL / security" },
  { id: "backup", labelFr: "Sauvegardes automatiques", labelEn: "Automatic backups" },
  { id: "monitoring", labelFr: "Monitoring & disponibilité", labelEn: "Monitoring & uptime" },
  { id: "maintenance", labelFr: "Maintenance corrective", labelEn: "Corrective maintenance" },
  { id: "updates", labelFr: "Mises à jour & évolutions", labelEn: "Updates & improvements" },
  { id: "support", labelFr: "Support technique", labelEn: "Technical support" },
];

export const QUOTE_EXTRA_FEATURES: QuoteOption[] = [
  { id: "whatsapp", labelFr: "WhatsApp", labelEn: "WhatsApp" },
  { id: "live_chat", labelFr: "Chat en ligne", labelEn: "Live chat" },
  { id: "newsletter", labelFr: "Newsletter", labelEn: "Newsletter" },
  { id: "social", labelFr: "Réseaux sociaux", labelEn: "Social media" },
  { id: "reviews", labelFr: "Avis clients", labelEn: "Customer reviews" },
  { id: "multilingual", labelFr: "Multilingue", labelEn: "Multilingual" },
  { id: "offline", labelFr: "Mode hors ligne", labelEn: "Offline mode" },
  { id: "push", labelFr: "Notifications push", labelEn: "Push notifications" },
  { id: "roles", labelFr: "Gestion des rôles & permissions", labelEn: "Roles & permissions" },
];

export const needsAssessmentSchema = z
  .object({
    solutionType: z.enum(SOLUTION_TYPE_VALUES),
    appName: z.string().trim().min(2).max(120),
    name: z.string().trim().min(2).max(100),
    phone: z.string().trim().min(6).max(30),
    email: z.string().trim().email(),
    address: z.string().trim().min(3).max(200),
    sector: z.string().trim().min(2).max(100),
    activityPresentation: z.string().trim().min(20).max(5000),
    projectScope: z.string().trim().max(5000).optional(),
    goals: z.array(z.string()).min(1),
    pages: z.array(z.string()).optional(),
    platforms: z.array(z.string()).optional(),
    softwareModules: z.array(z.string()).optional(),
    onlineShop: z.enum(["yes", "no"]).optional(),
    productCount: z.string().trim().max(50).optional(),
    shopFeatures: z.array(z.string()).optional(),
    payments: z.array(z.string()).optional(),
    delivery: z.array(z.string()).optional(),
    integrations: z.array(z.string()).optional(),
    hostingNeeds: z.array(z.string()).optional(),
    hasLogo: z.enum(["yes", "no"]).optional(),
    hasImages: z.enum(["yes", "no"]).optional(),
    preferredColors: z.string().trim().max(200).optional(),
    likedSites: z.string().trim().max(1000).optional(),
    extraFeatures: z.array(z.string()).optional(),
    budget: z.string().trim().min(1).max(100),
    deadline: z.string().trim().min(1).max(100),
    website: z.string().max(0).optional(),
  })
  .superRefine((data, ctx) => {
    if ((data.solutionType === "website" || data.solutionType === "webapp") && !data.pages?.length) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["pages"], message: "required" });
    }
    if (data.solutionType === "mobile" && !data.platforms?.length) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["platforms"], message: "required" });
    }
    if (data.solutionType === "software" && !data.softwareModules?.length) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["softwareModules"], message: "required" });
    }
    if (
      (data.solutionType === "consulting" || data.solutionType === "other") &&
      (!data.projectScope?.trim() || data.projectScope.trim().length < 20)
    ) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["projectScope"], message: "required" });
    }
    if (data.solutionType === "hosting" && !data.hostingNeeds?.length) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["hostingNeeds"], message: "required" });
    }
    if (
      (data.solutionType === "website" || data.solutionType === "webapp") &&
      data.onlineShop === "yes" &&
      !data.productCount?.trim()
    ) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["productCount"], message: "required" });
    }
    if (
      (data.solutionType === "website" || data.solutionType === "webapp") &&
      !data.onlineShop
    ) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["onlineShop"], message: "required" });
    }
    const requiresDesign = ["website", "webapp", "mobile", "software", "other"].includes(data.solutionType);
    if (requiresDesign && !data.hasLogo) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["hasLogo"], message: "required" });
    }
    if (requiresDesign && !data.hasImages) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["hasImages"], message: "required" });
    }
  });

export type NeedsAssessmentData = z.infer<typeof needsAssessmentSchema>;

function labelFor(options: QuoteOption[], id: string, locale: "fr" | "en") {
  const item = options.find((o) => o.id === id);
  if (!item) return id;
  return locale === "fr" ? item.labelFr : item.labelEn;
}

function joinLabels(options: QuoteOption[], ids: string[] | undefined, locale: "fr" | "en") {
  if (!ids?.length) return "—";
  return ids.map((id) => labelFor(options, id, locale)).join(", ");
}

function yesNo(value: "yes" | "no" | undefined, locale: "fr" | "en") {
  if (!value) return "—";
  return value === "yes" ? (locale === "fr" ? "Oui" : "Yes") : locale === "fr" ? "Non" : "No";
}

function solutionLabel(type: SolutionType, locale: "fr" | "en") {
  const item = SERVICE_TYPES.find((s) => s.value === type);
  if (!item) return type;
  return locale === "fr" ? item.labelFr : item.labelEn;
}

export function formatQuoteSummary(data: NeedsAssessmentData, locale: "fr" | "en" = "fr") {
  const lines = [
    locale === "fr" ? "FICHE DE COLLECTE DES BESOINS — KDIGIT" : "KDIGIT NEEDS ASSESSMENT FORM",
    "",
    locale === "fr" ? "Type de solution demandée" : "Requested solution type",
    solutionLabel(data.solutionType, locale),
    "",
    locale === "fr" ? "Informations générales" : "General information",
    `${locale === "fr" ? "Nom du projet / solution" : "Project / solution name"}: ${data.appName}`,
    `${locale === "fr" ? "Responsable" : "Contact person"}: ${data.name}`,
    `${locale === "fr" ? "Téléphone" : "Phone"}: ${data.phone}`,
    `Email: ${data.email}`,
    `${locale === "fr" ? "Adresse" : "Address"}: ${data.address}`,
    `${locale === "fr" ? "Secteur d'activité" : "Industry"}: ${data.sector}`,
    "",
    locale === "fr" ? "Présentation du besoin" : "Need presentation",
    data.activityPresentation,
  ];

  if (data.projectScope?.trim()) {
    lines.push("", locale === "fr" ? "Périmètre détaillé" : "Detailed scope", data.projectScope);
  }

  lines.push(
    "",
    locale === "fr" ? "Objectifs du projet" : "Project goals",
    joinLabels(QUOTE_GOALS, data.goals, locale)
  );

  if (data.pages?.length) {
    lines.push("", locale === "fr" ? "Pages / écrans souhaités" : "Desired pages / screens", joinLabels(QUOTE_PAGES, data.pages, locale));
  }
  if (data.platforms?.length) {
    lines.push("", locale === "fr" ? "Plateformes cibles" : "Target platforms", joinLabels(QUOTE_PLATFORMS, data.platforms, locale));
  }
  if (data.softwareModules?.length) {
    lines.push("", locale === "fr" ? "Modules fonctionnels" : "Functional modules", joinLabels(QUOTE_SOFTWARE_MODULES, data.softwareModules, locale));
  }
  if (data.onlineShop) {
    lines.push(
      "",
      locale === "fr" ? "Boutique / vente en ligne" : "Shop / online sales",
      `${yesNo(data.onlineShop, locale)}${data.productCount ? ` — ${data.productCount} produits` : ""}`,
      joinLabels(QUOTE_SHOP_FEATURES, data.shopFeatures, locale)
    );
  }
  if (data.integrations?.length) {
    lines.push("", locale === "fr" ? "Intégrations souhaitées" : "Desired integrations", joinLabels(QUOTE_INTEGRATIONS, data.integrations, locale));
  }
  if (data.payments?.length) {
    lines.push("", locale === "fr" ? "Modes de paiement" : "Payment methods", joinLabels(QUOTE_PAYMENTS, data.payments, locale));
  }
  if (data.delivery?.length) {
    lines.push("", locale === "fr" ? "Livraison" : "Delivery", joinLabels(QUOTE_DELIVERY, data.delivery, locale));
  }
  if (data.hostingNeeds?.length) {
    lines.push("", locale === "fr" ? "Besoins hébergement / maintenance" : "Hosting / maintenance needs", joinLabels(QUOTE_HOSTING_NEEDS, data.hostingNeeds, locale));
  }
  if (data.hasLogo || data.hasImages) {
    lines.push(
      "",
      locale === "fr" ? "Design & identité" : "Design & branding",
      `Logo: ${yesNo(data.hasLogo, locale)}`,
      `${locale === "fr" ? "Visuels disponibles" : "Visual assets"}: ${yesNo(data.hasImages, locale)}`,
      `${locale === "fr" ? "Couleurs" : "Colors"}: ${data.preferredColors || "—"}`,
      `${locale === "fr" ? "Références" : "References"}: ${data.likedSites || "—"}`
    );
  }
  if (data.extraFeatures?.length) {
    lines.push("", locale === "fr" ? "Fonctionnalités additionnelles" : "Additional features", joinLabels(QUOTE_EXTRA_FEATURES, data.extraFeatures, locale));
  }

  lines.push(
    "",
    locale === "fr" ? "Budget & délai" : "Budget & timeline",
    `${locale === "fr" ? "Budget" : "Budget"}: ${data.budget}`,
    `${locale === "fr" ? "Date souhaitée" : "Target date"}: ${data.deadline}`
  );

  return lines.join("\n");
}

export function formatQuoteWhatsAppMessage(data: NeedsAssessmentData) {
  return [
    "🆕 *NOUVEAU DEVIS KDIGIT*",
    "",
    `🧩 *Type:* ${solutionLabel(data.solutionType, "fr")}`,
    `📱 *Projet:* ${data.appName}`,
    `👤 *Client:* ${data.name}`,
    `📞 *Tel:* ${data.phone}`,
    `✉️ *Email:* ${data.email}`,
    "",
    `🎯 *Objectifs:* ${joinLabels(QUOTE_GOALS, data.goals, "fr")}`,
    data.platforms?.length ? `📲 *Plateformes:* ${joinLabels(QUOTE_PLATFORMS, data.platforms, "fr")}` : null,
    data.softwareModules?.length ? `⚙️ *Modules:* ${joinLabels(QUOTE_SOFTWARE_MODULES, data.softwareModules, "fr")}` : null,
    data.pages?.length ? `📄 *Pages:* ${joinLabels(QUOTE_PAGES, data.pages, "fr")}` : null,
    `💰 *Budget:* ${data.budget}`,
    `📅 *Délai:* ${data.deadline}`,
  ]
    .filter(Boolean)
    .join("\n");
}
