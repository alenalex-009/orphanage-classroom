import { notFound } from "next/navigation";
import Link from "next/link";
import { getStudentProfile } from "@/actions/students";
import { XPBar } from "@/components/xp-bar";
import { getLevelInfo, getNextAvatar } from "@/lib/avatars";
import { ArrowLeft, Calendar, TrendingUp, Award, Zap } from "lucide-react";
import { formatDateShort, calculateAttendancePercentage } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface Props { params: Promise<{ id: string }> }

export default async function StudentProfilePage({ params }: Props) {
  const { id } = await params;
  const student = await getStudentProfile(id);
  if (!student) notFound();

  const xp = student.reward?.xp ?? 0;
  const streak = student.reward?.streak ?? 0;
  const { level, currentLevelXP, nextLevelXP, progress, avatar } = getLevelInfo(xp);
  const nextAvatar = getNextAvatar(level);
  const presentCount = student.attendance.filter((a:any)=>a.status==="present").length;
  const attendancePct = calculateAttendancePercentage(presentCount, student.attendance.length);
  const avgP = student.participation.length>0
    ? Math.round(student.participation.reduce((s:number,p:any)=>s+p.score,0)/student.participation.length) : 0;

  return (
    <div className="page-container">
      <Link href="/students" className="inline-flex items-center gap-1.5 text-xs text-violet-600 font-black hover:underline">
        <ArrowLeft className="w-3 h-3" />Back to Students
      </Link>

      {/* Profile hero */}
      <div className="clay-card border-2 border-indigo-100 overflow-hidden relative">
        {/* Gradient top bar */}
        <div className="absolute top-0 left-0 right-0 h-2 rounded-t-3xl"
          style={{ background:`linear-gradient(90deg, #6366f1, #8b5cf6, #ec4899)` }} />

        <div className="flex items-start gap-5 pt-3">
          {/* Avatar */}
          <div className="w-24 h-24 rounded-3xl flex items-center justify-center text-5xl shrink-0 border-3 border-white"
            style={{ background:`linear-gradient(135deg, #6366f1, #8b5cf6)`, boxShadow:"4px 4px 16px rgba(99,102,241,0.35)" }}>
            {avatar.emoji}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div>
                <h1 className="text-2xl font-black text-foreground">{student.name}</h1>
                <p className="text-muted-foreground text-sm">{student.class.name} · Age {student.age}</p>
                <p className={cn("text-xs font-black mt-0.5", avatar.color)}>{avatar.title}</p>
              </div>
              <div className="flex flex-col items-end gap-2 shrink-0">
                <span className="text-xs font-black px-3 py-1.5 rounded-full text-white"
                  style={{ background:`linear-gradient(135deg, #6366f1, #8b5cf6)`, boxShadow:"2px 2px 8px rgba(99,102,241,0.35)" }}>
                  {avatar.emoji} Lv.{level}
                </span>
                {streak>0 && (
                  <span className="streak-pill">🔥 {streak} day streak</span>
                )}
              </div>
            </div>
            <XPBar xp={xp} size="md" />
            {nextAvatar && (
              <p className="text-[11px] text-muted-foreground mt-1.5">
                {nextLevelXP - currentLevelXP} XP until <strong>{nextAvatar.emoji} {nextAvatar.name}</strong>
              </p>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-3 mt-5 pt-4 border-t border-border">
          {[
            { label:"Total XP",   value:xp.toLocaleString(),                                  color:"text-violet-700" },
            { label:"Attendance", value:`${attendancePct}%`,                                   color:attendancePct>=80?"text-emerald-600":attendancePct>=60?"text-amber-600":"text-rose-500" },
            { label:"Avg Score",  value:avgP>0?`${avgP}/10`:"—",                              color:"text-amber-600"  },
            { label:"Badges",     value:student.achievements.length,                           color:"text-amber-600"  },
          ].map(s => (
            <div key={s.label} className="flex flex-col gap-0.5">
              <span className="text-[11px] font-bold text-muted-foreground">{s.label}</span>
              <span className={cn("text-xl font-black", s.color)}>{s.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      {student.achievements.length > 0 && (
        <div className="clay-card border-2 border-amber-100">
          <h2 className="font-black text-foreground mb-4 flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-500" />Achievements
          </h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            {student.achievements.map((a:any) => (
              <div key={a.id} className="flex flex-col items-center gap-2 p-4 rounded-3xl bg-amber-50 border-2 border-amber-200 text-center"
                style={{ boxShadow:"var(--shadow-clay-sm)" }}>
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
        <div className="clay-card border-2 border-sky-100">
          <h2 className="font-black text-foreground mb-4 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-sky-500" />Attendance
          </h2>
          <div className="grid grid-cols-7 gap-1.5 mb-3">
            {student.attendance.slice(-28).map((a:any,i:number) => (
              <div key={i} title={formatDateShort(a.date)}
                className={cn("h-6 rounded-xl transition-transform hover:scale-110",
                  a.status==="present" ? "bg-emerald-400" : "bg-rose-300")}
                style={{ boxShadow:a.status==="present"?"1px 1px 4px rgba(52,211,153,0.3)":"1px 1px 4px rgba(251,113,133,0.3)" }}
              />
            ))}
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-lg bg-emerald-400 inline-block" />Present ({presentCount})</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-lg bg-rose-300 inline-block" />Absent ({student.attendance.length-presentCount})</span>
          </div>
        </div>

        <div className="clay-card border-2 border-violet-100">
          <h2 className="font-black text-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-violet-500" />Participation
          </h2>
          <div className="space-y-2 max-h-48 overflow-y-auto scrollbar-thin">
            {student.participation.length===0 ? (
              <p className="text-muted-foreground text-sm text-center py-6">No scores yet.</p>
            ) : [...student.participation].reverse().slice(0,10).map((p:any) => (
              <div key={p.id} className="flex items-center gap-3">
                <div className="flex-1 h-3 rounded-full overflow-hidden"
                  style={{ background:"#e0e7ff", boxShadow:"inset 1px 1px 3px rgba(99,102,241,0.15)" }}>
                  <div className={cn("h-full rounded-full", p.score>=8?"bg-emerald-400":p.score>=5?"bg-amber-400":"bg-rose-400")}
                    style={{ width:`${p.score*10}%`, transition:"width 0.5s ease" }} />
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
