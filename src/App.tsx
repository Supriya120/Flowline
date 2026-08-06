import { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { TaskBoard } from "@/components/tasks/task-board";
import { TaskDialog } from "@/components/tasks/task-dialog";
import { useTasks } from "@/hooks/use-tasks";
import { Task, TaskFormValues } from "@/types/task";

// App is the composition root: it calls the one data hook and
// passes slices of it down as props. It also owns the two bits of
// state that are purely "is a dialog open, and for which task" —
// UI state that belongs to the page, not to the data layer.
export default function App() {
  const {
    isLoading,
    searchQuery,
    setSearchQuery,
    priorityFilter,
    setPriorityFilter,
    addTask,
    updateTask,
    deleteTask,
    moveTask,
    tasksByStatus,
    tasks,
  } = useTasks();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const openCreateDialog = () => {
    setEditingTask(null);
    setDialogOpen(true);
  };

  const openEditDialog = (task: Task) => {
    setEditingTask(task);
    setDialogOpen(true);
  };

  const handleSubmit = (values: TaskFormValues) => {
    if (editingTask) {
      updateTask(editingTask.id, values);
    } else {
      addTask(values);
    }
  };

  return (
    <div className="flex min-h-screen bg-porcelain">
      <Sidebar />

      <div className="flex min-h-screen flex-1 flex-col">
        <Topbar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onNewTask={openCreateDialog}
        />

        <StatsCards tasks={tasks} isLoading={isLoading} />

        <TaskBoard
          tasksByStatus={tasksByStatus}
          isLoading={isLoading}
          priorityFilter={priorityFilter}
          onPriorityFilterChange={setPriorityFilter}
          onEditTask={openEditDialog}
          onDeleteTask={deleteTask}
          onDropTask={moveTask}
        />
      </div>

      <TaskDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleSubmit}
        editingTask={editingTask}
      />
    </div>
  );
}
