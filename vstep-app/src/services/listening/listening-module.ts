import type { ListeningModule } from "@/types/listening";

export const LISTENING_MODULE: ListeningModule = {
  id: "listening-module-1",
  title: "Community Cycling Program",
  level: "B2",
  audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  transcriptPreview:
    "A city pilot program encouraged residents to cycle to work three times per week. Participants reported lower stress and better concentration. Organizers expanded bike lanes and offered free safety workshops. While weather remained a challenge, most participants said flexible schedules and secure parking made cycling practical.",
  questions: [
    {
      id: "listening-q1",
      prompt: "What was the main goal of the city pilot program?",
      options: [
        "To replace public buses entirely.",
        "To encourage cycling to work regularly.",
        "To reduce office working hours.",
        "To sell new bicycles to students.",
      ],
      correctOptionIndex: 1,
      explanation: "The audio states residents were encouraged to cycle to work three days each week.",
    },
    {
      id: "listening-q2",
      prompt: "Which benefit did participants report?",
      options: [
        "Higher monthly salary.",
        "Better sleep only on weekends.",
        "Lower stress and improved concentration.",
        "Shorter office meetings.",
      ],
      correctOptionIndex: 2,
      explanation: "The speaker mentions reduced stress and better focus.",
    },
    {
      id: "listening-q3",
      prompt: "What support did organizers provide?",
      options: [
        "Free car parking permits.",
        "New bike lanes and safety workshops.",
        "Paid gym memberships.",
        "Home-delivery meals.",
      ],
      correctOptionIndex: 1,
      explanation: "The program expanded bike lanes and offered safety training.",
    },
    {
      id: "listening-q4",
      prompt: "What challenge was still mentioned?",
      options: [
        "Lack of electric bikes.",
        "Expensive helmets.",
        "Weather conditions.",
        "Road tax increases.",
      ],
      correctOptionIndex: 2,
      explanation: "Weather remained a practical difficulty for participants.",
    },
    {
      id: "listening-q5",
      prompt: "What made cycling more practical for many people?",
      options: [
        "Free breakfast at work.",
        "Flexible schedules and secure bike parking.",
        "Shorter cycling routes by law.",
        "Mandatory company transport.",
      ],
      correctOptionIndex: 1,
      explanation: "The audio highlights flexibility and safe parking as key factors.",
    },
    {
      id: "listening-q6",
      prompt: "What is the overall message of the talk?",
      options: [
        "Cycling programs fail in all cities.",
        "Only athletes benefit from cycling.",
        "With support, cycling to work can be realistic and beneficial.",
        "Companies should ban commuting by bike.",
      ],
      correctOptionIndex: 2,
      explanation: "The talk presents positive outcomes with realistic constraints.",
    },
  ],
};
