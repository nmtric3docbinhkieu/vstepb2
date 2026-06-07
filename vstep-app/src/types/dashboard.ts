export type DashboardStat = {
  label: string;
  value: string;
  hint: string;
};

export type LearningProgressItem = {
  skill: "Reading" | "Listening" | "Speaking" | "Writing";
  completedPercent: number;
};

export type DailyTask = {
  id: string;
  title: string;
  estimatedMinutes: number;
  completed: boolean;
};

export type DashboardData = {
  streakDays: number;
  daysStudied: number;
  predictedScore: string;
  stats: DashboardStat[];
  progress: LearningProgressItem[];
  todaysTasks: DailyTask[];
};
