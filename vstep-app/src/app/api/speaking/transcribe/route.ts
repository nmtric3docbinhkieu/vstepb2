import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { AUTH_COOKIE_NAME } from "@/constants/auth";
import { verifyAuthToken } from "@/lib/auth";
import { speakingTranscribeSchema } from "@/schemas/speaking-transcribe";
import {
  findSpeakingRecordingById,
  updateSpeakingRecordingTranscript,
} from "@/services/speaking/recording-store";
import { transcribeRecordingAudio } from "@/services/speaking/transcribe-audio";
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
    const parsed = speakingTranscribeSchema.safeParse(body);

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

    const transcriptionResult = await transcribeRecordingAudio(recording);

    const updated = updateSpeakingRecordingTranscript({
      userId,
      recordingId: recording.id,
      transcript: transcriptionResult.transcript,
      transcriptProvider: transcriptionResult.provider,
    });

    if (!updated) {
      const updateFailed: ApiErrorResponse = {
        success: false,
        message: "Transcript store update failed",
        error: "UPDATE_FAILED",
      };

      return NextResponse.json(updateFailed, { status: 500 });
    }

    const response: ApiSuccessResponse<{ recording: SpeakingRecordingItem }> = {
      success: true,
      message: "Transcript generated",
      data: { recording: updated },
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Speaking transcribe error:", error);

    const failure: ApiErrorResponse = {
      success: false,
      message: "Internal server error",
      error: "INTERNAL_SERVER_ERROR",
    };

    return NextResponse.json(failure, { status: 500 });
  }
}
