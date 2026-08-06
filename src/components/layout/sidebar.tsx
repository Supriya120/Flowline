import { LayoutGrid, ListChecks, Users, Settings, Workflow } from "lucide-react";
import { cn } from "@/lib/utils";

// Purely presentational + purely static: no props, no state. It's
// its own component (rather than inline in App) because it's a
// structural landmark — isolating it keeps App.tsx readable as a
// map of "regions" instead of a wall of markup, and gives the nav
// a stable place to grow (e.g. active-route highlighting later).
const NAV_ITEMS = [
  { label: "Board", icon: LayoutGrid, active: true },
  { label: "My Tasks", icon: ListChecks, active: false },
  { label: "Team", icon: Users, active: false },
  { label: "Settings", icon: Settings, active: false },
];

export function Sidebar() {
  return (
    <aside
      className="hidden w-60 shrink-0 flex-col border-r border-line bg-white px-4 py-6 md:flex"
      aria-label="Primary"
    >
      <div className="mb-8 flex items-center gap-2 px-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-500 text-white">
          <Workflow className="h-[18px] w-[18px]" />
        </div>
        <span className="font-display text-base font-semibold">Flowline</span>
      </div>

      <nav className="flex flex-1 flex-col gap-1">
        {NAV_ITEMS.map(({ label, icon: Icon, active }) => (
          <a
            key={label}
            href="#"
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-colors",
              active
                ? "bg-teal-50 text-teal-600"
                : "text-ink-soft hover:bg-porcelain"
            )}
          >
            <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
            {label}
          </a>
        ))}
      </nav>

      <div className="rounded-xl bg-porcelain p-3">
        <p className="text-xs font-medium text-ink-soft">Sprint 14</p>
        <p className="mt-0.5 text-xs text-ink-faint">6 days remaining</p>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-line">
          <div className="h-full w-2/3 rounded-full bg-teal-500" />
        </div>
      </div>
    </aside>
  );
}
