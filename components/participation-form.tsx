"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { recordParticipation } from "@/actions/participation";
import { completeSession } from "@/actions/session";
import { useRouter } from "next/navigation";
import { cn, getInitials } from "@/lib/utils";
import { Loader2, Save, CheckCircle2 } from "lucide-react";

type Student = { id: string; name: string; age: number };

interface ParticipationFormProps {
  sessionId: string;
  students: Student[];
  initialScores: Record<string, number>;
  isCompleted: boolean;
}

const SCORE_LABELS: Record<number, { label: string; color: string }> = {
  1:  { label: "Absent",    color: "bg-gray-100 text-gray-500" },
  2:  { label: "Minimal",   color: "bg-red-100 text-red-600" },
  3:  { label: "Low",       color: "bg-orange-100 text-orange-600" },
  4:  { label: "Below Avg", color: "bg-amber-100 text-amber-700" },
  5:  { label: "Average",   color: "bg-yellow-100 text-yellow-700" },
  6:  { label: "Fair",      color: "bg-lime-100 text-lime-700" },
  7:  { label: "Good",      color: "bg-green-100 text-green-700" },
  8:  { label: "Very Good", color: "bg-teal-100 text-teal-700" },
  9:  { label: "Excellent", color: "bg-cyan-100 text-cyan-700" },
  10: { label: "Perfect",   color: "bg-blue-100 text-blue-700" },
};

export function ParticipationForm({
  sessionId,
  students,
  initialScores,
  isCompleted,
}: ParticipationFormProps) {
  const [scores, setScores] = useState<Record<string, number>>(() => {
    const init: Record<string, number> = {};
    for (const s of students) {
      init[s.id] = initialScores[s.id] ?? 5;
    }
    return init;
  });

  const [isSaving, startSave] = useTransition();
  const [isCompleting, startComplete] = useTransition();
  const router = useRouter();

  const handleSave = () => {
    startSave(async () => {
      const result = await recordParticipation(sessionId, scores);
      if (result.success) {
        toast.success(result.message);
        router.refresh();
      } else {
        toast.error(result.message);
      }
    });
  };

  const handleComplete = () => {
    startComplete(async () => {
      // Save participation first
      await recordParticipation(sessionId, scores);
      const result = await completeSession(sessionId);
      if (result.success) {
        toast.success("Session completed and XP awarded! 🎉");
        router.refresh();
      } else {
        toast.error(result.message);
      }
    });
  };

  const avgScore =
    Object.values(scores).reduce((a, b) => a + b, 0) / students.length;

  return (
    <div className="classroom-card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-bold text-foreground">Participation Scores</h2>
        <div className="text-sm text-muted-foreground">
          Class avg:{" "}
          <span className="font-bold text-foreground">
            {avgScore.toFixed(1)}/10
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {students.map((student) => {
          const score = scores[student.id] ?? 5;
          const meta = SCORE_LABELS[score];

          return (
            <div
              key={student.id}
              className="flex items-center gap-4 p-4 rounded-xl bg-secondary"
            >
              {/* Avatar */}
              <div className="w-10 h-10 rounded-full bg-teal-200 text-teal-800 flex items-center justify-center font-bold text-xs shrink-0">
                {getInitials(student.name)}
              </div>

              {/* Name */}
              <div className="w-28 shrink-0">
                <p className="font-semibold text-sm text-foreground truncate">
                  {student.name}
                </p>
              </div>

              {/* Slider */}
              <div className="flex-1">
                <input
                  type="range"
                  min={1}
                  max={10}
                  step={1}
                  value={score}
                  disabled={isCompleted}
                  onChange={(e) =>
                    setScores((prev) => ({
                      ...prev,
                      [student.id]: Number(e.target.value),
                    }))
                  }
                  className="w-full accent-teal-700 h-2 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
                />
              </div>

              {/* Score badge */}
              <div className="shrink-0 text-right w-24">
                <span
                  className={cn(
                    "text-xs font-bold px-2 py-1 rounded-full",
                    meta.color
                  )}
                >
                  {score} — {meta.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Actions */}
      {!isCompleted && (
        <div className="flex gap-3 mt-6 justify-end">
          <button
            onClick={handleSave}
            disabled={isSaving || isCompleting}
            className="action-btn flex items-center gap-2 px-6 bg-secondary border border-border text-foreground hover:bg-muted disabled:opacity-50"
          >
            {isSaving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {isSaving ? "Saving..." : "Save Draft"}
          </button>

          <button
            onClick={handleComplete}
            disabled={isSaving || isCompleting}
            className="action-btn flex items-center gap-2 px-6 bg-teal-700 hover:bg-teal-800 text-white disabled:opacity-50"
          >
            {isCompleting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <CheckCircle2 className="w-4 h-4" />
            )}
            {isCompleting ? "Completing..." : "Complete Session + Award XP"}
          </button>
        </div>
      )}

      {isCompleted && (
        <div className="mt-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
          <p className="text-emerald-700 font-bold">
            ✓ Session completed. XP has been awarded.
          </p>
        </div>
      )}
    </div>
  );
}
