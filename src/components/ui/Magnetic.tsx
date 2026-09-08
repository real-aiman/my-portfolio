import { useRef, type PointerEvent, type ReactNode } from "react";
import { motion, useReducedMotion, useSpring } from "framer-motion";
import { useFinePointer } from "../../hooks/useFinePointer";
import { MAGNETIC_SPRING } from "../../lib/motion";

interface MagneticProps {
  children: ReactNode;
  strength?: number;
}

/**
 * Wraps a single interactive child and nudges it a few px toward the
 * pointer while hovered.
 *
 * The bounding rect is read once on pointer-enter and cached in a ref,
 * rather than re-read on every pointer-move — on a fast mouse that's
 * the difference between one layout read per hover and dozens.
 * No-ops on touch devices and under reduced motion.
 */
export function Magnetic({ children, strength = 14 }: MagneticProps) {
  const isFinePointer = useFinePointer();
  const prefersReducedMotion = useReducedMotion();
  const isActive = isFinePointer && !prefersReducedMotion;

  const containerRef = useRef<HTMLDivElement>(null);
  const cachedRectRef = useRef<DOMRect | null>(null);
  const x = useSpring(0, MAGNETIC_SPRING);
  const y = useSpring(0, MAGNETIC_SPRING);

  if (!isActive) return <>{children}</>;

  const handlePointerEnter = () => {
    cachedRectRef.current = containerRef.current?.getBoundingClientRect() ?? null;
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const rect = cachedRectRef.current;
    if (!rect) return;
    const relativeX = event.clientX - (rect.left + rect.width / 2);
    const relativeY = event.clientY - (rect.top + rect.height / 2);
    x.set((relativeX / rect.width) * strength);
    y.set((relativeY / rect.height) * strength);
  };

  const handlePointerLeave = () => {
    x.set(0);
    y.set(0);
    cachedRectRef.current = null;
  };

  return (
    <motion.div
      ref={containerRef}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ x, y, willChange: "transform" }}
      className="inline-block"
      data-cursor="hover"
    >
      {children}
    </motion.div>
  );
}
