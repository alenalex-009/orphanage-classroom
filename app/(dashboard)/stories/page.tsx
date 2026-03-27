import Link from "next/link";
import { getAllStories } from "@/lib/stories";
import { BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

const SUBJECT_COLORS: Record<string, string> = {
  "Moral Values":  "bg-amber-50  border-amber-200  hover:bg-amber-100",
  "Life Skills":   "bg-teal-50   border-teal-200   hover:bg-teal-100",
  "Science — Plants": "bg-green-50 border-green-200 hover:bg-green-100",
  "Emotions":      "bg-pink-50   border-pink-200   hover:bg-pink-100",
};

export default function StoriesPage() {
  const stories = getAllStories();
  return (
    <div className="page-container">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <BookOpen className="w-5 h-5 text-amber-600" />
            <h1 className="text-2xl font-black text-foreground">Story Mode</h1>
          </div>
          <p className="text-muted-foreground text-sm">Read a story with your class — with questions and XP along the way!</p>
        </div>
      </div>

      {/* Hero banner */}
      <div className="rounded-3xl overflow-hidden relative p-8"
        style={{ background:"linear-gradient(135deg, #1e1b4b, #312e81)" }}>
        <div className="absolute top-0 right-0 text-[120px] opacity-10 leading-none">📚</div>
        <div className="relative z-10">
          <p className="text-indigo-300 text-sm font-bold mb-2">🎭 Interactive Reading</p>
          <h2 className="text-2xl font-black text-white mb-2">Stories that teach and inspire</h2>
          <p className="text-indigo-300 text-sm max-w-lg">Each story has questions on every page. Students earn XP for correct answers. Complete a story to unlock a badge!</p>
        </div>
      </div>

      {/* Story cards */}
      <div className="grid md:grid-cols-2 gap-4">
        {stories.map(story => {
          const color = SUBJECT_COLORS[story.subject] ?? "bg-secondary border-border hover:bg-muted";
          return (
            <Link key={story.id} href={`/stories/${story.id}`}
              className={cn("flex gap-4 p-5 rounded-2xl border-2 transition-all active:scale-[0.99] group", color)}>
              <div className="w-16 h-16 rounded-2xl bg-white/80 flex items-center justify-center text-4xl shrink-0 group-hover:scale-110 transition-transform">
                {story.coverEmoji}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-black text-foreground">{story.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{story.subject} · {story.gradeLevel}</p>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2 italic">"{story.moral}"</p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-xs font-bold text-violet-600">⚡ Up to {story.totalXP} XP</span>
                  <span className="text-xs text-muted-foreground">{story.pages.length} pages</span>
                  <span className="text-xs text-muted-foreground">{story.pages.filter(p => p.question).length} questions</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
