"use client";

import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { METHODOLOGY } from "@/lib/constants";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function Methodology() {
  const t = useTranslations("methodology");
  const locale = useLocale();

  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title={t("title")} subtitle={t("subtitle")} />
        <div className="relative">
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2" />
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {METHODOLOGY.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center relative"
              >
                <div className="w-16 h-16 mx-auto rounded-2xl gradient-bg flex items-center justify-center text-white font-bold text-lg mb-4 relative z-10">
                  {step.step}
                </div>
                <h3 className="font-bold text-secondary mb-2">
                  {locale === "fr" ? step.titleFr : step.titleEn}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {locale === "fr" ? step.descFr : step.descEn}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
