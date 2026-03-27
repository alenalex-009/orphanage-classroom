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

export function getStoryById(id: string): Story | null {
  return STORIES.find(s => s.id === id) ?? null;
}

export function getStoriesByTopic(topicKey: string): Story[] {
  return STORIES.filter(s => s.topicKey === topicKey);
}

export function getAllStories(): Story[] {
  return STORIES;
}
