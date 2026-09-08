import type { EducationEntry, ExperienceEntry } from "../types";

export const EXPERIENCE: ExperienceEntry[] = [
  {
    role: "Frontend Developer Intern",
    org: "Vantec Media",
    location: "Lahore, Pakistan",
    period: "2026 — Present",
    points: [
      "Builds React 19 frontends for client projects using component-based architecture.",
      "Develops custom WordPress themes and WooCommerce storefronts end to end.",
      "Manages state with Zustand and Context API depending on project scope.",
      "Integrates REST APIs and handles asynchronous data across dashboards and storefronts.",
      "Customizes themes, templates and rewrite rules to match client requirements.",
      "Debugs production issues including caching conflicts, deprecated functions and cross-browser rendering.",
    ],
  },
];

export const EDUCATION: EducationEntry[] = [
  { program: "BS Information Technology", institution: "University of the Punjab — Affiliated College", status: "Expected 2028" },
  { program: "Intermediate", institution: "", status: "Passed 2024" },
  { program: "Matriculation", institution: "", status: "Passed 2022" },
];

export const PROFESSIONAL_ATTRIBUTES: string[] = [
  "Client-Focused Development",
  "Component-Based Architecture",
  "Responsive & Mobile-First Development",
  "Problem Solving & Debugging",
  "Custom WordPress Theme Development",
  "Continuous Technical Learning",
];
