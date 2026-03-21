"use client";

import { useState, useTransition, useEffect, useRef } from "react";
import { toast } from "sonner";
import { cn, getInitials } from "@/lib/utils";
import {
  awardWholeClassXP,
  awardSelectedStudentsXP,
  evaluateRolePlay,
} from "@/actions/gamification";
import { completeSession } from "@/actions/session";
import { createTeams } from "@/actions/teams";
import { useRouter } from "next/navigation";
import type { Question, GameStudent, GameTeam, AnswerMode } from "@/lib/game-types";
import {
  ChevronRight, ChevronLeft, SkipForward, X,
  Users, GraduationCap, CheckCircle2, Zap,
  Theater, Trophy, Star, ArrowLeft, Shuffle,
} from "lucide-react";
import Link from "next/link";

// ─── TEAM COLORS ──────────────────────────────────────────────────────────────
const TC: Record<string, { bg: string; border: string; text: string; bar: string }> = {
  teal:   { bg: "bg-teal-900/80",   border: "border-teal-400",  text: "text-teal-100",  bar: "bg-teal-400"  },
  amber:  { bg: "bg-amber-900/80",  border: "border-amber-400", text: "text-amber-100", bar: "bg-amber-400" },
  purple: { bg: "bg-purple-900/80", border: "border-purple-400",text: "text-purple-100",bar: "bg-purple-400" },
  coral:  { bg: "bg-red-900/80",    border: "border-red-400",   text: "text-red-100",   bar: "bg-red-400"   },
};

const OPTION_COLORS = [
  "bg-blue-600 hover:bg-blue-500 border-blue-400",
  "bg-emerald-600 hover:bg-emerald-500 border-emerald-400",
  "bg-amber-600 hover:bg-amber-500 border-amber-400",
  "bg-rose-600 hover:bg-rose-500 border-rose-400",
];
const OPTION_LABELS = ["A", "B", "C", "D"];

// ─── PROPS ────────────────────────────────────────────────────────────────────
interface GameRoomProps {
  session: {
    id: string; topic: string; mode: "class" | "team";
    teamSize: number; completed: boolean;
    classId: string; className: string;
  };
  students: GameStudent[];
  teams: GameTeam[];
  questions: Question[];
}

// ─── XP FLASH OVERLAY ─────────────────────────────────────────────────────────
function XPFlash({ msg, show }: { msg: string; show: boolean }) {
  return (
    <div className={cn(
      "fixed inset-0 flex items-center justify-center z-[100] pointer-events-none transition-all duration-300",
      show ? "opacity-100" : "opacity-0"
    )}>
      <div className={cn(
        "text-center transition-all duration-300",
        show ? "scale-100 translate-y-0" : "scale-75 translate-y-8"
      )}>
        <div className="text-7xl font-black text-white drop-shadow-2xl tracking-tight">
          {msg}
        </div>
      </div>
    </div>
  );
}

