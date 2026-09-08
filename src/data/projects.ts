import type { Project } from "../types";

export const PROJECTS: Project[] = [
  {
    id: "pinnaclecraft",
    index: "01",
    name: "PinnacleCraft",
    category: "Client Website",
    type: "WordPress",
    description:
      "A custom business website built around structured service pages, client inquiry handling, and a quote-based purchasing workflow rather than a fixed checkout.",
    highlights: ["Custom WordPress build", "Quote workflow", "Responsive UI"],
    tech: ["WordPress", "PHP", "Custom Theme"],
    image: "/projects/pinnaclecraft.webp",
    liveUrl: "https://pinnaclecraft.co",
    overview:
      "PinnacleCraft needed a site that could present its services clearly and route every inquiry into a manageable request, since pricing depends on project scope rather than a catalog.",
    challenge:
      "Standard WooCommerce checkout didn't fit a business that quotes projects individually. The site needed to feel like a storefront while functioning like an intake form.",
    approach:
      "Built a custom WordPress theme with structured service templates and a quote-request flow, keeping page load light and forms simple enough to complete on mobile.",
    outcome:
      "A site that reads as a normal business website to visitors, while every submission arrives as a structured, actionable request.",
    span: "wide",
  },
  {
    id: "rozeeatelier",
    index: "02",
    name: "RozeeAtelier",
    category: "E-Commerce",
    type: "WooCommerce",
    description:
      "An apparel and fabric storefront supporting custom measurements, dual-currency pricing in PKR and CAD, and a booking flow for stitching and alterations.",
    highlights: ["WooCommerce", "Custom product experience", "PKR / CAD pricing", "Booking flow"],
    tech: ["WordPress", "WooCommerce", "JavaScript"],
    image: "/projects/rozeeatelier.webp",
    liveUrl: "https://rozeeatelier.com",
    overview:
      "RozeeAtelier sells both ready fabric and made-to-measure garments to customers in Pakistan and Canada, which meant the product experience had to handle two very different buying paths.",
    challenge:
      "Default WooCommerce product pages don't support measurement input or service bookings, and a single price field can't represent two currencies cleanly.",
    approach:
      "Extended product templates with measurement fields and a stitching/alteration booking flow, and configured pricing logic to display PKR and CAD correctly by region.",
    outcome:
      "Customers can order fabric directly or book a fitted garment in the same storefront, in the currency that makes sense for them.",
    span: "wide",
  },
  {
    id: "pulsecare",
    index: "03",
    name: "PulseCare",
    category: "Hospital Dashboard",
    type: "React Application",
    description:
      "A modular medical analytics dashboard built from reusable panels, giving staff a clear visual read on hospital data without digging through raw tables.",
    highlights: ["Modular panels", "Data visualization", "Reusable components"],
    tech: ["React 19", "Tailwind CSS", "Chart.js"],
    image: "/projects/pulsecare.webp",
    githubUrl: "https://github.com/real-aiman",
    overview:
      "PulseCare is a dashboard concept for visualizing hospital operations data through charts and summary panels that can be reused across different report types.",
    challenge:
      "Dashboards tend to calcify into one-off screens. This one needed panels flexible enough to be rearranged as reporting needs changed.",
    approach:
      "Designed a component library of chart and metric panels driven by typed data props, so new views could be assembled from existing pieces instead of new code.",
    outcome:
      "A dashboard architecture where a new report is a new arrangement of existing panels, not a new page.",
    span: "half",
  },
  {
    id: "ai-resume-maker",
    index: "04",
    name: "AI Resume Maker",
    category: "Web Application",
    type: "React Application",
    description:
      "An interactive resume builder where layouts update dynamically as the user types, backed by centralized state rather than scattered component props.",
    highlights: ["Dynamic layouts", "Zustand state", "Live preview"],
    tech: ["React 19", "Tailwind CSS", "Zustand"],
    image: "/projects/resume-maker.webp",
    githubUrl: "https://github.com/real-aiman",
    overview:
      "A resume builder that shows a live, formatted preview beside the input form, so changes are visible immediately rather than after a generate step.",
    challenge:
      "Keeping form state and multiple layout templates in sync without prop-drilling through every section.",
    approach:
      "Centralized resume data in a Zustand store so any template component could read and render the same state independently.",
    outcome:
      "Users can switch templates instantly without losing input, since the layout is just a different view of the same store.",
    span: "half",
  },
  {
    id: "vynora",
    index: "06",
    name: "Vynora",
    category: "Event Discovery",
    type: "React Application",
    description:
      "A frontend event discovery and ticketing platform with combined filters, personalized recommendations, persistent favorites, and a simulated end-to-end booking flow.",
    highlights: ["Event discovery", "Advanced filtering", "Ticket booking", "Persistent cart"],
    tech: ["React 18", "TypeScript", "Zustand", "TanStack Query", "Tailwind CSS"],
    image: "/projects/vynora.webp",
    githubUrl: "https://github.com/real-aiman/Vynora-project",
    overview:
      "Vynora is a frontend-only event discovery and ticketing experience for concerts, exhibitions, workshops, sports, festivals, and local events, built around a realistic browsing and booking flow.",
    challenge:
      "The experience needed to combine discovery, filtering, favorites, recently viewed events, ticket quantities, checkout validation, and mobile overlays without letting state become scattered across the UI.",
    approach:
      "Used Zustand for cross-cutting client state and TanStack Query for the event data layer, with responsive Tailwind layouts, Framer Motion interactions, accessible overlays, and a simulated checkout flow.",
    outcome:
      "A polished event-booking prototype that demonstrates production-minded state management, responsive UX, accessibility, and realistic client-side interaction patterns.",
    span: "wide",
  },
  {
    id: "amira-store",
    index: "05",
    name: "Amira Store",
    category: "E-Commerce",
    type: "React Application",
    description:
      "A responsive storefront using asynchronous product fetching, cart interactions, and a component library built for reuse across product types.",
    highlights: ["Async data fetching", "Cart state", "Reusable components"],
    tech: ["React 19", "Tailwind CSS", "REST API"],
    image: "/projects/amira-store.webp",
    githubUrl: "https://github.com/real-aiman",
    overview:
      "Amira Store is a storefront built to practice a clean separation between data fetching, cart logic, and presentation components.",
    challenge:
      "Handling loading and error states for product data without cluttering the UI components with fetch logic.",
    approach:
      "Isolated REST calls into hooks, keeping presentational components focused purely on layout and interaction.",
    outcome:
      "A storefront where product listings, cart, and checkout steps can be modified independently of one another.",
    span: "wide",
  },
];
