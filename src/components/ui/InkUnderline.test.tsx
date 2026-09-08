import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { InkUnderline } from "./InkUnderline";

describe("InkUnderline", () => {
  it("renders as a decorative mark hidden from screen readers", () => {
    const { container } = render(<InkUnderline />);
    expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  });
});
