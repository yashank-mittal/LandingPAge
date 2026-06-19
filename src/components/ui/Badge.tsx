import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Small glassy pill used as section eyebrow / status chip. */
export function Badge({
  children,
  className,
  dot = true,
}: {
  children: ReactNode;
  className?: string;
  dot?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 text-xs font-medium tracking-wide text-white/70",
        className,
      )}
    >
      {dot && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-400" />
        </span>
      )}
      {children}
    </span>
  );
}
