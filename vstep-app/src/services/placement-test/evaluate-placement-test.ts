import type {
  PlacementAnswerMap,
  PlacementQuestion,
  PlacementReport,
  PlacementScoreBreakdown,
  PlacementSection,
} from "@/types/placement-test";

const SECTION_LABEL: Record<PlacementSection, string> = {
  vocabulary: "Vocabulary",
  grammar: "Grammar",
  reading: "Reading",
};

function computeLevel(overallPercent: number): PlacementReport["estimatedLevel"] {
  if (overallPercent >= 85) {
    return "B2+";
  }

  if (overallPercent >= 70) {
    return "B2";
  }

  if (overallPercent >= 55) {
    return "B1+";
  }

  return "B1";
}

function sectionBreakdown(
  section: PlacementSection,
  questions: PlacementQuestion[],
  answers: PlacementAnswerMap,
): PlacementScoreBreakdown {
  const sectionQuestions = questions.filter((q) => q.section === section);
  const correct = sectionQuestions.filter(
    (q) => answers[q.id] !== undefined && answers[q.id] === q.correctOptionIndex,
  ).length;

  const total = sectionQuestions.length;
  const percent = total > 0 ? Math.round((correct / total) * 100) : 0;

  return { section, total, correct, percent };
}

export function evaluatePlacementTest(
  questions: PlacementQuestion[],
  answers: PlacementAnswerMap,
): PlacementReport {
  const sections: PlacementSection[] = ["vocabulary", "grammar", "reading"];
  const breakdown = sections.map((section) => sectionBreakdown(section, questions, answers));

  const totalQuestions = questions.length;
  const totalCorrect = questions.filter(
    (q) => answers[q.id] !== undefined && answers[q.id] === q.correctOptionIndex,
  ).length;

  const overallPercent = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
  const estimatedLevel = computeLevel(overallPercent);

  const strengths = breakdown
    .filter((item) => item.percent >= 65)
    .map((item) => `${SECTION_LABEL[item.section]} (${item.percent}%)`);

  const improvementAreas = breakdown
    .filter((item) => item.percent < 65)
    .map((item) => `${SECTION_LABEL[item.section]} (${item.percent}%)`);

  const recommendation =
    estimatedLevel === "B2+"
      ? "You are close to exam-ready. Focus on timed mock tests and speaking fluency polishing."
      : estimatedLevel === "B2"
        ? "You are on track for B2. Strengthen weaker sections with daily targeted drills."
        : estimatedLevel === "B1+"
          ? "Build grammar accuracy and reading speed. Keep a 90-day structured study routine."
          : "Consolidate B1 fundamentals first, then move to B2-level tasks step by step.";

  return {
    estimatedLevel,
    overallPercent,
    totalCorrect,
    totalQuestions,
    breakdown,
    strengths,
    improvementAreas,
    recommendation,
  };
}
