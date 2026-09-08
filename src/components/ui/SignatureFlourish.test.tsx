import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SignatureFlourish } from "./SignatureFlourish";

// See ScrambleReveal.test.tsx for why this uses vi.mock instead of
// vi.spyOn: framer-motion's ESM export isn't a configurable binding.
vi.mock("framer-motion", async (importOriginal) => {
  const actual = await importOriginal<typeof import("framer-motion")>();
  return { ...actual, useReducedMotion: vi.fn(() => false) };
});

import { useReducedMotion } from "framer-motion";

describe("SignatureFlourish", () => {
  it("renders a decorative, screen-reader-hidden mark (not real content)", () => {
    const { container } = render(<SignatureFlourish />);
    expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  });

  it("skips the draw-on animation under prefers-reduced-motion", () => {
    vi.mocked(useReducedMotion).mockReturnValue(true);
    const { container } = render(<SignatureFlourish />);
    expect(container.querySelector("path")).toBeInTheDocument();
    vi.mocked(useReducedMotion).mockReturnValue(false);
  });
});
