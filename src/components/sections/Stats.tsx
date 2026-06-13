"use client";

import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { STATS } from "@/lib/constants";

export function Stats() {
  const t = useTranslations("stats");
  const locale = useLocale();

  return (
    <section className="py-16 lg:py-20 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-white/60 text-sm font-medium uppercase tracking-wider mb-10">
          {t("title")}
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                {stat.value}
              </div>
              <div className="text-white/60 text-sm">
                {locale === "fr" ? stat.labelFr : stat.labelEn}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
