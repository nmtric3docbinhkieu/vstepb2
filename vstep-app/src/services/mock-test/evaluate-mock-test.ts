import type {
  MockFinalReport,
  MockQuestion,
  MockQuestionPublic,
  MockSkillScore,
  MockTestModule,
  MockTestSubmission,
} from "@/types/mock-test";

export function toPublicQuestions(questions: MockQuestion[]): MockQuestionPublic[] {
  return questions.map((question) => ({
    id: question.id,
    prompt: question.prompt,
    options: question.options,
    explanation: question.explanation,
  }));
}

function scoreObjectiveSection(params: {
  skill: "reading" | "listening";
  questions: MockQuestion[];
  answers: Record<string, number>;
}): MockSkillScore {
  const total = 25;
  const perQuestion = params.questions.length > 0 ? total / params.questions.length : 0;

  let score = 0;
  const notes: string[] = [];

  for (const question of params.questions) {
    if (params.answers[question.id] === question.correctOptionIndex) {
      score += perQuestion;
    } else {
      notes.push(question.explanation);
    }
  }

  const normalizedScore = Math.round(score);
  const percent = Math.round((normalizedScore / total) * 100);

  return {
    skill: params.skill,
    score: normalizedScore,
    total,
    percent,
    notes,
  };
}

function countWords(text: string): number {
  return text
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

function scoreWritingResponse(response: string): MockSkillScore {
  const total = 25;
  const words = countWords(response);

  let score = 0;
  const notes: string[] = [];

  if (words >= 180) {
    score += 10;
  } else if (words >= 130) {
    score += 7;
    notes.push("Increase essay length to around 180+ words for fuller development.");
  } else if (words >= 90) {
    score += 5;
    notes.push("Develop arguments with more supporting details.");
  } else {
    score += 2;
    notes.push("Response is too short for a full VSTEP-style essay.");
  }

  const lower = response.toLowerCase();
  const hasOpinion = /i think|in my opinion|personally/.test(lower);
  const hasBalance = /on the one hand|on the other hand|however|while/.test(lower);
  const hasConclusion = /in conclusion|to conclude|overall/.test(lower);

  if (hasOpinion) {
    score += 5;
  } else {
    notes.push("State a clear personal opinion.");
  }

  if (hasBalance) {
    score += 5;
  } else {
    notes.push("Discuss both views using linking devices.");
  }

  if (hasConclusion) {
    score += 5;
  } else {
    notes.push("Add a concise conclusion.");
  }

  const normalizedScore = Math.min(total, Math.round(score));
  const percent = Math.round((normalizedScore / total) * 100);

  return {
    skill: "writing",
    score: normalizedScore,
    total,
    percent,
    notes,
  };
}

function scoreSpeakingResponse(response: string): MockSkillScore {
  const total = 25;
  const words = countWords(response);

  let score = 0;
  const notes: string[] = [];

  if (words >= 120) {
    score += 10;
  } else if (words >= 80) {
    score += 7;
    notes.push("Extend your speaking response with more details and examples.");
  } else if (words >= 50) {
    score += 5;
    notes.push("Speak longer to demonstrate fluency range.");
  } else {
    score += 2;
    notes.push("Response is too short for a strong speaking performance.");
  }

  const lower = response.toLowerCase();
  const connectorMatches = lower.match(/because|therefore|for example|first|then|finally|although|however/g);
  const connectorCount = connectorMatches ? connectorMatches.length : 0;

  if (connectorCount >= 4) {
    score += 8;
  } else if (connectorCount >= 2) {
    score += 5;
    notes.push("Use more discourse markers to improve coherence.");
  } else {
    score += 2;
    notes.push("Add linking phrases to connect ideas more clearly.");
  }

  const hasChallenge = /challeng|difficult|hard/.test(lower);
  const hasStrategy = /strategy|practice|plan|method/.test(lower);
  const hasOutcome = /improve|result|outcome|progress/.test(lower);

  if (hasChallenge) {
    score += 2;
  }

  if (hasStrategy) {
    score += 3;
  } else {
    notes.push("Explain specific strategies you used.");
  }

  if (hasOutcome) {
    score += 2;
  } else {
    notes.push("Mention clear outcomes from your effort.");
  }

  const normalizedScore = Math.min(total, Math.round(score));
  const percent = Math.round((normalizedScore / total) * 100);

  return {
    skill: "speaking",
    score: normalizedScore,
    total,
    percent,
    notes,
  };
}

function estimateLevel(overallPercent: number): MockFinalReport["estimatedLevel"] {
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

export function evaluateMockTest(params: {
  module: MockTestModule;
  submission: MockTestSubmission;
}): MockFinalReport {
  const reading = scoreObjectiveSection({
    skill: "reading",
    questions: params.module.readingQuestions,
    answers: params.submission.readingAnswers,
  });

  const listening = scoreObjectiveSection({
    skill: "listening",
    questions: params.module.listeningQuestions,
    answers: params.submission.listeningAnswers,
  });

  const writing = scoreWritingResponse(params.submission.writingResponse);
  const speaking = scoreSpeakingResponse(params.submission.speakingResponse);

  const breakdown = [reading, listening, writing, speaking];
  const overallTotal = breakdown.reduce((sum, item) => sum + item.total, 0);
  const overallScore = breakdown.reduce((sum, item) => sum + item.score, 0);
  const overallPercent = Math.round((overallScore / overallTotal) * 100);

  const strengths = breakdown
    .filter((item) => item.percent >= 75)
    .map((item) => item.skill.charAt(0).toUpperCase() + item.skill.slice(1));

  const improvementAreas = breakdown
    .filter((item) => item.percent < 60)
    .map((item) => item.skill.charAt(0).toUpperCase() + item.skill.slice(1));

  const recommendation =
    improvementAreas.length > 0
      ? `Prioritize ${improvementAreas.join(", ")} in the next 2 weeks with daily focused drills.`
      : "Maintain balanced practice and start timed mock tests every weekend.";

  return {
    estimatedLevel: estimateLevel(overallPercent),
    overallScore,
    overallTotal,
    overallPercent,
    breakdown,
    strengths,
    improvementAreas,
    recommendation,
  };
}
