import { useEffect } from "react";
import { MotionConfig } from "framer-motion";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { Hero } from "./components/sections/Hero";
import { TechTicker } from "./components/sections/TechTicker";
import { Work } from "./components/sections/Work/Work";
import { About } from "./components/sections/About";
import { Skills } from "./components/sections/Skills";
import { Experience } from "./components/sections/Experience";
import { Philosophy } from "./components/sections/Philosophy";
import { Contact } from "./components/sections/Contact";
import { CustomCursor } from "./components/ui/CustomCursor";
import { ScrollProgress } from "./components/ui/ScrollProgress";
import { SITE } from "./data/site";
import { setMetaTag } from "./lib/seo";

export default function App() {
  useEffect(() => {
    document.documentElement.lang = "en";
    document.title = SITE.title;
    setMetaTag("description", SITE.description);
    setMetaTag("og:title", SITE.title, "property");
    setMetaTag("og:description", SITE.description, "property");
    setMetaTag("og:type", "website", "property");
    setMetaTag("twitter:card", "summary");
    setMetaTag("twitter:title", SITE.title);
    setMetaTag("twitter:description", SITE.description);
  }, []);

  return (
    // reducedMotion="user" makes this the single source of truth for
    // prefers-reduced-motion: Framer Motion automatically strips
    // transform-based animation (x, y, scale, rotate) from every
    // motion.* component tree-wide when the OS setting is on, without
    // each component needing its own useReducedMotion() check. The
    // manual checks already in Hero/CustomCursor/Magnetic/etc. still
    // run (they also skip attaching pointer listeners, which this
    // can't do), so this is an additive safety net — new sections
    // that forget the manual check are still covered.
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen scroll-smooth bg-[#FFF3E9] font-sans text-[#121826] antialiased">
        <ScrollProgress />
        <CustomCursor />

        <a
          href="#work"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-[#121826] focus:px-5 focus:py-3 focus:text-[#FFF3E9]"
        >
          Skip to work
        </a>
        <Navbar />
        <main>
          <Hero />
          <TechTicker />
          <Work />
          <About />
          <Skills />
          <Experience />
          <Philosophy />
          <Contact />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
}
