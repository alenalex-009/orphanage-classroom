"use server";

import { prisma } from "@/lib/prisma";
import { triggerParticipationRecorded } from "@/lib/gamification";
import { revalidatePath } from "next/cache";

export async function recordParticipation(
  sessionId: string,
  scores: Record<string, number>
): Promise<{ success: boolean; message: string }> {
  try {
    // Upsert participation for each student
    for (const [studentId, score] of Object.entries(scores)) {
      await prisma.participation.upsert({
        where: { studentId_sessionId: { studentId, sessionId } },
        create: { studentId, sessionId, score },
        update: { score },
      });
      await triggerParticipationRecorded(studentId, score);
    }

    revalidatePath(`/session/${sessionId}`);
    revalidatePath("/students");
    return { success: true, message: `Participation recorded for ${Object.keys(scores).length} students` };
  } catch (error) {
    console.error("recordParticipation error:", error);
    return { success: false, message: "Failed to record participation." };
  }
}

export async function getSessionParticipation(sessionId: string) {
  return prisma.participation.findMany({
    where: { sessionId },
    include: { student: true },
  });
}
