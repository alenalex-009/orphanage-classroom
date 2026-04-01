import { SidebarNav } from "@/components/sidebar-nav";
import { GraduationCap, Zap, Crown } from "lucide-react";
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
      <aside className="w-62 flex flex-col shrink-0 sticky top-0 h-screen overflow-hidden"
        style={{ background: "linear-gradient(180deg, #0f172a 0%, #1a1035 100%)", borderRight: "1px solid rgba(99,102,241,0.15)", width: "248px" }}>

        {/* Logo */}
        <div className="px-5 py-5 border-b" style={{ borderColor: "rgba(99,102,241,0.15)" }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0"
              style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", boxShadow: "0 4px 12px rgba(99,102,241,0.4), inset 0 1px 0 rgba(255,255,255,0.2)" }}>
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-black text-white leading-tight">Classroom OS</p>
              <p className="text-[11px] font-semibold" style={{ color: "#6366f1" }}>Teacher Panel · v3</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <div className="flex-1 overflow-y-auto py-3 scrollbar-thin">
          <SidebarNav />
        </div>

        {/* Top student XP teaser */}
        {top && topInfo && (
          <div className="mx-3 mb-3 p-3.5 rounded-2xl border border-violet-500/20"
            style={{ background: "rgba(99,102,241,0.1)", backdropFilter: "blur(8px)" }}>
            <div className="flex items-center gap-1.5 mb-2.5">
              <Crown className="w-3 h-3 text-amber-400" />
              <span className="text-[10px] font-black text-amber-400 uppercase tracking-wider">Top XP Today</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-base shrink-0`}
                style={{ background: `linear-gradient(135deg, #6366f1, #8b5cf6)` }}>
                {topInfo.avatar.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-xs font-black truncate">{top.student.name.split(" ")[0]}</p>
                <p className="text-violet-400 text-[10px] font-bold">Lv.{topInfo.level} · {top.xp} XP</p>
              </div>
            </div>
            <div className="mt-2 h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.1)" }}>
              <div className="h-full rounded-full" style={{
                width: `${topInfo.progress}%`,
                background: "linear-gradient(90deg, #6366f1, #8b5cf6)",
                boxShadow: "0 0 8px rgba(99,102,241,0.5)",
                transition: "width 0.8s ease-out"
              }} />
            </div>
          </div>
        )}

        {/* Version */}
        <div className="px-5 py-3 border-t" style={{ borderColor: "rgba(99,102,241,0.1)" }}>
          <p className="text-[10px] font-semibold" style={{ color: "#334155" }}>
            Classroom OS · Primary to Higher Ed
          </p>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto min-h-screen">
        <div className="page-enter">{children}</div>
      </main>
    </div>
  );
}
