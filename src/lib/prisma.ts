import { PrismaClient } from "@prisma/client";
import { ensureDatabaseUrl } from "@/lib/database-url";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function createPrismaClient(): PrismaClient {
  const databaseUrl = ensureDatabaseUrl();
  return new PrismaClient({
    ...(databaseUrl ? { datasources: { db: { url: databaseUrl } } } : {}),
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();
globalForPrisma.prisma = prisma;

export async function checkDatabaseHealth(): Promise<{
  connected: boolean;
  tablesReady: boolean;
  error?: string;
}> {
  const url = ensureDatabaseUrl();
  if (!url) {
    return { connected: false, tablesReady: false, error: "no_database_url" };
  }

  try {
    await prisma.$queryRaw`SELECT 1`;
    await prisma.quoteRequest.count();
    return { connected: true, tablesReady: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    const connected = !message.includes("Can't reach database") && !message.includes("P1001");
    const tablesReady =
      connected &&
      !message.includes("does not exist") &&
      !message.includes("P2021") &&
      !message.includes("P2022");

    return {
      connected,
      tablesReady,
      error: message.slice(0, 200),
    };
  }
}
