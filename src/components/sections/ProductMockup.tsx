import { motion } from "motion/react";
import {
  Search,
  LayoutGrid,
  Inbox,
  Calendar,
  Settings,
  Sparkles,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";

const SIDEBAR = [
  { icon: LayoutGrid, label: "Overview", active: true },
  { icon: Inbox, label: "Inbox", badge: "12" },
  { icon: Calendar, label: "Roadmap" },
  { icon: Settings, label: "Settings" },
];

const TASKS = [
  { title: "Ship onboarding redesign", done: true, tag: "Design" },
  { title: "Draft Q3 launch narrative", done: true, tag: "Marketing" },
  { title: "Resolve auth edge cases", done: false, tag: "Engineering" },
  { title: "Sync pricing experiments", done: false, tag: "Growth" },
];

/** Realistic SaaS dashboard mockup used as the hero visual. */
export function ProductMockup() {
  return (
    <div className="relative">
      {/* Glow behind the panel */}
      <div className="absolute -inset-x-10 -top-10 bottom-0 -z-10 rounded-[2rem] bg-gradient-to-b from-brand-500/30 via-accent-blue/10 to-transparent blur-3xl" />

      <div className="glass-strong ring-highlight overflow-hidden rounded-2xl">
        {/* Top bar */}
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-red-400/80" />
            <span className="h-3 w-3 rounded-full bg-amber-400/80" />
            <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
          </div>
          <div className="mx-auto flex w-full max-w-sm items-center gap-2 rounded-lg bg-white/5 px-3 py-1.5 text-xs text-white/40">
            <Search className="h-3.5 w-3.5" />
            Ask Aether anything…
            <kbd className="ml-auto rounded bg-white/10 px-1.5 py-0.5 text-[10px]">⌘K</kbd>
          </div>
        </div>

        <div className="grid grid-cols-[200px_1fr] max-sm:grid-cols-1">
          {/* Sidebar */}
          <div className="border-r border-white/10 p-3 max-sm:hidden">
            <div className="space-y-1">
              {SIDEBAR.map((item) => (
                <div
                  key={item.label}
                  className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm ${
                    item.active
                      ? "bg-white/10 text-white"
                      : "text-white/50 hover:bg-white/5"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                  {item.badge && (
                    <span className="ml-auto rounded-full bg-brand-500/30 px-1.5 text-[10px] text-brand-200">
                      {item.badge}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Main content */}
          <div className="p-5">
            {/* Stat cards */}
            <div className="grid grid-cols-3 gap-3 max-sm:grid-cols-1">
              {[
                { label: "Velocity", value: "+38%", sub: "this sprint" },
                { label: "Cycle time", value: "1.4d", sub: "−22% wow" },
                { label: "Automated", value: "612", sub: "tasks / wk" },
              ].map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3 + i * 0.12 }}
                  className="rounded-xl border border-white/10 bg-white/[0.03] p-3"
                >
                  <p className="text-xs text-white/40">{s.label}</p>
                  <p className="mt-1 text-xl font-semibold text-white">{s.value}</p>
                  <p className="flex items-center gap-1 text-[11px] text-emerald-400">
                    <TrendingUp className="h-3 w-3" />
                    {s.sub}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* AI insight banner */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.7 }}
              className="mt-4 flex items-center gap-3 rounded-xl border border-brand-500/30 bg-gradient-to-r from-brand-500/15 to-transparent p-3"
            >
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-brand-500/30">
                <Sparkles className="h-4 w-4 text-brand-200" />
              </span>
              <p className="text-xs text-white/70">
                <span className="font-medium text-white">Aether suggests:</span>{" "}
                Re-prioritize 3 stale tickets to hit your Friday milestone.
              </p>
            </motion.div>

            {/* Task list */}
            <div className="mt-4 space-y-1.5">
              {TASKS.map((t, i) => (
                <motion.div
                  key={t.title}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.9 + i * 0.1 }}
                  className="flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-white/5"
                >
                  <CheckCircle2
                    className={`h-4 w-4 ${
                      t.done ? "text-emerald-400" : "text-white/25"
                    }`}
                  />
                  <span
                    className={`text-sm ${
                      t.done ? "text-white/40 line-through" : "text-white/80"
                    }`}
                  >
                    {t.title}
                  </span>
                  <span className="ml-auto rounded-md bg-white/5 px-2 py-0.5 text-[10px] text-white/40">
                    {t.tag}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating accent cards */}
      <motion.div
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="glass-strong ring-highlight absolute -left-6 top-1/3 hidden rounded-xl p-3 sm:block"
      >
        <div className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-500/20">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          </span>
          <div>
            <p className="text-xs font-medium text-white">Deploy passed</p>
            <p className="text-[10px] text-white/40">in 48 seconds</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 16, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="glass-strong ring-highlight absolute -right-5 bottom-12 hidden rounded-xl p-3 sm:block"
      >
        <div className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-500/25">
            <Sparkles className="h-4 w-4 text-brand-200" />
          </span>
          <div>
            <p className="text-xs font-medium text-white">12 tasks automated</p>
            <p className="text-[10px] text-white/40">saved ~3.5 hrs</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
