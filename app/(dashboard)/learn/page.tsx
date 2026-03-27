import Link from "next/link";
import { ALL_TOPICS } from "@/lib/question-bank";
import { BookOpen, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const SUBJECT_COLORS: Record<string, string> = {
  math:    "bg-blue-50 border-blue-200 hover:bg-blue-100",
  english: "bg-purple-50 border-purple-200 hover:bg-purple-100",
  science: "bg-green-50 border-green-200 hover:bg-green-100",
  social:  "bg-amber-50 border-amber-200 hover:bg-amber-100",
  general: "bg-rose-50 border-rose-200 hover:bg-rose-100",
};
const SUBJECT_LABEL: Record<string, string> = {
  math:"Mathematics", english:"English", science:"Science", social:"Social Studies", general:"General"
};
const SUBJECT_ORDER = ["math","english","science","social","general"];

export default function LearnPage() {
  const bySubject = SUBJECT_ORDER.reduce<Record<string, typeof ALL_TOPICS>>((acc, s) => {
    acc[s] = ALL_TOPICS.filter(t => t.subject === s);
    return acc;
  }, {});

  return (
    <div className="page-container">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <BookOpen className="w-5 h-5 text-violet-600" />
            <h1 className="text-2xl font-black text-foreground">Learning Resources</h1>
          </div>
          <p className="text-muted-foreground text-sm">Select a topic to view the lesson, then launch a quiz for your class.</p>
        </div>
      </div>

      {SUBJECT_ORDER.map(subject => (
        <div key={subject} className="classroom-card">
          <h2 className="font-black text-foreground text-base mb-4 flex items-center gap-2">
            <span className="text-lg">{subject === "math" ? "🔢" : subject === "english" ? "📝" : subject === "science" ? "🔬" : subject === "social" ? "💛" : "🎨"}</span>
            {SUBJECT_LABEL[subject]}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {bySubject[subject].map(topic => (
              <Link key={topic.key} href={`/learn/${topic.key}`}
                className={cn("flex flex-col gap-3 p-4 rounded-2xl border-2 transition-all active:scale-95", SUBJECT_COLORS[subject])}>
                <span className="text-4xl">{topic.emoji}</span>
                <div>
                  <p className="font-black text-sm text-foreground">{topic.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{topic.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
