import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { GameRoom } from "@/components/game-room";
import { DEFAULT_QUESTIONS } from "@/lib/question-bank";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function SessionDetailPage({ params }: Props) {
  const { id } = await params;
  const session = await prisma.session.findUnique({
    where: { id },
    include: {
      class: {
        include: {
          students: {
            include: { reward: true, achievements: true },
            orderBy: { name: "asc" },
          },
        },
      },
      teams: {
        include: {
          members: {
            include: { student: { include: { reward: true, achievements: true } } },
          },
        },
        orderBy: { xp: "desc" },
      },
    },
  });

  if (!session) notFound();

  return (
    <GameRoom
      session={{
        id: session.id,
        topic: session.topic,
        mode: session.mode as "class" | "team",
        teamSize: session.teamSize,
        completed: session.completed,
        classId: session.classId,
        className: session.class.name,
      }}
      students={session.class.students.map((s:any) => ({
        id: s.id,
        name: s.name,
        reward: s.reward,
        achievements: s.achievements,
      }))}
      teams={session.teams.map((t:any) => ({
        id: t.id,
        name: t.name,
        color: t.color,
        xp: t.xp,
        members: t.members.map((m:any) => ({
          studentId: m.studentId,
          student: {
            id: m.student.id,
            name: m.student.name,
            reward: m.student.reward,
            achievements: m.student.achievements,
          },
        })),
      }))}
      questions={DEFAULT_QUESTIONS}
    />
  );
}
