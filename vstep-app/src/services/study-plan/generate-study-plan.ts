import type { StudyPlanData, StudyPlanDay, StudyTaskType } from "@/types/study-plan";

const FOCUS_CYCLE: StudyTaskType[] = ["reading", "listening", "speaking", "writing"];

const TASK_LIBRARY: Record<StudyTaskType, string[]> = {
  reading: [
    "Read one B2 passage and answer comprehension questions",
    "Skim an academic article and summarize key points",
    "Practice inference and reference questions",
  ],
  listening: [
    "Listen to a short lecture and take notes",
    "Answer multiple-choice listening questions",
    "Shadow one audio segment for comprehension",
  ],
  speaking: [
    "Record a 2-minute response on a familiar topic",
    "Practice opinion and justification structure",
    "Review fluency by repeating key connectors",
  ],
  writing: [
    "Write a 150-word paragraph with clear structure",
    "Edit grammar errors in a short essay",
    "Improve vocabulary and linking expressions",
  ],
};

function formatDateLabel(date: Date): string {
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function createTasks(dayNumber: number, focus: StudyTaskType) {
  const baseTasks = TASK_LIBRARY[focus];

  return baseTasks.map((title, index) => ({
    id: `day-${dayNumber}-task-${index + 1}`,
    type: focus,
    title,
    estimatedMinutes: 20 + index * 10,
  }));
}

export function generateStudyPlan(startDate = new Date()): StudyPlanData {
  const durationDays = 90;
  const days: StudyPlanDay[] = [];

  for (let i = 0; i < durationDays; i += 1) {
    const dayDate = new Date(startDate);
    dayDate.setDate(startDate.getDate() + i);

    const dayNumber = i + 1;
    const focus = FOCUS_CYCLE[i % FOCUS_CYCLE.length];

    days.push({
      dayNumber,
      dateLabel: formatDateLabel(dayDate),
      focus,
      tasks: createTasks(dayNumber, focus),
    });
  }

  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + durationDays - 1);

  return {
    durationDays,
    startDateLabel: formatDateLabel(startDate),
    endDateLabel: formatDateLabel(endDate),
    days,
  };
}
