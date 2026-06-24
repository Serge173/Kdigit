import type { SolutionType } from "@/lib/quote-form-schema";

export type QuoteSectionId =
  | "general"
  | "activity"
  | "goals"
  | "pages"
  | "shop"
  | "platforms"
  | "modules"
  | "payment"
  | "delivery"
  | "integrations"
  | "hosting"
  | "scope"
  | "design"
  | "extra"
  | "budget";

export const SOLUTION_SECTIONS: Record<SolutionType, QuoteSectionId[]> = {
  website: ["general", "activity", "goals", "pages", "shop", "payment", "delivery", "design", "extra", "budget"],
  webapp: ["general", "activity", "goals", "pages", "platforms", "shop", "integrations", "payment", "design", "extra", "budget"],
  mobile: ["general", "activity", "goals", "platforms", "integrations", "design", "extra", "budget"],
  software: ["general", "activity", "goals", "modules", "integrations", "design", "extra", "budget"],
  hosting: ["general", "activity", "goals", "hosting", "extra", "budget"],
  consulting: ["general", "activity", "goals", "scope", "extra", "budget"],
  other: ["general", "activity", "goals", "scope", "integrations", "design", "extra", "budget"],
};

export function getVisibleSectionIds(type?: SolutionType): QuoteSectionId[] {
  if (!type) return SOLUTION_SECTIONS.website;
  return SOLUTION_SECTIONS[type];
}

export function isWebLike(type?: SolutionType) {
  return type === "website" || type === "webapp";
}

export function supportsShop(type?: SolutionType) {
  return type === "website" || type === "webapp";
}

export function supportsPages(type?: SolutionType) {
  return type === "website" || type === "webapp";
}

export function supportsPaymentDelivery(type?: SolutionType) {
  return type === "website";
}
