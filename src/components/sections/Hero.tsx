import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { ArrowRight, Play, Sparkles, Star } from "lucide-react";
import { Container } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Magnetic } from "@/components/primitives/Magnetic";
import { AuroraBackground } from "@/components/primitives/AuroraBackground";
import { staggerContainer, fadeUp } from "@/lib/motion";
import { ProductMockup } from "./ProductMockup";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax: copy drifts up & fades, mockup rotates flat + lifts as you scroll.
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const mockupRotate = useTransform(scrollYProgress, [0, 0.5], [18, 0]);
  const mockupY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const mockupScale = useTransform(scrollYProgress, [0, 0.5], [0.92, 1]);

  const smoothRotate = useSpring(mockupRotate, { stiffness: 120, damping: 24 });

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden pt-36 sm:pt-44">
      <AuroraBackground />

      <Container className="relative z-10">
        <motion.div
          style={{ y: copyY, opacity: copyOpacity }}
          variants={staggerContainer(0.12, 0.4)}
          initial="hidden"
          animate="show"
          className="mx-auto flex max-w-4xl flex-col items-center text-center"
        >
          <motion.div variants={fadeUp}>
            <Badge>
              <Sparkles className="h-3.5 w-3.5 text-brand-300" />
              Introducing Aether 2.0 — now with Agentic Workflows
            </Badge>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="mt-7 text-balance text-5xl font-semibold leading-[0.98] tracking-[-0.03em] sm:text-7xl lg:text-[5.25rem]"
          >
            The intelligence layer
            <br />
            for{" "}
            <span className="relative whitespace-nowrap">
              <span className="font-serif italic text-gradient">modern teams</span>
              <motion.svg
                viewBox="0 0 320 20"
                className="absolute -bottom-3 left-0 w-full text-brand-500/60"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.2, delay: 1.1, ease: "easeInOut" }}
              >
                <motion.path
                  d="M5 12 Q 160 2 315 12"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </motion.svg>
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-white/55 sm:text-xl"
          >
            Aether unifies your docs, code, and conversations into one AI-native
            workspace. Automate the busywork, surface what matters, and ship at
            the speed of thought.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-col items-center gap-3 sm:flex-row"
          >
            <Magnetic strength={0.4}>
              <Button size="lg">
                Start for free
                <ArrowRight className="h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Magnetic>
            <Button variant="secondary" size="lg">
              <Play className="h-4 w-4 fill-current" />
              Watch the film
            </Button>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-8 flex items-center gap-3 text-sm text-white/45"
          >
            <div className="flex -space-x-2">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-7 w-7 rounded-full border-2 border-ink-950 bg-gradient-to-br from-brand-400 to-accent-blue"
                  style={{ filter: `hue-rotate(${i * 40}deg)` }}
                />
              ))}
            </div>
            <span className="flex items-center gap-1">
              <span className="flex text-amber-300">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current" />
                ))}
              </span>
              <span className="ml-1">Loved by 28,000+ builders</span>
            </span>
          </motion.div>
        </motion.div>

        {/* Product mockup with scroll-driven 3D tilt */}
        <motion.div
          style={{
            y: mockupY,
            scale: mockupScale,
            rotateX: smoothRotate,
            transformPerspective: 1400,
          }}
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 mx-auto mt-20 max-w-5xl [transform-style:preserve-3d]"
        >
          <ProductMockup />
        </motion.div>
      </Container>

      {/* Fade content into next section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink-950" />
    </section>
  );
}
