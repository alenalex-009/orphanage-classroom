"use client";

import { useState, useTransition, useCallback } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { cn, getInitials } from "@/lib/utils";
import {
  awardWholeClassXP,
  awardSelectedStudentsXP,
  evaluateRolePlay,
} from "@/actions/gamification";
import { createTeams } from "@/actions/teams";
import { completeSession } from "@/actions/session";
import {
  Users, Zap, Theater, Trophy, ChevronRight,
  CheckCircle2, Star, Loader2, ArrowLeft, Hash,
  Gamepad2,
} from "lucide-react";
import Link from "next/link";

// ─── TYPES ────────────────────────────────────────────────────────────────────
type Student = {
  id: string; name: string; age: number;
  reward: { xp: number; level: number; streak: number } | null;
  achievements: { id: string; icon: string; label: string }[];
};

type TeamMember = { id: string; studentId: string; student: Student };
type Team = { id: string; name: string; color: string; xp: number; members: TeamMember[] };
type ActivityEvent = {
  id: string; type: string; studentIds: string[];
  xpAwarded: number; bonusXP: number; createdAt: Date;
};

type SessionData = {
  id: string; topic: string; mode: string;
  teamSize: number; completed: boolean;
  class: { id: string; name: string };
};

interface LiveSessionRoomProps {
  session: SessionData;
  students: Student[];
  teams: Team[];
  initialEvents: ActivityEvent[];
}

type ActivityMode = "idle" | "whole_class" | "selected_pin" | "role_play" | "summary";

// ─── TEAM COLORS ─────────────────────────────────────────────────────────────
const TEAM_COLOR_MAP: Record<string, { bg: string; border: string; text: string; badge: string }> = {
  teal:   { bg: "bg-teal-50",   border: "border-teal-300",  text: "text-teal-800",  badge: "bg-teal-200 text-teal-800"  },
  amber:  { bg: "bg-amber-50",  border: "border-amber-300", text: "text-amber-800", badge: "bg-amber-200 text-amber-800" },
  purple: { bg: "bg-purple-50", border: "border-purple-300",text: "text-purple-800",badge: "bg-purple-200 text-purple-800"},
  coral:  { bg: "bg-red-50",    border: "border-red-300",   text: "text-red-800",   badge: "bg-red-200 text-red-800"    },
};

