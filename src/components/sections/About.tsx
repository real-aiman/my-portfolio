import { Reveal } from "../ui/Reveal";
import { InkUnderline } from "../ui/InkUnderline";
import { EDUCATION } from "../../data/experience";

export function About() {
  return (
    <section id="about" className="border-t border-[#121826]/10 bg-[#FFD2A6]/50 px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-5">
          <p className="text-sm text-[#FF8A5B] mb-1">About</p>
          <InkUnderline />
          <h2 className="mt-3 font-serif text-[clamp(2rem,4vw,3rem)] leading-[1.1] text-[#121826]">
            Frontend work, learned by shipping it.
          </h2>
          <div className="mt-10 aspect-[4/5] w-full max-w-xs overflow-hidden rounded-[2px] border border-[#121826]/10 bg-[#FFF3E9] shadow-[0_18px_50px_rgba(18,24,38,0.10)]">
            <img
              src="/images/aiman-about.webp"
              alt="Aiman Shafiq working at a desk"
              className="h-full w-full object-cover object-center transition-transform duration-700 hover:scale-[1.02]"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        <Reveal className="md:col-span-7">
          <div className="max-w-xl space-y-6 text-[#2A2F45] leading-relaxed text-lg">
            <p>
              Aiman Shafiq is a Frontend Developer with hands-on WordPress
              experience at Vantec Media, working across React applications,
              WordPress websites and WooCommerce storefronts.
            </p>
            <p>
              Her work spans responsive UI development, component-based
              architecture, reusable components, REST API integrations and
              e-commerce experiences — the practical range that client
              projects tend to demand.
            </p>
            <p>
              She completed NAVTTAC-certified React 19 training, and is
              currently studying BS Information Technology at a University of
              the Punjab affiliated college, expected to graduate in 2028.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-6 border-t border-[#121826]/10 pt-8 max-w-lg">
            {EDUCATION.map((entry) => (
              <div key={entry.program}>
                <p className="text-[15px] text-[#121826]">{entry.program}</p>
                {entry.institution && <p className="mt-1 text-sm text-[#2A2F45]">{entry.institution}</p>}
                <p className="mt-1 text-sm text-[#FF8A5B]">{entry.status}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
