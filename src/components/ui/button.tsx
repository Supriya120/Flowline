import { ButtonHTMLAttributes, forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// cva defines every valid style combination up front (variant x
// size) instead of scattering conditional className strings across
// the app — every button in Flowline is guaranteed to come from
// this one, consistent set of choices.
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-xl text-sm font-medium transition-all duration-150 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary: "bg-teal-500 text-white shadow-sm hover:bg-teal-600",
        secondary:
          "bg-white text-ink border border-line hover:bg-porcelain",
        ghost: "text-ink-soft hover:bg-porcelain",
        danger: "text-coral-500 hover:bg-coral-100",
      },
      size: {
        sm: "h-8 px-3",
        md: "h-10 px-4",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

// forwardRef so parents (e.g. Radix's Dialog trigger) can attach a
// ref for focus management — a plain functional component would
// swallow that ref and break accessibility handoff.
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
);
Button.displayName = "Button";
