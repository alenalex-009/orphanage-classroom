import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getTodayDate, formatDate } from "@/lib/utils";
import { XPBar } from "@/components/xp-bar";
import { DailyChallenge } from "@/components/daily-challenge";
import { getQuestionsForTopic } from "@/lib/question-bank";
import { getLevelInfo } from "@/lib/avatars";
import { CheckSquare, BookOpen, Smile, Users, Calendar, Award, Zap, Trophy } from "lucide-react";

async function getDashboardData() {
  const today = getTodayDate();
  const [classes, todayAttendance, todaySessions, totalStudents, topStudents, recentAchievements, totalXPAgg] =
    await Promise.all([
      prisma.class.findMany({ include: { _count: { select: { students: true } } } }),
      prisma.attendance.findMany({ where: { date: today } }),
      prisma.session.findMany({
        where: { date: today },
        include: { class: true, participation: true, activityEvents: true },
        orderBy: { createdAt: "desc" },
      }),
      prisma.student.count(),
      prisma.reward.findMany({
        orderBy: { xp: "desc" }, take: 5,
        include: { student: { include: { achievements: true, class: true } } },
      }),
      prisma.achievement.findMany({ orderBy: { date: "desc" }, take: 5, include: { student: true } }),
      prisma.reward.aggregate({ _sum: { xp: true } }),
    ]);
  const presentToday = todayAttendance.filter((a: any) => a.status === "present").length;
  const todayMood = await prisma.moodLog.findFirst({ where: { date: today }, orderBy: { createdAt: "desc" } });
  const activeSession = todaySessions.find((s: any) => !s.completed) ?? null;
  return {
    classes, presentToday, markedToday: todayAttendance.length,
    totalStudents, todaySessions, todayMood, topStudents,
    recentAchievements, totalXP: totalXPAgg._sum.xp ?? 0, activeSession,
  };
}

function getDominantMood(m: { happyCount:number; neutralCount:number; sadCount:number; angryCount:number }) {
  return [
    { label:"Happy",   emoji:"😊", count:m.happyCount   },
    { label:"Neutral", emoji:"😐", count:m.neutralCount  },
    { label:"Sad",     emoji:"😢", count:m.sadCount      },
    { label:"Angry",   emoji:"😠", count:m.angryCount    },
  ].sort((a,b)=>b.count-a.count)[0];
}

