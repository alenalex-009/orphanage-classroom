import { prisma } from "@/lib/prisma";
import { getTodayDate, formatDate } from "@/lib/utils";
import { SessionPanel } from "@/components/session-panel";
import { BookOpen } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

async function getSessionPageData() {
  const today = getTodayDate();
  const [classes, todaySessions] = await Promise.all([
    prisma.class.findMany({ orderBy: { name: "asc" } }),
    prisma.session.findMany({
      where: { date: today },
      include: {
        class: true,
        participation: { include: { student: true } },
      },
      orderBy: { createdAt: "desc" },
    }),
  ]);
  return { classes, todaySessions };
}

export default async function SessionPage() {
  const { classes, todaySessions } = await getSessionPageData();

  return (
    <div className="page-container">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <BookOpen className="w-5 h-5 text-teal-700" />
          <h1 className="text-2xl font-extrabold text-foreground">Sessions</h1>
        </div>
        <p className="text-muted-foreground text-sm">{formatDate(new Date())}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Create session form */}
        <SessionPanel classes={classes} />

        {/* Today's sessions */}
        <div className="classroom-card">
          <h2 className="font-bold text-foreground mb-4">Today&apos;s Sessions</h2>
          {todaySessions.length === 0 ? (
            <p className="text-muted-foreground text-sm py-6 text-center">
              No sessions yet today. Create one!
            </p>
          ) : (
            <div className="space-y-3">
              {todaySessions.map((session: typeof todaySessions[0]) => (
                <Link
                  key={session.id}
                  href={`/session/${session.id}`}
                  className="block p-4 rounded-xl border border-border bg-secondary hover:bg-muted transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-bold text-sm text-foreground">
                        {session.topic}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {session.class.name} ·{" "}
                        {session.participation.length} students recorded
                      </p>
                    </div>
                    <span
                      className={cn(
                        "text-xs font-bold px-2.5 py-1 rounded-full shrink-0",
                        session.completed
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700"
                      )}
                    >
                      {session.completed ? "✓ Done" : "● Active"}
                    </span>
                  </div>
                  <p className="text-xs text-teal-700 font-semibold mt-2">
                    View details & participation →
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
