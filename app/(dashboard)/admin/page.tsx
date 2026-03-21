import { prisma } from "@/lib/prisma";
import { AdminPanel } from "@/components/admin-panel";
import { Settings } from "lucide-react";

async function getAdminData() {
  const [classes, students] = await Promise.all([
    prisma.class.findMany({
      include: { _count: { select: { students: true } } },
      orderBy: { name: "asc" },
    }),
    prisma.student.findMany({
      include: { class: true },
      orderBy: [{ class: { name: "asc" } }, { name: "asc" }],
    }),
  ]);
  return { classes, students };
}

export default async function AdminPage() {
  const { classes, students } = await getAdminData();

  return (
    <div className="page-container">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Settings className="w-5 h-5 text-teal-700" />
          <h1 className="text-2xl font-extrabold text-foreground">Admin</h1>
        </div>
        <p className="text-muted-foreground text-sm">
          Manage classes and students
        </p>
      </div>

      <AdminPanel classes={classes} students={students} />
    </div>
  );
}
