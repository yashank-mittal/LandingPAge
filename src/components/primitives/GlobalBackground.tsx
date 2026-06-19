import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

/**
 * Site-wide ambient background. A single fixed layer that lives behind every
 * section: slow-drifting gradient orbs, a faint grid, animated grain, and a
 * cursor-following glow. All motion is GPU transforms / a couple of motion
 * values, so it stays cheap and respects prefers-reduced-motion.
 */
export function GlobalBackground() {
  // Cursor-follow spotlight (smoothed with a spring for inertia).
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.15);
  const sx = useSpring(mx, { stiffness: 60, damping: 20, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 60, damping: 20, mass: 0.6 });

  const spotlight = useTransform(
    [sx, sy],
    ([x, y]) =>
      `radial-gradient(650px circle at ${(x as number) * 100}% ${(y as number) * 100}%, color-mix(in oklab, var(--color-brand-500) 30%, transparent), transparent 60%)`,
  );

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    function onMove(e: PointerEvent) {
      mx.set(e.clientX / window.innerWidth);
      my.set(e.clientY / window.innerHeight);
    }
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink-950"
    >
      {/* Base grid, masked toward the top so edges stay clean */}
      <div className="absolute inset-0 bg-grid opacity-100 [mask-image:radial-gradient(ellipse_100%_80%_at_50%_0%,black,transparent_85%)]" />

      {/* Drifting gradient orbs */}
      <div
        className="absolute -top-40 left-[6%] h-[44rem] w-[44rem] rounded-full blur-[120px] animate-aurora"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, color-mix(in oklab, var(--color-brand-600) 90%, transparent), transparent 62%)",
          opacity: 0.7,
        }}
      />
      <div
        className="absolute top-[35%] -right-40 h-[42rem] w-[42rem] rounded-full blur-[120px] animate-aurora"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, color-mix(in oklab, var(--color-accent-cyan) 75%, transparent), transparent 62%)",
          animationDelay: "-7s",
          opacity: 0.5,
        }}
      />
      <div
        className="absolute bottom-[-12%] left-[28%] h-[40rem] w-[40rem] rounded-full blur-[120px] animate-aurora"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, color-mix(in oklab, var(--color-accent-fuchsia) 70%, transparent), transparent 62%)",
          animationDelay: "-13s",
          opacity: 0.45,
        }}
      />
      <div
        className="absolute top-[70%] right-[20%] h-[32rem] w-[32rem] rounded-full blur-[110px] animate-aurora"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, color-mix(in oklab, var(--color-accent-blue) 75%, transparent), transparent 62%)",
          animationDelay: "-4s",
          opacity: 0.45,
        }}
      />

      {/* Cursor-following glow */}
      <motion.div className="absolute inset-0" style={{ background: spotlight }} />

      {/* Fine animated grain to kill banding and add texture */}
      <div className="opacity-[0.08] mix-blend-soft-light grain" />
    </div>
  );
}
