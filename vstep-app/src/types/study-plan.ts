export type StudyTaskType = "reading" | "listening" | "speaking" | "writing";

export type StudyTask = {
  id: string;
  type: StudyTaskType;
  title: string;
  estimatedMinutes: number;
};

export type StudyPlanDay = {
  dayNumber: number;
  dateLabel: string;
  focus: StudyTaskType;
  tasks: StudyTask[];
};

export type StudyPlanData = {
  durationDays: number;
  startDateLabel: string;
  endDateLabel: string;
  days: StudyPlanDay[];
};
