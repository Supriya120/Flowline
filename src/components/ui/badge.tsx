import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

// A tiny, dumb presentational component: it receives a pre-resolved
// class string (from PRIORITY_META) rather than a `color` prop,
// so it never needs to know the app's business rules — it just
// renders a pill.
export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        className
      )}
      {...props}
    />
  );
}
