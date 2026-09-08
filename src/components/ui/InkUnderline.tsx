import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "../../lib/motion";

/**
 * A short hand-drawn stroke under a section eyebrow — the same ink-line
 * language as the footer's SignatureFlourish, reused here instead of a
 * new effect, so the "human touch" reads as one deliberate visual
 * identity across the page rather than a different gimmick per section.
 */
export function InkUnderline() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <svg viewBox="0 0 64 8" className="mt-1.5 h-2 w-14 text-[#FF8A5B]" fill="none" aria-hidden="true">
      <motion.path
        d="M2,5 C14,1 22,7 34,3 C44,0 52,6 62,3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        initial={prefersReducedMotion ? false : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, amount: 1 }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
      />
    </svg>
  );
}
