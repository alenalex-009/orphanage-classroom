"use client";
import { useState, useTransition, useCallback, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { cn, getInitials } from "@/lib/utils";
import { awardWholeClassXP, awardSelectedStudentsXP, evaluateRolePlay } from "@/actions/gamification";
import { createTeams } from "@/actions/teams";
import { completeSession } from "@/actions/session";
import { getLevelInfo } from "@/lib/avatars";
import { Users, Zap, Theater, Trophy, CheckCircle2, Star, Loader2, ArrowLeft, Hash, Gamepad2, Crown, Flame, Target, ChevronRight } from "lucide-react";
import Link from "next/link";

type Student = { id: string; name: string; age: number; reward: { xp: number; level: number; streak: number } | null; achievements: { id: string; icon: string; label: string }[] };
type TeamMember = { id: string; studentId: string; student: Student };
type Team = { id: string; name: string; color: string; xp: number; members: TeamMember[] };
type ActivityEvent = { id: string; type: string; studentIds: string[]; xpAwarded: number; bonusXP: number; createdAt: Date };
type SessionData = { id: string; topic: string; mode: string; teamSize: number; completed: boolean; class: { id: string; name: string } };
interface LiveSessionRoomProps { session: SessionData; students: Student[]; teams: Team[]; initialEvents: ActivityEvent[] }
type ActivityMode = "idle" | "whole_class" | "selected_pin" | "role_play";

const TEAM_COLORS: Record<string, { bg: string; border: string; text: string; gradient: string; soft: string }> = {
  teal:   { bg:"bg-teal-900/80",   border:"border-teal-500",  text:"text-teal-100",  gradient:"from-teal-500 to-emerald-500",   soft:"bg-teal-100 text-teal-800 border-teal-300"   },
  amber:  { bg:"bg-amber-900/80",  border:"border-amber-500", text:"text-amber-100", gradient:"from-amber-500 to-orange-500",   soft:"bg-amber-100 text-amber-800 border-amber-300"  },
  purple: { bg:"bg-purple-900/80", border:"border-purple-500",text:"text-purple-100",gradient:"from-violet-500 to-purple-600",  soft:"bg-violet-100 text-violet-800 border-violet-300" },
  coral:  { bg:"bg-rose-900/80",   border:"border-rose-500",  text:"text-rose-100",  gradient:"from-rose-500 to-pink-500",      soft:"bg-rose-100 text-rose-800 border-rose-300"     },
};

// ── XP Flash Overlay ──────────────────────────────────────────────────────────
function XPFlash({ message, show, bonus }: { message: string; show: boolean; bonus?: number }) {
  return (
    <div className={cn("fixed top-6 left-1/2 -translate-x-1/2 z-[999] pointer-events-none transition-all duration-500",
      show ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-75 -translate-y-4")}>
      <div className="flex flex-col items-center gap-2">
        <div className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-10 py-4 rounded-2xl shadow-2xl font-black text-2xl flex items-center gap-3"
          style={{ boxShadow: "0 0 50px rgba(99,102,241,0.7)" }}>
          <Zap className="w-6 h-6 text-yellow-300" />{message}
        </div>
        {bonus && bonus > 0 && (
          <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-6 py-2 rounded-full font-black text-sm animate-bounce-xp">
            🔥 +{bonus} BONUS XP!
          </div>
        )}
      </div>
    </div>
  );
}

// ── Team Scoreboard ───────────────────────────────────────────────────────────
function TeamScoreboard({ teams, selectedTeamId, onSelectTeam }: { teams: Team[]; selectedTeamId?: string; onSelectTeam: (id: string | undefined) => void }) {
  const sorted = [...teams].sort((a, b) => b.xp - a.xp);
  const leader = sorted[0];
  return (
    <div className="rounded-2xl overflow-hidden border border-white/10" style={{ background: "linear-gradient(135deg, #0f172a, #1e1b4b)" }}>
      <div className="flex items-center gap-2 px-5 py-3 border-b border-white/10">
        <Crown className="w-4 h-4 text-amber-400" />
        <span className="font-black text-white text-sm">Team Scoreboard</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4">
        {sorted.map((team, i) => {
          const tc = TEAM_COLORS[team.color] ?? TEAM_COLORS.teal;
          const isSelected = selectedTeamId === team.id;
          const isLeader = i === 0;
          const maxXP = sorted[0].xp || 1;
          return (
            <button key={team.id} onClick={() => onSelectTeam(isSelected ? undefined : team.id)}
              className={cn("relative flex flex-col gap-2 p-4 rounded-2xl border-2 text-left transition-all",
                tc.bg, isSelected ? tc.border : "border-white/5 hover:" + tc.border)}>
              {isLeader && <span className="absolute -top-2 right-3 text-xl">👑</span>}
              <div className="flex items-center justify-between">
                <span className={cn("font-black text-sm", tc.text)}>{team.name}</span>
                {i < 3 && <span className="text-lg">{["🥇","🥈","🥉"][i]}</span>}
              </div>
              <p className={cn("text-3xl font-black", tc.text)}>{team.xp}</p>
              <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div className={cn("h-full rounded-full bg-gradient-to-r", tc.gradient)}
                  style={{ width: `${(team.xp / maxXP) * 100}%`, transition: "width 0.5s ease-out" }} />
              </div>
              <p className={cn("text-xs", tc.text, "opacity-60")}>{team.members.length} members</p>
              {isSelected && <div className={cn("absolute inset-0 rounded-2xl border-2", tc.border, "pointer-events-none")} />}
            </button>
          );
        })}
      </div>
      {selectedTeamId && (
        <div className="px-5 py-2 border-t border-white/5 text-xs text-violet-400 font-bold">
          ✓ XP will also credit the selected team
        </div>
      )}
    </div>
  );
}

// ── Student Picker ────────────────────────────────────────────────────────────
function StudentPicker({ students, selected, onToggle, teams, label }: { students: Student[]; selected: string[]; onToggle: (id: string) => void; teams: Team[]; label?: string }) {
  const getTeam = (sid: string) => teams.find(t => t.members.some(m => m.studentId === sid));
  return (
    <div>
      <p className="text-xs font-bold text-muted-foreground mb-2">{label ?? "Select students"} ({selected.length} selected):</p>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
        {students.map(s => {
          const isSel = selected.includes(s.id);
          const team = getTeam(s.id);
          const tc = team ? TEAM_COLORS[team.color] : null;
          const { avatar: sAvatar } = getLevelInfo(s.reward?.xp ?? 0);
          return (
            <button key={s.id} onClick={() => onToggle(s.id)}
              className={cn("flex flex-col items-center gap-1.5 p-3 rounded-2xl border-2 transition-all active:scale-95",
                isSel ? "border-violet-400 bg-violet-50" : "border-transparent bg-secondary hover:border-violet-200")}>
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm",
                isSel ? `bg-gradient-to-br ${sAvatar.gradient} text-white` : "bg-muted text-muted-foreground")}>
                {getInitials(s.name)}
              </div>
              <p className="text-xs font-bold text-center leading-tight truncate w-full">{s.name.split(" ")[0]}</p>
              {team && tc && <span className={cn("text-[10px] px-1.5 py-0.5 rounded-full font-bold border", tc.soft)}>{team.name}</span>}
              {isSel && <CheckCircle2 className="w-3.5 h-3.5 text-violet-600" />}
              <span className="text-[10px] font-bold text-muted-foreground">{s.reward?.xp ?? 0}xp</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Student Live Card ─────────────────────────────────────────────────────────
function StudentLiveCard({ student, rank }: { student: Student; rank: number }) {
  const xp = student.reward?.xp ?? 0;
  const streak = student.reward?.streak ?? 0;
  const { level, avatar } = getLevelInfo(xp);
  const medals = ["👑","🥈","🥉"];
  return (
    <div className={cn("flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all",
      rank === 1 ? "border-amber-300 bg-amber-50" : rank === 2 ? "border-slate-300 bg-slate-50" : rank === 3 ? "border-orange-300 bg-orange-50" : "border-transparent bg-secondary")}>
      <div className="relative">
        <div className={cn("w-11 h-11 rounded-xl flex items-center justify-center text-sm font-black text-white bg-gradient-to-br", avatar.gradient)}>
          {getInitials(student.name)}
        </div>
        {rank <= 3 && <span className="absolute -top-1.5 -right-1.5 text-base">{medals[rank-1]}</span>}
      </div>
      <p className="text-xs font-black text-foreground text-center truncate w-full">{student.name.split(" ")[0]}</p>
      <span className={cn("text-[11px] font-black px-2 py-0.5 rounded-full text-white bg-gradient-to-r", avatar.gradient)}>{avatar.emoji} {xp}</span>
      {streak >= 3 && <span className="text-[10px] text-orange-500 font-bold">🔥×{streak}</span>}
    </div>
  );
}

// ── Role Play Scorer ──────────────────────────────────────────────────────────
function RolePlayScorer({ scores, onChange }: { scores: { participation: number; understanding: number; creativity: number }; onChange: (s: typeof scores) => void }) {
  const avg = Math.round((scores.participation + scores.understanding + scores.creativity) / 3);
  const rows = [{ key:"participation" as const, label:"Participation", icon:"🙋" }, { key:"understanding" as const, label:"Understanding", icon:"🧠" }, { key:"creativity" as const, label:"Creativity", icon:"✨" }];
  return (
    <div className="bg-violet-50 border-2 border-violet-200 rounded-2xl p-5 space-y-4">
      <div className="flex items-center justify-between">
        <p className="font-black text-violet-800">Performance Rating</p>
        <span className={cn("font-black text-sm px-3 py-1 rounded-full", avg >= 7 ? "bg-amber-100 text-amber-700" : "bg-secondary text-muted-foreground")}>
          Avg {avg}/10 {avg >= 7 ? "⭐ Bonus!" : ""}
        </span>
      </div>
      {rows.map(({ key, label, icon }) => (
        <div key={key} className="flex items-center gap-3">
          <span className="text-xl w-7">{icon}</span>
          <span className="text-sm font-bold text-violet-800 w-28">{label}</span>
          <input type="range" min={1} max={10} step={1} value={scores[key]}
            onChange={e => onChange({ ...scores, [key]: +e.target.value })}
            className="flex-1 accent-violet-600 h-2 cursor-pointer" />
          <span className="text-sm font-black text-violet-700 w-8 text-right">{scores[key]}</span>
        </div>
      ))}
    </div>
  );
}

// ── Team Selector ─────────────────────────────────────────────────────────────
function TeamSelector({ teams, selectedTeamId, onSelect }: { teams: Team[]; selectedTeamId?: string; onSelect: (id: string | undefined) => void }) {
  return (
    <div>
      <p className="text-xs font-bold text-muted-foreground mb-2">Credit to team (optional):</p>
      <div className="flex gap-2 flex-wrap">
        {teams.map(team => {
          const tc = TEAM_COLORS[team.color] ?? TEAM_COLORS.teal;
          const isSel = selectedTeamId === team.id;
          return (
            <button key={team.id} onClick={() => onSelect(isSel ? undefined : team.id)}
              className={cn("px-3 py-1.5 rounded-xl text-xs font-black border-2 transition-all",
                isSel ? tc.soft : "bg-secondary border-transparent text-muted-foreground hover:border-border")}>
              {team.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Event Log Item ────────────────────────────────────────────────────────────
function EventLogItem({ event, students }: { event: ActivityEvent; students: Student[] }) {
  const cfg = { whole_class:{ icon:"🙋",label:"Whole Class",color:"text-teal-600" }, selected_pin:{ icon:"📌",label:"Selected Answer",color:"text-amber-600" }, role_play:{ icon:"🎭",label:"Role Play",color:"text-violet-600" } }[event.type] ?? { icon:"⚡",label:event.type,color:"text-muted-foreground" };
  const names = students.filter(s => event.studentIds.includes(s.id)).map(s => s.name.split(" ")[0]).join(", ");
  return (
    <div className="flex items-center gap-3 p-2.5 rounded-xl bg-secondary text-sm">
      <span>{cfg.icon}</span>
      <div className="flex-1 min-w-0">
        <span className={cn("font-black text-xs", cfg.color)}>{cfg.label}</span>
        {names && <span className="text-muted-foreground text-xs ml-1.5 truncate">· {names}</span>}
      </div>
      <span className="font-black text-xs text-violet-600 shrink-0">+{event.xpAwarded + event.bonusXP} XP</span>
    </div>
  );
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
export function LiveSessionRoom({ session, students, teams: initTeams, initialEvents }: LiveSessionRoomProps) {
  const [mode, setMode] = useState<ActivityMode>("idle");
  const [teams, setTeams] = useState<Team[]>(initTeams);
  const [events, setEvents] = useState<ActivityEvent[]>(initialEvents);
  const [selIds, setSelIds] = useState<string[]>([]);
  const [selTeamId, setSelTeamId] = useState<string | undefined>();
  const [rpScores, setRpScores] = useState({ participation: 7, understanding: 7, creativity: 7 });
  const [flash, setFlash] = useState({ show: false, message: "", bonus: 0 });
  const [isPending, start] = useTransition();
  const [teamsCreated, setTeamsCreated] = useState(initTeams.length > 0);
  const router = useRouter();
  const isTeam = session.mode === "team";

  const showFlash = useCallback((message: string, bonus = 0) => {
    setFlash({ show: true, message, bonus });
    setTimeout(() => setFlash(f => ({ ...f, show: false })), 2800);
  }, []);

  const toggle = (id: string) => setSelIds(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);

  const handleWholeClass = () => start(async () => {
    const r = await awardWholeClassXP(session.id, session.class.id, selTeamId);
    if (r.success) { showFlash(r.message, 0); toast.success(r.message); setMode("idle"); router.refresh(); }
    else toast.error(r.message);
  });

  const handleSelected = () => {
    if (!selIds.length) { toast.error("Select at least one student."); return; }
    start(async () => {
      const r = await awardSelectedStudentsXP(session.id, selIds, selTeamId);
      if (r.success) { showFlash(r.message, (r as any).bonusXP ?? 0); toast.success(r.message); setSelIds([]); setMode("idle"); router.refresh(); }
      else toast.error(r.message);
    });
  };

  const handleRolePlay = () => {
    if (!selIds.length) { toast.error("Select students who performed."); return; }
    start(async () => {
      const r = await evaluateRolePlay(session.id, selIds, rpScores, selTeamId);
      if (r.success) { showFlash(r.message, (r as any).bonusXP ?? 0); toast.success(r.message); setSelIds([]); setRpScores({ participation:7, understanding:7, creativity:7 }); setMode("idle"); router.refresh(); }
      else toast.error(r.message);
    });
  };

  const handleCreateTeams = () => start(async () => {
    const count = Math.max(2, Math.ceil(students.length / session.teamSize));
    const r = await createTeams(session.id, students.map(s => s.id), count);
    if (r.success) { toast.success(r.message); setTeamsCreated(true); router.refresh(); }
    else toast.error(r.message);
  });

  const handleEnd = () => start(async () => {
    await completeSession(session.id);
    router.push(`/session/${session.id}/summary`);
  });

  const sortedStudents = [...students].sort((a, b) => (b.reward?.xp ?? 0) - (a.reward?.xp ?? 0));
  const totalSessionXP = events.reduce((s, e) => s + e.xpAwarded + e.bonusXP, 0);

  return (
    <div className="min-h-screen" style={{ background: "#0f172a" }}>
      <XPFlash message={flash.message} show={flash.show} bonus={flash.bonus} />

      {/* Header */}
      <div className="sticky top-0 z-40 px-6 py-4 flex items-center justify-between border-b"
        style={{ background: "#0f172a", borderColor: "#1e293b" }}>
        <div className="flex items-center gap-3">
          <Link href="/session" className="p-2 rounded-xl hover:bg-white/5 transition-colors">
            <ArrowLeft className="w-4 h-4 text-slate-400" />
          </Link>
          <div>
            <h1 className="font-black text-white text-lg leading-tight">{session.topic}</h1>
            <p className="text-xs text-slate-400">{session.class.name} · {isTeam ? "🏆 Team Mode" : "🎓 Class Mode"} · {students.length} students</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {totalSessionXP > 0 && (
            <div className="flex items-center gap-1.5 bg-violet-500/20 border border-violet-500/30 rounded-xl px-3 py-1.5">
              <Zap className="w-3.5 h-3.5 text-violet-400" />
              <span className="text-xs font-black text-violet-300">+{totalSessionXP} XP</span>
            </div>
          )}
          <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />Live
          </span>
          {!session.completed && (
            <button onClick={handleEnd} disabled={isPending}
              className="text-sm font-black px-4 py-2 rounded-xl bg-white text-slate-900 hover:bg-slate-100 active:scale-95 transition-all">
              {isPending ? <Loader2 className="w-4 h-4 animate-spin inline" /> : "End Session"}
            </button>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 space-y-5">

        {/* Team setup / scoreboard */}
        {isTeam && (
          !teamsCreated ? (
            <div className="rounded-2xl border border-white/10 p-8 text-center" style={{ background: "#1e293b" }}>
              <p className="text-5xl mb-4">🏆</p>
              <h2 className="font-black text-xl text-white mb-2">Set Up Teams</h2>
              <p className="text-slate-400 text-sm mb-6">{students.length} students · teams of {session.teamSize}</p>
              <button onClick={handleCreateTeams} disabled={isPending}
                className="inline-flex items-center gap-2 px-8 py-3 rounded-2xl font-black text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:opacity-90 active:scale-95 transition-all">
                {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Users className="w-4 h-4" />}
                Create Teams
              </button>
            </div>
          ) : <TeamScoreboard teams={teams} selectedTeamId={selTeamId} onSelectTeam={setSelTeamId} />
        )}

        {/* Game mode CTA */}
        {!session.completed && (
          <Link href={`/session/${session.id}/game`}
            className="flex items-center gap-4 p-5 rounded-2xl border border-white/10 hover:border-violet-500/50 hover:bg-white/5 transition-all group"
            style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.1), rgba(124,58,237,0.1))" }}>
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
              style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>
              <Gamepad2 className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <p className="font-black text-white">Launch Game Mode 🎮</p>
              <p className="text-slate-400 text-sm">Full screen questions · Live XP · Real-time scoreboard</p>
            </div>
            <ChevronRight className="w-5 h-5 text-violet-400 group-hover:translate-x-1 transition-transform" />
          </Link>
        )}

        {/* Activity Controls */}
        <div className="rounded-2xl border border-white/10 overflow-hidden" style={{ background: "#1e293b" }}>
          <div className="flex items-center gap-2 px-5 py-4 border-b border-white/5">
            <Zap className="w-4 h-4 text-amber-400" />
            <span className="font-black text-white">Activity Controls</span>
            {events.length > 0 && <span className="ml-auto text-xs font-bold text-slate-400">{events.length} events</span>}
          </div>
          <div className="p-5">
            {mode === "idle" && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { key:"whole_class" as const, icon:"🙋", label:"Whole Class Answers", sub:"+10 XP everyone", from:"from-teal-500", to:"to-emerald-500" },
                  { key:"selected_pin" as const,  icon:"📌", label:"Select Students (PIN)", sub:"+15 XP + streak bonus", from:"from-amber-500", to:"to-orange-500" },
                  { key:"role_play" as const,    icon:"🎭", label:"Role Play / Skit", sub:"+20 XP + performance bonus", from:"from-violet-500", to:"to-purple-600" },
                ].map(a => (
                  <button key={a.key} onClick={() => setMode(a.key)}
                    className="flex flex-col items-center gap-3 p-6 rounded-2xl border border-white/10 hover:border-white/20 hover:bg-white/5 active:scale-95 transition-all text-center">
                    <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center text-2xl bg-gradient-to-br", a.from, a.to)}>
                      {a.icon}
                    </div>
                    <div>
                      <p className="font-black text-white text-sm">{a.label}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{a.sub}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {mode === "whole_class" && (
              <div className="space-y-4 animate-fade-in">
                <div className="bg-teal-500/10 border border-teal-500/20 rounded-xl p-4">
                  <p className="font-black text-teal-300">🙋 Whole Class Answer</p>
                  <p className="text-sm text-teal-400/80 mt-1">All students receive <strong>+10 XP</strong>.</p>
                </div>
                {isTeam && teams.length > 0 && <TeamSelector teams={teams} selectedTeamId={selTeamId} onSelect={setSelTeamId} />}
                <div className="flex gap-3">
                  <button onClick={() => setMode("idle")} className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-sm hover:bg-white/10">Cancel</button>
                  <button onClick={handleWholeClass} disabled={isPending}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-black text-white bg-gradient-to-r from-teal-500 to-emerald-500 hover:opacity-90 disabled:opacity-50">
                    {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
                    Award +10 XP to All 🎉
                  </button>
                </div>
              </div>
            )}

            {mode === "selected_pin" && (
              <div className="space-y-4 animate-fade-in">
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
                  <p className="font-black text-amber-300">📌 Selected Students</p>
                  <p className="text-sm text-amber-400/80 mt-1">Selected students get <strong>+15 XP</strong> + streak bonus.</p>
                </div>
                {isTeam && teams.length > 0 && <TeamSelector teams={teams} selectedTeamId={selTeamId} onSelect={setSelTeamId} />}
                <StudentPicker students={students} selected={selIds} onToggle={toggle} teams={isTeam ? teams : []} />
                <div className="flex gap-3">
                  <button onClick={() => { setMode("idle"); setSelIds([]); }} className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-sm hover:bg-white/10">Cancel</button>
                  <button onClick={handleSelected} disabled={isPending || !selIds.length}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-black text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:opacity-90 disabled:opacity-50">
                    {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Star className="w-4 h-4" />}
                    Award XP to {selIds.length || "?"} student{selIds.length !== 1 ? "s" : ""}
                  </button>
                </div>
              </div>
            )}

            {mode === "role_play" && (
              <div className="space-y-4 animate-fade-in">
                <div className="bg-violet-500/10 border border-violet-500/20 rounded-xl p-4">
                  <p className="font-black text-violet-300">🎭 Role Play Evaluation</p>
                  <p className="text-sm text-violet-400/80 mt-1">Select performers and rate them.</p>
                </div>
                {isTeam && teams.length > 0 && <TeamSelector teams={teams} selectedTeamId={selTeamId} onSelect={setSelTeamId} />}
                <StudentPicker students={students} selected={selIds} onToggle={toggle} teams={isTeam ? teams : []} label="Who performed?" />
                <RolePlayScorer scores={rpScores} onChange={setRpScores} />
                <div className="flex gap-3">
                  <button onClick={() => { setMode("idle"); setSelIds([]); }} className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-sm hover:bg-white/10">Cancel</button>
                  <button onClick={handleRolePlay} disabled={isPending || !selIds.length}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-black text-white bg-gradient-to-r from-violet-500 to-purple-600 hover:opacity-90 disabled:opacity-50">
                    {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Theater className="w-4 h-4" />}
                    Submit Evaluation
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Live Leaderboard */}
        <div className="rounded-2xl border border-white/10 overflow-hidden" style={{ background: "#1e293b" }}>
          <div className="flex items-center gap-2 px-5 py-4 border-b border-white/5">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span className="font-black text-white">Live Leaderboard</span>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 p-4">
            {sortedStudents.map((s, i) => <StudentLiveCard key={s.id} student={s} rank={i+1} />)}
          </div>
        </div>

        {/* Activity Log */}
        {events.length > 0 && (
          <div className="rounded-2xl border border-white/10 overflow-hidden" style={{ background: "#1e293b" }}>
            <div className="flex items-center gap-2 px-5 py-4 border-b border-white/5">
              <Hash className="w-4 h-4 text-slate-400" />
              <span className="font-black text-white">Activity Log</span>
            </div>
            <div className="p-4 space-y-2 max-h-48 overflow-y-auto scrollbar-thin">
              {[...events].reverse().map(e => <EventLogItem key={e.id} event={e} students={students} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
