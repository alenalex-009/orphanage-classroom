"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard, CheckSquare, BookOpen, Smile,
  Users, Settings, Trophy, BookMarked, Sparkles,
} from "lucide-react";

const navItems = [
  { href: "/",            label: "Dashboard",  icon: LayoutDashboard, color: "text-indigo-400", section: null        },
  { href: "/attendance",  label: "Attendance", icon: CheckSquare,     color: "text-emerald-400",section: null        },
  { href: "/session",     label: "Sessions",   icon: BookOpen,        color: "text-amber-400",  section: null        },
  { href: "/mood",        label: "Mood",       icon: Smile,           color: "text-pink-400",   section: null        },
  { href: "/students",    label: "Students",   icon: Users,           color: "text-sky-400",    section: null        },
  { href: "/learn",       label: "Learn",      icon: BookMarked,      color: "text-violet-400", section: "Learning"  },
  { href: "/stories",     label: "Stories",    icon: Sparkles,        color: "text-amber-300",  section: null        },
  { href: "/leaderboard", label: "Leaderboard",icon: Trophy,          color: "text-yellow-400", section: null        },
  { href: "/admin",       label: "Admin",      icon: Settings,        color: "text-slate-400",  section: "System"    },
];

export function SidebarNav() {
  const pathname = usePathname();
  let lastSection: string | null = undefined as unknown as null;

  return (
    <nav className="space-y-0.5">
      {navItems.map((item) => {
        const isActive = item.href === "/"
          ? pathname === "/"
          : pathname.startsWith(item.href);
        const Icon = item.icon;
        const showSection = item.section && item.section !== lastSection;
        lastSection = item.section;

        return (
          <div key={item.href}>
            {showSection && (
              <p className="px-3 pt-4 pb-1 text-[10px] font-black uppercase tracking-widest"
                style={{ color: "#475569" }}>
                {item.section}
              </p>
            )}
            <Link href={item.href}
              className={cn(
                "relative flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-bold transition-all duration-150",
                isActive
                  ? "text-white"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
              )}
              style={isActive ? { background: "rgba(99,102,241,0.18)" } : undefined}>
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r-full bg-violet-400" />
              )}
              <Icon className={cn("w-4 h-4 shrink-0 transition-colors", isActive ? item.color : "text-slate-500")} />
              <span>{item.label}</span>
              {isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-violet-400" />}
            </Link>
          </div>
        );
      })}
    </nav>
  );
}
