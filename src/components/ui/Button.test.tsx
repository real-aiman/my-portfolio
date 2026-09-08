import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { PrimaryButton, SecondaryButton, TextLink } from "./Button";

describe("PrimaryButton", () => {
  it("renders as a link when href is given", () => {
    render(<PrimaryButton href="#work">View Work</PrimaryButton>);
    const link = screen.getByRole("link", { name: /view work/i });
    expect(link).toHaveAttribute("href", "#work");
  });

  it("renders as a button and fires onClick when no href is given", async () => {
    const handleClick = vi.fn();
    render(<PrimaryButton onClick={handleClick}>Submit</PrimaryButton>);
    const button = screen.getByRole("button", { name: /submit/i });
    await userEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("is reachable via keyboard (Tab + Enter), not just pointer", async () => {
    const handleClick = vi.fn();
    render(<PrimaryButton onClick={handleClick}>Submit</PrimaryButton>);
    await userEvent.tab();
    expect(screen.getByRole("button", { name: /submit/i })).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

describe("SecondaryButton", () => {
  it("opens external links safely (target=_blank + rel=noopener noreferrer)", () => {
    render(<SecondaryButton href="https://example.com">Visit</SecondaryButton>);
    const link = screen.getByRole("link", { name: /visit/i });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });
});

describe("TextLink", () => {
  it("only opens in a new tab for external (http) URLs, not internal anchors", () => {
    render(
      <>
        <TextLink href="https://example.com">External</TextLink>
        <TextLink href="#contact">Internal</TextLink>
      </>
    );
    expect(screen.getByRole("link", { name: /external/i })).toHaveAttribute("target", "_blank");
    expect(screen.getByRole("link", { name: /internal/i })).not.toHaveAttribute("target");
  });
});
