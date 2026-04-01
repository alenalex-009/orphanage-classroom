"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createStudent(data: {
  name: string;
  age: number;
  classId: string;
}): Promise<{ success: boolean; message: string }> {
  try {
    await prisma.student.create({ data });
    revalidatePath("/students");
    revalidatePath("/admin");
    revalidatePath("/attendance");
    return { success: true, message: `${data.name} added successfully!` };
  } catch (error) {
    console.error("createStudent error:", error);
    return { success: false, message: "Failed to add student." };
  }
}

export async function updateStudent(
  id: string,
  data: { name?: string; age?: number; classId?: string }
): Promise<{ success: boolean; message: string }> {
  try {
    await prisma.student.update({ where: { id }, data });
    revalidatePath("/students");
    revalidatePath("/admin");
    return { success: true, message: "Student updated!" };
  } catch (error) {
    console.error("updateStudent error:", error);
    return { success: false, message: "Failed to update student." };
  }
}

export async function deleteStudent(
  id: string
): Promise<{ success: boolean; message: string }> {
  try {
    await prisma.student.delete({ where: { id } });
    revalidatePath("/students");
    revalidatePath("/admin");
    return { success: true, message: "Student removed." };
  } catch (error) {
    console.error("deleteStudent error:", error);
    return { success: false, message: "Failed to delete student." };
  }
}

export async function getStudentProfile(studentId: string) {
  const student = await prisma.student.findUnique({
    where: { id: studentId },
    include: {
      class: true,
      reward: true,
      achievements: { orderBy: { date: "desc" } },
      attendance: { orderBy: { date: "desc" }, take: 30 },
      participation: {
        include: { session: true },
        orderBy: { createdAt: "desc" },
        take: 10,
      },
    },
  });

  if (!student) return null;

  const totalAttendance = student.attendance.length;
  const presentCount = student.attendance.filter((a: { status: string }) => a.status === "present").length;
  const attendancePct =
    totalAttendance > 0 ? Math.round((presentCount / totalAttendance) * 100) : 0;

  const avgParticipation =
    student.participation.length > 0
      ? Math.round(
          student.participation.reduce((sum: number, p: { score: number }) => sum + p.score, 0) /
            student.participation.length
        )
      : 0;

  return { ...student, attendancePct, avgParticipation };
}

export async function getAllStudents(classId?: string) {
  return prisma.student.findMany({
    where: classId ? { classId } : undefined,
    include: {
  class: true,
  reward: true,
  achievements: true,
  attendance: {
    select: { status: true }   // only what you need
  },
  participation: {
    select: { score: true }    // only what you need
  }
},
    orderBy: { name: "asc" },
  });
}

export async function createClass(name: string): Promise<{ success: boolean; message: string }> {
  try {
    await prisma.class.create({ data: { name } });
    revalidatePath("/admin");
    return { success: true, message: `Class "${name}" created!` };
  } catch (error) {
    console.error("createClass error:", error);
    return { success: false, message: "Failed to create class." };
  }
}

export async function getAllClasses() {
  return prisma.class.findMany({
    include: { _count: { select: { students: true, sessions: true } } },
    orderBy: { name: "asc" },
  });
}
