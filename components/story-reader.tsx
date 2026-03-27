"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, BookOpen, Zap, Trophy, CheckCircle2 } from "lucide-react";
import type { Story, StoryPage } from "@/lib/stories";
import { cn } from "@/lib/utils";

interface StoryReaderProps {
  story: Story;
  classId?: string;
  sessionId?: string;
}

export function StoryReader({ story }: StoryReaderProps) {
  const [pageIdx, setPageIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answeredCorrectly, setAnsweredCorrectly] = useState<boolean | null>(null);
  const [totalXP, setTotalXP] = useState(0);
  const [answeredPages, setAnsweredPages] = useState<Set<number>>(new Set());
  const [showComplete, setShowComplete] = useState(false);

  const page = story.pages[pageIdx];
  const isFirst = pageIdx === 0;
  const isLast = pageIdx === story.pages.length - 1;
  const hasQuestion = !!page.question;
  const alreadyAnswered = answeredPages.has(pageIdx);

  const goNext = () => {
    if (isLast) { setShowComplete(true); return; }
    setPageIdx(i => i + 1);
    setSelectedAnswer(null);
    setAnsweredCorrectly(null);
  };

  const goPrev = () => {
    if (isFirst) return;
    setPageIdx(i => i - 1);
    setSelectedAnswer(null);
    setAnsweredCorrectly(null);
  };

  const handleAnswer = (optionId: string) => {
    if (alreadyAnswered) return;
    setSelectedAnswer(optionId);
    const correct = page.question!.options.find(o => o.id === optionId)?.isCorrect ?? false;
    setAnsweredCorrectly(correct);
    if (correct) {
      const xpGain = 10;
      setTotalXP(t => t + xpGain);
      setAnsweredPages(s => new Set(Array.from(s).concat(pageIdx)));
    } else {
      setAnsweredPages(s => new Set(Array.from(s).concat(pageIdx)));
    }
  };

  const canGoNext = !hasQuestion || alreadyAnswered;

  if (showComplete) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12 space-y-6">
        <div className="text-8xl">{story.coverEmoji}</div>
        <div>
          <h2 className="text-3xl font-black text-foreground">Story Complete! 🎉</h2>
          <p className="text-muted-foreground mt-2">{story.title}</p>
        </div>
        <div className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-violet-50 border-2 border-violet-200">
          <Zap className="w-6 h-6 text-violet-600" />
          <span className="text-2xl font-black text-violet-700">+{totalXP} XP Earned!</span>
        </div>
        <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-5 max-w-md mx-auto">
          <p className="font-black text-amber-800 mb-1">💛 The Moral</p>
          <p className="text-amber-700 italic text-sm">"{story.moral}"</p>
        </div>
        <a href="/stories" className="btn-primary inline-flex items-center gap-2">
          <BookOpen className="w-4 h-4" />Read Another Story
        </a>
      </motion.div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{story.coverEmoji}</span>
          <div>
            <p className="font-black text-foreground">{story.title}</p>
            <p className="text-xs text-muted-foreground">{story.subject}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {totalXP > 0 && (
            <span className="xp-pill flex items-center gap-1">
              <Zap className="w-3 h-3" />+{totalXP} XP
            </span>
          )}
          <span className="text-xs font-bold text-muted-foreground bg-secondary px-3 py-1.5 rounded-full">
            {pageIdx + 1} / {story.pages.length}
          </span>
        </div>
      </div>

      {/* Progress dots */}
      <div className="flex gap-1.5">
        {story.pages.map((p, i) => (
          <div key={i} className={cn("flex-1 h-1.5 rounded-full transition-all duration-300",
            i < pageIdx ? "bg-violet-500" :
            i === pageIdx ? "bg-violet-400 animate-pulse" :
            "bg-muted")} />
        ))}
      </div>

      {/* Story card */}
      <AnimatePresence mode="wait">
        <motion.div key={pageIdx}
          initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.25 }}
          className="classroom-card">
          <div className="text-center mb-6">
            <span className="text-5xl">{page.emoji}</span>
          </div>
          <p className="text-foreground text-lg leading-relaxed font-medium text-center">{page.text}</p>
        </motion.div>
      </AnimatePresence>

      {/* Question */}
      {hasQuestion && (
        <div className={cn("classroom-card border-2", answeredCorrectly === true ? "border-emerald-300 bg-emerald-50" : answeredCorrectly === false ? "border-rose-300 bg-rose-50" : "border-violet-200")}>
          <p className="font-black text-foreground mb-4">💭 {page.question!.text}</p>
          <div className="space-y-2">
            {page.question!.options.map(opt => {
              const isSelected = selectedAnswer === opt.id;
              const showResult = alreadyAnswered;
              return (
                <button key={opt.id} onClick={() => handleAnswer(opt.id)}
                  disabled={alreadyAnswered}
                  className={cn("w-full text-left px-4 py-3 rounded-xl border-2 font-semibold text-sm transition-all",
                    showResult && opt.isCorrect ? "bg-emerald-100 border-emerald-400 text-emerald-800" :
                    showResult && isSelected && !opt.isCorrect ? "bg-rose-100 border-rose-400 text-rose-700" :
                    isSelected ? "bg-violet-100 border-violet-400 text-violet-800" :
                    "bg-secondary border-transparent hover:border-border text-foreground disabled:cursor-not-allowed")}>
                  <span className="flex items-center gap-2">
                    {showResult && opt.isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                    {opt.text}
                    {showResult && opt.isCorrect && <span className="ml-auto text-xs font-black text-emerald-600">✓ Correct!</span>}
                  </span>
                </button>
              );
            })}
          </div>
          {alreadyAnswered && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              className={cn("mt-4 p-3 rounded-xl text-sm font-bold",
                answeredCorrectly ? "bg-emerald-100 text-emerald-800" : "bg-amber-50 text-amber-800")}>
              {answeredCorrectly ? "🎉 Great answer! +10 XP" : "💡 Good try! Check the correct answer above."}
            </motion.div>
          )}
        </div>
      )}

      {/* Navigation */}
      <div className="flex gap-3">
        <button onClick={goPrev} disabled={isFirst}
          className="btn-secondary flex items-center gap-2 disabled:opacity-40">
          <ChevronLeft className="w-4 h-4" />Previous
        </button>
        <button onClick={goNext} disabled={!canGoNext}
          className="btn-primary flex-1 flex items-center justify-center gap-2 disabled:opacity-40">
          {isLast ? (
            <><Trophy className="w-4 h-4" />Finish Story</>
          ) : (
            <>Next Page <ChevronRight className="w-4 h-4" /></>
          )}
        </button>
      </div>
    </div>
  );
}