// ─── ROLE PLAY EVALUATOR ──────────────────────────────────────────────────────
function RolePlayEval({ students, selected, onToggle, scores, onScoreChange, onSubmit, onCancel, isPending }: {
  students: GameStudent[];
  selected: string[];
  onToggle: (id: string) => void;
  scores: { participation: number; understanding: number; creativity: number };
  onScoreChange: (k: keyof typeof scores, v: number) => void;
  onSubmit: () => void;
  onCancel: () => void;
  isPending: boolean;
}) {
  const avg = Math.round((scores.participation + scores.understanding + scores.creativity) / 3);
  return (
    <div className="space-y-5">
      <p className="text-white/70 text-sm font-semibold">Who performed?</p>
      <div className="flex flex-wrap gap-2">
        {students.map(s => {
          const sel = selected.includes(s.id);
          return (
            <button key={s.id} onClick={() => onToggle(s.id)}
              className={cn(
                "px-4 py-2 rounded-xl font-bold text-sm border-2 transition-all",
                sel ? "bg-purple-500 border-purple-300 text-white" : "bg-white/10 border-white/20 text-white/60 hover:bg-white/20"
              )}>
              {s.name.split(" ")[0]}
              {sel && " ✓"}
            </button>
          );
        })}
      </div>

      <div className="space-y-3">
        {(["participation", "understanding", "creativity"] as const).map(key => (
          <div key={key} className="flex items-center gap-4">
            <span className="text-white/70 text-sm font-semibold w-28 capitalize">{key}</span>
            <div className="flex gap-1 flex-1">
              {[1,2,3,4,5].map(n => (
                <button key={n} onClick={() => onScoreChange(key, n)}
                  className={cn(
                    "flex-1 h-10 rounded-lg font-bold text-sm border-2 transition-all",
                    scores[key] >= n
                      ? "bg-purple-500 border-purple-300 text-white"
                      : "bg-white/10 border-white/20 text-white/40"
                  )}>
                  {n}
                </button>
              ))}
            </div>
            <span className="text-white font-black w-8 text-right">{scores[key]}/5</span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between pt-2">
        <div>
          <p className="text-white/50 text-xs">Average score</p>
          <p className="text-white font-black text-2xl">{avg}/5 {avg >= 4 ? "⭐ Bonus XP!" : ""}</p>
        </div>
        <div className="flex gap-3">
          <button onClick={onCancel}
            className="px-5 py-3 rounded-xl bg-white/10 text-white font-bold text-sm hover:bg-white/20">
            Cancel
          </button>
          <button onClick={onSubmit} disabled={isPending || selected.length === 0}
            className="px-6 py-3 rounded-xl bg-purple-500 hover:bg-purple-400 text-white font-bold text-sm disabled:opacity-40 flex items-center gap-2">
            <Theater className="w-4 h-4" />
            {isPending ? "Evaluating..." : "Submit & Award XP"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN GAME ROOM ───────────────────────────────────────────────────────────
export function GameRoom({ session, students, teams: initialTeams, questions }: GameRoomProps) {
  const [qIndex, setQIndex] = useState(0);
  const [phase, setPhase] = useState<"question" | "answering" | "feedback" | "roleplay_eval" | "done">("question");
  const [answerMode, setAnswerMode] = useState<AnswerMode>("whole_class");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [teams, setTeams] = useState<GameTeam[]>(initialTeams);
  const [classXP, setClassXP] = useState(students.reduce((s, st) => s + (st.reward?.xp ?? 0), 0));
  const [xpFlash, setXpFlash] = useState({ show: false, msg: "" });
  const [rpScores, setRpScores] = useState({ participation: 3, understanding: 3, creativity: 3 });
  const [teamsReady, setTeamsReady] = useState(initialTeams.length > 0);
  const [isPending, startTransition] = useTransition();
  const [feedbackMsg, setFeedbackMsg] = useState("");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const router = useRouter();

  const isTeamMode = session.mode === "team";
  const currentQ = questions[qIndex];
  const totalQ = questions.length;
  const isLast = qIndex === totalQ - 1;

  // ─── FLASH XP ──────────────────────────────────────────────────────────────
  const flashXP = (msg: string) => {
    setXpFlash({ show: true, msg });
    setTimeout(() => setXpFlash({ show: false, msg: "" }), 1800);
  };

  // ─── CREATE TEAMS ──────────────────────────────────────────────────────────
  const handleCreateTeams = () => {
    startTransition(async () => {
      const teamCount = Math.max(2, Math.ceil(students.length / session.teamSize));
      const result = await createTeams(session.id, students.map(s => s.id), teamCount);
      if (result.success) {
        setTeamsReady(true);
        toast.success("Teams created!");
        router.refresh();
      } else toast.error(result.message);
    });
  };

  // ─── TOGGLE STUDENT SELECTION ──────────────────────────────────────────────
  const toggleStudent = (id: string) =>
    setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  // ─── HANDLE ANSWER ─────────────────────────────────────────────────────────
  const handleAnswer = (optionId?: string) => {
    if (currentQ.type === "roleplay") {
      setPhase("roleplay_eval");
      return;
    }

    // Check correctness for MCQ/story
    if (optionId && currentQ.options) {
      const opt = currentQ.options.find(o => o.id === optionId);
      setSelectedOption(optionId);
      setIsCorrect(opt?.isCorrect ?? null);
    }

    setPhase("answering");
  };

  // ─── CONFIRM AWARD XP ─────────────────────────────────────────────────────
 const confirmAward = () => {
  startTransition(async () => {
    if (answerMode === "whole_class") {
      const result = await awardWholeClassXP(session.id, session.classId);
      if (result.success) {
        setClassXP(p => p + result.xpAwarded * students.length);
        flashXP(`+${result.xpAwarded} XP 🎉`);
        setFeedbackMsg(`All students got +${result.xpAwarded} XP!`);
        setPhase("feedback");
        setSelectedIds([]);
        router.refresh();
      } else {
        toast.error(result.message);
      }
    } else {
      if (selectedIds.length === 0) { toast.error("Select at least one student."); return; }
      const result = await awardSelectedStudentsXP(session.id, selectedIds);
      if (result.success) {
        flashXP(`+${result.xpPerStudent} XP${result.hadStreakBonus ? " 🔥" : ""}`);
        setFeedbackMsg(result.message);
        setPhase("feedback");
        setSelectedIds([]);
        router.refresh();
      } else {
        toast.error(result.message);
      }
    }
  });
};

  // ─── ROLE PLAY SUBMIT ─────────────────────────────────────────────────────
  const submitRolePlay = () => {
    startTransition(async () => {
      const result = await evaluateRolePlay(session.id, selectedIds, {
        participation: rpScores.participation * 2,
        understanding: rpScores.understanding * 2,
        creativity: rpScores.creativity * 2,
      });
      if (result.success) {
        const total = result.xpAwarded + result.bonusXP;
        flashXP(`+${total} XP 🎭`);
        setFeedbackMsg(result.message);
        setPhase("feedback");
        setSelectedIds([]);
        setRpScores({ participation: 3, understanding: 3, creativity: 3 });
        router.refresh();
      } else toast.error(result.message);
    });
  };

  // ─── NEXT QUESTION ────────────────────────────────────────────────────────
  const nextQuestion = () => {
    if (isLast) {
      setPhase("done");
      return;
    }
    setQIndex(p => p + 1);
    setPhase("question");
    setSelectedOption(null);
    setIsCorrect(null);
    setSelectedIds([]);
  };

  // ─── END SESSION ──────────────────────────────────────────────────────────
  const endSession = () => {
    startTransition(async () => {
      await completeSession(session.id);
      router.push(`/session/${session.id}/summary`);
    });
  };

  // ─── TEAM SETUP GATE ──────────────────────────────────────────────────────
  if (isTeamMode && !teamsReady) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">🏆</div>
          <h1 className="text-3xl font-black text-white mb-2">Team Mode</h1>
          <p className="text-white/60 mb-8">
            {students.length} students will be split into teams of {session.teamSize}
          </p>
          <button onClick={handleCreateTeams} disabled={isPending}
            className="w-full py-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-white font-black text-xl flex items-center justify-center gap-3 transition-all active:scale-95">
            <Shuffle className="w-6 h-6" />
            {isPending ? "Creating teams..." : "Create Teams & Start Game"}
          </button>
          <Link href={`/session/${session.id}/live`}
            className="block mt-4 text-white/40 text-sm hover:text-white/60">
            ← Back to session
          </Link>
        </div>
      </div>
    );
  }

  // ─── DONE STATE ───────────────────────────────────────────────────────────
  if (phase === "done") {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">🎊</div>
          <h1 className="text-3xl font-black text-white mb-2">All Done!</h1>
          <p className="text-white/60 mb-8">Great session, {session.className}!</p>
          <button onClick={endSession} disabled={isPending}
            className="w-full py-4 rounded-2xl bg-teal-500 hover:bg-teal-400 text-white font-black text-xl mb-3">
            {isPending ? "Finishing..." : "See Session Summary →"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col select-none overflow-hidden">
      <XPFlash msg={xpFlash.msg} show={xpFlash.show} />

      {/* ── TOP BAR ─────────────────────────────────────────────────────── */}
      <div className="shrink-0 bg-gray-900 border-b border-white/10 px-4 py-3">
        <div className="max-w-5xl mx-auto flex items-center gap-4">

          {/* Back */}
          <Link href={`/session/${session.id}/live`}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors">
            <ArrowLeft className="w-4 h-4 text-white/50" />
          </Link>

          {/* Topic */}
          <div className="flex-1 min-w-0">
            <p className="text-white font-black text-sm truncate">{session.topic}</p>
            <p className="text-white/40 text-xs">{session.className}</p>
          </div>

          {/* Progress */}
          <div className="flex items-center gap-2">
            {questions.map((_, i) => (
              <div key={i} className={cn(
                "h-2 rounded-full transition-all duration-300",
                i < qIndex ? "bg-teal-400 w-2" :
                i === qIndex ? "bg-white w-6" : "bg-white/20 w-2"
              )} />
            ))}
          </div>

          {/* Mode badge */}
          <div className={cn(
            "px-3 py-1.5 rounded-full text-xs font-bold border shrink-0",
            isTeamMode
              ? "bg-amber-900/50 border-amber-500 text-amber-200"
              : "bg-teal-900/50 border-teal-500 text-teal-200"
          )}>
            {isTeamMode ? "🏆 Team" : "🎓 Class"}
          </div>

          {/* End session */}
          <button onClick={endSession} disabled={isPending}
            className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white/60 hover:text-white text-xs font-bold transition-all">
            End
          </button>
        </div>

        {/* SCOREBOARD */}
        <div className="max-w-5xl mx-auto mt-3">
          {isTeamMode ? (
            <div className="flex gap-3">
              {[...teams].sort((a, b) => b.xp - a.xp).map((team, idx) => {
                const c = TC[team.color] ?? TC.teal;
                const maxXP = Math.max(...teams.map(t => t.xp), 1);
                return (
                  <div key={team.id} className={cn(
                    "flex-1 rounded-xl border px-3 py-2", c.bg, c.border
                  )}>
                    <div className="flex items-center justify-between mb-1">
                      <span className={cn("font-black text-sm", c.text)}>
                        {idx === 0 ? "👑 " : ""}{team.name}
                      </span>
                      <span className={cn("font-black text-lg", c.text)}>{team.xp}</span>
                    </div>
                    <div className="h-1.5 bg-black/30 rounded-full overflow-hidden">
                      <div className={cn("h-full rounded-full transition-all duration-700", c.bar)}
                        style={{ width: `${(team.xp / maxXP) * 100}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex items-center gap-6 px-2">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                <span className="text-white font-black text-lg">{classXP}</span>
                <span className="text-white/40 text-xs">class XP</span>
              </div>
              <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-teal-500 to-amber-400 rounded-full transition-all duration-700"
                  style={{ width: `${Math.min(100, (classXP % 500) / 5)}%` }} />
              </div>
              <span className="text-white/40 text-xs shrink-0">
                Q {qIndex + 1}/{totalQ}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ── QUESTION AREA ──────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 flex flex-col justify-center px-4 py-6 max-w-3xl mx-auto w-full">

          {/* Question type badge */}
          <div className="flex items-center gap-2 mb-4">
            <span className={cn(
              "px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest",
              currentQ.type === "mcq"      ? "bg-blue-900/60 text-blue-300 border border-blue-700" :
              currentQ.type === "story"    ? "bg-purple-900/60 text-purple-300 border border-purple-700" :
                                             "bg-rose-900/60 text-rose-300 border border-rose-700"
            )}>
              {currentQ.type === "mcq" ? "❓ Question" : currentQ.type === "story" ? "📖 Story" : "🎭 Role Play"}
            </span>
            <span className="text-white/30 text-xs">{qIndex + 1} of {totalQ}</span>
          </div>

          {/* Story body (shown before question in story mode) */}
          {currentQ.type === "story" && currentQ.body && (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-5">
              <p className="text-white/80 text-base leading-relaxed">{currentQ.body}</p>
            </div>
          )}

          {/* Role play prompt */}
          {currentQ.type === "roleplay" && currentQ.prompt && (
            <div className="bg-rose-950/40 border border-rose-800/50 rounded-2xl p-6 mb-5">
              <p className="text-rose-200 text-base leading-relaxed whitespace-pre-line">{currentQ.prompt}</p>
            </div>
          )}

          {/* Main question title */}
          <h2 className="text-white font-black text-2xl md:text-3xl leading-tight mb-6">
            {currentQ.title}
          </h2>

          {/* MCQ / Story options */}
          {(currentQ.type === "mcq" || currentQ.type === "story") && currentQ.options && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              {currentQ.options.map((opt, i) => {
                const isSelected = selectedOption === opt.id;
                const showResult = phase === "feedback" || phase === "answering";
                const correct = showResult && opt.isCorrect;
                const wrong = showResult && isSelected && !opt.isCorrect;

                return (
                  <button key={opt.id}
                    onClick={() => phase === "question" && handleAnswer(opt.id)}
                    disabled={phase !== "question"}
                    className={cn(
                      "relative flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all duration-200 active:scale-98",
                      phase === "question" ? cn(OPTION_COLORS[i], "text-white cursor-pointer") :
                      correct ? "bg-emerald-600 border-emerald-400 text-white scale-105" :
                      wrong ? "bg-red-700 border-red-400 text-white" :
                      "bg-white/5 border-white/10 text-white/40 cursor-not-allowed"
                    )}>
                    <span className="w-9 h-9 rounded-xl bg-black/30 flex items-center justify-center font-black text-lg shrink-0">
                      {OPTION_LABELS[i]}
                    </span>
                    <span className="font-bold text-base leading-tight">{opt.text}</span>
                    {correct && <CheckCircle2 className="w-5 h-5 ml-auto shrink-0" />}
                    {wrong && <X className="w-5 h-5 ml-auto shrink-0" />}
                  </button>
                );
              })}
            </div>
          )}

          {/* Role play — start button */}
          {currentQ.type === "roleplay" && phase === "question" && (
            <button onClick={() => handleAnswer()}
              className="w-full py-5 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xl border-2 border-rose-400 transition-all active:scale-95 flex items-center justify-center gap-3">
              <Theater className="w-6 h-6" />
              Start Role Play — Evaluate After
            </button>
          )}
        </div>

        {/* ── CONTROL PANEL ────────────────────────────────────────────── */}
        <div className="shrink-0 bg-gray-900 border-t border-white/10 px-4 py-4">
          <div className="max-w-3xl mx-auto space-y-4">

            {/* PHASE: QUESTION — role play eval */}
            {phase === "roleplay_eval" && (
              <RolePlayEval
                students={students}
                selected={selectedIds}
                onToggle={toggleStudent}
                scores={rpScores}
                onScoreChange={(k, v) => setRpScores(p => ({ ...p, [k]: v }))}
                onSubmit={submitRolePlay}
                onCancel={() => setPhase("question")}
                isPending={isPending}
              />
            )}

            {/* PHASE: ANSWERING — choose mode and award */}
            {phase === "answering" && (
              <div className="space-y-4">
                {/* Mode toggle */}
                <div className="flex gap-3">
                  <button onClick={() => setAnswerMode("whole_class")}
                    className={cn(
                      "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm border-2 transition-all",
                      answerMode === "whole_class"
                        ? "bg-teal-600 border-teal-400 text-white"
                        : "bg-white/5 border-white/20 text-white/50 hover:bg-white/10"
                    )}>
                    <GraduationCap className="w-4 h-4" />
                    Whole Class +10 XP
                  </button>
                  <button onClick={() => setAnswerMode("selected")}
                    className={cn(
                      "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm border-2 transition-all",
                      answerMode === "selected"
                        ? "bg-amber-600 border-amber-400 text-white"
                        : "bg-white/5 border-white/20 text-white/50 hover:bg-white/10"
                    )}>
                    <Users className="w-4 h-4" />
                    Select Students +15 XP
                  </button>
                </div>

                {/* Student picker (selected mode) */}
                {answerMode === "selected" && (
                  <div className="flex flex-wrap gap-2">
                    {students.map(s => {
                      const sel = selectedIds.includes(s.id);
                      return (
                        <button key={s.id} onClick={() => toggleStudent(s.id)}
                          className={cn(
                            "px-4 py-2 rounded-xl font-bold text-sm border-2 transition-all",
                            sel
                              ? "bg-amber-500 border-amber-300 text-white"
                              : "bg-white/10 border-white/20 text-white/60 hover:bg-white/20"
                          )}>
                          {s.name.split(" ")[0]}
                          {sel && <span className="ml-1">✓</span>}
                          {sel && (s.reward?.streak ?? 0) >= 3 && <span className="ml-1">🔥</span>}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Confirm button */}
                <button onClick={confirmAward} disabled={isPending}
                  className="w-full py-4 rounded-2xl bg-teal-500 hover:bg-teal-400 text-white font-black text-lg flex items-center justify-center gap-3 transition-all active:scale-95 disabled:opacity-50">
                  <Zap className="w-5 h-5" />
                  {isPending ? "Awarding XP..." : "Award XP 🎉"}
                </button>
              </div>
            )}

            {/* PHASE: FEEDBACK */}
            {phase === "feedback" && (
              <div className="space-y-3">
                <div className={cn(
                  "p-4 rounded-2xl border-2 text-center",
                  isCorrect === true ? "bg-emerald-900/60 border-emerald-500" :
                  isCorrect === false ? "bg-red-900/60 border-red-500" :
                  "bg-teal-900/60 border-teal-500"
                )}>
                  <p className="text-white font-black text-lg">
                    {isCorrect === true ? "✅ Correct!" : isCorrect === false ? "❌ Not quite" : "⭐ Nice work!"}
                  </p>
                  <p className="text-white/70 text-sm mt-1">{feedbackMsg}</p>
                </div>

                <div className="flex gap-3">
                  {!isLast ? (
                    <button onClick={nextQuestion}
                      className="flex-1 py-4 rounded-2xl bg-white text-gray-900 font-black text-lg flex items-center justify-center gap-2 hover:bg-white/90 transition-all active:scale-95">
                      Next Question <ChevronRight className="w-5 h-5" />
                    </button>
                  ) : (
                    <button onClick={endSession} disabled={isPending}
                      className="flex-1 py-4 rounded-2xl bg-teal-500 hover:bg-teal-400 text-white font-black text-lg flex items-center justify-center gap-2">
                      <Trophy className="w-5 h-5" />
                      {isPending ? "Finishing..." : "End Session & See Results"}
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* PHASE: QUESTION (before any option selected) */}
            {phase === "question" && currentQ.type !== "roleplay" && (
              <div className="flex items-center justify-between">
                <button onClick={() => qIndex > 0 && (setQIndex(p => p - 1), setPhase("question"), setSelectedOption(null))}
                  disabled={qIndex === 0}
                  className="p-3 rounded-xl bg-white/10 text-white/50 hover:bg-white/20 disabled:opacity-20 transition-all">
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <p className="text-white/30 text-sm font-semibold">
                  {currentQ.type === "mcq" ? "Tap an option to answer" : "Read the story, then tap an option"}
                </p>

                <button onClick={() => { setPhase("answering"); setSelectedOption(null); setIsCorrect(null); }}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 text-white/50 hover:bg-white/20 text-sm font-bold transition-all">
                  Skip <SkipForward className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
