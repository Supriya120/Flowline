import { Inbox } from "lucide-react";

// A dedicated empty state instead of an inline "if length === 0"
// scattered across columns — it gives the "nothing here" moment an
// intentional voice (per UX guidance: emptiness is direction, not
// an afterthought) and keeps that copy in one editable place.
interface EmptyStateProps {
  message: string;
}

export function EmptyState({ message }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-line py-10 text-center">
      <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-porcelain text-ink-faint">
        <Inbox className="h-4 w-4" aria-hidden="true" />
      </div>
      <p className="max-w-[16rem] text-xs text-ink-faint">{message}</p>
    </div>
  );
}
