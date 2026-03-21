import { SidebarNav } from "@/components/sidebar-nav";
import { GraduationCap } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-background">
      <aside className="w-64 bg-white border-r border-border flex flex-col shadow-sm shrink-0">
        <div className="px-6 py-5 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-700 flex items-center justify-center shadow-sm">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-extrabold text-teal-800 leading-tight">
                Classroom OS
              </p>
              <p className="text-xs text-muted-foreground">Teacher Panel</p>
            </div>
          </div>
        </div>
        <SidebarNav />
        <div className="px-4 py-4 border-t border-border">
          <p className="text-xs text-muted-foreground text-center">
            v1.0 · Classroom OS
          </p>
        </div>
      </aside>
      <main className="flex-1 overflow-auto min-h-screen">
        <div className="page-enter">{children}</div>
      </main>
    </div>
  );
}
