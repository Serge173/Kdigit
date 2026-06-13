import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/ui/PageHero";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { Check } from "lucide-react";

export default async function QuotePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("quote");

  const benefits =
    locale === "fr"
      ? [
          "Devis gratuit et sans engagement",
          "Réponse sous 48 heures",
          "Accompagnement personnalisé",
          "Confidentialité garantie",
        ]
      : [
          "Free, no-obligation quote",
          "Response within 48 hours",
          "Personalized support",
          "Confidentiality guaranteed",
        ];

  return (
    <>
      <PageHero title={t("title")} subtitle={t("subtitle")} />
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="space-y-6">
              <div className="p-8 rounded-2xl gradient-bg text-white">
                <h3 className="text-xl font-bold mb-4">
                  {locale === "fr" ? "Pourquoi demander un devis ?" : "Why request a quote?"}
                </h3>
                <ul className="space-y-3">
                  {benefits.map((b) => (
                    <li key={b} className="flex items-center gap-3 text-sm text-white/90">
                      <Check className="w-5 h-5 text-primary shrink-0" /> {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="bg-white p-8 rounded-2xl border border-border shadow-sm">
                <QuoteForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
