import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ArticleForm } from "@/components/admin/ArticleForm";

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let article;
  try {
    article = await prisma.blogPost.findUnique({ where: { id } });
  } catch {
    notFound();
  }

  if (!article) notFound();

  return (
    <ArticleForm
      articleId={id}
      initial={{
        titleFr: article.titleFr,
        titleEn: article.titleEn,
        slug: article.slug,
        excerptFr: article.excerptFr,
        excerptEn: article.excerptEn,
        contentFr: article.contentFr,
        contentEn: article.contentEn,
        coverImage: article.coverImage || "",
        category: article.category,
        tags: article.tags.join(", "),
        published: article.published,
        authorName: article.authorName,
      }}
    />
  );
}
