import { Container } from "@/components/ui/Section";
import { Reveal, RevealItem } from "@/components/primitives/Reveal";
import { CountUp } from "@/components/primitives/CountUp";

const STATS = [
  { to: 28, suffix: "K+", label: "Teams shipping with Aether" },
  { to: 4.2, decimals: 1, suffix: "M", label: "Tasks automated weekly" },
  { to: 38, suffix: "%", label: "Average velocity increase" },
  { to: 99.99, decimals: 2, suffix: "%", label: "Uptime, every quarter" },
];

export function Stats() {
  return (
    <section className="relative py-24 sm:py-28">
      {/* gradient divider glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-px max-w-5xl bg-gradient-to-r from-transparent via-brand-500/50 to-transparent" />

      <Container>
        <Reveal
          stagger
          staggerAmount={0.12}
          className="grid grid-cols-2 gap-y-12 text-center lg:grid-cols-4"
        >
          {STATS.map((s) => (
            <RevealItem key={s.label}>
              <div className="flex flex-col items-center gap-2">
                <p className="text-5xl font-semibold tracking-tight text-gradient sm:text-6xl">
                  <CountUp
                    to={s.to}
                    decimals={s.decimals ?? 0}
                    suffix={s.suffix}
                  />
                </p>
                <p className="max-w-[12rem] text-sm text-white/50">{s.label}</p>
              </div>
            </RevealItem>
          ))}
        </Reveal>
      </Container>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto h-px max-w-5xl bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}
