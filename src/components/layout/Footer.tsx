import { ArrowUp } from "lucide-react";
import { SITE } from "../../data/site";
import { SignatureFlourish } from "../ui/SignatureFlourish";

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#121826]/10 px-6 py-10 md:px-10">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <div>
          <p className="font-serif text-lg text-[#121826]">{SITE.name}</p>
          <p className="mt-1 text-sm text-[#2A2F45]">
            {SITE.role} — designed &amp; developed with React 19 + TypeScript, {currentYear}.
          </p>
          <SignatureFlourish />
        </div>
        <button
          type="button"
          onClick={scrollToTop}
          className="flex min-h-[44px] items-center gap-2 rounded-full border border-[#121826]/10 px-4 py-2 text-sm text-[#2A2F45] transition-colors hover:border-[#121826]/30 hover:text-[#121826] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF8A5B]"
        >
          Back to top <ArrowUp size={14} />
        </button>
      </div>
    </footer>
  );
}
