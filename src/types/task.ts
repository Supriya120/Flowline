// Central domain types for the board. Kept in one file so every
// component, hook, and mock-data file imports the same shape —
// this is the single source of truth for "what a task is."

export type TaskStatus = "todo" | "in-progress" | "done";

export type TaskPriority = "low" | "medium" | "high";

export interface Assignee {
  id: string;
  name: string;
  initials: string;
  colorClass: string; // Tailwind bg class for the avatar chip
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string; // ISO date
  assignee: Assignee;
  tags: string[];
}

// Payload shape for create/edit — id and status are assigned by
// the hook, not typed by the user in the form.
export type TaskFormValues = Omit<Task, "id" | "status"> & {
  status?: TaskStatus;
};

export const STATUS_META: Record<
  TaskStatus,
  { label: string; dotClass: string }
> = {
  todo: { label: "To Do", dotClass: "bg-ink-faint" },
  "in-progress": { label: "In Progress", dotClass: "bg-teal-500" },
  done: { label: "Done", dotClass: "bg-teal-600" },
};

export const PRIORITY_META: Record<
  TaskPriority,
  { label: string; badgeClass: string }
> = {
  low: { label: "Low", badgeClass: "bg-teal-50 text-teal-600" },
  medium: { label: "Medium", badgeClass: "bg-amber-100 text-amber-500" },
  high: { label: "High", badgeClass: "bg-coral-100 text-coral-500" },
};
