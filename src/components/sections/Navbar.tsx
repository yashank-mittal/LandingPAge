import { useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react";
import { Menu, X, ArrowRight } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/primitives/Magnetic";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Showcase", href: "#showcase" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 24);
  });

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
    >
      <motion.nav
        animate={{
          width: scrolled ? "min(56rem, 100%)" : "min(72rem, 100%)",
          paddingTop: scrolled ? 8 : 12,
          paddingBottom: scrolled ? 8 : 12,
        }}
        transition={{ type: "spring", stiffness: 220, damping: 30 }}
        className={cn(
          "relative flex items-center justify-between rounded-2xl px-4 sm:px-5",
          scrolled ? "glass-strong ring-highlight" : "bg-transparent",
        )}
      >
        <Logo />

        {/* Desktop links */}
        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative rounded-full px-4 py-2 text-sm text-white/60 transition-colors hover:text-white"
            >
              <span className="relative z-10">{link.label}</span>
              <span className="absolute inset-0 scale-90 rounded-full bg-white/[0.06] opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100" />
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" size="sm">
            Sign in
          </Button>
          <Magnetic strength={0.4}>
            <Button size="sm">
              Get started
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Button>
          </Magnetic>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-xl text-white/80 hover:bg-white/5 md:hidden"
          aria-label="Toggle menu"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={open ? "x" : "menu"}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </motion.span>
          </AnimatePresence>
        </button>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(8px)" }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="glass-strong absolute inset-x-4 top-20 flex flex-col gap-1 rounded-2xl p-3 md:hidden"
          >
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * i }}
                className="rounded-xl px-4 py-3 text-sm text-white/70 hover:bg-white/5 hover:text-white"
              >
                {link.label}
              </motion.a>
            ))}
            <div className="mt-2 flex flex-col gap-2 border-t border-white/10 pt-3">
              <Button variant="secondary" size="sm">
                Sign in
              </Button>
              <Button size="sm">Get started</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
