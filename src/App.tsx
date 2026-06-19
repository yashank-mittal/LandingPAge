import { Suspense, lazy } from "react";
import { Preloader } from "@/components/primitives/Preloader";
import { GlobalBackground } from "@/components/primitives/GlobalBackground";
import { ScrollProgress } from "@/components/primitives/ScrollProgress";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { LogoMarquee } from "@/components/sections/LogoMarquee";

// Below-the-fold sections are code-split so the hero paints as fast as possible.
const Features = lazy(() =>
  import("@/components/sections/Features").then((m) => ({ default: m.Features })),
);
const Showcase = lazy(() =>
  import("@/components/sections/Showcase").then((m) => ({ default: m.Showcase })),
);
const Bento = lazy(() =>
  import("@/components/sections/Bento").then((m) => ({ default: m.Bento })),
);
const Stats = lazy(() =>
  import("@/components/sections/Stats").then((m) => ({ default: m.Stats })),
);
const Testimonials = lazy(() =>
  import("@/components/sections/Testimonials").then((m) => ({
    default: m.Testimonials,
  })),
);
const Pricing = lazy(() =>
  import("@/components/sections/Pricing").then((m) => ({ default: m.Pricing })),
);
const FAQ = lazy(() =>
  import("@/components/sections/FAQ").then((m) => ({ default: m.FAQ })),
);
const CTA = lazy(() =>
  import("@/components/sections/CTA").then((m) => ({ default: m.CTA })),
);
const Footer = lazy(() =>
  import("@/components/sections/Footer").then((m) => ({ default: m.Footer })),
);

function SectionFallback() {
  return <div className="min-h-[40vh]" aria-hidden />;
}

export default function App() {
  return (
    <>
      <Preloader />
      <GlobalBackground />
      <ScrollProgress />
      <Navbar />

      <main className="relative">
        <Hero />
        <LogoMarquee />

        <Suspense fallback={<SectionFallback />}>
          <Features />
          <Showcase />
          <Bento />
          <Stats />
          <Testimonials />
          <Pricing />
          <FAQ />
          <CTA />
          <Footer />
        </Suspense>
      </main>
    </>
  );
}
