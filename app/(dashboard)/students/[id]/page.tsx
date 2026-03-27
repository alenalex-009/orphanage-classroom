import { notFound } from "next/navigation";
import Link from "next/link";
import { getStudentProfile } from "@/actions/students";
import { XPBar, LevelBadge, AvatarDisplay } from "@/components/xp-bar";
import { getLevelInfo, getNextAvatar } from "@/lib/avatars";
import { ArrowLeft, Calendar, TrendingUp, Award } from "lucide-react";
import { formatDateShort, calculateAttendancePercentage } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface Props { params: Promise<{ id: string }> }

export default async function StudentProfilePage({ params }: Props) {
  const { id } = await params;
  const student = await getStudentProfile(id);
  if (!student) notFound();

  const xp = student.reward?.xp ?? 0;
  const streak = student.reward?.streak ?? 0;
  const { level, currentLevelXP, nextLevelXP, progress, avatar, nextAvatar } = getLevelInfo(xp);
  const initials = student.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2);

  const presentCount = student.attendance.filter((a: any) => a.status === "present").length;
  const attendancePct = calculateAttendancePercentage(presentCount, student.attendance.length);
  const avgParticipation = student.participation.length > 0
    ? Math.round(student.participation.reduce((s: number, p: any) => s + p.score, 0) / student.participation.length) : 0;

  const statColor = (pct: number) => pct >= 80 ? "text-emerald-600" : pct >= 60 ? "text-amber-600" : "text-rose-500";

  return (
    <div className="page-container">
      <Link href="/students" className="inline-flex items-center gap-1.5 text-xs text-violet-600 font-bold hover:underline">
        <ArrowLeft className="w-3 h-3" />Back to Students
      </Link>

      {/* Profile hero */}
      <div className="classroom-card overflow-hidden relative">
        <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${avatar.gradient}`} />
        <div className="flex items-start gap-5 pt-2">
          {/* Avatar */}
          <div className={`w-20 h-20 rounded-2xl flex items-center justify-center text-5xl bg-gradient-to-br ${avatar.gradient} shadow-lg shrink-0`}>
            {avatar.emoji}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div>
                <h1 className="text-2xl font-black text-foreground">{student.name}</h1>
                <p className="text-muted-foreground text-sm">{student.class.name} · Age {student.age}</p>
                <p className={cn("text-xs font-bold mt-0.5", avatar.color)}>{avatar.title}</p>
              </div>
              <div className="flex flex-col items-end gap-1.5 shrink-0">
                <LevelBadge xp={xp} size="md" />
                {streak > 0 && (
                  <span className="streak-pill">🔥 {streak} day streak</span>
                )}
              </div>
            </div>
            <XPBar xp={xp} size="md" />
            {nextAvatar && (
              <p className="text-xs text-muted-foreground mt-1.5">
                {nextLevelXP - currentLevelXP} XP until <strong>{nextAvatar.emoji} {nextAvatar.name}</strong>
              </p>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-3 mt-5 pt-4 border-t border-border">
          {[
            { label: "Total XP",    value: xp.toLocaleString(), color: "text-violet-700" },
            { label: "Attendance",  value: `${attendancePct}%`, color: statColor(attendancePct) },
            { label: "Avg Score",   value: avgParticipation > 0 ? `${avgParticipation}/10` : "—", color: "text-amber-600" },
            { label: "Badges",      value: student.achievements.length, color: "text-amber-600" },
          ].map(s => (
            <div key={s.label} className="flex flex-col gap-0.5">
              <span className="text-xs font-bold text-muted-foreground">{s.label}</span>
              <span className={`text-xl font-black ${s.color}`}>{s.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      {student.achievements.length > 0 && (
        <div className="classroom-card">
          <h2 className="font-black text-foreground mb-4 flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-500" />Achievements
          </h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            {student.achievements.map((a: any) => (
              <div key={a.id} className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-center">
                <span className="text-4xl">{a.icon}</span>
                <p className="text-xs font-black text-amber-800 leading-tight">{a.label}</p>
                <p className="text-[10px] text-amber-500">{new Date(a.date).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="classroom-card">
          <h2 className="font-black text-foreground mb-4 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-sky-500" />Attendance
          </h2>
          <div className="grid grid-cols-7 gap-1.5 mb-3">
            {student.attendance.slice(-28).map((a: any, i: number) => (
              <div key={i} title={formatDateShort(a.date)}
                className={cn("h-6 rounded-md", a.status === "present" ? "bg-emerald-400" : "bg-rose-300")} />
            ))}
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-emerald-400 inline-block" />Present ({presentCount})</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-rose-300 inline-block" />Absent ({student.attendance.length - presentCount})</span>
          </div>
        </div>

        <div className="classroom-card">
          <h2 className="font-black text-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-violet-500" />Participation Scores
          </h2>
          <div className="space-y-2 max-h-48 overflow-y-auto scrollbar-thin">
            {student.participation.length === 0 ? (
              <p className="text-muted-foreground text-sm text-center py-6">No scores yet.</p>
            ) : [...student.participation].reverse().slice(0, 10).map((p: any) => (
              <div key={p.id} className="flex items-center gap-3">
                <div className="flex-1 bg-secondary rounded-full h-2 overflow-hidden">
                  <div className={cn("h-full rounded-full", p.score >= 8 ? "bg-emerald-500" : p.score >= 5 ? "bg-amber-400" : "bg-rose-400")}
                    style={{ width: `${p.score * 10}%` }} />
                </div>
                <span className="text-xs font-black text-foreground w-8 text-right">{p.score}/10</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
