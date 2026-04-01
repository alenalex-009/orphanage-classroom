"use client";
import { useState, useTransition, useEffect, useRef } from "react";
import { toast } from "sonner";
import { cn, getInitials } from "@/lib/utils";
import { awardWholeClassXP, awardSelectedStudentsXP, evaluateRolePlay } from "@/actions/gamification";
import { completeSession } from "@/actions/session";
import { createTeams } from "@/actions/teams";
import { useRouter } from "next/navigation";
import { getLevelInfo } from "@/lib/avatars";
import type { Question, GameStudent, GameTeam, AnswerMode } from "@/lib/game-types";
import { ChevronRight, ChevronLeft, SkipForward, X, Users, CheckCircle2, Zap, Theater, Trophy, Star, ArrowLeft, Crown, Flame } from "lucide-react";
import Link from "next/link";

const TC: Record<string, { bg: string; border: string; text: string; bar: string; glow: string }> = {
  teal:   { bg:"bg-teal-950",   border:"border-teal-400",  text:"text-teal-300",  bar:"bg-teal-400",  glow:"rgba(45,212,191,0.3)"  },
  amber:  { bg:"bg-amber-950",  border:"border-amber-400", text:"text-amber-300", bar:"bg-amber-400", glow:"rgba(251,191,36,0.3)"  },
  purple: { bg:"bg-violet-950", border:"border-violet-400",text:"text-violet-300",bar:"bg-violet-400",glow:"rgba(167,139,250,0.3)" },
  coral:  { bg:"bg-rose-950",   border:"border-rose-400",  text:"text-rose-300",  bar:"bg-rose-400",  glow:"rgba(251,113,133,0.3)" },
};

const OPTION_CONFIG = [
  { letter:"A", bg:"from-blue-600 to-blue-700",   hover:"hover:from-blue-500",   border:"border-blue-400" },
  { letter:"B", bg:"from-emerald-600 to-emerald-700",hover:"hover:from-emerald-500",border:"border-emerald-400" },
  { letter:"C", bg:"from-amber-600 to-amber-700",  hover:"hover:from-amber-500",  border:"border-amber-400" },
  { letter:"D", bg:"from-rose-600 to-rose-700",    hover:"hover:from-rose-500",   border:"border-rose-400" },
];

interface GameRoomProps {
  session: { id:string; topic:string; mode:"class"|"team"; teamSize:number; completed:boolean; classId:string; className:string };
  students: GameStudent[];
  teams: GameTeam[];
  questions: Question[];
}

