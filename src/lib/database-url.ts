/** Résout l'URL PostgreSQL (Neon Vercel Storage utilise le préfixe DATABASE_). */
export function getDatabaseUrl(): string | undefined {
  return (
    process.env.DATABASE_URL ||
    process.env.DATABASE_POSTGRES_PRISMA_URL ||
    process.env.DATABASE_POSTGRES_URL
  );
}

/** URL directe pour migrations / db push (sans pooler). */
export function getDirectDatabaseUrl(): string | undefined {
  return (
    process.env.DATABASE_POSTGRES_URL_NON_POOLING ||
    process.env.DATABASE_URL_NON_POOLING ||
    process.env.DIRECT_URL ||
    getDatabaseUrl()
  );
}

/** Aligne DATABASE_URL pour Prisma et les checks runtime. */
export function ensureDatabaseUrl(): string | undefined {
  const url = getDatabaseUrl();
  if (url) process.env.DATABASE_URL = url;
  return url;
}
