#!/usr/bin/env node
/**
 * Build Vercel : synchronise le schéma Prisma + seed, puis build Next.js.
 * Utilise DATABASE_POSTGRES_URL_NON_POOLING (Neon via Vercel Storage).
 */
const { execSync } = require("child_process");

function run(cmd) {
  console.log(`\n> ${cmd}`);
  execSync(cmd, { stdio: "inherit", env: process.env });
}

const directUrl =
  process.env.DATABASE_POSTGRES_URL_NON_POOLING ||
  process.env.DATABASE_URL_NON_POOLING ||
  process.env.DIRECT_URL ||
  process.env.DATABASE_URL;

if (directUrl) {
  process.env.DATABASE_URL = directUrl;
  try {
    run("npx prisma db push");
    run("npm run db:seed");
  } catch (err) {
    console.error("[vercel-build] Database setup failed:", err.message);
    process.exit(1);
  }
} else {
  console.warn("[vercel-build] No DATABASE_URL — skipping db push/seed");
}

run("npx prisma generate");
run("npx next build");
