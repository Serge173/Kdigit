"use client";

import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";

interface Project {
  id: string;
  slug: string;
  clientName: string;
  titleFr: string;
  titleEn: string;
  descriptionFr: string;
  descriptionEn: string;
  coverImage: string;
  technologies: string[];
}

interface PortfolioSectionProps {
  projects: Project[];
}

export function PortfolioSection({ projects }: PortfolioSectionProps) {
  const t = useTranslations("portfolio");
  const locale = useLocale();

  if (projects.length === 0) return null;

  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title={t("title")} subtitle={t("subtitle")} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                href={`/realisations/${project.slug}`}
                className="group block rounded-2xl overflow-hidden bg-white border border-border card-hover"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={project.coverImage}
                    alt={locale === "fr" ? project.titleFr : project.titleEn}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/60 to-transparent" />
                  <span className="absolute bottom-4 left-4 text-white text-sm font-medium bg-primary px-3 py-1 rounded-full">
                    {project.clientName}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-secondary mb-2 group-hover:text-primary transition-colors">
                    {locale === "fr" ? project.titleFr : project.titleEn}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                    {locale === "fr" ? project.descriptionFr : project.descriptionEn}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-2 py-1 rounded-md bg-accent/10 text-accent font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 text-primary text-sm font-semibold">
                    {t("viewProject")} <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            href="/realisations"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl gradient-bg text-white font-semibold hover:opacity-90 transition-opacity"
          >
            {t("viewAll")} <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
