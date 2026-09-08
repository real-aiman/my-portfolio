import type { MouseEventHandler, ReactNode } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";

interface PrimaryButtonProps {
  href?: string;
  onClick?: MouseEventHandler;
  children: ReactNode;
  icon?: ReactNode;
}

/** Solid CTA button. Renders as an <a> when `href` is given, else a <button>. */
export function PrimaryButton({ href, onClick, children, icon }: PrimaryButtonProps) {
  const content = (
    <span className="group inline-flex items-center gap-2.5 rounded-full bg-[#121826] px-6 py-3.5 text-[15px] font-medium text-[#FFF3E9] transition-transform duration-300 ease-out hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF8A5B]">
      {children}
      <span className="transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
        {icon ?? <ArrowRight size={16} />}
      </span>
    </span>
  );

  if (href) {
    return (
      <a href={href} onClick={onClick} data-cursor="hover" className="inline-block min-h-[44px]">
        {content}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} data-cursor="hover" className="inline-block min-h-[44px]">
      {content}
    </button>
  );
}

interface SecondaryButtonProps {
  href: string;
  children: ReactNode;
}

/** Outlined button, always an external link. */
export function SecondaryButton({ href, children }: SecondaryButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor="hover"
      className="group inline-flex min-h-[44px] items-center gap-2.5 rounded-full border border-[#121826]/15 px-6 py-3.5 text-[15px] font-medium text-[#121826] transition-colors duration-300 hover:border-[#121826]/35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF8A5B]"
    >
      {children}
      <ArrowUpRight
        size={16}
        className="transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </a>
  );
}

interface TextLinkProps {
  href: string;
  children: ReactNode;
}

/** Underline-hover text link. External by default (mailto/# are the exceptions). */
export function TextLink({ href, children }: TextLinkProps) {
  const isExternal = href.startsWith("http");
  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="relative inline-block text-[#121826] after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-100 after:bg-[#121826]/30 after:transition-transform after:duration-300 hover:after:scale-x-0"
    >
      {children}
    </a>
  );
}
