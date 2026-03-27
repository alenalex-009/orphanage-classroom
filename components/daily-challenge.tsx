"use client";
import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, CheckCircle2, Star, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Question } from "@/lib/question-bank";
import { awardWholeClassXP } from "@/actions/gamification";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface DailyChallengeProps {
  question: Question;
  topic: string;
  sessionId?: string;
  classId?: string;
  alreadyCompleted?: boolean;
}

export function DailyChallenge({
  question,
  topic,
  sessionId,
  classId,
  alreadyCompleted = false,
}: DailyChallengeProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [completed, setCompleted] = useState(alreadyCompleted);
  const [isPending, start] = useTransition();
  const router = useRouter();

  const handleAnswer = (optionId: string) => {
    if (revealed || completed) return;
    setSelected(optionId);
    setRevealed(true);
    const isCorrect = question.options?.find((o) => o.id === optionId)?.isCorrect ?? false;
    if (isCorrect) {
      setCompleted(true);
      if (sessionId && classId) {
        start(async () => {
          await awardWholeClassXP(sessionId, classId);
          toast.success("🎉 Daily challenge complete! Class earned bonus XP!");
          router.refresh();
        });
      }
    }
  };

  if (completed) {
    return (
      <motion.div
        initial={{ scale: 0.97, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="classroom-card border-2 border-emerald-200 bg-emerald-50"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-black text-emerald-800">Daily Challenge Complete! 🎉</p>
            <p className="text-xs text-emerald-600 mt-0.5">Come back tomorrow for a new challenge</p>
          </div>
          <div className="ml-auto flex items-center gap-1.5 bg-emerald-100 border border-emerald-200 rounded-full px-3 py-1.5">
            <Star className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-xs font-black text-emerald-700">+10 XP Earned</span>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="classroom-card border-2 border-violet-200"
      style={{ background: "linear-gradient(135deg, #faf5ff, #f5f3ff)" }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-violet-600 flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="font-black text-violet-900 text-sm">Daily Challenge</p>
            <p className="text-[11px] text-violet-500 font-semibold capitalize">{topic}</p>
          </div>
        </div>
        <span className="text-xs font-black text-violet-600 bg-violet-100 border border-violet-200 px-2.5 py-1 rounded-full">
          ⚡ +10 XP for class
        </span>
      </div>

      {/* Question */}
      <p className="font-bold text-foreground mb-4 text-sm">{question.title}</p>

      {/* Options */}
      {question.type !== "roleplay" && question.options && (
        <div className="space-y-2">
          {question.options.map((opt) => {
            const isSelected = selected === opt.id;
            const showResult = revealed;
            return (
              <button
                key={opt.id}
                onClick={() => handleAnswer(opt.id)}
                disabled={revealed || isPending}
                className={cn(
                  "w-full text-left px-4 py-2.5 rounded-xl border-2 font-semibold text-sm transition-all active:scale-[0.99]",
                  showResult && opt.isCorrect
                    ? "bg-emerald-100 border-emerald-400 text-emerald-800"
                    : showResult && isSelected && !opt.isCorrect
                    ? "bg-rose-100 border-rose-400 text-rose-700"
                    : isSelected
                    ? "bg-violet-100 border-violet-400 text-violet-800"
                    : "bg-white border-border text-foreground hover:border-violet-300 hover:bg-violet-50 disabled:cursor-not-allowed"
                )}
              >
                <span className="flex items-center gap-2">
                  {showResult && opt.isCorrect && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  )}
                  {opt.text}
                  {showResult && opt.isCorrect && (
                    <span className="ml-auto text-xs font-black text-emerald-600">Correct!</span>
                  )}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {question.type === "roleplay" && (
        <div className="bg-violet-50 border-2 border-violet-200 rounded-xl p-4">
          <p className="text-xs font-black text-violet-700 mb-2">🎭 Today's Role Play</p>
          <p className="text-sm text-violet-800">{question.prompt}</p>
          {sessionId && classId && (
            <button
              onClick={() => { setCompleted(true); }}
              className="mt-3 btn-primary text-xs"
            >
              Award XP for Role Play
            </button>
          )}
        </div>
      )}

      <AnimatePresence>
        {revealed && (
          <motion.p
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "mt-3 text-xs font-bold rounded-lg px-3 py-2",
              selected && question.options?.find((o) => o.id === selected)?.isCorrect
                ? "bg-emerald-100 text-emerald-700"
                : "bg-amber-50 text-amber-700"
            )}
          >
            {selected && question.options?.find((o) => o.id === selected)?.isCorrect
              ? "🎉 Correct! Well done!"
              : "💡 Good try! Check the correct answer above."}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
