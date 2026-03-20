import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatDateShort(date: Date | string): string {
  return new Date(date).toLocaleDateString("en-IN", {
    month: "short",
    day: "numeric",
  });
}

export function getTodayDate(): Date {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return now;
}

export function calculateAttendancePercentage(
  present: number,
  total: number
): number {
  if (total === 0) return 0;
  return Math.round((present / total) * 100);
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function getLevelColor(level: number): string {
  if (level >= 10) return "text-purple-600 bg-purple-100";
  if (level >= 7) return "text-blue-600 bg-blue-100";
  if (level >= 5) return "text-teal-600 bg-teal-100";
  if (level >= 3) return "text-amber-600 bg-amber-100";
  return "text-gray-600 bg-gray-100";
}

export function getXPForNextLevel(currentXP: number): {
  current: number;
  next: number;
  progress: number;
} {
  const level = Math.floor(currentXP / 100);
  const current = currentXP - level * 100;
  const next = 100;
  const progress = Math.round((current / next) * 100);
  return { current, next, progress };
}
