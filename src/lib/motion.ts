import type { Variants } from "framer-motion";

/**
 * The one easing curve used across the whole site. Centralized so
 * every reveal, button and modal shares the same motion signature
 * instead of each component inventing its own cubic-bezier.
 *
 * Typed as an explicit 4-tuple (a cubic-bezier control-point pair)
 * rather than framer-motion's own `Transition["ease"]` — that type is
 * a large union without a shared indexable "ease" field in the
 * installed version, and pinning to it made this file break on a
 * framer-motion version bump for reasons unrelated to the value
 * itself.
 */
export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const REVEAL_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

/** Used in place of REVEAL_VARIANTS when prefers-reduced-motion is on. */
export const REVEAL_VARIANTS_STATIC: Variants = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0 },
};

export const STAGGER_VARIANTS: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

export const STAGGER_VARIANTS_STATIC: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0 } },
};

/** Shared viewport threshold so reveals trigger consistently. */
export const VIEWPORT_ONCE = { once: true, margin: "-80px" } as const;

/** Spring presets — named so a tuning change only happens in one place. */
export const CURSOR_RING_SPRING = { stiffness: 400, damping: 40, mass: 0.5 } as const;
export const MAGNETIC_SPRING = { stiffness: 250, damping: 18, mass: 0.4 } as const;
export const TILT_SPRING = { stiffness: 200, damping: 20 } as const;
export const HERO_GLOW_SPRING = { stiffness: 120, damping: 20, mass: 0.6 } as const;
