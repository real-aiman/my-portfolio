import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const SCRAMBLE_TOTAL_FRAMES = 14;
const SCRAMBLE_FRAME_MS = 28;
const VIEWPORT_TRIGGER_THRESHOLD = 0.6;

function scrambleTowards(text: string, revealCount: number): string {
  return text
    .split("")
    .map((char, index) => {
      if (char === " ") return " ";
      return index < revealCount ? char : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
    })
    .join("");
}

interface ScrambleRevealProps {
  text: string;
  className?: string;
}

/**
 * Decodes into its final text with a brief character-scramble once it
 * enters the viewport — a single considered moment, never re-triggers.
 *
 * Screen readers get the real text immediately via a visually-hidden
 * node; the animated characters are aria-hidden so mid-scramble noise
 * (random letters) is never announced.
 *
 * The scramble interval is cleared on unmount as well as on
 * completion — in the original inline version it was only cleared
 * from inside its own tick callback, so navigating away mid-animation
 * would leak a running interval calling setState on an unmounted
 * component.
 */
export function ScrambleReveal({ text, className }: ScrambleRevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const [display, setDisplay] = useState(text);
  const hasAnimatedRef = useRef(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplay(text);
      return;
    }

    const element = elementRef.current;
    if (!element) return;

    let intervalId: number | undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimatedRef.current) return;
        hasAnimatedRef.current = true;
        observer.disconnect();

        let frame = 0;
        intervalId = window.setInterval(() => {
          frame += 1;
          const revealCount = Math.floor((frame / SCRAMBLE_TOTAL_FRAMES) * text.length);
          setDisplay(scrambleTowards(text, revealCount));
          if (frame >= SCRAMBLE_TOTAL_FRAMES) {
            window.clearInterval(intervalId);
            setDisplay(text);
          }
        }, SCRAMBLE_FRAME_MS);
      },
      { threshold: VIEWPORT_TRIGGER_THRESHOLD }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      if (intervalId !== undefined) window.clearInterval(intervalId);
    };
  }, [text, prefersReducedMotion]);

  return (
    <span ref={elementRef} className={className}>
      <span aria-hidden="true">{display}</span>
      <span className="sr-only">{text}</span>
    </span>
  );
}
