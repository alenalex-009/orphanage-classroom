import { notFound } from "next/navigation";
import { getSessionSummary } from "@/actions/gamification";
import { formatDate, getInitials, cn } from "@/lib/utils";
import Link from "next/link";
import { Trophy, Star, Users, Zap, ArrowLeft, Home } from "lucide-react";

interface Props {
  params: { id: string };
}

const TEAM_COLORS: Record<string, { bg: string; border: string; text: string }> = {
  teal:   { bg: "bg-teal-50",   border: "border-teal-300",  text: "text-teal-800"  },
  amber:  { bg: "bg-amber-50",  border: "border-amber-300", text: "text-amber-800" },
  purple: { bg: "bg-purple-50", border: "border-purple-300",text: "text-purple-800"},
  coral:  { bg: "bg-red-50",    border: "border-red-300",   text: "text-red-800"   },
};

export default async function SessionSummaryPage({ params }: Props) {
  const data = await getSessionSummary(params.id);
  if (!data) notFound();

  const { session, topStudents, totalEvents } = data;
  const isTeamMode = session.mode === "team";
  const winningTeam = isTeamMode && session.teams.length > 0 ? session.teams[0] : null;

  const totalXPAwarded = session.activityEvents.reduce(
    (sum:any, e:any) => sum + e.xpAwarded + e.bonusXP, 0
  );

  return (
    <div className="page-container">
      {/* Back nav */}
      <Link href="/session" className="flex items-center gap-1 text-xs text-teal-700 font-semibold hover:underline">
        <ArrowLeft className="w-3 h-3" />
        Back to Sessions
      </Link>

      {/* Hero header */}
      <div className="classroom-card text-center py-10 bg-gradient-to-br from-teal-50 to-amber-50 border-teal-100">
        <p className="text-5xl mb-3">🎉</p>
        <h1 className="text-3xl font-extrabold text-foreground mb-1">Session Complete!</h1>
        <p className="text-muted-foreground">{session.topic}</p>
        <p className="text-sm text-muted-foreground mt-1">
          {session.class.name} · {formatDate(session.date)}
        </p>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-3 gap-4">
        <div className="stat-card text-center">
          <Zap className="w-5 h-5 text-amber-500 mx-auto" />
          <p className="text-2xl font-extrabold text-amber-600">{totalXPAwarded}</p>
          <p className="text-xs text-muted-foreground">Total XP Awarded</p>
        </div>
        <div className="stat-card text-center">
          <Users className="w-5 h-5 text-teal-600 mx-auto" />
          <p className="text-2xl font-extrabold">{session.class.students.length}</p>
          <p className="text-xs text-muted-foreground">Students</p>
        </div>
        <div className="stat-card text-center">
          <Star className="w-5 h-5 text-purple-500 mx-auto" />
          <p className="text-2xl font-extrabold">{totalEvents}</p>
          <p className="text-xs text-muted-foreground">Activities</p>
        </div>
      </div>

      {/* Team winner */}
      {isTeamMode && winningTeam && (
        <div className="classroom-card text-center">
          <p className="text-4xl mb-2">👑</p>
          <h2 className="text-xl font-extrabold text-foreground mb-1">
            {winningTeam.name} Wins!
          </h2>
          <p className="text-amber-600 font-bold text-lg">{winningTeam.xp} XP</p>
          <div className="flex flex-wrap justify-center gap-2 mt-3">
            {winningTeam.members.map((m:any) => (
              <span key={m.id} className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-semibold">
                {m.student.name}
              </span>
            ))}
          </div>

          {/* All teams */}
          {session.teams.length > 1 && (
            <div className="grid grid-cols-2 gap-3 mt-5">
              {session.teams.map((team:any, idx:any) => {
                const colors = TEAM_COLORS[team.color] ?? TEAM_COLORS.teal;
                return (
                  <div key={team.id} className={cn("p-3 rounded-xl border-2 text-left", colors.bg, colors.border)}>
                    <div className="flex items-center justify-between">
                      <span className={cn("font-bold text-sm", colors.text)}>{team.name}</span>
                      {idx === 0 && <span>👑</span>}
                      {idx === 1 && <span>🥈</span>}
                    </div>
                    <p className={cn("text-xl font-extrabold mt-1", colors.text)}>{team.xp} XP</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Top students */}
      <div className="classroom-card">
        <h2 className="font-bold text-foreground mb-4 flex items-center gap-2">
          <Trophy className="w-4 h-4 text-amber-500" />
          Top Students This Session
        </h2>
        <div className="space-y-2">
          {topStudents.length === 0 ? (
            <p className="text-muted-foreground text-sm text-center py-4">No XP awarded this session.</p>
          ) : (
            topStudents.map((student:any, idx:any) => (
              <Link key={student.id} href={`/students/${student.id}`}
                className="flex items-center gap-3 p-3 rounded-xl bg-secondary hover:bg-muted transition-colors">
                <span className="text-xl w-8 text-center">
                  {idx === 0 ? "🥇" : idx === 1 ? "🥈" : idx === 2 ? "🥉" : `${idx + 1}.`}
                </span>
                <div className="w-9 h-9 rounded-full bg-teal-200 text-teal-800 font-bold text-xs flex items-center justify-center shrink-0">
                  {getInitials(student.name)}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-sm text-foreground">{student.name}</p>
                  <p className="text-xs text-muted-foreground">
                    Total XP: {student.reward?.xp ?? 0} · Level {student.reward?.level ?? 0}
                  </p>
                </div>
                <span className="font-extrabold text-amber-600">+{student.sessionXP} XP</span>
              </Link>
            ))
          )}
        </div>
      </div>

      {/* New achievements earned */}
      <div className="classroom-card">
        <h2 className="font-bold text-foreground mb-4">🏆 Achievements Earned</h2>
        {session.class.students.flatMap((s:any) => s.achievements).length === 0 ? (
          <p className="text-muted-foreground text-sm text-center py-4">No new achievements this session.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {session.class.students.map((s:any) =>
              s.achievements.map((a:any) => (
                <div key={a.id} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-amber-50 border border-amber-100">
                  <span className="text-lg">{a.icon}</span>
                  <div>
                    <p className="text-xs font-bold text-amber-800">{a.label}</p>
                    <p className="text-xs text-amber-600">{s.name}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-3 justify-center pb-6">
        <Link href="/"
          className="action-btn flex items-center gap-2 px-8 bg-teal-700 hover:bg-teal-800 text-white">
          <Home className="w-4 h-4" />
          Back to Dashboard
        </Link>
        <Link href="/session"
          className="action-btn flex items-center gap-2 px-8 bg-secondary border border-border text-foreground hover:bg-muted">
          New Session
        </Link>
      </div>
    </div>
  );
}
