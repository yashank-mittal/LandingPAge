import { type ReactNode, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  /** Max rotation in degrees. */
  intensity?: number;
  /** Show the cursor-tracking spotlight glow. */
  glare?: boolean;
}

/**
 * 3D tilt card that follows the pointer with a spring, plus an optional
 * radial "spotlight" that tracks the cursor. Used for interactive cards.
 */
export function TiltCard({
  children,
  className,
  intensity = 10,
  glare = true,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(py, [0, 1], [intensity, -intensity]), {
    stiffness: 220,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(px, [0, 1], [-intensity, intensity]), {
    stiffness: 220,
    damping: 22,
  });

  const glareX = useTransform(px, (v) => `${v * 100}%`);
  const glareY = useTransform(py, (v) => `${v * 100}%`);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  }

  function reset() {
    px.set(0.5);
    py.set(0.5);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", transformPerspective: 1000 }}
      className={cn("relative", className)}
    >
      {children}
      {glare && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 [will-change:opacity] group-hover:opacity-100"
          style={{
            background: useTransform(
              [glareX, glareY],
              ([gx, gy]) =>
                `radial-gradient(420px circle at ${gx} ${gy}, color-mix(in oklab, var(--color-brand-400) 22%, transparent), transparent 60%)`,
            ),
          }}
        />
      )}
    </motion.div>
  );
}
