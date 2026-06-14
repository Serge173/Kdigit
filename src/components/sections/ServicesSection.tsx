"use client";

import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import * as Icons from "lucide-react";
import { ArrowRight } from "lucide-react";
import { SERVICE_CATEGORIES } from "@/lib/data/services";
import { SectionHeader } from "@/components/ui/SectionHeader";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 48, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 120, damping: 18 },
  },
};

export function ServicesSection() {
  const t = useTranslations("services");
  const locale = useLocale();

  return (
    <section className="py-20 lg:py-28 bg-muted overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title={t("title")} subtitle={t("subtitle")} />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {SERVICE_CATEGORIES.map((cat) => {
            const Icon = Icons[cat.icon as keyof typeof Icons] as React.ComponentType<{
              className?: string;
            }>;

            return (
              <motion.div key={cat.slug} variants={cardVariants} className="h-full">
                <Link href={`/services/${cat.slug}`} className="block h-full group">
                  <motion.article
                    className="service-card relative h-full p-8 rounded-2xl bg-white border border-border overflow-hidden"
                    whileHover={{ y: -10, scale: 1.02 }}
                    transition={{ type: "spring" as const, stiffness: 300, damping: 22 }}
                  >
                    <div className="service-card-shine pointer-events-none" aria-hidden />

                    <motion.div
                      className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 relative z-10"
                      whileHover={{ rotate: [0, -8, 8, 0], scale: 1.08 }}
                      transition={{ duration: 0.5 }}
                    >
                      {Icon && <Icon className="w-7 h-7 text-primary" />}
                    </motion.div>

                    <h3 className="text-xl font-bold text-secondary mb-3 relative z-10 group-hover:text-primary transition-colors duration-300">
                      {locale === "fr" ? cat.titleFr : cat.titleEn}
                    </h3>

                    <p className="text-muted-foreground text-sm leading-relaxed mb-5 relative z-10">
                      {locale === "fr" ? cat.descFr : cat.descEn}
                    </p>

                    <span className="inline-flex items-center gap-1 text-primary text-sm font-semibold relative z-10">
                      {t("learnMore")}
                      <motion.span
                        className="inline-flex"
                        initial={{ x: 0 }}
                        whileHover={{ x: 6 }}
                        transition={{ type: "spring" as const, stiffness: 400, damping: 20 }}
                      >
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </motion.span>
                    </span>
                  </motion.article>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-colors"
          >
            {t("viewAll")} <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
