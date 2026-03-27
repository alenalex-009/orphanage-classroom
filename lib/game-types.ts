// ─── QUESTION TYPES ───────────────────────────────────────────────────────────

export type QuestionType = "mcq" | "story" | "roleplay";

export interface MCQOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: string;
  type: QuestionType;
  title: string;
  body?: string;       // story text or extra context
  options?: MCQOption[]; // MCQ only
  prompt?: string;       // roleplay scenario
  xpReward: number;
}

// ─── ANSWER MODE ──────────────────────────────────────────────────────────────

export type AnswerMode = "whole_class" | "selected";

// ─── GAME STATE ───────────────────────────────────────────────────────────────

export interface GameState {
  currentQuestionIndex: number;
  questions: Question[];
  phase: "question" | "answer" | "feedback" | "roleplay_eval" | "done";
  answerMode: AnswerMode;
  selectedStudentIds: string[];
  lastXPGained: number;
  lastBonusXP: number;
  lastMessage: string;
}

// ─── STUDENT IN GAME ──────────────────────────────────────────────────────────

export interface GameStudent {
  id: string;
  name: string;
  reward: { xp: number; level: number; streak: number } | null;
  achievements: { icon: string }[];
}

// ─── TEAM IN GAME ─────────────────────────────────────────────────────────────

export interface GameTeam {
  id: string;
  name: string;
  color: string;
  xp: number;
  members: { studentId: string; student: GameStudent }[];
}
