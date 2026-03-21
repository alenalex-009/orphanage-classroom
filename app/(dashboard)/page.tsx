import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getTodayDate, formatDate } from "@/lib/utils";
import {
  CheckSquare,
  BookOpen,
  Smile,
  Users,
  TrendingUp,
  Calendar,
  Award,
} from "lucide-react";

async function getDashboardData() {
  const today = getTodayDate();

  const [classes, todayAttendance, todaySessions, totalStudents] =
    await Promise.all([
      prisma.class.findMany({
        include: { _count: { select: { students: true } } },
      }),
      prisma.attendance.findMany({
        where: { date: today },
        include: { student: { include: { class: true } } },
      }),
      prisma.session.findMany({
        where: { date: today },
        include: { class: true, participation: true },
      }),
      prisma.student.count(),
    ]);

  const presentToday = todayAttendance.filter(
    (a:any) => a.status === "present"
  ).length;
  const markedToday = todayAttendance.length;

  const todayMood = await prisma.moodLog.findFirst({
    where: { date: today },
    orderBy: { createdAt: "desc" },
  });

  const recentAchievements = await prisma.achievement.findMany({
    orderBy: { date: "desc" },
    take: 5,
    include: { student: true },
  });

  return {
    classes,
    presentToday,
    markedToday,
    totalStudents,
    todaySessions,
    todayMood,
    recentAchievements,
  };
}

