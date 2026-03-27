import { prisma } from "../lib/prisma";

async function main() {
  console.log("🌱 Seeding Classroom OS…");

  // ── Classes ────────────────────────────────────────────────────────────────
  const classA = await prisma.class.upsert({
    where: { id: "class-a" },
    update: {},
    create: { id: "class-a", name: "Sunflower Class" },
  });
  const classB = await prisma.class.upsert({
    where: { id: "class-b" },
    update: {},
    create: { id: "class-b", name: "Rainbow Class" },
  });

  // ── Students ───────────────────────────────────────────────────────────────
  const studentsA = [
    { name: "Arjun Sharma",  age: 10 },
    { name: "Priya Patel",   age: 11 },
    { name: "Ravi Kumar",    age: 10 },
    { name: "Sneha Reddy",   age: 12 },
    { name: "Anil Singh",    age: 11 },
    { name: "Kavya Nair",    age: 10 },
    { name: "Meena Iyer",    age: 11 },
    { name: "Deepak Rao",    age: 12 },
  ];
  const studentsB = [
    { name: "Fatima Malik",  age: 9  },
    { name: "Omar Hussain",  age: 10 },
    { name: "Amara Diallo",  age: 9  },
    { name: "Kofi Mensah",   age: 10 },
    { name: "Yemi Okafor",   age: 11 },
    { name: "Sana Ahmed",    age: 9  },
  ];

  const allStudents: { id: string; classId: string }[] = [];

  for (const s of studentsA) {
    const id = s.name.toLowerCase().replace(/ /g, "-");
    const student = await prisma.student.upsert({
      where: { id },
      update: {},
      create: { id, name: s.name, age: s.age, classId: classA.id },
    });
    allStudents.push({ id: student.id, classId: classA.id });
  }
  for (const s of studentsB) {
    const id = s.name.toLowerCase().replace(/ /g, "-");
    const student = await prisma.student.upsert({
      where: { id },
      update: {},
      create: { id, name: s.name, age: s.age, classId: classB.id },
    });
    allStudents.push({ id: student.id, classId: classB.id });
  }

  // ── Seed XP / rewards for Class A students (varied levels) ────────────────
  const xpValues = [420, 315, 280, 195, 160, 95, 55, 20];
  for (let i = 0; i < studentsA.length; i++) {
    const id = studentsA[i].name.toLowerCase().replace(/ /g, "-");
    const xp = xpValues[i] ?? 10;
    await prisma.reward.upsert({
      where: { studentId: id },
      update: { xp, level: Math.floor(xp / 100), streak: Math.floor(Math.random() * 8) },
      create: { studentId: id, xp, level: Math.floor(xp / 100), streak: Math.floor(Math.random() * 8) },
    });
  }

  // ── Achievements for top students ─────────────────────────────────────────
  const topStudentId = studentsA[0].name.toLowerCase().replace(/ /g, "-");
  const achievementsToSeed = [
    { type: "consistent_learner", label: "Consistent Learner", icon: "🔥" },
    { type: "active_student",     label: "Active Student",     icon: "⭐" },
    { type: "perfect_week",       label: "Perfect Week",       icon: "🏆" },
    { type: "question_master",    label: "Question Master",    icon: "🧠" },
  ];
  for (const ach of achievementsToSeed) {
    await prisma.achievement.upsert({
      where: { studentId_type: { studentId: topStudentId, type: ach.type } },
      update: {},
      create: { studentId: topStudentId, ...ach },
    });
  }
  const secondStudentId = studentsA[1].name.toLowerCase().replace(/ /g, "-");
  await prisma.achievement.upsert({
    where: { studentId_type: { studentId: secondStudentId, type: "first_session" } },
    update: {},
    create: { studentId: secondStudentId, type: "first_session", label: "First Steps", icon: "🎯" },
  });

  // ── Sample session with activity ──────────────────────────────────────────
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const session = await prisma.session.upsert({
    where: { id: "seed-session-1" },
    update: {},
    create: {
      id: "seed-session-1",
      classId: classA.id,
      topic: "Fractions",
      completed: true,
      date: today,
    },
  });

  await prisma.activityEvent.upsert({
    where: { id: "seed-event-1" },
    update: {},
    create: {
      id: "seed-event-1",
      sessionId: session.id,
      type: "whole_class",
      studentIds: studentsA.map(s => s.name.toLowerCase().replace(/ /g, "-")),
      xpAwarded: 10,
      bonusXP: 0,
    },
  });

  // ── Participation records ──────────────────────────────────────────────────
  const scores = [9, 8, 7, 6, 8, 7, 5, 9];
  for (let i = 0; i < studentsA.length; i++) {
    const studentId = studentsA[i].name.toLowerCase().replace(/ /g, "-");
    await prisma.participation.upsert({
      where: { studentId_sessionId: { studentId, sessionId: session.id } },
      update: {},
      create: { studentId, sessionId: session.id, score: scores[i] ?? 5 },
    });
  }

  // ── Mood log ──────────────────────────────────────────────────────────────
  await prisma.moodLog.upsert({
    where: { classId_date: { classId: classA.id, date: today } },
    update: {},
    create: { classId: classA.id, date: today, happyCount: 5, neutralCount: 2, sadCount: 1, angryCount: 0 },
  });

  console.log("✅ Seed complete!");
  console.log(`   • 2 classes (${classA.name}, ${classB.name})`);
  console.log(`   • ${studentsA.length + studentsB.length} students`);
  console.log(`   • 1 completed session (topic: Fractions)`);
  console.log(`   • XP data for ${studentsA.length} students`);
}

main()
  .catch(e => { console.error("❌ Seed failed:", e); process.exit(1); })
  .finally(() => prisma.$disconnect());
