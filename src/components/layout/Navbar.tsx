import { useCallback, useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useActiveSection } from "../../hooks/useActiveSection";
import { useScrolled } from "../../hooks/useScrolled";
import { NAV_ITEMS, OBSERVED_SECTION_IDS, SITE } from "../../data/site";
import { EASE } from "../../lib/motion";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isScrolled = useScrolled();
  const activeSectionId = useActiveSection(OBSERVED_SECTION_IDS);
  const menuId = useId();
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  /** Closes the menu and returns focus to the toggle button — used for
   *  explicit close actions (Escape) where the user's focus needs a
   *  predictable landing spot. Not used for outside-clicks or link
   *  clicks, where focus has already moved somewhere sensible. */
  const closeMenuAndRestoreFocus = useCallback(() => {
    setIsMenuOpen(false);
    menuButtonRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenuAndRestoreFocus();
    };
    const handleOutsideClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isMenuOpen, closeMenuAndRestoreFocus]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled ? "backdrop-blur-md bg-[#FFF3E9]/85 border-b border-[#121826]/8" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 md:px-10">
        <a
          href="#top"
          className="group flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#121826]/15 bg-[#FFF3E9] shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FF8A5B] sm:h-11 sm:w-11"
          aria-label="Aiman Shafiq, back to top"
        >
          <img
            src="/images/aiman-about.webp"
            alt="Aiman Shafiq"
            className="h-full w-full object-cover object-[50%_22%] transition-transform duration-300 group-hover:scale-105"
            width="44"
            height="44"
            decoding="async"
          />
        </a>

        <ul className="hidden items-center gap-9 md:flex">
          {NAV_ITEMS.map((item) => {
            const sectionId = item.href.slice(1);
            const isActive = activeSectionId === sectionId;
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={`text-[15px] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FF8A5B] ${
                    isActive ? "text-[#121826]" : "text-[#2A2F45] hover:text-[#121826]"
                  }`}
                  aria-current={isActive ? "location" : undefined}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={SITE.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="hover"
            className="text-[15px] text-[#2A2F45] transition-colors duration-200 hover:text-[#121826] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FF8A5B]"
          >
            View CV
          </a>
          <a
            href="#contact"
            data-cursor="hover"
            className="rounded-full border border-[#121826]/15 px-5 py-2.5 text-[15px] text-[#121826] transition-colors duration-200 hover:border-[#121826]/35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF8A5B]"
          >
            Let&apos;s Talk
          </a>
        </div>

        <button
          ref={menuButtonRef}
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-full text-[#121826] md:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF8A5B]"
          onClick={() => setIsMenuOpen((wasOpen) => !wasOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          aria-controls={menuId}
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id={menuId}
            ref={menuRef}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="overflow-hidden border-t border-[#121826]/8 bg-[#FFF3E9] md:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 py-6">
              {NAV_ITEMS.map((item, index) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * index, duration: 0.3, ease: EASE }}
                >
                  <a
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block min-h-[44px] py-2.5 font-serif text-2xl text-[#121826]"
                  >
                    {item.label}
                  </a>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.3, ease: EASE }}
                className="mt-4 flex flex-wrap items-center gap-3"
              >
                <a
                  href="#contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="inline-block min-h-[44px] rounded-full bg-[#121826] px-6 py-3 text-[15px] text-[#FFF3E9]"
                >
                  Let&apos;s Talk
                </a>
                <a
                  href={SITE.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center rounded-full border border-[#121826]/15 px-6 py-3 text-[15px] text-[#121826]"
                >
                  View CV
                </a>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