export default async function DashboardPage() {
  const data = await getDashboardData();

  const dominantMood = data.todayMood
    ? getDominantMood(data.todayMood)
    : null;

  return (
    <div className="page-container">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground">
            Good Morning! 👋
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            {formatDate(new Date())}
          </p>
        </div>
        <div className="flex items-center gap-2 bg-white border border-border rounded-xl px-4 py-2 shadow-sm">
          <Calendar className="w-4 h-4 text-teal-700" />
          <span className="text-sm font-semibold text-teal-800">
            {data.classes.length} Class{data.classes.length !== 1 ? "es" : ""}
          </span>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          label="Students"
          value={data.totalStudents}
          icon={<Users className="w-5 h-5 text-teal-600" />}
          color="teal"
        />
        <StatCard
          label="Present Today"
          value={`${data.presentToday} / ${data.markedToday}`}
          icon={<CheckSquare className="w-5 h-5 text-emerald-600" />}
          color="emerald"
          sub={
            data.markedToday > 0
              ? `${Math.round((data.presentToday / data.markedToday) * 100)}% attendance`
              : "Not marked yet"
          }
        />
        <StatCard
          label="Sessions Today"
          value={data.todaySessions.length}
          icon={<BookOpen className="w-5 h-5 text-amber-600" />}
          color="amber"
          sub={`${data.todaySessions.filter((s:any) => s.completed).length} completed`}
        />
        <StatCard
          label="Class Mood"
          value={dominantMood ? dominantMood.emoji : "—"}
          icon={<Smile className="w-5 h-5 text-purple-500" />}
          color="purple"
          sub={dominantMood ? dominantMood.label : "Not recorded"}
        />
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-base font-bold text-foreground mb-3">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <QuickAction
            href="/attendance"
            icon="✅"
            label="Mark Attendance"
            color="bg-emerald-50 border-emerald-200 hover:bg-emerald-100"
            textColor="text-emerald-800"
          />
          <QuickAction
            href="/session"
            icon="📖"
            label="Start Session"
            color="bg-amber-50 border-amber-200 hover:bg-amber-100"
            textColor="text-amber-800"
          />
          <QuickAction
            href="/mood"
            icon="😊"
            label="Record Mood"
            color="bg-purple-50 border-purple-200 hover:bg-purple-100"
            textColor="text-purple-800"
          />
          <QuickAction
            href="/students"
            icon="👥"
            label="View Students"
            color="bg-teal-50 border-teal-200 hover:bg-teal-100"
            textColor="text-teal-800"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Today's Sessions */}
        <div className="classroom-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-foreground flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-teal-700" />
              Today&apos;s Sessions
            </h2>
            <Link
              href="/session"
              className="text-xs text-teal-700 font-semibold hover:underline"
            >
              View all →
            </Link>
          </div>
          {data.todaySessions.length === 0 ? (
            <p className="text-muted-foreground text-sm py-4 text-center">
              No sessions today yet.{" "}
              <Link href="/session" className="text-teal-700 font-semibold">
                Start one →
              </Link>
            </p>
          ) : (
            <div className="space-y-2">
              {data.todaySessions.map((s:any) => (
                <Link
                  key={s.id}
                  href={`/session/${s.id}`}
                  className="flex items-center justify-between p-3 rounded-xl bg-secondary hover:bg-muted transition-colors"
                >
                  <div>
                    <p className="font-semibold text-sm text-foreground">
                      {s.topic}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {s.class.name} · {s.participation.length} participants
                    </p>
                  </div>
                  <span
                    className={`text-xs font-bold px-2 py-1 rounded-full ${
                      s.completed
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {s.completed ? "Done" : "Active"}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Recent Achievements */}
        <div className="classroom-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-foreground flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-500" />
              Recent Achievements
            </h2>
            <Link
              href="/students"
              className="text-xs text-teal-700 font-semibold hover:underline"
            >
              All students →
            </Link>
          </div>
          {data.recentAchievements.length === 0 ? (
            <p className="text-muted-foreground text-sm py-4 text-center">
              No achievements yet. Keep tracking!
            </p>
          ) : (
            <div className="space-y-2">
              {data.recentAchievements.map((a:any) => (
                <div
                  key={a.id}
                  className="flex items-center gap-3 p-3 rounded-xl bg-secondary"
                >
                  <span className="text-xl">{a.icon}</span>
                  <div>
                    <p className="font-semibold text-sm text-foreground">
                      {a.student.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{a.label}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Classes overview */}
      <div className="classroom-card">
        <h2 className="font-bold text-foreground mb-4 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-teal-700" />
          Classes Overview
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
          {data.classes.map((c:any) => (
            <div
              key={c.id}
              className="p-4 rounded-xl bg-teal-50 border border-teal-100"
            >
              <p className="font-bold text-teal-800">{c.name}</p>
              <p className="text-sm text-teal-600 mt-1">
                {c._count.students} student{c._count.students !== 1 ? "s" : ""}
              </p>
            </div>
          ))}
          {data.classes.length === 0 && (
            <p className="text-muted-foreground text-sm col-span-3 py-2 text-center">
              No classes yet.{" "}
              <Link href="/admin" className="text-teal-700 font-semibold">
                Add one in Admin →
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon,
  color,
  sub,
}: {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  sub?: string;
}) {
  return (
    <div className="stat-card">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          {label}
        </p>
        {icon}
      </div>
      <p className="text-2xl font-extrabold text-foreground">{value}</p>
      {sub && <p className="text-xs text-muted-foreground">{sub}</p>}
    </div>
  );
}

function QuickAction({
  href,
  icon,
  label,
  color,
  textColor,
}: {
  href: string;
  icon: string;
  label: string;
  color: string;
  textColor: string;
}) {
  return (
    <Link
      href={href}
      className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all active:scale-95 ${color}`}
    >
      <span className="text-3xl">{icon}</span>
      <span className={`text-sm font-bold text-center ${textColor}`}>
        {label}
      </span>
    </Link>
  );
}

function getDominantMood(mood: {
  happyCount: number;
  neutralCount: number;
  sadCount: number;
  angryCount: number;
}) {
  const entries = [
    { label: "Happy", emoji: "😊", count: mood.happyCount },
    { label: "Neutral", emoji: "😐", count: mood.neutralCount },
    { label: "Sad", emoji: "😢", count: mood.sadCount },
    { label: "Angry", emoji: "😠", count: mood.angryCount },
  ];
  return entries.sort((a, b) => b.count - a.count)[0];
}
