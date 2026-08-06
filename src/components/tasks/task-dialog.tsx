import { FormEvent, useEffect, useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Task, TaskFormValues, TaskPriority } from "@/types/task";

// Controlled form with fully local state — the draft being typed
// is not "real" task data until submitted, so it has no business
// living in useTasks. This also means cancelling the dialog simply
// discards local state, with no cleanup needed elsewhere.
interface TaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: TaskFormValues) => void;
  editingTask: Task | null;
}

const emptyDraft = {
  title: "",
  description: "",
  priority: "medium" as TaskPriority,
  dueDate: new Date().toISOString().slice(0, 10),
  tags: "",
};

export function TaskDialog({ open, onOpenChange, onSubmit, editingTask }: TaskDialogProps) {
  const [draft, setDraft] = useState(emptyDraft);

  // Re-seed the form whenever the target task changes (opening for
  // edit vs. opening fresh for create) — this is exactly the kind
  // of "sync local state to a prop that changes" job useEffect is
  // for, rather than trying to compute it during render.
  useEffect(() => {
    if (editingTask) {
      setDraft({
        title: editingTask.title,
        description: editingTask.description,
        priority: editingTask.priority,
        dueDate: editingTask.dueDate.slice(0, 10),
        tags: editingTask.tags.join(", "),
      });
    } else if (open) {
      setDraft(emptyDraft);
    }
  }, [editingTask, open]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!draft.title.trim()) return;

    onSubmit({
      title: draft.title.trim(),
      description: draft.description.trim(),
      priority: draft.priority,
      dueDate: new Date(draft.dueDate).toISOString(),
      tags: draft.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      assignee: editingTask?.assignee ?? {
        id: "u1",
        name: "Priya Shah",
        initials: "PS",
        colorClass: "bg-teal-500",
      },
      status: editingTask?.status,
    });
    onOpenChange(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      title={editingTask ? "Edit task" : "Create task"}
      description={
        editingTask
          ? "Update the details and save your changes."
          : "Add a new task to the To Do column."
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="title" className="mb-1.5 block text-xs font-medium text-ink-soft">
            Title
          </label>
          <Input
            id="title"
            value={draft.title}
            onChange={(e) => setDraft({ ...draft, title: e.target.value })}
            placeholder="e.g. Redesign the empty states"
            required
            autoFocus
          />
        </div>

        <div>
          <label htmlFor="description" className="mb-1.5 block text-xs font-medium text-ink-soft">
            Description
          </label>
          <Textarea
            id="description"
            rows={3}
            value={draft.description}
            onChange={(e) => setDraft({ ...draft, description: e.target.value })}
            placeholder="What does done look like?"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="priority" className="mb-1.5 block text-xs font-medium text-ink-soft">
              Priority
            </label>
            <Select
              id="priority"
              value={draft.priority}
              onChange={(e) => setDraft({ ...draft, priority: e.target.value as TaskPriority })}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </Select>
          </div>
          <div>
            <label htmlFor="dueDate" className="mb-1.5 block text-xs font-medium text-ink-soft">
              Due date
            </label>
            <Input
              id="dueDate"
              type="date"
              value={draft.dueDate}
              onChange={(e) => setDraft({ ...draft, dueDate: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label htmlFor="tags" className="mb-1.5 block text-xs font-medium text-ink-soft">
            Tags <span className="text-ink-faint">(comma-separated)</span>
          </label>
          <Input
            id="tags"
            value={draft.tags}
            onChange={(e) => setDraft({ ...draft, tags: e.target.value })}
            placeholder="Design, Frontend"
          />
        </div>

        <div className="mt-2 flex justify-end gap-2">
          <Button type="button" variant="secondary" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="submit">{editingTask ? "Save changes" : "Create task"}</Button>
        </div>
      </form>
    </Dialog>
  );
}
