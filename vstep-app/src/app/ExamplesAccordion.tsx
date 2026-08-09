"use client";

import { useState } from "react";
import AudioButton from "./AudioButton";

interface ExampleData {
  title: string;
  prompt: string;
  english: string;
  vietnamese: string;
  keyPhrases: string[];
}

interface ExamplesAccordionProps {
  examples: ExampleData[];
}

export default function ExamplesAccordion({ examples }: ExamplesAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="space-y-4">
      {examples.map((example, index) => {
        const isOpen = openIndex === index;

        return (
          <article key={example.title} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-center justify-between px-6 py-5 text-left"
            >
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
                  Mẫu {index + 1}
                </p>
                <h2 className="mt-2 text-xl font-semibold text-slate-900">{example.title}</h2>
              </div>
              <span className="text-2xl font-light text-slate-500">{isOpen ? "−" : "+"}</span>
            </button>

            {isOpen && (
              <div className="border-t border-slate-200 px-6 pb-6 pt-5">
                <div className="grid gap-6 lg:grid-cols-2">
                  <div className="rounded-2xl bg-slate-50 p-5">
                    <h3 className="text-lg font-semibold text-slate-900">1/ Đề bài</h3>
                    <div className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-700">
                      {example.prompt}
                    </div>
                  </div>

                  <div className="rounded-2xl bg-emerald-50 p-5">
                    <h3 className="text-lg font-semibold text-slate-900">2/ Đáp án (Tiếng Anh)</h3>
                    <div className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-700">
                      {example.english}
                    </div>
                  </div>

                  <div className="rounded-2xl bg-sky-50 p-5">
                    <h3 className="text-lg font-semibold text-slate-900">3/ Đáp án (Tiếng Việt)</h3>
                    <div className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-700">
                      {example.vietnamese}
                    </div>
                  </div>

                  <div className="rounded-2xl bg-amber-50 p-5">
                    <h3 className="text-lg font-semibold text-slate-900">4/ Nghe</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-700">
                      Bấm nút bên dưới để nghe giọng đọc Anh – Anh của mẫu bài này.
                    </p>
                    <div className="mt-4">
                      <AudioButton text={example.english} />
                    </div>
                  </div>
                </div>

                <div className="mt-6 rounded-2xl border border-slate-200 p-5">
                  <h3 className="text-lg font-semibold text-slate-900">5/ Các cụm từ quan trọng</h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {example.keyPhrases.map((phrase) => (
                      <span key={phrase} className="rounded-full bg-slate-100 px-3 py-2 text-sm text-slate-700">
                        {phrase}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </article>
        );
      })}
    </section>
  );
}
