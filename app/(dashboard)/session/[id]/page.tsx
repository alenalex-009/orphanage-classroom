import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/utils";
import { ParticipationForm } from "@/components/participation-form";
import { BookOpen, CheckCircle2, Users, Gamepad2 } from "lucide-react";
import Link from "next/link";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function SessionDetailPage({ params }: Props) {
  const { id } = await params;

  const session = await prisma.session.findUnique({
    where: { id },
    include: {
      class: { include: { students: { orderBy: { name: "asc" } } } },
      participation: { include: { student: true } },
    },
  });

  if (!session) notFound();

  const participationMap: Record<string, number> = {};
  for (const p of session.participation) {
    participationMap[p.studentId] = p.score;
  }

  return (
    <div className="page-container">
      <div>
        <Link href="/session" className="text-xs text-teal-700 font-semibold hover:underline mb-2 inline-block">
          ← Back to Sessions
        </Link>
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <BookOpen className="w-5 h-5 text-teal-700" />
              <h1 className="text-2xl font-extrabold text-foreground">{session.topic}</h1>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span>{session.class.name}</span>
              <span>·</span>
              <span>{formatDate(session.date)}</span>
            </div>
          </div>
          <span className={`px-3 py-1.5 rounded-full text-sm font-bold ${
            session.completed ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
          }`}>
            {session.completed ? "✓ Completed" : "● Active"}
          </span>
        </div>
      </div>

      {/* 🎮 Game Mode Launch */}
      {!session.completed && (
        <Link href={`/session/${session.id}/game`}
          className="flex items-center gap-4 p-5 rounded-2xl bg-gray-900 border border-gray-700 hover:bg-gray-800 transition-all group">
          <div className="w-12 h-12 rounded-xl bg-teal-500/20 flex items-center justify-center shrink-0">
            <Gamepad2 className="w-6 h-6 text-teal-400" />
          </div>
          <div className="flex-1">
            <p className="font-extrabold text-white text-base">Launch Game Mode 🎮</p>
            <p className="text-gray-400 text-sm mt-0.5">Full screen · Live questions · XP · Scoreboard</p>
          </div>
          <span className="text-teal-400 font-bold text-lg group-hover:translate-x-1 transition-transform">→</span>
        </Link>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="stat-card">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-teal-600" />
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Students</p>
          </div>
          <p className="text-2xl font-extrabold">{session.class.students.length}</p>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Recorded</p>
          </div>
          <p className="text-2xl font-extrabold text-emerald-700">{session.participation.length}</p>
        </div>
      </div>

      {/* Participation form */}
      <ParticipationForm
        sessionId={session.id}
        students={session.class.students}
        initialScores={participationMap}
        isCompleted={session.completed}
      />
    </div>
  );
}