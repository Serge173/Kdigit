import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ProjectDetailContent } from "@/components/pages/ProjectDetailContent";
import { getProjectBySlug } from "@/lib/data/projects";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  return <ProjectDetailContent project={project} />;
}
