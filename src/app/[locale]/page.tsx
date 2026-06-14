import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { WhyChoose } from "@/components/sections/WhyChoose";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { Testimonials } from "@/components/sections/Testimonials";
import { Methodology } from "@/components/sections/Methodology";
import { CTASection } from "@/components/sections/CTASection";
import { QuickContactSection } from "@/components/sections/QuickContactSection";
import { getFeaturedProjects } from "@/lib/data/projects";
import { getHeroSlides } from "@/lib/data/hero-slides";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [projects, heroSlides] = await Promise.all([
    getFeaturedProjects(),
    getHeroSlides(),
  ]);

  return (
    <>
      <Hero slides={heroSlides} />
      <Stats />
      <WhyChoose />
      <ServicesSection />
      <PortfolioSection projects={projects} />
      <Testimonials />
      <Methodology />
      <QuickContactSection locale={locale} />
      <CTASection />
    </>
  );
}
