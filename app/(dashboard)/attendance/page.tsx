import { prisma } from "@/lib/prisma";
import { getTodayDate, formatDate } from "@/lib/utils";
import { AttendanceGrid } from "@/components/attendance-grid";
import { CheckSquare } from "lucide-react";

async function getAttendancePageData() {
  const today = getTodayDate();
  const classes = await prisma.class.findMany({
    include: {
      students: { orderBy: { name: "asc" } },
    },
    orderBy: { name: "asc" },
  });

  const existingAttendance = await prisma.attendance.findMany({
    where: { date: today },
  });

  const markedMap: Record<string, string> = {};
  for (const a of existingAttendance) {
    markedMap[a.studentId] = a.status;
  }

  return { classes, markedMap, today };
}

export default async function AttendancePage() {
  const { classes, markedMap, today } = await getAttendancePageData();

  const totalStudents = classes.reduce((sum, c) => sum + c.students.length, 0);
  const markedCount = Object.keys(markedMap).length;
  const presentCount = Object.values(markedMap).filter(
    (s) => s === "present"
  ).length;

  return (
    <div className="page-container">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <CheckSquare className="w-5 h-5 text-teal-700" />
          <h1 className="text-2xl font-extrabold text-foreground">
            Attendance
          </h1>
        </div>
        <p className="text-muted-foreground text-sm">{formatDate(today)}</p>
      </div>

      {/* Status bar */}
      <div className="grid grid-cols-3 gap-3">
        <div className="stat-card">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Total
          </p>
          <p className="text-2xl font-extrabold">{totalStudents}</p>
        </div>
        <div className="stat-card">
          <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wide">
            Present
          </p>
          <p className="text-2xl font-extrabold text-emerald-700">
            {presentCount}
          </p>
        </div>
        <div className="stat-card">
          <p className="text-xs font-semibold text-red-500 uppercase tracking-wide">
            Absent
          </p>
          <p className="text-2xl font-extrabold text-red-600">
            {markedCount - presentCount}
          </p>
        </div>
      </div>

      {/* Already marked notice */}
      {markedCount > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm text-amber-800 font-medium">
          ⚠️ Attendance already marked today ({markedCount} students).
          Submitting again will overwrite it.
        </div>
      )}

      {/* Attendance grid per class */}
      {classes.length === 0 ? (
        <div className="classroom-card text-center py-12">
          <p className="text-muted-foreground">
            No classes found. Add classes in Admin first.
          </p>
        </div>
      ) : (
        <AttendanceGrid classes={classes} initialMarked={markedMap} />
      )}
    </div>
  );
}
