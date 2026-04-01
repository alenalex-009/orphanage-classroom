import type { Question, TopicInfo } from "./types";
import { MATH_FRACTIONS, MATH_ADDITION, MATH_SUBTRACTION, MATH_MULTIPLICATION, MATH_SHAPES, MATH_COUNTING } from "./math";
import { MATH_ALGEBRA, MATH_PERCENTAGES, MATH_RATIOS, MATH_DECIMALS, MATH_STATISTICS, MATH_TRIGONOMETRY, MATH_CALCULUS_BASICS } from "./math-advanced";
import { ENGLISH_ALPHABET, ENGLISH_SPELLING, ENGLISH_GRAMMAR, ENGLISH_READING } from "./english";
import { SCIENCE_ANIMALS, SCIENCE_PLANTS, SCIENCE_WEATHER, SOCIAL_MORAL, SOCIAL_EMOTIONS, GENERAL_COLORS } from "./science-social";
import { SCIENCE_PHYSICS, SCIENCE_CHEMISTRY, SCIENCE_BIOLOGY, SCIENCE_HUMAN_BODY } from "./science-advanced";
import { HUMANITIES_HISTORY, HUMANITIES_GEOGRAPHY, HUMANITIES_ECONOMICS, CS_PROGRAMMING_BASICS, CS_DATA_STRUCTURES, CS_NETWORKS, HIGHER_DBMS, HIGHER_OS } from "./humanities-cs";

// ─── TOPIC INFO ───────────────────────────────────────────────────────────────
export const TOPIC_INFO: Record<string, TopicInfo> = {
  // Primary Math
  fractions:        { label:"Fractions",          emoji:"🍕", description:"Understanding parts of a whole",           subject:"math",      grade:"primary"   },
  addition:         { label:"Addition",            emoji:"➕", description:"Adding numbers together",                 subject:"math",      grade:"primary"   },
  subtraction:      { label:"Subtraction",         emoji:"➖", description:"Taking numbers away",                     subject:"math",      grade:"primary"   },
  multiplication:   { label:"Multiplication",      emoji:"✖️", description:"Repeated addition",                       subject:"math",      grade:"primary"   },
  shapes:           { label:"Shapes & Geometry",   emoji:"🔷", description:"2D and 3D shapes",                        subject:"math",      grade:"primary"   },
  counting:         { label:"Counting & Numbers",  emoji:"🔢", description:"Numbers and counting patterns",           subject:"math",      grade:"primary"   },
  // Middle School Math
  algebra:          { label:"Algebra",             emoji:"🔣", description:"Equations, variables, expressions",       subject:"math",      grade:"middle"    },
  percentages:      { label:"Percentages",         emoji:"💯", description:"Percents, discounts, profit & loss",      subject:"math",      grade:"middle"    },
  ratios:           { label:"Ratios & Proportion", emoji:"⚖️", description:"Ratios, rates, proportional reasoning",   subject:"math",      grade:"middle"    },
  decimals:         { label:"Decimals",            emoji:"🔟", description:"Decimal numbers and operations",          subject:"math",      grade:"middle"    },
  statistics:       { label:"Statistics & Probability", emoji:"📊", description:"Mean, median, mode, probability",   subject:"math",      grade:"middle"    },
  // High School Math
  trigonometry:     { label:"Trigonometry",        emoji:"📐", description:"Sin, cos, tan and right triangles",       subject:"math",      grade:"high"      },
  calculus:         { label:"Calculus Basics",     emoji:"∫",  description:"Derivatives, integrals, limits",          subject:"math",      grade:"higher"    },
  // Primary English
  alphabet:         { label:"Alphabet",            emoji:"🔤", description:"Letters A to Z, vowels & consonants",     subject:"english",   grade:"primary"   },
  spelling:         { label:"Spelling",            emoji:"✏️", description:"How to spell common words",               subject:"english",   grade:"primary"   },
  grammar:          { label:"Grammar",             emoji:"📝", description:"Sentences, nouns, verbs, punctuation",    subject:"english",   grade:"primary"   },
  reading:          { label:"Reading",             emoji:"📖", description:"Reading comprehension",                   subject:"english",   grade:"primary"   },
  // Primary Science
  animals:          { label:"Animals",             emoji:"🦁", description:"Living creatures and their features",     subject:"science",   grade:"primary"   },
  plants:           { label:"Plants",              emoji:"🌱", description:"How plants grow and photosynthesis",       subject:"science",   grade:"primary"   },
  weather:          { label:"Weather & Seasons",   emoji:"⛅", description:"Types of weather and seasons",            subject:"science",   grade:"primary"   },
  // Advanced Science
  physics:          { label:"Physics",             emoji:"⚡", description:"Forces, motion, energy, electricity",     subject:"science",   grade:"high"      },
  chemistry:        { label:"Chemistry",           emoji:"⚗️", description:"Elements, compounds, reactions, pH",      subject:"science",   grade:"high"      },
  biology:          { label:"Biology",             emoji:"🧬", description:"Cells, DNA, evolution, ecosystems",       subject:"science",   grade:"high"      },
  human_body:       { label:"Human Body",          emoji:"🫀", description:"Organs, systems, health",                 subject:"science",   grade:"middle"    },
  // Social/Moral
  moral_values:     { label:"Moral Values",        emoji:"💛", description:"Kindness, honesty and empathy",           subject:"social",    grade:"primary"   },
  emotions:         { label:"Emotions",            emoji:"😊", description:"Understanding feelings",                  subject:"social",    grade:"primary"   },
  friendship:       { label:"Friendship",          emoji:"🤝", description:"Being a good friend",                     subject:"social",    grade:"primary"   },
  // Humanities
  history:          { label:"History",             emoji:"🏛️", description:"World and Indian history",                subject:"humanities",grade:"middle"    },
  geography:        { label:"Geography",           emoji:"🌍", description:"Continents, rivers, climate, maps",       subject:"humanities",grade:"middle"    },
  economics:        { label:"Economics",           emoji:"📈", description:"GDP, inflation, markets, banking",        subject:"humanities",grade:"high"      },
  // Computer Science
  programming:      { label:"Programming Basics",  emoji:"💻", description:"Variables, loops, conditionals, HTML/CSS",subject:"cs",        grade:"middle"    },
  data_structures:  { label:"Data Structures",     emoji:"🗄️", description:"Arrays, stacks, queues, sorting",         subject:"cs",        grade:"high"      },
  networks:         { label:"Computer Networks",   emoji:"🌐", description:"TCP/IP, HTTP, DNS, firewalls, OSI model", subject:"cs",        grade:"high"      },
  // Higher Education
  dbms:             { label:"Database Management", emoji:"🗃️", description:"SQL, normalisation, ACID, joins",          subject:"cs",        grade:"higher"    },
  operating_systems:{ label:"Operating Systems",   emoji:"🖥️", description:"Process scheduling, memory, deadlocks",   subject:"cs",        grade:"higher"    },
  // General
  colors:           { label:"Colors",              emoji:"🎨", description:"Colours and colour mixing",                subject:"general",   grade:"primary"   },
};

