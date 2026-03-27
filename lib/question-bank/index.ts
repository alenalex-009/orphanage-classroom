// ─── Full public API for @/lib/question-bank ─────────────────────────────────
export type { Question, QuestionType, MCQOption, TopicInfo } from "./types";

// Topic-based question resolver (THE FIX)
export { getQuestionsForTopic, getTopicKey, ALL_TOPICS, TOPIC_INFO } from "./topic-map";

// Raw question sets (used by game-room, etc.)
export { MATH_FRACTIONS, MATH_ADDITION, MATH_SUBTRACTION, MATH_MULTIPLICATION, MATH_SHAPES, MATH_COUNTING } from "./math";
export { ENGLISH_ALPHABET, ENGLISH_SPELLING, ENGLISH_GRAMMAR, ENGLISH_READING } from "./english";
export { SCIENCE_ANIMALS, SCIENCE_PLANTS, SCIENCE_WEATHER, SOCIAL_MORAL, SOCIAL_EMOTIONS, GENERAL_COLORS } from "./science-social";

// Legacy compat — old imports still work
export { SOCIAL_MORAL as DEFAULT_QUESTIONS } from "./science-social";
