import type { Question } from "./game-types";

// Default life skills question bank
// Teachers can use these out of the box — future versions will allow custom questions

export const DEFAULT_QUESTIONS: Question[] = [
  {
    id: "q1",
    type: "mcq",
    title: "What should you do if your friend is feeling sad?",
    options: [
      { id: "a", text: "Ignore them", isCorrect: false },
      { id: "b", text: "Ask if they are okay and listen", isCorrect: true },
      { id: "c", text: "Laugh at them", isCorrect: false },
      { id: "d", text: "Walk away", isCorrect: false },
    ],
    xpReward: 10,
  },
  {
    id: "q2",
    type: "mcq",
    title: "Someone drops their books in the hallway. What do you do?",
    options: [
      { id: "a", text: "Keep walking", isCorrect: false },
      { id: "b", text: "Laugh with friends", isCorrect: false },
      { id: "c", text: "Help them pick up the books", isCorrect: true },
      { id: "d", text: "Step over them", isCorrect: false },
    ],
    xpReward: 10,
  },
  {
    id: "q3",
    type: "story",
    title: "Ravi's Difficult Day",
    body: `Ravi came to class looking very quiet today. He didn't eat his lunch and kept his head down. His friend Priya noticed but wasn't sure what to do — she didn't want to embarrass him in front of everyone.`,
    options: [
      { id: "a", text: "Pretend not to notice", isCorrect: false },
      { id: "b", text: "Quietly ask Ravi if he wants to talk later", isCorrect: true },
      { id: "c", text: "Tell the whole class Ravi looks sad", isCorrect: false },
      { id: "d", text: "Tell a joke loudly to cheer everyone up", isCorrect: false },
    ],
    xpReward: 10,
  },
  {
    id: "q4",
    type: "mcq",
    title: "You made a mistake that hurt a friend's feelings. What is the best first step?",
    options: [
      { id: "a", text: "Hope they forget about it", isCorrect: false },
      { id: "b", text: "Blame someone else", isCorrect: false },
      { id: "c", text: "Say sorry and mean it", isCorrect: true },
      { id: "d", text: "Avoid them", isCorrect: false },
    ],
    xpReward: 10,
  },
  {
    id: "q5",
    type: "mcq",
    title: "How do you feel when someone shares something with you?",
    options: [
      { id: "a", text: "Annoyed", isCorrect: false },
      { id: "b", text: "Happy and valued", isCorrect: true },
      { id: "c", text: "Confused", isCorrect: false },
      { id: "d", text: "Scared", isCorrect: false },
    ],
    xpReward: 10,
  },
  {
    id: "q6",
    type: "story",
    title: "The New Student",
    body: `A new student named Meena joined the class today. She sat alone at lunch and didn't talk to anyone. Some students stared, and others whispered to each other. Meena looked uncomfortable.`,
    options: [
      { id: "a", text: "Continue eating with your usual group", isCorrect: false },
      { id: "b", text: "Go sit with Meena and introduce yourself", isCorrect: true },
      { id: "c", text: "Whisper about her with your friends", isCorrect: false },
      { id: "d", text: "Wait for the teacher to introduce her", isCorrect: false },
    ],
    xpReward: 10,
  },
  {
    id: "q7",
    type: "roleplay",
    title: "Role Play: The Lost Book",
    prompt: `Act out this situation:\n\nYour classmate Anil lost his textbook before an important test. He is very worried. You have already finished studying.\n\nWhat do you do? Show us!`,
    xpReward: 20,
  },
  {
    id: "q8",
    type: "mcq",
    title: "When you feel angry, what is the best thing to do first?",
    options: [
      { id: "a", text: "Shout at the nearest person", isCorrect: false },
      { id: "b", text: "Take a deep breath and count to 10", isCorrect: true },
      { id: "c", text: "Throw something", isCorrect: false },
      { id: "d", text: "Run away", isCorrect: false },
    ],
    xpReward: 10,
  },
  {
    id: "q9",
    type: "roleplay",
    title: "Role Play: Saying Sorry",
    prompt: `Act out this situation:\n\nYou accidentally bumped into a younger student and made them drop their tiffin box. Food spilled everywhere. They are about to cry.\n\nHow do you handle this?`,
    xpReward: 20,
  },
  {
    id: "q10",
    type: "mcq",
    title: "What does it mean to be a good listener?",
    options: [
      { id: "a", text: "Waiting for your turn to talk", isCorrect: false },
      { id: "b", text: "Looking at your phone", isCorrect: false },
      { id: "c", text: "Giving full attention and not interrupting", isCorrect: true },
      { id: "d", text: "Nodding even if you don't understand", isCorrect: false },
    ],
    xpReward: 10,
  },
];

export const ROLEPLAY_QUESTIONS = DEFAULT_QUESTIONS.filter(q => q.type === "roleplay");
export const REGULAR_QUESTIONS = DEFAULT_QUESTIONS.filter(q => q.type !== "roleplay");
