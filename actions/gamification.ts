"use server";

import { prisma } from "@/lib/prisma";
import {
  triggerWholeClassAnswer,
  triggerSelectedAnswer,
  triggerRolePlayEvaluated,
} from "@/lib/gamification";
import { revalidatePath } from "next/cache";

// ─── WHOLE CLASS ANSWER ────────────────────────────────────────────────────────

export async function awardWholeClassXP(
  sessionId: string,
  classId: string,
  teamId?: string
): Promise<{ success: boolean; xpAwarded: number; message: string }> {
  try {
    // Get all present students for this class today
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const presentStudents = await prisma.attendance.findMany({
      where: {
        student: { classId },
        date: today,
        status: "present",
      },
      select: { studentId: true },
    });

    const studentIds = presentStudents.map((a: { studentId: string }) => a.studentId);

    if (studentIds.length === 0) {
      return { success: false, xpAwarded: 0, message: "No present students found. Mark attendance first." };
    }

    const result = await triggerWholeClassAnswer(studentIds, teamId);

    // Log the activity event
    await prisma.activityEvent.create({
      data: {
        sessionId,
        type: "whole_class",
        studentIds,
        xpAwarded: result.totalXP,
        bonusXP: 0,
      },
    });

    revalidatePath(`/session/${sessionId}/live`);
    return {
      success: true,
      xpAwarded: result.totalXP,
      message: `+${result.totalXP} XP awarded to ${studentIds.length} students!`,
    };
  } catch (error) {
    console.error("awardWholeClassXP error:", error);
    return { success: false, xpAwarded: 0, message: "Failed to award XP." };
  }
}

// ─── SELECTED PIN ANSWER ──────────────────────────────────────────────────────

export async function awardSelectedStudentsXP(
  sessionId: string,
  studentIds: string[],
  teamId?: string
): Promise<{ success: boolean; xpPerStudent: number; hadStreakBonus: boolean; message: string }> {
  try {
    if (studentIds.length === 0) {
      return { success: false, xpPerStudent: 0, hadStreakBonus: false, message: "No students selected." };
    }

    const result = await triggerSelectedAnswer(studentIds, teamId);

    // Log the activity event
    await prisma.activityEvent.create({
      data: {
        sessionId,
        type: "selected_pin",
        studentIds,
        xpAwarded: result.xpPerStudent,
        bonusXP: result.hadStreakBonus ? 5 : 0,
        metadata: { streakBonus: result.hadStreakBonus },
      },
    });

    revalidatePath(`/session/${sessionId}/live`);

    const names = await prisma.student.findMany({
      where: { id: { in: studentIds } },
      select: { name: true },
    });
    const nameList = names.map((s: { name: string }) => s.name.split(" ")[0]).join(", ");

    return {
      success: true,
      xpPerStudent: result.xpPerStudent,
      hadStreakBonus: result.hadStreakBonus,
      message: `+${result.xpPerStudent} XP to ${nameList}${result.hadStreakBonus ? " 🔥 Streak bonus!" : ""}`,
    };
  } catch (error) {
    console.error("awardSelectedStudentsXP error:", error);
    return { success: false, xpPerStudent: 0, hadStreakBonus: false, message: "Failed to award XP." };
  }
}

// ─── ROLE PLAY EVALUATION ─────────────────────────────────────────────────────

export async function evaluateRolePlay(
  sessionId: string,
  studentIds: string[],
  scores: {
    participation: number;
    understanding: number;
    creativity: number;
  },
  teamId?: string
): Promise<{ success: boolean; xpAwarded: number; bonusXP: number; message: string }> {
  try {
    const result = await triggerRolePlayEvaluated(studentIds, scores, teamId);

    await prisma.activityEvent.create({
      data: {
        sessionId,
        type: "role_play",
        studentIds,
        xpAwarded: result.xpAwarded,
        bonusXP: result.bonusXP,
        metadata: { ...scores },
      },
    });

    revalidatePath(`/session/${sessionId}/live`);

    const totalXP = result.xpAwarded + result.bonusXP;
    return {
      success: true,
      xpAwarded: result.xpAwarded,
      bonusXP: result.bonusXP,
      message: `Role play complete! +${totalXP} XP${result.bonusXP > 0 ? ` (includes +${result.bonusXP} bonus!)` : ""}`,
    };
  } catch (error) {
    console.error("evaluateRolePlay error:", error);
    return { success: false, xpAwarded: 0, bonusXP: 0, message: "Failed to evaluate role play." };
  }
}

// ─── SESSION DATA ─────────────────────────────────────────────────────────────

export async function getLiveSessionData(sessionId: string) {
  const session = await prisma.session.findUnique({
    where: { id: sessionId },
    include: {
      class: {
        include: {
          students: {
            include: { reward: true, achievements: true },
            orderBy: { name: "asc" },
          },
        },
      },
      teams: {
        include: {
          members: { include: { student: { include: { reward: true } } } },
        },
        orderBy: { xp: "desc" },
      },
      activityEvents: {
        orderBy: { createdAt: "desc" },
        take: 20,
      },
    },
  });

  return session;
}

export async function getSessionSummary(sessionId: string) {
  const session = await prisma.session.findUnique({
    where: { id: sessionId },
    include: {
      class: { include: { students: { include: { reward: true, achievements: true } } } },
      teams: { include: { members: { include: { student: { include: { reward: true } } } } }, orderBy: { xp: "desc" } },
      activityEvents: true,
    },
  });

  if (!session) return null;

  // Calculate XP earned during this session per student
  const studentXPMap: Record<string, number> = {};
  for (const event of session.activityEvents) {
    for (const studentId of event.studentIds) {
      studentXPMap[studentId] = (studentXPMap[studentId] ?? 0) + event.xpAwarded + event.bonusXP;
    }
  }

  // Top students by XP earned this session
  const topStudents = session.class.students
    .map((s: typeof session.class.students[0]) => ({ ...s, sessionXP: studentXPMap[s.id] ?? 0 }))
    .sort((a: typeof session.class.students[0] & { sessionXP: number }, b: typeof session.class.students[0] & { sessionXP: number }) => b.sessionXP - a.sessionXP)
    .slice(0, 5);

  return { session, topStudents, studentXPMap, totalEvents: session.activityEvents.length };
}
