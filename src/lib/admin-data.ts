import { prisma } from "@/lib/prisma";
import { ensureDatabaseUrl } from "@/lib/database-url";

export async function adminQuery<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  if (!ensureDatabaseUrl()) return fallback;
  try {
    return await fn();
  } catch (error) {
    console.error("[admin] Database query failed:", error);
    return fallback;
  }
}

export async function getAdminQuotes() {
  return adminQuery(
    () => prisma.quoteRequest.findMany({ orderBy: { createdAt: "desc" } }),
    []
  );
}

export async function getAdminArticles() {
  return adminQuery(
    () => prisma.blogPost.findMany({ orderBy: { createdAt: "desc" } }),
    []
  );
}

export async function getAdminProjects() {
  return adminQuery(
    () => prisma.project.findMany({ orderBy: { order: "asc" } }),
    []
  );
}

export async function getAdminMessages() {
  return adminQuery(
    () => prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" } }),
    []
  );
}

export async function getAdminUsers() {
  return adminQuery(
    () => prisma.user.findMany({ orderBy: { createdAt: "desc" } }),
    []
  );
}

export async function getAdminHeroSlides() {
  return adminQuery(
    () => prisma.heroSlide.findMany({ orderBy: { order: "asc" } }),
    []
  );
}

export async function getDashboardData() {
  if (!ensureDatabaseUrl()) {
    return {
      projects: 0,
      posts: 0,
      messagesNew: 0,
      quotesNew: 0,
      quotesTotal: 0,
      quotes: [] as Awaited<ReturnType<typeof prisma.quoteRequest.findMany>>,
    };
  }

  try {
    const [projects, posts, messagesNew, quotesNew, quotesTotal, quotes] = await Promise.all([
      prisma.project.count(),
      prisma.blogPost.count({ where: { published: true } }),
      prisma.contactMessage.count({ where: { status: "NEW" } }),
      prisma.quoteRequest.count({ where: { status: "NEW" } }),
      prisma.quoteRequest.count(),
      prisma.quoteRequest.findMany({ orderBy: { createdAt: "desc" } }),
    ]);
    return { projects, posts, messagesNew, quotesNew, quotesTotal, quotes };
  } catch (error) {
    console.error("[admin] Dashboard query failed:", error);
    return {
      projects: 0,
      posts: 0,
      messagesNew: 0,
      quotesNew: 0,
      quotesTotal: 0,
      quotes: [] as Awaited<ReturnType<typeof prisma.quoteRequest.findMany>>,
    };
  }
}
