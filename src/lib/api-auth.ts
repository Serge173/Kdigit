import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import type { UserRole } from "@prisma/client";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "kdigit-dev-secret-change-in-production"
);

export interface ApiSession {
  userId: string;
  email: string;
  name: string;
  role: UserRole;
}

export async function getApiSession(request: NextRequest): Promise<ApiSession | null> {
  const token = request.cookies.get("kdigit-admin-session")?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as unknown as ApiSession;
  } catch {
    return null;
  }
}

export async function requireApiSession(
  request: NextRequest,
  minRole: UserRole = "EDITOR"
): Promise<ApiSession | NextResponse> {
  const session = await getApiSession(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const hierarchy: Record<UserRole, number> = {
    VIEWER: 1,
    EDITOR: 2,
    ADMIN: 3,
  };

  if (hierarchy[session.role] < hierarchy[minRole]) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  return session;
}

export function isErrorResponse(value: unknown): value is NextResponse {
  return value instanceof NextResponse;
}
