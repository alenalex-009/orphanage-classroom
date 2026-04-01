import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Lightbulb, BookOpen, PlayCircle, Star } from "lucide-react";
import { getResourceForTopic } from "@/lib/learning-resources";
import { TOPIC_INFO } from "@/lib/question-bank";
import { cn } from "@/lib/utils";

interface Props { params: Promise<{ topic: string }> }

const SUBJECT_STYLES: Record<string, { accent: string; badge: string; badgeText: string; stepBg: string; stepBorder: string }> = {
  Math:            { accent:"text-blue-700",   badge:"bg-blue-100 border-blue-200",   badgeText:"text-blue-700",   stepBg:"bg-blue-50",   stepBorder:"border-blue-200"   },
  English:         { accent:"text-purple-700", badge:"bg-purple-100 border-purple-200",badgeText:"text-purple-700",stepBg:"bg-purple-50",  stepBorder:"border-purple-200" },
  Science:         { accent:"text-green-700",  badge:"bg-green-100 border-green-200", badgeText:"text-green-700",  stepBg:"bg-green-50",  stepBorder:"border-green-200"  },
  "Social Studies":{ accent:"text-amber-700",  badge:"bg-amber-100 border-amber-200", badgeText:"text-amber-700",  stepBg:"bg-amber-50",  stepBorder:"border-amber-200"  },
  "Computer Science":{ accent:"text-slate-700",badge:"bg-slate-100 border-slate-200", badgeText:"text-slate-700",  stepBg:"bg-slate-50",  stepBorder:"border-slate-200"  },
  General:         { accent:"text-rose-700",   badge:"bg-rose-100 border-rose-200",   badgeText:"text-rose-700",   stepBg:"bg-rose-50",   stepBorder:"border-rose-200"   },
};

export default async function LearnTopicPage({ params }: Props) {
  const { topic } = await params;
  const resource  = getResourceForTopic(topic);
  const topicInfo = TOPIC_INFO[topic];
  if (!resource || !topicInfo) notFound();

  const s = SUBJECT_STYLES[resource.subject] ?? SUBJECT_STYLES.General;

  return (
    <div className="page-container">
      <Link href="/learn" className="inline-flex items-center gap-1.5 text-xs text-violet-600 font-black hover:underline">
        <ArrowLeft className="w-3 h-3" />Back to Topics
      </Link>

      {/* Hero */}
      <div className="clay-card border-3 border-indigo-100 overflow-hidden relative">
        <div className="absolute top-0 right-0 text-[100px] opacity-5 leading-none select-none">{resource.emoji}</div>
        <div className="flex items-start gap-5 relative z-10">
          <div className="w-20 h-20 rounded-3xl flex items-center justify-center text-5xl border-3 border-white shrink-0"
            style={{ background:"linear-gradient(135deg, #ede9fe, #ddd6fe)", boxShadow:"4px 4px 12px rgba(99,102,241,0.2)" }}>
            {resource.emoji}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className={cn("text-xs font-black px-3 py-1 rounded-full border-2", s.badge, s.badgeText)}>{resource.subject}</span>
              <span className="text-xs font-bold text-muted-foreground bg-white border-2 border-indigo-100 rounded-full px-3 py-1">{resource.gradeLevel}</span>
            </div>
            <h1 className="text-2xl font-black text-foreground">{resource.title}</h1>
            <p className="text-muted-foreground mt-1.5 text-sm leading-relaxed">{resource.introduction}</p>
          </div>
        </div>
      </div>

      {/* Key Facts */}
      <div className="clay-card">
        <h2 className="font-black text-foreground mb-4 flex items-center gap-2">
          <Star className="w-4 h-4 text-amber-500" />Key Facts
        </h2>
        <ul className="space-y-2.5">
          {resource.keyFacts.map((fact, i) => (
            <li key={i} className="flex items-start gap-3 p-3.5 rounded-2xl bg-indigo-50 border-2 border-indigo-100">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
              <span className="text-sm text-foreground font-semibold">{fact}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Steps */}
      {resource.steps && resource.steps.length > 0 && (
        <div className="clay-card">
          <h2 className="font-black text-foreground mb-4 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-violet-600" />Step-by-Step
          </h2>
          <div className="space-y-3">
            {resource.steps.map(step => (
              <div key={step.step} className={cn("flex items-start gap-4 p-4 rounded-2xl border-2", s.stepBg, s.stepBorder)}>
                <div className="w-9 h-9 rounded-2xl flex items-center justify-center font-black text-sm text-white shrink-0"
                  style={{ background:"linear-gradient(135deg, #6366f1, #8b5cf6)", boxShadow:"2px 2px 6px rgba(99,102,241,0.3)" }}>
                  {step.step}
                </div>
                <p className="text-sm font-bold text-foreground flex-1 mt-1">{step.text}</p>
                <span className="text-2xl">{step.emoji}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Examples */}
      <div className="clay-card">
        <h2 className="font-black text-foreground mb-4 flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-amber-500" />Worked Examples
        </h2>
        <div className="space-y-3">
          {resource.examples.map((ex, i) => (
            <div key={i} className="rounded-2xl border-2 border-indigo-100 overflow-hidden"
              style={{ boxShadow:"var(--shadow-clay-sm)" }}>
              <div className="bg-indigo-50 px-4 py-3 border-b-2 border-indigo-100">
                <p className="text-sm font-black text-foreground">Q: {ex.question}</p>
              </div>
              <div className="px-4 py-3 bg-white">
                <p className="text-sm font-black text-emerald-700">✓ {ex.answer}</p>
                {ex.explanation && <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{ex.explanation}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Vocabulary */}
      <div className="clay-card">
        <h2 className="font-black text-foreground mb-4">📖 Key Words</h2>
        <div className="grid grid-cols-2 gap-3">
          {resource.vocabulary.map((v, i) => (
            <div key={i} className="p-3.5 rounded-2xl bg-indigo-50 border-2 border-indigo-100">
              <p className="font-black text-sm text-indigo-900">{v.word}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{v.meaning}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Fun fact + tip */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="clay-card border-3 border-amber-200 bg-amber-50">
          <h2 className="font-black text-amber-900 mb-2">🌍 Fun Fact</h2>
          <p className="text-sm text-amber-800 leading-relaxed">{resource.funFact}</p>
        </div>
        <div className="clay-card border-3 border-emerald-200 bg-emerald-50">
          <h2 className="font-black text-emerald-900 mb-2">💡 Practice Tip</h2>
          <p className="text-sm text-emerald-800 leading-relaxed">{resource.practiceHint}</p>
        </div>
      </div>

      {/* CTA */}
      <div className="clay-card border-3 border-violet-200 flex flex-col sm:flex-row items-center justify-between gap-4"
        style={{ background:"linear-gradient(135deg, #f5f3ff, #ede9fe)" }}>
        <div>
          <p className="font-black text-violet-900 text-lg">Ready to test your class?</p>
          <p className="text-violet-600 text-sm mt-0.5">
            Create a session with topic <strong>{resource.title}</strong> to auto-generate quiz questions
          </p>
        </div>
        <Link href="/session" className="btn-primary whitespace-nowrap flex items-center gap-2">
          <PlayCircle className="w-4 h-4" />Start a Session
        </Link>
      </div>
    </div>
  );
}
