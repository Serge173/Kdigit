#!/usr/bin/env node
const { PrismaClient } = require("@prisma/client");

async function main() {
  const prisma = new PrismaClient();
  try {
    await prisma.$queryRaw`SELECT 1`;
    const count = await prisma.quoteRequest.count();
    console.log(`[verify-db] OK — QuoteRequest table ready (${count} rows)`);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((err) => {
  console.error("[verify-db] FAILED:", err.message);
  process.exit(1);
});
