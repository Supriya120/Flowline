import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Standard shadcn/ui helper: merges conditional class names and
// resolves conflicting Tailwind utilities (e.g. "p-2" vs "p-4")
// so the last one wins instead of both being applied.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDueDate(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function isOverdue(iso: string, status: string): boolean {
  if (status === "done") return false;
  return new Date(iso).getTime() < new Date().setHours(0, 0, 0, 0);
}
