import Link from "next/link";
import { ALL_TOPICS } from "@/lib/question-bank";
import { BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

const SUBJECT_CONFIG: Record<string, { label: string; emoji: string; bg: string; border: string; hover: string; badge: string }> = {
  math:       { label:"Mathematics",     emoji:"🔢", bg:"bg-blue-50",   border:"border-blue-200",   hover:"hover:bg-blue-100",   badge:"bg-blue-100 text-blue-700"    },
  english:    { label:"English",         emoji:"📝", bg:"bg-purple-50", border:"border-purple-200", hover:"hover:bg-purple-100", badge:"bg-purple-100 text-purple-700"},
  science:    { label:"Science",         emoji:"🔬", bg:"bg-green-50",  border:"border-green-200",  hover:"hover:bg-green-100",  badge:"bg-green-100 text-green-700"  },
  social:     { label:"Social Studies",  emoji:"💛", bg:"bg-amber-50",  border:"border-amber-200",  hover:"hover:bg-amber-100",  badge:"bg-amber-100 text-amber-700"  },
  humanities: { label:"Humanities",      emoji:"🏛️", bg:"bg-orange-50", border:"border-orange-200", hover:"hover:bg-orange-100", badge:"bg-orange-100 text-orange-700"},
  cs:         { label:"Computer Science",emoji:"💻", bg:"bg-slate-50",  border:"border-slate-200",  hover:"hover:bg-slate-100",  badge:"bg-slate-100 text-slate-700"  },
  general:    { label:"General",         emoji:"🎨", bg:"bg-rose-50",   border:"border-rose-200",   hover:"hover:bg-rose-100",   badge:"bg-rose-100 text-rose-700"    },
};

const GRADE_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  primary: { label:"Primary (Gr 1–5)",       color:"text-emerald-700", bg:"bg-emerald-100 border-emerald-300" },
  middle:  { label:"Middle School (Gr 6–8)", color:"text-blue-700",    bg:"bg-blue-100 border-blue-300"    },
  high:    { label:"High School (Gr 9–12)",  color:"text-violet-700",  bg:"bg-violet-100 border-violet-300"},
  higher:  { label:"Higher Education",       color:"text-rose-700",    bg:"bg-rose-100 border-rose-300"    },
};

const SUBJECT_ORDER = ["math","english","science","social","humanities","cs","general"];
const GRADE_ORDER   = ["primary","middle","high","higher"];

export default function LearnPage() {
  const byGrade = GRADE_ORDER.reduce<Record<string, typeof ALL_TOPICS>>((acc, g) => {
    acc[g] = ALL_TOPICS.filter(t => (t as any).grade === g);
    return acc;
  }, {});

  const stats = {
    total:    ALL_TOPICS.length,
    subjects: new Set(ALL_TOPICS.map(t => t.subject)).size,
  };

  return (
    <div className="page-container">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <BookOpen className="w-5 h-5 text-violet-600" />
            <h1 className="text-2xl font-black text-foreground">Learning Resources</h1>
          </div>
          <p className="text-muted-foreground text-sm">
            {stats.total} topics across {stats.subjects} subjects — Primary to Higher Education
          </p>
        </div>
      </div>

      {/* Hero banner */}
      <div className="rounded-3xl overflow-hidden relative p-7"
        style={{ background: "linear-gradient(135deg, #1e1b4b, #312e81, #1e3a5f)" }}>
        <div className="absolute top-0 right-0 text-[120px] opacity-10 leading-none select-none">📚</div>
        <div className="relative z-10 grid md:grid-cols-4 gap-4">
          {GRADE_ORDER.map(g => {
            const gc = GRADE_CONFIG[g];
            const count = byGrade[g]?.length ?? 0;
            return (
              <div key={g} className="flex flex-col gap-1">
                <span className={cn("text-xs font-black px-2.5 py-1 rounded-full border w-fit", gc.bg, gc.color)}>
                  {gc.label}
                </span>
                <p className="text-white font-black text-2xl">{count}</p>
                <p className="text-indigo-300 text-xs">topics available</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Grade-by-grade sections */}
      {GRADE_ORDER.map(grade => {
        const topics = byGrade[grade] ?? [];
        if (!topics.length) return null;
        const gc = GRADE_CONFIG[grade];

        // Group by subject within this grade
        const bySubject = SUBJECT_ORDER.reduce<Record<string, typeof topics>>((acc, s) => {
          const filtered = topics.filter(t => t.subject === s);
          if (filtered.length) acc[s] = filtered;
          return acc;
        }, {});

        return (
          <div key={grade} className="space-y-4">
            {/* Grade heading */}
            <div className="flex items-center gap-3">
              <span className={cn("px-4 py-1.5 rounded-full text-sm font-black border", gc.bg, gc.color)}>
                {gc.label}
              </span>
              <div className="flex-1 h-px bg-border" />
            </div>

            {Object.entries(bySubject).map(([subject, subTopics]) => {
              const sc = SUBJECT_CONFIG[subject] ?? SUBJECT_CONFIG.general;
              return (
                <div key={subject} className="classroom-card">
                  <h2 className="font-black text-foreground text-sm mb-3 flex items-center gap-2">
                    <span className="text-lg">{sc.emoji}</span>
                    {sc.label}
                    <span className={cn("ml-1 text-xs px-2 py-0.5 rounded-full font-bold", sc.badge)}>
                      {subTopics.length} topic{subTopics.length !== 1 ? "s" : ""}
                    </span>
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                    {subTopics.map(topic => (
                      <Link key={topic.key} href={`/learn/${topic.key}`}
                        className={cn(
                          "flex flex-col gap-2 p-3.5 rounded-2xl border-2 transition-all active:scale-95 group",
                          sc.bg, sc.border, sc.hover
                        )}>
                        <span className="text-3xl group-hover:scale-110 transition-transform">{topic.emoji}</span>
                        <div>
                          <p className="font-black text-xs text-foreground leading-tight">{topic.label}</p>
                          <p className="text-[10px] text-muted-foreground mt-0.5 line-clamp-1">{topic.description}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
