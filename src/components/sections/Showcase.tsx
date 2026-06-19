import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Bot,
  GanttChartSquare,
  Radar,
  Check,
  type LucideIcon,
} from "lucide-react";
import { Section, Container, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/primitives/Reveal";
import { cn } from "@/lib/utils";

interface Tab {
  id: string;
  icon: LucideIcon;
  label: string;
  title: string;
  description: string;
  bullets: string[];
  accent: string;
}

const TABS: Tab[] = [
  {
    id: "agents",
    icon: Bot,
    label: "Agents",
    title: "Agents that actually finish the job",
    description:
      "Describe an outcome in plain language. Aether's agents plan the steps, pull the context, and execute across your tools — then hand you a reviewable summary.",
    bullets: [
      "Multi-step reasoning with full audit trails",
      "Human-in-the-loop approvals on sensitive actions",
      "Runs on your data, never trained on it",
    ],
    accent: "from-brand-500/30 to-accent-fuchsia/10",
  },
  {
    id: "planning",
    icon: GanttChartSquare,
    label: "Planning",
    title: "Roadmaps that update themselves",
    description:
      "Scope, estimate, and sequence work in a living plan. As reality shifts, Aether re-forecasts timelines and flags risk before it becomes a fire.",
    bullets: [
      "Auto-estimation from historical velocity",
      "Dependency-aware critical path detection",
      "One-click status rollups for stakeholders",
    ],
    accent: "from-accent-blue/30 to-brand-500/10",
  },
  {
    id: "insights",
    icon: Radar,
    label: "Insights",
    title: "See the whole system at a glance",
    description:
      "A unified signal layer turns scattered activity into clear answers. Ask anything about your org and get an instant, sourced response.",
    bullets: [
      "Natural-language analytics, no SQL needed",
      "Anomaly alerts pushed to the right people",
      "Composable dashboards in seconds",
    ],
    accent: "from-accent-cyan/30 to-accent-blue/10",
  },
];

export function Showcase() {
  const [active, setActive] = useState(TABS[0].id);
  const tab = TABS.find((t) => t.id === active)!;

  return (
    <Section id="showcase" className="overflow-hidden">
      <Container>
        <SectionHeading
          eyebrow="The product"
          title="One workspace,"
          accent="endless leverage"
          subtitle="Switch between the three pillars of Aether. Each is powerful alone — together they compound."
        />

        {/* Tab switcher */}
        <Reveal className="mt-14 flex justify-center">
          <div className="glass inline-flex flex-wrap justify-center gap-1 rounded-2xl p-1.5">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setActive(t.id)}
                className={cn(
                  "relative flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors",
                  active === t.id ? "text-white" : "text-white/50 hover:text-white/80",
                )}
              >
                {active === t.id && (
                  <motion.span
                    layoutId="showcase-pill"
                    className="absolute inset-0 rounded-xl bg-white/10 ring-highlight"
                    transition={{ type: "spring", stiffness: 320, damping: 30 }}
                  />
                )}
                <t.icon className="relative z-10 h-4 w-4" />
                <span className="relative z-10">{t.label}</span>
              </button>
            ))}
          </div>
        </Reveal>

        {/* Content */}
        <div className="mt-12 grid items-center gap-10 lg:grid-cols-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab.id}
              initial={{ opacity: 0, x: -24, filter: "blur(8px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: 24, filter: "blur(8px)" }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <h3 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                {tab.title}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-white/55">
                {tab.description}
              </p>
              <ul className="mt-6 space-y-3">
                {tab.bullets.map((b, i) => (
                  <motion.li
                    key={b}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.08 }}
                    className="flex items-center gap-3 text-sm text-white/70"
                  >
                    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-500/25 text-brand-200">
                      <Check className="h-3 w-3" />
                    </span>
                    {b}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>

          {/* Visual */}
          <AnimatePresence mode="wait">
            <motion.div
              key={tab.id + "-visual"}
              initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 glass-strong ring-highlight"
            >
              <div className={cn("absolute inset-0 bg-gradient-to-br", tab.accent)} />
              <div className="absolute inset-0 bg-dot opacity-40" />
              <ShowcaseVisual tab={tab} />
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </Section>
  );
}

/** Abstract animated illustration that differs per tab. */
function ShowcaseVisual({ tab }: { tab: Tab }) {
  return (
    <div className="relative grid h-full place-items-center p-8">
      <motion.span
        animate={{ rotate: 360 }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        className="absolute h-56 w-56 rounded-full border border-white/10"
      />
      <motion.span
        animate={{ rotate: -360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute h-40 w-40 rounded-full border border-dashed border-white/15"
      />
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 18, delay: 0.1 }}
        className="glass-strong relative z-10 grid h-20 w-20 place-items-center rounded-2xl text-white"
      >
        <tab.icon className="h-9 w-9 text-brand-200" />
      </motion.div>

      {/* orbiting chips */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute"
          animate={{ rotate: 360 }}
          transition={{ duration: 14 + i * 4, repeat: Infinity, ease: "linear" }}
          style={{ width: 224, height: 224 }}
        >
          <span
            className="glass absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 rounded-full bg-brand-300"
            style={{ transform: `rotate(${i * 120}deg)` }}
          />
        </motion.div>
      ))}
    </div>
  );
}
