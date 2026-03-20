import { prisma } from "@/lib/prisma";
import { getTodayDate, formatDate } from "@/lib/utils";
import { MoodPicker } from "@/components/mood-picker";
import { Smile } from "lucide-react";

async function getMoodData() {
  const classes = await prisma.class.findMany({ orderBy: { name: "asc" } });
  const today = getTodayDate();
  const todayMoods = await prisma.moodLog.findMany({
    where: { date: today },
    include: { class: true },
  });
  return { classes, todayMoods };
}

export default async function MoodPage() {
  const { classes, todayMoods } = await getMoodData();

  return (
    <div className="page-container">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Smile className="w-5 h-5 text-teal-700" />
          <h1 className="text-2xl font-extrabold text-foreground">
            Class Mood
          </h1>
        </div>
        <p className="text-muted-foreground text-sm">{formatDate(new Date())}</p>
      </div>

      <p className="text-sm text-muted-foreground -mt-2">
        Record how the class is feeling today. The teacher observes and
        estimates mood counts — no individual input needed.
      </p>

      {classes.length === 0 ? (
        <div className="classroom-card text-center py-10">
          <p className="text-muted-foreground">
            No classes found. Add a class in Admin first.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {classes.map((cls) => {
            const existingMood = todayMoods.find((m) => m.classId === cls.id);
            return (
              <MoodPicker
                key={cls.id}
                classId={cls.id}
                className={cls.name}
                existing={
                  existingMood
                    ? {
                        happyCount: existingMood.happyCount,
                        neutralCount: existingMood.neutralCount,
                        sadCount: existingMood.sadCount,
                        angryCount: existingMood.angryCount,
                      }
                    : null
                }
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
