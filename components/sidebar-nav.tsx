"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard, CheckSquare, BookOpen, Smile,
  Users, Settings, Trophy, BookMarked, Sparkles,
} from "lucide-react";

const navItems = [
  { href:"/",            label:"Dashboard",   icon:LayoutDashboard, color:"text-indigo-400",  activeGrad:"from-indigo-500 to-violet-500"  },
  { href:"/attendance",  label:"Attendance",  icon:CheckSquare,     color:"text-emerald-400", activeGrad:"from-emerald-500 to-teal-500"   },
  { href:"/session",     label:"Sessions",    icon:BookOpen,        color:"text-amber-400",   activeGrad:"from-amber-500 to-orange-500"   },
  { href:"/mood",        label:"Mood",        icon:Smile,           color:"text-pink-400",    activeGrad:"from-pink-500 to-rose-500"      },
  { href:"/students",    label:"Students",    icon:Users,           color:"text-sky-400",     activeGrad:"from-sky-500 to-blue-500"       },
  { href:"/learn",       label:"Learn",       icon:BookMarked,      color:"text-violet-400",  activeGrad:"from-violet-500 to-purple-600", section:"Learning" },
  { href:"/stories",     label:"Stories",     icon:Sparkles,        color:"text-amber-300",   activeGrad:"from-amber-400 to-yellow-500"   },
  { href:"/leaderboard", label:"Leaderboard", icon:Trophy,          color:"text-yellow-400",  activeGrad:"from-yellow-400 to-amber-500"   },
  { href:"/admin",       label:"Admin",       icon:Settings,        color:"text-slate-400",   activeGrad:"from-slate-400 to-slate-500",   section:"System" },
];

export function SidebarNav() {
  const pathname = usePathname();
  let lastSection: string | null = null;

  return (
    <nav className="space-y-0.5 px-1">
      {navItems.map((item) => {
        const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
        const Icon = item.icon;
        const showSection = item.section && item.section !== lastSection;
        if (item.section) lastSection = item.section;

        return (
          <div key={item.href}>
            {showSection && (
              <p className="px-3 pt-4 pb-1.5 text-[10px] font-black uppercase tracking-widest"
                style={{ color: "#475569" }}>
                {item.section}
              </p>
            )}
            <Link href={item.href}
              className={cn(
                "relative flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-sm font-bold transition-all duration-150",
                isActive ? "text-white" : "text-slate-400 hover:text-white hover:bg-white/5"
              )}
              style={isActive ? {
                background: `linear-gradient(135deg, var(--from), var(--to))`,
                backgroundImage: `linear-gradient(135deg, rgba(99,102,241,0.25), rgba(139,92,246,0.2))`,
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1), 2px 2px 8px rgba(0,0,0,0.2)",
              } : undefined}>
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 rounded-r-full bg-violet-400" />
              )}
              <div className={cn(
                "w-7 h-7 rounded-xl flex items-center justify-center shrink-0 transition-all",
                isActive
                  ? `bg-gradient-to-br ${item.activeGrad}`
                  : "bg-white/5"
              )}>
                <Icon className={cn("w-3.5 h-3.5", isActive ? "text-white" : item.color)} />
              </div>
              <span>{item.label}</span>
              {isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />}
            </Link>
          </div>
        );
      })}
    </nav>
  );
}
