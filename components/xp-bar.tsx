"use client";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { getLevelInfo } from "@/lib/avatars";

//export { getLevelInfo } from "@/lib/avatars";

interface XPBarProps {
  xp: number;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
  animated?: boolean;
  className?: string;
}

export function XPBar({ xp, showLabel = true, size = "md", animated = true, className }: XPBarProps) {
  const { level, currentLevelXP, nextLevelXP, progress, avatar } = getLevelInfo(xp);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setWidth(progress), animated ? 120 : 0);
    return () => clearTimeout(t);
  }, [progress, animated]);

  const heights = { sm: "h-2", md: "h-3", lg: "h-4" };

  return (
    <div className={cn("space-y-1.5", className)}>
      {showLabel && (
        <div className="flex items-center justify-between text-xs font-bold">
          <span className="flex items-center gap-1">
            <span>{avatar.emoji}</span>
            <span className="text-violet-700">Lv.{level} {avatar.name}</span>
          </span>
          <span className="text-muted-foreground">{currentLevelXP}/{nextLevelXP} XP</span>
        </div>
      )}
      <div className={cn("xp-bar-track", heights[size])}>
        <div
          className={cn("xp-bar-fill bg-gradient-to-r", avatar.gradient)}
          style={{
            width: `${width}%`,
            transition: animated ? "width 0.8s cubic-bezier(0.34,1.2,0.64,1)" : "none",
          }}
        />
        <div className="xp-bar-shimmer" />
      </div>
    </div>
  );
}

export function LevelBadge({ xp, size = "sm" }: { xp: number; size?: "sm" | "md" | "lg" }) {
  const { level, avatar } = getLevelInfo(xp);
  const sizes = { sm: "text-xs px-2 py-0.5", md: "text-sm px-3 py-1", lg: "text-base px-4 py-1.5" };
  return (
    <span className={cn(
      "inline-flex items-center gap-1 rounded-full font-black text-white",
      `bg-gradient-to-r ${avatar.gradient}`,
      sizes[size]
    )}>
      {avatar.emoji} Lv.{level}
    </span>
  );
}

export function AvatarDisplay({ xp, size = "md" }: { xp: number; size?: "sm" | "md" | "lg" }) {
  const { avatar, level } = getLevelInfo(xp);
  const sizes = { sm: "w-8 h-8 text-xl", md: "w-12 h-12 text-3xl", lg: "w-16 h-16 text-5xl" };
  return (
    <div className={cn(
      "rounded-2xl flex flex-col items-center justify-center bg-gradient-to-br text-white shadow-sm",
      avatar.gradient, sizes[size]
    )}>
      <span>{avatar.emoji}</span>
    </div>
  );
}
