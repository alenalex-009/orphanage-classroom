import { prisma } from "@/lib/prisma";
import { getTodayDate, formatDate } from "@/lib/utils";
import { MoodPicker } from "@/components/mood-picker";
import { Smile, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

async function getMoodPageData() {
  const today = getTodayDate();
  const classes = await prisma.class.findMany({ orderBy: { name: "asc" } });
  const todayMood   = await prisma.moodLog.findFirst({ where: { date: today }, orderBy: { createdAt: "desc" } });
  const moodHistory = await prisma.moodLog.findMany({ orderBy: { date: "desc" }, take: 7 });
  return { classes, todayMood, moodHistory };
}

export default async function MoodPage() {
  const { classes, todayMood, moodHistory } = await getMoodPageData();
  return (
    <div className="page-container">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Smile className="w-5 h-5 text-pink-500" />
          <h1 className="text-2xl font-black text-foreground">Mood Tracker</h1>
        </div>
        <p className="text-muted-foreground text-sm">{formatDate(new Date())}</p>
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        {classes.length > 0 ? (
          <MoodPicker classId={classes[0].id} className={classes[0].name} existing={todayMood} />
        ) : (
          <div className="clay-card text-center py-8 text-muted-foreground text-sm">No classes found. Add one in Admin.</div>
        )}
        <div className="clay-card">
          <h2 className="font-black text-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-pink-500" />Mood History
          </h2>
          {moodHistory.length === 0 ? (
            <p className="text-muted-foreground text-sm text-center py-8">No mood data yet.</p>
          ) : (
            <div className="space-y-3">
              {moodHistory.map((m: any) => {
                const entries = [
                  { e:"😊", c:m.happyCount,   color:"bg-emerald-400" },
                  { e:"😐", c:m.neutralCount, color:"bg-amber-400"   },
                  { e:"😢", c:m.sadCount,     color:"bg-sky-400"     },
                  { e:"😠", c:m.angryCount,   color:"bg-rose-400"    },
                ];
                const total   = entries.reduce((s, x) => s + x.c, 0) || 1;
                const dominant = [...entries].sort((a,b)=>b.c-a.c)[0];
                return (
                  <div key={m.id} className="p-4 rounded-2xl bg-pink-50 border-2 border-pink-100">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-black text-foreground">
                        {new Date(m.date).toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"})}
                      </span>
                      <span className="text-xl">{dominant.e}</span>
                    </div>
                    <div className="flex rounded-full overflow-hidden h-3 gap-0.5">
                      {entries.map((e,i) => e.c > 0 && (
                        <div key={i} className={cn("rounded-full transition-all", e.color)}
                          style={{ width:`${(e.c/total)*100}%` }} />
                      ))}
                    </div>
                    <div className="flex gap-3 mt-2">
                      {entries.map((e,i) => e.c > 0 && (
                        <span key={i} className="text-xs text-muted-foreground">{e.e} {e.c}</span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
