import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

// A render-based test would need every section's real data/images/router
// context to mount App fully — too heavy for what's actually being
// guarded here. What matters is that the MotionConfig wrapper exists and
// isn't accidentally removed in a future edit, so this checks the source
// directly instead.
//
// Built via fileURLToPath + path.join rather than `new URL("./App.tsx",
// import.meta.url)` — under vitest's jsdom test environment the global
// URL constructor doesn't reliably resolve relative file:// URLs, which
// throws "The URL must be of scheme file" when handed to readFileSync.
const currentDir = dirname(fileURLToPath(import.meta.url));

describe("App reduced-motion wiring", () => {
  it("wraps the app in MotionConfig with reducedMotion=\"user\"", () => {
    const source = readFileSync(join(currentDir, "App.tsx"), "utf-8");
    expect(source).toMatch(/<MotionConfig\s+reducedMotion="user">/);
  });
});
