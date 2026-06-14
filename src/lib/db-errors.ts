import { Prisma } from "@prisma/client";

export type DatabaseErrorKind = "schema" | "connection" | "unknown";

export function classifyDatabaseError(error: unknown): DatabaseErrorKind {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2021" || error.code === "P2022") return "schema";
    if (error.code === "P1001" || error.code === "P1002" || error.code === "P1017") {
      return "connection";
    }
  }

  const message = error instanceof Error ? error.message : String(error);
  if (
    message.includes("does not exist") ||
    message.includes("P2021") ||
    message.includes("P2022")
  ) {
    return "schema";
  }
  if (
    message.includes("Can't reach database") ||
    message.includes("P1001") ||
    message.includes("connection")
  ) {
    return "connection";
  }

  return "unknown";
}

export function databaseErrorResponse(kind: DatabaseErrorKind) {
  if (kind === "schema") {
    return {
      status: 503,
      body: { error: "Database schema not ready" },
    };
  }
  if (kind === "connection") {
    return {
      status: 503,
      body: { error: "Database unavailable" },
    };
  }
  return {
    status: 500,
    body: { error: "Server error" },
  };
}

/** Première IP client (x-forwarded-for peut contenir une liste). */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (!forwarded) return "unknown";
  return forwarded.split(",")[0]?.trim() || "unknown";
}
