#!/usr/bin/env node
// Usage: node scripts/build-hero.mjs
// Builds the README hero (assets/hero.html → assets/hero.png) from DESIGN.md itself:
// palette, type scale and token counts are read from its front matter, the drift
// line from scripts/check-design-md.mjs. Rendered with the real fonts (Barlow
// Condensed, IBM Plex Mono), so it looks the same for every visitor.
// Rules it follows: two scales only (display 96px, micro ≤ 11px), accent spent
// exactly three times (corner bracket, active chip, key metric).
import { chromium } from "playwright";
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "yaml";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
const design = readFileSync(join(root, "DESIGN.md"), "utf8");
const front = parse(design.match(/^---\n([\s\S]*?)\n---/)[1]);
const c = front.colors;
const count = (o) => Object.keys(o ?? {}).length;

// The drift guard's own summary: "26 components · 42 values match SKILL.md CSS · …"
let drift = "";
try {
  const out = execFileSync(process.execPath, [join(root, "scripts/check-design-md.mjs")], { encoding: "utf8" });
  const m = out.match(/(\d+) values match SKILL\.md CSS/);
  drift = m ? `${m[1]} VALUES MATCH SKILL.MD` : "";
} catch {
  throw new Error("check-design-md.mjs failed: fix DESIGN.md before building the hero");
}

const W = 960, H = 400;
const neutrals = ["bg", "ink", "dark", "mid", "muted", "faint", "border", "hatch"];
const serial = Array.from({ length: 40 }, (_, i) => String(i).padStart(4, "0")).join(" ");

