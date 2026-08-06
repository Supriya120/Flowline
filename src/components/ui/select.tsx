import { SelectHTMLAttributes, forwardRef } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

// Deliberately a native <select>, not a custom Radix listbox.
// Priority filtering is a simple, short, single-choice list —
// the native element already gives us keyboard support, screen
// reader semantics, and mobile-native pickers for free, so
// reaching for a heavier custom component here would be adding
// complexity the interaction doesn't need.
export const Select = forwardRef<
  HTMLSelectElement,
  SelectHTMLAttributes<HTMLSelectElement>
>(({ className, children, ...props }, ref) => (
  <div className="relative">
    <select
      ref={ref}
      className={cn(
        "h-10 w-full appearance-none rounded-xl border border-line bg-white pl-3 pr-9 text-sm text-ink outline-none transition-colors focus:border-teal-500",
        className
      )}
      {...props}
    >
      {children}
    </select>
    <ChevronDown
      className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint"
      aria-hidden="true"
    />
  </div>
));
Select.displayName = "Select";
