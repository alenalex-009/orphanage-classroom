"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { createSession } from "@/actions/session";
import { useRouter } from "next/navigation";
import { Loader2, Plus, Users, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

type ClassOption = { id: string; name: string };

export function SessionPanel({ classes }: { classes: ClassOption[] }) {
  const [topic, setTopic] = useState("");
  const [classId, setClassId] = useState(classes[0]?.id ?? "");
  const [mode, setMode] = useState<"class" | "team">("class");
  const [teamSize, setTeamSize] = useState(2);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleCreate = () => {
    if (!topic.trim()) { toast.error("Please enter a session topic."); return; }
    if (!classId) { toast.error("Please select a class."); return; }

    startTransition(async () => {
      const result = await createSession(classId, topic.trim(), mode, teamSize);
      if (result.success && result.sessionId) {
        toast.success(result.message);
        setTopic("");
        router.push(`/session/${result.sessionId}/live`);
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <div className="classroom-card">
      <h2 className="font-bold text-foreground mb-4">Create New Session</h2>

      <div className="space-y-4">
        {/* Class selector */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">Class</label>
          <select
            value={classId}
            onChange={(e) => setClassId(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-600"
          >
            {classes.length === 0 && <option value="">No classes available</option>}
            {classes.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        {/* Topic input */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">Session Topic</label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCreate()}
            placeholder="e.g., Mathematics — Fractions"
            className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-600 placeholder:text-muted-foreground"
          />
        </div>

        {/* Mode selector */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">Session Mode</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setMode("class")}
              className={cn(
                "flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all",
                mode === "class"
                  ? "bg-teal-50 border-teal-400 text-teal-800"
                  : "bg-secondary border-border text-muted-foreground hover:border-teal-200"
              )}
            >
              <GraduationCap className="w-6 h-6" />
              <span className="font-bold text-sm">Class Mode</span>
              <span className="text-xs text-center leading-tight opacity-75">
                Whole class works together
              </span>
            </button>

            <button
              type="button"
              onClick={() => setMode("team")}
              className={cn(
                "flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all",
                mode === "team"
                  ? "bg-amber-50 border-amber-400 text-amber-800"
                  : "bg-secondary border-border text-muted-foreground hover:border-amber-200"
              )}
            >
              <Users className="w-6 h-6" />
              <span className="font-bold text-sm">Team Mode</span>
              <span className="text-xs text-center leading-tight opacity-75">
                Compete in small teams
              </span>
            </button>
          </div>
        </div>

        {/* Team size — only shown in team mode */}
        {mode === "team" && (
          <div className="animate-fade-in">
            <label className="block text-sm font-semibold text-foreground mb-2">
              Students per Team
            </label>
            <div className="flex gap-2">
              {[2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setTeamSize(n)}
                  className={cn(
                    "flex-1 py-2.5 rounded-xl text-sm font-bold border-2 transition-all",
                    teamSize === n
                      ? "bg-amber-100 border-amber-400 text-amber-800"
                      : "bg-secondary border-border text-muted-foreground hover:border-amber-200"
                  )}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={handleCreate}
          disabled={isPending || classes.length === 0}
          className="action-btn w-full flex items-center justify-center gap-2 bg-teal-700 hover:bg-teal-800 text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
          {isPending ? "Creating..." : "Start Session →"}
        </button>

        {classes.length === 0 && (
          <p className="text-xs text-muted-foreground text-center">Add a class in Admin first.</p>
        )}
      </div>
    </div>
  );
}
