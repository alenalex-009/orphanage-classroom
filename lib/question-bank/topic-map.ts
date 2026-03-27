import type { Question, TopicInfo } from "./types";
import { MATH_FRACTIONS, MATH_ADDITION, MATH_SUBTRACTION, MATH_MULTIPLICATION, MATH_SHAPES, MATH_COUNTING } from "./math";
import { ENGLISH_ALPHABET, ENGLISH_SPELLING, ENGLISH_GRAMMAR, ENGLISH_READING } from "./english";
import { SCIENCE_ANIMALS, SCIENCE_PLANTS, SCIENCE_WEATHER, SOCIAL_MORAL, SOCIAL_EMOTIONS, GENERAL_COLORS } from "./science-social";

// ─── TOPIC INFO (for the learning resources page) ────────────────────────────
export const TOPIC_INFO: Record<string, TopicInfo> = {
  fractions:      { label:"Fractions",       emoji:"🍕", description:"Understanding parts of a whole",  subject:"math"    },
  addition:       { label:"Addition",         emoji:"➕", description:"Adding numbers together",         subject:"math"    },
  subtraction:    { label:"Subtraction",      emoji:"➖", description:"Taking numbers away",             subject:"math"    },
  multiplication: { label:"Multiplication",   emoji:"✖️", description:"Repeated addition",               subject:"math"    },
  shapes:         { label:"Shapes",           emoji:"🔷", description:"2D and 3D shapes",                subject:"math"    },
  counting:       { label:"Counting",         emoji:"🔢", description:"Numbers and counting patterns",   subject:"math"    },
  alphabet:       { label:"Alphabet",         emoji:"🔤", description:"Letters A to Z",                  subject:"english" },
  spelling:       { label:"Spelling",         emoji:"✏️", description:"How to spell common words",       subject:"english" },
  grammar:        { label:"Grammar",          emoji:"📝", description:"Sentences and parts of speech",   subject:"english" },
  reading:        { label:"Reading",          emoji:"📖", description:"Reading comprehension",           subject:"english" },
  animals:        { label:"Animals",          emoji:"🦁", description:"Living creatures and their features", subject:"science" },
  plants:         { label:"Plants",           emoji:"🌱", description:"How plants grow",                 subject:"science" },
  weather:        { label:"Weather",          emoji:"⛅", description:"Types of weather and seasons",    subject:"science" },
  moral_values:   { label:"Moral Values",     emoji:"💛", description:"Kindness, honesty and empathy",  subject:"social"  },
  emotions:       { label:"Emotions",         emoji:"😊", description:"Understanding feelings",          subject:"social"  },
  friendship:     { label:"Friendship",       emoji:"🤝", description:"Being a good friend",             subject:"social"  },
  colors:         { label:"Colors",           emoji:"🎨", description:"Colours and mixing",              subject:"general" },
};

