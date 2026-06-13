"use client";

import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { Star, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/lib/constants";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function Testimonials() {
  const t = useTranslations("testimonials");
  const locale = useLocale();

  return (
    <section className="py-20 lg:py-28 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title={t("title")} subtitle={t("subtitle")} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-2xl bg-white border border-border card-hover relative"
            >
              <Quote className="w-10 h-10 text-primary/20 absolute top-6 right-6" />
              <div className="flex gap-1 mb-4">
                {Array.from({ length: item.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-secondary/80 text-sm leading-relaxed mb-6">
                &ldquo;{locale === "fr" ? item.contentFr : item.contentEn}&rdquo;
              </p>
              <div>
                <div className="font-bold text-secondary">{item.name}</div>
                <div className="text-muted-foreground text-sm">
                  {locale === "fr" ? item.roleFr : item.roleEn}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
