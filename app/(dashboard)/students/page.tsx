import { prisma } from "@/lib/prisma";
import { getTodayDate, getInitials, calculateAttendancePercentage } from "@/lib/utils";
import Link from "next/link";
import { Users, Award, TrendingUp, Search, Zap } from "lucide-react";
import { XPBar, LevelBadge } from "@/components/xp-bar";
import { getLevelInfo } from "@/lib/level";
import { StreakBadge } from "@/components/achievement-badge";

async function getAllStudentsWithStats() {
  const students = await prisma.student.findMany({
    include: { class: true, reward: true, achievements: true, attendance: true, participation: true },
    orderBy: [{ class: { name: "asc" } }, { name: "asc" }],
  });
  return students.map((s: any) => {
    const present = s.attendance.filter((a: any) => a.status === "present").length;
    return {
      ...s,
      attendancePct: calculateAttendancePercentage(present, s.attendance.length),
      avgParticipation: s.participation.length > 0
        ? Math.round(s.participation.reduce((sum: number, p: any) => sum + p.score, 0) / s.participation.length) : 0,
    };
  });
}

export default async function StudentsPage() {
  const students = await getAllStudentsWithStats();
  const byClass = students.reduce((acc: Record<string, typeof students>, s: any) => {
    const key = s.class.name;
    if (!acc[key]) acc[key] = [];
    acc[key].push(s);
    return acc;
  }, {});

  const totalXP = students.reduce((s: number, st: any) => s + (st.reward?.xp ?? 0), 0);

  return (
    <div className="page-container">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Users className="w-5 h-5 text-sky-600" />
            <h1 className="text-2xl font-black text-foreground">Students</h1>
          </div>
          <p className="text-muted-foreground text-sm">
            {students.length} students · {totalXP.toLocaleString()} XP earned total
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/leaderboard" className="btn-secondary text-sm">🏆 Leaderboard</Link>
          <Link href="/admin" className="btn-primary text-sm">+ Add Student</Link>
        </div>
      </div>

      {/* Class groups */}
      {(Object.entries(byClass) as [string, typeof students][]).map(([className, classStudents]) => (
        <div key={className} className="classroom-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-black text-foreground text-base">{className}</h2>
            <span className="badge-pill bg-violet-100 text-violet-700">{classStudents.length} students</span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {classStudents.map((s: any) => {
              const xp = s.reward?.xp ?? 0;
              const { level, avatar } = getLevelInfo(xp);
              const initials = s.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2);
              return (
                <Link key={s.id} href={`/students/${s.id}`}
                  className="group flex flex-col gap-3 p-4 rounded-2xl border-2 border-transparent bg-secondary hover:border-violet-200 hover:bg-white hover:shadow-card transition-all duration-200">
                  {/* Top row */}
                  <div className="flex items-start gap-3">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-100 to-indigo-100 flex items-center justify-center text-sm font-black text-violet-700 shrink-0 group-hover:from-violet-200 group-hover:to-indigo-200 transition-colors">
                      {initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-black text-sm text-foreground truncate">{s.name}</p>
                      <p className="text-xs text-muted-foreground">Age {s.age}</p>
                    </div>
                    <span className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[11px] font-black text-white bg-gradient-to-r ${avatar.gradient} shrink-0`}>
                      {avatar.emoji} {xp}
                    </span>
                  </div>

                  {/* XP Bar */}
                  <XPBar xp={xp} showLabel={false} size="sm" animated={false} />

                  {/* Stats row */}
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <span className={`w-2 h-2 rounded-full ${s.attendancePct >= 80 ? "bg-emerald-400" : s.attendancePct >= 60 ? "bg-amber-400" : "bg-red-400"}`} />
                      {s.attendancePct}% att.
                    </span>
                    {s.avgParticipation > 0 && <span>⭐ {s.avgParticipation}/10</span>}
                    {(s.reward?.streak ?? 0) > 0 && <span className="text-orange-500">🔥{s.reward.streak}</span>}
                  </div>

                  {/* Achievements */}
                  {s.achievements.length > 0 && (
                    <div className="flex gap-1 flex-wrap">
                      {s.achievements.slice(0, 4).map((a: any) => (
                        <span key={a.id} title={a.label} className="text-base">{a.icon}</span>
                      ))}
                      {s.achievements.length > 4 && (
                        <span className="text-xs text-muted-foreground font-bold">+{s.achievements.length - 4}</span>
                      )}
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      ))}

      {students.length === 0 && (
        <div className="classroom-card text-center py-12">
          <p className="text-4xl mb-3">👨‍🎓</p>
          <p className="text-muted-foreground">No students yet. <Link href="/admin" className="text-violet-600 font-bold">Add some →</Link></p>
        </div>
      )}
    </div>
  );
}
