import type { Question } from "./types";

export const ENGLISH_ALPHABET: Question[] = [
  { id:"ea1", type:"mcq", title:"Which letter comes after D?", options:[{id:"a",text:"B",isCorrect:false},{id:"b",text:"E",isCorrect:true},{id:"c",text:"F",isCorrect:false},{id:"d",text:"C",isCorrect:false}], xpReward:10 },
  { id:"ea2", type:"mcq", title:"How many letters are in the English alphabet?", options:[{id:"a",text:"24",isCorrect:false},{id:"b",text:"25",isCorrect:false},{id:"c",text:"26",isCorrect:true},{id:"d",text:"27",isCorrect:false}], xpReward:10 },
  { id:"ea3", type:"mcq", title:"Which of these is a vowel?", options:[{id:"a",text:"B",isCorrect:false},{id:"b",text:"C",isCorrect:false},{id:"c",text:"E",isCorrect:true},{id:"d",text:"D",isCorrect:false}], xpReward:10 },
  { id:"ea4", type:"mcq", title:"What letter does 'Apple' start with?", options:[{id:"a",text:"P",isCorrect:false},{id:"b",text:"A",isCorrect:true},{id:"c",text:"E",isCorrect:false},{id:"d",text:"L",isCorrect:false}], xpReward:10 },
  { id:"ea5", type:"mcq", title:"How many vowels are there?", options:[{id:"a",text:"4",isCorrect:false},{id:"b",text:"5",isCorrect:true},{id:"c",text:"6",isCorrect:false},{id:"d",text:"7",isCorrect:false}], xpReward:10 },
  { id:"ea6", type:"mcq", title:"Which letter comes before Z?", options:[{id:"a",text:"X",isCorrect:false},{id:"b",text:"Y",isCorrect:true},{id:"c",text:"W",isCorrect:false},{id:"d",text:"V",isCorrect:false}], xpReward:10 },
  { id:"ea7", type:"mcq", title:"Which word starts with a vowel?", options:[{id:"a",text:"Ball",isCorrect:false},{id:"b",text:"Cat",isCorrect:false},{id:"c",text:"Elephant",isCorrect:true},{id:"d",text:"Dog",isCorrect:false}], xpReward:10 },
  { id:"ea8", type:"mcq", title:"A, B, C, D, ___ What comes next?", options:[{id:"a",text:"F",isCorrect:false},{id:"b",text:"E",isCorrect:true},{id:"c",text:"G",isCorrect:false},{id:"d",text:"H",isCorrect:false}], xpReward:10 },
];

export const ENGLISH_SPELLING: Question[] = [
  { id:"esp1", type:"mcq", title:"How do you spell the colour of the sky?", options:[{id:"a",text:"Bloo",isCorrect:false},{id:"b",text:"Bleu",isCorrect:false},{id:"c",text:"Blue",isCorrect:true},{id:"d",text:"Bluw",isCorrect:false}], xpReward:10 },
  { id:"esp2", type:"mcq", title:"Which spelling is correct?", options:[{id:"a",text:"Frend",isCorrect:false},{id:"b",text:"Friend",isCorrect:true},{id:"c",text:"Freind",isCorrect:false},{id:"d",text:"Friand",isCorrect:false}], xpReward:10 },
  { id:"esp3", type:"mcq", title:"How do you spell the animal that says 'meow'?", options:[{id:"a",text:"Kat",isCorrect:false},{id:"b",text:"Cat",isCorrect:true},{id:"c",text:"Cet",isCorrect:false},{id:"d",text:"Katt",isCorrect:false}], xpReward:10 },
  { id:"esp4", type:"mcq", title:"Which word is spelled correctly?", options:[{id:"a",text:"Scool",isCorrect:false},{id:"b",text:"Skool",isCorrect:false},{id:"c",text:"School",isCorrect:true},{id:"d",text:"Schoool",isCorrect:false}], xpReward:10 },
  { id:"esp5", type:"mcq", title:"Spell the number after nine:", options:[{id:"a",text:"Tin",isCorrect:false},{id:"b",text:"Ten",isCorrect:true},{id:"c",text:"Tean",isCorrect:false},{id:"d",text:"Tan",isCorrect:false}], xpReward:10 },
  { id:"esp6", type:"mcq", title:"Which is spelled correctly?", options:[{id:"a",text:"Beautifull",isCorrect:false},{id:"b",text:"Beautiful",isCorrect:true},{id:"c",text:"Beautful",isCorrect:false},{id:"d",text:"Beutiful",isCorrect:false}], xpReward:10 },
  { id:"esp7", type:"mcq", title:"How do you spell the opposite of night?", options:[{id:"a",text:"Daye",isCorrect:false},{id:"b",text:"Dai",isCorrect:false},{id:"c",text:"Day",isCorrect:true},{id:"d",text:"Dae",isCorrect:false}], xpReward:10 },
  { id:"esp8", type:"roleplay", title:"Spell It Out!", prompt:"The teacher says a word aloud. Students take turns spelling it out letter by letter. Try these words: HAPPY, BOOK, WATER, TABLE. Who can spell the most correctly?", xpReward:20 },
];

