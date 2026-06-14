/** URL runtime Prisma — préfère la connexion Neon optimisée pour Prisma. */
export function getDatabaseUrl(): string | undefined {
  const url =
    process.env.DATABASE_POSTGRES_PRISMA_URL ||
    process.env.DATABASE_POSTGRES_URL ||
    process.env.DATABASE_URL;

  if (!url) return undefined;

  try {
    const parsed = new URL(url);
    if (!parsed.searchParams.has("connect_timeout")) {
      parsed.searchParams.set("connect_timeout", "15");
    }
    return parsed.toString();
  } catch {
    return url;
  }
}

/** URL directe pour migrations / db push (sans pooler). */
export function getDirectDatabaseUrl(): string | undefined {
  return (
    process.env.DATABASE_POSTGRES_URL_NON_POOLING ||
    process.env.DATABASE_URL_NON_POOLING ||
    process.env.DIRECT_URL ||
    process.env.DATABASE_URL ||
    process.env.DATABASE_POSTGRES_URL
  );
}

/** Aligne DATABASE_URL pour Prisma et les checks runtime. */
export function ensureDatabaseUrl(): string | undefined {
  const url = getDatabaseUrl();
  if (url) process.env.DATABASE_URL = url;
  return url;
}
