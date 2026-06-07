import type { DashboardData } from "@/types/dashboard";

type GetDashboardDataParams = {
  fullName: string;
};

export function getDashboardData({ fullName }: GetDashboardDataParams): DashboardData {
  const nameSeed = fullName.trim().length;
  const daysStudied = 26 + (nameSeed % 4);
  const streakDays = 7 + (nameSeed % 3);

  return {
    streakDays,
    daysStudied,
    predictedScore: "B2 (target on track)",
    stats: [
      {
        label: "Current Level",
        value: "B1+",
        hint: "Placement result",
      },
      {
        label: "Streak",
        value: `${streakDays} days`,
        hint: "Consecutive study days",
      },
      {
        label: "Days Studied",
        value: `${daysStudied}/90`,
        hint: "Plan progress",
      },
      {
        label: "Predicted Score",
        value: "6.2",
        hint: "Estimated VSTEP score",
      },
    ],
    progress: [
      { skill: "Reading", completedPercent: 58 },
      { skill: "Listening", completedPercent: 49 },
      { skill: "Speaking", completedPercent: 41 },
      { skill: "Writing", completedPercent: 45 },
    ],
    todaysTasks: [
      {
        id: "task-reading-1",
        title: "Read one B2 passage and answer 8 questions",
        estimatedMinutes: 35,
        completed: false,
      },
      {
        id: "task-writing-1",
        title: "Write a 150-word paragraph on education",
        estimatedMinutes: 30,
        completed: false,
      },
      {
        id: "task-vocab-1",
        title: "Review 20 academic vocabulary flashcards",
        estimatedMinutes: 20,
        completed: true,
      },
    ],
  };
}
