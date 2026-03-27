import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getTodayDate, formatDate } from "@/lib/utils";
import { XPBar, LevelBadge, AvatarDisplay } from "@/components/xp-bar";
import { DailyChallenge } from "@/components/daily-challenge";
import { getQuestionsForTopic } from "@/lib/question-bank";
import { getLevelInfo } from "@/lib/avatars";
import {
  CheckSquare, BookOpen, Smile, Users, TrendingUp,
  Calendar, Award, Zap, Trophy, BookMarked, Sparkles,
} from "lucide-react";

async function getDashboardData() {
  const today = getTodayDate();
  const [classes, todayAttendance, todaySessions, totalStudents, topStudents, recentAchievements, totalXPAgg] =
    await Promise.all([
      prisma.class.findMany({ include: { _count: { select: { students: true } } } }),
      prisma.attendance.findMany({ where: { date: today }, include: { student: true } }),
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
  const totalXP = totalXPAgg._sum.xp ?? 0;

  // Find the most recent active session for daily challenge
  const activeSession = todaySessions.find((s: any) => !s.completed) ?? null;

  return {
    classes, presentToday, markedToday: todayAttendance.length,
    totalStudents, todaySessions, todayMood, topStudents, recentAchievements,
    totalXP, activeSession,
  };
}

function getDominantMood(mood: { happyCount: number; neutralCount: number; sadCount: number; angryCount: number }) {
  return [
    { label: "Happy",   emoji: "😊", count: mood.happyCount   },
    { label: "Neutral", emoji: "😐", count: mood.neutralCount },
    { label: "Sad",     emoji: "😢", count: mood.sadCount     },
    { label: "Angry",   emoji: "😠", count: mood.angryCount   },
  ].sort((a, b) => b.count - a.count)[0];
}

export default async function DashboardPage() {
  const data = await getDashboardData();
  const dominantMood = data.todayMood ? getDominantMood(data.todayMood) : null;

  // Generate today's daily challenge from the active session topic, or use a default
  const challengeTopic = data.activeSession?.topic ?? "moral values";
  const challengeQuestions = getQuestionsForTopic(challengeTopic);
  const dailyQuestion = challengeQuestions.find(q => q.type === "mcq") ?? challengeQuestions[0];

  return (
    <div className="page-container">
      {/* ── Header ──────────────────────────────────────────── */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-black text-foreground">
            Good{(() => { const h = new Date().getHours(); return h < 12 ? " Morning" : h < 17 ? " Afternoon" : " Evening"; })()} 👋
          </h1>
          <p className="text-muted-foreground text-sm mt-0.5">{formatDate(new Date())}</p>
        </div>
        <div className="flex items-center gap-2">
          {data.totalXP > 0 && (
            <div className="flex items-center gap-1.5 bg-violet-50 border border-violet-200 rounded-xl px-3 py-2">
              <Zap className="w-4 h-4 text-violet-600" />
              <span className="text-sm font-black text-violet-700">{data.totalXP.toLocaleString()} XP</span>
            </div>
          )}
          <div className="flex items-center gap-1.5 bg-white border border-border rounded-xl px-3 py-2 shadow-sm">
            <Calendar className="w-4 h-4 text-teal-700" />
            <span className="text-sm font-semibold">{data.classes.length} Class{data.classes.length !== 1 ? "es" : ""}</span>
          </div>
        </div>
      </div>

      {/* ── Stats ───────────────────────────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Students",      value: data.totalStudents,                                            icon: <Users className="w-5 h-5 text-sky-500" />,     bg: "bg-sky-50 border-sky-100"       },
          { label: "Present Today", value: `${data.presentToday}/${data.markedToday}`,                   icon: <CheckSquare className="w-5 h-5 text-emerald-500" />, bg: "bg-emerald-50 border-emerald-100", sub: data.markedToday > 0 ? `${Math.round((data.presentToday / data.markedToday) * 100)}% rate` : "Not marked" },
          { label: "Sessions",      value: data.todaySessions.length,                                    icon: <BookOpen className="w-5 h-5 text-amber-500" />,  bg: "bg-amber-50 border-amber-100",  sub: `${data.todaySessions.filter((s: any) => s.completed).length} completed` },
          { label: "Class Mood",    value: dominantMood?.emoji ?? "—",                                   icon: <Smile className="w-5 h-5 text-pink-500" />,      bg: "bg-pink-50 border-pink-100",    sub: dominantMood?.label ?? "Not recorded" },
        ].map((s) => (
          <div key={s.label} className={`stat-card border ${s.bg}`}>
            <div className="flex items-center justify-between">{s.icon}</div>
            <p className="text-3xl font-black text-foreground">{s.value}</p>
            <p className="text-xs font-bold text-muted-foreground">{s.label}</p>
            {(s as any).sub && <p className="text-xs text-muted-foreground">{(s as any).sub}</p>}
          </div>
        ))}
      </div>

      {/* ── Daily Challenge ─────────────────────────────────── */}
      {dailyQuestion && (
        <DailyChallenge
          question={dailyQuestion}
          topic={challengeTopic}
          sessionId={data.activeSession?.id}
          classId={data.activeSession?.classId}
        />
      )}

      {/* ── Quick Actions ───────────────────────────────────── */}
      <div>
        <h2 className="text-sm font-black text-foreground mb-3 uppercase tracking-wider">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {[
            { href: "/attendance", icon: "✅", label: "Attendance", from: "from-emerald-500", to: "to-teal-500"    },
            { href: "/session",    icon: "📖", label: "Session",    from: "from-amber-500",  to: "to-orange-500"  },
            { href: "/learn",      icon: "📚", label: "Learn",      from: "from-violet-500", to: "to-indigo-600"  },
            { href: "/stories",    icon: "✨", label: "Stories",    from: "from-pink-500",   to: "to-rose-500"    },
            { href: "/mood",       icon: "😊", label: "Mood",       from: "from-sky-500",    to: "to-blue-500"    },
            { href: "/leaderboard",icon: "🏆", label: "Leaderboard",from: "from-yellow-400", to: "to-amber-500"  },
          ].map((q) => (
            <Link key={q.href} href={q.href}
              className={`flex flex-col items-center gap-2 p-4 rounded-2xl text-white font-black text-xs bg-gradient-to-br ${q.from} ${q.to} shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-95 transition-all duration-200`}>
              <span className="text-2xl">{q.icon}</span>
              {q.label}
            </Link>
          ))}
        </div>
      </div>

      {/* ── Top Students + Sessions ─────────────────────────── */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Top Students */}
        <div className="classroom-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-black text-foreground flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-500" />Top Students
            </h2>
            <Link href="/leaderboard" className="text-xs text-violet-600 font-black hover:underline">Full board →</Link>
          </div>
          <div className="space-y-2">
            {data.topStudents.length === 0 ? (
              <p className="text-muted-foreground text-sm text-center py-4">No XP yet — start a session!</p>
            ) : data.topStudents.map((r: any, i: number) => {
              const { level, avatar } = getLevelInfo(r.xp);
              const medals = ["🥇","🥈","🥉","4️⃣","5️⃣"];
              return (
                <Link key={r.id} href={`/students/${r.student.id}`}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-secondary transition-colors">
                  <span className="text-xl w-7 text-center">{medals[i]}</span>
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg bg-gradient-to-br ${avatar.gradient} shrink-0`}>
                    {avatar.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-foreground truncate">{r.student.name}</p>
                    <XPBar xp={r.xp} showLabel={false} size="sm" animated={false} />
                  </div>
                  <div className="shrink-0 text-right">
                    <span className={`text-xs font-black px-2 py-0.5 rounded-full text-purple-600 bg-gradient-to-r ${avatar.gradient}`}>
                      {avatar.emoji} {r.xp}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Today's Sessions */}
        <div className="classroom-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-black text-foreground flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-500" />Today&apos;s Sessions
            </h2>
            <Link href="/session" className="text-xs text-violet-600 font-black hover:underline">View all →</Link>
          </div>
          {data.todaySessions.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground text-sm mb-3">No sessions yet today.</p>
              <Link href="/session" className="btn-primary text-xs">Start a Session</Link>
            </div>
          ) : (
            <div className="space-y-2">
              {data.todaySessions.map((s: any) => {
                const sessionXP = s.activityEvents.reduce((t: number, e: any) => t + e.xpAwarded + e.bonusXP, 0);
                return (
                  <Link key={s.id}
                    href={`/session/${s.id}${!s.completed ? "/live" : "/summary"}`}
                    className="flex items-center gap-3 p-3 rounded-xl bg-secondary hover:bg-muted transition-colors">
                    <div className={`w-2 h-2 rounded-full shrink-0 ${s.completed ? "bg-emerald-500" : "bg-amber-400 animate-pulse"}`} />
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm text-foreground truncate">{s.topic}</p>
                      <p className="text-xs text-muted-foreground">{s.class.name}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {sessionXP > 0 && <span className="text-xs font-bold text-violet-600">+{sessionXP} XP</span>}
                      <span className={`text-xs font-black px-2 py-0.5 rounded-full ${s.completed ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                        {s.completed ? "Done" : "Live"}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* ── Recent Achievements ─────────────────────────────── */}
      {data.recentAchievements.length > 0 && (
        <div className="classroom-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-black text-foreground flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-500" />Recent Achievements
            </h2>
            <Link href="/students" className="text-xs text-violet-600 font-black hover:underline">All students →</Link>
          </div>
          <div className="flex flex-wrap gap-2">
            {data.recentAchievements.map((a: any) => (
              <Link key={a.id} href={`/students/${a.student.id}`}
                className="flex items-center gap-2 px-3 py-2 bg-amber-50 border border-amber-200 rounded-xl hover:bg-amber-100 transition-colors">
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

      {/* ── Learning Resources CTA ──────────────────────────── */}
      <div className="grid md:grid-cols-2 gap-4">
        <Link href="/learn"
          className="flex items-center gap-4 p-5 rounded-2xl border-2 border-violet-200 bg-violet-50 hover:bg-violet-100 hover:border-violet-300 transition-all group">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-2xl shrink-0">
            📚
          </div>
          <div className="flex-1">
            <p className="font-black text-violet-900">Learning Resources</p>
            <p className="text-xs text-violet-600 mt-0.5">Lessons, examples and vocab for every topic</p>
          </div>
          <span className="text-violet-400 font-bold group-hover:translate-x-1 transition-transform">→</span>
        </Link>
        <Link href="/stories"
          className="flex items-center gap-4 p-5 rounded-2xl border-2 border-amber-200 bg-amber-50 hover:bg-amber-100 hover:border-amber-300 transition-all group">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-2xl shrink-0">
            ✨
          </div>
          <div className="flex-1">
            <p className="font-black text-amber-900">Story Mode</p>
            <p className="text-xs text-amber-700 mt-0.5">Interactive stories with questions and XP rewards</p>
          </div>
          <span className="text-amber-400 font-bold group-hover:translate-x-1 transition-transform">→</span>
        </Link>
      </div>
    </div>
  );
}
