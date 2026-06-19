import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus } from "lucide-react";
import { Section, Container, SectionHeading } from "@/components/ui/Section";
import { Reveal, RevealItem } from "@/components/primitives/Reveal";

const FAQS = [
  {
    q: "How is Aether different from the tools I already use?",
    a: "Most tools store information; Aether acts on it. Instead of bouncing between a doc tool, a tracker, and a chat app, you get one workspace where agents understand context and complete work end to end — with a fraction of the overhead.",
  },
  {
    q: "Is my data used to train your models?",
    a: "Never. Your data stays yours, fully isolated and encrypted. Agents run on your content at request time, but nothing is retained for training. We're SOC 2 Type II certified and HIPAA-ready.",
  },
  {
    q: "How long does it take to get set up?",
    a: "Most teams are productive within an hour. Native integrations import your existing projects automatically, and our templates cover the common workflows so you're not starting from a blank canvas.",
  },
  {
    q: "Can I bring my whole organization?",
    a: "Yes. The Enterprise plan supports unlimited members, SAML SSO, SCIM provisioning, granular roles, and dedicated infrastructure — with white-glove onboarding for large rollouts.",
  },
  {
    q: "What happens when my trial ends?",
    a: "Nothing breaks. You drop to the free Starter plan and keep everything you've built. Upgrade whenever you're ready — no data is ever deleted or held hostage.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section id="faq">
      <Container className="max-w-3xl">
        <SectionHeading
          eyebrow="Questions"
          title="Everything else,"
          accent="answered"
        />

        <Reveal stagger staggerAmount={0.07} className="mt-12 flex flex-col gap-3">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <RevealItem key={item.q}>
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition-colors hover:border-white/20">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base font-medium text-white">
                      {item.q}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white/5 text-white/70"
                    >
                      <Plus className="h-4 w-4" />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <p className="px-6 pb-5 text-sm leading-relaxed text-white/55">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </RevealItem>
            );
          })}
        </Reveal>
      </Container>
    </Section>
  );
}
