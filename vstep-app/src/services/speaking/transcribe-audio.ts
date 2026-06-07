import { Buffer } from "node:buffer";

import type { SpeakingRecordingItem } from "@/types/speaking";

function extensionFromMimeType(mimeType: string): string {
  if (mimeType.includes("ogg")) return "ogg";
  if (mimeType.includes("mp4")) return "mp4";
  if (mimeType.includes("mpeg")) return "mp3";
  if (mimeType.includes("wav")) return "wav";
  return "webm";
}

function createFallbackTranscript(recording: SpeakingRecordingItem): string {
  return [
    "[Fallback transcript generated because Whisper is not configured.]",
    `Question: ${recording.question}`,
    "Candidate response summary:",
    "I would like to improve my communication skills because they are important for academic and professional development. By practicing every day, I can become more confident and express my ideas more clearly.",
    `Approximate speaking duration: ${recording.durationSeconds} seconds.`,
  ].join("\n\n");
}

async function transcribeWithWhisper(recording: SpeakingRecordingItem): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error("Missing OPENAI_API_KEY environment variable.");
  }

  const model = process.env.OPENAI_WHISPER_MODEL ?? "whisper-1";
  const ext = extensionFromMimeType(recording.mimeType);

  const audioBytes = Buffer.from(recording.audioBase64, "base64");
  const audioBlob = new Blob([audioBytes], { type: recording.mimeType || "audio/webm" });

  const formData = new FormData();
  formData.append("model", model);
  formData.append("file", audioBlob, `recording.${ext}`);

  const response = await fetch("https://api.openai.com/v1/audio/transcriptions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Whisper request failed: ${response.status} ${errorText}`);
  }

  const result = (await response.json()) as { text?: string };

  if (!result.text || !result.text.trim()) {
    throw new Error("Whisper response missing text.");
  }

  return result.text.trim();
}

export async function transcribeRecordingAudio(recording: SpeakingRecordingItem): Promise<{
  transcript: string;
  provider: "whisper" | "fallback";
}> {
  try {
    const transcript = await transcribeWithWhisper(recording);
    return { transcript, provider: "whisper" };
  } catch (error) {
    console.error("Whisper fallback triggered:", error);
    return {
      transcript: createFallbackTranscript(recording),
      provider: "fallback",
    };
  }
}