export default async function DashboardPage() {
  const data = await getDashboardData();
  const mood = data.todayMood ? getDominantMood(data.todayMood) : null;
  const challengeTopic = data.activeSession?.topic ?? "moral values";
  const challengeQ = getQuestionsForTopic(challengeTopic).find(q => q.type === "mcq");
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";

  return (
    <div className="page-container">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-foreground">{greeting}! 👋</h1>
          <p className="text-muted-foreground text-sm mt-0.5">{formatDate(new Date())}</p>
        </div>
        <div className="flex gap-2">
          {data.totalXP > 0 && (
            <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl border-2 border-violet-200 bg-violet-50"
              style={{ boxShadow:"var(--shadow-clay-sm)" }}>
              <Zap className="w-4 h-4 text-violet-600" />
              <span className="text-sm font-black text-violet-700">{data.totalXP.toLocaleString()} XP</span>
            </div>
          )}
          <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl border-2 border-indigo-100 bg-white"
            style={{ boxShadow:"var(--shadow-clay-sm)" }}>
            <Calendar className="w-4 h-4 text-indigo-500" />
            <span className="text-sm font-semibold">{data.classes.length} Class{data.classes.length!==1?"es":""}</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label:"Students",      value:String(data.totalStudents),                        emoji:"👥", bg:"bg-sky-50",    border:"border-sky-200",    vColor:"text-sky-700"     },
          { label:"Present Today", value:`${data.presentToday}/${data.markedToday}`,        emoji:"✅", bg:"bg-emerald-50",border:"border-emerald-200",vColor:"text-emerald-700",
            sub:data.markedToday>0?`${Math.round((data.presentToday/data.markedToday)*100)}% rate`:"Not marked" },
          { label:"Sessions",      value:String(data.todaySessions.length),                 emoji:"📖", bg:"bg-amber-50",  border:"border-amber-200",  vColor:"text-amber-700",
            sub:`${data.todaySessions.filter((s:any)=>s.completed).length} completed` },
          { label:"Mood",          value:mood?.emoji??"—",                                  emoji:"😊", bg:"bg-pink-50",   border:"border-pink-200",   vColor:"text-pink-700",
            sub:mood?.label??"Not recorded" },
        ].map(s => (
          <div key={s.label} className={`stat-card border-2 ${s.border} ${s.bg}`}>
            <span className="text-2xl">{s.emoji}</span>
            <p className={`text-2xl font-black ${s.vColor}`}>{s.value}</p>
            <p className="text-xs font-bold text-muted-foreground">{s.label}</p>
            {(s as any).sub && <p className="text-[11px] text-muted-foreground">{(s as any).sub}</p>}
          </div>
        ))}
      </div>

      {/* Daily Challenge */}
      {challengeQ && (
        <DailyChallenge question={challengeQ} topic={challengeTopic}
          sessionId={data.activeSession?.id} classId={data.activeSession?.classId} />
      )}

      {/* Quick Actions */}
      <div>
        <h2 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-3">Quick Actions</h2>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {[
            { href:"/attendance", icon:"✅", label:"Attendance", from:"#10b981", to:"#14b8a6", shadow:"rgba(16,185,129,0.4)"  },
            { href:"/session",    icon:"📖", label:"Session",    from:"#f59e0b", to:"#f97316", shadow:"rgba(245,158,11,0.4)"  },
            { href:"/learn",      icon:"📚", label:"Learn",      from:"#6366f1", to:"#8b5cf6", shadow:"rgba(99,102,241,0.4)"  },
            { href:"/stories",    icon:"✨", label:"Stories",    from:"#ec4899", to:"#a855f7", shadow:"rgba(236,72,153,0.4)"  },
            { href:"/mood",       icon:"😊", label:"Mood",       from:"#0ea5e9", to:"#6366f1", shadow:"rgba(14,165,233,0.4)"  },
            { href:"/leaderboard",icon:"🏆", label:"Leaderboard",from:"#f59e0b", to:"#eab308", shadow:"rgba(245,158,11,0.4)"  },
          ].map(q => (
            <Link key={q.href} href={q.href}
              className="flex flex-col items-center gap-2 p-4 rounded-3xl text-white font-black text-xs
                         transition-all duration-200 hover:-translate-y-1 active:scale-95 border-2 border-white/20"
              style={{
                background: `linear-gradient(135deg, ${q.from}, ${q.to})`,
                boxShadow: `3px 4px 12px ${q.shadow}, inset 0 1px 0 rgba(255,255,255,0.2)`,
              }}>
              <span className="text-2xl">{q.icon}</span>
              {q.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Top Students + Sessions */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="clay-card border-2 border-indigo-100">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-black text-foreground flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-500" />Top Students
            </h2>
            <Link href="/leaderboard" className="text-xs text-violet-600 font-black hover:underline">Board →</Link>
          </div>
          <div className="space-y-2">
            {data.topStudents.length === 0 ? (
              <p className="text-muted-foreground text-sm text-center py-4">No XP yet!</p>
            ) : data.topStudents.map((r:any, i:number) => {
              const { level, avatar } = getLevelInfo(r.xp);
              const medals = ["🥇","🥈","🥉","4️⃣","5️⃣"];
              return (
                <Link key={r.id} href={`/students/${r.student.id}`}
                  className="flex items-center gap-3 p-3 rounded-2xl hover:bg-indigo-50 border border-transparent hover:border-indigo-200 transition-colors">
                  <span className="text-xl w-7 text-center">{medals[i]}</span>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center text-base shrink-0"
                    style={{ background:"linear-gradient(135deg,#6366f1,#8b5cf6)", boxShadow:"2px 2px 6px rgba(99,102,241,0.3)" }}>
                    {avatar.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-black text-foreground truncate">{r.student.name}</p>
                    <XPBar xp={r.xp} showLabel={false} size="sm" animated={false} />
                  </div>
                  <span className="text-xs font-black text-violet-700">{r.xp} XP</span>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="clay-card border-2 border-amber-100">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-black text-foreground flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-500" />Today&apos;s Sessions
            </h2>
            <Link href="/session" className="text-xs text-violet-600 font-black hover:underline">All →</Link>
          </div>
          {data.todaySessions.length === 0 ? (
            <div className="text-center py-8 space-y-3">
              <p className="text-4xl">📖</p>
              <p className="text-muted-foreground text-sm">No sessions yet.</p>
              <Link href="/session" className="btn-primary text-xs">Start a Session</Link>
            </div>
          ) : (
            <div className="space-y-2">
              {data.todaySessions.map((s:any) => {
                const xp = s.activityEvents.reduce((t:number,e:any)=>t+e.xpAwarded+e.bonusXP,0);
                return (
                  <Link key={s.id} href={`/session/${s.id}${!s.completed?"/live":"/summary"}`}
                    className="flex items-center gap-3 p-3 rounded-2xl hover:bg-amber-50 border border-transparent hover:border-amber-200 transition-colors bg-secondary">
                    <span className={`w-2 h-2 rounded-full shrink-0 ${s.completed?"bg-emerald-500":"bg-amber-400 animate-pulse"}`} />
                    <div className="flex-1 min-w-0">
                      <p className="font-black text-sm text-foreground truncate">{s.topic}</p>
                      <p className="text-xs text-muted-foreground">{s.class.name}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {xp>0 && <span className="text-xs font-black text-violet-600">+{xp} XP</span>}
                      <span className={`text-xs font-black px-2.5 py-1 rounded-full ${s.completed?"bg-emerald-100 text-emerald-700":"bg-amber-100 text-amber-700"}`}>
                        {s.completed?"Done":"● Live"}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Achievements */}
      {data.recentAchievements.length > 0 && (
        <div className="clay-card border-2 border-amber-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-black text-foreground flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-500" />Recent Achievements
            </h2>
            <Link href="/students" className="text-xs text-violet-600 font-black hover:underline">Students →</Link>
          </div>
          <div className="flex flex-wrap gap-2">
            {data.recentAchievements.map((a:any) => (
              <Link key={a.id} href={`/students/${a.student.id}`}
                className="flex items-center gap-2 px-3 py-2 bg-amber-50 border-2 border-amber-200 rounded-2xl hover:bg-amber-100 transition-colors"
                style={{ boxShadow:"var(--shadow-clay-sm)" }}>
                <span className="text-xl">{a.icon}</span>
                <div>
                  <p className="text-xs font-black text-amber-800">{a.student.name.split(" ")[0]}</p>
                  <p className="text-[10px] text-amber-600">{a.label}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Learn + Stories CTAs */}
      <div className="grid md:grid-cols-2 gap-4">
        <Link href="/learn"
          className="clay-card border-2 border-violet-200 bg-gradient-to-br from-violet-50 to-indigo-50 flex items-center gap-4 hover:!-translate-y-1">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0"
            style={{ background:"linear-gradient(135deg,#6366f1,#8b5cf6)", boxShadow:"3px 3px 10px rgba(99,102,241,0.35)" }}>📚</div>
          <div>
            <p className="font-black text-violet-900">Learning Resources</p>
            <p className="text-xs text-violet-600 mt-0.5">30 topics · Primary to Higher Ed</p>
          </div>
          <span className="ml-auto text-violet-400 font-black text-lg">→</span>
        </Link>
        <Link href="/stories"
          className="clay-card border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-yellow-50 flex items-center gap-4 hover:!-translate-y-1">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0"
            style={{ background:"linear-gradient(135deg,#f59e0b,#f97316)", boxShadow:"3px 3px 10px rgba(245,158,11,0.35)" }}>✨</div>
          <div>
            <p className="font-black text-amber-900">Story Mode</p>
            <p className="text-xs text-amber-700 mt-0.5">9 interactive stories with XP</p>
          </div>
          <span className="ml-auto text-amber-400 font-black text-lg">→</span>
        </Link>
      </div>
    </div>
  );
}
