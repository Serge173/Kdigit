"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import * as Icons from "lucide-react";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { SERVICE_CATEGORIES } from "@/lib/data/services";

export function ServicesContent() {
  const t = useTranslations("services");
  const locale = useLocale();

  return (
    <>
      <PageHero title={t("title")} subtitle={t("subtitle")} />
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          {SERVICE_CATEGORIES.map((cat) => {
            const Icon = Icons[cat.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>;
            return (
              <div key={cat.slug} id={cat.slug}>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center">
                    {Icon && <Icon className="w-7 h-7 text-white" />}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-secondary">
                      {locale === "fr" ? cat.titleFr : cat.titleEn}
                    </h2>
                    <p className="text-muted-foreground">
                      {locale === "fr" ? cat.descFr : cat.descEn}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {cat.items.map((item) => {
                    const ItemIcon = Icons[item.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>;
                    return (
                      <Link
                        key={item.slug}
                        href={`/services/${cat.slug}`}
                        className="p-6 rounded-2xl border border-border bg-white card-hover group"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                            {ItemIcon && <ItemIcon className="w-5 h-5 text-primary" />}
                          </div>
                          <div>
                            <h3 className="font-bold text-secondary group-hover:text-primary transition-colors">
                              {locale === "fr" ? item.titleFr : item.titleEn}
                            </h3>
                            <p className="text-muted-foreground text-sm mt-1">
                              {locale === "fr" ? item.descFr : item.descEn}
                            </p>
                            <span className="inline-flex items-center gap-1 text-primary text-sm font-semibold mt-3">
                              {t("learnMore")} <ArrowRight className="w-4 h-4" />
                            </span>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <CTASection />
    </>
  );
}
