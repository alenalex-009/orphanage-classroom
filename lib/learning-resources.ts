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
  {
    topicKey: "fractions",
    title: "Fractions",
    emoji: "🍕",
    gradeLevel: "Grade 3-4",
    subject: "Math",
    introduction: "A fraction shows part of a whole thing. Imagine cutting a pizza into equal slices — each slice is a fraction of the whole pizza!",
    keyFacts: [
      "The TOP number is called the Numerator — it tells us how many parts we have",
      "The BOTTOM number is called the Denominator — it tells us how many equal parts in total",
      "½ means 1 out of 2 equal parts",
      "¼ means 1 out of 4 equal parts",
      "When the top equals the bottom (like 4/4), it equals ONE whole",
    ],
    steps: [
      { step: 1, text: "Look at the fraction — how many parts are there in total? (bottom number)", emoji: "👇" },
      { step: 2, text: "How many parts are we talking about? (top number)", emoji: "☝️" },
      { step: 3, text: "Draw it! A circle cut into that many equal parts helps you see it clearly", emoji: "✏️" },
    ],
    examples: [
      { question: "What is ½ of 8?", answer: "4", explanation: "Half of 8 means divide 8 by 2. 8 ÷ 2 = 4" },
      { question: "A cake has 8 slices. 3 are eaten. What fraction is left?", answer: "5/8", explanation: "8 total slices, 5 remain. So 5 out of 8 = 5/8" },
      { question: "Which is bigger: ½ or ¼?", answer: "½ is bigger", explanation: "If you cut something into 2 parts, each piece is bigger than if you cut it into 4 parts" },
    ],
    vocabulary: [
      { word: "Numerator", meaning: "The top number in a fraction" },
      { word: "Denominator", meaning: "The bottom number in a fraction" },
      { word: "Whole", meaning: "A complete thing, not divided" },
      { word: "Equal parts", meaning: "Pieces that are exactly the same size" },
    ],
    funFact: "🌍 Ancient Egyptians used fractions over 3,000 years ago to divide food fairly!",
    practiceHint: "Draw a circle, cut it into equal parts, and colour some of them — that's your fraction!",
  },
  {
    topicKey: "addition",
    title: "Addition",
    emoji: "➕",
    gradeLevel: "Grade 1-3",
    subject: "Math",
    introduction: "Addition means putting numbers together to find the total. When you add, you always get a bigger number!",
    keyFacts: [
      "The + sign means 'add' or 'plus'",
      "The answer to an addition sum is called the 'sum' or 'total'",
      "Adding 0 to any number keeps it the same (5 + 0 = 5)",
      "You can add numbers in any order: 3 + 5 = 5 + 3 = 8",
      "Adding makes numbers bigger",
    ],
    steps: [
      { step: 1, text: "Start with the bigger number", emoji: "🔢" },
      { step: 2, text: "Count on from it using the smaller number", emoji: "🖐️" },
      { step: 3, text: "The number you stop at is your answer!", emoji: "🎯" },
    ],
    examples: [
      { question: "7 + 5 = ?", answer: "12", explanation: "Start at 7, count on 5 more: 8, 9, 10, 11, 12" },
      { question: "23 + 14 = ?", answer: "37", explanation: "Add the ones: 3+4=7. Add the tens: 20+10=30. Total = 37" },
      { question: "Riya has 8 apples. She gets 6 more. How many?", answer: "14", explanation: "8 + 6 = 14" },
    ],
    vocabulary: [
      { word: "Add", meaning: "Put numbers together" },
      { word: "Sum / Total", meaning: "The answer when you add" },
      { word: "Plus (+)", meaning: "The symbol for addition" },
    ],
    funFact: "🧠 When you use your fingers to count, you are using one of the oldest maths tools in history!",
    practiceHint: "Use objects like pencils or stones to count — put groups together and count them all!",
  },
  {
    topicKey: "subtraction",
    title: "Subtraction",
    emoji: "➖",
    gradeLevel: "Grade 1-3",
    subject: "Math",
    introduction: "Subtraction means taking away. When we subtract, we find out how many are left after some are removed.",
    keyFacts: [
      "The − sign means 'subtract' or 'minus'",
      "The answer is called the 'difference'",
      "Subtracting 0 keeps the number the same (9 − 0 = 9)",
      "Subtraction makes numbers smaller",
      "Check your answer by adding back: 8 − 3 = 5, so 5 + 3 should = 8",
    ],
    steps: [
      { step: 1, text: "Start with the big number", emoji: "🔢" },
      { step: 2, text: "Count backward the number of times shown", emoji: "⬅️" },
      { step: 3, text: "Where you stop is the answer", emoji: "🎯" },
    ],
    examples: [
      { question: "15 − 7 = ?", answer: "8", explanation: "Start at 15, count back 7: 14,13,12,11,10,9,8" },
      { question: "10 birds on a tree, 4 fly away. How many left?", answer: "6", explanation: "10 − 4 = 6" },
      { question: "50 − 25 = ?", answer: "25", explanation: "50 minus 25 = 25. They are equal halves!" },
    ],
    vocabulary: [
      { word: "Subtract", meaning: "Take away from a number" },
      { word: "Difference", meaning: "The answer when you subtract" },
      { word: "Minus (−)", meaning: "The symbol for subtraction" },
    ],
    funFact: "📊 Shopkeepers used subtraction long before calculators existed to give correct change!",
    practiceHint: "Put some sweets out, take some away, and count what's left — that's subtraction!",
  },
  {
    topicKey: "multiplication",
    title: "Multiplication",
    emoji: "✖️",
    gradeLevel: "Grade 3-4",
    subject: "Math",
    introduction: "Multiplication is a fast way to add the same number many times. 4 × 3 is the same as 3 + 3 + 3 + 3!",
    keyFacts: [
      "× means 'times' or 'groups of'",
      "Any number times 0 = 0",
      "Any number times 1 = itself",
      "Order doesn't matter: 3 × 4 = 4 × 3 = 12",
      "The answer is called the 'product'",
    ],
    steps: [
      { step: 1, text: "Think of it as groups: 3 × 4 = 3 groups of 4", emoji: "🟦" },
      { step: 2, text: "Count each group", emoji: "🖐️" },
      { step: 3, text: "Or use the times table you know!", emoji: "📋" },
    ],
    examples: [
      { question: "3 × 4 = ?", answer: "12", explanation: "3 groups of 4 = 4 + 4 + 4 = 12" },
      { question: "6 rows × 7 flowers = ?", answer: "42", explanation: "6 × 7 = 42 flowers total" },
      { question: "5 × 10 = ?", answer: "50", explanation: "Any number times 10, just add a zero!" },
    ],
    vocabulary: [
      { word: "Multiply", meaning: "Add the same number repeatedly" },
      { word: "Product", meaning: "The answer when you multiply" },
      { word: "Times (×)", meaning: "The symbol for multiplication" },
    ],
    funFact: "🏺 The Babylonians used multiplication tables 4,000 years ago, carved into clay tablets!",
    practiceHint: "Arrange objects in rows and columns — count them all to see multiplication in action!",
  },
  {
    topicKey: "alphabet",
    title: "The Alphabet",
    emoji: "🔤",
    gradeLevel: "Grade 1-2",
    subject: "English",
    introduction: "The English alphabet has 26 letters. Every word you read and write uses these letters!",
    keyFacts: [
      "There are 26 letters: A B C D E F G H I J K L M N O P Q R S T U V W X Y Z",
      "5 letters are VOWELS: A, E, I, O, U",
      "The other 21 letters are CONSONANTS",
      "Every word must have at least one vowel",
      "Letters can be UPPERCASE (big) or lowercase (small)",
    ],
    examples: [
      { question: "Name the 5 vowels", answer: "A, E, I, O, U", explanation: "These are special — every English word has at least one!" },
      { question: "What letter comes after M?", answer: "N", explanation: "...K, L, M, N, O, P..." },
      { question: "Is 'Y' a vowel or consonant?", answer: "Usually a consonant", explanation: "Y is mostly consonant (year, yes) but can sound like a vowel (happy, gym)" },
    ],
    vocabulary: [
      { word: "Vowel", meaning: "A, E, I, O, U — open sounds" },
      { word: "Consonant", meaning: "All other letters (B, C, D...)" },
      { word: "Uppercase", meaning: "Big/capital letters: A B C" },
      { word: "Lowercase", meaning: "Small letters: a b c" },
    ],
    funFact: "📜 Our alphabet comes from the Phoenicians who invented it 3,000 years ago!",
    practiceHint: "Sing the alphabet song — it helps you remember the order of letters!",
  },
  {
    topicKey: "animals",
    title: "Animals",
    emoji: "🦁",
    gradeLevel: "Grade 2-4",
    subject: "Science",
    introduction: "Animals are living creatures that breathe, move, eat, and grow. There are millions of different species on Earth!",
    keyFacts: [
      "Mammals have fur/hair and feed milk to their babies",
      "Birds have feathers and most can fly",
      "Fish live in water and breathe through gills",
      "Reptiles are cold-blooded and have scaly skin",
      "Amphibians like frogs can live on land and in water",
      "Insects have 6 legs and 3 body parts",
    ],
    examples: [
      { question: "Is a whale a fish?", answer: "No — it's a mammal!", explanation: "Whales breathe air, are warm-blooded, and feed milk to babies — just like us!" },
      { question: "What do carnivores eat?", answer: "Only meat", explanation: "Carnivores eat other animals. Herbivores eat plants. Omnivores eat both!" },
      { question: "How do fish breathe?", answer: "Through gills", explanation: "Gills extract oxygen from water, so fish never need to surface for air" },
    ],
    vocabulary: [
      { word: "Mammal", meaning: "Warm-blooded, has hair, feeds milk to young" },
      { word: "Carnivore", meaning: "An animal that eats only meat" },
      { word: "Herbivore", meaning: "An animal that eats only plants" },
      { word: "Habitat", meaning: "The natural home of an animal" },
    ],
    funFact: "🐝 There are over 1 million known species of insects — they are the most successful animals on Earth!",
    practiceHint: "Look at animals around you — classify them: mammal, bird, fish, reptile, insect?",
  },
  {
    topicKey: "moral_values",
    title: "Moral Values",
    emoji: "💛",
    gradeLevel: "Grade 1-6",
    subject: "Social Studies",
    introduction: "Moral values are the principles that guide us to act in good, kind, and honest ways. They help us be good people and build strong friendships.",
    keyFacts: [
      "Honesty means telling the truth even when it is hard",
      "Kindness means caring about others' feelings",
      "Respect means treating others the way you want to be treated",
      "Responsibility means doing what you agreed to do",
      "Empathy means understanding how someone else feels",
    ],
    examples: [
      { question: "Your friend is sad. What is the kind thing to do?", answer: "Ask if they are okay and listen", explanation: "Showing you care makes a huge difference to someone having a hard day" },
      { question: "You accidentally broke something. What is honest?", answer: "Tell the truth and say sorry", explanation: "Honesty builds trust — even when it is difficult" },
      { question: "Someone new joins your class. What shows respect?", answer: "Welcome them and include them", explanation: "Everyone deserves to feel included and welcome" },
    ],
    vocabulary: [
      { word: "Honesty", meaning: "Telling the truth always" },
      { word: "Empathy", meaning: "Understanding how someone else feels" },
      { word: "Respect", meaning: "Treating others kindly and fairly" },
      { word: "Responsibility", meaning: "Being reliable and owning your actions" },
    ],
    funFact: "🌱 People with strong moral values tend to have more friends and feel happier in life!",
    practiceHint: "Think about one value you want to practice today — then do one action that shows it!",
  },
  {
    topicKey: "emotions",
    title: "Understanding Emotions",
    emoji: "😊",
    gradeLevel: "Grade 1-5",
    subject: "Social Studies",
    introduction: "Emotions are feelings inside us. Everyone has them! Understanding our emotions helps us make good choices and connect with others.",
    keyFacts: [
      "All emotions are normal — even anger and sadness",
      "We can name our emotions to help manage them",
      "Deep breathing helps when we feel overwhelmed",
      "Talking to someone trusted helps with hard emotions",
      "Happy people show it through smiling and laughter",
    ],
    examples: [
      { question: "You feel nervous before a test. What helps?", answer: "Take deep breaths, prepare well, and remind yourself you can try your best", explanation: "Nervousness is normal — it shows you care about doing well" },
      { question: "A friend is angry. How can you help?", answer: "Give them space, then gently ask if they want to talk", explanation: "Forcing a conversation when someone is angry rarely helps" },
      { question: "What is the difference between sad and angry?", answer: "Sad = feeling a loss. Angry = feeling treated unfairly or frustrated", explanation: "Both are valid — understanding the difference helps us respond well" },
    ],
    vocabulary: [
      { word: "Emotion", meaning: "A strong feeling such as joy, fear, or love" },
      { word: "Empathy", meaning: "Feeling or understanding what another person feels" },
      { word: "Overwhelmed", meaning: "Feeling like too much is happening at once" },
      { word: "Calm", meaning: "Feeling peaceful and in control" },
    ],
    funFact: "🧠 Scientists have found that naming your emotions actually reduces their intensity — talking helps!",
    practiceHint: "Keep an emotion diary — write one word each day describing how you felt and why",
  },
];


