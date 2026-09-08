import "@testing-library/jest-dom/vitest";

// framer-motion animates via matchMedia in a few hooks (useReducedMotion,
// useFinePointer) — jsdom doesn't implement it, so components using those
// hooks throw without this stub.
if (!window.matchMedia) {
  window.matchMedia = (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }) as unknown as MediaQueryList;
}

// framer-motion's whileInView / useInView features (used by Reveal,
// ScrambleReveal, InkUnderline, SignatureFlourish, etc.) construct a real
// IntersectionObserver on mount — jsdom doesn't implement it, so any
// component using scroll-triggered reveal throws without this stub.
if (!window.IntersectionObserver) {
  class MockIntersectionObserver implements IntersectionObserver {
    readonly root: Element | Document | null = null;
    readonly rootMargin: string = "";
    readonly thresholds: ReadonlyArray<number> = [];
    observe = () => {};
    unobserve = () => {};
    disconnect = () => {};
    takeRecords = () => [];
  }
  window.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;
  globalThis.IntersectionObserver = window.IntersectionObserver;
}
