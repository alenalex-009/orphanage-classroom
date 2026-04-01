// Re-export from canonical source
export type { Question, QuestionType, MCQOption } from "@/lib/game-types";

export interface TopicInfo {
  label: string;
  emoji: string;
  description: string;
  subject: "math" | "english" | "science" | "social" | "humanities" | "cs" | "general";
  grade: "primary" | "middle" | "high" | "higher";
}
