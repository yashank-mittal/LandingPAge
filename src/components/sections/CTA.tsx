import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/primitives/Magnetic";
import { Reveal } from "@/components/primitives/Reveal";

export function CTA() {
  return (
    <section className="relative py-24 sm:py-32">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 px-6 py-20 text-center sm:px-16">
            {/* animated gradient field */}
            <div className="pointer-events-none absolute inset-0 -z-10">
              <div className="absolute inset-0 bg-gradient-to-b from-brand-600/25 via-ink-900 to-ink-950" />
              <motion.div
                className="absolute -top-1/2 left-1/2 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full blur-[120px]"
                style={{
                  background:
                    "radial-gradient(circle, color-mix(in oklab, var(--color-brand-500) 60%, transparent), transparent 60%)",
                }}
                animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.85, 0.6] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="absolute inset-0 bg-grid opacity-30 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)]" />
            </div>

            <h2 className="mx-auto max-w-3xl text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
              Ship at the speed
              <br />
              of <span className="font-serif italic text-gradient">thought</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-pretty text-lg text-white/60">
              Join 28,000+ teams who replaced their tangle of tools with one
              intelligent workspace. Your free trial is ready.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Magnetic strength={0.4}>
                <Button size="lg">
                  Start for free
                  <ArrowRight className="h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Magnetic>
              <Button variant="outline" size="lg">
                Book a demo
              </Button>
            </div>

            <p className="mt-6 text-xs text-white/40">
              No credit card required · 14-day Pro trial · Cancel anytime
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
