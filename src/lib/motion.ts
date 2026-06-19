import type { Variants, Transition } from "motion/react";

/* ----------------------------------------------------------------------------
   Shared motion language
   A small set of reusable variants + transitions so every section animates
   with the same physical "feel". Import these instead of redefining locally.
---------------------------------------------------------------------------- */

export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
export const EASE_IN_OUT_QUART = [0.76, 0, 0.24, 1] as const;

export const spring: Transition = {
  type: "spring",
  stiffness: 220,
  damping: 28,
  mass: 0.9,
};

export const softSpring: Transition = {
  type: "spring",
  stiffness: 120,
  damping: 20,
};

/** Fade + rise + de-blur. The signature "reveal" used across the page. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: EASE_OUT_EXPO },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.9, ease: EASE_OUT_EXPO } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92, filter: "blur(8px)" },
  show: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE_OUT_EXPO },
  },
};

/** Parent that staggers its children's reveal. */
export const staggerContainer = (stagger = 0.09, delay = 0): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
});

/** Standard viewport config so sections fire once, a bit before fully in view. */
export const viewportOnce = { once: true, amount: 0.3, margin: "0px 0px -10% 0px" };
