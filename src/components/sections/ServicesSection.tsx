"use client";

import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import * as Icons from "lucide-react";
import { ArrowRight } from "lucide-react";
import { SERVICE_CATEGORIES } from "@/lib/data/services";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function ServicesSection() {
  const t = useTranslations("services");
  const locale = useLocale();

  return (
    <section className="py-20 lg:py-28 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title={t("title")} subtitle={t("subtitle")} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICE_CATEGORIES.map((cat, i) => {
            const Icon = Icons[cat.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>;
            return (
              <motion.div
                key={cat.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  href={`/services/${cat.slug}`}
                  className="block p-8 rounded-2xl bg-white border border-border card-hover h-full"
                >
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                    {Icon && <Icon className="w-7 h-7 text-primary" />}
                  </div>
                  <h3 className="text-xl font-bold text-secondary mb-3">
                    {locale === "fr" ? cat.titleFr : cat.titleEn}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {locale === "fr" ? cat.descFr : cat.descEn}
                  </p>
                  <span className="inline-flex items-center gap-1 text-primary text-sm font-semibold">
                    {t("learnMore")} <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
        <div className="text-center mt-12">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-colors"
          >
            {t("viewAll")} <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
