import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Trophy, Zap, Flame, Award, TrendingUp, Crown } from "lucide-react";
import { getLevelInfo } from "@/lib/level";
import { XPBar } from "@/components/xp-bar";
import { StreakBadge, AchievementBadge } from "@/components/achievement-badge";

async function getLeaderboardData() {
  const [allRewards, totalStudents, totalXP, topAchievers] = await Promise.all([
    prisma.reward.findMany({
      orderBy: { xp: "desc" },
      include: { student: { include: { achievements: true, class: true } } },
    }),
    prisma.student.count(),
    prisma.reward.aggregate({ _sum: { xp: true } }),
    prisma.achievement.groupBy({ by: ["studentId"], _count: { id: true }, orderBy: { _count: { id: "desc" } }, take: 3 }),
  ]);
  return { allRewards, totalStudents, totalXP: totalXP._sum.xp ?? 0, topAchievers };
}

const MEDAL_CONFIG = [
  { emoji: "🥇", bg: "bg-gradient-to-br from-amber-400 to-yellow-500", glow: "shadow-amber-300", ring: "ring-amber-400", label: "1st Place" },
  { emoji: "🥈", bg: "bg-gradient-to-br from-slate-400 to-slate-500",  glow: "shadow-slate-300", ring: "ring-slate-400", label: "2nd Place" },
  { emoji: "🥉", bg: "bg-gradient-to-br from-orange-400 to-amber-600", glow: "shadow-orange-300", ring: "ring-orange-400",label: "3rd Place" },
];

export default async function LeaderboardPage() {
  const data = await getLeaderboardData();
  const top3   = data.allRewards.slice(0, 3);
  const rest   = data.allRewards.slice(3);

  return (
    <div className="page-container">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Trophy className="w-6 h-6 text-amber-500" />
            <h1 className="text-2xl font-black text-foreground">Leaderboard</h1>
          </div>
          <p className="text-muted-foreground text-sm">
            {data.allRewards.length} students on the board · {data.totalXP.toLocaleString()} total XP earned
          </p>
        </div>
        <div className="flex items-center gap-2 bg-violet-50 border border-violet-200 rounded-xl px-4 py-2">
          <Zap className="w-4 h-4 text-violet-600" />
          <span className="text-sm font-black text-violet-700">{data.totalXP.toLocaleString()} XP</span>
        </div>
      </div>

      {/* Top 3 Podium */}
      {top3.length > 0 && (
        <div className="classroom-card overflow-hidden" style={{ background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e1b4b 100%)" }}>
          <div className="flex items-center gap-2 mb-6">
            <Crown className="w-5 h-5 text-amber-400" />
            <h2 className="font-black text-white">Top Champions</h2>
          </div>
          <div className="flex items-end justify-center gap-4 pb-2">
            {/* Podium order: 2nd, 1st, 3rd */}
            {[top3[1], top3[0], top3[2]].map((r: any, podiumIdx: number) => {
              if (!r) return <div key={podiumIdx} className="w-36" />;
              const rankIdx = podiumIdx === 0 ? 1 : podiumIdx === 1 ? 0 : 2;
              const medal   = MEDAL_CONFIG[rankIdx];
              const { level, avatar } = getLevelInfo(r.xp);
              const heights = ["h-28", "h-36", "h-20"];
              const nameShort = r.student.name.split(" ")[0];
              return (
                <div key={r.id} className="flex flex-col items-center gap-2">
                  {rankIdx === 0 && <span className="text-2xl animate-float">👑</span>}
                  <Link href={`/students/${r.student.id}`} className="flex flex-col items-center gap-2 hover:opacity-90 transition-opacity">
                    <div className={`w-14 h-14 rounded-2xl ring-2 ${medal.ring} flex items-center justify-center text-xl font-black text-white ${medal.bg}`}
                      style={{ boxShadow: `0 0 20px var(--tw-shadow-color)` }}>
                      {nameShort[0]}
                    </div>
                    <p className="text-white font-black text-sm">{nameShort}</p>
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-black text-white bg-gradient-to-r ${avatar.gradient}`}>
                      {avatar.emoji} {r.xp} XP
                    </span>
                    {r.streak > 0 && <span className="text-orange-300 text-xs font-bold">🔥 {r.streak}</span>}
                  </Link>
                  <div className={`w-28 ${heights[rankIdx]} rounded-t-2xl flex items-end justify-center pb-3`}
                    style={{ background: rankIdx === 0 ? "rgba(251,191,36,0.25)" : rankIdx === 1 ? "rgba(148,163,184,0.2)" : "rgba(251,146,60,0.2)", border: `2px solid ${rankIdx === 0 ? "rgba(251,191,36,0.4)" : rankIdx === 1 ? "rgba(148,163,184,0.3)" : "rgba(251,146,60,0.3)"}` }}>
                    <span className="text-2xl">{medal.emoji}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Full Rankings */}
      <div className="classroom-card">
        <h2 className="font-black text-foreground mb-4 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-violet-600" />Full Rankings
        </h2>
        <div className="space-y-2">
          {data.allRewards.map((r: any, i: number) => {
            const { level, avatar } = getLevelInfo(r.xp);
            return (
              <Link key={r.id} href={`/students/${r.student.id}`}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-secondary transition-colors group">
                <span className="w-7 text-center text-sm font-black text-muted-foreground">
                  {i < 3 ? ["🥇","🥈","🥉"][i] : `#${i+1}`}
                </span>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-100 to-indigo-100 flex items-center justify-center text-sm font-black text-violet-700 shrink-0">
                  {r.student.name.split(" ").map((n:string)=>n[0]).join("").slice(0,2)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-bold text-sm text-foreground">{r.student.name}</p>
                    <span className="text-xs text-muted-foreground">{r.student.class.name}</span>
                  </div>
                  <XPBar xp={r.xp} showLabel={false} size="sm" animated={false} />
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {r.streak > 0 && <span className="text-xs font-bold text-orange-500">🔥{r.streak}</span>}
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black text-white bg-gradient-to-r ${avatar.gradient}`}>
                    {avatar.emoji} Lv.{level}
                  </span>
                  <span className="text-sm font-black text-violet-700 w-16 text-right">{r.xp} XP</span>
                </div>
                <div className="flex gap-1">
                  {r.student.achievements.slice(0,3).map((a:any) => (
                    <span key={a.id} title={a.label} className="text-lg">{a.icon}</span>
                  ))}
                </div>
              </Link>
            );
          })}
          {data.allRewards.length === 0 && (
            <p className="text-muted-foreground text-sm text-center py-8">No XP data yet. Start a session!</p>
          )}
        </div>
      </div>
    </div>
  );
}
