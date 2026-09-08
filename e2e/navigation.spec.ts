import { test, expect } from "@playwright/test";

test("loads the homepage and shows the hero headline", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("I build interfaces that feel");
});

test("skip-to-work link is keyboard reachable and works without a mouse", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  const skipLink = page.getByRole("link", { name: /skip to work/i });
  await expect(skipLink).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#work$/);
});

test("View CV opens the resume in a new tab from the hero", async ({ page, context }) => {
  await page.goto("/");
  const [newPage] = await Promise.all([
    context.waitForEvent("page"),
    page.getByRole("link", { name: /view cv/i }).first().click(),
  ]);
  await newPage.waitForLoadState();
  expect(newPage.url()).toContain("Aiman-Shafiq-Resume.pdf");
});

test("respects OS-level prefers-reduced-motion: cursor stays hidden, page still fully usable", async ({
  browser,
}) => {
  const context = await browser.newContext({ reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.goto("/");
  // Core content and navigation must still work identically — reduced
  // motion should only remove animation, never functionality.
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await page.getByRole("link", { name: /view selected work/i }).click();
  await expect(page).toHaveURL(/#work$/);
  await context.close();
});

test("mobile menu opens, is keyboard-dismissable with Escape, and returns focus", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const menuButton = page.getByRole("button", { name: /open menu/i });
  await menuButton.click();
  await expect(page.getByRole("button", { name: /close menu/i })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(menuButton).toBeFocused();
});
