import { TaskColumn } from "@/components/tasks/task-column";
import { Select } from "@/components/ui/select";
import { Task, TaskStatus } from "@/types/task";

// The orchestrator for the board region. It owns no state itself —
// everything comes in as props from the useTasks hook via App —
// which makes it a "dumb" composition layer: easy to reason about,
// and trivially testable by passing in fixed props.
interface TaskBoardProps {
  tasksByStatus: Record<TaskStatus, Task[]>;
  isLoading: boolean;
  priorityFilter: string;
  onPriorityFilterChange: (value: string) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
  onDropTask: (id: string, status: TaskStatus) => void;
}

const COLUMNS: TaskStatus[] = ["todo", "in-progress", "done"];

export function TaskBoard({
  tasksByStatus,
  isLoading,
  priorityFilter,
  onPriorityFilterChange,
  onEditTask,
  onDeleteTask,
  onDropTask,
}: TaskBoardProps) {
  return (
    <section className="flex-1 px-4 pb-8 pt-4 sm:px-8" aria-label="Task board">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-xs text-ink-faint">Drag a card to change its status.</p>
        <div className="w-36">
          <Select
            aria-label="Filter by priority"
            value={priorityFilter}
            onChange={(e) => onPriorityFilterChange(e.target.value)}
          >
            <option value="all">All priorities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </Select>
        </div>
      </div>

      <div className="flex flex-col gap-6 sm:flex-row sm:gap-4 sm:overflow-x-auto sm:pb-2">
        {COLUMNS.map((status) => (
          <TaskColumn
            key={status}
            status={status}
            tasks={tasksByStatus[status]}
            isLoading={isLoading}
            onEditTask={onEditTask}
            onDeleteTask={onDeleteTask}
            onDropTask={onDropTask}
          />
        ))}
      </div>
    </section>
  );
}
