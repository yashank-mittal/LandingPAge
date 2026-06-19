import { useEffect, useRef } from "react";
import {
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  motion,
} from "motion/react";

interface CountUpProps {
  to: number;
  from?: number;
  /** Decimal places to show. */
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

/**
 * Spring-driven number that counts up when scrolled into view.
 * Uses a motion value + transform so React isn't re-rendered every frame.
 */
export function CountUp({
  to,
  from = 0,
  decimals = 0,
  prefix = "",
  suffix = "",
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });

  const value = useMotionValue(from);
  const spring = useSpring(value, { stiffness: 90, damping: 24, mass: 1 });
  const display = useTransform(spring, (v) =>
    `${prefix}${v.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })}${suffix}`,
  );

  useEffect(() => {
    if (inView) value.set(to);
  }, [inView, to, value]);

  return (
    <motion.span ref={ref} className={className}>
      {display}
    </motion.span>
  );
}
