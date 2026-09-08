import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  REVEAL_VARIANTS,
  REVEAL_VARIANTS_STATIC,
  STAGGER_VARIANTS,
  STAGGER_VARIANTS_STATIC,
  VIEWPORT_ONCE,
} from "../../lib/motion";

type RevealTag = "div" | "li" | "span";

interface RevealProps {
  children: ReactNode;
  className?: string;
  as?: RevealTag;
}

/**
 * Fades/slides a single element in once, the first time it enters the
 * viewport.
 *
 * The previous version picked its element with `motion[tag as "div"]`,
 * an index access that only compiled by asserting away the real type
 * (motion.li and motion.span each carry a different, non-interchangeable
 * props type — e.g. an onCopy handler typed for HTMLLIElement isn't
 * assignable to one typed for HTMLDivElement). A lookup table hits the
 * same wall under strict mode. Branching per tag is what actually
 * type-checks, and it's arguably more readable besides.
 */
export function Reveal({ children, className, as = "div" }: RevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const variants = prefersReducedMotion ? REVEAL_VARIANTS_STATIC : REVEAL_VARIANTS;

  if (as === "li") {
    return (
      <motion.li className={className} variants={variants} initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE}>
        {children}
      </motion.li>
    );
  }

  if (as === "span") {
    return (
      <motion.span className={className} variants={variants} initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE}>
        {children}
      </motion.span>
    );
  }

  return (
    <motion.div className={className} variants={variants} initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE}>
      {children}
    </motion.div>
  );
}

interface RevealGroupProps {
  children: ReactNode;
  className?: string;
}

/** Wraps a set of Reveal children so they stagger in together. */
export function RevealGroup({ children, className }: RevealGroupProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={prefersReducedMotion ? STAGGER_VARIANTS_STATIC : STAGGER_VARIANTS}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
    >
      {children}
    </motion.div>
  );
}
