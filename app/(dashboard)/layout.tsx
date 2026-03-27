import { SidebarNav } from "@/components/sidebar-nav";
import { GraduationCap, Zap } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { getLevelInfo } from "@/lib/avatars";

async function getTopStudent() {
  return prisma.reward
    .findFirst({ orderBy: { xp: "desc" }, include: { student: true } })
    .catch(() => null);
}

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const top = await getTopStudent();
  const topInfo = top ? getLevelInfo(top.xp) : null;

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className="w-60 flex flex-col shrink-0 sticky top-0 h-screen overflow-hidden"
        style={{ background: "#0f172a", borderRight: "1px solid #1e293b" }}>

        {/* Logo */}
        <div className="px-5 py-5 border-b" style={{ borderColor: "#1e293b" }}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-black text-white leading-tight">Classroom OS</p>
              <p className="text-[11px] font-semibold" style={{ color: "#64748b" }}>Teacher Panel</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <div className="flex-1 overflow-y-auto py-3 px-3 scrollbar-thin">
          <SidebarNav />
        </div>

        {/* Top student preview */}
        {top && topInfo && (
          <div className="mx-3 mb-3 p-3 rounded-2xl" style={{ background: "#1e293b" }}>
            <div className="flex items-center gap-1.5 mb-2">
              <Zap className="w-3 h-3 text-amber-400" />
              <span className="text-[10px] font-black text-amber-400 uppercase tracking-wider">Top XP</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-sm bg-gradient-to-br ${topInfo.avatar.gradient}`}>
                {topInfo.avatar.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-xs font-bold truncate">{top.student.name.split(" ")[0]}</p>
                <p className="text-amber-400 text-[10px] font-black">Lv.{topInfo.level} · {top.xp} XP</p>
              </div>
            </div>
            <div className="mt-2 h-1 rounded-full overflow-hidden" style={{ background: "#334155" }}>
              <div className={`h-full rounded-full bg-gradient-to-r ${topInfo.avatar.gradient}`}
                style={{ width: `${topInfo.progress}%` }} />
            </div>
          </div>
        )}

        {/* Version */}
        <div className="px-5 py-3 border-t" style={{ borderColor: "#1e293b" }}>
          <p className="text-[10px] font-semibold" style={{ color: "#475569" }}>v2.0 · Classroom OS</p>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto min-h-screen">
        <div className="page-enter">{children}</div>
      </main>
    </div>
  );
}
