"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getTodayDate } from "@/lib/utils";

export async function recordMood(
  classId: string,
  counts: {
    happyCount: number;
    neutralCount: number;
    sadCount: number;
    angryCount: number;
  }
): Promise<{ success: boolean; message: string }> {
  try {
    await prisma.moodLog.upsert({
      where: { classId_date: { classId, date: getTodayDate() } },
      create: { classId, date: getTodayDate(), ...counts },
      update: counts,
    });

    revalidatePath("/mood");
    revalidatePath("/");
    return { success: true, message: "Mood recorded!" };
  } catch (error) {
    console.error("recordMood error:", error);
    return { success: false, message: "Failed to record mood." };
  }
}

export async function getTodayMood(classId: string) {
  return prisma.moodLog.findUnique({
    where: { classId_date: { classId, date: getTodayDate() } },
  });
}

export async function getMoodHistory(classId: string, days: number = 14) {
  const since = new Date();
  since.setDate(since.getDate() - days);
  return prisma.moodLog.findMany({
    where: { classId, date: { gte: since } },
    orderBy: { date: "desc" },
  });
}
