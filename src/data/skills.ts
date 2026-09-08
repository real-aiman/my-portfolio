import type { SkillGroup } from "../types";

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: "frontend",
    label: "Frontend",
    blurb: "Core languages and the interfaces built with them.",
    items: ["JavaScript ES6+", "TypeScript", "HTML5", "CSS3", "React 19", "Tailwind CSS", "Bootstrap"],
  },
  {
    id: "motion",
    label: "Motion & State",
    blurb: "Animation and state tools used to make interfaces feel alive.",
    items: ["Framer Motion", "GSAP", "Zustand", "Context API"],
  },
  {
    id: "data",
    label: "Data & APIs",
    blurb: "Connecting interfaces to the data behind them.",
    items: ["REST API Integration", "Asynchronous JavaScript", "JSON"],
  },
  {
    id: "commerce",
    label: "WordPress & Commerce",
    blurb: "Where most client work has lived so far.",
    items: ["WordPress", "WooCommerce", "Custom Themes", "Custom Templates", "Page Layouts", "E-Commerce Functionality"],
  },
  {
    id: "tooling",
    label: "Tooling & Practice",
    blurb: "How the work actually gets built and shipped.",
    items: [
      "Git",
      "GitHub",
      "Vite",
      "VS Code",
      "Chrome DevTools",
      "React DevTools",
      "Component-Based Architecture",
      "Reusable Components",
      "Responsive Design",
      "Mobile-First Development",
      "Cross-Browser Compatibility",
    ],
  },
];
