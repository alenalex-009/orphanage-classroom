export interface ResourceStep {
  step: number;
  text: string;
  emoji: string;
}

export interface ResourceExample {
  question: string;
  answer: string;
  explanation?: string;
}

export interface LearningResource {
  topicKey: string;
  title: string;
  emoji: string;
  gradeLevel: string;
  subject: string;
  introduction: string;
  keyFacts: string[];
  steps?: ResourceStep[];
  examples: ResourceExample[];
  vocabulary: { word: string; meaning: string }[];
  funFact: string;
  practiceHint: string;
}

const RESOURCES: LearningResource[] = [

/* ================= FRACTIONS ================= */

{
  topicKey: "fractions",
  title: "Fractions",
  emoji: "🍕",
  gradeLevel: "Grade 3-4",
  subject: "Math",

  introduction:
    "A fraction shows part of a whole. When we divide something into equal parts, each part is a fraction.",

  keyFacts: [
    "Top number is Numerator",
    "Bottom number is Denominator",
    "½ means 1 of 2 parts",
    "¼ means 1 of 4 parts",
    "Same top and bottom means one whole",
  ],

  steps: [
    { step: 1, text: "Look at denominator", emoji: "👇" },
    { step: 2, text: "Look at numerator", emoji: "☝️" },
    { step: 3, text: "Draw equal parts", emoji: "✏️" },
  ],

  examples: [
    { question: "½ of 8?", answer: "4" },
    { question: "3 of 8 slices eaten?", answer: "5/8 left" },
  ],

  vocabulary: [
    { word: "Numerator", meaning: "Top number" },
    { word: "Denominator", meaning: "Bottom number" },
  ],

  funFact: "Fractions were used 3000 years ago!",
  practiceHint: "Cut fruit into pieces to learn fractions",
},

/* ================= COUNTING ================= */

{
  topicKey: "counting",
  title: "Counting",
  emoji: "🔢",
  gradeLevel: "Grade 1",
  subject: "Math",

  introduction:
    "Counting means saying numbers in order to know how many things there are. We use counting every day.",

  keyFacts: [
    "Numbers start from 1",
    "Counting helps in math",
    "We can count forward",
    "We can count backward",
    "Counting tells total",
  ],

  steps: [
    { step: 1, text: "Look at objects", emoji: "👀" },
    { step: 2, text: "Say numbers", emoji: "🔢" },
    { step: 3, text: "Last number is total", emoji: "🎯" },
  ],

  examples: [
    { question: "🍎🍎🍎 ?", answer: "3" },
    { question: "After 5?", answer: "6" },
  ],

  vocabulary: [
    { word: "Count", meaning: "Say numbers" },
    { word: "Total", meaning: "All together" },
  ],

  funFact: "We count steps when walking!",
  practiceHint: "Count books in class",
},

/* ================= SHAPES ================= */

{
  topicKey: "shapes",
  title: "Shapes",
  emoji: "🔷",
  gradeLevel: "Grade 1-2",
  subject: "Math",

  introduction:
    "Shapes are forms of objects. Everything around us has a shape.",

  keyFacts: [
    "Circle is round",
    "Triangle has 3 sides",
    "Square has 4 equal sides",
    "Rectangle has 4 sides",
    "Shapes are everywhere",
  ],

  steps: [
    { step: 1, text: "Look at object", emoji: "👀" },
    { step: 2, text: "Count sides", emoji: "🔢" },
    { step: 3, text: "Name shape", emoji: "🧠" },
  ],

  examples: [
    { question: "3 sides?", answer: "Triangle" },
    { question: "Round?", answer: "Circle" },
  ],

  vocabulary: [
    { word: "Circle", meaning: "Round" },
    { word: "Square", meaning: "4 equal sides" },
  ],

  funFact: "Wheel is circle",
  practiceHint: "Find shapes around",
},

/* ================= ADDITION ================= */

{
  topicKey: "addition",
  title: "Addition",
  emoji: "➕",
  gradeLevel: "Grade 1-3",
  subject: "Math",

  introduction:
    "Addition means putting numbers together to get total.",

  keyFacts: [
    "+ means add",
    "Answer is sum",
    "Adding makes bigger",
    "0 keeps same",
  ],

  steps: [
    { step: 1, text: "Start big number", emoji: "🔢" },
    { step: 2, text: "Count more", emoji: "🖐️" },
    { step: 3, text: "Stop at answer", emoji: "🎯" },
  ],

  examples: [
    { question: "7+3", answer: "10" },
    { question: "5+5", answer: "10" },
  ],

  vocabulary: [
    { word: "Add", meaning: "Put together" },
    { word: "Sum", meaning: "Answer" },
  ],

  funFact: "Kids use fingers to add!",
  practiceHint: "Use pencils to add",
},
/* ================= ALPHABET ================= */

{
  topicKey: "alphabet",
  title: "Alphabet",
  emoji: "🔤",
  gradeLevel: "Grade 1",
  subject: "English",

  introduction:
    "The alphabet has 26 letters. We use these letters to read and write words.",

  keyFacts: [
    "26 letters in English",
    "A E I O U are vowels",
    "Others are consonants",
    "Words use letters",
    "Letters make sounds",
  ],

  steps: [
    { step: 1, text: "Learn letter order", emoji: "📖" },
    { step: 2, text: "Say alphabet", emoji: "🗣️" },
    { step: 3, text: "Write letters", emoji: "✏️" },
  ],

  examples: [
    { question: "After A?", answer: "B" },
    { question: "Vowel?", answer: "A" },
  ],

  vocabulary: [
    { word: "Letter", meaning: "Part of alphabet" },
    { word: "Word", meaning: "Group of letters" },
  ],

  funFact: "Alphabet song helps memory",
  practiceHint: "Say alphabet daily",
},

/* ================= SPELLING ================= */

{
  topicKey: "spelling",
  title: "Spelling",
  emoji: "✏️",
  gradeLevel: "Grade 2",
  subject: "English",

  introduction:
    "Spelling means writing words correctly using letters.",

  keyFacts: [
    "Words have letters",
    "Correct spelling important",
    "Practice helps",
    "Reading improves spelling",
  ],

  steps: [
    { step: 1, text: "Listen word", emoji: "👂" },
    { step: 2, text: "Say letters", emoji: "🗣️" },
    { step: 3, text: "Write word", emoji: "✏️" },
  ],

  examples: [
    { question: "Spell CAT", answer: "C-A-T" },
    { question: "Spell DOG", answer: "D-O-G" },
  ],

  vocabulary: [
    { word: "Spell", meaning: "Write letters" },
    { word: "Word", meaning: "Letters together" },
  ],

  funFact: "Books help spelling",
  practiceHint: "Write 5 words daily",
},

/* ================= GRAMMAR ================= */

{
  topicKey: "grammar",
  title: "Grammar",
  emoji: "📖",
  gradeLevel: "Grade 3",
  subject: "English",

  introduction:
    "Grammar helps us write correct sentences.",

  keyFacts: [
    "Sentence starts capital",
    "Ends with dot",
    "Words make sentence",
    "Grammar gives meaning",
  ],

  steps: [
    { step: 1, text: "Start capital", emoji: "🔤" },
    { step: 2, text: "Write words", emoji: "✏️" },
    { step: 3, text: "Add full stop", emoji: "." },
  ],

  examples: [
    { question: "i am happy", answer: "I am happy." },
  ],

  vocabulary: [
    { word: "Sentence", meaning: "Words together" },
  ],

  funFact: "Grammar makes reading easy",
  practiceHint: "Write small sentences",
},

/* ================= READING ================= */

{
  topicKey: "reading",
  title: "Reading",
  emoji: "📚",
  gradeLevel: "Grade 1",
  subject: "English",

  introduction:
    "Reading means understanding written words.",

  keyFacts: [
    "Reading helps learning",
    "Books give knowledge",
    "Practice daily",
  ],

  steps: [
    { step: 1, text: "Look letters", emoji: "👀" },
    { step: 2, text: "Say words", emoji: "🗣️" },
    { step: 3, text: "Understand", emoji: "🧠" },
  ],

  examples: [
    { question: "Read CAT", answer: "Cat" },
  ],

  vocabulary: [
    { word: "Read", meaning: "See words" },
  ],

  funFact: "Reading makes brain strong",
  practiceHint: "Read daily",
},

/* ================= PLANTS ================= */

{
  topicKey: "plants",
  title: "Plants",
  emoji: "🌱",
  gradeLevel: "Grade 2",
  subject: "Science",

  introduction:
    "Plants are living things that grow in soil.",

  keyFacts: [
    "Plants need water",
    "Plants need sun",
    "Plants give oxygen",
    "Plants grow from seed",
  ],

  steps: [
    { step: 1, text: "Plant seed", emoji: "🌱" },
    { step: 2, text: "Water it", emoji: "💧" },
    { step: 3, text: "Sunlight", emoji: "☀️" },
  ],

  examples: [
    { question: "Need for plant?", answer: "Water" },
  ],

  vocabulary: [
    { word: "Seed", meaning: "Baby plant" },
  ],

  funFact: "Trees live long",
  practiceHint: "Grow plant",
},

/* ================= WEATHER ================= */

{
  topicKey: "weather",
  title: "Weather",
  emoji: "☀️",
  gradeLevel: "Grade 2",
  subject: "Science",

  introduction:
    "Weather tells how sky looks.",

  keyFacts: [
    "Sunny",
    "Rainy",
    "Cloudy",
    "Windy",
  ],

  steps: [
    { step: 1, text: "Look sky", emoji: "👀" },
    { step: 2, text: "See clouds", emoji: "☁️" },
    { step: 3, text: "Tell weather", emoji: "🗣️" },
  ],

  examples: [
    { question: "Water from sky?", answer: "Rain" },
  ],

  vocabulary: [
    { word: "Weather", meaning: "Sky condition" },
  ],

  funFact: "Weather changes daily",
  practiceHint: "Check sky",
},

/* ================= FRIENDSHIP ================= */

{
  topicKey: "friendship",
  title: "Friendship",
  emoji: "🤝",
  gradeLevel: "Grade 1",
  subject: "Social Studies",

  introduction:
    "Friendship means caring for others.",

  keyFacts: [
    "Friends help",
    "Friends share",
    "Friends care",
  ],

  examples: [
    { question: "Good friend?", answer: "Helps" },
  ],

  vocabulary: [
    { word: "Friend", meaning: "Person we like" },
  ],

  funFact: "Friends make happy",
  practiceHint: "Be kind",
},

/* ================= COLORS ================= */

{
  topicKey: "colors",
  title: "Colors",
  emoji: "🎨",
  gradeLevel: "Grade 1",
  subject: "General",

  introduction:
    "Colors make world beautiful.",

  keyFacts: [
    "Red",
    "Blue",
    "Green",
    "Yellow",
  ],

  steps: [
    { step: 1, text: "Look around", emoji: "👀" },
    { step: 2, text: "Find color", emoji: "🎨" },
    { step: 3, text: "Say color", emoji: "🗣️" },
  ],

  examples: [
    { question: "Sky?", answer: "Blue" },
  ],

  vocabulary: [
    { word: "Color", meaning: "Different look" },
  ],

  funFact: "Rainbow 7 colors",
  practiceHint: "Find colors",
},

];

const resourceMap = new Map(RESOURCES.map(r => [r.topicKey, r]));

export function getResourceForTopic(topicKey: string) {
  return resourceMap.get(topicKey) ?? null;
}

export function getAllResources() {
  return RESOURCES;
}

export function getResourcesBySubject(subject: string) {
  return RESOURCES.filter(
    r => r.subject.toLowerCase() === subject.toLowerCase()
  );
}