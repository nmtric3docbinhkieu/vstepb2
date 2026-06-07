import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { AUTH_COOKIE_NAME } from "@/constants/auth";
import { verifyAuthToken } from "@/lib/auth";
import { writingEvaluationSchema } from "@/schemas/writing";
import { evaluateWriting } from "@/services/writing/evaluate-writing";
import {
  addWritingSubmission,
  listWritingSubmissions,
} from "@/services/writing/submission-store";
import type { ApiErrorResponse, ApiSuccessResponse } from "@/types/auth";
import type { WritingSubmission } from "@/types/writing";

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

  const submissions = listWritingSubmissions(userId);

  const response: ApiSuccessResponse<{ submissions: WritingSubmission[] }> = {
    success: true,
    message: "Submission history loaded",
    data: { submissions },
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
    const parsed = writingEvaluationSchema.safeParse(body);

    if (!parsed.success) {
      const invalidInput: ApiErrorResponse = {
        success: false,
        message: "Validation failed",
        error: "INVALID_INPUT",
      };

      return NextResponse.json(invalidInput, { status: 400 });
    }

    const result = await evaluateWriting(parsed.data);
    const submission = addWritingSubmission({
      userId,
      prompt: parsed.data.prompt,
      essayText: parsed.data.essayText,
      result,
    });

    const response: ApiSuccessResponse<{ submission: WritingSubmission }> = {
      success: true,
      message: "Writing evaluated successfully",
      data: { submission },
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Writing evaluate API error:", error);

    const failure: ApiErrorResponse = {
      success: false,
      message: "Internal server error",
      error: "INTERNAL_SERVER_ERROR",
    };

    return NextResponse.json(failure, { status: 500 });
  }
}
