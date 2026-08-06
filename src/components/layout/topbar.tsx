import { Search, Moon, Sun, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/theme-context";

// Props-driven rather than reaching into useTasks itself: Topbar
// doesn't know *how* search or "new task" are implemented, only
// that it must report user intent upward. That keeps it reusable —
// it could sit above a different data source tomorrow unchanged.
interface TopbarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onNewTask: () => void;
}

export function Topbar({ searchQuery, onSearchChange, onNewTask }: TopbarProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="flex flex-col gap-3 border-b border-line bg-white px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
      <div>
        <h1 className="text-xl font-semibold">Product Board</h1>
        <p className="text-sm text-ink-faint">
          Track what the team is shipping this sprint.
        </p>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative w-full sm:w-64">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint"
            aria-hidden="true"
          />
          <Input
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search tasks…"
            className="pl-9"
            aria-label="Search tasks"
          />
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
        >
          {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        </Button>

        <Button onClick={onNewTask}>
          <Plus className="h-4 w-4" />
          New Task
        </Button>
      </div>
    </header>
  );
}
