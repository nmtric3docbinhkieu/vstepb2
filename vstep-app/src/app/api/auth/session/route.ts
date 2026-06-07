import { NextResponse } from "next/server";

import { AUTH_COOKIE_NAME } from "@/constants/auth";
import { verifyAuthToken } from "@/lib/auth";
import type { ApiSuccessResponse } from "@/types/auth";

type SessionData = {
  authenticated: boolean;
  user: {
    email: string;
    fullName: string;
  } | null;
};

export async function GET(request: Request) {
  const cookieHeader = request.headers.get("cookie") ?? "";
  const token = cookieHeader
    .split(";")
    .map((item) => item.trim())
    .find((item) => item.startsWith(`${AUTH_COOKIE_NAME}=`))
    ?.slice(`${AUTH_COOKIE_NAME}=`.length);

  const payload = token ? await verifyAuthToken(token) : null;

  const response: ApiSuccessResponse<SessionData> = {
    success: true,
    message: "Session status",
    data: {
      authenticated: Boolean(payload),
      user: payload
        ? {
            email: payload.email,
            fullName: payload.fullName,
          }
        : null,
    },
  };

  return NextResponse.json(response, { status: 200 });
}
