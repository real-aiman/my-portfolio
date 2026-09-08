import { useEffect, useRef, type RefObject } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { ProjectImage } from "./ProjectImage";
import { SecondaryButton } from "../../ui/Button";
import { EASE } from "../../../lib/motion";
import type { Project } from "../../../types";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

/**
 * Keeps Tab/Shift+Tab focus cycling inside the dialog while it's open,
 * and moves focus into it on open. A modal that lets focus escape to
 * the page behind it is a real WCAG failure (2.1.2), not a nicety.
 */
function useFocusTrap(containerRef: RefObject<HTMLElement | null>, isActive: boolean) {
  useEffect(() => {
    if (!isActive) return;
    const container = containerRef.current;
    if (!container) return;

    const getFocusableElements = () =>
      Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const focusableElements = getFocusableElements();
      if (focusableElements.length === 0) return;

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    getFocusableElements()[0]?.focus();
    container.addEventListener("keydown", handleKeyDown);
    return () => container.removeEventListener("keydown", handleKeyDown);
  }, [containerRef, isActive]);
}

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);
  const isOpen = project !== null;

  useFocusTrap(dialogRef, isOpen);

  useEffect(() => {
    if (!isOpen) return;

    previouslyFocusedElementRef.current = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocusedElementRef.current?.focus();
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-end justify-center md:items-center md:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div className="absolute inset-0 bg-[#121826]/50 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={`${project.name} case study`}
            initial={{ y: "6%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "4%", opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-t-2xl bg-[#FFF3E9] p-5 pb-8 sm:p-7 md:rounded-2xl md:p-10"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close case study"
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center sm:right-5 sm:top-5 rounded-full border border-[#121826]/10 text-[#121826] transition-colors hover:border-[#121826]/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF8A5B]"
            >
              <X size={18} />
            </button>

            <p className="text-sm text-[#FF8A5B]">
              {project.index} — {project.category}
            </p>
            <h3 className="mt-3 font-serif text-[clamp(1.8rem,4vw,2.6rem)] leading-tight text-[#121826]">
              {project.name}
            </h3>

            <div className="mt-6 aspect-[16/9] overflow-hidden rounded-lg bg-[#FFD2A6]">
              <ProjectImage image={project.image} name={project.name} />
            </div>

            <div className="mt-8 grid gap-8 md:grid-cols-2">
              <div>
                <h4 className="text-sm text-[#FF8A5B]">Overview</h4>
                <p className="mt-2 leading-relaxed text-[#2A2F45]">{project.overview}</p>
              </div>
              <div>
                <h4 className="text-sm text-[#FF8A5B]">Challenge</h4>
                <p className="mt-2 leading-relaxed text-[#2A2F45]">{project.challenge}</p>
              </div>
              <div>
                <h4 className="text-sm text-[#FF8A5B]">Approach</h4>
                <p className="mt-2 leading-relaxed text-[#2A2F45]">{project.approach}</p>
              </div>
              <div>
                <h4 className="text-sm text-[#FF8A5B]">Outcome</h4>
                <p className="mt-2 leading-relaxed text-[#2A2F45]">{project.outcome}</p>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="text-sm text-[#FF8A5B]">Technology</h4>
              <ul className="mt-3 flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <li key={tech} className="rounded-full border border-[#121826]/10 px-3 py-1 text-xs text-[#2A2F45]">
                    {tech}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-9 flex flex-wrap gap-4">
              {project.liveUrl && <SecondaryButton href={project.liveUrl}>Live Project</SecondaryButton>}
              {project.githubUrl && <SecondaryButton href={project.githubUrl}>GitHub</SecondaryButton>}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
