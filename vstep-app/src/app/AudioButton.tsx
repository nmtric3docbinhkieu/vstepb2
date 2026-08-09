"use client";

import { useState } from "react";

export default function AudioButton({ text }: { text: string }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSpeak = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.95;
    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    window.speechSynthesis.speak(utterance);
  };

  return (
    <button
      type="button"
      onClick={handleSpeak}
      className="rounded-full border border-emerald-600 px-4 py-2 text-sm font-medium text-emerald-700 transition hover:bg-emerald-50"
    >
      {isPlaying ? "Đang phát..." : "🔊 Nghe giọng Anh – Anh"}
    </button>
  );
}
