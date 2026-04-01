import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Trophy, Zap, Crown, TrendingUp } from "lucide-react";
import { XPBar } from "@/components/xp-bar";
import { getLevelInfo } from "@/lib/avatars";

async function getLeaderboardData() {
  const [allRewards, totalXP] = await Promise.all([
    prisma.reward.findMany({
      orderBy: { xp: "desc" },
      include: { student: { include: { achievements: true, class: true } } },
    }),
    prisma.reward.aggregate({ _sum: { xp: true } }),
  ]);
  return { allRewards, totalXP: totalXP._sum.xp ?? 0 };
}

const PODIUM = [
  { ring:"border-amber-400",  glow:"rgba(251,191,36,0.4)",  bg:"linear-gradient(135deg,#fbbf24,#f59e0b)", height:"h-32", medal:"🥇", place:"1st" },
  { ring:"border-slate-400",  glow:"rgba(148,163,184,0.4)", bg:"linear-gradient(135deg,#94a3b8,#64748b)", height:"h-24", medal:"🥈", place:"2nd" },
  { ring:"border-orange-400", glow:"rgba(251,146,60,0.4)",  bg:"linear-gradient(135deg,#fb923c,#ea580c)", height:"h-20", medal:"🥉", place:"3rd" },
];

export default async function LeaderboardPage() {
  const { allRewards, totalXP } = await getLeaderboardData();
  const top3 = allRewards.slice(0, 3);
  const rest  = allRewards.slice(3);

  return (
    <div className="page-container">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Trophy className="w-5 h-5 text-amber-500" />
            <h1 className="text-2xl font-black text-foreground">Leaderboard</h1>
          </div>
          <p className="text-muted-foreground text-sm">
            {allRewards.length} students on the board · {totalXP.toLocaleString()} total XP
          </p>
        </div>
        <div className="flex items-center gap-2 bg-violet-50 border-2 border-violet-100 rounded-2xl px-4 py-2"
          style={{ boxShadow:"var(--shadow-clay-sm)" }}>
          <Zap className="w-4 h-4 text-violet-600" />
          <span className="text-sm font-black text-violet-700">{totalXP.toLocaleString()} XP</span>
        </div>
      </div>

      {/* ── Podium ─────────────────────────────────────── */}
      {top3.length > 0 && (
        <div className="clay-card overflow-hidden border-3 border-indigo-100"
          style={{ background:"linear-gradient(135deg, #1e1b4b 0%, #312e81 60%, #1e1b4b 100%)" }}>
          <div className="flex items-center gap-2 mb-8 px-2">
            <Crown className="w-5 h-5 text-amber-400" />
            <span className="font-black text-white">Top Champions</span>
          </div>
          <div className="flex items-end justify-center gap-6 pb-2">
            {/* 2nd, 1st, 3rd order */}
            {[top3[1], top3[0], top3[2]].map((r: any, podIdx: number) => {
              if (!r) return <div key={podIdx} className="w-28" />;
              const rankIdx = [1, 0, 2][podIdx];
              const pod = PODIUM[rankIdx];
              const { level, avatar } = getLevelInfo(r.xp);
              return (
                <div key={r.id} className="flex flex-col items-center gap-3">
                  {rankIdx === 0 && <span className="text-3xl animate-float">👑</span>}
                  <Link href={`/students/${r.student.id}`}
                    className="flex flex-col items-center gap-2 group">
                    <div className="w-16 h-16 rounded-2xl border-3 flex items-center justify-center text-3xl transition-transform group-hover:scale-110"
                      style={{ background: pod.bg, borderColor: pod.ring.replace("border-",""), boxShadow:`0 0 20px ${pod.glow}` }}>
                      {avatar.emoji}
                    </div>
                    <p className="text-white font-black text-sm">{r.student.name.split(" ")[0]}</p>
                    <span className="text-xs font-black px-3 py-1 rounded-full text-white border border-white/20"
                      style={{ background:"rgba(255,255,255,0.15)" }}>
                      {r.xp} XP
                    </span>
                  </Link>
                  <div className={cn("w-24 rounded-t-2xl flex items-end justify-center pb-3", pod.height)}
                    style={{ background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.12)" }}>
                    <span className="text-3xl">{pod.medal}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Full Rankings ───────────────────────────────── */}
      <div className="clay-card">
        <h2 className="font-black text-foreground mb-4 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-violet-600" />Full Rankings
        </h2>
        <div className="space-y-2">
          {allRewards.map((r: any, i: number) => {
            const { level, avatar } = getLevelInfo(r.xp);
            const medals = ["🥇","🥈","🥉"];
            return (
              <Link key={r.id} href={`/students/${r.student.id}`}
                className="flex items-center gap-4 p-3 rounded-2xl hover:bg-indigo-50 border-2 border-transparent hover:border-indigo-100 transition-all">
                <span className="w-8 text-center text-sm font-black text-muted-foreground">
                  {i < 3 ? medals[i] : `#${i + 1}`}
                </span>
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-xl border-2 border-white shrink-0"
                  style={{ background:"linear-gradient(135deg, #ede9fe, #ddd6fe)", boxShadow:"2px 2px 6px rgba(99,102,241,0.15)" }}>
                  {avatar.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-black text-sm text-foreground truncate">{r.student.name}</p>
                    <span className="text-xs text-muted-foreground shrink-0">{r.student.class.name}</span>
                  </div>
                  <XPBar xp={r.xp} showLabel={false} size="sm" animated={false} />
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {r.streak > 0 && <span className="text-xs font-black text-orange-500">🔥{r.streak}</span>}
                  <span className="text-xs font-black text-violet-700 bg-violet-100 border border-violet-200 px-2.5 py-1 rounded-full">
                    Lv.{level}
                  </span>
                  <span className="text-sm font-black text-violet-700 w-16 text-right">{r.xp}</span>
                </div>
                <div className="flex gap-0.5">
                  {r.student.achievements.slice(0, 3).map((a: any) => (
                    <span key={a.id} className="text-base" title={a.label}>{a.icon}</span>
                  ))}
                </div>
              </Link>
            );
          })}
          {allRewards.length === 0 && (
            <p className="text-muted-foreground text-sm text-center py-8">No XP data yet. Start a session!</p>
          )}
        </div>
      </div>
    </div>
  );
}

function cn(...args: (string | undefined | false | null)[]) {
  return args.filter(Boolean).join(" ");
}
