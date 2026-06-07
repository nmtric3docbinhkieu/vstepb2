import { NextResponse } from "next/server";

import { AUTH_COOKIE_NAME } from "@/constants/auth";
import type { ApiSuccessResponse } from "@/types/auth";

export async function POST() {
  const response: ApiSuccessResponse<null> = {
    success: true,
    message: "Logout successful",
    data: null,
  };

  const nextResponse = NextResponse.json(response, { status: 200 });

  nextResponse.cookies.set(AUTH_COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    expires: new Date(0),
    path: "/",
  });

  return nextResponse;
}
