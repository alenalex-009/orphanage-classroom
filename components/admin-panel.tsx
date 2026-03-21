"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { createStudent, updateStudent, deleteStudent, createClass } from "@/actions/students";
import { useRouter } from "next/navigation";
import { cn, getInitials } from "@/lib/utils";
import { Loader2, Plus, Trash2, Pencil, Check, X } from "lucide-react";

type ClassWithCount = { id: string; name: string; _count: { students: number } };
type StudentWithClass = { id: string; name: string; age: number; classId: string; class: { name: string } };

interface AdminPanelProps {
  classes: ClassWithCount[];
  students: StudentWithClass[];
}

type Tab = "students" | "classes";

export function AdminPanel({ classes, students }: AdminPanelProps) {
  const [tab, setTab] = useState<Tab>("students");

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex gap-2 bg-muted p-1 rounded-xl w-fit">
        {(["students", "classes"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "px-5 py-2 rounded-lg text-sm font-bold transition-colors capitalize",
              tab === t
                ? "bg-white text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "students" && (
        <StudentsTab classes={classes} students={students} />
      )}
      {tab === "classes" && <ClassesTab classes={classes} />}
    </div>
  );
}

// ─── STUDENTS TAB ─────────────────────────────────────────────────────────────
function StudentsTab({
  classes,
  students,
}: {
  classes: ClassWithCount[];
  students: StudentWithClass[];
}) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [classId, setClassId] = useState(classes[0]?.id ?? "");
  const [editId, setEditId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editAge, setEditAge] = useState("");
  const [editClassId, setEditClassId] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleAdd = () => {
    if (!name.trim() || !age || !classId) {
      toast.error("Please fill in all fields.");
      return;
    }
    startTransition(async () => {
      const result = await createStudent({
        name: name.trim(),
        age: Number(age),
        classId,
      });
      if (result.success) {
        toast.success(result.message);
        setName("");
        setAge("");
        router.refresh();
      } else {
        toast.error(result.message);
      }
    });
  };

  const handleEdit = (s: StudentWithClass) => {
    setEditId(s.id);
    setEditName(s.name);
    setEditAge(String(s.age));
    setEditClassId(s.classId);
  };

  const handleSaveEdit = (id: string) => {
    startTransition(async () => {
      const result = await updateStudent(id, {
        name: editName.trim(),
        age: Number(editAge),
        classId: editClassId,
      });
      if (result.success) {
        toast.success(result.message);
        setEditId(null);
        router.refresh();
      } else {
        toast.error(result.message);
      }
    });
  };

  const handleDelete = (id: string, name: string) => {
    if (!confirm(`Remove ${name} from the system? This cannot be undone.`)) return;
    startTransition(async () => {
      const result = await deleteStudent(id);
      if (result.success) {
        toast.success(result.message);
        router.refresh();
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Add student form */}
      <div className="classroom-card">
        <h2 className="font-bold text-foreground mb-4">Add New Student</h2>
        <div className="grid sm:grid-cols-3 gap-3">
          <input
            type="text"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-4 py-3 rounded-xl border border-border bg-background text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-600"
          />
          <input
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            min={3}
            max={25}
            className="px-4 py-3 rounded-xl border border-border bg-background text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-600"
          />
          <select
            value={classId}
            onChange={(e) => setClassId(e.target.value)}
            className="px-4 py-3 rounded-xl border border-border bg-background text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-600"
          >
            {classes.length === 0 && <option value="">No classes yet</option>}
            {classes.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={handleAdd}
          disabled={isPending || classes.length === 0}
          className="action-btn mt-3 flex items-center gap-2 px-6 bg-teal-700 hover:bg-teal-800 text-white disabled:opacity-50"
        >
          {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
          Add Student
        </button>
      </div>

      {/* Students list */}
      <div className="classroom-card">
        <h2 className="font-bold text-foreground mb-4">
          All Students ({students.length})
        </h2>
        {students.length === 0 ? (
          <p className="text-muted-foreground text-sm py-4 text-center">
            No students yet. Add one above!
          </p>
        ) : (
          <div className="space-y-2">
            {students.map((s) => (
              <div
                key={s.id}
                className="flex items-center gap-3 p-3 rounded-xl bg-secondary"
              >
                <div className="w-9 h-9 rounded-full bg-teal-200 text-teal-800 font-bold text-xs flex items-center justify-center shrink-0">
                  {getInitials(s.name)}
                </div>

                {editId === s.id ? (
                  // Edit mode
                  <div className="flex-1 grid sm:grid-cols-3 gap-2">
                    <input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="px-3 py-2 rounded-lg border border-border bg-background text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-600"
                    />
                    <input
                      type="number"
                      value={editAge}
                      onChange={(e) => setEditAge(e.target.value)}
                      className="px-3 py-2 rounded-lg border border-border bg-background text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-600"
                    />
                    <select
                      value={editClassId}
                      onChange={(e) => setEditClassId(e.target.value)}
                      className="px-3 py-2 rounded-lg border border-border bg-background text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-600"
                    >
                      {classes.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-foreground">{s.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Age {s.age} · {s.class.name}
                    </p>
                  </div>
                )}

                <div className="flex gap-1 shrink-0">
                  {editId === s.id ? (
                    <>
                      <button
                        onClick={() => handleSaveEdit(s.id)}
                        disabled={isPending}
                        className="p-2 rounded-lg bg-teal-100 text-teal-700 hover:bg-teal-200"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setEditId(null)}
                        className="p-2 rounded-lg bg-muted text-muted-foreground hover:bg-border"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEdit(s)}
                        className="p-2 rounded-lg bg-muted text-muted-foreground hover:bg-border"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(s.id, s.name)}
                        className="p-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-100"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── CLASSES TAB ──────────────────────────────────────────────────────────────
function ClassesTab({ classes }: { classes: ClassWithCount[] }) {
  const [name, setName] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleAdd = () => {
    if (!name.trim()) {
      toast.error("Enter a class name.");
      return;
    }
    startTransition(async () => {
      const result = await createClass(name.trim());
      if (result.success) {
        toast.success(result.message);
        setName("");
        router.refresh();
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="classroom-card">
        <h2 className="font-bold text-foreground mb-4">Add New Class</h2>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Class name (e.g. Sunflower Class)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            className="flex-1 px-4 py-3 rounded-xl border border-border bg-background text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-600"
          />
          <button
            onClick={handleAdd}
            disabled={isPending}
            className="action-btn flex items-center gap-2 px-6 bg-teal-700 hover:bg-teal-800 text-white disabled:opacity-50"
          >
            {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
            Add
          </button>
        </div>
      </div>

      <div className="classroom-card">
        <h2 className="font-bold text-foreground mb-4">
          Classes ({classes.length})
        </h2>
        {classes.length === 0 ? (
          <p className="text-muted-foreground text-sm py-4 text-center">
            No classes yet. Add one!
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 gap-3">
            {classes.map((c) => (
              <div
                key={c.id}
                className="flex items-center justify-between p-4 rounded-xl bg-teal-50 border border-teal-100"
              >
                <div>
                  <p className="font-bold text-teal-800">{c.name}</p>
                  <p className="text-xs text-teal-600 mt-0.5">
                    {c._count.students} student{c._count.students !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
