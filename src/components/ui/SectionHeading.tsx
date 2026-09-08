import { InkUnderline } from "./InkUnderline";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
}

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="max-w-2xl">
      <p className="text-sm text-[#FF8A5B] mb-1">{eyebrow}</p>
      <InkUnderline />
      <h2 className="mt-3 font-serif text-[clamp(2rem,4vw,3rem)] leading-[1.1] text-[#121826]">{title}</h2>
      {description && <p className="mt-5 text-[#2A2F45] text-lg leading-relaxed max-w-xl">{description}</p>}
    </div>
  );
}
