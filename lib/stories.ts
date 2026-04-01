export interface StoryPage {
  pageNum: number;
  text: string;
  emoji: string;
  question?: {
    text: string;
    options: { id: string; text: string; isCorrect: boolean }[];
  };
}

export interface Story {
  id: string;
  topicKey: string;
  title: string;
  coverEmoji: string;
  subject: string;
  gradeLevel: string;
  totalXP: number;
  moral: string;
  pages: StoryPage[];
}

export const STORIES: Story[] = [
  {
    id: "the-honest-farmer",
    topicKey: "moral_values",
    title: "The Honest Farmer",
    coverEmoji: "🌾",
    subject: "Moral Values",
    gradeLevel: "Grade 2-5",
    totalXP: 60,
    moral: "Honesty is always the right choice, even when it is hard.",
    pages: [
      { pageNum: 1, emoji: "🚶", text: "Once upon a time, in a small village, there lived a kind farmer named Kofi. Every morning, he walked to the market to sell his vegetables." },
      { pageNum: 2, emoji: "👜", text: "One morning, while walking along the dusty road, Kofi spotted a large bag. He looked around — there was no one nearby. He picked it up.", question: { text: "What do you think Kofi found in the bag?", options: [{ id:"a", text:"Vegetables", isCorrect:false }, { id:"b", text:"Gold coins and a note", isCorrect:true }, { id:"c", text:"Stones", isCorrect:false }, { id:"d", text:"An empty bag", isCorrect:false }] } },
      { pageNum: 3, emoji: "💰", text: "Inside were gold coins — many of them! There was also a note: 'Reward offered for safe return. — The Merchant.' Kofi's eyes grew wide." },
      { pageNum: 4, emoji: "💭", text: "Kofi felt tempted. 'No one saw me take this,' he thought. 'I could keep it and buy a new plough.' But something inside him felt wrong.", question: { text: "What feeling was telling Kofi not to keep the money?", options: [{ id:"a", text:"Hunger", isCorrect:false }, { id:"b", text:"His conscience — his inner sense of right and wrong", isCorrect:true }, { id:"c", text:"Fear of being caught", isCorrect:false }, { id:"d", text:"He didn't feel anything", isCorrect:false }] } },
      { pageNum: 5, emoji: "🏠", text: "Kofi walked to the merchant's house and knocked on the door. The merchant opened it with a worried face. When he saw the bag, his eyes filled with tears of relief." },
      { pageNum: 6, emoji: "🤝", text: "'You could have kept it!' said the merchant. 'Why did you return it?' Kofi smiled simply: 'Because it was not mine. Sleeping peacefully is worth more than any gold.'" },
      { pageNum: 7, emoji: "🌟", text: "The merchant gave Kofi a generous reward. But Kofi's greatest reward was his own peace of mind — and the reputation for honesty that spread across the whole village.", question: { text: "What was Kofi's greatest reward?", options: [{ id:"a", text:"The gold coins", isCorrect:false }, { id:"b", text:"A new plough", isCorrect:false }, { id:"c", text:"His peace of mind and reputation for honesty", isCorrect:true }, { id:"d", text:"The merchant's friendship only", isCorrect:false }] } },
    ],
  },
  {
    id: "the-clever-tortoise",
    topicKey: "moral_values",
    title: "The Clever Tortoise",
    coverEmoji: "🐢",
    subject: "Life Skills",
    gradeLevel: "Grade 1-4",
    totalXP: 50,
    moral: "Slow and steady wins the race. Never give up.",
    pages: [
      { pageNum: 1, emoji: "🐢", text: "A tortoise lived near a wide, rushing river. More than anything, he wanted to visit his family on the other side. But all the animals laughed at him." },
      { pageNum: 2, emoji: "😂", text: "'You are too slow!' said the rabbit. 'The current will sweep you away!' said the parrot. 'Give up now!' said the fox. The tortoise looked at the river quietly.", question: { text: "How do you think the tortoise felt when the animals laughed?", options: [{ id:"a", text:"He didn't care at all", isCorrect:false }, { id:"b", text:"Probably sad, but determined not to give up", isCorrect:true }, { id:"c", text:"Angry and ready to fight", isCorrect:false }, { id:"d", text:"Happy that they noticed him", isCorrect:false }] } },
      { pageNum: 3, emoji: "🚶", text: "The tortoise said nothing. He took one step forward. Then another. Then another. Slowly, steadily, he moved toward the river." },
      { pageNum: 4, emoji: "🌧️", text: "Rain came. The path became muddy. Wind blew against his shell. Other animals turned back or found shelter. The tortoise kept going — one step at a time." },
      { pageNum: 5, emoji: "🏆", text: "When the tortoise finally arrived, his family cheered with joy. The rabbit, who had run ahead laughing, had gotten distracted along the way and never arrived at all.", question: { text: "What helped the tortoise succeed where the faster animals failed?", options: [{ id:"a", text:"Being the fastest", isCorrect:false }, { id:"b",  text:"Having the most friends", isCorrect:false }, { id:"c", text:"Consistency and never giving up", isCorrect:true }, { id:"d", text:"Being lucky", isCorrect:false }] } },
      { pageNum: 6, emoji: "💪", text: "The tortoise smiled at his family. 'How did you do it?' they asked. He replied: 'I never asked if I could do it. I just kept going.'", },
    ],
  },
  {
    id: "the-little-seed",
    topicKey: "plants",
    title: "The Little Seed",
    coverEmoji: "🌱",
    subject: "Science — Plants",
    gradeLevel: "Grade 1-3",
    totalXP: 50,
    moral: "Good things take time, water, and care to grow.",
    pages: [
      { pageNum: 1, emoji: "🌬️", text: "A tiny seed fell from a tall sunflower and drifted down to the dark soil below. It was cold and quiet underground." },
      { pageNum: 2, emoji: "💧", text: "Days passed. Then rain came — soft, warm rain that soaked into the earth. The seed felt the water and began to wake up.", question: { text: "What did the rain do for the seed?", options: [{ id:"a", text:"Washed it away", isCorrect:false }, { id:"b", text:"Gave it the water it needed to start growing", isCorrect:true }, { id:"c", text:"Nothing — seeds don't need water", isCorrect:false }, { id:"d", text:"Made it cold", isCorrect:false }] } },
      { pageNum: 3, emoji: "⬇️", text: "First, tiny roots pushed downward, searching for more water and minerals. The roots held the seed firmly in place in the soil." },
      { pageNum: 4, emoji: "☀️", text: "Then a small green shoot curled upward, reaching for the sunlight above. Every day it grew a little more, a little taller.", question: { text: "What does the shoot grow toward?", options: [{ id:"a", text:"Water underground", isCorrect:false }, { id:"b", text:"Darkness", isCorrect:false }, { id:"c", text:"Sunlight", isCorrect:true }, { id:"d", text:"Wind", isCorrect:false }] } },
      { pageNum: 5, emoji: "🌻", text: "Weeks later, a beautiful sunflower stood tall, its golden petals bright in the sunshine. From one tiny seed, a magnificent plant had grown." },
      { pageNum: 6, emoji: "🌱", text: "And at the centre of the flower, new seeds began to form — ready to fall and begin the journey all over again. That is the cycle of life.", question: { text: "What does a plant need to grow? (Select the best answer)", options: [{ id:"a", text:"Only sunlight", isCorrect:false }, { id:"b", text:"Water, sunlight, soil and air", isCorrect:true }, { id:"c", text:"Only water", isCorrect:false }, { id:"d", text:"Nothing — they grow on their own", isCorrect:false }] } },
    ],
  },
  {
    id: "the-sharing-village",
    topicKey: "friendship",
    title: "The Sharing Village",
    coverEmoji: "🏘️",
    subject: "Moral Values",
    gradeLevel: "Grade 2-5",
    totalXP: 55,
    moral: "We are stronger when we work together and share.",
    pages: [
      { pageNum: 1, emoji: "🔒", text: "Long ago, in a village surrounded by mango trees, each family kept their food locked away. 'What is mine is mine,' they said. No one shared with anyone." },
      { pageNum: 2, emoji: "☀️", text: "One year, the rains came late. The crops were small and dry. Families looked at their small stores of food and worried. There was not enough.", question: { text: "Why was there not enough food?", options: [{ id:"a", text:"People were being greedy", isCorrect:false }, { id:"b", text:"The rains were late and crops were poor", isCorrect:true }, { id:"c", text:"Animals ate all the food", isCorrect:false }, { id:"d", text:"The village was too big", isCorrect:false }] } },
      { pageNum: 3, emoji: "👵", text: "Old Mama Ama called everyone to gather in the square. She carried her small pot of soup to the centre and put it down. Everyone looked at each other." },
      { pageNum: 4, emoji: "🥕", text: "'Add what you have,' she said softly. One family brought cassava. Another brought fish. Another added tomatoes and spice. One by one, everyone contributed.", question: { text: "What did Mama Ama ask the villagers to do?", options: [{ id:"a", text:"Buy food from town", isCorrect:false }, { id:"b", text:"Keep their food locked away", isCorrect:false }, { id:"c", text:"Each add what they had to make a shared meal", isCorrect:true }, { id:"d", text:"Eat less food", isCorrect:false }] } },
      { pageNum: 5, emoji: "🍲", text: "Together, they made a great feast that fed the whole village. Children laughed. Elders smiled. There was even food left over." },
      { pageNum: 6, emoji: "🌅", text: "From that day on, the village shared everything — work, food, and celebrations. They never went hungry again. United, they were unbreakable.", question: { text: "What lesson did the village learn?", options: [{ id:"a", text:"Cooking is more important than farming", isCorrect:false }, { id:"b", text:"Old people always know best", isCorrect:false }, { id:"c", text:"Sharing and working together makes everyone stronger", isCorrect:true }, { id:"d", text:"Soup tastes better than cassava", isCorrect:false }] } },
    ],
  },
  {
    id: "the-brave-student",
    topicKey: "emotions",
    title: "The Brave Student",
    coverEmoji: "🎓",
    subject: "Emotions",
    gradeLevel: "Grade 2-5",
    totalXP: 55,
    moral: "It takes courage to ask for help — and asking makes you stronger.",
    pages: [
      { pageNum: 1, emoji: "📚", text: "Ama was excellent at reading and drawing. But mathematics made her stomach feel tight with worry. Numbers danced around on the page and refused to make sense." },
      { pageNum: 2, emoji: "😰", text: "In class one day, the teacher explained fractions. All around Ama, heads nodded. But Ama's mind was foggy. She did not understand — and she felt ashamed to say so.", question: { text: "Why was Ama afraid to speak up?", options: [{ id:"a", text:"She was being lazy", isCorrect:false }, { id:"b", text:"She was afraid people would think she was not smart", isCorrect:true }, { id:"c", text:"She didn't care about maths", isCorrect:false }, { id:"d", text:"The teacher was unkind", isCorrect:false }] } },
      { pageNum: 3, emoji: "🌙", text: "That night, Ama could not sleep. She kept looking at the fraction problems. She tried different ways. Nothing worked. Her notebook had many crossings-out." },
      { pageNum: 4, emoji: "💪", text: "The next day, Ama took a deep breath. She raised her hand slowly. 'Teacher,' she said quietly, 'I don't understand. Can you explain it again?' The whole class went still.", question: { text: "What did it take for Ama to ask the question?", options: [{ id:"a", text:"Anger", isCorrect:false }, { id:"b", text:"Courage and overcoming her fear of being judged", isCorrect:true }, { id:"c", text:"The teacher forcing her", isCorrect:false }, { id:"d", text:"Her parents told her to", isCorrect:false }] } },
      { pageNum: 5, emoji: "🌟", text: "The teacher smiled warmly. 'That is the most important question anyone has asked today,' she said. She explained it slowly with a drawing. This time, Ama understood completely." },
      { pageNum: 6, emoji: "🎉", text: "Afterwards, three other students came to Ama quietly. 'I didn't understand either,' one whispered. 'Thank you for asking.' Ama realised: asking for help helps everyone.", question: { text: "What did Ama's brave question do for the class?", options: [{ id:"a", text:"Made others feel embarrassed", isCorrect:false }, { id:"b", text:"Wasted everyone's time", isCorrect:false }, { id:"c", text:"Helped others who were also confused but afraid to ask", isCorrect:true }, { id:"d", text:"Made the teacher upset", isCorrect:false }] } },
    ],
  },
];

