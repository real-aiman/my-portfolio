import { Reveal, RevealGroup } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { PROFESSIONAL_ATTRIBUTES } from "../../data/experience";

export function Philosophy() {
  return (
    <section className="px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="What I Bring" title="A short list of working habits." />
        <RevealGroup className="mt-14 grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2">
          {PROFESSIONAL_ATTRIBUTES.map((attribute, index) => (
            <Reveal key={attribute} className="flex items-start gap-5 border-t border-[#121826]/10 pt-6">
              <span className="font-serif text-lg text-[#FF8A5B]">{String(index + 1).padStart(2, "0")}</span>
              <span className="text-lg text-[#121826]">{attribute}</span>
            </Reveal>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
