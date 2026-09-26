#!/usr/bin/env node
// Usage: node scripts/screenshot-eval.mjs [examples/page.html] [selector]
// Writes a PNG next to the HTML (same basename). Defaults to the v1.1.0 eval card.
import { chromium } from "playwright";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const [htmlPath = "examples/v1.1.0-micrographic-skill.html", selector = ".pkg-card"] = process.argv.slice(2);
const html = join(root, htmlPath);
const out = html.replace(/\.html$/, ".png");

const browser = await chromium.launch();
const page = await browser.newPage({ deviceScaleFactor: 2 });
await page.setViewportSize({ width: 700, height: 560 });
await page.goto(`file://${html}`, { waitUntil: "networkidle" });
await page.waitForTimeout(500);

const card = page.locator(selector);
await card.screenshot({ path: out, type: "png" });
await browser.close();
console.log(`Wrote ${out}`);
