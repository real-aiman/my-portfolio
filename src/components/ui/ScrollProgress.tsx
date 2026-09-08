import { motion, useReducedMotion, useScroll } from "framer-motion";

/** Fixed hairline at the top of the page reflecting overall scroll progress. */
export function ScrollProgress() {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  if (prefersReducedMotion) return null;

  return (
    <motion.div
      style={{ scaleX: scrollYProgress }}
      className="fixed left-0 top-0 z-[70] h-[2px] w-full origin-left bg-[#FF8A5B]"
      aria-hidden="true"
    />
  );
}
