"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { createSession } from "@/actions/session";
import { useRouter } from "next/navigation";
import { Loader2, Plus } from "lucide-react";

type ClassOption = { id: string; name: string };

export function SessionPanel({ classes }: { classes: ClassOption[] }) {
  const [topic, setTopic] = useState("");
  const [classId, setClassId] = useState(classes[0]?.id ?? "");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleCreate = () => {
    if (!topic.trim()) {
      toast.error("Please enter a session topic.");
      return;
    }
    if (!classId) {
      toast.error("Please select a class.");
      return;
    }

    startTransition(async () => {
      const result = await createSession(classId, topic.trim());
      if (result.success && result.sessionId) {
        toast.success(result.message);
        setTopic("");
        router.push(`/session/${result.sessionId}`);
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
          <label className="block text-sm font-semibold text-foreground mb-2">
            Class
          </label>
          <select
            value={classId}
            onChange={(e) => setClassId(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-600"
          >
            {classes.length === 0 && (
              <option value="">No classes available</option>
            )}
            {classes.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Topic input */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">
            Session Topic
          </label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCreate()}
            placeholder="e.g., Mathematics — Fractions"
            className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-600 placeholder:text-muted-foreground"
          />
        </div>

        <button
          onClick={handleCreate}
          disabled={isPending || classes.length === 0}
          className="action-btn w-full flex items-center justify-center gap-2 bg-teal-700 hover:bg-teal-800 text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Plus className="w-4 h-4" />
          )}
          {isPending ? "Creating..." : "Create & Open Session"}
        </button>

        {classes.length === 0 && (
          <p className="text-xs text-muted-foreground text-center">
            Add a class in Admin first.
          </p>
        )}
      </div>
    </div>
  );
}
