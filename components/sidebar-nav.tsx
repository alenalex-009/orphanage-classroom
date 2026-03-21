"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  CheckSquare,
  BookOpen,
  Smile,
  Users,
  Settings,
  GraduationCap,
} from "lucide-react";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/attendance", label: "Attendance", icon: CheckSquare },
  { href: "/session", label: "Sessions", icon: BookOpen },
  { href: "/mood", label: "Mood", icon: Smile },
  { href: "/students", label: "Students", icon: Users },
  { href: "/admin", label: "Admin", icon: Settings },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="flex-1 px-3 py-4 space-y-1">
      {navItems.map((item) => {
        const isActive =
          item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors",
              isActive
                ? "bg-teal-50 text-teal-800 border border-teal-100"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            )}
          >
            <Icon
              className={cn(
                "w-4 h-4 shrink-0 transition-colors",
                isActive ? "text-teal-700" : "group-hover:text-teal-700"
              )}
            />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
