"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import clsx from "clsx";

const EASE_REVEAL = [0.16, 0.84, 0.24, 1] as const;

// Requires more of the element to actually be on screen before animating
// (vs. the old amount: 0.12, margin: -8%) — that old threshold was so early
// that sections not far below the fold could finish revealing themselves
// before the loader even cleared, so by the time someone actually scrolled
// to them there was nothing left to see. This ties the motion to the real
// act of scrolling instead of firing near-instantly on page load.
const VIEWPORT = { once: true, margin: "0px 0px -12% 0px", amount: 0.3 } as const;

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
  as?: "div" | "p" | "h1" | "h2";
};

/** Fade + slide + settle reveal for a single block (paragraph, image, card). */
export function Reveal({ children, delay = 0, className, y = 44, as = "div" }: RevealProps) {
  const Component = motion[as];
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.9, delay: delay / 1000, ease: EASE_REVEAL }}
    >
      {children}
    </Component>
  );
}

type Token = { text: string; className?: string; break?: boolean };

const wordVariants: Variants = {
  hidden: { opacity: 0, y: "0.5em" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: i * 0.09, ease: EASE_REVEAL },
  }),
};

/** Word-by-word staggered reveal, e.g. "Pressed a hundred thousand times." */
export function RevealWords({ tokens, className }: { tokens: Token[]; className?: string }) {
  return (
    <span className={className}>
      {tokens.map((token, i) => (
        <span key={i}>
          <motion.span
            className={clsx("inline-block", token.className)}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={wordVariants}
          >
            {token.text}
          </motion.span>
          {token.break ? <br /> : i < tokens.length - 1 ? " " : null}
        </span>
      ))}
    </span>
  );
}

const lineVariants: Variants = {
  hidden: { opacity: 0, y: "0.35em" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: i * 0.09, ease: EASE_REVEAL },
  }),
};

/** Line-by-line staggered reveal for headlines, e.g. hero titles. */
export function RevealLines({ lines, className }: { lines: Token[]; className?: string }) {
  return (
    <span className={className}>
      {lines.map((line, i) => (
        <motion.span
          key={i}
          className={clsx("block", line.className)}
          custom={i}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={lineVariants}
        >
          {line.text}
        </motion.span>
      ))}
    </span>
  );
}
