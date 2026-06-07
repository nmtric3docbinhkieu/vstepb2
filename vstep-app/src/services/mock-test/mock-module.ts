import type { MockTestModule } from "@/types/mock-test";

export const MOCK_TEST_MODULE: MockTestModule = {
  id: "mock-test-1",
  title: "VSTEP B2 Full Simulation",
  level: "B2",
  readingPassage:
    "Many universities are redesigning campus spaces to support collaborative learning. Traditional lecture halls are being replaced by flexible classrooms with movable furniture, digital screens, and group work areas. Supporters argue this model reflects modern workplaces, where teamwork and communication are essential. Critics, however, worry that constant collaboration can reduce time for deep individual thinking. In response, some institutions now provide quiet zones alongside interactive spaces. Researchers tracking student outcomes suggest that balanced environments, rather than one fixed model, produce the strongest results. Students report higher motivation when they can choose learning settings that match specific tasks.",
  readingQuestions: [
    {
      id: "mock-reading-q1",
      prompt: "Why are universities redesigning classrooms?",
      options: [
        "To reduce the number of teachers.",
        "To support collaboration and modern learning needs.",
        "To increase tuition fees.",
        "To remove digital tools.",
      ],
      correctOptionIndex: 1,
      explanation: "The passage states redesign supports collaborative learning and workplace-relevant skills.",
    },
    {
      id: "mock-reading-q2",
      prompt: "What concern do critics have?",
      options: [
        "Students do not use screens.",
        "Group work is too expensive.",
        "Collaboration may reduce deep individual thinking.",
        "Universities are closing libraries.",
      ],
      correctOptionIndex: 2,
      explanation: "Critics worry about less time for concentrated individual study.",
    },
    {
      id: "mock-reading-q3",
      prompt: "What solution is mentioned?",
      options: [
        "Only online classes.",
        "Combining quiet zones with interactive spaces.",
        "Eliminating teamwork tasks.",
        "Shortening semesters.",
      ],
      correctOptionIndex: 1,
      explanation: "The passage highlights balanced campuses with both quiet and collaborative areas.",
    },
    {
      id: "mock-reading-q4",
      prompt: "What do student reports suggest?",
      options: [
        "Choice of learning setting can increase motivation.",
        "All students prefer silent study.",
        "Digital tools are unnecessary.",
        "Teamwork lowers all results.",
      ],
      correctOptionIndex: 0,
      explanation: "Students feel more motivated when they can choose suitable environments.",
    },
  ],
  listeningAudioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  listeningContext:
    "A project manager summarizes a remote-work pilot: productivity increased, commuting stress dropped, but new employees needed more onboarding support and clearer communication routines.",
  listeningQuestions: [
    {
      id: "mock-listening-q1",
      prompt: "What improved during the remote-work pilot?",
      options: [
        "Office rent costs only.",
        "Productivity and stress levels.",
        "Employee turnover in all teams.",
        "Team size in every department.",
      ],
      correctOptionIndex: 1,
      explanation: "The summary notes higher productivity and lower commuting stress.",
    },
    {
      id: "mock-listening-q2",
      prompt: "Which group needed extra support?",
      options: [
        "Senior managers.",
        "New employees.",
        "Part-time consultants only.",
        "IT administrators.",
      ],
      correctOptionIndex: 1,
      explanation: "The talk states new hires required stronger onboarding.",
    },
    {
      id: "mock-listening-q3",
      prompt: "What process needed to be clearer?",
      options: [
        "Communication routines.",
        "Office parking policy.",
        "Salary review schedule.",
        "Printer usage rules.",
      ],
      correctOptionIndex: 0,
      explanation: "Clear communication routines were identified as necessary.",
    },
    {
      id: "mock-listening-q4",
      prompt: "What is the best summary of the pilot?",
      options: [
        "Completely unsuccessful and canceled.",
        "Successful with some implementation challenges.",
        "Useful only for managers.",
        "No measurable impact was recorded.",
      ],
      correctOptionIndex: 1,
      explanation: "The pilot had positive outcomes with practical issues to refine.",
    },
  ],
  writingPrompt:
    "Some people believe universities should focus mainly on academic theory, while others think practical job skills are equally important. Write an essay discussing both views and give your opinion.",
  speakingPrompt:
    "Describe a time you learned a difficult skill. Explain what made it challenging and what strategies helped you improve.",
};
