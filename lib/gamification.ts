/**
 * GAMIFICATION ENGINE — ISOLATED LAYER
 *
 * Rules:
 * - This module ONLY writes to: rewards, achievements, teams (xp field only)
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
  WHOLE_CLASS_ANSWER: 10,
  SELECTED_ANSWER_BASE: 15,
  SELECTED_ANSWER_STREAK_BONUS: 5,
  ROLE_PLAY_BASE: 20,
  ROLE_PLAY_PERFORMANCE_BONUS: 10,
  ROLE_PLAY_TEAM_BONUS: 5,
} as const;

const THRESHOLDS = {
  STREAK_ACHIEVEMENT: 3,
  SESSION_ACHIEVEMENT: 5,
  PERFECT_WEEK: 7,
  QUESTION_MASTER: 10,   // answered 10 questions
  ROLE_PLAY_STAR: 3,     // 3 role plays with good performance
} as const;

// ─── ACHIEVEMENT DEFINITIONS ──────────────────────────────────────────────────
const ACHIEVEMENTS = {
  consistent_learner: { type: "consistent_learner", label: "Consistent Learner", icon: "🔥" },
  active_student:     { type: "active_student",     label: "Active Student",     icon: "⭐" },
  first_session:      { type: "first_session",      label: "First Steps",        icon: "🎯" },
  perfect_week:       { type: "perfect_week",       label: "Perfect Week",       icon: "🏆" },
  question_master:    { type: "question_master",    label: "Question Master",    icon: "🧠" },
  role_play_star:     { type: "role_play_star",     label: "Role Play Star",     icon: "🎭" },
  team_player:        { type: "team_player",        label: "Team Player",        icon: "🤝" },
} as const;

type AchievementKey = keyof typeof ACHIEVEMENTS;

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function calculateLevel(xp: number): number {
  return Math.floor(xp / 100);
}

function calculateParticipationXP(score: number): number {
  const normalized = (score - 1) / 9;
  return Math.round(XP.PARTICIPATION_MIN + normalized * (XP.PARTICIPATION_MAX - XP.PARTICIPATION_MIN));
}

async function addXP(studentId: string, amount: number): Promise<number> {
  const existing = await prisma.reward.findUnique({ where: { studentId } });
  if (existing) {
    const newXP = existing.xp + amount;
    await prisma.reward.update({
      where: { studentId },
      data: { xp: newXP, level: calculateLevel(newXP) },
    });
    return newXP;
  } else {
    await prisma.reward.create({
      data: { studentId, xp: amount, level: calculateLevel(amount), streak: 0 },
    });
    return amount;
  }
}

async function addTeamXP(teamId: string, amount: number): Promise<void> {
  await prisma.team.update({
    where: { id: teamId },
    data: { xp: { increment: amount } },
  });
}

async function grantAchievement(studentId: string, type: AchievementKey): Promise<void> {
  const achievement = ACHIEVEMENTS[type];
  try {
    await prisma.achievement.upsert({
      where: { studentId_type: { studentId, type } },
      update: {},
      create: { studentId, type: achievement.type, label: achievement.label, icon: achievement.icon },
    });
  } catch { /* already exists — skip */ }
}

async function getStudentStreak(studentId: string): Promise<number> {
  const reward = await prisma.reward.findUnique({ where: { studentId } });
  return reward?.streak ?? 0;
}

// ─── EXISTING TRIGGERS ────────────────────────────────────────────────────────

export async function triggerAttendanceMarked(studentId: string): Promise<void> {
  try {
    await addXP(studentId, XP.ATTENDANCE);
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
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const weekAttendance = await prisma.attendance.count({
      where: { studentId, status: "present", date: { gte: weekAgo } },
    });
    if (weekAttendance >= THRESHOLDS.PERFECT_WEEK) {
      await grantAchievement(studentId, "perfect_week");
    }
  } catch (error) {
    console.error("[Gamification] triggerAttendanceMarked failed:", error);
  }
}

export async function triggerSessionCompleted(studentId: string): Promise<void> {
  try {
    await addXP(studentId, XP.SESSION_COMPLETED);
    const sessionCount = await prisma.participation.count({ where: { studentId } });
    if (sessionCount === 1) await grantAchievement(studentId, "first_session");
    if (sessionCount >= THRESHOLDS.SESSION_ACHIEVEMENT) await grantAchievement(studentId, "active_student");
  } catch (error) {
    console.error("[Gamification] triggerSessionCompleted failed:", error);
  }
}