// ─── KEYWORD → QUESTION SET MAP ──────────────────────────────────────────────
// Each entry is [keyword_in_topic, getter_fn]
// Keywords are checked against the lowercased session topic
const KEYWORD_MAP: [string, () => Question[]][] = [
  // Math
  ["fraction",      () => MATH_FRACTIONS],
  ["½",             () => MATH_FRACTIONS],
  ["half",          () => MATH_FRACTIONS],
  ["add",           () => MATH_ADDITION],
  ["plus",          () => MATH_ADDITION],
  ["sum",           () => MATH_ADDITION],
  ["subtract",      () => MATH_SUBTRACTION],
  ["minus",         () => MATH_SUBTRACTION],
  ["takeaway",      () => MATH_SUBTRACTION],
  ["take away",     () => MATH_SUBTRACTION],
  ["multipl",       () => MATH_MULTIPLICATION],
  ["times table",   () => MATH_MULTIPLICATION],
  ["shape",         () => MATH_SHAPES],
  ["geometry",      () => MATH_SHAPES],
  ["triangle",      () => MATH_SHAPES],
  ["circle",        () => MATH_SHAPES],
  ["square",        () => MATH_SHAPES],
  ["count",         () => MATH_COUNTING],
  ["number",        () => MATH_COUNTING],
  ["digit",         () => MATH_COUNTING],
  // English
  ["alphabet",      () => ENGLISH_ALPHABET],
  ["letter",        () => ENGLISH_ALPHABET],
  ["vowel",         () => ENGLISH_ALPHABET],
  ["spell",         () => ENGLISH_SPELLING],
  ["grammar",       () => ENGLISH_GRAMMAR],
  ["sentence",      () => ENGLISH_GRAMMAR],
  ["noun",          () => ENGLISH_GRAMMAR],
  ["verb",          () => ENGLISH_GRAMMAR],
  ["read",          () => ENGLISH_READING],
  ["comprehension", () => ENGLISH_READING],
  ["story",         () => ENGLISH_READING],
  ["word",          () => ENGLISH_READING],
  // Science
  ["animal",        () => SCIENCE_ANIMALS],
  ["bird",          () => SCIENCE_ANIMALS],
  ["mammal",        () => SCIENCE_ANIMALS],
  ["insect",        () => SCIENCE_ANIMALS],
  ["fish",          () => SCIENCE_ANIMALS],
  ["plant",         () => SCIENCE_PLANTS],
  ["leaf",          () => SCIENCE_PLANTS],
  ["flower",        () => SCIENCE_PLANTS],
  ["root",          () => SCIENCE_PLANTS],
  ["seed",          () => SCIENCE_PLANTS],
  ["weather",       () => SCIENCE_WEATHER],
  ["season",        () => SCIENCE_WEATHER],
  ["rain",          () => SCIENCE_WEATHER],
  ["cloud",         () => SCIENCE_WEATHER],
  ["temperature",   () => SCIENCE_WEATHER],
  // Social / moral
  ["moral",         () => SOCIAL_MORAL],
  ["value",         () => SOCIAL_MORAL],
  ["kindness",      () => SOCIAL_MORAL],
  ["honest",        () => SOCIAL_MORAL],
  ["sharing",       () => SOCIAL_MORAL],
  ["helping",       () => SOCIAL_MORAL],
  ["respect",       () => SOCIAL_MORAL],
  ["emotion",       () => SOCIAL_EMOTIONS],
  ["feeling",       () => SOCIAL_EMOTIONS],
  ["empathy",       () => SOCIAL_EMOTIONS],
  ["angry",         () => SOCIAL_EMOTIONS],
  ["happy",         () => SOCIAL_EMOTIONS],
  ["sad",           () => SOCIAL_EMOTIONS],
  ["friend",        () => SOCIAL_MORAL],
  ["bullying",      () => SOCIAL_EMOTIONS],
  // General
  ["color",         () => GENERAL_COLORS],
  ["colour",        () => GENERAL_COLORS],
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * THE FIX: Maps any session topic string to the correct question set.
 * Previously the app always returned life-skills questions regardless of topic.
 * Now "Fractions" → fractions questions, "Alphabet" → alphabet questions, etc.
 */
export function getQuestionsForTopic(topic: string): Question[] {
  const lower = topic.toLowerCase().trim();

  for (const [keyword, getFn] of KEYWORD_MAP) {
    if (lower.includes(keyword)) {
      return shuffle(getFn()).slice(0, 8);
    }
  }

  // Default fallback: moral values (original behavior for general topics)
  return shuffle(SOCIAL_MORAL).slice(0, 8);
}

/**
 * Get the topic key for a topic string (used for learning resources)
 */
export function getTopicKey(topic: string): string {
  const lower = topic.toLowerCase().trim();
  const keywordToTopicKey: [string, string][] = [
    ["fraction", "fractions"], ["add", "addition"], ["subtract", "subtraction"],
    ["multipl", "multiplication"], ["shape", "shapes"], ["count", "counting"],
    ["digit", "counting"], ["number", "counting"],
    ["alphabet", "alphabet"], ["letter", "alphabet"], ["spell", "spelling"],
    ["grammar", "grammar"], ["sentence", "grammar"], ["read", "reading"],
    ["animal", "animals"], ["bird", "animals"], ["mammal", "animals"],
    ["plant", "plants"], ["flower", "plants"], ["seed", "plants"],
    ["weather", "weather"], ["season", "weather"], ["rain", "weather"],
    ["moral", "moral_values"], ["value", "moral_values"], ["kind", "moral_values"],
    ["friend", "friendship"], ["emotion", "emotions"], ["feeling", "emotions"],
    ["color", "colors"], ["colour", "colors"],
  ];
  for (const [kw, key] of keywordToTopicKey) {
    if (lower.includes(kw)) return key;
  }
  return "moral_values";
}

/** All available topics for the learning resources browser */
export const ALL_TOPICS = Object.entries(TOPIC_INFO).map(([key, info]) => ({ key, ...info }));
