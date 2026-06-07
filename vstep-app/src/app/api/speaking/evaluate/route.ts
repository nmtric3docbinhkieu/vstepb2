import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { AUTH_COOKIE_NAME } from "@/constants/auth";
import { verifyAuthToken } from "@/lib/auth";
import { speakingEvaluateSchema } from "@/schemas/speaking-evaluate";
import { evaluateSpeaking } from "@/services/speaking/evaluate-speaking";
import {
  findSpeakingRecordingById,
  updateSpeakingRecordingEvaluation,
} from "@/services/speaking/recording-store";
import type { ApiErrorResponse, ApiSuccessResponse } from "@/types/auth";
import type { SpeakingRecordingItem } from "@/types/speaking";

async function getUserId(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  const payload = await verifyAuthToken(token);
  return payload?.sub ?? null;
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
    const parsed = speakingEvaluateSchema.safeParse(body);

    if (!parsed.success) {
      const invalidInput: ApiErrorResponse = {
        success: false,
        message: "Validation failed",
        error: "INVALID_INPUT",
      };

      return NextResponse.json(invalidInput, { status: 400 });
    }

    const recording = findSpeakingRecordingById(userId, parsed.data.recordingId);

    if (!recording) {
      const notFound: ApiErrorResponse = {
        success: false,
        message: "Recording not found",
        error: "NOT_FOUND",
      };

      return NextResponse.json(notFound, { status: 404 });
    }

    if (!recording.transcript) {
      const noTranscript: ApiErrorResponse = {
        success: false,
        message: "Transcript required before evaluation",
        error: "TRANSCRIPT_REQUIRED",
      };

      return NextResponse.json(noTranscript, { status: 400 });
    }

    const evaluated = await evaluateSpeaking({
      question: recording.question,
      transcript: recording.transcript,
      durationSeconds: recording.durationSeconds,
    });

    const updated = updateSpeakingRecordingEvaluation({
      userId,
      recordingId: recording.id,
      evaluation: evaluated.result,
      evaluationProvider: evaluated.provider,
    });

    if (!updated) {
      const updateFailed: ApiErrorResponse = {
        success: false,
        message: "Evaluation store update failed",
        error: "UPDATE_FAILED",
      };

      return NextResponse.json(updateFailed, { status: 500 });
    }

    const response: ApiSuccessResponse<{ recording: SpeakingRecordingItem }> = {
      success: true,
      message: "Speaking evaluation completed",
      data: { recording: updated },
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Speaking evaluate error:", error);

    const failure: ApiErrorResponse = {
      success: false,
      message: "Internal server error",
      error: "INTERNAL_SERVER_ERROR",
    };

    return NextResponse.json(failure, { status: 500 });
  }
}
