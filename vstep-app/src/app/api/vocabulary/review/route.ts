import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { AUTH_COOKIE_NAME } from "@/constants/auth";
import { verifyAuthToken } from "@/lib/auth";
import { vocabularyReviewSchema } from "@/schemas/vocabulary";
import {
  getAllVocabularyProgress,
  getVocabularyReviewQueue,
  submitVocabularyReview,
} from "@/services/vocabulary/progress-store";
import type { ApiErrorResponse, ApiSuccessResponse } from "@/types/auth";
import type { VocabularyProgress, VocabularyReviewItem } from "@/types/vocabulary";

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

  const queue = getVocabularyReviewQueue(userId);
  const allItems = getAllVocabularyProgress(userId);

  const response: ApiSuccessResponse<{ queue: VocabularyReviewItem[]; allItems: VocabularyReviewItem[] }> = {
    success: true,
    message: "Vocabulary review data loaded",
    data: {
      queue,
      allItems,
    },
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
    const parsed = vocabularyReviewSchema.safeParse(body);

    if (!parsed.success) {
      const invalidInput: ApiErrorResponse = {
        success: false,
        message: "Validation failed",
        error: "INVALID_INPUT",
      };

      return NextResponse.json(invalidInput, { status: 400 });
    }

    const updated = submitVocabularyReview({
      userId,
      wordId: parsed.data.wordId,
      quality: parsed.data.quality,
    });

    if (!updated) {
      const notFound: ApiErrorResponse = {
        success: false,
        message: "Word progress not found",
        error: "NOT_FOUND",
      };

      return NextResponse.json(notFound, { status: 404 });
    }

    const response: ApiSuccessResponse<{ progress: VocabularyProgress }> = {
      success: true,
      message: "Vocabulary progress updated",
      data: {
        progress: updated,
      },
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Vocabulary review error:", error);

    const failure: ApiErrorResponse = {
      success: false,
      message: "Internal server error",
      error: "INTERNAL_SERVER_ERROR",
    };

    return NextResponse.json(failure, { status: 500 });
  }
}
