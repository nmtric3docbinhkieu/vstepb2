import type { PlacementQuestion } from "@/types/placement-test";

export const PLACEMENT_QUESTIONS: PlacementQuestion[] = [
  {
    id: "vocab-1",
    section: "vocabulary",
    prompt: "The company decided to ____ a new training program for employees.",
    options: ["implement", "convert", "reduce", "remove"],
    correctOptionIndex: 0,
    explanation: "Implement means to put a plan into action.",
  },
  {
    id: "vocab-2",
    section: "vocabulary",
    prompt: "The lecture was so ____ that everyone stayed focused for two hours.",
    options: ["boring", "engaging", "confusing", "ordinary"],
    correctOptionIndex: 1,
    explanation: "Engaging means interesting and holding attention.",
  },
  {
    id: "vocab-3",
    section: "vocabulary",
    prompt: "Students should ____ their ideas with clear examples.",
    options: ["support", "avoid", "ignore", "cancel"],
    correctOptionIndex: 0,
    explanation: "Support ideas means provide evidence or examples.",
  },
  {
    id: "vocab-4",
    section: "vocabulary",
    prompt: "Online learning offers greater ____ for people with busy schedules.",
    options: ["flexibility", "difficulty", "pressure", "weakness"],
    correctOptionIndex: 0,
    explanation: "Flexibility refers to adaptable time and place.",
  },
  {
    id: "grammar-1",
    section: "grammar",
    prompt: "If she ____ more time, she would join the English club.",
    options: ["has", "had", "will have", "having"],
    correctOptionIndex: 1,
    explanation: "Second conditional uses If + past simple, would + base verb.",
  },
  {
    id: "grammar-2",
    section: "grammar",
    prompt: "By the time we arrived, the movie ____.",
    options: ["starts", "has started", "had started", "starting"],
    correctOptionIndex: 2,
    explanation: "Past perfect is used for an earlier past action.",
  },
  {
    id: "grammar-3",
    section: "grammar",
    prompt: "He suggested ____ a short break before continuing.",
    options: ["to take", "taking", "take", "took"],
    correctOptionIndex: 1,
    explanation: "Suggest is followed by gerund in this structure.",
  },
  {
    id: "grammar-4",
    section: "grammar",
    prompt: "The report ____ by the manager before the meeting.",
    options: ["reviewed", "was reviewed", "has review", "review"],
    correctOptionIndex: 1,
    explanation: "Passive voice in past simple: was reviewed.",
  },
  {
    id: "reading-1",
    section: "reading",
    prompt:
      "Passage: Many universities now offer hybrid classes. Main reason mentioned is to improve access for students living far from campus. Which statement is true?",
    options: [
      "Hybrid classes are only for top students.",
      "Hybrid classes can help remote students access courses.",
      "Hybrid classes remove all in-person activities.",
      "Hybrid classes are more expensive in every case.",
    ],
    correctOptionIndex: 1,
    explanation: "The passage highlights improved access for distant learners.",
  },
  {
    id: "reading-2",
    section: "reading",
    prompt:
      "Passage: The city added more bike lanes, and traffic in the center became smoother. What is the best conclusion?",
    options: [
      "Bike lanes had no effect.",
      "Bike lanes may contribute to better traffic flow.",
      "Cars were banned completely.",
      "Only tourists benefited.",
    ],
    correctOptionIndex: 1,
    explanation: "The sentence links bike lanes with smoother traffic.",
  },
  {
    id: "reading-3",
    section: "reading",
    prompt:
      "Passage: Experts advise students to review vocabulary in short daily sessions. Why?",
    options: [
      "Because long sessions are impossible.",
      "Because daily short review improves long-term memory.",
      "Because vocabulary is not important.",
      "Because exams are easier now.",
    ],
    correctOptionIndex: 1,
    explanation: "The key idea is consistent review for retention.",
  },
  {
    id: "reading-4",
    section: "reading",
    prompt:
      "Passage: The school upgraded its library with digital resources. As a result, students used more academic sources in essays. What changed?",
    options: [
      "Essay length decreased dramatically.",
      "Students had less time to study.",
      "Access to digital materials improved source quality.",
      "Teachers stopped giving feedback.",
    ],
    correctOptionIndex: 2,
    explanation: "Digital resources led to stronger academic sourcing.",
  },
];
