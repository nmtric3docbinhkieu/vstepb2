import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { AUTH_COOKIE_NAME } from "@/constants/auth";
import { verifyAuthToken } from "@/lib/auth";
import { toPublicQuestions } from "@/services/reading/evaluate-reading";
import { READING_MODULE } from "@/services/reading/reading-module";
import type { ApiErrorResponse, ApiSuccessResponse } from "@/types/auth";
import type { ReadingQuestionPublic } from "@/types/reading";

async function isAuthorized(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;

  if (!token) {
    return false;
  }

  return Boolean(await verifyAuthToken(token));
}

export async function GET() {
  const authorized = await isAuthorized();

  if (!authorized) {
    const unauthorized: ApiErrorResponse = {
      success: false,
      message: "Unauthorized",
      error: "UNAUTHORIZED",
    };

    return NextResponse.json(unauthorized, { status: 401 });
  }

  const questions: ReadingQuestionPublic[] = toPublicQuestions(READING_MODULE.questions);

  const response: ApiSuccessResponse<{
    moduleId: string;
    title: string;
    level: string;
    passage: string;
    questions: ReadingQuestionPublic[];
  }> = {
    success: true,
    message: "Reading module loaded",
    data: {
      moduleId: READING_MODULE.id,
      title: READING_MODULE.title,
      level: READING_MODULE.level,
      passage: READING_MODULE.passage,
      questions,
    },
  };

  return NextResponse.json(response, { status: 200 });
}
