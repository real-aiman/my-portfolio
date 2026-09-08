import { useEffect, useRef, useState, type PointerEvent } from "react";
import { animate, motion, useInView, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { GithubIcon, LinkedinIcon } from "../icons/BrandIcons";
import { Magnetic } from "../ui/Magnetic";
import { PrimaryButton, SecondaryButton } from "../ui/Button";
import { SITE } from "../../data/site";
import { EASE, HERO_GLOW_SPRING } from "../../lib/motion";

const HERO_GLOW_RANGE_PX = 18;

const HERO_TIMELINE = {
  eyebrow: 0,
  headlineLineOne: 0.05,
  headlineLineTwo: 0.18,
  paragraph: 0.45,
  ctas: 0.6,
  meta: 0.72,
} as const;

interface HeroLineProps {
  text: string;
  delay: number;
}

function HeroLine({ text, delay }: HeroLineProps) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        className="block"
        initial={{ y: "110%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 0.8, ease: EASE, delay }}
      >
        {text}
      </motion.span>
    </span>
  );
}

export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const statRef = useRef<HTMLParagraphElement>(null);
  const statInView = useInView(statRef, { once: true, amount: 1 });
  const [statValue, setStatValue] = useState(0);

  useEffect(() => {
    if (!statInView) return;
    if (prefersReducedMotion) {
      setStatValue(10);
      return;
    }
    const controls = animate(0, 10, {
      duration: 1.3,
      ease: EASE,
      onUpdate: (value) => setStatValue(Math.round(value)),
    });
    return () => controls.stop();
  }, [statInView, prefersReducedMotion]);
  const sectionRef = useRef<HTMLElement>(null);
  const cachedRectRef = useRef<DOMRect | null>(null);
  const glowX = useSpring(0, HERO_GLOW_SPRING);
  const glowY = useSpring(0, HERO_GLOW_SPRING);

  // Cache the section's rect once (and on resize) instead of reading
  // layout on every pointer move — getBoundingClientRect forces a
  // layout flush, which is exactly what you don't want inside a
  // high-frequency mousemove handler.
  useEffect(() => {
    if (prefersReducedMotion) return;

    const updateCachedRect = () => {
      cachedRectRef.current = sectionRef.current?.getBoundingClientRect() ?? null;
    };
    updateCachedRect();
    window.addEventListener("resize", updateCachedRect);
    return () => window.removeEventListener("resize", updateCachedRect);
  }, [prefersReducedMotion]);

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (prefersReducedMotion) return;
    const rect = cachedRectRef.current;
    if (!rect) return;
    glowX.set(((event.clientX - rect.left) / rect.width - 0.5) * 2 * HERO_GLOW_RANGE_PX);
    glowY.set(((event.clientY - rect.top) / rect.height - 0.5) * 2 * HERO_GLOW_RANGE_PX);
  };

  return (
    <section
      id="top"
      ref={sectionRef}
      onPointerMove={handlePointerMove}
      className="relative flex min-h-[92vh] flex-col justify-center overflow-hidden px-6 pt-28 md:px-10"
    >
      <motion.div
        style={{ x: glowX, y: glowY }}
        className="pointer-events-none absolute -right-24 top-1/4 h-[420px] w-[420px] rounded-full opacity-[0.35] blur-3xl md:opacity-50"
        aria-hidden="true"
      >
        <div
          className="h-full w-full rounded-full"
          style={{ background: "radial-gradient(circle, rgba(255, 138, 91,0.35), transparent 70%)" }}
        />
      </motion.div>

      {/* Floating 3D card — genuine CSS-perspective tilt driven by the same
          cursor springs as the ambient glow, so depth feels physically
          consistent rather than decorative. Hidden below lg: it needs real
          horizontal room to read as a layered object rather than clutter. */}
      <div
        className="pointer-events-none absolute right-[6%] top-1/2 hidden -translate-y-1/2 lg:block"
        style={{ perspective: "1400px" }}
        aria-hidden="true"
      >
        <motion.div
          style={{
            rotateY: useTransform(glowX, (v) => v * 0.6),
            rotateX: useTransform(glowY, (v) => -v * 0.6),
            transformStyle: "preserve-3d",
            willChange: "transform",
          }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.5 }}
          className="relative h-[320px] w-[260px]"
        >
          {/* back layer — sits deeper, drifts less */}
          <motion.div
            style={{ x: useTransform(glowX, (v) => v * 0.4), y: useTransform(glowY, (v) => v * 0.4), translateZ: -60 }}
            className="absolute inset-4 rounded-[28px] bg-[#FFD2A6]"
          />
          {/* mid layer — accent ring */}
          <motion.div
            style={{ x: useTransform(glowX, (v) => v * 0.7), y: useTransform(glowY, (v) => v * 0.7), translateZ: -20 }}
            className="absolute -inset-2 rounded-[32px] border border-[#FF8A5B]/40"
          />
          {/* front layer — glass card */}
          <div
            style={{ transform: "translateZ(40px)" }}
            className="relative flex h-full w-full flex-col justify-between rounded-[28px] border border-[#121826]/10 bg-[#FFF3E9]/70 p-6 shadow-[0_30px_60px_-15px_rgba(18,24,38,0.25)] backdrop-blur-xl"
          >
            <div className="flex items-center justify-between">
              <span className="h-2.5 w-2.5 rounded-full bg-[#FF8A5B]" />
              <span className="font-serif text-sm text-[#2A2F45]">Est. 2024</span>
            </div>
            <div>
              <p ref={statRef} className="font-serif text-4xl text-[#121826]">
                {statValue}+
              </p>
              <p className="mt-1 text-sm text-[#2A2F45]">Shipped React &amp; WordPress builds</p>
            </div>
            <div className="h-px w-full bg-[#121826]/10" />
            <div className="flex items-center gap-2 text-sm text-[#2A2F45]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FF8A5B]/60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FF8A5B]" />
              </span>
              Currently building at Vantec Media
            </div>
          </div>
        </motion.div>
      </div>

      <div className="relative mx-auto w-full max-w-6xl">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: HERO_TIMELINE.eyebrow }}
          className="mb-6 text-sm text-[#FF8A5B]"
        >
          {SITE.role}, {SITE.location}
        </motion.p>

        <h1 className="font-serif text-[clamp(2.3rem,6vw,4.75rem)] leading-[1.05] text-[#121826] max-w-4xl">
          <HeroLine text="I build interfaces that feel" delay={HERO_TIMELINE.headlineLineOne} />
          <HeroLine text="as considered as they function." delay={HERO_TIMELINE.headlineLineTwo} />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: HERO_TIMELINE.paragraph }}
          className="mt-7 max-w-lg text-lg leading-relaxed text-[#2A2F45]"
        >
          I work across React and WordPress, building responsive interfaces,
          e-commerce experiences, dashboards and client websites — from first
          layout decision to the last cross-browser fix.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: HERO_TIMELINE.ctas }}
          className="mt-9 flex flex-wrap items-center gap-4"
        >
          <Magnetic>
            <PrimaryButton href="#work">View Selected Work</PrimaryButton>
          </Magnetic>
          <SecondaryButton href={SITE.resumeUrl}>View CV</SecondaryButton>
          <SecondaryButton href={`mailto:${SITE.email}`}>Contact Me</SecondaryButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: HERO_TIMELINE.meta }}
          className="mt-12 flex flex-wrap items-center gap-6"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-[#121826]/10 px-4 py-2 text-sm text-[#2A2F45]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FF8A5B]/60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FF8A5B]" />
            </span>
            Available for frontend opportunities
          </span>

          <div className="flex items-center gap-4 text-[#2A2F45]">
            <a
              href={SITE.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              aria-label="GitHub profile"
              className="transition-colors duration-200 hover:text-[#121826] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF8A5B]"
            >
              <GithubIcon size={19} />
            </a>
            <a
              href={SITE.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              aria-label="LinkedIn profile"
              className="transition-colors duration-200 hover:text-[#121826] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF8A5B]"
            >
              <LinkedinIcon size={19} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
