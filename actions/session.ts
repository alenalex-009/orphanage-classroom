"use server";

import { prisma } from "@/lib/prisma";
import { triggerSessionCompleted } from "@/lib/gamification";
import { revalidatePath } from "next/cache";
import { getTodayDate } from "@/lib/utils";

export async function createSession(
  classId: string,
  topic: string,
  mode: "class" | "team" = "class",
  teamSize: number = 2
): Promise<{ success: boolean; sessionId?: string; message: string }> {
  try {
    const session = await prisma.session.create({
      data: { classId, topic, date: getTodayDate(), mode, teamSize },
    });
    revalidatePath("/session");
    return { success: true, sessionId: session.id, message: "Session created!" };
  } catch (error) {
    console.error("createSession error:", error);
    return { success: false, message: "Failed to create session." };
  }
}

export async function completeSession(
  sessionId: string
): Promise<{ success: boolean; message: string }> {
  try {
    const session = await prisma.session.update({
      where: { id: sessionId },
      data: { completed: true },
      include: { participation: true },
    });

    // Fire gamification for all participants
    const studentIds = session.participation.map((p) => p.studentId);
    for (const id of studentIds) {
      await triggerSessionCompleted(id);
    }

    revalidatePath("/session");
    revalidatePath(`/session/${sessionId}`);
    return { success: true, message: "Session completed!" };
  } catch (error) {
    console.error("completeSession error:", error);
    return { success: false, message: "Failed to complete session." };
  }
}

export async function getTodaySessions(classId: string) {
  return prisma.session.findMany({
    where: { classId, date: getTodayDate() },
    include: {
      participation: { include: { student: true } },
      class: true,
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getSession(sessionId: string) {
  return prisma.session.findUnique({
    where: { id: sessionId },
    include: {
      class: { include: { students: true } },
      participation: { include: { student: true } },
    },
  });
}

export async function getAllSessionsByClass(classId: string) {
  return prisma.session.findMany({
    where: { classId },
    include: { participation: true },
    orderBy: { date: "desc" },
    take: 30,
  });
}