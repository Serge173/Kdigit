"use client";

import { useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import * as Icons from "lucide-react";
import { ArrowLeft, Check } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import type { ServiceCategory } from "@/lib/data/services";

export function ServiceCategoryContent({ category }: { category: ServiceCategory }) {
  const locale = useLocale();

  return (
    <>
      <PageHero
        title={locale === "fr" ? category.titleFr : category.titleEn}
        subtitle={locale === "fr" ? category.descFr : category.descEn}
      />
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/services" className="inline-flex items-center gap-2 text-primary text-sm font-medium mb-8 hover:underline">
            <ArrowLeft className="w-4 h-4" /> Services
          </Link>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {category.items.map((item) => {
              const ItemIcon = Icons[item.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>;
              const features = locale === "fr" ? item.featuresFr : item.featuresEn;
              return (
                <div key={item.slug} className="p-8 rounded-2xl border border-border bg-white card-hover">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    {ItemIcon && <ItemIcon className="w-6 h-6 text-primary" />}
                  </div>
                  <h3 className="text-xl font-bold text-secondary mb-2">
                    {locale === "fr" ? item.titleFr : item.titleEn}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {locale === "fr" ? item.descFr : item.descEn}
                  </p>
                  <ul className="space-y-2">
                    {features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-secondary/80">
                        <Check className="w-4 h-4 text-accent shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
