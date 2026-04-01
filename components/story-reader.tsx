"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, BookOpen, Zap, Trophy, CheckCircle2, XCircle } from "lucide-react";
import type { Story } from "@/lib/stories";
import { cn } from "@/lib/utils";

interface StoryReaderProps { story: Story }

export function StoryReader({ story }: StoryReaderProps) {
  const [pageIdx, setPageIdx]     = useState(0);
  const [selected, setSelected]   = useState<string | null>(null);
  const [correct, setCorrect]     = useState<boolean | null>(null);
  const [totalXP, setTotalXP]     = useState(0);
  const [answered, setAnswered]   = useState<Set<number>>(new Set());
  const [done, setDone]           = useState(false);

  const page          = story.pages[pageIdx];
  const isFirst       = pageIdx === 0;
  const isLast        = pageIdx === story.pages.length - 1;
  const hasQ          = !!page.question;
  const alreadyDone   = answered.has(pageIdx);
  const canNext       = !hasQ || alreadyDone;

  const goNext = () => {
    if (isLast) { setDone(true); return; }
    setPageIdx(i => i + 1);
    setSelected(null);
    setCorrect(null);
  };
  const goPrev = () => {
    if (isFirst) return;
    setPageIdx(i => i - 1);
    setSelected(null);
    setCorrect(null);
  };

  const handleAnswer = (id: string) => {
    if (alreadyDone) return;
    const isCorrect = page.question!.options.find(o => o.id === id)?.isCorrect ?? false;
    setSelected(id);
    setCorrect(isCorrect);
    if (isCorrect) setTotalXP(t => t + 10);
    setAnswered(s => new Set(Array.from(s).concat(pageIdx)));
  };

  /* ── Completion Screen ─────────────────────────────────────────── */
  if (done) return (
    <motion.div initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }}
      className="clay-card text-center py-12 space-y-6 border-3 border-violet-200">
      <div className="text-8xl animate-float">{story.coverEmoji}</div>
      <div>
        <h2 className="text-3xl font-black text-foreground">Story Complete! 🎉</h2>
        <p className="text-muted-foreground mt-1">{story.title}</p>
      </div>
      <div className="inline-flex items-center gap-3 px-8 py-4 rounded-3xl border-2 border-violet-200 bg-violet-50"
        style={{ boxShadow:"3px 3px 12px rgba(99,102,241,0.2)" }}>
        <Zap className="w-6 h-6 text-violet-600" />
        <span className="text-2xl font-black text-violet-700">+{totalXP} XP Earned!</span>
      </div>
      <div className="max-w-md mx-auto p-5 rounded-3xl bg-amber-50 border-2 border-amber-200"
        style={{ boxShadow:"3px 3px 10px rgba(245,158,11,0.15)" }}>
        <p className="font-black text-amber-800 mb-1.5">💛 The Moral of the Story</p>
        <p className="text-amber-700 italic text-sm leading-relaxed">&ldquo;{story.moral}&rdquo;</p>
      </div>
      <a href="/stories" className="btn-primary inline-flex items-center gap-2 text-sm">
        <BookOpen className="w-4 h-4" />Read Another Story
      </a>
    </motion.div>
  );

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-2xl border-2 border-indigo-100"
            style={{ boxShadow:"var(--shadow-clay-sm)" }}>
            {story.coverEmoji}
          </div>
          <div>
            <p className="font-black text-foreground text-sm">{story.title}</p>
            <p className="text-[11px] text-muted-foreground">{story.subject}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {totalXP > 0 && (
            <span className="xp-pill animate-pop">
              <Zap className="w-3 h-3" />+{totalXP} XP
            </span>
          )}
          <span className="text-xs font-black text-muted-foreground bg-white border-2 border-indigo-100 px-3 py-1.5 rounded-full"
            style={{ boxShadow:"var(--shadow-clay-sm)" }}>
            {pageIdx + 1} / {story.pages.length}
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="flex gap-1.5">
        {story.pages.map((_, i) => (
          <div key={i} className="flex-1 h-2 rounded-full overflow-hidden"
            style={{ background:"#e0e7ff" }}>
            <div className="h-full rounded-full transition-all duration-500"
              style={{
                width: i < pageIdx ? "100%" : i === pageIdx ? "50%" : "0%",
                background: "linear-gradient(90deg, #6366f1, #8b5cf6)",
                boxShadow: i <= pageIdx ? "0 0 6px rgba(99,102,241,0.4)" : "none",
              }} />
          </div>
        ))}
      </div>

      {/* Story card */}
      <AnimatePresence mode="wait">
        <motion.div key={pageIdx}
          initial={{ opacity:0, x:30 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-30 }}
          transition={{ duration:0.25 }}
          className="clay-card border-3 border-indigo-100 text-center space-y-4">
          <div className="text-6xl">{page.emoji}</div>
          <p className="text-foreground text-lg leading-relaxed font-semibold">{page.text}</p>
        </motion.div>
      </AnimatePresence>

      {/* Question */}
      {hasQ && (
        <div className={cn("clay-card border-3 transition-all duration-300",
          correct === true  ? "border-emerald-300 bg-emerald-50" :
          correct === false ? "border-rose-300 bg-rose-50" :
          "border-violet-200 bg-violet-50/50")}>
          <p className="font-black text-foreground mb-4 flex items-start gap-2">
            <span className="text-xl mt-0.5">💭</span>
            {page.question!.text}
          </p>
          <div className="space-y-2.5">
            {page.question!.options.map(opt => {
              const isSel   = selected === opt.id;
              const show    = alreadyDone;
              return (
                <button key={opt.id} onClick={() => handleAnswer(opt.id)}
                  disabled={alreadyDone}
                  className={cn(
                    "w-full text-left px-4 py-3 rounded-2xl border-2 font-semibold text-sm transition-all duration-200",
                    "disabled:cursor-not-allowed",
                    show && opt.isCorrect
                      ? "bg-emerald-100 border-emerald-400 text-emerald-800"
                      : show && isSel && !opt.isCorrect
                      ? "bg-rose-100 border-rose-400 text-rose-700"
                      : isSel
                      ? "bg-violet-100 border-violet-400 text-violet-800"
                      : "bg-white border-indigo-100 text-foreground hover:border-violet-300 hover:bg-violet-50"
                  )}
                  style={!show && !isSel ? { boxShadow:"var(--shadow-clay-sm)" } : undefined}>
                  <span className="flex items-center gap-2">
                    {show && opt.isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                    {show && isSel && !opt.isCorrect && <XCircle className="w-4 h-4 text-rose-500 shrink-0" />}
                    {opt.text}
                    {show && opt.isCorrect && <span className="ml-auto text-xs font-black text-emerald-600">✓</span>}
                  </span>
                </button>
              );
            })}
          </div>

          <AnimatePresence>
            {alreadyDone && (
              <motion.div initial={{ opacity:0, y:6 }} animate={{ opacity:1, y:0 }}
                className={cn("mt-4 p-3 rounded-2xl text-sm font-bold flex items-center gap-2",
                  correct ? "bg-emerald-100 text-emerald-800 border border-emerald-200" : "bg-amber-50 text-amber-800 border border-amber-200")}>
                {correct ? "🎉 Correct! +10 XP" : "💡 Good try! The correct answer is shown above."}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Navigation */}
      <div className="flex gap-3">
        <button onClick={goPrev} disabled={isFirst}
          className="btn-secondary flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed">
          <ChevronLeft className="w-4 h-4" />Previous
        </button>
        <button onClick={goNext} disabled={!canNext}
          className="btn-primary flex-1 flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed">
          {isLast ? (<><Trophy className="w-4 h-4" />Finish Story</>) : (<>Next Page <ChevronRight className="w-4 h-4" /></>)}
        </button>
      </div>
    </div>
  );
}
