# Aiman Shafiq — Frontend Developer Portfolio

<p align="center">
  <strong>Modern frontend portfolio built with React 19, TypeScript and a production-minded component architecture.</strong>
</p>

<p align="center">
  <a href="https://github.com/real-aiman/my-portfolio">Repository</a> ·
  <a href="https://real-aiman.github.io/my-portfolio/">Live Portfolio</a> ·
  <a href="https://www.linkedin.com/in/aiman-shafiq-0ab1213ab">LinkedIn</a>
</p>

## ✨ Overview

This repository contains the source code for Aiman Shafiq's frontend developer portfolio. It presents selected client work, e-commerce builds, React applications, experience and contact information through a responsive, animation-rich single-page experience.

The project is intentionally structured around reusable components and centralized content data so the portfolio can evolve without duplicating content across the UI.

## 🚀 Highlights

- **React 19 + TypeScript** for a strongly typed, maintainable frontend.
- **Responsive-first UI** across mobile, tablet and desktop breakpoints.
- **Framer Motion** for purposeful transitions and micro-interactions.
- **Accessible interactions** including keyboard-friendly navigation, focus states and reduced-motion support.
- **SEO foundations** with document metadata, Open Graph tags, Twitter card metadata and favicon/OG assets.
- **Project storytelling** with reusable project cards and detailed project modals.
- **Centralized portfolio data** for identity, navigation, technologies and project content.
- **Performance-conscious structure** with reusable UI primitives and lightweight static assets.
- **Automated quality checks** for linting, type safety, tests and production builds.
- **End-to-end coverage** for critical navigation flows with Playwright.

## 🧰 Tech Stack

| Category | Technologies |
| --- | --- |
| UI | React 19, TypeScript |
| Styling | Tailwind CSS, CSS |
| Animation | Framer Motion |
| Icons | Lucide React |
| Build | Vite |
| Testing | Vitest, Testing Library, Playwright |
| Quality | ESLint, TypeScript |
| Deployment | GitHub Pages / static hosting |

## 📁 Project Structure

```text
my-portfolio/
├── e2e/                         # Playwright end-to-end tests
├── public/
│   ├── images/                  # Portfolio imagery
│   ├── projects/                # Project thumbnails / visual assets
│   ├── Aiman-Shafiq-Resume.pdf  # Resume
│   ├── favicon.svg
│   └── og-image.svg
├── src/
│   ├── components/
│   │   ├── icons/               # Brand/icon components
│   │   ├── layout/              # Navbar, footer
│   │   ├── sections/             # Portfolio sections
│   │   └── ui/                  # Reusable interface primitives
│   ├── data/                    # Centralized site/project content
│   ├── hooks/                   # Reusable React hooks
│   ├── lib/                     # SEO and utility helpers
│   ├── types/                   # Shared TypeScript types
│   ├── App.tsx
│   └── main.tsx
├── e2e/
├── eslint.config.js
├── playwright.config.ts
├── postcss.config.js
├── package.json
└── vite.config.ts
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 20+
- npm 10+

### Installation

```bash
git clone https://github.com/real-aiman/my-portfolio.git
cd my-portfolio
npm install
```

### Development

```bash
npm run dev
```

The Vite development server will print the local URL in your terminal.

## ✅ Quality Checks

Run the same checks used for production readiness:

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

For end-to-end browser tests:

```bash
npx playwright install --with-deps chromium
npm run test:e2e
```

## 📜 Available Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Type-check and create a production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript without emitting files |
| `npm test` | Run the Vitest test suite once |
| `npm run test:watch` | Run Vitest in watch mode |
| `npm run test:e2e` | Run Playwright end-to-end tests |

## 🧩 Featured Work

### PinnacleCraft
Custom WordPress business website focused on structured service pages and a quote-request workflow.

### RozeeAtelier
WooCommerce apparel and fabric storefront with custom product experiences, PKR/CAD pricing and booking flows.

### PulseCare
React hospital analytics dashboard built around reusable metric and visualization panels.

### AI Resume Maker
Interactive resume builder with live layouts and centralized Zustand state management.

### Vynora
Event discovery and ticket-booking frontend demonstrating filtering, favorites, persistent state and a realistic checkout flow.

### Amira Store
Responsive React storefront demonstrating asynchronous product fetching, cart state and reusable UI components.

## ♿ Accessibility & UX

Accessibility is treated as part of the implementation rather than a final polish step. The portfolio includes semantic section structure, visible keyboard focus states, a skip link, accessible interactive controls and reduced-motion handling through Framer Motion configuration.

## 🔍 SEO & Sharing

The application sets page metadata from a single site configuration and includes Open Graph/Twitter metadata, a favicon and an OG image asset. This keeps identity and social-preview content consistent across the portfolio.

## 🤝 Contributing

This is a personal portfolio, but focused improvements are welcome. Before opening a pull request:

1. Keep changes scoped and production-oriented.
2. Preserve the existing component/data separation.
3. Run lint, typecheck, tests and build locally.
4. Include a clear description of the user-facing or engineering improvement.

## 📄 License

This project is personal portfolio source code. See the repository for the applicable license and usage terms.

## 📬 Contact

**Aiman Shafiq** — Frontend Developer

- LinkedIn: [aiman-shafiq](https://www.linkedin.com/in/aiman-shafiq-0ab1213ab)
- GitHub: [real-aiman](https://github.com/real-aiman)
- Email: aimanmalik3447@gmail.com

---

<p align="center">Built with React, TypeScript and attention to detail.</p>
