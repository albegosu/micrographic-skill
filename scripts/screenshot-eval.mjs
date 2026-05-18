#!/usr/bin/env node
import { chromium } from "playwright";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const html = join(root, "examples/v1.1.0-micrographic-skill.html");
const out = join(root, "examples/v1.1.0-micrographic-skill.png");

const browser = await chromium.launch();
const page = await browser.newPage({ deviceScaleFactor: 2 });
await page.setViewportSize({ width: 700, height: 560 });
await page.goto(`file://${html}`, { waitUntil: "networkidle" });
await page.waitForTimeout(500);

const card = page.locator(".pkg-card");
await card.screenshot({ path: out, type: "png" });
await browser.close();
console.log(`Wrote ${out}`);
