"use client";

import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import * as Icons from "lucide-react";
import { WHY_CHOOSE } from "@/lib/constants";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function WhyChoose() {
  const t = useTranslations("why");
  const locale = useLocale();

  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title={t("title")} subtitle={t("subtitle")} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {WHY_CHOOSE.map((item, i) => {
            const Icon = Icons[item.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-muted card-hover"
              >
                <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center mb-4">
                  {Icon && <Icon className="w-6 h-6 text-white" />}
                </div>
                <h3 className="text-lg font-bold text-secondary mb-2">
                  {locale === "fr" ? item.titleFr : item.titleEn}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {locale === "fr" ? item.descFr : item.descEn}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
