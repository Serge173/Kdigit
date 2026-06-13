#!/usr/bin/env node
/**
 * Génère le fichier vercel-env.txt avec les variables à importer dans Vercel.
 * Usage: node scripts/generate-vercel-env.js
 */

const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const jwtSecret = crypto.randomBytes(32).toString("hex");

const vars = {
  DATABASE_URL: "postgresql://USER:PASSWORD@HOST/kdigit?sslmode=require",
  JWT_SECRET: jwtSecret,
  SMTP_HOST: "smtp.gmail.com",
  SMTP_PORT: "587",
  SMTP_USER: "contact@kdigit.com",
  SMTP_PASS: "VOTRE_MOT_DE_PASSE_SMTP",
  SMTP_FROM: "KDIGIT <contact@kdigit.com>",
  ADMIN_EMAIL: "admin@kdigit.com",
  NEXT_PUBLIC_SITE_URL: "https://kdigit.com",
  NEXT_PUBLIC_WHATSAPP_NUMBER: "33600000000",
  CONTACT_RATE_LIMIT_PER_HOUR: "10",
  NODE_ENV: "production",
};

const content = [
  "# KDIGIT — Variables Vercel (Production)",
  "# Importer via: Vercel Dashboard → Settings → Environment Variables",
  "# Ou CLI: vercel env pull",
  "",
  ...Object.entries(vars).map(([k, v]) => `${k}=${v}`),
  "",
  `# JWT_SECRET généré le ${new Date().toISOString()}`,
].join("\n");

const outPath = path.join(__dirname, "..", "vercel-env.txt");
fs.writeFileSync(outPath, content);

console.log("✅ vercel-env.txt généré");
console.log(`   JWT_SECRET: ${jwtSecret}`);
console.log("   Importez les variables dans Vercel Dashboard");
