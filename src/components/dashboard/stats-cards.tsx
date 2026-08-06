import { ListTodo, Loader, CheckCircle2, AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Task } from "@/types/task";
import { isOverdue } from "@/lib/utils";

// Takes the raw task list and derives its own numbers rather than
// receiving pre-computed stats as props. This is a judgment call:
// the derivation is cheap and specific to "how stats are defined,"
// so keeping it here means StatsCards is the one place that
// definition lives, instead of leaking into the parent page.
interface StatsCardsProps {
  tasks: Task[];
  isLoading: boolean;
}

export function StatsCards({ tasks, isLoading }: StatsCardsProps) {
  const stats = [
    {
      label: "Total Tasks",
      value: tasks.length,
      icon: ListTodo,
      accent: "text-ink-soft bg-porcelain",
    },
    {
      label: "In Progress",
      value: tasks.filter((t) => t.status === "in-progress").length,
      icon: Loader,
      accent: "text-teal-600 bg-teal-50",
    },
    {
      label: "Completed",
      value: tasks.filter((t) => t.status === "done").length,
      icon: CheckCircle2,
      accent: "text-lilac-500 bg-lilac-100",
    },
    {
      label: "Overdue",
      value: tasks.filter((t) => isOverdue(t.dueDate, t.status)).length,
      icon: AlertTriangle,
      accent: "text-coral-500 bg-coral-100",
    },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-3 px-4 pt-4 sm:px-8 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="skeleton h-[84px] rounded-2xl animate-shimmer" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 px-4 pt-4 sm:px-8 lg:grid-cols-4">
      {stats.map(({ label, value, icon: Icon, accent }, i) => (
        <Card
          key={label}
          className="flex animate-fade-up items-center gap-3 p-4"
          style={{ animationDelay: `${i * 40}ms` }}
        >
          <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${accent}`}>
            <Icon className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <p className="text-xl font-semibold leading-none">{value}</p>
            <p className="mt-1 text-xs text-ink-faint">{label}</p>
          </div>
        </Card>
      ))}
    </div>
  );
}
