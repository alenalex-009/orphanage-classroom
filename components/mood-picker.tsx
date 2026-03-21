"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { recordMood } from "@/actions/mood";
import { useRouter } from "next/navigation";
import { Loader2, Save } from "lucide-react";
import { cn } from "@/lib/utils";

const MOODS = [
  { key: "happyCount",   emoji: "😊", label: "Happy",   color: "bg-yellow-50 border-yellow-300 text-yellow-800" },
  { key: "neutralCount", emoji: "😐", label: "Neutral",  color: "bg-gray-50 border-gray-300 text-gray-700" },
  { key: "sadCount",     emoji: "😢", label: "Sad",      color: "bg-blue-50 border-blue-300 text-blue-700" },
  { key: "angryCount",   emoji: "😠", label: "Angry",    color: "bg-red-50 border-red-300 text-red-700" },
] as const;

type MoodKey = typeof MOODS[number]["key"];

interface MoodPickerProps {
  classId: string;
  className: string;
  existing: {
    happyCount: number;
    neutralCount: number;
    sadCount: number;
    angryCount: number;
  } | null;
}

export function MoodPicker({ classId, className, existing }: MoodPickerProps) {
  const [counts, setCounts] = useState({
    happyCount: existing?.happyCount ?? 0,
    neutralCount: existing?.neutralCount ?? 0,
    sadCount: existing?.sadCount ?? 0,
    angryCount: existing?.angryCount ?? 0,
  });

  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const adjust = (key: MoodKey, delta: number) => {
    setCounts((prev) => ({
      ...prev,
      [key]: Math.max(0, prev[key] + delta),
    }));
  };

  const total = Object.values(counts).reduce((a, b) => a + b, 0);

  const handleSave = () => {
    startTransition(async () => {
      const result = await recordMood(classId, counts);
      if (result.success) {
        toast.success(`Mood recorded for ${className}!`);
        router.refresh();
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <div className="classroom-card">
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-bold text-foreground">{className}</h2>
        {existing && (
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-1 rounded-full">
            ✓ Already recorded today
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {MOODS.map((mood) => (
          <div
            key={mood.key}
            className={cn(
              "flex flex-col items-center gap-2 p-4 rounded-2xl border-2",
              mood.color
            )}
          >
            <span className="text-4xl">{mood.emoji}</span>
            <p className="font-bold text-sm">{mood.label}</p>
            <p className="text-2xl font-extrabold">{counts[mood.key]}</p>

            {/* +/- controls */}
            <div className="flex gap-2">
              <button
                onClick={() => adjust(mood.key, -1)}
                className="w-8 h-8 rounded-lg bg-white/70 hover:bg-white font-bold text-lg transition-colors flex items-center justify-center border border-current/20"
              >
                −
              </button>
              <button
                onClick={() => adjust(mood.key, 1)}
                className="w-8 h-8 rounded-lg bg-white/70 hover:bg-white font-bold text-lg transition-colors flex items-center justify-center border border-current/20"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mt-4">
        <p className="text-sm text-muted-foreground">
          Total counted: <span className="font-bold text-foreground">{total}</span> students
        </p>
        <button
          onClick={handleSave}
          disabled={isPending || total === 0}
          className="action-btn flex items-center gap-2 px-6 bg-teal-700 hover:bg-teal-800 text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          {isPending ? "Saving..." : "Save Mood"}
        </button>
      </div>
    </div>
  );
}
