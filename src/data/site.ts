import type { NavigationItem } from "../types";

/**
 * Single source of truth for identity/contact facts referenced across
 * the nav, hero, contact section, footer and document metadata.
 * Change once here instead of hunting through components.
 */
export const SITE = {
  name: "Aiman Shafiq",
  role: "Frontend Developer",
  location: "Lahore, Pakistan",
  email: "aimanmalik3447@gmail.com",
  linkedinUrl: "https://www.linkedin.com/in/aiman-shafiq-0ab1213ab",
  linkedinLabel: "aiman-shafiq",
  githubUrl: "https://github.com/real-aiman",
  githubLabel: "real-aiman",
  resumeUrl: "/Aiman-Shafiq-Resume.pdf",
  title: "Aiman Shafiq — Frontend Developer",
  description:
    "Frontend Developer specializing in React 19, TypeScript, WordPress and modern responsive interfaces.",
} as const;

export const NAV_ITEMS: NavigationItem[] = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

/**
 * Stable, module-level array reference — deliberately not built inline
 * where it's consumed, so effects that depend on it don't re-run on
 * every render (see hooks/useActiveSection.ts).
 */
export const OBSERVED_SECTION_IDS = ["work", "about", "experience", "contact"] as const;

export const TECH_MARQUEE_ITEMS: string[] = [
  "React 19",
  "TypeScript",
  "WordPress",
  "WooCommerce",
  "Tailwind CSS",
  "Framer Motion",
  "REST APIs",
  "Zustand",
];