// story access functions defined below after new stories

// ── 4 NEW STORIES ─────────────────────────────────────────────────────────────

const NEW_STORIES: Story[] = [
  {
    id: "the-river-and-the-stone",
    topicKey: "emotions",
    title: "The River and the Stone",
    coverEmoji: "🪨",
    subject: "Life Skills",
    gradeLevel: "Grade 3–6",
    totalXP: 60,
    moral: "Patience and persistence can overcome any obstacle.",
    pages: [
      { pageNum:1, emoji:"🌊", text:"Deep in a mountain valley, a strong river flowed. In its path sat a massive boulder that had fallen long ago, blocking the water's way." },
      { pageNum:2, emoji:"💭", text:"The water was frustrated. It crashed against the rock day after day — splash after splash — but the boulder never moved.", question:{ text:"What was the river feeling?", options:[{id:"a",text:"Happy and peaceful",isCorrect:false},{id:"b",text:"Frustrated because something blocked its way",isCorrect:true},{id:"c",text:"Tired and ready to stop",isCorrect:false},{id:"d",text:"Angry at the mountain",isCorrect:false}] } },
      { pageNum:3, emoji:"🔄", text:"But instead of giving up, the river tried something different. It didn't crash — it flowed patiently around the edges of the rock, finding the tiniest cracks." },
      { pageNum:4, emoji:"✨", text:"Over months, the water slowly carved those tiny cracks wider. The rock started to smooth. What once seemed impossible was, little by little, changing.", question:{ text:"What did the river do instead of giving up?", options:[{id:"a",text:"It found another valley",isCorrect:false},{id:"b",text:"It waited for rain to wash the rock away",isCorrect:false},{id:"c",text:"It patiently worked around the rock, finding small cracks",isCorrect:true},{id:"d",text:"It asked for help from other rivers",isCorrect:false}] } },
      { pageNum:5, emoji:"🏆", text:"One day, the boulder split cleanly in two. The river flowed freely through the gap it had created — not through force, but through patience and persistence." },
      { pageNum:6, emoji:"💪", text:"The valley animals watched in wonder. A small fish said: 'You were never stopped. You just had to find the right way.' The river smiled as it flowed onwards.", question:{ text:"What is the lesson from the river and the stone?", options:[{id:"a",text:"Water is stronger than rock",isCorrect:false},{id:"b",text:"Patience and persistence can overcome any obstacle",isCorrect:true},{id:"c",text:"You should always find an easier path",isCorrect:false},{id:"d",text:"Boulders eventually move on their own",isCorrect:false}] } },
    ],
  },
  {
    id: "the-two-brothers",
    topicKey: "moral_values",
    title: "The Two Brothers and the Mango Tree",
    coverEmoji: "🥭",
    subject: "Moral Values",
    gradeLevel: "Grade 2–5",
    totalXP: 55,
    moral: "Greed destroys what love has built. Sharing brings more than taking.",
    pages: [
      { pageNum:1, emoji:"🌳", text:"Two brothers, Raju and Mohan, shared a small farm with a magnificent mango tree. Every year it gave them enough fruit to sell and eat for months." },
      { pageNum:2, emoji:"😤", text:"One dry summer, Raju became greedy. 'I do more work,' he told himself. 'I deserve more mangoes.' He began secretly picking fruit at night before Mohan woke up.", question:{ text:"Why was Raju's thinking a problem?", options:[{id:"a",text:"He was wrong about working more",isCorrect:false},{id:"b",text:"Taking more than your fair share secretly is dishonest and greedy",isCorrect:true},{id:"c",text:"Mangoes are not valuable enough to share",isCorrect:false},{id:"d",text:"Mohan was also being greedy",isCorrect:false}] } },
      { pageNum:3, emoji:"🌱", text:"Mohan noticed the tree was being stripped. He said nothing but planted extra seeds and watered the farm in the evenings — tending to what they both shared." },
      { pageNum:4, emoji:"🌧️", text:"That autumn, a heavy storm damaged half the farm. Raju's secret mango stockpile had already rotted — stored too quickly without care. He had nothing left.", question:{ text:"What happened to Raju's greedy plan?", options:[{id:"a",text:"He became very rich",isCorrect:false},{id:"b",text:"The stolen mangoes rotted and he was left with nothing",isCorrect:true},{id:"c",text:"He shared with Mohan after all",isCorrect:false},{id:"d",text:"The storm didn't affect his mangoes",isCorrect:false}] } },
      { pageNum:5, emoji:"🤝", text:"Mohan's new plants survived the storm. He walked to Raju: 'I know what you did. But you are still my brother. Take half of mine.' Raju felt deep shame — and deep gratitude." },
      { pageNum:6, emoji:"🌅", text:"From that day, the brothers worked together, shared everything equally, and the tree grew larger than it ever had. They called it 'the giving tree' — because giving is what made it grow.", question:{ text:"What made the mango tree grow larger than ever?", options:[{id:"a",text:"Better soil",isCorrect:false},{id:"b",text:"The storm brought more rain",isCorrect:false},{id:"c",text:"The brothers working together and sharing equally",isCorrect:true},{id:"d",text:"Planting more trees nearby",isCorrect:false}] } },
    ],
  },
  {
    id: "the-stars-and-the-shepherd",
    topicKey: "history",
    title: "The Stars and the Shepherd Boy",
    coverEmoji: "⭐",
    subject: "Science",
    gradeLevel: "Grade 3–6",
    totalXP: 65,
    moral: "Curiosity and observation are the seeds of all great discovery.",
    pages: [
      { pageNum:1, emoji:"🌙", text:"A shepherd boy named Dhruv spent every night watching the sky. While others slept, he lay on the hillside and mapped the stars in a notebook his teacher had given him." },
      { pageNum:2, emoji:"🔭", text:"He noticed something strange: most stars moved slowly across the sky each night — but one star always stayed perfectly still, directly north. He called it his 'anchor star'.", question:{ text:"Why was Dhruv's observation important?", options:[{id:"a",text:"Stars are only beautiful",isCorrect:false},{id:"b",text:"He discovered that one star stays fixed — which could be used for navigation",isCorrect:true},{id:"c",text:"He was counting how many stars there are",isCorrect:false},{id:"d",text:"He was trying to find a new planet",isCorrect:false}] } },
      { pageNum:3, emoji:"🌍", text:"Dhruv shared his discovery with travellers passing through the village. They tested it — and they could indeed use the anchor star to find north, even without a map." },
      { pageNum:4, emoji:"📖", text:"A visiting scholar heard about the boy's discovery and came to meet him. 'How did you figure this out?' he asked. Dhruv smiled: 'I just paid attention. Every night. For two years.'", question:{ text:"What did Dhruv use to make his discovery?", options:[{id:"a",text:"An expensive telescope",isCorrect:false},{id:"b",text:"Instructions from a book",isCorrect:false},{id:"c",text:"Patient observation over two years",isCorrect:true},{id:"d",text:"Help from other scientists",isCorrect:false}] } },
      { pageNum:5, emoji:"🧭", text:"The anchor star — what we today call Polaris or the North Star — has guided sailors, explorers, and travellers for thousands of years. All because someone looked up and paid attention." },
      { pageNum:6, emoji:"💫", text:"Dhruv became a great astronomer. On his old notebook's cover he wrote: 'The sky is a classroom with no walls and no end — and it teaches anyone who is curious enough to look.'", question:{ text:"What is the main lesson of Dhruv's story?", options:[{id:"a",text:"You need expensive tools to make discoveries",isCorrect:false},{id:"b",text:"Only scholars can understand the sky",isCorrect:false},{id:"c",text:"Curiosity and patient observation are the roots of all great discovery",isCorrect:true},{id:"d",text:"The North Star is the brightest star in the sky",isCorrect:false}] } },
    ],
  },
  {
    id: "the-girl-who-fixed-the-bridge",
    topicKey: "cs",
    title: "The Girl Who Fixed the Bridge",
    coverEmoji: "🌉",
    subject: "Life Skills",
    gradeLevel: "Grade 4–7",
    totalXP: 70,
    moral: "Break any big problem into small steps and you can solve it.",
    pages: [
      { pageNum:1, emoji:"🏘️", text:"The village of Sundarpur had a broken bridge. Without it, children couldn't cross the river to reach school. Adults couldn't get goods to the market. The whole village was stuck." },
      { pageNum:2, emoji:"😰", text:"The elders held meetings but always ended in arguments about how to fix it. 'It's too big a problem!' said one. 'We don't have the right tools!' said another. Nothing was decided.", question:{ text:"Why was the village stuck?", options:[{id:"a",text:"They had no money",isCorrect:false},{id:"b",text:"People argued and never broke the problem into steps they could actually solve",isCorrect:true},{id:"c",text:"They didn't want to fix the bridge",isCorrect:false},{id:"d",text:"The river was too fast to bridge",isCorrect:false}] } },
      { pageNum:3, emoji:"👧", text:"A twelve-year-old girl named Preethi grabbed a notebook. She walked to the bridge and wrote down every specific problem she could see: 'Three planks missing. Two ropes frayed. One post tilting.'" },
      { pageNum:4, emoji:"📋", text:"Then she made a list of who in the village could solve each small problem: the carpenter, the farmer with extra rope, the mason with cement. She visited each person.", question:{ text:"What was Preethi's approach to the problem?", options:[{id:"a",text:"She asked for money from the government",isCorrect:false},{id:"b",text:"She broke the big problem into specific small problems and matched each to someone who could solve it",isCorrect:true},{id:"c",text:"She built the bridge alone",isCorrect:false},{id:"d",text:"She convinced everyone to move to another village",isCorrect:false}] } },
      { pageNum:5, emoji:"🔨", text:"Over three weekends, each person fixed their part. The carpenter replaced the planks. The farmer brought rope. The mason reset the post. Preethi coordinated every step." },
      { pageNum:6, emoji:"🎉", text:"On the day the bridge opened, the village gathered to celebrate. An elder asked: 'How did you solve what we couldn't?' Preethi held up her notebook: 'I stopped thinking about the whole bridge. I just fixed one plank at a time.'", question:{ text:"What is the key lesson from Preethi's story?", options:[{id:"a",text:"Children are smarter than adults",isCorrect:false},{id:"b",text:"Any big problem can be solved by breaking it into small steps",isCorrect:true},{id:"c",text:"You need special tools to build bridges",isCorrect:false},{id:"d",text:"Working alone is better than working in groups",isCorrect:false}] } },
    ],
  },
];

// Merge into the existing STORIES array export
// Note: STORIES is already exported above; we re-export getAllStories with combined data

const ALL_STORIES_COMBINED = [...STORIES, ...NEW_STORIES];

export function getAllStories(): Story[] {
  return ALL_STORIES_COMBINED;
}

export function getStoryById(id: string): Story | null {
  return ALL_STORIES_COMBINED.find(s => s.id === id) ?? null;
}

export function getStoriesByTopic(topicKey: string): Story[] {
  return ALL_STORIES_COMBINED.filter(s => s.topicKey === topicKey);
}
