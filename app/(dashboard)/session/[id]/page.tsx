import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/utils";
import { ParticipationForm } from "@/components/participation-form";
import { BookOpen, CheckCircle2, Users, Gamepad2, Zap, Trophy, ArrowLeft, Play } from "lucide-react";
import Link from "next/link";
import { getLevelInfo } from "@/lib/avatars";
import { cn } from "@/lib/utils";

interface Props { params: Promise<{ id: string }> }

export default async function SessionDetailPage({ params }: Props) {
  const { id } = await params;
  const session = await prisma.session.findUnique({
    where: { id },
    include: {
      class: { include: { students: { include: { reward: true }, orderBy: { name: "asc" } } } },
      participation: { include: { student: true } },
      activityEvents: true,
      teams: { include: { members: { include: { student: { include: { reward: true } } } } } },
    },
  });
  if (!session) notFound();

  const participationMap: Record<string, number> = {};
  for (const p of session.participation) participationMap[p.studentId] = p.score;

  const totalXP = session.activityEvents.reduce((s: number, e: any) => s + e.xpAwarded + e.bonusXP, 0);
  const isTeam = session.mode === "team";
  const sortedTeams = isTeam ? [...session.teams].sort((a: any, b: any) => b.xp - a.xp) : [];

  const TEAM_GRADIENTS: Record<string, string> = {
    teal: "from-teal-500 to-emerald-500", amber: "from-amber-500 to-orange-500",
    purple: "from-violet-500 to-purple-600", coral: "from-rose-500 to-pink-500",
  };

  return (
    <div className="page-container">
      <Link href="/session" className="inline-flex items-center gap-1.5 text-xs text-violet-600 font-bold hover:underline">
        <ArrowLeft className="w-3 h-3" />Back to Sessions
      </Link>

      {/* Header */}
      <div className="classroom-card">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shrink-0",
              session.completed ? "bg-emerald-100" : "bg-amber-100")}>
              {session.completed ? <CheckCircle2 className="w-6 h-6 text-emerald-600" /> : <Play className="w-6 h-6 text-amber-600" />}
            </div>
            <div>
              <h1 className="text-xl font-black text-foreground">{session.topic}</h1>
              <div className="flex items-center gap-3 text-sm text-muted-foreground mt-0.5">
                <span>{session.class.name}</span>
                <span>·</span>
                <span>{formatDate(session.date)}</span>
                {isTeam && <span className="font-bold text-amber-600">🏆 Team Mode</span>}
              </div>
            </div>
          </div>
          <span className={cn("px-3 py-1.5 rounded-full text-xs font-black",
            session.completed ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700 animate-pulse")}>
            {session.completed ? "✓ Completed" : "● Live"}
          </span>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-4 gap-3 mt-5 pt-4 border-t border-border">
          {[
            { label: "Students",   value: session.class.students.length, icon: "👥" },
            { label: "Scored",     value: session.participation.length,  icon: "📝" },
            { label: "Activities", value: session.activityEvents.length, icon: "⚡" },
            { label: "Total XP",   value: totalXP > 0 ? `${totalXP} XP` : "0", icon: "🏆" },
          ].map(s => (
            <div key={s.label} className="flex flex-col gap-0.5">
              <span className="text-xs font-bold text-muted-foreground">{s.icon} {s.label}</span>
              <span className="text-xl font-black text-foreground">{s.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Game mode CTA */}
      {!session.completed && (
        <div className="grid md:grid-cols-2 gap-3">
          <Link href={`/session/${id}/live`}
            className="flex items-center gap-4 p-5 rounded-2xl border-2 border-violet-200 bg-violet-50 hover:bg-violet-100 hover:border-violet-300 active:scale-[0.99] transition-all group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="font-black text-violet-900">Live Session Controls</p>
              <p className="text-xs text-violet-600 mt-0.5">Award XP · Track activities · Team scoring</p>
            </div>
            <span className="text-violet-400 font-bold group-hover:translate-x-1 transition-transform">→</span>
          </Link>
          <Link href={`/session/${id}/game`}
            className="flex items-center gap-4 p-5 rounded-2xl border-2 border-amber-200 bg-amber-50 hover:bg-amber-100 hover:border-amber-300 active:scale-[0.99] transition-all group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shrink-0">
              <Gamepad2 className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="font-black text-amber-900">Game Mode 🎮</p>
              <p className="text-xs text-amber-700 mt-0.5">Full screen · Live questions · Real-time leaderboard</p>
            </div>
            <span className="text-amber-400 font-bold group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      )}

      {/* Team scoreboard */}
      {isTeam && sortedTeams.length > 0 && (
        <div className="classroom-card">
          <h2 className="font-black text-foreground mb-4 flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-500" />Team Scoreboard
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {sortedTeams.map((team: any, i: number) => {
              const grad = TEAM_GRADIENTS[team.color] ?? "from-violet-500 to-indigo-600";
              const maxXP = sortedTeams[0].xp || 1;
              return (
                <div key={team.id} className="p-4 rounded-2xl bg-secondary border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-black text-foreground">{team.name}</span>
                    {i === 0 && <span className="text-xl">👑</span>}
                  </div>
                  <p className="text-3xl font-black text-foreground mb-2">{team.xp} <span className="text-sm text-muted-foreground font-semibold">XP</span></p>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div className={cn("h-full rounded-full bg-gradient-to-r", grad)}
                      style={{ width: `${(team.xp / maxXP) * 100}%` }} />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1.5">{team.members.length} members</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Participation form */}
      <ParticipationForm
        sessionId={session.id}
        students={session.class.students}
        initialScores={participationMap}
        isCompleted={session.completed}
      />

      {session.completed && (
        <div className="flex gap-3">
          <Link href={`/session/${id}/summary`} className="btn-primary flex-1 text-center">View Full Summary →</Link>
        </div>
      )}
    </div>
  );
}
