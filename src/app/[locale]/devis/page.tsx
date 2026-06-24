import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { Clock, Shield, Sparkles, Zap } from "lucide-react";

export default async function QuotePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("quote");

  const isFr = locale === "fr";

  const badges = isFr
    ? [
        { icon: Zap, label: "Devis gratuit" },
        { icon: Clock, label: "Réponse sous 48h" },
        { icon: Shield, label: "100 % confidentiel" },
        { icon: Sparkles, label: "Accompagnement premium" },
      ]
    : [
        { icon: Zap, label: "Free quote" },
        { icon: Clock, label: "Reply within 48h" },
        { icon: Shield, label: "100% confidential" },
        { icon: Sparkles, label: "Premium support" },
      ];

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
    <>
      <section className="relative overflow-hidden pt-24 pb-12 sm:pt-28 sm:pb-14 lg:pt-36 lg:pb-20">
        <div className="absolute inset-0 bg-secondary" />
        <div className="absolute inset-0 opacity-40 hero-pattern" />
        <div className="absolute -left-20 top-20 h-48 w-48 rounded-full bg-primary/25 blur-3xl sm:h-72 sm:w-72" />
        <div className="absolute -right-16 bottom-0 h-56 w-56 rounded-full bg-accent/20 blur-3xl sm:h-80 sm:w-80" />

        <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/80 backdrop-blur sm:px-4 sm:text-xs sm:tracking-[0.18em]">
            <Sparkles className="h-3.5 w-3.5 shrink-0 text-primary-light" />
            <span className="truncate">{t("heroBadge")}</span>
          </span>
          <h1 className="mt-5 text-3xl font-bold tracking-tight text-white sm:mt-6 sm:text-4xl md:text-5xl lg:text-6xl">
            {t("title")}
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-white/75 sm:mt-5 sm:text-base md:text-lg">
            {t("subtitle")}
          </p>
          <div className="mx-auto mt-6 flex h-1 w-20 rounded-full bg-gradient-to-r from-primary via-primary-light to-accent sm:mt-8 sm:w-24" />
          <div className="mt-8 grid grid-cols-2 gap-2 sm:mt-10 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-3">
            {badges.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/10 px-2.5 py-2 text-[11px] font-medium text-white/90 backdrop-blur-md sm:rounded-2xl sm:px-4 sm:py-2.5 sm:text-sm"
              >
                <Icon className="h-3.5 w-3.5 shrink-0 text-accent sm:h-4 sm:w-4" />
                <span className="leading-tight">{label}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-8 sm:py-12 lg:py-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.06),transparent_35%),radial-gradient(circle_at_bottom,rgba(34,197,94,0.05),transparent_30%)]" />
        <div className="relative mx-auto max-w-6xl px-4 pb-8 sm:px-6 sm:pb-12 lg:px-8 lg:pb-16">
          <QuoteForm
            trustItems={trustItems}
            sidebarTitle={isFr ? "Votre projet mérite une vraie expertise" : "Your project deserves real expertise"}
          />
        </div>
      </section>
    </>
  );
}
