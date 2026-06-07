import type { ReadingModule } from "@/types/reading";

export const READING_MODULE: ReadingModule = {
  id: "reading-module-1",
  title: "Urban Green Spaces and Public Health",
  level: "B2",
  passage:
    "Cities around the world are investing in parks, tree-lined streets, and small community gardens. Researchers have found that these green areas can reduce stress and encourage regular physical activity. In many neighborhoods, people who live near parks walk more often and report better mental well-being. However, creating green spaces is not always simple. Local authorities must balance costs, maintenance, and public safety. Some experts argue that partnerships with local communities can improve long-term success because residents are more likely to protect and use places they helped design. In addition, schools can use nearby parks as outdoor learning spaces, which gives students practical experiences beyond the classroom.",
  questions: [
    {
      id: "reading-q1",
      prompt: "What is the main benefit of urban green spaces mentioned in the passage?",
      options: [
        "They replace all indoor sports facilities.",
        "They reduce stress and support healthier habits.",
        "They lower the price of public transport.",
        "They make city planning unnecessary.",
      ],
      correctOptionIndex: 1,
      explanation: "The passage states reduced stress and more physical activity.",
    },
    {
      id: "reading-q2",
      prompt: "Why can creating green spaces be difficult?",
      options: [
        "People dislike nature in cities.",
        "It requires balancing budget, maintenance, and safety.",
        "Teachers refuse to use parks.",
        "There is no land available in any city.",
      ],
      correctOptionIndex: 1,
      explanation: "The passage highlights cost, maintenance, and safety trade-offs.",
    },
    {
      id: "reading-q3",
      prompt: "What do experts suggest to improve long-term success?",
      options: [
        "Use only private investors.",
        "Close parks at weekends.",
        "Work with local communities in planning and care.",
        "Build parks far from schools.",
      ],
      correctOptionIndex: 2,
      explanation: "Community partnerships are linked to stronger protection and usage.",
    },
    {
      id: "reading-q4",
      prompt: "How can schools benefit from nearby parks?",
      options: [
        "They can avoid teaching science.",
        "They can offer outdoor learning experiences.",
        "They can reduce student numbers.",
        "They can stop classroom lessons entirely.",
      ],
      correctOptionIndex: 1,
      explanation: "The passage says parks can be used as outdoor learning spaces.",
    },
    {
      id: "reading-q5",
      prompt: "Which statement is true according to the passage?",
      options: [
        "Only wealthy neighborhoods benefit from parks.",
        "Green spaces guarantee zero city crime.",
        "Residents tend to value places they helped design.",
        "Maintenance is never required for community gardens.",
      ],
      correctOptionIndex: 2,
      explanation: "Resident involvement increases ownership and use.",
    },
    {
      id: "reading-q6",
      prompt: "What is the overall tone of the passage?",
      options: [
        "Balanced: positive impact with practical challenges.",
        "Negative: parks create mostly problems.",
        "Neutral: no opinion is expressed.",
        "Humorous: the topic is treated as a joke.",
      ],
      correctOptionIndex: 0,
      explanation: "The text presents benefits and realistic implementation issues.",
    },
  ],
};
