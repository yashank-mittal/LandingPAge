import { Twitter, Github, Linkedin, type LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Section";
import { Logo } from "@/components/ui/Logo";
import { motion } from "motion/react";

const COLUMNS: { title: string; links: string[] }[] = [
  { title: "Product", links: ["Features", "Showcase", "Pricing", "Changelog", "Roadmap"] },
  { title: "Company", links: ["About", "Careers", "Blog", "Customers", "Contact"] },
  { title: "Resources", links: ["Docs", "API", "Community", "Status", "Security"] },
  { title: "Legal", links: ["Privacy", "Terms", "DPA", "Cookies"] },
];

const SOCIALS: { icon: LucideIcon; label: string }[] = [
  { icon: Twitter, label: "Twitter" },
  { icon: Github, label: "GitHub" },
  { icon: Linkedin, label: "LinkedIn" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 pt-20">
      {/* giant ghost wordmark */}
      <div className="pointer-events-none absolute inset-x-0 -bottom-10 select-none text-center text-[22vw] font-bold leading-none tracking-tighter text-white/[0.025]">
        Aether
      </div>

      <Container className="relative">
        <div className="grid gap-12 pb-16 lg:grid-cols-[1.5fr_2fr]">
          {/* Brand column */}
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/45">
              The intelligence layer for modern teams. Unify your work, automate
              the busywork, and ship faster.
            </p>
            <div className="mt-6 flex gap-2.5">
              {SOCIALS.map((s) => (
                <motion.a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  whileHover={{ y: -3, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="grid h-10 w-10 place-items-center rounded-xl glass text-white/60 hover:text-white"
                >
                  <s.icon className="h-4.5 w-4.5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <h4 className="text-sm font-semibold text-white/80">{col.title}</h4>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a
                        href="#"
                        className="group inline-flex text-sm text-white/45 transition-colors hover:text-white"
                      >
                        <span className="relative">
                          {l}
                          <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-white transition-all duration-300 group-hover:w-full" />
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-8 text-sm text-white/40 sm:flex-row">
          <p>© 2026 Aether Labs, Inc. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            All systems operational
          </div>
        </div>
      </Container>
    </footer>
  );
}
