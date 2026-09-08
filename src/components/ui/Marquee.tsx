import { motion, useReducedMotion } from "framer-motion";

const MARQUEE_DURATION_SECONDS = 26;

interface MarqueeProps {
  items: string[];
}

/** Infinite horizontal ticker. The item list is duplicated once for a seamless loop. */
export function Marquee({ items }: MarqueeProps) {
  const prefersReducedMotion = useReducedMotion();
  const loopedItems = [...items, ...items];

  return (
    <div className="overflow-hidden border-y border-[#121826]/10 py-6" aria-hidden="true">
      <motion.div
        className="flex w-max gap-10 whitespace-nowrap"
        animate={prefersReducedMotion ? undefined : { x: ["0%", "-50%"] }}
        transition={prefersReducedMotion ? undefined : { duration: MARQUEE_DURATION_SECONDS, ease: "linear", repeat: Infinity }}
      >
        {loopedItems.map((item, index) => (
          <span key={`${item}-${index}`} className="flex items-center gap-10 text-lg text-[#121826]/35">
            <span className="font-serif italic">{item}</span>
            <span className="text-[#FF8A5B]/50">/</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
