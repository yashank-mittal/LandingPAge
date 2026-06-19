import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { motion } from "motion/react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium tracking-tight transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950 disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer",
  {
    variants: {
      variant: {
        primary: "text-white shadow-[0_8px_30px_-8px_var(--color-brand-600)]",
        secondary:
          "glass text-white/90 hover:text-white hover:bg-white/[0.08]",
        ghost: "text-white/70 hover:text-white hover:bg-white/[0.05]",
        outline:
          "border border-white/15 text-white/90 hover:border-white/30 hover:bg-white/[0.04]",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-5 text-[0.95rem]",
        lg: "h-13 px-7 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

interface ButtonProps
  extends Omit<
      ButtonHTMLAttributes<HTMLButtonElement>,
      "onAnimationStart" | "onDragStart" | "onDragEnd" | "onDrag"
    >,
    VariantProps<typeof buttonVariants> {
  children: ReactNode;
}

/** Animated, premium button. Primary variant has an animated gradient fill + sheen. */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 22 }}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      >
        {variant === "primary" && (
          <>
            {/* animated gradient fill */}
            <span
              className="absolute inset-0 rounded-full bg-[linear-gradient(110deg,var(--color-brand-600),var(--color-brand-500),var(--color-accent-blue),var(--color-brand-500),var(--color-brand-600))] bg-[length:200%_100%] animate-shimmer"
              aria-hidden
            />
            {/* sheen on hover */}
            <span
              className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(120px_circle_at_50%_-20%,rgba(255,255,255,0.5),transparent)]"
              aria-hidden
            />
          </>
        )}
        <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
      </motion.button>
    );
  },
);
Button.displayName = "Button";
