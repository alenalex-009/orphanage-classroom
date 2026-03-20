/**
 * GAMIFICATION ENGINE — ISOLATED LAYER
 *
 * Rules:
 * - This module ONLY writes to: rewards, achievements
 * - This module NEVER touches: students, attendance, sessions, participation, classes
 * - If this file is deleted, all core features still work
 * - All functions are called AFTER core data is already saved
 */

import { prisma } from "@/lib/prisma";

// ─── XP CONSTANTS ─────────────────────────────────────────────────────────────
const XP = {
  ATTENDANCE: 10,
  SESSION_COMPLETED: 20,
  PARTICIPATION_MIN: 5,
  PARTICIPATION_MAX: 15,
} as const;

const THRESHOLDS = {
  STREAK_ACHIEVEMENT: 3,
  SESSION_ACHIEVEMENT: 5,
  PERFECT_WEEK: 7,
} as const;

// ─── ACHIEVEMENT DEFINITIONS ──────────────────────────────────────────────────
const ACHIEVEMENTS = {
  consistent_learner: {
    type: "consistent_learner",
    label: "Consistent Learner",
    icon: "🔥",
  },
  active_student: {
    type: "active_student",
    label: "Active Student",
    icon: "⭐",
  },
  first_session: {
    type: "first_session",
    label: "First Steps",
    icon: "🎯",
  },
  perfect_week: {
    type: "perfect_week",
    label: "Perfect Week",
    icon: "🏆",
  },
} as const;

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function calculateLevel(xp: number): number {
  return Math.floor(xp / 100);
}

function calculateParticipationXP(score: number): number {
  // score is 1-10, maps to XP_MIN to XP_MAX
  const normalized = (score - 1) / 9;
  return Math.round(
    XP.PARTICIPATION_MIN +
      normalized * (XP.PARTICIPATION_MAX - XP.PARTICIPATION_MIN)
  );
}

async function addXP(studentId: string, amount: number): Promise<void> {
  const existing = await prisma.reward.findUnique({ where: { studentId } });

  if (existing) {
    const newXP = existing.xp + amount;
    await prisma.reward.update({
      where: { studentId },
      data: {
        xp: newXP,
        level: calculateLevel(newXP),
      },
    });
  } else {
    await prisma.reward.create({
      data: {
        studentId,
        xp: amount,
        level: calculateLevel(amount),
        streak: 0,
      },
    });
  }
}

async function grantAchievement(
  studentId: string,
  type: keyof typeof ACHIEVEMENTS
): Promise<void> {
  const achievement = ACHIEVEMENTS[type];
  try {
    await prisma.achievement.upsert({
      where: { studentId_type: { studentId, type } },
      update: {},
      create: {
        studentId,
        type: achievement.type,
        label: achievement.label,
        icon: achievement.icon,
      },
    });
  } catch {
    // Achievement already exists — silently skip
  }
}

// ─── EVENT TRIGGERS (called from server actions) ───────────────────────────────

export async function triggerAttendanceMarked(studentId: string): Promise<void> {
  try {
    // Award XP
    await addXP(studentId, XP.ATTENDANCE);

    // Update streak
    const recentPresent = await prisma.attendance.findMany({
      where: { studentId, status: "present" },
      orderBy: { date: "desc" },
      take: THRESHOLDS.STREAK_ACHIEVEMENT,
    });

    if (recentPresent.length >= THRESHOLDS.STREAK_ACHIEVEMENT) {
      await prisma.reward.upsert({
        where: { studentId },
        create: { studentId, xp: 0, level: 0, streak: 1 },
        update: { streak: { increment: 1 } },
      });
      await grantAchievement(studentId, "consistent_learner");
    }

    // Perfect week check
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const weekAttendance = await prisma.attendance.count({
      where: { studentId, status: "present", date: { gte: weekAgo } },
    });
    if (weekAttendance >= THRESHOLDS.PERFECT_WEEK) {
      await grantAchievement(studentId, "perfect_week");
    }
  } catch (error) {
    // Gamification errors must never break core functionality
    console.error("[Gamification] triggerAttendanceMarked failed:", error);
  }
}

export async function triggerSessionCompleted(studentId: string): Promise<void> {
  try {
    await addXP(studentId, XP.SESSION_COMPLETED);

    const sessionCount = await prisma.participation.count({
      where: { studentId },
    });

    if (sessionCount === 1) {
      await grantAchievement(studentId, "first_session");
    }

    if (sessionCount >= THRESHOLDS.SESSION_ACHIEVEMENT) {
      await grantAchievement(studentId, "active_student");
    }
  } catch (error) {
    console.error("[Gamification] triggerSessionCompleted failed:", error);
  }
}

export async function triggerParticipationRecorded(
  studentId: string,
  score: number
): Promise<void> {
  try {
    const xp = calculateParticipationXP(score);
    await addXP(studentId, xp);
  } catch (error) {
    console.error("[Gamification] triggerParticipationRecorded failed:", error);
  }
}