// ─── EXPANDED RESOURCES (Middle School → Higher Ed) ──────────────────────────

const EXPANDED_RESOURCES: LearningResource[] = [
  {
    topicKey: "algebra",
    title: "Algebra", emoji: "🔣", gradeLevel: "Grade 6-8", subject: "Math",
    introduction: "Algebra uses letters (variables) to represent unknown numbers. Instead of writing 'what number plus 7 equals 12?', algebra lets us write x + 7 = 12 and solve it systematically.",
    keyFacts: [
      "A variable is a letter (like x or y) that stands for an unknown number",
      "An equation has an equals sign — both sides must balance",
      "To solve for x, do the same operation to both sides",
      "Like terms can be combined: 3x + 5x = 8x",
      "Expanding brackets: 2(x + 3) = 2x + 6",
    ],
    steps: [
      { step:1, text:"Identify what you are solving for (the variable)", emoji:"🎯" },
      { step:2, text:"Isolate the variable — move everything else to the other side", emoji:"⚖️" },
      { step:3, text:"Perform the same operation on BOTH sides to keep balance", emoji:"✅" },
      { step:4, text:"Check your answer by substituting back into the original equation", emoji:"🔍" },
    ],
    examples: [
      { question:"Solve: x + 7 = 12", answer:"x = 5", explanation:"Subtract 7 from both sides: x + 7 − 7 = 12 − 7 → x = 5" },
      { question:"Solve: 3x = 18", answer:"x = 6", explanation:"Divide both sides by 3: 3x÷3 = 18÷3 → x = 6" },
      { question:"Solve: 2x − 5 = 9", answer:"x = 7", explanation:"Add 5 to both sides: 2x = 14. Then divide by 2: x = 7" },
    ],
    vocabulary: [
      { word:"Variable", meaning:"A letter representing an unknown number" },
      { word:"Equation", meaning:"A mathematical statement with an = sign" },
      { word:"Coefficient", meaning:"The number multiplied by a variable (3 in 3x)" },
      { word:"Expression", meaning:"A combination of numbers and variables without an = sign" },
    ],
    funFact: "🏺 The word 'algebra' comes from Arabic 'al-jabr', from a 9th-century mathematician Muhammad ibn Musa al-Khwarizmi!",
    practiceHint: "Think of an equation as a balanced scale — whatever you do to one side, do to the other!",
  },
  {
    topicKey: "percentages",
    title: "Percentages", emoji: "💯", gradeLevel: "Grade 6-8", subject: "Math",
    introduction: "Percent means 'per hundred'. 25% means 25 out of every 100. Percentages help us compare quantities, calculate discounts, and understand data presented in real life.",
    keyFacts: [
      "% means 'out of 100' — so 50% = 50/100 = 0.5",
      "To find X% of a number: multiply by X/100",
      "To find the percentage of a value: (part ÷ whole) × 100",
      "Percentage increase: (increase ÷ original) × 100",
      "Percentage decrease: (decrease ÷ original) × 100",
    ],
    steps: [
      { step:1, text:"Identify: are you finding a percentage OF something, or converting a fraction?", emoji:"🤔" },
      { step:2, text:"To find X% of a number: (X ÷ 100) × number", emoji:"✖️" },
      { step:3, text:"To express as %: (part ÷ whole) × 100", emoji:"💯" },
    ],
    examples: [
      { question:"What is 20% of ₹500?", answer:"₹100", explanation:"(20/100) × 500 = 0.2 × 500 = 100" },
      { question:"30 out of 40 students passed. What %?", answer:"75%", explanation:"(30 ÷ 40) × 100 = 0.75 × 100 = 75%" },
      { question:"Price rose from ₹200 to ₹250. % increase?", answer:"25%", explanation:"Increase = 50. (50 ÷ 200) × 100 = 25%" },
    ],
    vocabulary: [
      { word:"Percentage", meaning:"A ratio expressed as parts per hundred" },
      { word:"Discount", meaning:"Percentage reduction from the original price" },
      { word:"Profit/Loss %", meaning:"Profit or loss expressed as percentage of cost price" },
    ],
    funFact: "🛍️ Retailers use percentages so cleverly that '50% off the second item' is actually only a 25% total saving!",
    practiceHint: "Practise with real shopping: 'This shirt is ₹600 with 30% off — what do I pay?' Use percentages daily!",
  },
  {
    topicKey: "physics",
    title: "Physics", emoji: "⚡", gradeLevel: "Grade 9-12", subject: "Science",
    introduction: "Physics is the study of matter, energy, and the fundamental forces of nature. From why objects fall to how electricity flows — physics explains the universe around us.",
    keyFacts: [
      "Newton's 1st Law: Objects stay at rest or in motion unless acted on by a force",
      "Newton's 2nd Law: Force = Mass × Acceleration (F = ma)",
      "Newton's 3rd Law: Every action has an equal and opposite reaction",
      "Speed = Distance ÷ Time",
      "Kinetic Energy = ½mv² (m = mass, v = velocity)",
      "Ohm's Law: Voltage = Current × Resistance (V = IR)",
    ],
    steps: [
      { step:1, text:"Identify what is given in the problem (values and units)", emoji:"📋" },
      { step:2, text:"Choose the correct formula for the situation", emoji:"📐" },
      { step:3, text:"Substitute values and solve — pay attention to units!", emoji:"🔢" },
      { step:4, text:"Check if the answer is physically reasonable", emoji:"✅" },
    ],
    examples: [
      { question:"A 5kg box is pushed with 20N force. What is its acceleration?", answer:"4 m/s²", explanation:"F = ma → a = F/m = 20/5 = 4 m/s²" },
      { question:"Voltage = 12V, Resistance = 4Ω. What is the current?", answer:"3 Amperes", explanation:"V = IR → I = V/R = 12/4 = 3A" },
      { question:"Object mass 4kg, velocity 3m/s. KE = ?", answer:"18 Joules", explanation:"KE = ½mv² = ½ × 4 × 9 = 18J" },
    ],
    vocabulary: [
      { word:"Force", meaning:"A push or pull that changes motion (unit: Newton)" },
      { word:"Acceleration", meaning:"Rate of change of velocity (unit: m/s²)" },
      { word:"Inertia", meaning:"Tendency of an object to resist change in motion" },
      { word:"Resistance", meaning:"Opposition to flow of electrical current (unit: Ohm Ω)" },
    ],
    funFact: "🚀 Newton discovered gravity concepts after observing a falling apple — not being hit by one (that part is a myth)!",
    practiceHint: "Draw free-body diagrams showing all forces on an object before solving — it makes the problem visual and clear.",
  },
  {
    topicKey: "chemistry",
    title: "Chemistry", emoji: "⚗️", gradeLevel: "Grade 9-12", subject: "Science",
    introduction: "Chemistry studies the composition, structure, and properties of matter, and how substances transform through chemical reactions. Everything around you is chemistry in action.",
    keyFacts: [
      "An element is a pure substance made of only one type of atom",
      "Compounds are two or more elements chemically bonded (e.g., H₂O)",
      "Acids have pH < 7; Bases have pH > 7; Neutral = pH 7",
      "Exothermic reactions release heat; Endothermic reactions absorb heat",
      "The Periodic Table organises elements by atomic number",
      "Law of Conservation of Mass: matter is neither created nor destroyed",
    ],
    steps: [
      { step:1, text:"Identify the reactants (what you start with) and products (what you end with)", emoji:"⚗️" },
      { step:2, text:"Balance the chemical equation — same atoms on both sides", emoji:"⚖️" },
      { step:3, text:"Determine the type of reaction: synthesis, decomposition, displacement, combustion", emoji:"🔥" },
    ],
    examples: [
      { question:"What is the pH of lemon juice — acid, base, or neutral?", answer:"Acid (pH ≈ 2)", explanation:"Lemon juice contains citric acid, so pH is well below 7" },
      { question:"H₂ + O₂ → ? (combustion)", answer:"H₂O (water)", explanation:"2H₂ + O₂ → 2H₂O. Balanced equation for burning hydrogen" },
      { question:"NaCl dissolved in water — what are the ions?", answer:"Na⁺ and Cl⁻", explanation:"Salt dissociates into sodium and chloride ions in water" },
    ],
    vocabulary: [
      { word:"Atom", meaning:"The smallest unit of an element" },
      { word:"Molecule", meaning:"Two or more atoms bonded together" },
      { word:"Catalyst", meaning:"A substance that speeds up a reaction without being consumed" },
      { word:"Valence", meaning:"The number of electrons an atom can gain/lose/share" },
    ],
    funFact: "💎 Carbon is the same element in both diamonds (hardest natural substance) and graphite (soft pencil lead) — the arrangement of atoms makes all the difference!",
    practiceHint: "Memorise the first 20 elements of the periodic table with a mnemonic — it pays off in every chemistry exam.",
  },
  {
    topicKey: "biology",
    title: "Biology", emoji: "🧬", gradeLevel: "Grade 9-12", subject: "Science",
    introduction: "Biology is the study of living organisms — from the tiniest bacteria to blue whales. It covers how cells work, how organisms reproduce, how species evolve, and how ecosystems function.",
    keyFacts: [
      "All living things are made of cells — the basic unit of life",
      "DNA (deoxyribonucleic acid) carries genetic information",
      "Mitosis produces 2 identical daughter cells (growth/repair)",
      "Meiosis produces 4 genetically diverse cells (reproduction)",
      "Ecosystems involve producers, consumers, and decomposers",
      "Darwin's Theory of Natural Selection: organisms best adapted to their environment survive and reproduce",
    ],
    steps: [
      { step:1, text:"Start with the cell — understand its organelles and their functions", emoji:"🔬" },
      { step:2, text:"Move to organism systems: digestive, circulatory, nervous, immune", emoji:"🫀" },
      { step:3, text:"Understand genetics: genes, DNA, inheritance, mutations", emoji:"🧬" },
      { step:4, text:"Connect to ecology: how organisms interact with each other and their environment", emoji:"🌍" },
    ],
    examples: [
      { question:"What does the mitochondria do?", answer:"Produces energy (ATP) through cellular respiration", explanation:"Called the powerhouse of the cell — converts glucose + oxygen into ATP energy" },
      { question:"A plant leaf is green because of what?", answer:"Chlorophyll — a pigment that absorbs light for photosynthesis", explanation:"Chlorophyll reflects green light while absorbing red and blue wavelengths" },
      { question:"What is a gene?", answer:"A segment of DNA that codes for a specific protein or trait", explanation:"Humans have ~20,000 genes located on 23 pairs of chromosomes" },
    ],
    vocabulary: [
      { word:"Organelle", meaning:"A specialised structure within a cell (e.g., nucleus, ribosome)" },
      { word:"Photosynthesis", meaning:"Process by which plants convert light into glucose" },
      { word:"Osmosis", meaning:"Movement of water across a semi-permeable membrane" },
      { word:"Ecosystem", meaning:"All living organisms in an area and their non-living environment" },
    ],
    funFact: "🦠 Your body contains more bacterial cells than human cells — about 38 trillion bacteria vs 30 trillion human cells!",
    practiceHint: "Draw and label diagrams of cells, the heart, and the digestive system — biology rewards visual learners.",
  },
  {
    topicKey: "history",
    title: "History", emoji: "🏛️", gradeLevel: "Grade 6-10", subject: "Social Studies",
    introduction: "History is the study of past events, people, and societies. Understanding history helps us make sense of the present and make wiser decisions for the future.",
    keyFacts: [
      "India gained independence on 15 August 1947",
      "The Indian Constitution came into force on 26 January 1950",
      "World War I: 1914–1918; World War II: 1939–1945",
      "The French Revolution (1789) overthrew the monarchy and spread ideas of liberty and equality",
      "The Industrial Revolution began in Britain in the late 18th century",
      "The United Nations was founded in 1945 after WWII to maintain world peace",
    ],
    examples: [
      { question:"Why is 26 January celebrated as Republic Day?", answer:"India's Constitution came into effect on 26 January 1950, making India a republic", explanation:"Before this date, India was under the Government of India Act 1935 even after independence" },
      { question:"What triggered World War I?", answer:"The assassination of Archduke Franz Ferdinand of Austria in Sarajevo, 1914", explanation:"This set off a chain of alliances leading to a world-scale conflict" },
      { question:"What was the significance of the French Revolution?", answer:"It ended the French monarchy and spread democratic ideals of liberty, equality, and fraternity", explanation:"Its ideals influenced revolutions across Europe and the world" },
    ],
    vocabulary: [
      { word:"Revolution", meaning:"A forcible overthrow of a government or social order" },
      { word:"Colonialism", meaning:"Practice of acquiring political control over another country" },
      { word:"Nationalism", meaning:"Identification with and loyalty to one's nation" },
      { word:"Democracy", meaning:"A system of government by the people, usually through elected representatives" },
    ],
    funFact: "📜 The Indian Constitution is the longest written constitution of any sovereign nation in the world — it has 470 articles!",
    practiceHint: "Create a timeline of key events — placing events in chronological order makes patterns and causes much clearer.",
  },
  {
    topicKey: "economics",
    title: "Economics", emoji: "📈", gradeLevel: "Grade 10-12 & Higher Ed", subject: "Social Studies",
    introduction: "Economics studies how individuals, businesses, and governments make decisions about scarce resources. It explains prices, markets, employment, and national wealth.",
    keyFacts: [
      "GDP (Gross Domestic Product) measures a country's total economic output",
      "Inflation = sustained rise in general price levels; reduces purchasing power",
      "Law of Demand: as price rises, quantity demanded falls (inverse relationship)",
      "Law of Supply: as price rises, quantity supplied rises (direct relationship)",
      "Monetary policy is controlled by the central bank (RBI in India)",
      "Opportunity cost = the value of the best alternative you give up when making a choice",
    ],
    steps: [
      { step:1, text:"Identify the economic problem: what is scarce and who wants it?", emoji:"🤔" },
      { step:2, text:"Analyse demand and supply forces", emoji:"📊" },
      { step:3, text:"Consider how government policy (taxes, subsidies, interest rates) affects the outcome", emoji:"🏛️" },
    ],
    examples: [
      { question:"If petrol price doubles, what happens to demand for petrol?", answer:"Demand decreases — people drive less or switch to alternatives", explanation:"Law of Demand — inverse relationship between price and quantity demanded" },
      { question:"What is the opportunity cost of spending 2 hours studying?", answer:"The value of the next best activity you could have done — e.g., relaxing, earning money", explanation:"Every choice has a cost — what you give up is the opportunity cost" },
      { question:"RBI raises interest rates. What happens to borrowing?", answer:"Borrowing becomes more expensive, so people and businesses borrow less", explanation:"Higher rates reduce money supply and spending — used to control inflation" },
    ],
    vocabulary: [
      { word:"Scarcity", meaning:"Limited resources relative to unlimited wants" },
      { word:"Inflation", meaning:"General rise in price levels over time" },
      { word:"GDP", meaning:"Gross Domestic Product — total value of goods/services produced in a country" },
      { word:"Monopoly", meaning:"Market with only one seller who controls prices" },
    ],
    funFact: "💰 Adam Smith's 'The Wealth of Nations' (1776) laid the foundation for modern economics — written the same year as American independence!",
    practiceHint: "Read a financial newspaper for 10 minutes a day — economics concepts come alive when you connect them to real headlines.",
  },
  {
    topicKey: "programming",
    title: "Programming Basics", emoji: "💻", gradeLevel: "Grade 7 onwards", subject: "Computer Science",
    introduction: "Programming means writing instructions for a computer to follow. Just like a recipe tells you how to cook a dish, a program tells a computer exactly what to do, step by step.",
    keyFacts: [
      "A variable is a named storage location: age = 17",
      "An if-statement makes decisions: if age >= 18: print('Adult')",
      "A loop repeats code: for i in range(5): print(i)",
      "A function is a reusable block of code: def greet(name): return 'Hello ' + name",
      "HTML structures a web page; CSS styles it; JavaScript makes it interactive",
      "Binary is base-2 (0s and 1s) — computers process everything in binary",
    ],
    steps: [
      { step:1, text:"Understand the problem clearly before writing any code", emoji:"🤔" },
      { step:2, text:"Break it into small steps (algorithm / pseudocode)", emoji:"📋" },
      { step:3, text:"Write the code — start simple and add complexity", emoji:"⌨️" },
      { step:4, text:"Test with different inputs — find and fix bugs", emoji:"🐛" },
    ],
    examples: [
      { question:"Write code to print numbers 1 to 5 in Python", answer:"for i in range(1, 6):\n    print(i)", explanation:"range(1, 6) generates 1,2,3,4,5. The loop prints each number" },
      { question:"What is the output of: print(2 ** 8)?", answer:"256", explanation:"** is the power operator. 2⁸ = 256. This is also the number of values in a byte!" },
      { question:"Convert binary 1010 to decimal", answer:"10", explanation:"1×8 + 0×4 + 1×2 + 0×1 = 8+0+2+0 = 10" },
    ],
    vocabulary: [
      { word:"Algorithm", meaning:"A step-by-step procedure to solve a problem" },
      { word:"Bug", meaning:"An error in a program that causes incorrect behaviour" },
      { word:"Function", meaning:"A named, reusable block of code" },
      { word:"Syntax", meaning:"The rules that define how code must be written" },
    ],
    funFact: "👩‍💻 Ada Lovelace, working in the 1840s, is often called the world's first programmer — for an analytical engine that wasn't even built yet!",
    practiceHint: "Code every day — even 15 minutes. Use free platforms like replit.com or code.org to write and run code instantly in your browser.",
  },
  {
    topicKey: "dbms",
    title: "Database Management Systems", emoji: "🗃️", gradeLevel: "Higher Education", subject: "Computer Science",
    introduction: "A DBMS is software that manages data efficiently — storing, retrieving, and updating large datasets while ensuring data integrity and security. Relational databases use tables linked by keys.",
    keyFacts: [
      "A PRIMARY KEY uniquely identifies every row in a table",
      "A FOREIGN KEY references a primary key in another table (creates relationships)",
      "Normalisation removes data redundancy (1NF → 2NF → 3NF → BCNF)",
      "ACID properties: Atomicity, Consistency, Isolation, Durability",
      "SQL: SELECT, INSERT, UPDATE, DELETE, JOIN are fundamental commands",
      "NoSQL databases (MongoDB, Redis) handle unstructured/semi-structured data",
    ],
    steps: [
      { step:1, text:"Design the ER (Entity-Relationship) diagram before creating tables", emoji:"📐" },
      { step:2, text:"Apply normalisation to remove redundancy", emoji:"🔧" },
      { step:3, text:"Define primary keys, foreign keys, and constraints", emoji:"🔑" },
      { step:4, text:"Write SQL queries to interact with the database", emoji:"💬" },
    ],
    examples: [
      { question:"SELECT * FROM students WHERE age > 18;", answer:"Returns all columns of all rows where age is greater than 18", explanation:"* means 'all columns'. WHERE filters rows matching the condition" },
      { question:"Why use a JOIN?", answer:"To combine data from two related tables in a single query result", explanation:"e.g., JOIN students ON students.classId = classes.id fetches each student with their class name" },
      { question:"What is 2NF?", answer:"A table is in 2NF if it is in 1NF and every non-key attribute is fully dependent on the whole primary key", explanation:"Eliminates partial dependencies — important when primary key is composite" },
    ],
    vocabulary: [
      { word:"Schema", meaning:"The structure/blueprint of a database (tables, columns, types)" },
      { word:"Transaction", meaning:"A unit of work that is either fully completed or fully rolled back" },
      { word:"Index", meaning:"A data structure that speeds up data retrieval at the cost of extra storage" },
      { word:"Normalisation", meaning:"Process of organising data to reduce redundancy and improve integrity" },
    ],
    funFact: "🌐 Instagram's database handles over 1 billion users with PostgreSQL — the same open-source database you can install free on your laptop!",
    practiceHint: "Practice SQL on SQLiteOnline.com — create a table, insert data, and write 10 different SELECT queries. Muscle memory for SQL is invaluable.",
  },
  {
    topicKey: "operating_systems",
    title: "Operating Systems", emoji: "🖥️", gradeLevel: "Higher Education", subject: "Computer Science",
    introduction: "An Operating System is the software that manages all hardware resources and provides a platform for other software to run. It handles processes, memory, files, and I/O devices.",
    keyFacts: [
      "OS manages CPU, memory, storage, and I/O devices",
      "Process states: New → Ready → Running → Blocked → Terminated",
      "Scheduling algorithms: FCFS, SJF, Round Robin, Priority",
      "Deadlock: 4 conditions — Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait",
      "Virtual memory allows programs to use more memory than physically available",
      "Paging divides memory into fixed-size pages to eliminate external fragmentation",
    ],
    steps: [
      { step:1, text:"Understand the process lifecycle: how processes are created, scheduled, and terminated", emoji:"🔄" },
      { step:2, text:"Study memory management: paging, segmentation, virtual memory", emoji:"💾" },
      { step:3, text:"Learn scheduling algorithms and calculate average waiting/turnaround times", emoji:"⏱️" },
      { step:4, text:"Analyse deadlock conditions and prevention/detection methods", emoji:"🔒" },
    ],
    examples: [
      { question:"FCFS scheduling: processes P1(4ms), P2(3ms), P3(2ms) in order. Average waiting time?", answer:"3ms", explanation:"P1 waits 0ms, P2 waits 4ms, P3 waits 7ms. Average = (0+4+7)/3 = 11/3 ≈ 3.67ms" },
      { question:"What is thrashing?", answer:"Excessive paging/swapping causing the system to spend more time swapping than executing", explanation:"Occurs when too many processes compete for insufficient physical memory" },
      { question:"Name the 4 necessary conditions for deadlock", answer:"Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait", explanation:"All four must hold simultaneously for deadlock to occur — breaking any one prevents it" },
    ],
    vocabulary: [
      { word:"Process", meaning:"A program in execution — has its own memory space and resources" },
      { word:"Thread", meaning:"Lightweight process that shares memory with its parent process" },
      { word:"Semaphore", meaning:"A synchronisation tool to control access to shared resources" },
      { word:"Context Switch", meaning:"Saving one process's state and loading another's — allows multitasking" },
    ],
    funFact: "🐧 Linux (a Unix-like OS) powers over 96% of the world's top 1 million web servers — and it started as a hobby project by Linus Torvalds in 1991!",
    practiceHint: "Draw Gantt charts for scheduling algorithms by hand — it forces you to trace each step and the calculations become intuitive.",
  },
];

// Merge all resources
const ALL_RESOURCES = [...RESOURCES, ...EXPANDED_RESOURCES];
const allResourceMap = new Map(ALL_RESOURCES.map(r => [r.topicKey, r]));

export function getResourceForTopic(topicKey: string): LearningResource | null {
  return allResourceMap.get(topicKey) ?? null;
}

export function getAllResources(): LearningResource[] {
  return ALL_RESOURCES;
}

export function getResourcesBySubject(subject: string): LearningResource[] {
  return ALL_RESOURCES.filter(r => r.subject.toLowerCase() === subject.toLowerCase());
}

export function getResourcesByGrade(grade: string): LearningResource[] {
  const gradeMap: Record<string, string[]> = {
    primary: ["Grade 1","Grade 2","Grade 3","Grade 4","Grade 5"],
    middle:  ["Grade 6","Grade 7","Grade 8"],
    high:    ["Grade 9","Grade 10","Grade 11","Grade 12"],
    higher:  ["Higher Education","College","University"],
  };
  const keywords = gradeMap[grade] ?? [];
  return ALL_RESOURCES.filter(r => keywords.some(k => r.gradeLevel.includes(k)));
}
