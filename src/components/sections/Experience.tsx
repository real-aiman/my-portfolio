import { Reveal, RevealGroup } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { EXPERIENCE } from "../../data/experience";

export function Experience() {
  return (
    <section id="experience" className="border-t border-[#121826]/10 bg-[#FFD2A6]/50 px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Experience" title="Where the practice happens." />
        <div className="mt-14 space-y-16">
          {EXPERIENCE.map((entry) => (
            <div key={entry.role} className="grid grid-cols-1 gap-8 md:grid-cols-12">
              <Reveal className="md:sticky md:top-28 md:col-span-4 md:self-start">
                <h3 className="font-serif text-2xl text-[#121826]">{entry.role}</h3>
                <p className="mt-2 text-[#2A2F45]">{entry.org}</p>
                <p className="mt-1 text-sm text-[#2A2F45]">{entry.location}</p>
                <p className="mt-4 text-sm text-[#FF8A5B]">{entry.period}</p>
              </Reveal>

              <RevealGroup className="md:col-span-8">
                <ul className="space-y-5 border-l border-[#121826]/10 pl-6">
                  {entry.points.map((point) => (
                    <Reveal as="li" key={point} className="leading-relaxed text-[#2A2F45]">
                      {point}
                    </Reveal>
                  ))}
                </ul>
              </RevealGroup>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
