import { useEffect, useState } from "react";

/**
 * Tracks which of the given section ids currently has the most
 * visible intersection with the viewport, for nav "current section"
 * highlighting.
 *
 * `ids` should be a stable, module-level array reference (see
 * data/site.ts OBSERVED_SECTION_IDS). An inline array literal at the
 * call site would create a new reference on every render and force
 * this effect to tear down and reattach its observer every render.
 */
export function useActiveSection(ids: readonly string[]): string {
  const [activeId, setActiveId] = useState<string>(ids[0] ?? "");

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const mostVisible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (mostVisible) {
          setActiveId(mostVisible.target.id);
        }
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return activeId;
}