// ─── XP FEEDBACK OVERLAY ──────────────────────────────────────────────────────
function XPFeedback({ message, show }: { message: string; show: boolean }) {
  return (
    <div className={cn(
      "fixed top-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-500",
      show ? "opacity-100 -translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-90 pointer-events-none"
    )}>
      <div className="bg-teal-700 text-white px-8 py-4 rounded-2xl shadow-2xl font-extrabold text-xl flex items-center gap-3">
        <span className="text-2xl">🎉</span>
        {message}
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export function LiveSessionRoom({ session, students, teams: initialTeams, initialEvents }: LiveSessionRoomProps) {
  const [activityMode, setActivityMode] = useState<ActivityMode>("idle");
  const [teams, setTeams] = useState<Team[]>(initialTeams);
  const [events, setEvents] = useState<ActivityEvent[]>(initialEvents);
  const [selectedStudentIds, setSelectedStudentIds] = useState<string[]>([]);
  const [selectedTeamId, setSelectedTeamId] = useState<string | undefined>();
  const [pinInput, setPinInput] = useState("");
  const [rolePlayScores, setRolePlayScores] = useState({ participation: 7, understanding: 7, creativity: 7 });
  const [xpFeedback, setXpFeedback] = useState({ show: false, message: "" });
  const [isPending, startTransition] = useTransition();
  const [isTeamsCreated, setIsTeamsCreated] = useState(initialTeams.length > 0);
  const router = useRouter();

  const isTeamMode = session.mode === "team";

  const showXPFeedback = useCallback((message: string) => {
    setXpFeedback({ show: true, message });
    setTimeout(() => setXpFeedback({ show: false, message: "" }), 2500);
  }, []);

  // ─── TEAM SETUP ──────────────────────────────────────────────────────────
  const handleCreateTeams = () => {
    startTransition(async () => {
      const studentIds = students.map((s) => s.id);
      const teamCount = Math.ceil(studentIds.length / session.teamSize);
      const result = await createTeams(session.id, studentIds, Math.max(2, teamCount));
      if (result.success) {
        toast.success(result.message);
        setIsTeamsCreated(true);
        router.refresh();
      } else {
        toast.error(result.message);
      }
    });
  };

  // ─── WHOLE CLASS XP ──────────────────────────────────────────────────────
  const handleWholeClass = () => {
    startTransition(async () => {
      const result = await awardWholeClassXP(session.id, session.class.id, selectedTeamId);
      if (result.success) {
        showXPFeedback(result.message);
        toast.success(result.message);
        setActivityMode("idle");
        router.refresh();
      } else {
        toast.error(result.message);
      }
    });
  };

  // ─── SELECTED PIN XP ─────────────────────────────────────────────────────
  const toggleStudent = (studentId: string) => {
    setSelectedStudentIds((prev) =>
      prev.includes(studentId) ? prev.filter((id) => id !== studentId) : [...prev, studentId]
    );
  };

  const handleSelectedAnswer = () => {
    if (selectedStudentIds.length === 0) { toast.error("Select at least one student."); return; }
    startTransition(async () => {
      const result = await awardSelectedStudentsXP(session.id, selectedStudentIds, selectedTeamId);
      if (result.success) {
        showXPFeedback(result.message);
        toast.success(result.message);
        setSelectedStudentIds([]);
        setActivityMode("idle");
        router.refresh();
      } else {
        toast.error(result.message);
      }
    });
  };

  // ─── ROLE PLAY ───────────────────────────────────────────────────────────
  const handleRolePlay = () => {
    if (selectedStudentIds.length === 0) { toast.error("Select students who performed."); return; }
    startTransition(async () => {
      const result = await evaluateRolePlay(session.id, selectedStudentIds, rolePlayScores, selectedTeamId);
      if (result.success) {
        showXPFeedback(result.message);
        toast.success(result.message);
        setSelectedStudentIds([]);
        setRolePlayScores({ participation: 7, understanding: 7, creativity: 7 });
        setActivityMode("idle");
        router.refresh();
      } else {
        toast.error(result.message);
      }
    });
  };

  // ─── END SESSION ─────────────────────────────────────────────────────────
  const handleEndSession = () => {
    startTransition(async () => {
      await completeSession(session.id);
      setActivityMode("summary");
      router.push(`/session/${session.id}/summary`);
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <XPFeedback message={xpFeedback.message} show={xpFeedback.show} />

      {/* Header */}
      <div className="bg-white border-b border-border px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <Link href="/session" className="p-2 rounded-lg hover:bg-secondary transition-colors">
            <ArrowLeft className="w-4 h-4 text-muted-foreground" />
          </Link>
          <div>
            <h1 className="font-extrabold text-foreground text-lg leading-tight">{session.topic}</h1>
            <p className="text-xs text-muted-foreground">
              {session.class.name} · {isTeamMode ? "🏆 Team Mode" : "🎓 Class Mode"} · {students.length} students
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200">
            ● Live
          </span>
          {!session.completed && (
            <button
              onClick={handleEndSession}
              disabled={isPending}
              className="text-sm font-bold px-4 py-2 rounded-xl bg-foreground text-background hover:opacity-80 transition-opacity"
            >
              End Session
            </button>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">

        {/* TEAM MODE: Setup or Scoreboard */}
        {isTeamMode && (
          <div>
            {!isTeamsCreated ? (
              <div className="classroom-card text-center py-8">
                <p className="text-3xl mb-3">🏆</p>
                <h2 className="font-extrabold text-xl text-foreground mb-2">Set Up Teams</h2>
                <p className="text-muted-foreground text-sm mb-6">
                  {students.length} students will be randomly split into teams of {session.teamSize}
                </p>
                <button
                  onClick={handleCreateTeams}
                  disabled={isPending}
                  className="action-btn flex items-center gap-2 mx-auto px-8 bg-amber-500 hover:bg-amber-600 text-white"
                >
                  {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Users className="w-4 h-4" />}
                  Create Teams Randomly
                </button>
              </div>
            ) : (
              <TeamScoreboard teams={teams} onSelectTeam={setSelectedTeamId} selectedTeamId={selectedTeamId} />
            )}
          </div>
        )}

        {!session.completed && (
        <Link href={`/session/${session.id}/game`}
          className="flex items-center gap-4 p-5 rounded-2xl bg-gray-900 border border-gray-700 hover:bg-gray-800 transition-all group">
          <div className="w-12 h-12 rounded-xl bg-teal-500/20 flex items-center justify-center shrink-0">
            <Gamepad2 className="w-6 h-6 text-teal-400" />
          </div>
          <div className="flex-1">
            <p className="font-extrabold text-white text-base">Launch Game Mode 🎮</p>
            <p className="text-gray-400 text-sm mt-0.5">Full screen · Live questions · XP · Scoreboard</p>
          </div>
          <span className="text-teal-400 font-bold text-lg group-hover:translate-x-1 transition-transform">→</span>
        </Link>
      )}

        {/* ACTIVITY CONTROLS */}
        <div className="classroom-card">
          <h2 className="font-bold text-foreground mb-4 flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-500" />
            Activity Controls
          </h2>

          {activityMode === "idle" && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <ActivityButton
                icon="🙋"
                label="Whole Class Answers"
                sub="+10 XP to everyone"
                color="bg-teal-50 border-teal-200 hover:bg-teal-100 text-teal-800"
                onClick={() => setActivityMode("whole_class")}
              />
              <ActivityButton
                icon="📌"
                label="Select Students (PIN)"
                sub="+15 XP + streak bonus"
                color="bg-amber-50 border-amber-200 hover:bg-amber-100 text-amber-800"
                onClick={() => setActivityMode("selected_pin")}
              />
              <ActivityButton
                icon="🎭"
                label="Role Play / Skit"
                sub="+20 XP + performance bonus"
                color="bg-purple-50 border-purple-200 hover:bg-purple-100 text-purple-800"
                onClick={() => setActivityMode("role_play")}
              />
            </div>
          )}

          {/* WHOLE CLASS MODE */}
          {activityMode === "whole_class" && (
            <div className="space-y-4 animate-fade-in">
              <div className="bg-teal-50 border border-teal-200 rounded-xl p-4">
                <p className="font-bold text-teal-800 mb-1">🙋 Whole Class Answer</p>
                <p className="text-sm text-teal-700">
                  All present students will receive <strong>+10 XP</strong> for participating together.
                </p>
              </div>
              {isTeamMode && teams.length > 0 && (
                <TeamSelector teams={teams} selectedTeamId={selectedTeamId} onSelect={setSelectedTeamId} />
              )}
              <div className="flex gap-3">
                <button onClick={() => setActivityMode("idle")}
                  className="action-btn px-6 bg-secondary border border-border text-foreground hover:bg-muted">
                  Cancel
                </button>
                <button onClick={handleWholeClass} disabled={isPending}
                  className="action-btn flex-1 flex items-center justify-center gap-2 bg-teal-700 hover:bg-teal-800 text-white disabled:opacity-50">
                  {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
                  {isPending ? "Awarding..." : "Award +10 XP to All 🎉"}
                </button>
              </div>
            </div>
          )}

          {/* SELECTED PIN MODE */}
          {activityMode === "selected_pin" && (
            <div className="space-y-4 animate-fade-in">
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <p className="font-bold text-amber-800 mb-1">📌 Select Students</p>
                <p className="text-sm text-amber-700">
                  Tap students who answered. They get <strong>+15 XP</strong> (+ streak bonus if applicable).
                </p>
              </div>
              {isTeamMode && teams.length > 0 && (
                <TeamSelector teams={teams} selectedTeamId={selectedTeamId} onSelect={setSelectedTeamId} />
              )}
              <StudentPicker
                students={students}
                selected={selectedStudentIds}
                onToggle={toggleStudent}
                teams={isTeamMode ? teams : []}
              />
              <div className="flex gap-3">
                <button onClick={() => { setActivityMode("idle"); setSelectedStudentIds([]); }}
                  className="action-btn px-6 bg-secondary border border-border text-foreground hover:bg-muted">
                  Cancel
                </button>
                <button onClick={handleSelectedAnswer} disabled={isPending || selectedStudentIds.length === 0}
                  className="action-btn flex-1 flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white disabled:opacity-50">
                  {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Star className="w-4 h-4" />}
                  {isPending ? "Awarding..." : `Award XP to ${selectedStudentIds.length} student${selectedStudentIds.length !== 1 ? "s" : ""}`}
                </button>
              </div>
            </div>
          )}

          {/* ROLE PLAY MODE */}
          {activityMode === "role_play" && (
            <div className="space-y-4 animate-fade-in">
              <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                <p className="font-bold text-purple-800 mb-1">🎭 Role Play Evaluation</p>
                <p className="text-sm text-purple-700">
                  Select students who performed, then rate their performance.
                </p>
              </div>
              {isTeamMode && teams.length > 0 && (
                <TeamSelector teams={teams} selectedTeamId={selectedTeamId} onSelect={setSelectedTeamId} />
              )}
              <StudentPicker
                students={students}
                selected={selectedStudentIds}
                onToggle={toggleStudent}
                teams={isTeamMode ? teams : []}
              />
              <RolePlayScorer scores={rolePlayScores} onChange={setRolePlayScores} />
              <div className="flex gap-3">
                <button onClick={() => { setActivityMode("idle"); setSelectedStudentIds([]); }}
                  className="action-btn px-6 bg-secondary border border-border text-foreground hover:bg-muted">
                  Cancel
                </button>
                <button onClick={handleRolePlay} disabled={isPending || selectedStudentIds.length === 0}
                  className="action-btn flex-1 flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white disabled:opacity-50">
                  {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Theater className="w-4 h-4" />}
                  {isPending ? "Evaluating..." : "Submit Evaluation 🎭"}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* STUDENT XP LEADERBOARD */}
        <div className="classroom-card">
          <h2 className="font-bold text-foreground mb-4 flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-500" />
            Student Leaderboard
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {[...students]
              .sort((a, b) => (b.reward?.xp ?? 0) - (a.reward?.xp ?? 0))
              .map((student, idx) => (
                <StudentCard key={student.id} student={student} rank={idx + 1} />
              ))}
          </div>
        </div>

        {/* ACTIVITY LOG */}
        <div className="classroom-card">
          <h2 className="font-bold text-foreground mb-4 flex items-center gap-2">
            <Hash className="w-4 h-4 text-muted-foreground" />
            Activity Log
          </h2>
          {events.length === 0 ? (
            <p className="text-muted-foreground text-sm text-center py-4">
              No activities yet. Use the controls above to award XP!
            </p>
          ) : (
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {events.map((event) => (
                <EventLogItem key={event.id} event={event} students={students} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── SUB-COMPONENTS ──────────────────────────────────────────────────────────

function ActivityButton({ icon, label, sub, color, onClick }: {
  icon: string; label: string; sub: string; color: string; onClick: () => void;
}) {
  return (
    <button onClick={onClick}
      className={cn("flex flex-col items-center gap-2 p-5 rounded-2xl border-2 transition-all active:scale-95 text-center", color)}>
      <span className="text-4xl">{icon}</span>
      <span className="font-bold text-sm">{label}</span>
      <span className="text-xs opacity-70">{sub}</span>
    </button>
  );
}

function TeamScoreboard({ teams, onSelectTeam, selectedTeamId }: {
  teams: Team[];
  onSelectTeam: (id: string | undefined) => void;
  selectedTeamId?: string;
}) {
  const sorted = [...teams].sort((a, b) => b.xp - a.xp);
  return (
    <div className="classroom-card">
      <h2 className="font-bold text-foreground mb-4 flex items-center gap-2">
        <Trophy className="w-4 h-4 text-amber-500" />
        Team Scoreboard
      </h2>
      <div className="grid grid-cols-2 gap-3">
        {sorted.map((team, idx) => {
          const colors = TEAM_COLOR_MAP[team.color] ?? TEAM_COLOR_MAP.teal;
          const isSelected = selectedTeamId === team.id;
          return (
            <button key={team.id} onClick={() => onSelectTeam(isSelected ? undefined : team.id)}
              className={cn(
                "p-4 rounded-2xl border-2 text-left transition-all",
                colors.bg, isSelected ? colors.border : "border-transparent hover:" + colors.border
              )}>
              <div className="flex items-center justify-between mb-2">
                <span className={cn("font-extrabold text-lg", colors.text)}>{team.name}</span>
                {idx === 0 && <span className="text-xl">👑</span>}
              </div>
              <p className={cn("text-2xl font-extrabold", colors.text)}>{team.xp} XP</p>
              <p className="text-xs text-muted-foreground mt-1">
                {team.members.length} students
              </p>
            </button>
          );
        })}
      </div>
      {selectedTeamId && (
        <p className="text-xs text-teal-700 font-semibold mt-3 text-center">
          ✓ Next XP award will also go to the selected team
        </p>
      )}
    </div>
  );
}

function TeamSelector({ teams, selectedTeamId, onSelect }: {
  teams: Team[];
  selectedTeamId?: string;
  onSelect: (id: string | undefined) => void;
}) {
  return (
    <div>
      <p className="text-xs font-semibold text-muted-foreground mb-2">Credit to team (optional):</p>
      <div className="flex gap-2 flex-wrap">
        {teams.map((team) => {
          const colors = TEAM_COLOR_MAP[team.color] ?? TEAM_COLOR_MAP.teal;
          const isSelected = selectedTeamId === team.id;
          return (
            <button key={team.id} onClick={() => onSelect(isSelected ? undefined : team.id)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-bold border transition-all",
                isSelected ? cn(colors.bg, colors.border, colors.text) : "bg-secondary border-border text-muted-foreground"
              )}>
              {team.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StudentPicker({ students, selected, onToggle, teams }: {
  students: Student[];
  selected: string[];
  onToggle: (id: string) => void;
  teams: Team[];
}) {
  const getStudentTeam = (studentId: string) =>
    teams.find((t) => t.members.some((m) => m.studentId === studentId));

  return (
    <div>
      <p className="text-xs font-semibold text-muted-foreground mb-2">
        Select students ({selected.length} selected):
      </p>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
        {students.map((student) => {
          const isSelected = selected.includes(student.id);
          const team = getStudentTeam(student.id);
          const colors = team ? (TEAM_COLOR_MAP[team.color] ?? TEAM_COLOR_MAP.teal) : null;
          return (
            <button key={student.id} onClick={() => onToggle(student.id)}
              className={cn(
                "flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all active:scale-95",
                isSelected
                  ? "bg-teal-50 border-teal-400"
                  : "bg-secondary border-transparent hover:border-border"
              )}>
              <div className={cn(
                "w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs",
                isSelected ? "bg-teal-200 text-teal-800" : "bg-muted text-muted-foreground"
              )}>
                {getInitials(student.name)}
              </div>
              <p className="text-xs font-semibold text-center leading-tight truncate w-full">
                {student.name.split(" ")[0]}
              </p>
              {team && colors && (
                <span className={cn("text-xs px-1.5 py-0.5 rounded font-bold", colors.badge)}>
                  {team.name}
                </span>
              )}
              {isSelected && <CheckCircle2 className="w-3 h-3 text-teal-600" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function RolePlayScorer({ scores, onChange }: {
  scores: { participation: number; understanding: number; creativity: number };
  onChange: (scores: { participation: number; understanding: number; creativity: number }) => void;
}) {
  const metrics = [
    { key: "participation" as const, label: "Participation", emoji: "🙋" },
    { key: "understanding" as const, label: "Understanding", emoji: "🧠" },
    { key: "creativity" as const, label: "Creativity",     emoji: "✨" },
  ];

  const avg = Math.round((scores.participation + scores.understanding + scores.creativity) / 3);

  return (
    <div className="bg-purple-50 border border-purple-100 rounded-xl p-4 space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-bold text-purple-800">Performance Rating</p>
        <span className="text-sm font-extrabold text-purple-700">
          Avg: {avg}/10 {avg >= 7 ? "⭐ Bonus!" : ""}
        </span>
      </div>
      {metrics.map(({ key, label, emoji }) => (
        <div key={key} className="flex items-center gap-3">
          <span className="text-lg w-6">{emoji}</span>
          <span className="text-sm font-semibold text-purple-800 w-28">{label}</span>
          <input type="range" min={1} max={10} step={1} value={scores[key]}
            onChange={(e) => onChange({ ...scores, [key]: Number(e.target.value) })}
            className="flex-1 accent-purple-600 h-2 cursor-pointer" />
          <span className="text-sm font-bold text-purple-700 w-8 text-right">{scores[key]}/10</span>
        </div>
      ))}
    </div>
  );
}

function StudentCard({ student, rank }: { student: Student; rank: number }) {
  const xp = student.reward?.xp ?? 0;
  const level = student.reward?.level ?? 0;
  const streak = student.reward?.streak ?? 0;

  return (
    <div className={cn(
      "flex flex-col items-center gap-1.5 p-3 rounded-xl bg-secondary border",
      rank === 1 ? "border-amber-300 bg-amber-50" : "border-transparent"
    )}>
      <div className="relative">
        <div className="w-10 h-10 rounded-full bg-teal-200 text-teal-800 font-bold text-xs flex items-center justify-center">
          {getInitials(student.name)}
        </div>
        {rank <= 3 && (
          <span className="absolute -top-1 -right-1 text-sm">
            {rank === 1 ? "👑" : rank === 2 ? "🥈" : "🥉"}
          </span>
        )}
      </div>
      <p className="text-xs font-bold text-foreground text-center truncate w-full">
        {student.name.split(" ")[0]}
      </p>
      <p className="text-sm font-extrabold text-amber-600">{xp} XP</p>
      <div className="flex items-center gap-1">
        <span className="text-xs text-muted-foreground">Lv.{level}</span>
        {streak >= 3 && <span className="text-xs">🔥</span>}
      </div>
      {student.achievements.length > 0 && (
        <span className="text-sm">{student.achievements[0].icon}</span>
      )}
    </div>
  );
}

function EventLogItem({ event, students }: { event: ActivityEvent; students: Student[] }) {
  const typeConfig = {
    whole_class: { icon: "🙋", label: "Whole Class", color: "text-teal-700" },
    selected_pin: { icon: "📌", label: "Selected Answer", color: "text-amber-700" },
    role_play: { icon: "🎭", label: "Role Play", color: "text-purple-700" },
  }[event.type] ?? { icon: "⚡", label: event.type, color: "text-muted-foreground" };

  const involvedStudents = students
    .filter((s) => event.studentIds.includes(s.id))
    .map((s) => s.name.split(" ")[0])
    .join(", ");

  return (
    <div className="flex items-center gap-3 p-2.5 rounded-lg bg-secondary text-sm">
      <span className="text-base">{typeConfig.icon}</span>
      <div className="flex-1 min-w-0">
        <span className={cn("font-semibold", typeConfig.color)}>{typeConfig.label}</span>
        {involvedStudents && (
          <span className="text-muted-foreground ml-1 truncate"> · {involvedStudents}</span>
        )}
      </div>
      <span className="font-bold text-amber-600 shrink-0">
        +{event.xpAwarded + event.bonusXP} XP
      </span>
    </div>
  );
}
