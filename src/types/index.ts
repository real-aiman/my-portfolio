/**
 * Central domain types for the portfolio.
 * Kept separate from data and presentation so either can change
 * shape without touching the other.
 */

export interface NavigationItem {
  label: string;
  /** Always an in-page anchor, enforced at the type level. */
  href: `#${string}`;
}

export type ProjectSpan = "wide" | "half";

export interface Project {
  id: string;
  index: string;
  name: string;
  category: string;
  type: string;
  description: string;
  highlights: string[];
  tech: string[];
  image: string;
  /** Optional — not every project has a live deployment. */
  liveUrl?: string;
  /** Optional — not every project has a public repository. */
  githubUrl?: string;
  overview: string;
  challenge: string;
  approach: string;
  outcome: string;
  span: ProjectSpan;
}

export interface SkillGroup {
  id: string;
  label: string;
  blurb: string;
  items: string[];
}

export interface ExperienceEntry {
  role: string;
  org: string;
  location: string;
  period: string;
  points: string[];
}

export interface EducationEntry {
  program: string;
  /** Empty string when the level predates a named institution. */
  institution: string;
  status: string;
}
