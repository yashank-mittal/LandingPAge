import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  type MotionValue,
} from "motion/react";
import {
  Sparkles,
  GitBranch,
  ShieldCheck,
  Zap,
  Workflow,
  LineChart,
  type LucideIcon,
} from "lucide-react";
import { Section, Container, SectionHeading } from "@/components/ui/Section";
import { Reveal, RevealItem } from "@/components/primitives/Reveal";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FEATURES: Feature[] = [
  {
    icon: Sparkles,
    title: "Agentic automation",
    description:
      "Delegate multi-step work to agents that read context, take action, and report back — no brittle scripts required.",
  },
  {
    icon: GitBranch,
    title: "Native to your stack",
    description:
      "Two-way sync with GitHub, Slack, Figma, and 80+ tools. Aether meets your team exactly where it already works.",
  },
  {
    icon: Zap,
    title: "Sub-50ms everything",
    description:
      "A local-first engine keeps every keystroke instant. Search, navigation, and edits feel like they're rendered locally.",
  },
  {
    icon: Workflow,
    title: "Composable workflows",
    description:
      "Chain triggers, conditions, and actions visually. Ship a custom pipeline in minutes, not a sprint.",
  },
  {
    icon: ShieldCheck,
    title: "Enterprise-grade trust",
    description:
      "SOC 2 Type II, SAML SSO, granular roles, and end-to-end encryption. Security that satisfies your toughest reviewer.",
  },
  {
    icon: LineChart,
    title: "Signal, not noise",
    description:
      "Real-time analytics surface what's blocking momentum and quietly handle the rest before it reaches you.",
  },
];

function FeatureCard({ feature }: { feature: Feature }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set(e.clientX - rect.left);
    my.set(e.clientY - rect.top);
  }

  return (
    <RevealItem>
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-7"
      >
        {/* cursor spotlight */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: useMotionTemplate(mx, my),
          }}
        />
        <div className="relative">
          <span className="inline-grid h-12 w-12 place-items-center rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-transparent text-brand-300 transition-colors duration-300 group-hover:text-brand-200">
            <feature.icon className="h-5.5 w-5.5" />
          </span>
          <h3 className="mt-5 text-lg font-semibold tracking-tight text-white">
            {feature.title}
          </h3>
          <p className="mt-2.5 text-sm leading-relaxed text-white/50">
            {feature.description}
          </p>
        </div>
      </motion.div>
    </RevealItem>
  );
}

// helper: build a radial-gradient motion template from x/y motion values
function useMotionTemplate(mx: MotionValue<number>, my: MotionValue<number>) {
  return useTransform([mx, my], ([x, y]) =>
    `radial-gradient(340px circle at ${x}px ${y}px, color-mix(in oklab, var(--color-brand-500) 16%, transparent), transparent 70%)`,
  );
}

export function Features() {
  return (
    <Section id="features">
      <Container>
        <SectionHeading
          eyebrow="Why Aether"
          title="Everything you need to"
          accent="move faster"
          subtitle="A complete operating system for product teams — thoughtfully designed, obsessively fast, and built to disappear into your flow."
        />

        <Reveal
          stagger
          staggerAmount={0.08}
          className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {FEATURES.map((f) => (
            <FeatureCard key={f.title} feature={f} />
          ))}
        </Reveal>
      </Container>
    </Section>
  );
}
