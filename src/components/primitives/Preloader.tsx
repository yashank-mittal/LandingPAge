import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

/**
 * Brief, elegant first-paint loader. Shows a brand mark + sweeping progress,
 * then curtains away to reveal the page. Skipped for reduced-motion users.
 */
export function Preloader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = setTimeout(() => setDone(true), reduce ? 0 : 1600);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center bg-ink-950"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex flex-col items-center gap-6">
            <motion.div
              initial={{ scale: 0.6, opacity: 0, rotate: -20 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 16 }}
              className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-accent-blue shadow-[0_8px_40px_-8px_var(--color-brand-500)]"
            >
              <svg viewBox="0 0 24 24" className="h-8 w-8 text-white" fill="currentColor">
                <path d="M12 2 L21 20 L12 16 L3 20 Z" />
              </svg>
            </motion.div>

            <div className="h-0.5 w-40 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full bg-gradient-to-r from-brand-500 to-accent-cyan"
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