// ─── KEYWORD MAP ──────────────────────────────────────────────────────────────
const KEYWORD_MAP: [string, () => Question[]][] = [
  // Primary Math
  ["fraction",        () => MATH_FRACTIONS],
  ["half",            () => MATH_FRACTIONS],
  ["add",             () => MATH_ADDITION],
  ["plus",            () => MATH_ADDITION],
  ["sum",             () => MATH_ADDITION],
  ["subtract",        () => MATH_SUBTRACTION],
  ["minus",           () => MATH_SUBTRACTION],
  ["take away",       () => MATH_SUBTRACTION],
  ["multipl",         () => MATH_MULTIPLICATION],
  ["times table",     () => MATH_MULTIPLICATION],
  ["shape",           () => MATH_SHAPES],
  ["geometry",        () => MATH_SHAPES],
  ["polygon",         () => MATH_SHAPES],
  ["count",           () => MATH_COUNTING],
  ["number",          () => MATH_COUNTING],
  ["digit",           () => MATH_COUNTING],
  // Middle School Math
  ["algebra",         () => MATH_ALGEBRA],
  ["equation",        () => MATH_ALGEBRA],
  ["variable",        () => MATH_ALGEBRA],
  ["percent",         () => MATH_PERCENTAGES],
  ["discount",        () => MATH_PERCENTAGES],
  ["profit",          () => MATH_PERCENTAGES],
  ["ratio",           () => MATH_RATIOS],
  ["proportion",      () => MATH_RATIOS],
  ["rate",            () => MATH_RATIOS],
  ["speed",           () => MATH_RATIOS],
  ["decimal",         () => MATH_DECIMALS],
  ["statistic",       () => MATH_STATISTICS],
  ["mean",            () => MATH_STATISTICS],
  ["median",          () => MATH_STATISTICS],
  ["probability",     () => MATH_STATISTICS],
  ["data",            () => MATH_STATISTICS],
  // High School Math
  ["trigonometr",     () => MATH_TRIGONOMETRY],
  ["sine",            () => MATH_TRIGONOMETRY],
  ["cosine",          () => MATH_TRIGONOMETRY],
  ["pythagoras",      () => MATH_TRIGONOMETRY],
  ["calculus",        () => MATH_CALCULUS_BASICS],
  ["derivative",      () => MATH_CALCULUS_BASICS],
  ["integral",        () => MATH_CALCULUS_BASICS],
  ["differentiat",    () => MATH_CALCULUS_BASICS],
  // English
  ["alphabet",        () => ENGLISH_ALPHABET],
  ["letter",          () => ENGLISH_ALPHABET],
  ["vowel",           () => ENGLISH_ALPHABET],
  ["spell",           () => ENGLISH_SPELLING],
  ["grammar",         () => ENGLISH_GRAMMAR],
  ["sentence",        () => ENGLISH_GRAMMAR],
  ["noun",            () => ENGLISH_GRAMMAR],
  ["verb",            () => ENGLISH_GRAMMAR],
  ["read",            () => ENGLISH_READING],
  ["comprehension",   () => ENGLISH_READING],
  // Primary Science
  ["animal",          () => SCIENCE_ANIMALS],
  ["bird",            () => SCIENCE_ANIMALS],
  ["mammal",          () => SCIENCE_ANIMALS],
  ["plant",           () => SCIENCE_PLANTS],
  ["photosynthesis",  () => SCIENCE_PLANTS],
  ["flower",          () => SCIENCE_PLANTS],
  ["weather",         () => SCIENCE_WEATHER],
  ["season",          () => SCIENCE_WEATHER],
  ["climate",         () => SCIENCE_WEATHER],
  // Advanced Science
  ["physics",         () => SCIENCE_PHYSICS],
  ["force",           () => SCIENCE_PHYSICS],
  ["newton",          () => SCIENCE_PHYSICS],
  ["motion",          () => SCIENCE_PHYSICS],
  ["electric",        () => SCIENCE_PHYSICS],
  ["wave",            () => SCIENCE_PHYSICS],
  ["chemistr",        () => SCIENCE_CHEMISTRY],
  ["element",         () => SCIENCE_CHEMISTRY],
  ["compound",        () => SCIENCE_CHEMISTRY],
  ["acid",            () => SCIENCE_CHEMISTRY],
  ["reaction",        () => SCIENCE_CHEMISTRY],
  ["periodic",        () => SCIENCE_CHEMISTRY],
  ["biolog",          () => SCIENCE_BIOLOGY],
  ["cell",            () => SCIENCE_BIOLOGY],
  ["dna",             () => SCIENCE_BIOLOGY],
  ["evolution",       () => SCIENCE_BIOLOGY],
  ["organ",           () => SCIENCE_HUMAN_BODY],
  ["human body",      () => SCIENCE_HUMAN_BODY],
  ["heart",           () => SCIENCE_HUMAN_BODY],
  ["blood",           () => SCIENCE_HUMAN_BODY],
  ["bone",            () => SCIENCE_HUMAN_BODY],
  // Social
  ["moral",           () => SOCIAL_MORAL],
  ["value",           () => SOCIAL_MORAL],
  ["kindness",        () => SOCIAL_MORAL],
  ["honest",          () => SOCIAL_MORAL],
  ["emotion",         () => SOCIAL_EMOTIONS],
  ["feeling",         () => SOCIAL_EMOTIONS],
  ["empathy",         () => SOCIAL_EMOTIONS],
  ["friend",          () => SOCIAL_MORAL],
  // Humanities
  ["histor",          () => HUMANITIES_HISTORY],
  ["independen",      () => HUMANITIES_HISTORY],
  ["world war",       () => HUMANITIES_HISTORY],
  ["constitut",       () => HUMANITIES_HISTORY],
  ["geograph",        () => HUMANITIES_GEOGRAPHY],
  ["continent",       () => HUMANITIES_GEOGRAPHY],
  ["river",           () => HUMANITIES_GEOGRAPHY],
  ["mountain",        () => HUMANITIES_GEOGRAPHY],
  ["map",             () => HUMANITIES_GEOGRAPHY],
  ["econom",          () => HUMANITIES_ECONOMICS],
  ["gdp",             () => HUMANITIES_ECONOMICS],
  ["inflation",       () => HUMANITIES_ECONOMICS],
  ["market",          () => HUMANITIES_ECONOMICS],
  ["demand",          () => HUMANITIES_ECONOMICS],
  ["supply",          () => HUMANITIES_ECONOMICS],
  // CS
  ["programming",     () => CS_PROGRAMMING_BASICS],
  ["coding",          () => CS_PROGRAMMING_BASICS],
  ["python",          () => CS_PROGRAMMING_BASICS],
  ["html",            () => CS_PROGRAMMING_BASICS],
  ["css",             () => CS_PROGRAMMING_BASICS],
  ["binary",          () => CS_PROGRAMMING_BASICS],
  ["loop",            () => CS_PROGRAMMING_BASICS],
  ["data structure",  () => CS_DATA_STRUCTURES],
  ["algorithm",       () => CS_DATA_STRUCTURES],
  ["sorting",         () => CS_DATA_STRUCTURES],
  ["array",           () => CS_DATA_STRUCTURES],
  ["stack",           () => CS_DATA_STRUCTURES],
  ["queue",           () => CS_DATA_STRUCTURES],
  ["linked list",     () => CS_DATA_STRUCTURES],
  ["network",         () => CS_NETWORKS],
  ["internet",        () => CS_NETWORKS],
  ["http",            () => CS_NETWORKS],
  ["dns",             () => CS_NETWORKS],
  ["firewall",        () => CS_NETWORKS],
  ["osi",             () => CS_NETWORKS],
  ["database",        () => HIGHER_DBMS],
  ["dbms",            () => HIGHER_DBMS],
  ["sql",             () => HIGHER_DBMS],
  ["normaliz",        () => HIGHER_DBMS],
  ["operating system",() => HIGHER_OS],
  ["os",              () => HIGHER_OS],
  ["process",         () => HIGHER_OS],
  ["scheduling",      () => HIGHER_OS],
  ["deadlock",        () => HIGHER_OS],
  // General
  ["color",           () => GENERAL_COLORS],
  ["colour",          () => GENERAL_COLORS],
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function getQuestionsForTopic(topic: string): Question[] {
  const lower = topic.toLowerCase().trim();
  for (const [keyword, getFn] of KEYWORD_MAP) {
    if (lower.includes(keyword)) return shuffle(getFn()).slice(0, 8);
  }
  return shuffle(SOCIAL_MORAL).slice(0, 8);
}

export function getTopicKey(topic: string): string {
  const lower = topic.toLowerCase().trim();
  const map: [string, string][] = [
    ["fraction","fractions"],["add","addition"],["subtract","subtraction"],
    ["multipl","multiplication"],["shape","shapes"],["count","counting"],
    ["algebra","algebra"],["equation","algebra"],["percent","percentages"],
    ["ratio","ratios"],["proportion","ratios"],["decimal","decimals"],
    ["statistic","statistics"],["probability","statistics"],["mean","statistics"],
    ["trigon","trigonometry"],["sine","trigonometry"],["cosine","trigonometry"],
    ["calculus","calculus"],["derivative","calculus"],
    ["alphabet","alphabet"],["letter","alphabet"],["spell","spelling"],
    ["grammar","grammar"],["read","reading"],
    ["animal","animals"],["plant","plants"],["weather","weather"],["season","weather"],
    ["physics","physics"],["force","physics"],["chemistr","chemistry"],
    ["acid","chemistry"],["biolog","biology"],["cell","biology"],
    ["organ","human_body"],["human body","human_body"],["heart","human_body"],
    ["moral","moral_values"],["kind","moral_values"],["emotion","emotions"],
    ["friend","friendship"],["histor","history"],["geograph","geography"],
    ["continent","geography"],["econom","economics"],["gdp","economics"],
    ["programming","programming"],["coding","programming"],["python","programming"],
    ["html","programming"],["data structure","data_structures"],
    ["algorithm","data_structures"],["sorting","data_structures"],
    ["network","networks"],["internet","networks"],["http","networks"],
    ["database","dbms"],["sql","dbms"],["dbms","dbms"],
    ["operating system","operating_systems"],["deadlock","operating_systems"],
    ["color","colors"],["colour","colors"],
  ];
  for (const [kw, key] of map) {
    if (lower.includes(kw)) return key;
  }
  return "moral_values";
}

export const ALL_TOPICS = Object.entries(TOPIC_INFO).map(([key, info]) => ({ key, ...info }));
