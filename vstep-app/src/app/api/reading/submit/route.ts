import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { AUTH_COOKIE_NAME } from "@/constants/auth";
import { verifyAuthToken } from "@/lib/auth";
import { readingSubmitSchema } from "@/schemas/reading";
import { addReadingAttempt, listReadingAttempts } from "@/services/reading/attempt-store";
import { evaluateReadingAnswers } from "@/services/reading/evaluate-reading";
import { READING_MODULE } from "@/services/reading/reading-module";
import type { ApiErrorResponse, ApiSuccessResponse } from "@/types/auth";
import type { ReadingAttempt } from "@/types/reading";

async function getUserId(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  const payload = await verifyAuthToken(token);
  return payload?.sub ?? null;
}

export async function GET() {
  const userId = await getUserId();

  if (!userId) {
    const unauthorized: ApiErrorResponse = {
      success: false,
      message: "Unauthorized",
      error: "UNAUTHORIZED",
    };

    return NextResponse.json(unauthorized, { status: 401 });
  }

  const attempts = listReadingAttempts(userId);

  const response: ApiSuccessResponse<{ attempts: ReadingAttempt[] }> = {
    success: true,
    message: "Reading attempts loaded",
    data: { attempts },
  };

  return NextResponse.json(response, { status: 200 });
}

export async function POST(request: Request) {
  const userId = await getUserId();

  if (!userId) {
    const unauthorized: ApiErrorResponse = {
      success: false,
      message: "Unauthorized",
      error: "UNAUTHORIZED",
    };

    return NextResponse.json(unauthorized, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = readingSubmitSchema.safeParse(body);

    if (!parsed.success) {
      const invalidInput: ApiErrorResponse = {
        success: false,
        message: "Validation failed",
        error: "INVALID_INPUT",
      };

      return NextResponse.json(invalidInput, { status: 400 });
    }

    const evaluated = evaluateReadingAnswers({
      module: READING_MODULE,
      answers: parsed.data.answers,
    });

    const attempt = addReadingAttempt(userId, {
      moduleId: READING_MODULE.id,
      answers: parsed.data.answers,
      score: evaluated.score,
      total: evaluated.total,
      percent: evaluated.percent,
    });

    const response: ApiSuccessResponse<{
      attempt: ReadingAttempt;
      feedback: { incorrect: Array<{ questionId: string; explanation: string }> };
    }> = {
      success: true,
      message: "Reading submitted successfully",
      data: {
        attempt,
        feedback: {
          incorrect: evaluated.incorrect,
        },
      },
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Reading submit error:", error);

    const failure: ApiErrorResponse = {
      success: false,
      message: "Internal server error",
      error: "INTERNAL_SERVER_ERROR",
    };

    return NextResponse.json(failure, { status: 500 });
  }
}
