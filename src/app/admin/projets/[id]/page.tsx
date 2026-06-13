import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProjectForm } from "@/components/admin/ProjectForm";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let project;
  try {
    project = await prisma.project.findUnique({ where: { id } });
  } catch {
    notFound();
  }

  if (!project) notFound();

  return (
    <ProjectForm
      projectId={id}
      initial={{
        clientName: project.clientName,
        titleFr: project.titleFr,
        titleEn: project.titleEn,
        slug: project.slug,
        descriptionFr: project.descriptionFr,
        descriptionEn: project.descriptionEn,
        technologies: project.technologies.join(", "),
        resultsFr: project.resultsFr,
        resultsEn: project.resultsEn,
        coverImage: project.coverImage,
        screenshots: project.screenshots.join("\n"),
        featured: project.featured,
        published: project.published,
        order: project.order,
      }}
    />
  );
}
