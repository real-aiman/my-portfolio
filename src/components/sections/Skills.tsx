import { useState } from "react";
import { motion } from "framer-motion";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { SKILL_GROUPS } from "../../data/skills";
import { EASE } from "../../lib/motion";
import type { SkillGroup } from "../../types";

interface SkillRowProps {
  group: SkillGroup;
}

function SkillRow({ group }: SkillRowProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Reveal as="li" className="group border-t border-[#121826]/10 py-8 first:border-t-0">
      <button
        type="button"
        className="grid w-full grid-cols-1 gap-4 text-left md:grid-cols-12 md:items-start md:gap-8"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
      >
        <span className="md:col-span-3 font-serif text-2xl text-[#121826]">{group.label}</span>
        <span className="md:col-span-9">
          <span className="flex flex-wrap gap-x-2 gap-y-1 text-[#2A2F45]">
            {group.items.map((item, index) => (
              <span key={item}>
                {item}
                {index < group.items.length - 1 && <span className="text-[#121826]/20">,</span>}
              </span>
            ))}
          </span>
          <motion.span
            initial={false}
            animate={{ height: isHovered ? "auto" : 0, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="block overflow-hidden text-sm text-[#FF8A5B]"
          >
            <span className="mt-2 block">{group.blurb}</span>
          </motion.span>
        </span>
      </button>
    </Reveal>
  );
}

export function Skills() {
  return (
    <section className="px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Skills & Expertise" title="What the work is built with." />
        <ul className="mt-14">
          {SKILL_GROUPS.map((group) => (
            <SkillRow key={group.id} group={group} />
          ))}
        </ul>
      </div>
    </section>
  );
}
