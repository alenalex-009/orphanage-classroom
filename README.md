# Classroom OS — Gamified Learning Dashboard

A modern, fully gamified classroom management app for teachers. Built with Next.js 14, Prisma, PostgreSQL, Tailwind CSS, and Framer Motion.

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Copy env and add your database URL
cp .env.example .env
# Edit .env → set DATABASE_URL=postgresql://...

# 3. Push schema and seed demo data
npm run db:push
npm run db:seed

# 4. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## What's in This App

### Core Modules

| Route | What it does |
|---|---|
| `/` | Dashboard with stats, daily challenge, quick actions, top students |
| `/attendance` | Mark present/absent per class — triggers XP awards |
| `/session` | Create and manage class sessions |
| `/session/[id]/live` | Live session room — award XP in real time |
| `/session/[id]/game` | Full-screen game mode with topic-based questions |
| `/learn` | Learning resources — lesson content for every topic |
| `/learn/[topic]` | Full lesson: key facts, steps, examples, vocabulary |
| `/stories` | Story Mode — interactive page-by-page reading with XP |
| `/stories/[id]` | Story reader with inline quiz questions |
| `/leaderboard` | Top students podium + full XP rankings |
| `/students` | All students with XP cards, levels, streaks |
| `/students/[id]` | Full student profile — XP bar, achievements, attendance |
| `/mood` | Daily mood tracker with history chart |
| `/admin` | Add/manage classes and students |

---

## Gamification System

### XP & Levels (7 levels)

| Level | Name | XP Required | Avatar |
|---|---|---|---|
| 0 | Seedling | 0 | 🌱 |
| 1 | Reader | 100 | 📚 |
| 2 | Explorer | 200 | 🔭 |
| 3 | Achiever | 300 | ⚡ |
| 5 | Champion | 500 | 🏆 |
| 7 | Scholar | 700 | 🧠 |
| 10 | Legend | 1000 | 👑 |

### XP Sources

| Action | XP Earned |
|---|---|
| Attendance marked present | +10 XP |
| Session completed | +20 XP |
| Whole class answers | +10 XP each |
| Selected student answers | +15 XP (+5 streak bonus) |
| Role play — good performance | +20–35 XP |
| Participation score 1–10 | +5 to +15 XP |
| Daily challenge | +10 XP (double first attempt) |

### Achievements (7 types)

- 🔥 **Consistent Learner** — 3-day attendance streak
- ⭐ **Active Student** — participated in 5+ sessions
- 🎯 **First Steps** — first session ever
- 🏆 **Perfect Week** — present every day for 7 days
- 🧠 **Question Master** — answered 10 questions correctly
- 🎭 **Role Play Star** — 3 strong role play performances
- 🤝 **Team Player** — won a team mode session

---

## Topic-Based Quiz Questions (THE FIX)

The quiz now generates **correct questions for the session topic**. Previously all sessions used life-skills questions regardless of topic.

### How it works

When a teacher creates a session with topic "Fractions", the game generates fraction questions. "Alphabet" → alphabet questions. The mapping covers:

**Math:** fractions, addition, subtraction, multiplication, shapes, counting
**English:** alphabet, spelling, grammar, reading
**Science:** animals, plants, weather
**Social:** moral values, emotions, friendship
**General:** colors

The mapping is keyword-based — "Year 3 Fractions Lesson" → fraction questions, "Subtraction Practice" → subtraction questions.

---

## Learning Resources

Each topic has a full lesson page at `/learn/[topic]` with:
- **Introduction** — plain-language explanation
- **Key Facts** — bullet-point core knowledge
- **Step-by-Step** — how to approach problems
- **Worked Examples** — 3 solved examples with explanations
- **Vocabulary** — key terms with definitions
- **Fun Fact** — memorable real-world connection
- **Practice Tip** — hands-on suggestion

---

## Story Mode

5 built-in interactive stories at `/stories`:
1. 🌾 **The Honest Farmer** — moral values
2. 🐢 **The Clever Tortoise** — perseverance
3. 🌱 **The Little Seed** — plant science
4. 🏘️ **The Sharing Village** — community & friendship
5. 🎓 **The Brave Student** — emotions & courage

Each story has questions on key pages. Correct answers award XP. Stories end with a moral reveal.

---

## Database Schema

```
Class → Student → Reward (XP/level/streak)
                → Achievement[]
                → Attendance[]
                → Participation[]
                → TeamMember[]
                → StoryProgress[]
                → DailyChallenge[]

Session → Participation[]
        → Team[] → TeamMember[]
        → ActivityEvent[]
```

New tables added in v2:
- **StoryProgress** — tracks which stories each student has read/completed
- **DailyChallenge** — tracks daily challenge completion per student

---

## Stack

- **Next.js 14** (App Router, Server Actions)
- **TypeScript** — strict mode
- **Prisma + PostgreSQL** — database
- **Tailwind CSS** — styling
- **Framer Motion** — animations
- **Sonner** — toast notifications

---

## Adding More Questions

Edit the files in `lib/question-bank/`:
- `math.ts` — maths question sets
- `english.ts` — English question sets
- `science-social.ts` — science and social/moral questions
- `topic-map.ts` — keyword → question set mapping

Each question follows the `Question` type from `lib/game-types.ts`.

---

## Adding More Stories

Edit `lib/stories.ts`. Each story needs:
```typescript
{
  id: "unique-id",
  topicKey: "moral_values",   // links to question bank topic
  title: "Story Title",
  coverEmoji: "📖",
  subject: "Moral Values",
  gradeLevel: "Grade 2-5",
  totalXP: 50,
  moral: "The lesson learned.",
  pages: [
    { pageNum: 1, emoji: "🌟", text: "Story text here..." },
    { pageNum: 2, emoji: "💭", text: "More story...",
      question: {
        text: "What happened?",
        options: [
          { id: "a", text: "Option A", isCorrect: false },
          { id: "b", text: "Option B", isCorrect: true },
        ]
      }
    }
  ]
}
```