export const ENGLISH_GRAMMAR: Question[] = [
  { id:"eg1", type:"mcq", title:"Which word is a noun?", options:[{id:"a",text:"Run",isCorrect:false},{id:"b",text:"Happy",isCorrect:false},{id:"c",text:"Tree",isCorrect:true},{id:"d",text:"Quickly",isCorrect:false}], xpReward:10 },
  { id:"eg2", type:"mcq", title:"Which word is a verb (action word)?", options:[{id:"a",text:"Chair",isCorrect:false},{id:"b",text:"Jump",isCorrect:true},{id:"c",text:"Red",isCorrect:false},{id:"d",text:"Slowly",isCorrect:false}], xpReward:10 },
  { id:"eg3", type:"mcq", title:"Choose the correct sentence:", options:[{id:"a",text:"The dog run fast.",isCorrect:false},{id:"b",text:"The dog runs fast.",isCorrect:true},{id:"c",text:"The dog running fast.",isCorrect:false},{id:"d",text:"The dogs run fast",isCorrect:false}], xpReward:10 },
  { id:"eg4", type:"mcq", title:"What is a sentence that asks a question called?", options:[{id:"a",text:"Exclamation",isCorrect:false},{id:"b",text:"Statement",isCorrect:false},{id:"c",text:"Question",isCorrect:true},{id:"d",text:"Command",isCorrect:false}], xpReward:10 },
  { id:"eg5", type:"mcq", title:"Which word describes a noun?", options:[{id:"a",text:"Adjective",isCorrect:true},{id:"b",text:"Verb",isCorrect:false},{id:"c",text:"Pronoun",isCorrect:false},{id:"d",text:"Adverb",isCorrect:false}], xpReward:10 },
  { id:"eg6", type:"mcq", title:"Complete: I ___ a student.", options:[{id:"a",text:"is",isCorrect:false},{id:"b",text:"are",isCorrect:false},{id:"c",text:"am",isCorrect:true},{id:"d",text:"be",isCorrect:false}], xpReward:10 },
  { id:"eg7", type:"mcq", title:"Which sentence uses a capital letter correctly?", options:[{id:"a",text:"my name is raj.",isCorrect:false},{id:"b",text:"My name is Raj.",isCorrect:true},{id:"c",text:"my name Is raj.",isCorrect:false},{id:"d",text:"My Name Is Raj.",isCorrect:false}], xpReward:10 },
  { id:"eg8", type:"mcq", title:"What punctuation ends a statement?", options:[{id:"a",text:"?",isCorrect:false},{id:"b",text:"!",isCorrect:false},{id:"c",text:".",isCorrect:true},{id:"d",text:",",isCorrect:false}], xpReward:10 },
];

export const ENGLISH_READING: Question[] = [
  { id:"er1", type:"story", title:"The Little Seed", body:"A tiny seed was planted in the ground. It rained every day. The sun shone brightly. One morning, a small green shoot pushed through the soil.", options:[{id:"a",text:"It needs darkness only",isCorrect:false},{id:"b",text:"It needs water and sunlight",isCorrect:true},{id:"c",text:"It needs snow",isCorrect:false},{id:"d",text:"It needs no water",isCorrect:false}], xpReward:15 },
  { id:"er2", type:"story", title:"The Lost Puppy", body:"Mia found a small puppy sitting alone near the park. It had no collar. Mia gave it water and asked her neighbours if it belonged to anyone.", options:[{id:"a",text:"Mia was unkind",isCorrect:false},{id:"b",text:"Mia showed kindness to the puppy",isCorrect:true},{id:"c",text:"Mia ignored the puppy",isCorrect:false},{id:"d",text:"Mia was scared of the puppy",isCorrect:false}], xpReward:15 },
  { id:"er3", type:"mcq", title:"What does the word 'big' mean?", options:[{id:"a",text:"Small",isCorrect:false},{id:"b",text:"Fast",isCorrect:false},{id:"c",text:"Large",isCorrect:true},{id:"d",text:"Short",isCorrect:false}], xpReward:10 },
  { id:"er4", type:"mcq", title:"What is the opposite of 'hot'?", options:[{id:"a",text:"Warm",isCorrect:false},{id:"b",text:"Cool",isCorrect:false},{id:"c",text:"Cold",isCorrect:true},{id:"d",text:"Fire",isCorrect:false}], xpReward:10 },
  { id:"er5", type:"mcq", title:"Which word rhymes with 'cat'?", options:[{id:"a",text:"Dog",isCorrect:false},{id:"b",text:"Hat",isCorrect:true},{id:"c",text:"Cup",isCorrect:false},{id:"d",text:"Car",isCorrect:false}], xpReward:10 },
  { id:"er6", type:"mcq", title:"What does 'happy' mean?", options:[{id:"a",text:"Angry",isCorrect:false},{id:"b",text:"Sad",isCorrect:false},{id:"c",text:"Joyful",isCorrect:true},{id:"d",text:"Tired",isCorrect:false}], xpReward:10 },
  { id:"er7", type:"roleplay", title:"Read Aloud", prompt:"Each student reads one sentence from the story on the board. The class listens carefully and decides: is the story happy, sad, or exciting?", xpReward:20 },
  { id:"er8", type:"mcq", title:"What word means 'to move quickly on your feet'?", options:[{id:"a",text:"Walk",isCorrect:false},{id:"b",text:"Crawl",isCorrect:false},{id:"c",text:"Run",isCorrect:true},{id:"d",text:"Sit",isCorrect:false}], xpReward:10 },
];
