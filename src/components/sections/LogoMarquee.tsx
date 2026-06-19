import { Container } from "@/components/ui/Section";
import { Reveal } from "@/components/primitives/Reveal";

const COMPANIES = [
  "Vercel",
  "Linear",
  "Stripe",
  "Notion",
  "Framer",
  "Raycast",
  "Supabase",
  "Loom",
];

function Row({ reverse = false }: { reverse?: boolean }) {
  return (
    <div className="flex w-max shrink-0 items-center gap-16 pr-16">
      {COMPANIES.map((c) => (
        <span
          key={`${reverse}-${c}`}
          className="text-2xl font-semibold tracking-tight text-white/30 transition-colors duration-300 hover:text-white/70"
        >
          {c}
        </span>
      ))}
    </div>
  );
}

export function LogoMarquee() {
  return (
    <section className="relative border-y border-white/5 py-16">
      <Container>
        <Reveal className="mb-10 text-center text-sm font-medium uppercase tracking-[0.2em] text-white/35">
          Trusted by the teams building the future
        </Reveal>
      </Container>

      {/* Edge-masked infinite marquee */}
      <div className="relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className="flex animate-marquee">
          <Row />
          <Row />
        </div>
      </div>
    </section>
  );
}
