import { prisma } from "@/lib/prisma";
import { getTodayDate, getInitials, calculateAttendancePercentage } from "@/lib/utils";
import Link from "next/link";
import { Users, Award, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

async function getAllStudentsWithStats() {
  const students = await prisma.student.findMany({
    include: {
      class: true,
      reward: true,
      achievements: true,
      attendance: true,
      participation: true,
    },
    orderBy: [{ class: { name: "asc" } }, { name: "asc" }],
  });

  return students.map((s) => {
    const present = s.attendance.filter((a) => a.status === "present").length;
    const attendancePct = calculateAttendancePercentage(present, s.attendance.length);
    const avgParticipation =
      s.participation.length > 0
        ? Math.round(s.participation.reduce((sum, p) => sum + p.score, 0) / s.participation.length)
        : 0;
    return { ...s, attendancePct, avgParticipation };
  });
}

export default async function StudentsPage() {
  const students = await getAllStudentsWithStats();

  // Group by class
  const byClass = students.reduce<Record<string, typeof students>>(
    (acc, s) => {
      const key = s.class.name;
      if (!acc[key]) acc[key] = [];
      acc[key].push(s);
      return acc;
    },
    {}
  );

  return (
    <div className="page-container">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Users className="w-5 h-5 text-teal-700" />
            <h1 className="text-2xl font-extrabold text-foreground">Students</h1>
          </div>
          <p className="text-muted-foreground text-sm">
            {students.length} students across {Object.keys(byClass).length} classes
          </p>
        </div>
        <Link
          href="/admin"
          className="text-sm font-semibold text-teal-700 hover:underline"
        >
          + Add Student
        </Link>
      </div>

      {students.length === 0 ? (
        <div className="classroom-card text-center py-12">
          <p className="text-muted-foreground mb-2">No students yet.</p>
          <Link href="/admin" className="text-teal-700 font-semibold text-sm">
            Add students in Admin →
          </Link>
        </div>
      ) : (
        Object.entries(byClass).map(([className, classStudents]) => (
          <div key={className} className="classroom-card">
            <h2 className="font-bold text-foreground mb-4">{className}</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
              {classStudents.map((student) => (
                <Link
                  key={student.id}
                  href={`/students/${student.id}`}
                  className="flex items-center gap-3 p-3 rounded-xl bg-secondary hover:bg-muted transition-colors border border-transparent hover:border-border"
                >
                  {/* Avatar */}
                  <div className="w-11 h-11 rounded-full bg-teal-200 text-teal-800 font-bold text-sm flex items-center justify-center shrink-0">
                    {getInitials(student.name)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm text-foreground truncate">
                      {student.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Age {student.age}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span
                        className={cn(
                          "text-xs font-semibold",
                          student.attendancePct >= 75
                            ? "text-emerald-600"
                            : student.attendancePct >= 50
                            ? "text-amber-600"
                            : "text-red-500"
                        )}
                      >
                        {student.attendancePct}% att.
                      </span>
                      {student.reward && (
                        <span className="text-xs font-semibold text-purple-600">
                          Lv.{student.reward.level}
                        </span>
                      )}
                      {student.achievements.length > 0 && (
                        <span className="text-xs">
                          {student.achievements[0].icon}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
