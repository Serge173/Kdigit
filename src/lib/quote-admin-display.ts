import { SERVICE_TYPES } from "@/lib/constants";
import {
  QUOTE_DELIVERY,
  QUOTE_EXTRA_FEATURES,
  QUOTE_GOALS,
  QUOTE_HOSTING_NEEDS,
  QUOTE_INTEGRATIONS,
  QUOTE_PAGES,
  QUOTE_PAYMENTS,
  QUOTE_PLATFORMS,
  QUOTE_SHOP_FEATURES,
  QUOTE_SOFTWARE_MODULES,
  type NeedsAssessmentData,
  type QuoteOption,
} from "@/lib/quote-form-schema";

export interface QuoteDisplayField {
  label: string;
  value: string;
}

export interface QuoteDisplaySection {
  title: string;
  fields: QuoteDisplayField[];
}

function labelFor(options: QuoteOption[], id: string) {
  const item = options.find((option) => option.id === id);
  return item?.labelFr ?? id;
}

function joinLabels(options: QuoteOption[], ids: string[] | undefined) {
  if (!ids?.length) return null;
  return ids.map((id) => labelFor(options, id)).join(", ");
}

function yesNo(value: "yes" | "no" | undefined) {
  if (!value) return null;
  return value === "yes" ? "Oui" : "Non";
}

function solutionLabel(type: string | undefined) {
  if (!type) return null;
  const item = SERVICE_TYPES.find((entry) => entry.value === type);
  return item?.labelFr ?? type;
}

function addField(fields: QuoteDisplayField[], label: string, value: string | null | undefined) {
  if (value?.trim()) fields.push({ label, value: value.trim() });
}

export function buildQuoteDisplaySections(formData: unknown): QuoteDisplaySection[] {
  if (!formData || typeof formData !== "object") return [];

  const data = formData as Partial<NeedsAssessmentData>;
  const sections: QuoteDisplaySection[] = [];

  const general: QuoteDisplayField[] = [];
  addField(general, "Type de solution", solutionLabel(data.solutionType));
  addField(general, "Nom du projet", data.appName);
  addField(general, "Responsable", data.name);
  addField(general, "Téléphone", data.phone);
  addField(general, "Email", data.email);
  addField(general, "Adresse", data.address);
  addField(general, "Secteur d'activité", data.sector);
  if (general.length) sections.push({ title: "Informations générales", fields: general });

  if (data.activityPresentation?.trim()) {
    sections.push({
      title: "Présentation de l'activité",
      fields: [{ label: "Description", value: data.activityPresentation.trim() }],
    });
  }

  if (data.projectScope?.trim()) {
    sections.push({
      title: "Périmètre du projet",
      fields: [{ label: "Description détaillée", value: data.projectScope.trim() }],
    });
  }

  const goals = joinLabels(QUOTE_GOALS, data.goals);
  if (goals) sections.push({ title: "Objectifs", fields: [{ label: "Objectifs sélectionnés", value: goals }] });

  const pages = joinLabels(QUOTE_PAGES, data.pages);
  if (pages) sections.push({ title: "Pages / écrans", fields: [{ label: "Sections souhaitées", value: pages }] });

  const platforms = joinLabels(QUOTE_PLATFORMS, data.platforms);
  if (platforms) {
    sections.push({ title: "Plateformes", fields: [{ label: "Plateformes cibles", value: platforms }] });
  }

  const modules = joinLabels(QUOTE_SOFTWARE_MODULES, data.softwareModules);
  if (modules) {
    sections.push({ title: "Modules fonctionnels", fields: [{ label: "Modules", value: modules }] });
  }

  if (data.onlineShop) {
    const shopFields: QuoteDisplayField[] = [
      { label: "Boutique en ligne", value: yesNo(data.onlineShop) ?? "—" },
    ];
    addField(shopFields, "Nombre de produits", data.productCount);
    const shopFeatures = joinLabels(QUOTE_SHOP_FEATURES, data.shopFeatures);
    addField(shopFields, "Fonctionnalités boutique", shopFeatures);
    sections.push({ title: "Boutique en ligne", fields: shopFields });
  }

  const integrations = joinLabels(QUOTE_INTEGRATIONS, data.integrations);
  if (integrations) {
    sections.push({ title: "Intégrations", fields: [{ label: "Services connectés", value: integrations }] });
  }

  const payments = joinLabels(QUOTE_PAYMENTS, data.payments);
  if (payments) sections.push({ title: "Paiement", fields: [{ label: "Modes de paiement", value: payments }] });

  const delivery = joinLabels(QUOTE_DELIVERY, data.delivery);
  if (delivery) sections.push({ title: "Livraison", fields: [{ label: "Options de livraison", value: delivery }] });

  const hosting = joinLabels(QUOTE_HOSTING_NEEDS, data.hostingNeeds);
  if (hosting) {
    sections.push({ title: "Hébergement & maintenance", fields: [{ label: "Besoins", value: hosting }] });
  }

  if (data.hasLogo || data.hasImages || data.preferredColors || data.likedSites) {
    const design: QuoteDisplayField[] = [];
    addField(design, "Logo existant", yesNo(data.hasLogo));
    addField(design, "Visuels disponibles", yesNo(data.hasImages));
    addField(design, "Couleurs préférées", data.preferredColors);
    addField(design, "Références / sites aimés", data.likedSites);
    if (design.length) sections.push({ title: "Design & identité", fields: design });
  }

  const extra = joinLabels(QUOTE_EXTRA_FEATURES, data.extraFeatures);
  if (extra) {
    sections.push({ title: "Fonctionnalités supplémentaires", fields: [{ label: "Options", value: extra }] });
  }

  const budgetFields: QuoteDisplayField[] = [];
  addField(budgetFields, "Budget prévu", data.budget);
  addField(budgetFields, "Date souhaitée", data.deadline);
  if (budgetFields.length) sections.push({ title: "Budget & délai", fields: budgetFields });

  return sections;
}
