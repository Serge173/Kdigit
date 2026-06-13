"use client";

import { useTranslations, useLocale } from "next-intl";
import { PageHero } from "@/components/ui/PageHero";
import { Methodology } from "@/components/sections/Methodology";
import { TEAM } from "@/lib/constants";
import { Lightbulb, Target, Heart, Award } from "lucide-react";

export function AboutContent() {
  const t = useTranslations("about");
  const locale = useLocale();

  const values = [
    { icon: Lightbulb, title: t("values.innovation"), desc: t("values.innovationDesc") },
    { icon: Award, title: t("values.excellence"), desc: t("values.excellenceDesc") },
    { icon: Heart, title: t("values.trust"), desc: t("values.trustDesc") },
    { icon: Target, title: t("values.commitment"), desc: t("values.commitmentDesc") },
  ];

  return (
    <>
      <PageHero title={t("title")} subtitle={t("subtitle")} />

      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {[
              { title: t("history.title"), content: t("history.content") },
              { title: t("vision.title"), content: t("vision.content") },
              { title: t("mission.title"), content: t("mission.content") },
            ].map((block, i) => (
              <div key={i} className="p-8 rounded-2xl bg-muted">
                <h2 className="text-xl font-bold text-secondary mb-4">{block.title}</h2>
                <p className="text-muted-foreground leading-relaxed">{block.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-secondary mb-12">{t("values.title")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <div key={i} className="text-center p-6">
                <div className="w-14 h-14 mx-auto rounded-2xl gradient-bg flex items-center justify-center mb-4">
                  <v.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-secondary mb-2">{v.title}</h3>
                <p className="text-muted-foreground text-sm">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Methodology />

      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary">{t("team.title")}</h2>
            <p className="mt-2 text-muted-foreground">{t("team.subtitle")}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TEAM.map((member, i) => (
              <div key={i} className="text-center p-8 rounded-2xl border border-border card-hover">
                <div className="w-20 h-20 mx-auto rounded-full gradient-bg flex items-center justify-center text-white text-2xl font-bold mb-4">
                  {member.name.charAt(0)}
                </div>
                <h3 className="font-bold text-secondary text-lg">{member.name}</h3>
                <p className="text-primary text-sm font-medium mb-3">
                  {locale === "fr" ? member.roleFr : member.roleEn}
                </p>
                <p className="text-muted-foreground text-sm">
                  {locale === "fr" ? member.bioFr : member.bioEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
