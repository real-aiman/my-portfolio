import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ScrambleReveal } from "./ScrambleReveal";

// framer-motion's ESM build exports useReducedMotion as a non-configurable
// binding, so vi.spyOn(framerMotion, "useReducedMotion") throws ("Cannot
// redefine property") under Vite's module transform. vi.mock with
// importOriginal swaps just that export instead, keeping everything else
// (motion, AnimatePresence, etc.) real.
vi.mock("framer-motion", async (importOriginal) => {
  const actual = await importOriginal<typeof import("framer-motion")>();
  return { ...actual, useReducedMotion: vi.fn(() => false) };
});

import { useReducedMotion } from "framer-motion";

describe("ScrambleReveal", () => {
  it("always exposes the real text to screen readers, even mid-scramble", () => {
    render(<ScrambleReveal text="Frontend Developer" />);
    // Two nodes carry this text (the aria-hidden animated one and the
    // sr-only one) — the selector picks out the sr-only node specifically,
    // since that's the one this test is actually about.
    const srOnly = screen.getByText("Frontend Developer", { selector: ".sr-only" });
    expect(srOnly).toHaveClass("sr-only");
  });

  it("skips the scramble animation entirely under prefers-reduced-motion", () => {
    vi.mocked(useReducedMotion).mockReturnValue(true);
    render(<ScrambleReveal text="Frontend Developer" />);
    const visible = screen.getByText("Frontend Developer", { selector: "[aria-hidden='true']" });
    expect(visible).toBeInTheDocument();
    vi.mocked(useReducedMotion).mockReturnValue(false);
  });
});
