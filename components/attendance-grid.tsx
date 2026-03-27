"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { markAttendance } from "@/actions/attendance";
import { cn, getInitials } from "@/lib/utils";
import { Loader2, CheckCircle2, XCircle, Save } from "lucide-react";

type Student = { id: string; name: string; age: number };
type ClassWithStudents = { id: string; name: string; students: Student[] };

interface AttendanceGridProps {
  classes: ClassWithStudents[];
  initialMarked: Record<string, string>;
}

export function AttendanceGrid({ classes, initialMarked }: AttendanceGridProps) {
  const [isPending, startTransition] = useTransition();

  // Build initial state: default to "present" if not yet marked, else use existing
  const buildInitial = () => {
    const init: Record<string, "present" | "absent"> = {};
    for (const cls of classes) {
      for (const student of cls.students) {
        init[student.id] =
          (initialMarked[student.id] as "present" | "absent") ?? "present";
      }
    }
    return init;
  };

  const [attendance, setAttendance] = useState<Record<string, "present" | "absent">>(
    buildInitial
  );

  const toggle = (studentId: string) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: prev[studentId] === "present" ? "absent" : "present",
    }));
  };

  const markAllPresent = (classId: string, students: Student[]) => {
    setAttendance((prev) => {
      const next = { ...prev };
      for (const s of students) next[s.id] = "present";
      return next;
    });
  };

  const handleSubmit = () => {
    startTransition(async () => {
      const allStudentIds = classes.flatMap((c) => c.students.map((s) => s.id));
      const presentIds = allStudentIds.filter((id) => attendance[id] === "present");
      const absentIds = allStudentIds.filter((id) => attendance[id] === "absent");
      const classId = classes[0]?.id ?? "";

      const result = await markAttendance(classId, presentIds, absentIds);

      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    });
  };

  const totalPresent = Object.values(attendance).filter((v) => v === "present").length;
  const totalAll = Object.keys(attendance).length;

  return (
    <div className="space-y-6">
      {classes.map((cls) => {
        const classPresent = cls.students.filter(
          (s) => attendance[s.id] === "present"
        ).length;

        return (
          <div key={cls.id} className="classroom-card">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-bold text-foreground">{cls.name}</h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {classPresent} / {cls.students.length} present
                </p>
              </div>
              <button
                onClick={() => markAllPresent(cls.id, cls.students)}
                className="text-xs font-semibold text-teal-700 hover:text-teal-900 px-3 py-1.5 rounded-lg bg-teal-50 hover:bg-teal-100 transition-colors"
              >
                All Present
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {cls.students.map((student) => {
                const isPresent = attendance[student.id] === "present";
                return (
                  <button
                    key={student.id}
                    onClick={() => toggle(student.id)}
                    className={cn(
                      "relative flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all active:scale-95 select-none",
                      isPresent
                        ? "bg-emerald-50 border-emerald-300 shadow-sm"
                        : "bg-red-50 border-red-200"
                    )}
                  >
                    {/* Avatar */}
                    <div
                      className={cn(
                        "w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm",
                        isPresent
                          ? "bg-emerald-200 text-emerald-800"
                          : "bg-red-200 text-red-700"
                      )}
                    >
                      {getInitials(student.name)}
                    </div>

                    <p
                      className={cn(
                        "text-xs font-bold text-center leading-tight",
                        isPresent ? "text-emerald-800" : "text-red-700"
                      )}
                    >
                      {student.name}
                    </p>

                    {/* Status icon */}
                    <div className="absolute top-2 right-2">
                      {isPresent ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-400" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* Submit button */}
      <div className="sticky bottom-4 flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={isPending}
          className="action-btn flex items-center gap-2 px-8 bg-teal-700 hover:bg-teal-800 text-white shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isPending ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          {isPending
            ? "Saving..."
            : `Save Attendance (${totalPresent}/${totalAll} present)`}
        </button>
      </div>
    </div>
  );
}
