/** Résout DATABASE_URL au démarrage Next.js (build + runtime). */
export async function register() {
  if (!process.env.DATABASE_URL) {
    process.env.DATABASE_URL =
      process.env.DATABASE_POSTGRES_PRISMA_URL ||
      process.env.DATABASE_POSTGRES_URL;
  }
}
