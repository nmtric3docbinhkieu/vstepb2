export type TutorRole = "user" | "assistant";

export type TutorMessage = {
  id: string;
  role: TutorRole;
  content: string;
  createdAt: string;
};

export type TutorChatResponseData = {
  reply: TutorMessage;
  history: TutorMessage[];
};
