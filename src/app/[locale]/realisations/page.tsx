import { setRequestLocale } from "next-intl/server";
import { PortfolioContent } from "@/components/pages/PortfolioContent";
import { getAllProjects } from "@/lib/data/projects";

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const projects = await getAllProjects();
  return <PortfolioContent projects={projects} />;
}
