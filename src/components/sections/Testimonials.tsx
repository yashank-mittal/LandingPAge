import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

/** Wrap an index into [min, max). */
const wrap = (min: number, max: number, v: number) =>
  ((((v - min) % (max - min)) + (max - min)) % (max - min)) + min;
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { Section, Container, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/primitives/Reveal";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  hue: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Aether collapsed four tools into one and gave us back an entire day each week. It's the first software in years that our whole team adopted without a single nudge.",
    name: "Mara Lindqvist",
    role: "VP of Engineering",
    company: "Northwind",
    hue: 0,
  },
  {
    quote:
      "The agents aren't a gimmick — they close real tickets while we sleep. Our cycle time dropped 40% in the first month and hasn't crept back up.",
    name: "Devon Okafor",
    role: "Head of Product",
    company: "Lumen Labs",
    hue: 60,
  },
  {
    quote:
      "I've shipped a lot of internal tooling. Nothing comes close to the polish here. Every interaction feels considered, and somehow it's also the fastest thing we use.",
    name: "Priya Raman",
    role: "Founding Designer",
    company: "Cobalt",
    hue: 200,
  },
  {
    quote:
      "We replaced our entire ops stack with Aether and onboarded 200 people in a day. The ROI conversation was over before the trial ended.",
    name: "Tomás Herrera",
    role: "COO",
    company: "Vantage",
    hue: 280,
  },
];

export function Testimonials() {
  const [[page, dir], setPage] = useState<[number, number]>([0, 0]);
  const index = wrap(0, TESTIMONIALS.length, page);
  const t = TESTIMONIALS[index];

  const paginate = (d: number) => setPage([page + d, d]);

  return (
    <Section className="overflow-hidden">
      <Container>
        <SectionHeading
          eyebrow="Loved by builders"
          title="Don't take our"
          accent="word for it"
        />

        <Reveal className="relative mx-auto mt-14 max-w-3xl">
          <Quote className="mx-auto mb-6 h-10 w-10 text-brand-500/40" />

          <div className="relative min-h-[260px] sm:min-h-[220px]">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.figure
                key={page}
                custom={dir}
                initial={{ opacity: 0, x: dir > 0 ? 60 : -60, filter: "blur(8px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: dir > 0 ? -60 : 60, filter: "blur(8px)" }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 flex flex-col items-center text-center"
              >
                <blockquote className="text-balance text-xl font-medium leading-relaxed text-white/85 sm:text-2xl">
                  "{t.quote}"
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-3">
                  <span
                    className="h-11 w-11 rounded-full bg-gradient-to-br from-brand-400 to-accent-blue"
                    style={{ filter: `hue-rotate(${t.hue}deg)` }}
                  />
                  <div className="text-left">
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="text-xs text-white/45">
                      {t.role} · {t.company}
                    </p>
                  </div>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="mt-10 flex items-center justify-center gap-4">
            <CarouselBtn onClick={() => paginate(-1)} label="Previous">
              <ArrowLeft className="h-4 w-4" />
            </CarouselBtn>

            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage([i, i > index ? 1 : -1])}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className="group h-2 rounded-full transition-all duration-300"
                  style={{ width: i === index ? 28 : 8 }}
                >
                  <span
                    className={`block h-full w-full rounded-full transition-colors ${
                      i === index ? "bg-brand-400" : "bg-white/20 group-hover:bg-white/40"
                    }`}
                  />
                </button>
              ))}
            </div>

            <CarouselBtn onClick={() => paginate(1)} label="Next">
              <ArrowRight className="h-4 w-4" />
            </CarouselBtn>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

function CarouselBtn({
  children,
  onClick,
  label,
}: {
  children: React.ReactNode;
  onClick: () => void;
  label: string;
}) {
  return (
    <motion.button
      onClick={onClick}
      aria-label={label}
      whileHover={{ scale: 1.08, y: -1 }}
      whileTap={{ scale: 0.92 }}
      className="grid h-11 w-11 place-items-center rounded-full glass text-white/70 hover:text-white"
    >
      {children}
    </motion.button>
  );
}
