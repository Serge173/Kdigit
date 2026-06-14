import { NextResponse } from "next/server";
import { getDatabaseUrl } from "@/lib/database-url";

export const dynamic = "force-dynamic";

/** Diagnostic léger (sans secrets) pour vérifier la config BDD en production. */
export async function GET() {
  return NextResponse.json({
    databaseConfigured: !!getDatabaseUrl(),
    env: {
      DATABASE_URL: !!process.env.DATABASE_URL,
      DATABASE_POSTGRES_PRISMA_URL: !!process.env.DATABASE_POSTGRES_PRISMA_URL,
      DATABASE_POSTGRES_URL: !!process.env.DATABASE_POSTGRES_URL,
      JWT_SECRET: !!process.env.JWT_SECRET,
    },
  });
}
