import { prisma } from "@/lib/prisma";
import { AdminPanel } from "@/components/admin-panel";
import { Settings, Users, BookOpen, Database } from "lucide-react";
import { cn } from "@/lib/utils";

async function getAdminData() {
  const [classes, studentList, sessions] = await Promise.all([
    prisma.class.findMany({ include: { _count: { select: { students: true, sessions: true } } }, orderBy: { name: "asc" } }),
    prisma.student.findMany({ include: { class: true }, orderBy: { name: "asc" } }),
    prisma.session.count(),
  ]);
  return { classes, students: studentList, totalStudents: studentList.length, totalSessions: sessions };
}

export default async function AdminPage() {
  const { classes, students, totalStudents, totalSessions } = await getAdminData();
  return (
    <div className="page-container">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Settings className="w-5 h-5 text-slate-600" />
          <h1 className="text-2xl font-black text-foreground">Admin</h1>
        </div>
        <p className="text-muted-foreground text-sm">Manage classes and students</p>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {[
          { label:"Classes",  value:classes.length,   icon:<BookOpen className="w-5 h-5 text-violet-500"/>, bg:"bg-violet-50 border-violet-100" },
          { label:"Students", value:totalStudents,     icon:<Users className="w-5 h-5 text-sky-500"/>,      bg:"bg-sky-50 border-sky-100"        },
          { label:"Sessions", value:totalSessions,     icon:<Database className="w-5 h-5 text-amber-500"/>, bg:"bg-amber-50 border-amber-100"    },
        ].map(s => (
          <div key={s.label} className={cn("stat-card border-2", s.bg)}>
            {s.icon}
            <p className="text-2xl font-black text-foreground">{s.value}</p>
            <p className="text-xs font-bold text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>
      <AdminPanel classes={classes} students={students} />
    </div>
  );
}
