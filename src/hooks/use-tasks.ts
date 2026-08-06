import { useCallback, useEffect, useMemo, useState } from "react";
import { mockTasks } from "@/data/mock-tasks";
import { Task, TaskFormValues, TaskStatus } from "@/types/task";

// This hook is the single owner of task state and the only place
// that knows tasks currently come from mock data (a real app would
// swap the body of `load` for a fetch call and nothing outside
// this file would need to change). Centralizing it here — instead
// of in the top-level page component — keeps TaskBoard focused on
// layout and lets any future route reuse the same data + actions.

interface UseTasksResult {
  tasks: Task[];
  isLoading: boolean;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  priorityFilter: string;
  setPriorityFilter: (p: string) => void;
  addTask: (values: TaskFormValues) => void;
  updateTask: (id: string, values: TaskFormValues) => void;
  deleteTask: (id: string) => void;
  moveTask: (id: string, status: TaskStatus) => void;
  tasksByStatus: Record<TaskStatus, Task[]>;
}

export function useTasks(): UseTasksResult {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");

  // Simulates an initial data fetch so the board can demonstrate a
  // real loading state (skeleton columns) rather than always
  // rendering instantly, which is how most real network calls behave.
  useEffect(() => {
    const timer = setTimeout(() => {
      setTasks(mockTasks);
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const addTask = useCallback((values: TaskFormValues) => {
    const newTask: Task = {
      ...values,
      id: `t${Date.now()}`,
      status: values.status ?? "todo",
    };
    setTasks((prev) => [newTask, ...prev]);
  }, []);

  const updateTask = useCallback((id: string, values: TaskFormValues) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...values, id } : t))
    );
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const moveTask = useCallback((id: string, status: TaskStatus) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)));
  }, []);

  // Derived, filtered view of tasks. useMemo avoids re-filtering
  // and re-grouping the full task list on every render (e.g. when
  // typing in an unrelated field) — it only recomputes when the
  // tasks or the two filter inputs actually change.
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesQuery = task.title
        .toLowerCase()
        .includes(searchQuery.trim().toLowerCase());
      const matchesPriority =
        priorityFilter === "all" || task.priority === priorityFilter;
      return matchesQuery && matchesPriority;
    });
  }, [tasks, searchQuery, priorityFilter]);

  const tasksByStatus = useMemo(() => {
    const grouped: Record<TaskStatus, Task[]> = {
      todo: [],
      "in-progress": [],
      done: [],
    };
    for (const task of filteredTasks) grouped[task.status].push(task);
    return grouped;
  }, [filteredTasks]);

  return {
    tasks,
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
  };
}
