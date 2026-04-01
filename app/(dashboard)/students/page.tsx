import { prisma } from "@/lib/prisma";
import { calculateAttendancePercentage } from "@/lib/utils";
import Link from "next/link";
import { Users, Zap } from "lucide-react";
import { XPBar } from "@/components/xp-bar";
import { getLevelInfo } from "@/lib/avatars";


import { cache } from "react";
export const revalidate = 60;

export const getAllStudentsWithStats = cache(async () => {
  const students = await prisma.student.findMany({
    include: {
  class: true,
  reward: true,
  achievements: true,
  attendance: {
    select: { status: true }
  },
  participation: {
    select: { score: true }
  }
},
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
});

export default async function StudentsPage() {
  const students = await getAllStudentsWithStats();
  const byClass = students.reduce((acc: Record<string, typeof students>, s: any) => {
    if (!acc[s.class.name]) acc[s.class.name] = [];
    acc[s.class.name].push(s);
    return acc;
  }, {});
  const totalXP = students.reduce((t: number, s: any) => t + (s.reward?.xp ?? 0), 0);

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
            {students.length} students · {totalXP.toLocaleString()} XP earned
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/leaderboard" className="btn-secondary text-sm">🏆 Leaderboard</Link>
          <Link href="/admin" className="btn-primary text-sm">+ Add Student</Link>
        </div>
      </div>

      {/* Class groups */}
      {(Object.entries(byClass) as [string, typeof students][]).map(([className, classStudents]) => (
        <div key={className} className="clay-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-black text-foreground">{className}</h2>
            <span className="text-xs font-black text-violet-700 bg-violet-100 border border-violet-200 px-3 py-1 rounded-full">
              {classStudents.length} students
            </span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {classStudents.map((s: any) => {
              const xp = s.reward?.xp ?? 0;
              const streak = s.reward?.streak ?? 0;
              const { level, avatar } = getLevelInfo(xp);
              const initials = s.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2);
              const attColor = s.attendancePct >= 80 ? "bg-emerald-400" : s.attendancePct >= 60 ? "bg-amber-400" : "bg-rose-400";

              return (
                <Link key={s.id} href={`/students/${s.id}`}
                  className="group flex flex-col gap-3 p-4 rounded-3xl border-2 border-indigo-100 bg-gradient-to-br from-white to-indigo-50/30 hover:border-violet-300 hover:shadow-clay-hover transition-all duration-200"
                  style={{ boxShadow:"var(--shadow-clay-sm)" }}>
                  {/* Top row */}
                  <div className="flex items-start gap-3">
                    {/* Avatar emoji */}
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl border-2 border-white shrink-0 group-hover:scale-110 transition-transform"
                      style={{ background:`linear-gradient(135deg, #ede9fe, #ddd6fe)`, boxShadow:"2px 2px 6px rgba(99,102,241,0.15)" }}>
                      {avatar.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-black text-sm text-foreground truncate">{s.name}</p>
                      <p className="text-xs text-muted-foreground">Age {s.age} · {className}</p>
                      {streak > 0 && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-black text-orange-600 bg-orange-50 border border-orange-200 rounded-full px-2 py-0.5 mt-1">
                          🔥 {streak} streak
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-black text-violet-700 bg-violet-100 border border-violet-200 px-2 py-0.5 rounded-full shrink-0">
                      {xp} XP
                    </span>
                  </div>

                  {/* XP bar */}
                  <XPBar xp={xp} showLabel={false} size="sm" animated={false} />

                  {/* Stats row */}
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <span className={`w-2 h-2 rounded-full ${attColor}`} />
                      {s.attendancePct}% att.
                    </span>
                    {s.avgParticipation > 0 && <span>⭐ {s.avgParticipation}/10</span>}
                    <span className="ml-auto text-violet-500 font-bold">Lv.{level} {avatar.name}</span>
                  </div>

                  {/* Achievements */}
                  {s.achievements.length > 0 && (
                    <div className="flex gap-1 flex-wrap pt-1 border-t border-indigo-100">
                      {s.achievements.slice(0, 5).map((a: any) => (
                        <span key={a.id} title={a.label} className="text-base">{a.icon}</span>
                      ))}
                      {s.achievements.length > 5 && (
                        <span className="text-xs text-muted-foreground font-bold self-center">+{s.achievements.length - 5}</span>
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
        <div className="clay-card text-center py-16">
          <p className="text-5xl mb-4">👨‍🎓</p>
          <p className="text-muted-foreground">No students yet.{" "}
            <Link href="/admin" className="text-violet-600 font-black hover:underline">Add some →</Link>
          </p>
        </div>
      )}
    </div>
  );
}
