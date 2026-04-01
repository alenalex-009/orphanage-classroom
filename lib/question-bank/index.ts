// ─── Full public API for @/lib/question-bank ─────────────────────────────────
export type { Question, QuestionType, MCQOption, TopicInfo } from "./types";

// Topic-based question resolver
export { getQuestionsForTopic, getTopicKey, ALL_TOPICS, TOPIC_INFO } from "./topic-map";

// Primary (Grade 1-5) math
export { MATH_FRACTIONS, MATH_ADDITION, MATH_SUBTRACTION, MATH_MULTIPLICATION, MATH_SHAPES, MATH_COUNTING } from "./math";

// Middle/High School math
export { MATH_ALGEBRA, MATH_PERCENTAGES, MATH_RATIOS, MATH_DECIMALS, MATH_STATISTICS, MATH_TRIGONOMETRY, MATH_CALCULUS_BASICS } from "./math-advanced";

// Primary English
export { ENGLISH_ALPHABET, ENGLISH_SPELLING, ENGLISH_GRAMMAR, ENGLISH_READING } from "./english";

// Science
export { SCIENCE_ANIMALS, SCIENCE_PLANTS, SCIENCE_WEATHER, SOCIAL_MORAL, SOCIAL_EMOTIONS, GENERAL_COLORS } from "./science-social";
export { SCIENCE_PHYSICS, SCIENCE_CHEMISTRY, SCIENCE_BIOLOGY, SCIENCE_HUMAN_BODY } from "./science-advanced";

// Humanities & CS
export { HUMANITIES_HISTORY, HUMANITIES_GEOGRAPHY, HUMANITIES_ECONOMICS } from "./humanities-cs";
export { CS_PROGRAMMING_BASICS, CS_DATA_STRUCTURES, CS_NETWORKS, HIGHER_DBMS, HIGHER_OS } from "./humanities-cs";

// Legacy compat
export { SOCIAL_MORAL as DEFAULT_QUESTIONS } from "./science-social";