const html = `<!doctype html>
<html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@300;500;600&family=IBM+Plex+Mono:wght@400;500;600&display=block" rel="stylesheet">
<style>
:root{--bg:${c.bg};--ink:${c.ink};--dark:${c.dark};--mid:${c.mid};--muted:${c.muted};--faint:${c.faint};--border:${c.border};--hatch:${c.hatch};--accent:${c.accent};
--face:'Barlow Condensed','Arial Narrow',sans-serif;--mono:'IBM Plex Mono',ui-monospace,monospace}
*{box-sizing:border-box;margin:0;padding:0}
body{background:var(--bg);font-family:var(--mono);color:var(--ink);-webkit-font-smoothing:antialiased}
.plate{position:relative;width:${W}px;height:${H}px;border:1px solid var(--dark);background:var(--bg);display:grid;grid-template-rows:22px 1fr 18px 22px;overflow:hidden}
.bracket{position:absolute;top:5px;left:5px;width:16px;height:16px;border-top:2px solid var(--accent);border-left:2px solid var(--accent)}
.row{display:flex;align-items:center;justify-content:space-between;padding:0 12px 0 28px;font-size:8px;letter-spacing:.08em;text-transform:uppercase;font-variant-numeric:tabular-nums}
.meta{border-bottom:1px solid var(--border);color:var(--mid)}
.meta b{color:var(--ink);font-weight:600}
.body{display:grid;grid-template-columns:372px 1fr}
.poster{border-right:1px solid var(--border);padding:14px 20px 12px 28px;display:flex;flex-direction:column;position:relative}
.display{font-family:var(--face);font-weight:300;font-size:96px;line-height:.86;letter-spacing:-.02em;text-transform:uppercase;color:var(--ink)}
.dim{position:absolute;right:14px;top:22px;bottom:112px;width:10px;border-left:1px solid var(--faint)}
.dim::before,.dim::after{content:"";position:absolute;left:-4px;width:8px;border-top:1px solid var(--faint)}
.dim::before{top:0}.dim::after{bottom:0}
.dim span{position:absolute;left:6px;top:50%;transform:rotate(90deg) translateX(-50%);transform-origin:left top;font-size:7px;color:var(--muted);white-space:nowrap;letter-spacing:.1em}
.tag{margin-top:14px;font-family:var(--face);font-weight:600;font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--dark)}
.chips{display:flex;gap:4px;margin-top:10px}
.chip{font-family:var(--face);font-weight:600;font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:var(--mid);border:1px solid var(--border);padding:2px 6px;line-height:1.4}
.chip.on{color:var(--accent);border-color:var(--accent)}
.hatch{margin-top:auto;height:42px;border:1px solid var(--border);background-image:repeating-linear-gradient(-45deg,transparent,transparent 3px,var(--hatch) 3px,var(--hatch) 4px);display:flex;align-items:flex-end;justify-content:space-between;padding:4px 6px;font-size:7px;color:var(--muted);letter-spacing:.1em}
.man{display:grid;grid-template-rows:auto auto 1fr}
.sec{padding:10px 14px 8px;border-bottom:1px solid var(--border)}
.h{font-family:var(--face);font-weight:600;font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--mid);display:flex;justify-content:space-between;margin-bottom:6px}
.h i{font-style:normal;font-family:var(--mono);font-weight:400;font-size:7px;color:var(--faint);letter-spacing:.08em}
table{width:100%;border-collapse:collapse;font-size:9px}
th{font-family:var(--face);font-weight:600;font-size:8px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);text-align:left;padding:0 0 3px;border-bottom:1px solid var(--dark)}
td{padding:5px 8px 5px 0;border-bottom:1px solid var(--border);vertical-align:top;color:var(--dark)}
td.f{font-weight:600;color:var(--ink);width:78px}
td.c{font-weight:500;color:var(--ink);white-space:nowrap}
.metrics{display:grid;grid-template-columns:repeat(6,1fr);border-top:1px solid var(--border);border-left:1px solid var(--border)}
.m{border-right:1px solid var(--border);border-bottom:1px solid var(--border);padding:5px 6px}
.m s{display:block;text-decoration:none;font-size:7px;letter-spacing:.1em;color:var(--mid);text-transform:uppercase}
.m b{display:block;font-size:11px;font-weight:600;margin-top:2px;font-variant-numeric:tabular-nums}
.m.key b{color:var(--accent)}
.tokens{padding:10px 14px 0;display:grid;grid-template-columns:auto 1fr;gap:10px 16px;align-content:start}
.sw{display:flex;gap:3px}
.sw div{width:38px}
.sw span{display:block;height:20px;border:1px solid var(--border)}
.sw em{display:block;font-style:normal;font-size:7px;color:var(--mid);margin-top:2px;letter-spacing:.04em}
.sw em b{display:block;font-weight:600;color:var(--dark);text-transform:uppercase;letter-spacing:.08em}
.scale{font-size:8px;color:var(--dark);letter-spacing:.06em;line-height:1.7}
.scale b{font-weight:600;color:var(--ink)}
.dots{background-image:radial-gradient(circle,var(--faint) .8px,transparent .8px);background-size:5px 5px;border:1px solid var(--border);min-height:40px}
.serial{border-top:1px solid var(--border);font-size:7px;color:var(--faint);white-space:nowrap;overflow:hidden;padding:0 12px 0 28px;display:flex;align-items:center;letter-spacing:.12em}
.bar{border-top:1px solid var(--dark);color:var(--mid)}
.bar b{color:var(--ink);font-weight:600}
.reg{color:var(--faint)}
</style></head><body>
<div class="plate">
  <div class="bracket"></div>
  <div class="row meta"><span><b>PKG</b> · ${pkg.name}@${pkg.version}</span><span>REF/MIC-SKL-002 · REV.C · SPEC PLATE</span><span><span class="reg">+</span> MIT · NPM · ${new Date().getFullYear()} <span class="reg">+</span></span></div>
  <div class="body">
    <div class="poster">
      <div class="display">Micro<br>Graphic</div>
      <div class="dim"><span>96PX · DISPLAY-SPEC-LG</span></div>
      <div class="tag">Dense · technical · schematic UI for AI coding agents</div>
      <div class="chips"><span class="chip">SKILL.md</span><span class="chip on">DESIGN.md</span><span class="chip">RULES .mdc</span></div>
      <div class="hatch"><span>COMPRESSION, NOT MINIMALISM</span><span>ZONE P-01</span></div>
    </div>
    <div class="man">
      <div class="sec">
        <div class="h">Ships as <i>ONE SYSTEM · TWO FORMATS · SKILL.MD IS THE SOURCE OF TRUTH</i></div>
        <table>
          <tr><th>Format</th><th>Read by</th><th>Install</th></tr>
          <tr><td class="f">SKILL.md</td><td>Cursor · Claude Code · Codex · Windsurf · Gemini</td><td class="c">npx micrographic-skill</td></tr>
          <tr><td class="f">DESIGN.md</td><td>any DESIGN.md-aware agent or tool</td><td class="c">npx micrographic-skill --design-md</td></tr>
          <tr><td class="f">RULES</td><td>Cursor, always on</td><td class="c">npx micrographic-skill --rules</td></tr>
        </table>
      </div>
      <div class="sec">
        <div class="h">Spec <i>READ FROM DESIGN.MD · ${drift}</i></div>
        <div class="metrics">
          <div class="m"><s>Colors</s><b>${count(c)}</b></div>
          <div class="m"><s>Type</s><b>${count(front.typography)}</b></div>
          <div class="m"><s>Components</s><b>${count(front.components)}</b></div>
          <div class="m"><s>Grid</s><b>4PX</b></div>
          <div class="m"><s>Radius</s><b>≤ 2PX</b></div>
          <div class="m key"><s>Lint</s><b>0 · 0</b></div>
        </div>
      </div>
      <div class="tokens">
        <div class="sw">${neutrals.map((k) => `<div><span style="background:${c[k]}"></span><em><b>${k}</b>${String(c[k]).toUpperCase()}</em></div>`).join("")}</div>
        <div class="dots"></div>
        <div class="scale"><b>DISPLAY</b> ${[front.typography["display-spec"], front.typography["display-spec-lg"], front.typography["display-spec-xl"]].map((t) => parseInt(t.fontSize)).join(" / ")} PX<br><b>MICRO</b> 7 · 8 · 10 · 11 PX · NOTHING BETWEEN</div>
        <div class="scale"><b>ACCENT</b> ONE SIGNAL · 3 USES PER VIEW<br><b>TYPE</b> BARLOW CONDENSED + IBM PLEX MONO</div>
      </div>
    </div>
  </div>
  <div class="serial">${serial}</div>
  <div class="row bar"><span><b>SKU/MIC-SKILL-002</b> · BUILT FROM ITS OWN DESIGN.MD</span><span>${W}×${H} · GRID 4PX · 2 SCALES · 3 ACCENTS</span><span>github.com/albegosu/micrographic-skill</span></div>
</div>
</body></html>`;

const htmlPath = join(root, "assets/hero.html");
writeFileSync(htmlPath, html);

// Prefer the bundled Chromium; fall back to the system Chrome if that build isn't installed.
const browser = await chromium.launch().catch(() => chromium.launch({ channel: "chrome" }));
const page = await browser.newPage({ deviceScaleFactor: 2, viewport: { width: W + 40, height: H + 40 } });
await page.goto(`file://${htmlPath}`, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
await page.locator(".plate").screenshot({ path: join(root, "assets/hero.png"), type: "png" });
await browser.close();
console.log(`Wrote assets/hero.html + assets/hero.png (${W}×${H} @2x, v${pkg.version}${drift ? `, ${drift.toLowerCase()}` : ""})`);
