import { prisma } from "@/lib/prisma";
import { getTodayDate, formatDate } from "@/lib/utils";
import { AttendanceGrid } from "@/components/attendance-grid";
import { CheckSquare } from "lucide-react";
import { cn } from "@/lib/utils";

async function getAttendancePageData() {
  const today = getTodayDate();
  const classes = await prisma.class.findMany({
    include: { students: { orderBy: { name: "asc" } } }, orderBy: { name: "asc" },
  });
  const existing = await prisma.attendance.findMany({ where: { date: today } });
  const markedMap: Record<string, string> = {};
  for (const a of existing) markedMap[a.studentId] = a.status;
  return { classes, markedMap, today };
}

export default async function AttendancePage() {
  const { classes, markedMap, today } = await getAttendancePageData();
  const totalStudents = classes.reduce((s: number, c: any) => s + c.students.length, 0);
  const presentCount  = Object.values(markedMap).filter(s => s === "present").length;
  const markedCount   = Object.keys(markedMap).length;
  const pct = markedCount > 0 ? Math.round((presentCount / markedCount) * 100) : 0;

  return (
    <div className="page-container">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <CheckSquare className="w-5 h-5 text-emerald-600" />
            <h1 className="text-2xl font-black text-foreground">Attendance</h1>
          </div>
          <p className="text-muted-foreground text-sm">{formatDate(new Date())}</p>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label:"Total Students", value:totalStudents, emoji:"👥", bg:"bg-sky-50 border-sky-100" },
          { label:"Present Today",  value:`${presentCount}/${markedCount}`, emoji:"✅", bg:"bg-emerald-50 border-emerald-100" },
          { label:"Attendance Rate",value:`${pct}%`, emoji:"📊",
            bg: pct >= 80 ? "bg-emerald-50 border-emerald-100" : pct >= 60 ? "bg-amber-50 border-amber-100" : "bg-rose-50 border-rose-100" },
        ].map(s => (
          <div key={s.label} className={cn("stat-card border-2", s.bg)}>
            <span className="text-2xl">{s.emoji}</span>
            <p className="text-2xl font-black text-foreground">{s.value}</p>
            <p className="text-xs font-bold text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      <AttendanceGrid classes={classes} initialMarked={markedMap} />
    </div>
  );
}
