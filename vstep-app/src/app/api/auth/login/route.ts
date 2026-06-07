import { NextResponse } from "next/server";

import { AUTH_COOKIE_NAME, AUTH_TOKEN_TTL_SECONDS } from "@/constants/auth";
import { signAuthToken } from "@/lib/auth";
import { getSingleUserConfig } from "@/lib/single-user";
import { loginSchema } from "@/schemas/auth";
import type { ApiErrorResponse, ApiSuccessResponse } from "@/types/auth";

type LoginSuccessData = {
  email: string;
  fullName: string;
};

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const parsed = loginSchema.safeParse(json);

    if (!parsed.success) {
      const response: ApiErrorResponse = {
        success: false,
        message: "Validation failed",
        error: "INVALID_INPUT",
      };

      return NextResponse.json(response, { status: 400 });
    }

    const user = getSingleUserConfig();
    const isMatch =
      parsed.data.email.toLowerCase() === user.email.toLowerCase() &&
      parsed.data.password === user.password;

    if (!isMatch) {
      const response: ApiErrorResponse = {
        success: false,
        message: "Email or password is incorrect",
        error: "INVALID_CREDENTIALS",
      };

      return NextResponse.json(response, { status: 401 });
    }

    const token = await signAuthToken({
      sub: "single-user",
      email: user.email,
      fullName: user.fullName,
    });

    const response: ApiSuccessResponse<LoginSuccessData> = {
      success: true,
      message: "Login successful",
      data: {
        email: user.email,
        fullName: user.fullName,
      },
    };

    const nextResponse = NextResponse.json(response, { status: 200 });

    nextResponse.cookies.set(AUTH_COOKIE_NAME, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: AUTH_TOKEN_TTL_SECONDS,
      path: "/",
    });

    return nextResponse;
  } catch (error) {
    console.error("Login error:", error);

    const response: ApiErrorResponse = {
      success: false,
      message: "Internal server error",
      error: "INTERNAL_SERVER_ERROR",
    };

    return NextResponse.json(response, { status: 500 });
  }
}
