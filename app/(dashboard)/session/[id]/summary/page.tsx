import { notFound } from "next/navigation";
import { getSessionSummary } from "@/actions/gamification";
import { formatDate, getInitials } from "@/lib/utils";
import Link from "next/link";
import { Trophy, Star, Zap, ArrowLeft, Crown, Award } from "lucide-react";
import { XPBar } from "@/components/xp-bar";
import { getLevelInfo } from "@/lib/level";
import { cn } from "@/lib/utils";

interface Props { params: Promise<{ id: string }> }

const TEAM_COLORS: Record<string, { bg: string; border: string; text: string; gradient: string }> = {
  teal:   { bg:"bg-teal-50",   border:"border-teal-300",  text:"text-teal-800",  gradient:"from-teal-500 to-emerald-500"  },
  amber:  { bg:"bg-amber-50",  border:"border-amber-300", text:"text-amber-800", gradient:"from-amber-500 to-orange-500"  },
  purple: { bg:"bg-violet-50", border:"border-violet-300",text:"text-violet-800",gradient:"from-violet-500 to-purple-600" },
  coral:  { bg:"bg-rose-50",   border:"border-rose-300",  text:"text-rose-800",  gradient:"from-rose-500 to-pink-500"     },
};

export default async function SessionSummaryPage({ params }: Props) {
  const { id } = await params;
  const data = await getSessionSummary(id);
  if (!data) notFound();

  const { session, topStudents, totalEvents } = data;
  const isTeamMode = session.mode === "team";
  const winningTeam = isTeamMode && session.teams.length > 0 ? [...session.teams].sort((a: any, b: any) => b.xp - a.xp)[0] : null;
  const totalXP = session.activityEvents.reduce((s: number, e: any) => s + e.xpAwarded + e.bonusXP, 0);

  return (
    <div className="page-container">
      <Link href="/session" className="inline-flex items-center gap-1.5 text-xs text-violet-600 font-bold hover:underline mb-1">
        <ArrowLeft className="w-3 h-3" />Back to Sessions
      </Link>

      {/* Hero banner */}
      <div className="relative overflow-hidden rounded-3xl p-8 text-white"
        style={{ background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e1b4b 100%)" }}>
        <div className="absolute -top-8 -right-8 w-48 h-48 bg-white/5 rounded-full" />
        <div className="absolute bottom-0 left-1/3 w-32 h-32 bg-white/5 rounded-full translate-y-8" />
        <div className="relative z-10 text-center">
          <p className="text-6xl mb-4">🎉</p>
          <h1 className="text-3xl font-black mb-2">Session Complete!</h1>
          <p className="text-indigo-300 font-bold">{session.topic}</p>
          <p className="text-indigo-400 text-sm mt-1">{session.class.name} · {formatDate(session.date)}</p>
          <div className="flex justify-center gap-6 mt-6">
            {[
              { icon:"⚡", label:"Total XP", value:totalXP },
              { icon:"📊", label:"Activities", value:totalEvents },
              { icon:"👥", label:"Students", value:session.class.students?.length ?? "—" },
            ].map(s => (
              <div key={s.label} className="flex flex-col items-center">
                <span className="text-2xl">{s.icon}</span>
                <span className="text-2xl font-black mt-1">{s.value}</span>
                <span className="text-indigo-400 text-xs font-bold">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Winning team */}
      {winningTeam && (() => {
        const tc = TEAM_COLORS[winningTeam.color] ?? TEAM_COLORS.teal;
        const allTeams = [...session.teams].sort((a: any, b: any) => b.xp - a.xp);
        return (
          <div className="classroom-card">
            <h2 className="font-black text-foreground mb-4 flex items-center gap-2"><Crown className="w-4 h-4 text-amber-500" />Team Results</h2>
            <div className="grid grid-cols-2 gap-3">
              {allTeams.map((team: any, i: number) => {
                const tc2 = TEAM_COLORS[team.color] ?? TEAM_COLORS.teal;
                return (
                  <div key={team.id} className={cn("p-5 rounded-2xl border-2", tc2.bg, tc2.border, "relative")}>
                    {i === 0 && <span className="absolute top-3 right-3 text-2xl">👑</span>}
                    <p className={cn("font-black text-lg", tc2.text)}>{team.name}</p>
                    <p className={cn("text-4xl font-black mt-1", tc2.text)}>{team.xp} XP</p>
                    <div className="mt-2 h-2 rounded-full bg-white/50 overflow-hidden">
                      <div className={cn("h-full rounded-full bg-gradient-to-r", tc2.gradient)}
                        style={{ width: `${(team.xp / allTeams[0].xp) * 100}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })()}

      {/* Top students */}
      <div className="classroom-card">
        <h2 className="font-black text-foreground mb-4 flex items-center gap-2"><Trophy className="w-4 h-4 text-amber-500" />Top Performers</h2>
        <div className="space-y-3">
          {topStudents.map((s: any, i: number) => {
            const xp = s.reward?.xp ?? 0;
            const { level, avatar } = getLevelInfo(xp);
            return (
              <Link key={s.id} href={`/students/${s.id}`}
                className="flex items-center gap-4 p-4 rounded-2xl hover:bg-secondary transition-colors">
                <span className="text-2xl w-8 text-center">{["🥇","🥈","🥉"][i] ?? `#${i+1}`}</span>
                <div className={cn("w-11 h-11 rounded-xl flex items-center justify-center text-sm font-black text-white bg-gradient-to-br", avatar.gradient)}>
                  {getInitials(s.name)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-black text-sm text-foreground">{s.name}</p>
                  <XPBar xp={xp} showLabel={false} size="sm" animated={false} />
                </div>
                <span className={cn("px-3 py-1 rounded-full text-xs font-black text-white bg-gradient-to-r", avatar.gradient)}>{avatar.emoji} {xp} XP</span>
                <div className="flex gap-1">{s.achievements?.slice(0,3).map((a: any) => <span key={a.id} className="text-lg" title={a.label}>{a.icon}</span>)}</div>
              </Link>
            );
          })}
          {topStudents.length === 0 && <p className="text-muted-foreground text-sm text-center py-4">No scores recorded this session.</p>}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Link href="/session" className="btn-secondary flex-1 text-center">← Back to Sessions</Link>
        <Link href="/leaderboard" className="btn-primary flex-1 text-center">🏆 View Leaderboard</Link>
      </div>
    </div>
  );
}
