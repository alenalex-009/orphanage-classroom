import { cn } from "@/lib/utils";

const ACHIEVEMENT_META: Record<string, { color: string; bg: string; border: string; glow: string }> = {
  consistent_learner: { color:"text-orange-700", bg:"bg-orange-50", border:"border-orange-200", glow:"shadow-orange-200" },
  active_student:     { color:"text-amber-700",  bg:"bg-amber-50",  border:"border-amber-200",  glow:"shadow-amber-200"  },
  first_session:      { color:"text-teal-700",   bg:"bg-teal-50",   border:"border-teal-200",   glow:"shadow-teal-200"   },
  perfect_week:       { color:"text-violet-700", bg:"bg-violet-50", border:"border-violet-200", glow:"shadow-violet-200" },
  question_master:    { color:"text-indigo-700", bg:"bg-indigo-50", border:"border-indigo-200", glow:"shadow-indigo-200" },
  role_play_star:     { color:"text-pink-700",   bg:"bg-pink-50",   border:"border-pink-200",   glow:"shadow-pink-200"   },
  team_player:        { color:"text-emerald-700",bg:"bg-emerald-50",border:"border-emerald-200",glow:"shadow-emerald-200" },
};

interface AchievementBadgeProps {
  type: string;
  icon: string;
  label: string;
  size?: "sm" | "md";
}

export function AchievementBadge({ type, icon, label, size = "sm" }: AchievementBadgeProps) {
  const meta = ACHIEVEMENT_META[type] ?? { color:"text-gray-700", bg:"bg-gray-50", border:"border-gray-200", glow:"shadow-gray-100" };
  if (size === "md") return (
    <div className={cn("flex flex-col items-center gap-2 p-4 rounded-2xl border-2", meta.bg, meta.border, "shadow-sm")}>
      <span className="text-4xl">{icon}</span>
      <span className={cn("text-xs font-black text-center leading-tight", meta.color)}>{label}</span>
    </div>
  );
  return (
    <span title={label}
      className={cn("inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border font-bold text-xs", meta.bg, meta.border, meta.color)}>
      <span className="text-sm">{icon}</span>{label}
    </span>
  );
}

export function AchievementGrid({ achievements }: { achievements: { type: string; icon: string; label: string }[] }) {
  if (achievements.length === 0) return (
    <div className="text-center py-8 text-muted-foreground text-sm">No achievements yet — keep going! 🚀</div>
  );
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
      {achievements.map((a, i) => <AchievementBadge key={i} type={a.type} icon={a.icon} label={a.label} size="md" />)}
    </div>
  );
}

export function StreakBadge({ streak }: { streak: number }) {
  if (streak === 0) return null;
  const flames = streak >= 10 ? "🔥🔥🔥" : streak >= 5 ? "🔥🔥" : "🔥";
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-black bg-orange-100 text-orange-700 border border-orange-200">
      {flames} {streak} day streak
    </span>
  );
}
