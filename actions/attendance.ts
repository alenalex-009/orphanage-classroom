"use server";

import { prisma } from "@/lib/prisma";
import { triggerAttendanceMarked } from "@/lib/gamification";
import { revalidatePath } from "next/cache";
import { getTodayDate } from "@/lib/utils";

export async function markAttendance(
  classId: string,
  presentIds: string[],
  absentIds: string[]
): Promise<{ success: boolean; message: string }> {
  try {
    const today = getTodayDate();

    // Delete any existing attendance for today (allow re-submission)
    const allIds = [...presentIds, ...absentIds];
    await prisma.attendance.deleteMany({
      where: { studentId: { in: allIds }, date: today },
    });

    // Create attendance records
    const records = [
      ...presentIds.map((id) => ({ studentId: id, date: today, status: "present" })),
      ...absentIds.map((id) => ({ studentId: id, date: today, status: "absent" })),
    ];

    await prisma.attendance.createMany({ data: records });

    // Fire gamification for present students (non-blocking)
    for (const id of presentIds) {
      await triggerAttendanceMarked(id);
    }

    revalidatePath("/");
    revalidatePath("/attendance");
    revalidatePath(`/students`);

    return {
      success: true,
      message: `Attendance saved: ${presentIds.length} present, ${absentIds.length} absent`,
    };
  } catch (error) {
    console.error("markAttendance error:", error);
    return { success: false, message: "Failed to save attendance. Please try again." };
  }
}

export async function getAttendanceByDate(classId: string, date?: Date) {
  const targetDate = date ?? getTodayDate();
  return prisma.attendance.findMany({
    where: {
      student: { classId },
      date: targetDate,
    },
    include: { student: true },
  });
}

export async function getStudentAttendanceSummary(studentId: string) {
  const total = await prisma.attendance.count({ where: { studentId } });
  const present = await prisma.attendance.count({
    where: { studentId, status: "present" },
  });
  const recent = await prisma.attendance.findMany({
    where: { studentId },
    orderBy: { date: "desc" },
    take: 14,
  });
  return { total, present, percentage: total > 0 ? Math.round((present / total) * 100) : 0, recent };
}
