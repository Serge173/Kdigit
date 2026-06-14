/** Résout DATABASE_URL au démarrage Next.js (build + runtime). */
export async function register() {
  const resolvedDbUrl =
    process.env.DATABASE_POSTGRES_PRISMA_URL ||
    process.env.DATABASE_POSTGRES_URL ||
    process.env.DATABASE_URL;
  if (resolvedDbUrl) {
    process.env.DATABASE_URL = resolvedDbUrl;
  }
}
