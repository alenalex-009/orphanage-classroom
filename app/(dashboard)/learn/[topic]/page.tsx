import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, BookOpen, Lightbulb, Star, PlayCircle, CheckCircle2 } from "lucide-react";
import { getResourceForTopic } from "@/lib/learning-resources";
import { TOPIC_INFO } from "@/lib/question-bank";
import { cn } from "@/lib/utils";

interface Props { params: Promise<{ topic: string }> }

const SUBJECT_COLORS: Record<string, { bg: string; border: string; badge: string; accent: string }> = {
  Math:            { bg:"bg-blue-50",   border:"border-blue-200",  badge:"bg-blue-100 text-blue-700",    accent:"text-blue-700"   },
  English:         { bg:"bg-purple-50", border:"border-purple-200",badge:"bg-purple-100 text-purple-700",accent:"text-purple-700" },
  Science:         { bg:"bg-green-50",  border:"border-green-200", badge:"bg-green-100 text-green-700",  accent:"text-green-700"  },
  "Social Studies":{ bg:"bg-amber-50",  border:"border-amber-200", badge:"bg-amber-100 text-amber-700",  accent:"text-amber-700"  },
  General:         { bg:"bg-rose-50",   border:"border-rose-200",  badge:"bg-rose-100 text-rose-600",    accent:"text-rose-600"   },
};

export default async function LearnTopicPage({ params }: Props) {
  const { topic } = await params;
  const resource = getResourceForTopic(topic);
  const topicInfo = TOPIC_INFO[topic];
  if (!resource || !topicInfo) notFound();

  const colors = SUBJECT_COLORS[resource.subject] ?? SUBJECT_COLORS.General;

  return (
    <div className="page-container">
      <Link href="/learn" className="inline-flex items-center gap-1.5 text-xs text-violet-600 font-bold hover:underline">
        <ArrowLeft className="w-3 h-3" />Back to Topics
      </Link>

      {/* Hero */}
      <div className={cn("rounded-3xl border-2 p-6", colors.bg, colors.border)}>
        <div className="flex items-start gap-4">
          <div className="text-6xl">{resource.emoji}</div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className={cn("text-xs font-black px-2.5 py-1 rounded-full", colors.badge)}>{resource.subject}</span>
              <span className="text-xs text-muted-foreground font-semibold">{resource.gradeLevel}</span>
            </div>
            <h1 className="text-2xl font-black text-foreground">{resource.title}</h1>
            <p className="text-muted-foreground mt-1 text-sm leading-relaxed">{resource.introduction}</p>
          </div>
        </div>
      </div>

      {/* Key Facts */}
      <div className="classroom-card">
        <h2 className="font-black text-foreground mb-4 flex items-center gap-2">
          <Star className="w-4 h-4 text-amber-500" />Key Facts
        </h2>
        <ul className="space-y-2">
          {resource.keyFacts.map((fact, i) => (
            <li key={i} className="flex items-start gap-3 p-3 rounded-xl bg-secondary">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
              <span className="text-sm text-foreground font-medium">{fact}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Steps (if available) */}
      {resource.steps && resource.steps.length > 0 && (
        <div className="classroom-card">
          <h2 className="font-black text-foreground mb-4 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-violet-600" />Step-by-Step
          </h2>
          <div className="space-y-3">
            {resource.steps.map(step => (
              <div key={step.step} className="flex items-start gap-4 p-4 rounded-2xl border-2 border-violet-100 bg-violet-50">
                <div className="w-8 h-8 rounded-xl bg-violet-600 text-white font-black text-sm flex items-center justify-center shrink-0">
                  {step.step}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-foreground">{step.text}</p>
                </div>
                <span className="text-2xl">{step.emoji}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Examples */}
      <div className="classroom-card">
        <h2 className="font-black text-foreground mb-4 flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-amber-500" />Worked Examples
        </h2>
        <div className="space-y-3">
          {resource.examples.map((ex, i) => (
            <div key={i} className="rounded-2xl border border-border overflow-hidden">
              <div className="bg-secondary px-4 py-3">
                <p className="text-sm font-bold text-foreground">Q: {ex.question}</p>
              </div>
              <div className="px-4 py-3 border-t border-border">
                <p className="text-sm font-black text-emerald-700">A: {ex.answer}</p>
                {ex.explanation && <p className="text-xs text-muted-foreground mt-1">{ex.explanation}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Vocabulary */}
      <div className="classroom-card">
        <h2 className="font-black text-foreground mb-4">📖 Key Words</h2>
        <div className="grid grid-cols-2 gap-3">
          {resource.vocabulary.map((v, i) => (
            <div key={i} className="p-3 rounded-xl bg-secondary">
              <p className="font-black text-sm text-foreground">{v.word}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{v.meaning}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Fun fact + practice hint */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="classroom-card border-2 border-amber-200 bg-amber-50">
          <h2 className="font-black text-amber-800 mb-2">🌍 Fun Fact</h2>
          <p className="text-sm text-amber-700">{resource.funFact}</p>
        </div>
        <div className="classroom-card border-2 border-emerald-200 bg-emerald-50">
          <h2 className="font-black text-emerald-800 mb-2">💡 Practice Tip</h2>
          <p className="text-sm text-emerald-700">{resource.practiceHint}</p>
        </div>
      </div>

      {/* Launch quiz CTA */}
      <div className="classroom-card flex flex-col sm:flex-row items-center justify-between gap-4 p-6"
        style={{ background:"linear-gradient(135deg, #f5f3ff, #ede9fe)" }}>
        <div>
          <p className="font-black text-violet-900 text-lg">Ready to test your class?</p>
          <p className="text-violet-600 text-sm mt-0.5">Create a session with topic <strong>{resource.title}</strong> to launch a quiz with these questions</p>
        </div>
        <Link href="/session" className="btn-primary whitespace-nowrap flex items-center gap-2">
          <PlayCircle className="w-4 h-4" />Start a Session
        </Link>
      </div>
    </div>
  );
}
