import { z } from "zod";
import { getDatabaseUrl } from "@/lib/database-url";

const envSchema = z.object({
  DATABASE_URL: z.string().min(1).optional(),
  JWT_SECRET: z.string().min(16).default("kdigit-dev-secret-change-in-production"),
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.coerce.number().default(587),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  SMTP_FROM: z.string().optional(),
  ADMIN_EMAIL: z.string().email().optional(),
  NEXT_PUBLIC_SITE_URL: z
    .string()
    .optional()
    .transform((v) => {
      if (!v) return "http://localhost:3000";
      const match = v.match(/https?:\/\/[^\s\]"']+/i);
      if (match) {
        try {
          return new URL(match[0]).origin;
        } catch {
          return "http://localhost:3000";
        }
      }
      try {
        return new URL(v).origin;
      } catch {
        return "http://localhost:3000";
      }
    }),
  NEXT_PUBLIC_WHATSAPP_NUMBER: z.string().default("2250708967624"),
  CONTACT_RATE_LIMIT_PER_HOUR: z.coerce.number().default(10),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
});

export type Env = z.infer<typeof envSchema>;

function loadEnv(): Env {
  const parsed = envSchema.safeParse(process.env);
  if (!parsed.success) {
    console.warn("[env] Validation warnings:", parsed.error.flatten().fieldErrors);
    return envSchema.parse({
      ...process.env,
      JWT_SECRET: process.env.JWT_SECRET || "kdigit-dev-secret-change-in-production",
    });
  }
  return parsed.data;
}

export const env = loadEnv();

export const isProduction = env.NODE_ENV === "production";
export const isDatabaseConfigured = !!getDatabaseUrl();
