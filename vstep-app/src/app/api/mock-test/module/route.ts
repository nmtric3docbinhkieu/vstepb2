import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { AUTH_COOKIE_NAME } from "@/constants/auth";
import { verifyAuthToken } from "@/lib/auth";
import { toPublicQuestions } from "@/services/mock-test/evaluate-mock-test";
import { MOCK_TEST_MODULE } from "@/services/mock-test/mock-module";
import type { ApiErrorResponse, ApiSuccessResponse } from "@/types/auth";
import type { MockQuestionPublic } from "@/types/mock-test";

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

  const readingQuestions: MockQuestionPublic[] = toPublicQuestions(MOCK_TEST_MODULE.readingQuestions);
  const listeningQuestions: MockQuestionPublic[] = toPublicQuestions(MOCK_TEST_MODULE.listeningQuestions);

  const response: ApiSuccessResponse<{
    moduleId: string;
    title: string;
    level: string;
    readingPassage: string;
    readingQuestions: MockQuestionPublic[];
    listeningAudioUrl: string;
    listeningContext: string;
    listeningQuestions: MockQuestionPublic[];
    writingPrompt: string;
    speakingPrompt: string;
  }> = {
    success: true,
    message: "Mock test module loaded",
    data: {
      moduleId: MOCK_TEST_MODULE.id,
      title: MOCK_TEST_MODULE.title,
      level: MOCK_TEST_MODULE.level,
      readingPassage: MOCK_TEST_MODULE.readingPassage,
      readingQuestions,
      listeningAudioUrl: MOCK_TEST_MODULE.listeningAudioUrl,
      listeningContext: MOCK_TEST_MODULE.listeningContext,
      listeningQuestions,
      writingPrompt: MOCK_TEST_MODULE.writingPrompt,
      speakingPrompt: MOCK_TEST_MODULE.speakingPrompt,
    },
  };

  return NextResponse.json(response, { status: 200 });
}
