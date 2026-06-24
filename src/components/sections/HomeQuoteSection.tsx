"use client";

import { useTranslations } from "next-intl";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Sparkles } from "lucide-react";

interface HomeQuoteSectionProps {
  locale: string;
}

export function HomeQuoteSection({ locale }: HomeQuoteSectionProps) {
  const t = useTranslations("quote");
  const isFr = locale === "fr";

  const trustItems = isFr
    ? [
        "Analyse personnalisée de votre projet",
        "Proposition détaillée et transparente",
        "Échange direct avec l'équipe KDIGIT",
        "Sans engagement de votre part",
      ]
    : [
        "Personalized project analysis",
        "Detailed, transparent proposal",
        "Direct contact with the KDIGIT team",
        "No obligation on your part",
      ];

  return (
    <section id="devis" className="relative scroll-mt-20 py-16 sm:py-20 lg:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.07),transparent_40%),radial-gradient(circle_at_bottom,rgba(34,197,94,0.06),transparent_35%)]" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center sm:mb-12">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            {t("heroBadge")}
          </span>
          <SectionHeader
            title={t("homeTitle")}
            subtitle={t("homeSubtitle")}
            className="mb-0"
          />
        </div>

        <QuoteForm
          trustItems={trustItems}
          sidebarTitle={
            isFr ? "Votre projet mérite une vraie expertise" : "Your project deserves real expertise"
          }
        />
      </div>
    </section>
  );
}
