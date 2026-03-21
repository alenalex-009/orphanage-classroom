import { notFound } from "next/navigation";
import Link from "next/link";
import { getStudentProfile } from "@/actions/students";
import {
  getInitials,
  getXPForNextLevel,
  getLevelColor,
  formatDateShort,
} from "@/lib/utils";
import { cn } from "@/lib/utils";
import { User, Calendar, BookOpen, Award, TrendingUp } from "lucide-react";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function StudentProfilePage({ params }: Props) {
  const { id } = await params;

  const student = await getStudentProfile(id);
  if (!student) notFound();

  const xpInfo = student.reward
    ? getXPForNextLevel(student.reward.xp)
    : null;

  return (
    <div className="page-container">
      {/* Back */}
      <Link
        href="/students"
        className="text-xs text-teal-700 font-semibold hover:underline inline-block"
      >
        ← Back to Students
      </Link>

      {/* Profile header */}
      <div className="classroom-card flex items-center gap-5">
        <div className="w-16 h-16 rounded-full bg-teal-200 text-teal-800 font-extrabold text-xl flex items-center justify-center shrink-0">
          {getInitials(student.name)}
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-foreground">
            {student.name}
          </h1>
          <p className="text-muted-foreground text-sm">
            {student.class.name} · Age {student.age}
          </p>
          {student.reward && (
            <span
              className={cn(
                "inline-block mt-1 text-xs font-bold px-2 py-0.5 rounded-full",
                getLevelColor(student.reward.level)
              )}
            >
              Level {student.reward.level}
            </span>
          )}
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="stat-card">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <p className="text-xs font-semibold uppercase tracking-wide">Attendance</p>
          </div>
          <p className={cn(
            "text-2xl font-extrabold",
            student.attendancePct >= 75 ? "text-emerald-600" :
            student.attendancePct >= 50 ? "text-amber-600" : "text-red-500"
          )}>
            {student.attendancePct}%
          </p>
          <p className="text-xs text-muted-foreground">
            {student.attendance.filter((a:any) => a.status === "present").length} / {student.attendance.length} days
          </p>
        </div>

        <div className="stat-card">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <BookOpen className="w-4 h-4" />
            <p className="text-xs font-semibold uppercase tracking-wide">Sessions</p>
          </div>
          <p className="text-2xl font-extrabold">{student.participation.length}</p>
          <p className="text-xs text-muted-foreground">
            Avg score: {student.avgParticipation}/10
          </p>
        </div>

        <div className="stat-card">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <TrendingUp className="w-4 h-4" />
            <p className="text-xs font-semibold uppercase tracking-wide">XP</p>
          </div>
          <p className="text-2xl font-extrabold text-amber-600">
            {student.reward?.xp ?? 0}
          </p>
          <p className="text-xs text-muted-foreground">
            Streak: {student.reward?.streak ?? 0} days 🔥
          </p>
        </div>

        <div className="stat-card">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Award className="w-4 h-4" />
            <p className="text-xs font-semibold uppercase tracking-wide">Badges</p>
          </div>
          <p className="text-2xl font-extrabold">{student.achievements.length}</p>
          <p className="text-xs text-muted-foreground">achievements</p>
        </div>
      </div>

      {/* XP Progress bar */}
      {student.reward && xpInfo && (
        <div className="classroom-card">
          <div className="flex items-center justify-between mb-2">
            <p className="font-bold text-sm text-foreground">
              Level {student.reward.level} Progress
            </p>
            <p className="text-xs text-muted-foreground">
              {xpInfo.current} / {xpInfo.next} XP to next level
            </p>
          </div>
          <div className="h-3 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-teal-500 to-teal-700 rounded-full transition-all duration-500"
              style={{ width: `${xpInfo.progress}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Total XP: {student.reward.xp}
          </p>
        </div>
      )}

      {/* Achievements */}
      {student.achievements.length > 0 && (
        <div className="classroom-card">
          <h2 className="font-bold text-foreground mb-4 flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-500" />
            Achievements
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {student.achievements.map((a:any) => (
              <div
                key={a.id}
                className="flex items-center gap-3 p-3 rounded-xl bg-amber-50 border border-amber-100"
              >
                <span className="text-2xl">{a.icon}</span>
                <div>
                  <p className="font-bold text-sm text-amber-800">{a.label}</p>
                  <p className="text-xs text-amber-600">
                    {formatDateShort(a.date)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Attendance history */}
      <div className="classroom-card">
        <h2 className="font-bold text-foreground mb-4 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-teal-700" />
          Recent Attendance (last 30 days)
        </h2>
        <div className="flex flex-wrap gap-2">
          {student.attendance.slice(0, 30).map((a:any) => (
            <div
              key={a.id}
              className={cn(
                "flex flex-col items-center gap-0.5 p-2 rounded-lg text-xs font-semibold min-w-[44px]",
                a.status === "present"
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-red-100 text-red-600"
              )}
              title={`${formatDateShort(a.date)}: ${a.status}`}
            >
              <span>{a.status === "present" ? "✓" : "✗"}</span>
              <span>{formatDateShort(a.date)}</span>
            </div>
          ))}
          {student.attendance.length === 0 && (
            <p className="text-muted-foreground text-sm">No attendance records yet.</p>
          )}
        </div>
      </div>

      {/* Participation history */}
      {student.participation.length > 0 && (
        <div className="classroom-card">
          <h2 className="font-bold text-foreground mb-4 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-teal-700" />
            Recent Sessions
          </h2>
          <div className="space-y-2">
            {student.participation.map((p:any) => (
              <div
                key={p.id}
                className="flex items-center justify-between p-3 rounded-xl bg-secondary"
              >
                <div>
                  <p className="font-semibold text-sm text-foreground">
                    {p.session.topic}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatDateShort(p.session.date)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-20 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-teal-500 rounded-full"
                      style={{ width: `${(p.score / 10) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-bold text-foreground w-8 text-right">
                    {p.score}/10
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
