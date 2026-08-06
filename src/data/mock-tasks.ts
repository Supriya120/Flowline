import { Task } from "@/types/task";

// Seed data standing in for an API response. In a real app this
// file is deleted and use-tasks.ts fetches from a service layer
// instead — components never know the difference either way.
const iso = (daysFromToday: number) => {
  const d = new Date();
  d.setDate(d.getDate() + daysFromToday);
  return d.toISOString();
};

export const mockTasks: Task[] = [
  {
    id: "t1",
    title: "Define onboarding checklist",
    description: "Draft the first-run checklist shown to new workspace admins.",
    status: "todo",
    priority: "high",
    dueDate: iso(2),
    assignee: { id: "u1", name: "Priya Shah", initials: "PS", colorClass: "bg-teal-500" },
    tags: ["Onboarding"],
  },
  {
    id: "t2",
    title: "Audit color contrast on dark mode",
    description: "Run the palette against WCAG AA for body text and icons.",
    status: "todo",
    priority: "medium",
    dueDate: iso(5),
    assignee: { id: "u2", name: "Marco Lin", initials: "ML", colorClass: "bg-lilac-500" },
    tags: ["Accessibility", "Design"],
  },
  {
    id: "t3",
    title: "Write migration guide for v2 API",
    description: "Cover breaking changes to the tasks endpoint and auth headers.",
    status: "todo",
    priority: "low",
    dueDate: iso(9),
    assignee: { id: "u3", name: "Dana Osei", initials: "DO", colorClass: "bg-amber-500" },
    tags: ["Docs"],
  },
  {
    id: "t4",
    title: "Build board drag interactions",
    description: "Column-to-column status change with keyboard support.",
    status: "in-progress",
    priority: "high",
    dueDate: iso(-1),
    assignee: { id: "u1", name: "Priya Shah", initials: "PS", colorClass: "bg-teal-500" },
    tags: ["Frontend"],
  },
  {
    id: "t5",
    title: "Set up empty & loading states",
    description: "Skeletons for board columns and an empty state for filtered views.",
    status: "in-progress",
    priority: "medium",
    dueDate: iso(1),
    assignee: { id: "u4", name: "Theo Brandt", initials: "TB", colorClass: "bg-coral-500" },
    tags: ["Frontend", "UX"],
  },
  {
    id: "t6",
    title: "Ship weekly digest email",
    description: "Summarize task movement across the workspace every Monday.",
    status: "done",
    priority: "medium",
    dueDate: iso(-4),
    assignee: { id: "u2", name: "Marco Lin", initials: "ML", colorClass: "bg-lilac-500" },
    tags: ["Growth"],
  },
  {
    id: "t7",
    title: "Fix duplicate tag rendering",
    description: "Tags were rendering twice on cards with more than three labels.",
    status: "done",
    priority: "low",
    dueDate: iso(-6),
    assignee: { id: "u3", name: "Dana Osei", initials: "DO", colorClass: "bg-amber-500" },
    tags: ["Bug"],
  },
];
