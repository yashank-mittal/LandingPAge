import { cn } from "@/lib/utils";

/** Aether wordmark + animated mark. */
export function Logo({ className }: { className?: string }) {
  return (
    <a href="#" className={cn("group flex items-center gap-2.5", className)}>
      <span className="relative grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-brand-500 to-accent-blue shadow-[0_4px_20px_-4px_var(--color-brand-500)]">
        <svg viewBox="0 0 24 24" className="h-4.5 w-4.5 text-white" fill="none">
          <path
            d="M12 2 L21 20 L12 16 L3 20 Z"
            fill="currentColor"
            className="transition-transform duration-500 group-hover:rotate-[8deg]"
            style={{ transformOrigin: "center" }}
          />
        </svg>
      </span>
      <span className="text-lg font-semibold tracking-tight text-white">
        Aether
      </span>
    </a>
  );
}