export async function triggerParticipationRecorded(studentId: string, score: number): Promise<void> {
  try {
    await addXP(studentId, calculateParticipationXP(score));
  } catch (error) {
    console.error("[Gamification] triggerParticipationRecorded failed:", error);
  }
}

// ─── NEW GAMIFICATION TRIGGERS ────────────────────────────────────────────────

/**
 * Whole class answers a question together — everyone gets XP
 */
export async function triggerWholeClassAnswer(
  studentIds: string[],
  teamId?: string
): Promise<{ totalXP: number }> {
  try {
    for (const studentId of studentIds) {
      await addXP(studentId, XP.WHOLE_CLASS_ANSWER);
    }
    if (teamId) {
      await addTeamXP(teamId, XP.WHOLE_CLASS_ANSWER * studentIds.length);
    }
    return { totalXP: XP.WHOLE_CLASS_ANSWER };
  } catch (error) {
    console.error("[Gamification] triggerWholeClassAnswer failed:", error);
    return { totalXP: 0 };
  }
}

/**
 * Selected student(s) answer via PIN — individual reward with streak bonus
 */
export async function triggerSelectedAnswer(
  studentIds: string[],
  teamId?: string
): Promise<{ xpPerStudent: number; hadStreakBonus: boolean }> {
  try {
    let totalXPPerStudent = XP.SELECTED_ANSWER_BASE;
    let hadStreakBonus = false;

    for (const studentId of studentIds) {
      const streak = await getStudentStreak(studentId);
      const bonus = streak >= 3 ? XP.SELECTED_ANSWER_STREAK_BONUS : 0;
      if (bonus > 0) hadStreakBonus = true;
      const xp = XP.SELECTED_ANSWER_BASE + bonus;
      totalXPPerStudent = xp;
      await addXP(studentId, xp);

      // Check question master achievement
      const eventCount = await prisma.activityEvent.count({
        where: {
          studentIds: { has: studentId },
          type: "selected_pin",
        },
      });
      if (eventCount >= THRESHOLDS.QUESTION_MASTER) {
        await grantAchievement(studentId, "question_master");
      }
    }

    if (teamId) {
      await addTeamXP(teamId, totalXPPerStudent * studentIds.length);
    }

    return { xpPerStudent: totalXPPerStudent, hadStreakBonus };
  } catch (error) {
    console.error("[Gamification] triggerSelectedAnswer failed:", error);
    return { xpPerStudent: 0, hadStreakBonus: false };
  }
}

/**
 * Teacher evaluates a role play / skit performance
 */
export async function triggerRolePlayEvaluated(
  studentIds: string[],
  scores: {
    participation: number; // 1-10
    understanding: number; // 1-10
    creativity: number;    // 1-10
  },
  teamId?: string
): Promise<{ xpAwarded: number; bonusXP: number }> {
  try {
    const avgScore = (scores.participation + scores.understanding + scores.creativity) / 3;
    const bonusXP = avgScore >= 7 ? XP.ROLE_PLAY_PERFORMANCE_BONUS : 0;
    const teamBonus = teamId ? XP.ROLE_PLAY_TEAM_BONUS : 0;
    const totalXP = XP.ROLE_PLAY_BASE + bonusXP + teamBonus;

    for (const studentId of studentIds) {
      await addXP(studentId, totalXP);

      // Check role play star achievement
      const rolePlayCount = await prisma.activityEvent.count({
        where: {
          studentIds: { has: studentId },
          type: "role_play",
          bonusXP: { gt: 0 },
        },
      });
      if (rolePlayCount >= THRESHOLDS.ROLE_PLAY_STAR) {
        await grantAchievement(studentId, "role_play_star");
      }
    }

    if (teamId) {
      await addTeamXP(teamId, totalXP * studentIds.length);
      // Team player achievement for all members
      for (const studentId of studentIds) {
        await grantAchievement(studentId, "team_player");
      }
    }

    return { xpAwarded: XP.ROLE_PLAY_BASE, bonusXP: bonusXP + teamBonus };
  } catch (error) {
    console.error("[Gamification] triggerRolePlayEvaluated failed:", error);
    return { xpAwarded: 0, bonusXP: 0 };
  }
}

