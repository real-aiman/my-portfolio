import { useRef, type PointerEvent } from "react";
import { motion, useReducedMotion, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { ProjectImage } from "./ProjectImage";
import { Reveal } from "../../ui/Reveal";
import { ScrambleReveal } from "../../ui/ScrambleReveal";
import { useFinePointer } from "../../../hooks/useFinePointer";
import { TILT_SPRING } from "../../../lib/motion";
import type { Project } from "../../../types";

const TILT_RANGE_DEGREES = 5;

interface ProjectCardProps {
  project: Project;
  onOpen: (project: Project) => void;
}

export function ProjectCard({ project, onOpen }: ProjectCardProps) {
  const isWide = project.span === "wide";
  const isFinePointer = useFinePointer();
  const prefersReducedMotion = useReducedMotion();
  const isTiltActive = isFinePointer && !prefersReducedMotion;

  const imageContainerRef = useRef<HTMLDivElement>(null);
  const cachedRectRef = useRef<DOMRect | null>(null);
  const rotateX = useSpring(0, TILT_SPRING);
  const rotateY = useSpring(0, TILT_SPRING);

  const handleImagePointerEnter = () => {
    if (!isTiltActive) return;
    cachedRectRef.current = imageContainerRef.current?.getBoundingClientRect() ?? null;
  };

  const handleImagePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const rect = cachedRectRef.current;
    if (!rect) return;
    const relativeX = (event.clientX - rect.left) / rect.width - 0.5;
    const relativeY = (event.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(relativeX * TILT_RANGE_DEGREES);
    rotateX.set(relativeY * -TILT_RANGE_DEGREES);
  };

  const handleImagePointerLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    cachedRectRef.current = null;
  };

  return (
    <Reveal
      className={`group relative border-t border-[#121826]/10 py-10 md:py-12 ${
        isWide ? "md:col-span-12" : "md:col-span-6"
      }`}
    >
      <button
        type="button"
        onClick={() => onOpen(project)}
        data-cursor="hover"
        className="grid w-full grid-cols-1 gap-6 text-left md:grid-cols-12 md:gap-8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FF8A5B]"
      >
        <motion.div
          ref={imageContainerRef}
          onPointerEnter={handleImagePointerEnter}
          onPointerMove={handleImagePointerMove}
          onPointerLeave={handleImagePointerLeave}
          style={{ rotateX, rotateY, transformPerspective: 800 }}
          className={`order-2 overflow-hidden rounded-[2px] bg-[#FFD2A6] md:order-1 ${
            isWide ? "md:col-span-7 aspect-[16/10]" : "md:col-span-12 aspect-[16/11]"
          }`}
        >
          <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.03]">
            <ProjectImage image={project.image} name={project.name} />
          </div>
        </motion.div>

        <div className={`order-1 flex flex-col justify-between md:order-2 ${isWide ? "md:col-span-5" : "md:col-span-12"}`}>
          <div>
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm text-[#FF8A5B]">{project.index}</span>
              <span className="text-sm text-[#2A2F45]">{project.category}</span>
            </div>
            <h3 className="font-serif text-[clamp(1.6rem,2.8vw,2.4rem)] leading-tight text-[#121826] transition-[letter-spacing] duration-300 group-hover:tracking-[0.01em]">
              <ScrambleReveal text={project.name} />
            </h3>
            <p className="mt-4 max-w-md text-[#2A2F45] leading-relaxed">{project.description}</p>

            <ul className="mt-5 flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <li key={tech} className="rounded-full border border-[#121826]/10 px-3 py-1 text-xs text-[#2A2F45]">
                  {tech}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 flex items-center gap-2 text-[15px] text-[#121826]">
            <span>View case study</span>
            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </div>
        </div>
      </button>
    </Reveal>
  );
}
