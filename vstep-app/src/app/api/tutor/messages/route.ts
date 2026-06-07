import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { AUTH_COOKIE_NAME } from "@/constants/auth";
import { verifyAuthToken } from "@/lib/auth";
import { tutorMessageSchema } from "@/schemas/tutor";
import { generateTutorReply } from "@/services/ai/tutor-chat";
import {
  appendConversationMessage,
  clearConversationHistory,
  getConversationHistory,
} from "@/services/tutor/conversation-store";
import type { ApiErrorResponse, ApiSuccessResponse } from "@/types/auth";
import type { TutorChatResponseData, TutorMessage } from "@/types/tutor";

async function getAuthenticatedUserId(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  const payload = await verifyAuthToken(token);
  return payload?.sub ?? null;
}

export async function GET() {
  const userId = await getAuthenticatedUserId();

  if (!userId) {
    const response: ApiErrorResponse = {
      success: false,
      message: "Unauthorized",
      error: "UNAUTHORIZED",
    };

    return NextResponse.json(response, { status: 401 });
  }

  const history = getConversationHistory(userId);

  const response: ApiSuccessResponse<{ history: TutorMessage[] }> = {
    success: true,
    message: "Conversation history loaded",
    data: {
      history,
    },
  };

  return NextResponse.json(response, { status: 200 });
}

export async function POST(request: Request) {
  const userId = await getAuthenticatedUserId();

  if (!userId) {
    const response: ApiErrorResponse = {
      success: false,
      message: "Unauthorized",
      error: "UNAUTHORIZED",
    };

    return NextResponse.json(response, { status: 401 });
  }

  try {
    const body = await request.json();

    if (body?.clearHistory === true) {
      clearConversationHistory(userId);

      const clearedResponse: ApiSuccessResponse<{ history: TutorMessage[] }> = {
        success: true,
        message: "Conversation cleared",
        data: { history: [] },
      };

      return NextResponse.json(clearedResponse, { status: 200 });
    }

    const parsed = tutorMessageSchema.safeParse(body);

    if (!parsed.success) {
      const response: ApiErrorResponse = {
        success: false,
        message: "Validation failed",
        error: "INVALID_INPUT",
      };

      return NextResponse.json(response, { status: 400 });
    }

    appendConversationMessage(userId, "user", parsed.data.message);

    const history = getConversationHistory(userId);
    const aiReplyText = await generateTutorReply({
      history,
      userMessage: parsed.data.message,
    });
    const reply = appendConversationMessage(userId, "assistant", aiReplyText);

    const response: ApiSuccessResponse<TutorChatResponseData> = {
      success: true,
      message: "Tutor replied successfully",
      data: {
        reply,
        history: getConversationHistory(userId),
      },
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Tutor chat error:", error);

    const response: ApiErrorResponse = {
      success: false,
      message: "Internal server error",
      error: "INTERNAL_SERVER_ERROR",
    };

    return NextResponse.json(response, { status: 500 });
  }
}
