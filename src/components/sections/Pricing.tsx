import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, Sparkles } from "lucide-react";
import { Section, Container, SectionHeading } from "@/components/ui/Section";
import { Reveal, RevealItem } from "@/components/primitives/Reveal";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/primitives/Magnetic";
import { cn } from "@/lib/utils";

interface Plan {
  name: string;
  monthly: number;
  yearly: number;
  blurb: string;
  features: string[];
  cta: string;
  featured?: boolean;
}

const PLANS: Plan[] = [
  {
    name: "Starter",
    monthly: 0,
    yearly: 0,
    blurb: "For individuals exploring what AI-native work feels like.",
    features: [
      "Up to 3 projects",
      "Core automation agents",
      "1,000 actions / month",
      "Community support",
    ],
    cta: "Start free",
  },
  {
    name: "Pro",
    monthly: 24,
    yearly: 19,
    blurb: "For growing teams that live in their workspace.",
    features: [
      "Unlimited projects",
      "Advanced agents & workflows",
      "50,000 actions / month",
      "Priority support",
      "Analytics & insights",
      "SSO & roles",
    ],
    cta: "Start 14-day trial",
    featured: true,
  },
  {
    name: "Enterprise",
    monthly: 0,
    yearly: 0,
    blurb: "For organizations with scale and compliance needs.",
    features: [
      "Everything in Pro",
      "Unlimited actions",
      "Dedicated infrastructure",
      "SOC 2 & HIPAA reports",
      "White-glove onboarding",
      "99.99% uptime SLA",
    ],
    cta: "Talk to sales",
  },
];

export function Pricing() {
  const [yearly, setYearly] = useState(true);

  return (
    <Section id="pricing">
      <Container>
        <SectionHeading
          eyebrow="Pricing"
          title="Simple plans that"
          accent="scale with you"
          subtitle="Start free, upgrade when it pays for itself. No seat-count games, no surprise overages."
        />

        {/* Billing toggle */}
        <Reveal className="mt-10 flex items-center justify-center gap-4">
          <span className={cn("text-sm", !yearly ? "text-white" : "text-white/45")}>
            Monthly
          </span>
          <button
            onClick={() => setYearly((v) => !v)}
            className="relative h-7 w-14 rounded-full glass p-1"
            aria-label="Toggle billing period"
          >
            <motion.span
              className="block h-5 w-5 rounded-full bg-gradient-to-br from-brand-400 to-accent-blue"
              animate={{ x: yearly ? 28 : 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </button>
          <span className={cn("text-sm", yearly ? "text-white" : "text-white/45")}>
            Yearly
          </span>
          <span className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-xs font-medium text-emerald-400">
            Save 20%
          </span>
        </Reveal>

        <Reveal
          stagger
          staggerAmount={0.1}
          className="mt-14 grid items-stretch gap-6 lg:grid-cols-3"
        >
          {PLANS.map((plan) => (
            <RevealItem key={plan.name}>
              <PricingCard plan={plan} yearly={yearly} />
            </RevealItem>
          ))}
        </Reveal>
      </Container>
    </Section>
  );
}

function PricingCard({ plan, yearly }: { plan: Plan; yearly: boolean }) {
  const price = yearly ? plan.yearly : plan.monthly;
  const isCustom = plan.name === "Enterprise";

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className={cn(
        "relative flex h-full flex-col overflow-hidden rounded-3xl p-8",
        plan.featured
          ? "glass-strong ring-highlight"
          : "border border-white/10 bg-white/[0.02]",
      )}
    >
      {plan.featured && (
        <>
          <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-brand-500/15 to-transparent" />
          <div className="absolute right-6 top-6">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-500/20 px-3 py-1 text-xs font-medium text-brand-200">
              <Sparkles className="h-3 w-3" />
              Most popular
            </span>
          </div>
        </>
      )}

      <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-white/50">{plan.blurb}</p>

      <div className="mt-6 flex items-end gap-1">
        {isCustom ? (
          <span className="text-4xl font-semibold tracking-tight text-white">
            Custom
          </span>
        ) : (
          <>
            <span className="text-5xl font-semibold tracking-tight text-white">
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={price}
                  initial={{ y: 14, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -14, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="inline-block"
                >
                  ${price}
                </motion.span>
              </AnimatePresence>
            </span>
            <span className="mb-1.5 text-sm text-white/45">/ mo</span>
          </>
        )}
      </div>

      <div className="my-7 h-px bg-white/10" />

      <ul className="flex flex-1 flex-col gap-3.5">
        {plan.features.map((f) => (
          <li key={f} className="flex items-center gap-3 text-sm text-white/70">
            <span
              className={cn(
                "grid h-5 w-5 shrink-0 place-items-center rounded-full",
                plan.featured
                  ? "bg-brand-500/30 text-brand-100"
                  : "bg-white/[0.06] text-white/60",
              )}
            >
              <Check className="h-3 w-3" />
            </span>
            {f}
          </li>
        ))}
      </ul>

      <div className="mt-8">
        {plan.featured ? (
          <Magnetic strength={0.3} className="w-full">
            <Button className="w-full">{plan.cta}</Button>
          </Magnetic>
        ) : (
          <Button variant="secondary" className="w-full">
            {plan.cta}
          </Button>
        )}
      </div>
    </motion.div>
  );
}
