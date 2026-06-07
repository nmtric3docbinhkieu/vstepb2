import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { AUTH_COOKIE_NAME } from "@/constants/auth";
import { verifyAuthToken } from "@/lib/auth";
import { toPublicQuestions } from "@/services/listening/evaluate-listening";
import { LISTENING_MODULE } from "@/services/listening/listening-module";
import type { ApiErrorResponse, ApiSuccessResponse } from "@/types/auth";
import type { ListeningQuestionPublic } from "@/types/listening";

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

  const questions: ListeningQuestionPublic[] = toPublicQuestions(LISTENING_MODULE.questions);

  const response: ApiSuccessResponse<{
    moduleId: string;
    title: string;
    level: string;
    audioUrl: string;
    transcriptPreview: string;
    questions: ListeningQuestionPublic[];
  }> = {
    success: true,
    message: "Listening module loaded",
    data: {
      moduleId: LISTENING_MODULE.id,
      title: LISTENING_MODULE.title,
      level: LISTENING_MODULE.level,
      audioUrl: LISTENING_MODULE.audioUrl,
      transcriptPreview: LISTENING_MODULE.transcriptPreview,
      questions,
    },
  };

  return NextResponse.json(response, { status: 200 });
}