// ── XP Burst ────────────────────────────────────────────────────────────────
function XPBurst({ msg, show, bonus }: { msg: string; show: boolean; bonus?: number }) {
  return (
    <div className={cn("fixed inset-0 flex flex-col items-center justify-center z-[100] pointer-events-none transition-all duration-500",
      show ? "opacity-100" : "opacity-0 pointer-events-none")}>
      <div className={cn("transition-all duration-500", show ? "scale-100 translate-y-0" : "scale-75 translate-y-12")}>
        <div className="text-center">
          <div className="text-8xl font-black text-white drop-shadow-2xl" style={{ textShadow:"0 0 60px rgba(139,92,246,0.8)" }}>
            {msg}
          </div>
          {bonus && bonus > 0 && (
            <div className="mt-3 inline-flex items-center gap-2 bg-amber-500 text-white px-6 py-2 rounded-full font-black text-xl animate-bounce">
              🔥 +{bonus} BONUS XP!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Team Scoreboard ──────────────────────────────────────────────────────────
function TeamBoard({ teams }: { teams: GameTeam[] }) {
  const sorted = [...teams].sort((a, b) => b.xp - a.xp);
  const max = sorted[0]?.xp || 1;
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
      {sorted.map((team, i) => {
        const tc = TC[team.color] ?? TC.teal;
        return (
          <div key={team.id} className={cn("relative p-4 rounded-2xl border-2", tc.bg, tc.border)}>
            {i === 0 && <Crown className="absolute top-2 right-2 w-4 h-4 text-amber-400" />}
            <p className={cn("font-black text-sm", tc.text)}>{team.name}</p>
            <p className={cn("text-3xl font-black mt-1", tc.text)}>{team.xp}</p>
            <div className="mt-2 h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div className={cn("h-full rounded-full", tc.bar)} style={{ width:`${(team.xp/max)*100}%`, transition:"width 0.6s ease-out" }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── Student Grid ─────────────────────────────────────────────────────────────
function StudentGrid({ students, selected, onToggle, teams }: {
  students: GameStudent[]; selected: string[]; onToggle: (id:string) => void; teams: GameTeam[];
}) {
  const getTeam = (id: string) => teams.find(t => t.members.some(m => m.studentId === id));
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2">
      {students.map(s => {
        const isSel = selected.includes(s.id);
        const team = getTeam(s.id);
        const tc = team ? TC[team.color] ?? TC.teal : null;
        const { avatar } = getLevelInfo(s.reward?.xp ?? 0);
        return (
          <button key={s.id} onClick={() => onToggle(s.id)}
            className={cn("flex flex-col items-center gap-1.5 p-3 rounded-2xl border-2 transition-all active:scale-95",
              isSel ? "border-violet-400 bg-violet-900/50" : "border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20")}>
            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black",
              isSel ? `text-white bg-gradient-to-br ${avatar.gradient}` : "bg-white/10 text-white/70")}>
              {getInitials(s.name)}
            </div>
            <p className="text-xs font-black text-white/80 truncate w-full text-center">{s.name.split(" ")[0]}</p>
            {tc && <span className={cn("text-[10px] px-1.5 py-0.5 rounded-full font-bold", tc.text, "bg-white/10")}>{team!.name}</span>}
            <span className="text-[10px] text-white/40 font-bold">{s.reward?.xp ?? 0}xp</span>
            {isSel && <CheckCircle2 className="w-3.5 h-3.5 text-violet-400" />}
          </button>
        );
      })}
    </div>
  );
}

// ── Role Play Eval ───────────────────────────────────────────────────────────
function RolePlayEval({ students, selected, onToggle, scores, onScoreChange, onSubmit, onCancel, isPending }: {
  students: GameStudent[]; selected: string[]; onToggle: (id:string) => void;
  scores: { participation:number; understanding:number; creativity:number };
  onScoreChange: (k: keyof typeof scores, v:number) => void;
  onSubmit: () => void; onCancel: () => void; isPending: boolean;
}) {
  const avg = Math.round((scores.participation + scores.understanding + scores.creativity) / 3);
  const rows: { key: keyof typeof scores; label: string; icon: string }[] = [
    { key:"participation", label:"Participation", icon:"🙋" },
    { key:"understanding", label:"Understanding", icon:"🧠" },
    { key:"creativity",    label:"Creativity",    icon:"✨" },
  ];
  return (
    <div className="space-y-5 animate-fade-in">
      <p className="text-white/60 text-sm font-bold">Who performed?</p>
      <div className="flex flex-wrap gap-2">
        {students.map(s => {
          const sel = selected.includes(s.id);
          return (
            <button key={s.id} onClick={() => onToggle(s.id)}
              className={cn("px-4 py-2 rounded-xl font-bold text-sm border-2 transition-all",
                sel ? "bg-violet-500 border-violet-300 text-white" : "bg-white/10 border-white/20 text-white/60 hover:bg-white/20")}>
              {s.name.split(" ")[0]}{sel && " ✓"}
            </button>
          );
        })}
      </div>
      <div className="space-y-3 bg-white/5 rounded-2xl p-4 border border-white/10">
        <div className="flex justify-between text-sm font-black">
          <span className="text-white/70">Performance</span>
          <span className={cn(avg >= 7 ? "text-amber-400" : "text-white/40")}>Avg {avg}/10 {avg>=7?"⭐":"" }</span>
        </div>
        {rows.map(({ key, label, icon }) => (
          <div key={key} className="flex items-center gap-3">
            <span className="text-xl w-7">{icon}</span>
            <span className="text-sm font-bold text-white/70 w-28">{label}</span>
            <input type="range" min={1} max={10} step={1} value={scores[key]}
              onChange={e => onScoreChange(key, +e.target.value)}
              className="flex-1 accent-violet-500 cursor-pointer" />
            <span className="text-sm font-black text-white w-8 text-right">{scores[key]}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-3">
        <button onClick={onCancel} className="px-6 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white font-bold text-sm hover:bg-white/20">
          Cancel
        </button>
        <button onClick={onSubmit} disabled={isPending || selected.length === 0}
          className="flex-1 py-2.5 rounded-xl font-black text-white bg-gradient-to-r from-violet-500 to-purple-600 hover:opacity-90 disabled:opacity-40 flex items-center justify-center gap-2">
          <Theater className="w-4 h-4" />{isPending ? "Submitting…" : "Submit Performance"}
        </button>
      </div>
    </div>
  );
}

// ── MAIN GAME ROOM ───────────────────────────────────────────────────────────
export function GameRoom({ session, students, teams: initTeams, questions }: GameRoomProps) {
  const [qIdx, setQIdx] = useState(0);
  const [phase, setPhase] = useState<"question"|"answer"|"feedback"|"roleplay_eval"|"done">("question");
  const [answerMode, setAnswerMode] = useState<AnswerMode>("whole_class");
  const [selIds, setSelIds] = useState<string[]>([]);
  const [teams, setTeams] = useState<GameTeam[]>(initTeams);
  const [teamsCreated, setTeamsCreated] = useState(initTeams.length > 0);
  const [rpScores, setRpScores] = useState({ participation:7, understanding:7, creativity:7 });
  const [flash, setFlash] = useState({ show:false, msg:"", bonus:0 });
  const [revealed, setRevealed] = useState<number|null>(null);
  const [comboCount, setComboCount] = useState(0);
  const [isPending, start] = useTransition();
  const router = useRouter();
  const isTeam = session.mode === "team";
  const q = questions[qIdx];

  const showFlash = (msg: string, bonus = 0) => {
    setFlash({ show:true, msg, bonus });
    setTimeout(() => setFlash(f => ({ ...f, show:false })), 2500);
  };

  const toggle = (id: string) => setSelIds(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);

  const handleWholeClass = () => start(async () => {
    const r = await awardWholeClassXP(session.id, session.classId);
    if (r.success) { showFlash(`+10 XP × ${students.length} 🎉`); setPhase("feedback"); router.refresh(); }
    else toast.error(r.message);
  });

  const handleSelected = () => {
    if (!selIds.length) return;
    start(async () => {
      const r = await awardSelectedStudentsXP(session.id, selIds);
      if (r.success) { showFlash(`+15 XP ×${selIds.length} ⚡`); setSelIds([]); setPhase("feedback"); router.refresh(); }
      else toast.error(r.message);
    });
  };

  const handleRolePlay = () => {
    if (!selIds.length) return;
    start(async () => {
      const avg = Math.round((rpScores.participation + rpScores.understanding + rpScores.creativity) / 3);
      const bonus = avg >= 7 ? 10 : 0;
      const r = await evaluateRolePlay(session.id, selIds, rpScores);
      if (r.success) { showFlash(`+20 XP 🎭`, bonus); setSelIds([]); setPhase("feedback"); router.refresh(); }
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

  const nextQ = () => {
    if (qIdx < questions.length - 1) { setQIdx(i => i + 1); setPhase("question"); setRevealed(null); setSelIds([]); }
    else setPhase("done");
  };

  const sortedStudents = [...students].sort((a, b) => (b.reward?.xp ?? 0) - (a.reward?.xp ?? 0));

  return (
    <div className="min-h-screen flex flex-col" style={{ background:"linear-gradient(160deg, #0f0a1e 0%, #0a1435 100%)" }}>
      <XPBurst msg={flash.msg} show={flash.show} bonus={flash.bonus} />

      {/* Header */}
      <div className="px-6 py-4 flex items-center justify-between border-b" style={{ borderColor:"rgba(255,255,255,0.08)" }}>
        <div className="flex items-center gap-3">
          <Link href={`/session/${session.id}`} className="p-2 rounded-xl hover:bg-white/10 transition-colors">
            <ArrowLeft className="w-4 h-4 text-white/50" />
          </Link>
          <div>
            <p className="font-black text-white leading-tight">{session.topic}</p>
            <p className="text-xs text-white/40">{session.className} · Game Mode</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {questions.length > 0 && (
            <span className="text-xs font-black text-white/40 bg-white/5 px-3 py-1.5 rounded-full">
              {qIdx + 1} / {questions.length}
            </span>
          )}
          <button onClick={handleEnd} disabled={isPending}
            className="text-sm font-black px-4 py-2 rounded-xl bg-white/10 text-white hover:bg-white/20 active:scale-95 transition-all">
            End Session
          </button>
        </div>
      </div>

      <div className="flex-1 max-w-5xl mx-auto w-full px-4 py-6 space-y-5">

        {/* Team setup */}
        {isTeam && !teamsCreated && (
          <div className="rounded-3xl border border-white/10 p-10 text-center" style={{ background:"rgba(255,255,255,0.04)" }}>
            <p className="text-6xl mb-4">🏆</p>
            <h2 className="font-black text-2xl text-white mb-2">Set Up Teams</h2>
            <p className="text-white/50 mb-6">{students.length} students · groups of {session.teamSize}</p>
            <button onClick={handleCreateTeams} disabled={isPending}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-2xl font-black text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:opacity-90 active:scale-95 transition-all">
              <Users className="w-4 h-4" />Create Teams Randomly
            </button>
          </div>
        )}

        {/* Team board */}
        {isTeam && teams.length > 0 && <TeamBoard teams={teams} />}

        {/* DONE screen */}
        {phase === "done" && (
          <div className="rounded-3xl border border-white/10 p-10 text-center" style={{ background:"rgba(255,255,255,0.04)" }}>
            <p className="text-7xl mb-4">🎉</p>
            <h2 className="font-black text-3xl text-white mb-2">All Questions Done!</h2>
            <p className="text-white/50 mb-8">Great session, everyone!</p>
            <div className="flex gap-3 justify-center">
              <button onClick={handleEnd} disabled={isPending}
                className="px-8 py-3 rounded-2xl font-black text-white bg-gradient-to-r from-violet-500 to-indigo-600 hover:opacity-90 active:scale-95 transition-all">
                End & See Summary →
              </button>
            </div>
          </div>
        )}

        {/* Question card */}
        {q && phase !== "done" && (
          <div className="rounded-3xl border border-white/10 overflow-hidden" style={{ background:"rgba(255,255,255,0.04)" }}>
            {/* Question header */}
            <div className="px-8 py-6 border-b border-white/5">
              <div className="flex items-center gap-3 mb-1">
                <span className="text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full text-white/50 bg-white/5 border border-white/10">
                  {q.type === "mcq" ? "Multiple Choice" : q.type === "story" ? "Story" : "Role Play"}
                </span>
                <span className="text-xs font-black text-amber-400">+{q.xpReward} XP</span>
              </div>
              <h2 className="text-2xl font-black text-white leading-tight mt-3">{q.title}</h2>
              {q.body && <p className="text-white/60 mt-2 text-sm leading-relaxed">{q.body}</p>}
            </div>

            {/* MCQ Options */}
            {q.type === "mcq" && q.options && (
              <div className="grid grid-cols-2 gap-3 p-6">
                {q.options.map((opt, i) => {
                  const cfg = OPTION_CONFIG[i];
                  const isRevealed = revealed === i;
                  const isWrong = revealed !== null && !opt.isCorrect && revealed !== i;
                  return (
                    <button key={opt.id}
                      onClick={() => { if (revealed === null) { setRevealed(i); if (opt.isCorrect) setComboCount(c => c+1); else setComboCount(0); } }}
                      className={cn("flex items-center gap-4 p-5 rounded-2xl border-2 text-left font-bold text-white transition-all",
                        revealed === null ? cn("bg-gradient-to-r", cfg.bg, cfg.hover, cfg.border, "hover:scale-[1.02] active:scale-[0.98]") :
                        opt.isCorrect ? "bg-emerald-500 border-emerald-300 scale-[1.02]" :
                        isWrong ? "opacity-30 border-white/10 bg-white/5" :
                        cn("bg-gradient-to-r", cfg.bg, cfg.border)
                      )}>
                      <span className="text-2xl font-black w-8 text-center opacity-70">{cfg.letter}</span>
                      <span className="flex-1 text-sm">{opt.text}</span>
                      {opt.isCorrect && revealed !== null && <span className="text-xl">✓</span>}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Role play prompt */}
            {q.type === "roleplay" && q.prompt && (
              <div className="p-6">
                <div className="bg-violet-500/10 border border-violet-500/20 rounded-2xl p-5">
                  <p className="text-xs font-black text-violet-400 uppercase tracking-wider mb-2">Scenario</p>
                  <p className="text-white/80 leading-relaxed">{q.prompt}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Activity controls */}
        {q && phase !== "done" && (
          <div className="rounded-3xl border border-white/10 overflow-hidden" style={{ background:"rgba(255,255,255,0.04)" }}>
            <div className="flex items-center gap-2 px-6 py-4 border-b border-white/5">
              <Zap className="w-4 h-4 text-amber-400" />
              <span className="font-black text-white">Award XP</span>
              {comboCount >= 3 && (
                <span className="ml-auto flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-400 text-xs font-black">
                  <Flame className="w-3 h-3" />{comboCount}x Combo!
                </span>
              )}
            </div>
            <div className="p-5">
              {phase === "question" && (
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { key:"whole_class", icon:"🙋", label:"Whole Class", sub:`+10 XP × all`, gradient:"from-teal-500 to-emerald-600" },
                    { key:"selected",    icon:"📌", label:"Select Students", sub:"+15 XP + bonus",gradient:"from-amber-500 to-orange-600" },
                    { key:"roleplay",    icon:"🎭", label:"Role Play",   sub:"+20 XP + eval", gradient:"from-violet-500 to-purple-700" },
                  ].map(a => (
                    <button key={a.key}
                      onClick={() => { if (a.key === "whole_class") handleWholeClass(); else if (a.key === "selected") setPhase("answer"); else setPhase("roleplay_eval"); }}
                      disabled={isPending}
                      className={cn("flex flex-col items-center gap-3 p-5 rounded-2xl border border-white/10 hover:border-white/20 hover:bg-white/5 active:scale-95 transition-all disabled:opacity-40")}>
                      <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center text-2xl bg-gradient-to-br", a.gradient)}>
                        {a.icon}
                      </div>
                      <div className="text-center">
                        <p className="font-black text-white text-sm">{a.label}</p>
                        <p className="text-xs text-white/40 mt-0.5">{a.sub}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {phase === "answer" && (
                <div className="space-y-4 animate-fade-in">
                  <p className="text-sm font-bold text-white/60">Select who answered correctly:</p>
                  <StudentGrid students={students} selected={selIds} onToggle={toggle} teams={isTeam ? teams : []} />
                  <div className="flex gap-3">
                    <button onClick={() => { setPhase("question"); setSelIds([]); }} className="px-5 py-2.5 rounded-xl bg-white/10 text-white font-bold text-sm hover:bg-white/20">Cancel</button>
                    <button onClick={handleSelected} disabled={isPending || !selIds.length}
                      className="flex-1 py-2.5 rounded-xl font-black text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:opacity-90 disabled:opacity-40 flex items-center justify-center gap-2">
                      <Star className="w-4 h-4" />Award +15 XP to {selIds.length || "?"} student{selIds.length !== 1 ? "s" : ""}
                    </button>
                  </div>
                </div>
              )}

              {phase === "roleplay_eval" && (
                <RolePlayEval
                  students={students} selected={selIds} onToggle={toggle}
                  scores={rpScores} onScoreChange={(k, v) => setRpScores(s => ({ ...s, [k]: v }))}
                  onSubmit={handleRolePlay} onCancel={() => { setPhase("question"); setSelIds([]); }}
                  isPending={isPending}
                />
              )}

              {phase === "feedback" && (
                <div className="text-center space-y-4 py-4 animate-fade-in">
                  <p className="text-4xl">🎉</p>
                  <p className="font-black text-white text-lg">XP Awarded!</p>
                  <div className="flex gap-3 justify-center">
                    {qIdx < questions.length - 1 ? (
                      <button onClick={nextQ}
                        className="flex items-center gap-2 px-8 py-3 rounded-2xl font-black text-white bg-gradient-to-r from-violet-500 to-indigo-600 hover:opacity-90 active:scale-95 transition-all">
                        Next Question <ChevronRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button onClick={handleEnd} disabled={isPending}
                        className="flex items-center gap-2 px-8 py-3 rounded-2xl font-black text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:opacity-90 active:scale-95">
                        End Session & Results →
                      </button>
                    )}
                    <button onClick={nextQ}
                      className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/10 text-white/70 hover:bg-white/15 transition-all text-sm font-bold">
                      <SkipForward className="w-4 h-4" />Skip
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Live student leaderboard */}
        <div className="rounded-2xl border border-white/10 overflow-hidden" style={{ background:"rgba(255,255,255,0.03)" }}>
          <div className="flex items-center gap-2 px-5 py-3 border-b border-white/5">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span className="font-black text-white text-sm">Live Rankings</span>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-2 p-3">
            {sortedStudents.map((s, i) => {
              const { avatar } = getLevelInfo(s.reward?.xp ?? 0);
              const medals = ["👑","🥈","🥉"];
              return (
                <div key={s.id} className={cn("flex flex-col items-center gap-1.5 p-2.5 rounded-xl border transition-all",
                  i === 0 ? "border-amber-400/50 bg-amber-900/30" : "border-white/5 bg-white/3")}>
                  <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center text-xs font-black text-white bg-gradient-to-br", avatar.gradient)}>
                    {getInitials(s.name)}
                  </div>
                  <p className="text-[10px] font-black text-white/70 truncate w-full text-center">{s.name.split(" ")[0]}</p>
                  <span className="text-[10px] font-black text-amber-400">{s.reward?.xp ?? 0}</span>
                  {i < 3 && <span className="text-xs">{medals[i]}</span>}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
