import { type ReactNode } from "react";
import { motion } from "motion/react";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Delay before this element reveals (seconds). */
  delay?: number;
  /** Render as a stagger parent — direct <RevealItem> children animate in sequence. */
  stagger?: boolean;
  staggerAmount?: number;
  as?: "div" | "section" | "ul" | "span";
}

/**
 * Scroll-triggered reveal wrapper.
 * Use standalone for a single element, or with `stagger` + <RevealItem> for lists.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  stagger = false,
  staggerAmount = 0.09,
  as = "div",
}: RevealProps) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={cn(className)}
      variants={stagger ? staggerContainer(staggerAmount, delay) : fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      transition={stagger ? undefined : { delay }}
    >
      {children}
    </MotionTag>
  );
}

/** Child element for a staggered <Reveal stagger>. */
export function RevealItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "span";
}) {
  const MotionTag = motion[as];
  return (
    <MotionTag className={cn(className)} variants={fadeUp}>
      {children}
    </MotionTag>
  );
}
