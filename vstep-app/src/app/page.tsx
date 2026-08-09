<<<<<<< HEAD
import Link from "next/link";
=======
import fs from "fs";
import path from "path";
import type { ReactNode } from "react";
import ExamplesAccordion from "./ExamplesAccordion";

interface WritingExample {
  title: string;
  prompt: string;
  english: string;
  vietnamese: string;
  keyPhrases: string[];
}

function formatText(text: string): ReactNode[] {
  return text
    .split(/\n{2,}/)
    .map((paragraph, index) => paragraph.trim())
    .filter(Boolean)
    .map((paragraph, index) => (
      <p key={`${paragraph}-${index}`} className="mb-4 leading-7 text-slate-700">
        {paragraph}
      </p>
    ));
}

function parseWritingContent(markdown: string): WritingExample[] {
  const headingRegex = /^##\s+Đề\s+(\d+):\s*(.+)$/gim;
  const matches: RegExpMatchArray[] = [];
  let match: RegExpExecArray | null;
  const regex = new RegExp(headingRegex.source, headingRegex.flags);

  while ((match = regex.exec(markdown)) !== null) {
    matches.push(match as RegExpMatchArray);
  }

  if (!matches.length) {
    return [
      {
        title: "Đề mẫu",
        prompt: "Nội dung đề bài đang được cập nhật.",
        english: "Dear friend,\n\nI am writing to share some advice about your upcoming trip.",
        vietnamese: "Bạn thân mến,\n\nMình đang viết để chia sẻ một vài lời khuyên cho chuyến đi sắp tới của bạn.",
        keyPhrases: ["I am writing to", "It would be a good idea to", "I hope this helps"],
      },
    ];
  }

  return matches.map((match, index) => {
    const start = match.index ?? 0;
    const end = matches[index + 1]?.index ?? markdown.length;
    const block = markdown.slice(start, end).trim();

    const translationMarker = block.search(/Dịch cả bài|Dịch bài/i);
    const englishPart = translationMarker >= 0 ? block.slice(0, translationMarker) : block;
    const vietnamesePart = translationMarker >= 0 ? block.slice(translationMarker) : "";

    const answerStart = englishPart.search(/Dear\s+/i);
    const promptText = answerStart >= 0 ? englishPart.slice(0, answerStart).trim() : englishPart.trim();
    const englishAnswer = answerStart >= 0 ? englishPart.slice(answerStart).trim() : englishPart.trim();

    const cleanedPrompt = promptText
      .replace(/^##\s+Đề\s+\d+:.*$/im, "")
      .replace(/^##\s+Dịch đề.*$/im, "")
      .replace(/\n{3,}/g, "\n\n")
      .trim();

    const cleanedEnglish = englishAnswer
      .replace(/^##\s+Dịch đề.*$/im, "")
      .replace(/Dịch cả bài|Dịch bài/i, "")
      .replace(/\n{3,}/g, "\n\n")
      .trim();

    const cleanedVietnamese = vietnamesePart
      .replace(/Dịch cả bài|Dịch bài/i, "")
      .replace(/\n{3,}/g, "\n\n")
      .trim();

    const phraseMap: Record<number, string[]> = {
      1: [
        "I’m writing to give you some advice",
        "I recommend staying with a local host family",
        "As for part-time jobs",
        "It would be a good idea to",
      ],
      2: [
        "It’s a wonderful place",
        "I’d love for you to stay with me",
        "It would be great to spend time together",
        "I’m sure you’ll enjoy",
      ],
      3: [
        "I really enjoyed staying with you",
        "My favorite one is",
        "I did find your watch",
        "I’d love to stay on your uncle’s farm",
      ],
      4: [
        "I’m really excited about my trip",
        "I plan to stay in London for about a week",
        "I’d love to visit some famous landmarks",
        "Let me know if you have any other suggestions",
      ],
    };

    return {
      title: `Đề ${match[1]}: ${match[2].trim()}`,
      prompt: cleanedPrompt || "Đề bài sẽ được hiển thị ở đây.",
      english: cleanedEnglish || "Đáp án tiếng Anh sẽ được cập nhật.",
      vietnamese: cleanedVietnamese || "Đáp án tiếng Việt sẽ được cập nhật.",
      keyPhrases: phraseMap[index + 1] ?? ["Useful phrase 1", "Useful phrase 2"],
    };
  });
}
>>>>>>> f2ffd46 (Prepare VSTEP app for deployment)

export default function Home() {
  const markdownPath = path.join(process.cwd(), "..", "SOURCES_EXAM", "WRITING PART 1.md");
  const rawMarkdown = fs.existsSync(markdownPath)
    ? fs.readFileSync(markdownPath, "utf8")
    : "## Nội dung đang được cập nhật";
  const examples = parseWritingContent(rawMarkdown);

  return (
<<<<<<< HEAD
    <div className="relative flex flex-1 items-center justify-center overflow-hidden px-6 py-16 sm:px-10">
      <div className="pointer-events-none absolute -left-20 top-6 h-64 w-64 rounded-full bg-sky-200/45 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-10 h-56 w-56 rounded-full bg-emerald-200/45 blur-3xl" />
      <main className="surface-3d lift-in relative w-full max-w-5xl rounded-3xl p-8 sm:p-11">
        <p className="text-sm font-semibold tracking-[0.24em] text-sky-700">AI VSTEP PERSONAL COACH</p>
        <h1 className="mt-3 font-mono text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Website hoc VSTEP B2 ca nhan
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-slate-700">
          Nen tang nay giup ban hoc theo lo trinh ro rang: On tap - Luyen 4 ky nang - Thi thu.
          Neu ban moi bat dau, hay mo Huong dan su dung de di dung thu tu va tranh hoc lan man.
        </p>

        <section className="mt-8 grid gap-4 sm:grid-cols-3">
          <article className="card-3d rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-slate-900">Buoc 1</h2>
            <p className="mt-1 text-sm text-slate-700">Placement Test de xac dinh muc hien tai</p>
          </article>
          <article className="card-3d rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-slate-900">Buoc 2</h2>
            <p className="mt-1 text-sm text-slate-700">Hoc hang ngay voi Reading, Listening, Writing, Speaking</p>
          </article>
          <article className="card-3d rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-slate-900">Buoc 3</h2>
            <p className="mt-1 text-sm text-slate-700">Lam Mock Test moi tuan de do tien bo va dieu chinh</p>
          </article>
        </section>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/guide"
            className="btn-3d rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
          >
            Huong dan su dung
          </Link>
          <Link
            href="/login"
            className="btn-ghost-3d rounded-xl px-5 py-2.5 text-sm font-semibold text-slate-700 transition-transform hover:-translate-y-0.5"
          >
            Dang nhap
          </Link>
          <Link
            href="/dashboard"
            className="btn-ghost-3d rounded-xl px-5 py-2.5 text-sm font-semibold text-slate-700 transition-transform hover:-translate-y-0.5"
          >
            Mo Dashboard
          </Link>
          <Link
            href="/tutor"
            className="btn-ghost-3d rounded-xl px-5 py-2.5 text-sm font-semibold text-slate-700 transition-transform hover:-translate-y-0.5"
          >
            Mo AI Tutor
          </Link>
          <Link
            href="/placement-test"
            className="btn-ghost-3d rounded-xl px-5 py-2.5 text-sm font-semibold text-slate-700 transition-transform hover:-translate-y-0.5"
          >
            Mo Placement Test
          </Link>
          <Link
            href="/study-plan"
            className="btn-ghost-3d rounded-xl px-5 py-2.5 text-sm font-semibold text-slate-700 transition-transform hover:-translate-y-0.5"
          >
            Mo Study Plan
          </Link>
          <Link
            href="/writing"
            className="btn-ghost-3d rounded-xl px-5 py-2.5 text-sm font-semibold text-slate-700 transition-transform hover:-translate-y-0.5"
          >
            Mo Writing Trainer
          </Link>
          <Link
            href="/speaking"
            className="btn-ghost-3d rounded-xl px-5 py-2.5 text-sm font-semibold text-slate-700 transition-transform hover:-translate-y-0.5"
          >
            Mo Speaking Trainer
          </Link>
          <Link
            href="/vocabulary"
            className="btn-ghost-3d rounded-xl px-5 py-2.5 text-sm font-semibold text-slate-700 transition-transform hover:-translate-y-0.5"
          >
            Mo Vocabulary Trainer
          </Link>
          <Link
            href="/reading"
            className="btn-ghost-3d rounded-xl px-5 py-2.5 text-sm font-semibold text-slate-700 transition-transform hover:-translate-y-0.5"
          >
            Mo Reading Trainer
          </Link>
          <Link
            href="/listening"
            className="btn-ghost-3d rounded-xl px-5 py-2.5 text-sm font-semibold text-slate-700 transition-transform hover:-translate-y-0.5"
          >
            Mo Listening Trainer
          </Link>
          <Link
            href="/mock-test"
            className="btn-ghost-3d rounded-xl px-5 py-2.5 text-sm font-semibold text-slate-700 transition-transform hover:-translate-y-0.5"
          >
            Mo Mock Test
          </Link>
          <Link
            href="/vstep-library"
            className="btn-ghost-3d rounded-xl px-5 py-2.5 text-sm font-semibold text-slate-700 transition-transform hover:-translate-y-0.5"
          >
            Thu vien de gan day
          </Link>
        </div>
=======
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <main className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-10 lg:px-8">
        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600">
            VSTEP B2 • Writing Part 1
          </p>
          <h1 className="mt-3 text-4xl font-semibold text-slate-900">
            Cấu trúc bài học theo từng mẫu thư
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
            Mỗi mẫu đều được bố trí theo 5 phần: đề bài, đáp án tiếng Anh, đáp án tiếng Việt, nghe và các cụm từ quan trọng.
          </p>
        </section>

        <ExamplesAccordion examples={examples} />
>>>>>>> f2ffd46 (Prepare VSTEP app for deployment)
      </main>
    </div>
  );
}
