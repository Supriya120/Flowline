import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "h-10 w-full rounded-xl border border-line bg-white px-3 text-sm text-ink placeholder:text-ink-faint outline-none transition-colors focus:border-teal-500",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";
