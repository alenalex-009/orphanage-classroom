import { notFound } from "next/navigation";
import { getSessionSummary } from "@/actions/gamification";
import { formatDate, getInitials } from "@/lib/utils";
import Link from "next/link";
import { Trophy, Zap, ArrowLeft, Crown } from "lucide-react";
import { XPBar } from "@/components/xp-bar";
import { getLevelInfo } from "@/lib/avatars";
import { cn } from "@/lib/utils";

interface Props { params: Promise<{ id: string }> }

const TEAM_STYLES: Record<string, { bg:string; border:string; text:string; bar:string }> = {
  teal:   { bg:"bg-teal-50",   border:"border-teal-300",  text:"text-teal-800",  bar:"#14b8a6" },
  amber:  { bg:"bg-amber-50",  border:"border-amber-300", text:"text-amber-800", bar:"#f59e0b" },
  purple: { bg:"bg-violet-50", border:"border-violet-300",text:"text-violet-800",bar:"#8b5cf6" },
  coral:  { bg:"bg-rose-50",   border:"border-rose-300",  text:"text-rose-800",  bar:"#f43f5e" },
};

export default async function SessionSummaryPage({ params }: Props) {
  const { id } = await params;
  const data = await getSessionSummary(id);
  if (!data) notFound();

  const { session, topStudents, totalEvents } = data;
  const sortedTeams = session.mode==="team" ? [...session.teams].sort((a:any,b:any)=>b.xp-a.xp) : [];
  const totalXP = session.activityEvents.reduce((s:number,e:any)=>s+e.xpAwarded+e.bonusXP, 0);

  return (
    <div className="page-container">
      <Link href="/session" className="inline-flex items-center gap-1.5 text-xs text-violet-600 font-black hover:underline">
        <ArrowLeft className="w-3 h-3" />Back to Sessions
      </Link>

      {/* Hero */}
      <div className="relative overflow-hidden rounded-3xl p-8 text-white border-3 border-violet-300"
        style={{ background:"linear-gradient(160deg, #1e1b4b 0%, #312e81 50%, #1e1b4b 100%)" }}>
        <div className="absolute -top-8 -right-8 text-[140px] opacity-10 select-none leading-none">🎉</div>
        <div className="text-center relative z-10">
          <p className="text-6xl mb-4">🎉</p>
          <h1 className="text-3xl font-black mb-2">Session Complete!</h1>
          <p className="text-indigo-300 font-bold">{session.topic}</p>
          <p className="text-indigo-400 text-sm mt-0.5">{session.class.name} · {formatDate(session.date)}</p>
          <div className="flex justify-center gap-6 mt-6">
            {[
              { icon:"⚡", label:"Total XP",   value:totalXP    },
              { icon:"📊", label:"Activities", value:totalEvents },
              { icon:"👥", label:"Students",   value:session.class.students?.length??"—" },
            ].map(s => (
              <div key={s.label} className="flex flex-col items-center bg-white/10 backdrop-blur-sm rounded-2xl px-5 py-3">
                <span className="text-2xl">{s.icon}</span>
                <span className="text-2xl font-black mt-1">{s.value}</span>
                <span className="text-indigo-400 text-xs font-bold">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team results */}
      {sortedTeams.length > 0 && (
        <div className="clay-card border-2 border-indigo-100">
          <h2 className="font-black text-foreground mb-4 flex items-center gap-2">
            <Crown className="w-4 h-4 text-amber-500" />Team Results
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {sortedTeams.map((team:any, i:number) => {
              const ts = TEAM_STYLES[team.color] ?? TEAM_STYLES.teal;
              const maxXP = sortedTeams[0].xp || 1;
              return (
                <div key={team.id} className={cn("p-5 rounded-3xl border-2 relative", ts.bg, ts.border)}
                  style={{ boxShadow:"var(--shadow-clay-sm)" }}>
                  {i===0 && <span className="absolute top-3 right-3 text-2xl">👑</span>}
                  <p className={cn("font-black text-lg", ts.text)}>{team.name}</p>
                  <p className={cn("text-4xl font-black mt-1", ts.text)}>{team.xp} <span className="text-sm opacity-60">XP</span></p>
                  <div className="mt-3 h-2.5 rounded-full overflow-hidden bg-white/60">
                    <div className="h-full rounded-full transition-all duration-700"
                      style={{ width:`${(team.xp/maxXP)*100}%`, background:ts.bar }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Top Students */}
      <div className="clay-card border-2 border-amber-100">
        <h2 className="font-black text-foreground mb-4 flex items-center gap-2">
          <Trophy className="w-4 h-4 text-amber-500" />Top Performers
        </h2>
        <div className="space-y-3">
          {topStudents.map((s:any, i:number) => {
            const xp = s.reward?.xp ?? 0;
            const { avatar, level } = getLevelInfo(xp);
            const medals = ["🥇","🥈","🥉"];
            return (
              <Link key={s.id} href={`/students/${s.id}`}
                className="flex items-center gap-4 p-4 rounded-2xl hover:bg-amber-50 transition-colors border border-transparent hover:border-amber-200">
                <span className="text-2xl w-8 text-center">{medals[i]??`#${i+1}`}</span>
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center text-xl shrink-0"
                  style={{ background:"linear-gradient(135deg,#6366f1,#8b5cf6)", boxShadow:"2px 2px 8px rgba(99,102,241,0.3)" }}>
                  {avatar.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-black text-sm text-foreground">{s.name}</p>
                  <XPBar xp={xp} showLabel={false} size="sm" animated={false} />
                </div>
                <span className="text-sm font-black text-violet-700 shrink-0">{xp} XP</span>
                <div className="flex gap-1">{s.achievements?.slice(0,3).map((a:any)=><span key={a.id} className="text-lg" title={a.label}>{a.icon}</span>)}</div>
              </Link>
            );
          })}
          {topStudents.length===0 && <p className="text-muted-foreground text-sm text-center py-4">No scores recorded.</p>}
        </div>
      </div>

      <div className="flex gap-3">
        <Link href="/session" className="btn-secondary flex-1 text-center">← Sessions</Link>
        <Link href="/leaderboard" className="btn-primary flex-1 text-center">🏆 Leaderboard</Link>
      </div>
    </div>
  );
}
