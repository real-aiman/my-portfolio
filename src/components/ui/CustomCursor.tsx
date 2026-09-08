import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useFinePointer } from "../../hooks/useFinePointer";
import { CURSOR_RING_SPRING, EASE } from "../../lib/motion";

const CURSOR_HOVER_SELECTOR = '[data-cursor="hover"]';

/**
 * Quiet custom cursor: a small dot with a lagging outer ring that
 * expands over anything tagged data-cursor="hover".
 *
 * Position is driven entirely by motion values, not React state, so
 * pointer movement never triggers a re-render here. `isVisible` is
 * the only piece of React state, and it's set with a functional
 * updater specifically so it doesn't need to be listed as an effect
 * dependency — keeping the listeners attached exactly once per
 * activation instead of re-attaching on every visibility change.
 */
export function CustomCursor() {
  const isFinePointer = useFinePointer();
  const prefersReducedMotion = useReducedMotion();
  const isActive = isFinePointer && !prefersReducedMotion;

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, CURSOR_RING_SPRING);
  const ringY = useSpring(y, CURSOR_RING_SPRING);

  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isActive) return;

    const handlePointerMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setIsVisible((wasVisible) => wasVisible || true);
    };
    const handlePointerOver = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      setIsHoveringInteractive(Boolean(target?.closest(CURSOR_HOVER_SELECTOR)));
    };
    const handleDocumentLeave = () => setIsVisible(false);

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerover", handlePointerOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", handleDocumentLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerover", handlePointerOver);
      document.documentElement.removeEventListener("mouseleave", handleDocumentLeave);
    };
  }, [isActive, x, y]);

  if (!isActive) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[65] hidden md:block" aria-hidden="true">
      <motion.div
        style={{ left: x, top: y, opacity: isVisible ? 1 : 0, willChange: "transform" }}
        className="fixed h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#121826] transition-opacity duration-200"
      />
      <motion.div
        style={{ left: ringX, top: ringY, opacity: isVisible ? 1 : 0, willChange: "transform, width, height" }}
        animate={{
          width: isHoveringInteractive ? 56 : 28,
          height: isHoveringInteractive ? 56 : 28,
          borderColor: isHoveringInteractive ? "rgba(255, 138, 91,0.55)" : "rgba(18, 24, 38,0.18)",
        }}
        transition={{ duration: 0.25, ease: EASE }}
        className="fixed -translate-x-1/2 -translate-y-1/2 rounded-full border transition-opacity duration-200"
      />
    </div>
  );
}
