import { NextResponse } from "next/server";
import { getDatabaseUrl } from "@/lib/database-url";
import { checkDatabaseHealth } from "@/lib/prisma";

export const dynamic = "force-dynamic";

/** Diagnostic (sans secrets) pour vérifier la config et la connexion BDD. */
export async function GET() {
  const health = await checkDatabaseHealth();
  const isProd = process.env.NODE_ENV === "production";

  const payload: Record<string, unknown> = {
    ok: health.connected && health.tablesReady,
    databaseConfigured: !!getDatabaseUrl(),
    databaseConnected: health.connected,
    tablesReady: health.tablesReady,
  };

  if (!isProd) {
    payload.env = {
      DATABASE_URL: !!process.env.DATABASE_URL,
      DATABASE_POSTGRES_PRISMA_URL: !!process.env.DATABASE_POSTGRES_PRISMA_URL,
      DATABASE_POSTGRES_URL: !!process.env.DATABASE_POSTGRES_URL,
      JWT_SECRET: !!process.env.JWT_SECRET,
    };
    if (health.error) payload.error = health.error;
  }

  return NextResponse.json(payload, { status: payload.ok ? 200 : 503 });
}
