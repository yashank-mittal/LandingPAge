import { motion } from "motion/react";
import { Globe2, Lock, Gauge, Layers, Puzzle } from "lucide-react";
import { Section, Container, SectionHeading } from "@/components/ui/Section";
import { Reveal, RevealItem } from "@/components/primitives/Reveal";
import { TiltCard } from "@/components/primitives/TiltCard";
import { cn } from "@/lib/utils";

function Cell({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <RevealItem className={className}>
      <div className="group h-full">
        <TiltCard
          intensity={6}
          className="relative h-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-7 ring-highlight"
        >
          {children}
        </TiltCard>
      </div>
    </RevealItem>
  );
}

export function Bento() {
  return (
    <Section>
      <Container>
        <SectionHeading
          eyebrow="Built different"
          title="Power under"
          accent="every pixel"
          subtitle="The details you feel but never have to think about — performance, reach, and security engineered to fade into the background."
        />

        <Reveal
          stagger
          staggerAmount={0.1}
          className="mt-16 grid auto-rows-[minmax(220px,auto)] grid-cols-1 gap-5 md:grid-cols-3"
        >
          {/* Global edge network — large */}
          <Cell className="md:col-span-2 md:row-span-2">
            <div className="relative flex h-full flex-col justify-between">
              <div>
                <span className="inline-grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/5 text-accent-cyan">
                  <Globe2 className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-2xl font-semibold tracking-tight text-white">
                  A planet-scale edge network
                </h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-white/50">
                  300+ points of presence keep your workspace milliseconds away,
                  wherever your team logs in. No regions to configure, ever.
                </p>
              </div>

              {/* animated globe / orbits */}
              <div className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 opacity-80">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-full border border-white/10"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-6 rounded-full border border-white/10"
                />
                <div className="absolute inset-12 rounded-full bg-gradient-to-br from-brand-500/40 to-accent-cyan/20 blur-md" />
                {[...Array(6)].map((_, i) => (
                  <motion.span
                    key={i}
                    className="absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full bg-accent-cyan"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 12 + i * 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    style={{
                      transformOrigin: `0px ${40 + i * 14}px`,
                    }}
                  />
                ))}
              </div>
            </div>
          </Cell>

          {/* Uptime */}
          <Cell>
            <div className="flex h-full flex-col justify-between">
              <span className="inline-grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/5 text-emerald-400">
                <Gauge className="h-5 w-5" />
              </span>
              <div>
                <p className="text-4xl font-semibold tracking-tight text-gradient">
                  99.99%
                </p>
                <p className="mt-1 text-sm text-white/50">
                  uptime, backed by a real SLA
                </p>
              </div>
            </div>
          </Cell>

          {/* Security */}
          <Cell>
            <div className="flex h-full flex-col justify-between">
              <span className="inline-grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/5 text-brand-300">
                <Lock className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-lg font-semibold tracking-tight text-white">
                  Encrypted end to end
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-white/50">
                  SOC 2, HIPAA, and GDPR ready out of the box.
                </p>
              </div>
            </div>
          </Cell>

          {/* Integrations — wide */}
          <Cell className="md:col-span-2">
            <div className="flex h-full items-center justify-between gap-6">
              <div>
                <span className="inline-grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/5 text-accent-fuchsia">
                  <Puzzle className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-lg font-semibold tracking-tight text-white">
                  Plugs into everything
                </h3>
                <p className="mt-1.5 max-w-xs text-sm leading-relaxed text-white/50">
                  80+ native integrations and a typed API. If it has an endpoint,
                  Aether can orchestrate it.
                </p>
              </div>
              <div className="hidden shrink-0 grid-cols-3 gap-2.5 sm:grid">
                {[...Array(9)].map((_, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.6 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.04 }}
                    whileHover={{ scale: 1.12, y: -2 }}
                    className={cn(
                      "grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/[0.04]",
                    )}
                  >
                    <Layers className="h-4 w-4 text-white/40" />
                  </motion.span>
                ))}
              </div>
            </div>
          </Cell>
        </Reveal>
      </Container>
    </Section>
  );
}
