"use client";

import { useEffect, useRef, useState } from "react";

import type { SpeakingRecordingItem } from "@/types/speaking";

type SpeakingApiResponse = {
  success: boolean;
  message: string;
  data?: {
    recording?: SpeakingRecordingItem;
    recordings?: SpeakingRecordingItem[];
  };
};

const DEFAULT_QUESTION =
  "Describe a skill you want to improve this year and explain why it is important for your future.";

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result;

      if (typeof result !== "string") {
        reject(new Error("Unable to read recording."));
        return;
      }

      const base64 = result.split(",")[1];

      if (!base64) {
        reject(new Error("Invalid base64 data."));
        return;
      }

      resolve(base64);
    };

    reader.onerror = () => reject(new Error("Unable to convert audio."));
    reader.readAsDataURL(blob);
  });
}

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export function SpeakingRecorderClient() {
  const [question, setQuestion] = useState(DEFAULT_QUESTION);
  const [isRecording, setIsRecording] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [durationSeconds, setDurationSeconds] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [recordings, setRecordings] = useState<SpeakingRecordingItem[]>([]);
  const [transcribingId, setTranscribingId] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const response = await fetch("/api/speaking/recordings", { method: "GET" });
        const result = (await response.json()) as SpeakingApiResponse;

        if (!response.ok || !result.success) {
          return;
        }

        setRecordings(result.data?.recordings ?? []);
      } catch {
        // Keep MVP resilient if history fails.
      }
    };

    void loadHistory();

    return () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
      }

      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  const startRecording = async () => {
    setErrorMessage(null);

    if (!navigator.mediaDevices?.getUserMedia) {
      setErrorMessage("Your browser does not support audio recording.");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      chunksRef.current = [];

      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      recorder.start();
      setDurationSeconds(0);
      setIsRecording(true);

      timerRef.current = window.setInterval(() => {
        setDurationSeconds((prev) => prev + 1);
      }, 1000);
    } catch {
      setErrorMessage("Unable to access microphone.");
    }
  };

  const stopRecording = async () => {
    setIsRecording(false);

    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }

    const recorder = mediaRecorderRef.current;
    const stream = streamRef.current;

    if (!recorder || !stream) {
      return;
    }

    const stopped = new Promise<Blob>((resolve) => {
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: recorder.mimeType || "audio/webm" });
        resolve(blob);
      };
    });

    recorder.stop();
    stream.getTracks().forEach((track) => track.stop());
    streamRef.current = null;

    try {
      setIsUploading(true);

      const audioBlob = await stopped;
      const audioBase64 = await blobToBase64(audioBlob);

      const response = await fetch("/api/speaking/recordings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question,
          audioBase64,
          mimeType: audioBlob.type || "audio/webm",
          durationSeconds,
        }),
      });

      const result = (await response.json()) as SpeakingApiResponse;

      if (!response.ok || !result.success || !result.data?.recording) {
        setErrorMessage(result.message || "Upload failed.");
        return;
      }

      setRecordings((prev) => [result.data!.recording!, ...prev]);
    } catch {
      setErrorMessage("Upload failed.");
    } finally {
      setIsUploading(false);
    }
  };

  const transcribeRecording = async (recordingId: string) => {
    setErrorMessage(null);
    setTranscribingId(recordingId);

    try {
      const response = await fetch("/api/speaking/transcribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ recordingId }),
      });

      const result = (await response.json()) as SpeakingApiResponse;

      if (!response.ok || !result.success || !result.data?.recording) {
        setErrorMessage(result.message || "Transcription failed.");
        return;
      }

      setRecordings((prev) =>
        prev.map((item) => (item.id === recordingId ? result.data!.recording! : item)),
      );
    } catch {
      setErrorMessage("Transcription failed.");
    } finally {
      setTranscribingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <section className="surface-3d rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-slate-900">Record Audio</h2>

        <label className="mt-4 block text-sm font-medium text-slate-700" htmlFor="speaking-question">
          Speaking Question
        </label>
        <textarea
          id="speaking-question"
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          rows={3}
          className="mt-1 w-full resize-none rounded-xl border border-slate-300/80 bg-white px-3 py-2 text-slate-900 outline-none ring-sky-400 focus:ring-2"
        />

        <div className="mt-4 flex flex-wrap items-center gap-3">
          {!isRecording ? (
            <button
              type="button"
              onClick={startRecording}
              className="btn-3d rounded-xl px-4 py-2 text-sm font-semibold text-white"
            >
              Start Recording
            </button>
          ) : (
            <button
              type="button"
              onClick={() => void stopRecording()}
              className="btn-3d rounded-xl px-4 py-2 text-sm font-semibold text-white"
            >
              Stop and Upload
            </button>
          )}

          <span className="text-sm text-slate-700">Duration: {formatDuration(durationSeconds)}</span>
          {isUploading ? <span className="text-sm text-sky-700">Uploading...</span> : null}
        </div>

        {errorMessage ? <p className="mt-2 text-sm text-rose-600">{errorMessage}</p> : null}
      </section>

      <section className="surface-3d rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-slate-900">Playback Audio</h2>

        {recordings.length === 0 ? (
          <p className="mt-3 text-sm text-slate-600">No recordings yet. Record your first response above.</p>
        ) : (
          <div className="mt-4 space-y-4">
            {recordings.map((item) => {
              const audioSrc = `data:${item.mimeType};base64,${item.audioBase64}`;

              return (
                <article key={item.id} className="card-3d rounded-xl p-4">
                  <p className="text-sm font-semibold text-slate-900">Question</p>
                  <p className="mt-1 text-sm text-slate-700">{item.question}</p>
                  <p className="mt-2 text-xs text-slate-500">
                    Duration: {formatDuration(item.durationSeconds)} | {new Date(item.submittedAt).toLocaleString()}
                  </p>
                  <audio controls className="mt-3 w-full" src={audioSrc} />

                  <div className="mt-3 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => void transcribeRecording(item.id)}
                      disabled={transcribingId === item.id}
                      className="btn-ghost-3d rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {transcribingId === item.id ? "Transcribing..." : "Generate Transcript"}
                    </button>

                    {item.transcriptProvider ? (
                      <span className="text-xs text-slate-500">Source: {item.transcriptProvider}</span>
                    ) : null}
                  </div>

                  {item.transcript ? (
                    <div className="mt-3 rounded-lg border border-slate-200 bg-white px-3 py-2">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Transcript</p>
                      <p className="mt-1 whitespace-pre-wrap text-sm text-slate-700">{item.transcript}</p>
                    </div>
                  ) : null}
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
