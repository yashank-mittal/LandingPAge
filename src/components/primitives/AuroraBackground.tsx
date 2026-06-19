import { cn } from "@/lib/utils";

/**
 * Animated ambient background — slow-drifting aurora blobs + grid + noise.
 * Pure CSS animation (GPU transforms) so it's cheap and respects reduced-motion.
 */
export function AuroraBackground({
  className,
  variant = "default",
}: {
  className?: string;
  variant?: "default" | "subtle";
}) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden>
      {/* Grid */}
      <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" />

      {/* Aurora blobs */}
      <div
        className="absolute -top-40 left-1/2 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full blur-[120px] animate-aurora"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, color-mix(in oklab, var(--color-brand-600) 70%, transparent), transparent 60%)",
          opacity: variant === "subtle" ? 0.4 : 0.7,
        }}
      />
      <div
        className="absolute top-20 -left-24 h-[34rem] w-[34rem] rounded-full blur-[120px] animate-aurora"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, color-mix(in oklab, var(--color-accent-cyan) 55%, transparent), transparent 60%)",
          animationDelay: "-6s",
          opacity: variant === "subtle" ? 0.3 : 0.55,
        }}
      />
      <div
        className="absolute top-10 -right-24 h-[32rem] w-[32rem] rounded-full blur-[120px] animate-aurora"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, color-mix(in oklab, var(--color-accent-fuchsia) 50%, transparent), transparent 60%)",
          animationDelay: "-12s",
          opacity: variant === "subtle" ? 0.25 : 0.45,
        }}
      />

      {/* Vignette to ground the content */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_120%,transparent,var(--color-ink-950))]" />
    </div>
  );
}
