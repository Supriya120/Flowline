import { Calendar, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { Task, PRIORITY_META } from "@/types/task";
import { Badge } from "@/components/ui/badge";
import { cn, formatDueDate, isOverdue } from "@/lib/utils";

// The single unit of the board. It's split out from TaskColumn
// because a "card" is a reusable concept — the same component
// could later render in a list view or a detail drawer — and
// isolating it makes the hover/menu interaction logic testable on
// its own instead of tangled inside a column's mapping loop.
interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  // Local UI-only state: whether the row-level action menu is open.
  // It never needs to live in useTasks because no other component
  // cares about it — a textbook case for useState instead of lifting.
  const [menuOpen, setMenuOpen] = useState(false);
  const overdue = isOverdue(task.dueDate, task.status);

  return (
    <div
      className="group relative animate-fade-up rounded-2xl border border-line bg-white p-4 shadow-panel transition-all hover:-translate-y-0.5 hover:shadow-pop"
      tabIndex={0}
    >
      <div className="mb-2 flex items-start justify-between gap-2">
        <Badge className={PRIORITY_META[task.priority].badgeClass}>
          {PRIORITY_META[task.priority].label}
        </Badge>

        <div className="relative">
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={`Actions for ${task.title}`}
            aria-expanded={menuOpen}
            className="rounded-lg p-1 text-ink-faint opacity-0 transition-opacity hover:bg-porcelain hover:text-ink group-hover:opacity-100 focus-visible:opacity-100"
          >
            <MoreHorizontal className="h-4 w-4" />
          </button>

          {menuOpen && (
            <div
              role="menu"
              className="absolute right-0 top-8 z-10 w-36 animate-scale-in rounded-xl border border-line bg-white p-1 shadow-pop"
              onMouseLeave={() => setMenuOpen(false)}
            >
              <button
                role="menuitem"
                onClick={() => { onEdit(task); setMenuOpen(false); }}
                className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-sm text-ink-soft hover:bg-porcelain"
              >
                <Pencil className="h-3.5 w-3.5" /> Edit
              </button>
              <button
                role="menuitem"
                onClick={() => { onDelete(task.id); setMenuOpen(false); }}
                className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-sm text-coral-500 hover:bg-coral-100"
              >
                <Trash2 className="h-3.5 w-3.5" /> Delete
              </button>
            </div>
          )}
        </div>
      </div>

      <h3 className="text-sm font-semibold leading-snug text-ink">{task.title}</h3>
      <p className="mt-1 line-clamp-2 text-xs text-ink-faint">{task.description}</p>

      {task.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {task.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-porcelain px-2 py-0.5 text-[11px] font-medium text-ink-soft"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="mt-4 flex items-center justify-between">
        <div
          className={cn(
            "flex items-center gap-1 text-xs",
            overdue ? "font-medium text-coral-500" : "text-ink-faint"
          )}
        >
          <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
          {formatDueDate(task.dueDate)}
          {overdue && <span className="sr-only"> (overdue)</span>}
        </div>

        <div
          className={cn(
            "flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-semibold text-white",
            task.assignee.colorClass
          )}
          title={task.assignee.name}
        >
          {task.assignee.initials}
        </div>
      </div>
    </div>
  );
}
