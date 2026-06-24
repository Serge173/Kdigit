import type { LucideIcon } from "lucide-react";
import {
  Briefcase,
  Calendar,
  Cloud,
  CreditCard,
  Cpu,
  FileText,
  LayoutGrid,
  Layers,
  Link2,
  Palette,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Target,
  Truck,
  UserRound,
} from "lucide-react";
import type { NeedsAssessmentData, SolutionType } from "@/lib/quote-form-schema";
import {
  getVisibleSectionIds,
  type QuoteSectionId,
  supportsShop,
} from "@/lib/quote-form-config";

export type { QuoteSectionId };

export interface QuoteSectionConfig {
  id: QuoteSectionId;
  number: string;
  titleKey: string;
  icon: LucideIcon;
  isComplete: (data: Partial<NeedsAssessmentData>) => boolean;
}

const SECTION_META: Record<
  QuoteSectionId,
  { titleKey: string; icon: LucideIcon; isComplete: (data: Partial<NeedsAssessmentData>) => boolean }
> = {
  general: {
    titleKey: "generalInfo",
    icon: UserRound,
    isComplete: (d) =>
      Boolean(d.solutionType) &&
      Boolean(d.appName?.trim()) &&
      Boolean(d.name?.trim()) &&
      Boolean(d.phone?.trim()) &&
      Boolean(d.email?.trim()) &&
      Boolean(d.address?.trim()) &&
      Boolean(d.sector?.trim()),
  },
  activity: {
    titleKey: "activityTitle",
    icon: Briefcase,
    isComplete: (d) => Boolean(d.activityPresentation?.trim() && d.activityPresentation.length >= 20),
  },
  goals: {
    titleKey: "goalsTitle",
    icon: Target,
    isComplete: (d) => Boolean(d.goals?.length),
  },
  pages: {
    titleKey: "pagesTitle",
    icon: LayoutGrid,
    isComplete: (d) => Boolean(d.pages?.length),
  },
  shop: {
    titleKey: "shopTitle",
    icon: ShoppingBag,
    isComplete: (d) => {
      if (!supportsShop(d.solutionType)) return true;
      if (!d.onlineShop) return false;
      if (d.onlineShop === "no") return true;
      return Boolean(d.productCount?.trim());
    },
  },
  platforms: {
    titleKey: "platformsTitle",
    icon: Smartphone,
    isComplete: (d) => {
      if (d.solutionType === "mobile") return Boolean(d.platforms?.length);
      return true;
    },
  },
  modules: {
    titleKey: "modulesTitle",
    icon: Cpu,
    isComplete: (d) => Boolean(d.softwareModules?.length),
  },
  payment: {
    titleKey: "paymentTitle",
    icon: CreditCard,
    isComplete: () => true,
  },
  delivery: {
    titleKey: "deliveryTitle",
    icon: Truck,
    isComplete: () => true,
  },
  integrations: {
    titleKey: "integrationsTitle",
    icon: Link2,
    isComplete: () => true,
  },
  hosting: {
    titleKey: "hostingTitle",
    icon: Cloud,
    isComplete: (d) => Boolean(d.hostingNeeds?.length),
  },
  scope: {
    titleKey: "scopeTitle",
    icon: FileText,
    isComplete: (d) =>
      d.solutionType === "consulting" || d.solutionType === "other"
        ? Boolean(d.projectScope?.trim() && d.projectScope.length >= 20)
        : true,
  },
  design: {
    titleKey: "designTitle",
    icon: Palette,
    isComplete: (d) => Boolean(d.hasLogo && d.hasImages),
  },
  extra: {
    titleKey: "extraTitle",
    icon: Sparkles,
    isComplete: () => true,
  },
  budget: {
    titleKey: "budgetTitle",
    icon: Calendar,
    isComplete: (d) => Boolean(d.budget?.trim() && d.deadline?.trim()),
  },
};

export function getQuoteSections(solutionType?: SolutionType): QuoteSectionConfig[] {
  const ids = getVisibleSectionIds(solutionType);
  return ids.map((id, index) => ({
    id,
    number: String(index + 1).padStart(2, "0"),
    titleKey: SECTION_META[id].titleKey,
    icon: SECTION_META[id].icon,
    isComplete: SECTION_META[id].isComplete,
  }));
}

export function calculateQuoteProgress(data: Partial<NeedsAssessmentData>) {
  const sections = getQuoteSections(data.solutionType);
  if (sections.length === 0) return 0;
  const completed = sections.filter((section) => section.isComplete(data)).length;
  return Math.round((completed / sections.length) * 100);
}

/** @deprecated use getQuoteSections(solutionType) */
export const QUOTE_SECTIONS = getQuoteSections("website");
