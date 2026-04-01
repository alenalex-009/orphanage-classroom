import Link from "next/link";
import { getAllStories } from "@/lib/stories";
import { BookOpen, Star, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const SUBJECT_STYLES: Record<string, {
  bg: string; border: string; badge: string; badgeText: string; emoji: string;
}> = {
  "Moral Values":     { bg:"bg-amber-50",  border:"border-amber-200",  badge:"bg-amber-100",   badgeText:"text-amber-700",  emoji:"💛" },
  "Life Skills":      { bg:"bg-teal-50",   border:"border-teal-200",   badge:"bg-teal-100",    badgeText:"text-teal-700",   emoji:"🌟" },
  "Science — Plants": { bg:"bg-green-50",  border:"border-green-200",  badge:"bg-green-100",   badgeText:"text-green-700",  emoji:"🔬" },
  "Emotions":         { bg:"bg-pink-50",   border:"border-pink-200",   badge:"bg-pink-100",    badgeText:"text-pink-700",   emoji:"💭" },
  "Science":          { bg:"bg-blue-50",   border:"border-blue-200",   badge:"bg-blue-100",    badgeText:"text-blue-700",   emoji:"🔬" },
  "History":          { bg:"bg-orange-50", border:"border-orange-200", badge:"bg-orange-100",  badgeText:"text-orange-700", emoji:"🏛️" },
  "Mathematics":      { bg:"bg-indigo-50", border:"border-indigo-200", badge:"bg-indigo-100",  badgeText:"text-indigo-700", emoji:"🔢" },
  "Health":           { bg:"bg-rose-50",   border:"border-rose-200",   badge:"bg-rose-100",    badgeText:"text-rose-700",   emoji:"❤️" },
};

const DEFAULT_STYLE = { bg:"bg-violet-50", border:"border-violet-200", badge:"bg-violet-100", badgeText:"text-violet-700", emoji:"📖" };

export default function StoriesPage() {
  const stories = getAllStories();

  return (
    <div className="page-container">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <h1 className="text-2xl font-black text-foreground">Story Mode</h1>
          </div>
          <p className="text-muted-foreground text-sm">
            {stories.length} interactive stories — read, answer questions, earn XP!
          </p>
        </div>
      </div>

      {/* Hero */}
      <div className="relative overflow-hidden rounded-3xl p-7 border-3 border-violet-200"
        style={{ background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #a21caf 100%)" }}>
        <div className="absolute -top-6 -right-6 text-[140px] opacity-10 select-none leading-none">📚</div>
        <div className="absolute bottom-0 left-1/3 text-[80px] opacity-10 select-none leading-none translate-y-4">✨</div>
        <div className="relative z-10">
          <p className="text-violet-200 text-sm font-bold mb-2 flex items-center gap-1.5">
            <BookOpen className="w-4 h-4" /> Interactive Reading
          </p>
          <h2 className="text-2xl font-black text-white mb-2">Stories that teach and inspire</h2>
          <p className="text-violet-200 text-sm max-w-lg leading-relaxed">
            Each story pauses at key moments with a question. Answer correctly to earn XP and continue. Complete the whole story to unlock a special moral.
          </p>
          <div className="flex gap-4 mt-4">
            {[
              { icon:"⚡", label:`Up to ${Math.max(...stories.map(s=>s.totalXP))} XP` },
              { icon:"❓", label:`${stories.reduce((s,st)=>s+st.pages.filter(p=>p.question).length,0)} questions` },
              { icon:"📖", label:`${stories.length} stories` },
            ].map(s => (
              <div key={s.label} className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm rounded-2xl px-3 py-1.5">
                <span className="text-base">{s.icon}</span>
                <span className="text-white text-xs font-black">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── THE FIX: story cards are full-block links ── */}
      <div className="grid md:grid-cols-2 gap-4">
        {stories.map(story => {
          const style = SUBJECT_STYLES[story.subject] ?? DEFAULT_STYLE;
          const questionCount = story.pages.filter(p => p.question).length;
          return (
            /* FIX: `block` not `flex` on Link — entire card area is clickable */
            <Link
              key={story.id}
              href={`/stories/${story.id}`}
              className={cn(
                "story-card border-2 overflow-hidden",
                style.bg, style.border
              )}
            >
              {/* Top accent bar */}
              <div className="h-1.5 w-full"
                style={{ background: "linear-gradient(90deg, #6366f1, #8b5cf6, #a21caf)" }} />

              <div className="p-5">
                {/* Cover emoji + badges row */}
                <div className="flex items-start justify-between mb-3">
                  <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-4xl border-2 border-white/80"
                    style={{ boxShadow: "3px 3px 10px rgba(99,102,241,0.15)" }}>
                    {story.coverEmoji}
                  </div>
                  <div className="flex flex-col gap-1.5 items-end">
                    <span className={cn("text-[11px] font-black px-2.5 py-1 rounded-full border", style.badge, style.badgeText, style.border)}>
                      {style.emoji} {story.subject}
                    </span>
                    <span className="text-[11px] font-bold text-muted-foreground bg-white/70 rounded-full px-2.5 py-1">
                      {story.gradeLevel}
                    </span>
                  </div>
                </div>

                {/* Title + moral — THESE ARE NOW ALWAYS CLICKABLE */}
                <h3 className="font-black text-foreground text-base leading-tight mb-1">
                  {story.title}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-2 italic mb-3">
                  &ldquo;{story.moral}&rdquo;
                </p>

                {/* Stats row */}
                <div className="flex items-center gap-3 pt-3 border-t border-black/5">
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-amber-500" />
                    <span className="text-xs font-black text-amber-700">+{story.totalXP} XP</span>
                  </div>
                  <span className="text-xs text-muted-foreground">📄 {story.pages.length} pages</span>
                  <span className="text-xs text-muted-foreground">❓ {questionCount} questions</span>
                  <span className="ml-auto text-xs font-black text-violet-600 flex items-center gap-1">
                    Read →
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
