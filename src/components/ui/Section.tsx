import { type ReactNode } from "react";
import { Badge } from "./Badge";
import { Reveal } from "@/components/primitives/Reveal";
import { cn } from "@/lib/utils";

/** Max-width content container with consistent horizontal padding. */
export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-7xl px-5 sm:px-8", className)}>
      {children}
    </div>
  );
}

/** Vertical-rhythm section wrapper with an id anchor. */
export function Section({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("relative py-24 sm:py-32", className)}>
      {children}
    </section>
  );
}

/** Centered section heading: eyebrow badge + serif-accented title + subtitle. */
export function SectionHeading({
  eyebrow,
  title,
  accent,
  subtitle,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: string;
  /** Optional trailing accent phrase rendered in serif italic gradient. */
  accent?: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <Reveal
      stagger
      className={cn(
        "flex flex-col gap-5",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow && (
        <Reveal>
          <Badge>{eyebrow}</Badge>
        </Reveal>
      )}
      <Reveal>
        <h2 className="max-w-3xl text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
          {title}{" "}
          {accent && (
            <span className="font-serif text-gradient italic">{accent}</span>
          )}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal>
          <p
            className={cn(
              "max-w-2xl text-pretty text-base leading-relaxed text-white/55 sm:text-lg",
              align === "center" && "mx-auto",
            )}
          >
            {subtitle}
          </p>
        </Reveal>
      )}
    </Reveal>
  );
}
