import { prisma } from "@/lib/prisma";
import { getTodayDate, formatDate } from "@/lib/utils";
import { SessionPanel } from "@/components/session-panel";
import { BookOpen, CheckCircle2, Play, Clock, Zap } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

async function getSessionPageData() {
  const today = getTodayDate();
  const [classes, todaySessions, recentSessions] = await Promise.all([
    prisma.class.findMany({ orderBy: { name: "asc" } }),
    prisma.session.findMany({
      where: { date: today },
      include: { class: true, participation: true, activityEvents: true, teams: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.session.findMany({
      where: { date: { not: today } },
      include: { class: true, participation: true, activityEvents: true },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
  ]);
  return { classes, todaySessions, recentSessions };
}

export default async function SessionPage() {
  const { classes, todaySessions, recentSessions } = await getSessionPageData();
  const totalXPToday = todaySessions.reduce(
    (s: number, sess: any) => s + sess.activityEvents.reduce((x: number, e: any) => x + e.xpAwarded + e.bonusXP, 0), 0
  );

  return (
    <div className="page-container">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <BookOpen className="w-5 h-5 text-amber-600" />
            <h1 className="text-2xl font-black text-foreground">Sessions</h1>
          </div>
          <p className="text-muted-foreground text-sm">{formatDate(new Date())}</p>
        </div>
        {totalXPToday > 0 && (
          <div className="flex items-center gap-2 bg-violet-50 border-2 border-violet-100 rounded-2xl px-3 py-2"
            style={{ boxShadow:"var(--shadow-clay-sm)" }}>
            <Zap className="w-4 h-4 text-violet-600" />
            <span className="text-sm font-black text-violet-700">+{totalXPToday} XP today</span>
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {/* Create session */}
        <SessionPanel classes={classes} />

        {/* Today's sessions */}
        <div className="clay-card">
          <h2 className="font-black text-foreground mb-4 flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-500" />Today&apos;s Sessions
            {todaySessions.length > 0 && (
              <span className="ml-auto text-xs font-black text-amber-700 bg-amber-100 border border-amber-200 px-2.5 py-1 rounded-full">
                {todaySessions.length}
              </span>
            )}
          </h2>
          {todaySessions.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-4xl mb-3">📖</p>
              <p className="text-muted-foreground text-sm">No sessions yet. Create one to get started!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {todaySessions.map((session: any) => {
                const xp = session.activityEvents.reduce((s: number, e: any) => s + e.xpAwarded + e.bonusXP, 0);
                return (
                  <Link key={session.id}
                    href={`/session/${session.id}${!session.completed ? "/live" : "/summary"}`}
                    className="flex items-center gap-3 p-4 rounded-2xl border-2 border-transparent bg-amber-50/60 hover:bg-amber-50 hover:border-amber-200 transition-all">
                    <div className={cn("w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 border-2 border-white",
                      session.completed ? "bg-emerald-100" : "bg-amber-100")}
                      style={{ boxShadow:"var(--shadow-clay-sm)" }}>
                      {session.completed
                        ? <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        : <Play className="w-5 h-5 text-amber-600" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-black text-sm text-foreground truncate">{session.topic}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-muted-foreground">{session.class.name}</span>
                        {session.mode === "team" && <span className="text-xs font-black text-amber-600">🏆 Team</span>}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <span className={cn("text-xs font-black px-2.5 py-1 rounded-full border",
                        session.completed ? "bg-emerald-100 text-emerald-700 border-emerald-200" : "bg-amber-100 text-amber-700 border-amber-200")}>
                        {session.completed ? "Done" : "● Live"}
                      </span>
                      {xp > 0 && <span className="text-xs font-black text-violet-600">+{xp} XP</span>}
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Recent sessions */}
      {recentSessions.length > 0 && (
        <div className="clay-card">
          <h2 className="font-black text-foreground mb-4">Recent Sessions</h2>
          <div className="space-y-2">
            {recentSessions.map((session: any) => {
              const xp = session.activityEvents.reduce((s: number, e: any) => s + e.xpAwarded + e.bonusXP, 0);
              return (
                <Link key={session.id} href={`/session/${session.id}/summary`}
                  className="flex items-center gap-3 p-3 rounded-2xl hover:bg-indigo-50 hover:border-indigo-100 border-2 border-transparent transition-all">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-black text-foreground truncate">{session.topic}</p>
                    <p className="text-xs text-muted-foreground">{session.class.name}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {xp > 0 && <span className="text-xs font-black text-violet-500">+{xp} XP</span>}
                    <span className="text-xs text-muted-foreground">{session.participation.length} students</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
