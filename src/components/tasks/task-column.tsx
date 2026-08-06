import { Task, TaskStatus, STATUS_META } from "@/types/task";
import { TaskCard } from "@/components/tasks/task-card";
import { EmptyState } from "@/components/tasks/empty-state";

// One column = one status. Composition over a single giant
// "board" component: TaskColumn owns the column chrome (header,
// count, drop target) and delegates each task's own rendering to
// TaskCard — neither component needs to know how the other
// renders, only what data crosses the boundary.
interface TaskColumnProps {
  status: TaskStatus;
  tasks: Task[];
  isLoading: boolean;
  onEditTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
  onDropTask: (id: string, status: TaskStatus) => void;
}

export function TaskColumn({
  status,
  tasks,
  isLoading,
  onEditTask,
  onDeleteTask,
  onDropTask,
}: TaskColumnProps) {
  const meta = STATUS_META[status];

  return (
    <div
      className="flex w-full shrink-0 flex-col gap-3 sm:w-[320px]"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        const id = e.dataTransfer.getData("text/plain");
        if (id) onDropTask(id, status);
      }}
    >
      <div className="flex items-center gap-2 px-1">
        <span className={`h-2 w-2 rounded-full ${meta.dotClass}`} aria-hidden="true" />
        <h2 className="text-sm font-semibold text-ink">{meta.label}</h2>
        <span className="ml-auto rounded-full bg-porcelain px-2 py-0.5 text-xs font-medium text-ink-faint">
          {isLoading ? "…" : tasks.length}
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {isLoading ? (
          Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="skeleton h-32 animate-shimmer rounded-2xl" />
          ))
        ) : tasks.length === 0 ? (
          <EmptyState
            message={
              status === "done"
                ? "Nothing completed yet — finished tasks will land here."
                : "No tasks here. Drag one over, or create a new one."
            }
          />
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              draggable
              onDragStart={(e) => e.dataTransfer.setData("text/plain", task.id)}
            >
              <TaskCard task={task} onEdit={onEditTask} onDelete={onDeleteTask} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
