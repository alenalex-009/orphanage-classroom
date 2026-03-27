// Re-export from the canonical source so there's only ONE Question type in the app
export type { Question, QuestionType, MCQOption } from "@/lib/game-types";

export interface TopicInfo {
  label: string;
  emoji: string;
  description: string;
  subject: "math" | "english" | "science" | "social" | "general";
}
