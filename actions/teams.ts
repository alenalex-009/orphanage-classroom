"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const TEAM_CONFIGS = [
  { name: "Team A", color: "teal" },
  { name: "Team B", color: "amber" },
  { name: "Team C", color: "purple" },
  { name: "Team D", color: "coral" },
];

/**
 * Auto-assign students into teams for a session.
 * Shuffles students randomly then distributes evenly.
 */
export async function createTeams(
  sessionId: string,
  studentIds: string[],
  teamCount: number
): Promise<{ success: boolean; message: string; teams?: { id: string; name: string; color: string }[] }> {
  try {
    // Delete existing teams for this session first
    await prisma.team.deleteMany({ where: { sessionId } });

    // Shuffle students
    const shuffled = [...studentIds].sort(() => Math.random() - 0.5);

    // Create teams
    const createdTeams = [];
    for (let i = 0; i < teamCount; i++) {
      const config = TEAM_CONFIGS[i] ?? { name: `Team ${String.fromCharCode(65 + i)}`, color: "gray" };
      const team = await prisma.team.create({
        data: { sessionId, name: config.name, color: config.color },
      });
      createdTeams.push(team);
    }

    // Distribute students round-robin across teams
    for (let i = 0; i < shuffled.length; i++) {
      const teamIndex = i % teamCount;
      await prisma.teamMember.create({
        data: { teamId: createdTeams[teamIndex].id, studentId: shuffled[i] },
      });
    }

    revalidatePath(`/session/${sessionId}/live`);
    return {
      success: true,
      message: `${teamCount} teams created with ${shuffled.length} students`,
      teams: createdTeams,
    };
  } catch (error) {
    console.error("createTeams error:", error);
    return { success: false, message: "Failed to create teams." };
  }
}

/**
 * Manually assign a student to a specific team
 */
export async function moveStudentToTeam(
  studentId: string,
  newTeamId: string,
  sessionId: string
): Promise<{ success: boolean; message: string }> {
  try {
    // Remove from any existing team in this session
    const existingMembership = await prisma.teamMember.findFirst({
      where: { studentId, team: { sessionId } },
    });
    if (existingMembership) {
      await prisma.teamMember.delete({ where: { id: existingMembership.id } });
    }

    // Add to new team
    await prisma.teamMember.create({ data: { teamId: newTeamId, studentId } });

    revalidatePath(`/session/${sessionId}/live`);
    return { success: true, message: "Student moved." };
  } catch (error) {
    console.error("moveStudentToTeam error:", error);
    return { success: false, message: "Failed to move student." };
  }
}

export async function getSessionTeams(sessionId: string) {
  return prisma.team.findMany({
    where: { sessionId },
    include: {
      members: {
        include: { student: true },
      },
    },
    orderBy: { name: "asc" },
  });
}

export async function getTeamLeaderboard(sessionId: string) {
  const teams = await prisma.team.findMany({
    where: { sessionId },
    include: { members: { include: { student: true } } },
    orderBy: { xp: "desc" },
  });
  return teams;
}
