import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "../../lib/motion";

/**
 * A single continuous ink-stroke flourish, drawn once when it enters
 * the viewport — the kind of mark a person leaves under their own
 * name, not a UI ornament. Deliberately the only "signature" moment
 * on the page (see restraint principle: one considered thing, not
 * scattered effects) and placed in the footer, where a real signature
 * would go.
 */
export function SignatureFlourish() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <svg
      viewBox="0 0 220 46"
      className="h-9 w-[150px] text-[#FF8A5B]"
      fill="none"
      aria-hidden="true"
    >
      <motion.path
        d="M6,30 C18,10 26,42 40,24 C48,13 54,34 66,22 C76,12 82,8 90,18
           C97,27 88,36 96,30 C108,21 118,9 130,14
           C140,18 132,33 142,29 C154,24 158,10 172,15
           C182,18.5 178,29 188,26 C196,23.5 202,15 214,17"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={prefersReducedMotion ? false : { pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 1.4, ease: EASE }}
      />
    </svg>
  );
}
