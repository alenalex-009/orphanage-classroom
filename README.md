# Classroom OS

A classroom-first management system for orphanages. Built with Next.js 14, TypeScript, PostgreSQL, and Prisma.

## Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict)
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Styling**: Tailwind CSS
- **Notifications**: Sonner

---

## Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Set up your database

Copy the example env file:

```bash
cp .env.example .env.local
```

Edit `.env.local` and paste your PostgreSQL connection string:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/classroom_os?sslmode=require"
```

**Provider examples:**
- **Neon**: `postgresql://user:pass@ep-xxx.us-east-1.aws.neon.tech/classroom_os?sslmode=require`
- **Supabase**: `postgresql://postgres:pass@db.xxx.supabase.co:5432/postgres`
- **Railway**: Found in your Railway project → Variables

### 3. Generate Prisma client + migrate

```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 4. Seed the database (optional but recommended)

```bash
npm run db:seed
```

This creates 2 classes and 10 sample students.

### 5. Start the app

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Features

### Core Modules
| Module | Description |
|--------|-------------|
| **Dashboard** | Today's overview — attendance, sessions, mood, recent achievements |
| **Attendance** | Mark all students present/absent with one tap per student |
| **Sessions** | Create learning sessions, record participation scores (1–10) |
| **Mood** | Record class mood (Happy/Neutral/Sad/Angry) with counts |
| **Students** | View all student profiles with stats |
| **Admin** | Add/edit/delete students and classes |

### Gamification (Isolated Layer)
- **+10 XP** for attending class
- **+20 XP** for completing a session
- **+5–15 XP** for participation (scaled to score)
- **Streaks** tracked for consecutive attendance
- **Achievements**: Consistent Learner 🔥, Active Student ⭐, First Steps 🎯, Perfect Week 🏆
- **Level** = XP ÷ 100

> Gamification lives entirely in `lib/gamification.ts`. Deleting this file will not break any core functionality.

---

## Project Structure

```
classroom-os/
├── app/
│   ├── (dashboard)/
│   │   ├── layout.tsx          ← Sidebar layout
│   │   ├── page.tsx            ← Dashboard
│   │   ├── attendance/
│   │   ├── session/
│   │   │   └── [id]/
│   │   ├── mood/
│   │   ├── students/
│   │   │   └── [id]/
│   │   └── admin/
│   ├── layout.tsx              ← Root layout (fonts, toaster)
│   └── globals.css
├── actions/                    ← Server Actions (all mutations)
│   ├── attendance.ts
│   ├── session.ts
│   ├── participation.ts
│   ├── mood.ts
│   └── students.ts
├── components/                 ← React components
│   ├── sidebar-nav.tsx
│   ├── attendance-grid.tsx
│   ├── session-panel.tsx
│   ├── participation-form.tsx
│   ├── mood-picker.tsx
│   └── admin-panel.tsx
├── lib/
│   ├── prisma.ts               ← Prisma client singleton
│   ├── gamification.ts         ← Isolated gamification engine
│   └── utils.ts                ← Helpers
└── prisma/
    ├── schema.prisma
    └── seed.ts
```

---

## Useful Commands

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run db:studio    # Open Prisma Studio (visual DB browser)
npm run db:migrate   # Run new migrations
npm run db:seed      # Seed with sample data
```
