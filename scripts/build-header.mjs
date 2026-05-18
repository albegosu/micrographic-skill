#!/usr/bin/env node
/**
 * Build assets/header.svg from header-data.json + package.json.
 * Source preview: open assets/header.html in a browser.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const data = JSON.parse(readFileSync(join(root, "assets/header-data.json"), "utf8"));
const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
const version = pkg.version;
const year = new Date().getFullYear();

const W = 820;
const H = 300;
const POSTER_W = 312;
const MANIFEST_X = POSTER_W;
const Y_META = 32;
const Y_MAIN_END = 218;
const Y_SERIAL = 220;
const Y_CHIPS = 234;
const Y_ANNO = 250;
const Y_TERM = 266;

const canvas = data.canvas ?? "#F4F2EE";
const ink = "#0A0A0A";
const border = "#C8C4BE";
const mid = "#888888";
const faint = "#BBBBBB";
const accent = "#CC2200";
const white = "#FAFAFA";
const hold = 2.8;

const face = "'Barlow Condensed', 'Arial Narrow', sans-serif";
const mono = "'IBM Plex Mono', monospace";

const DISPLAY_CHAR_RATIO = 0.58;
/** Auto-fit range when fontSizePx is omitted (README banner) */
const DISPLAY_AUTO_MIN_PX = 48;
const DISPLAY_AUTO_MAX_PX = 56;
/** Hard bounds for display.fontSizePx override */
const DISPLAY_OVERRIDE_MIN_PX = 40;
const DISPLAY_OVERRIDE_MAX_PX = 64;

const POSTER_PAD_TOP = 10;
const POSTER_PAD_X = 14;
const POSTER_INNER_W = POSTER_W - POSTER_PAD_X * 2;
const POSTER_CHIPS_H = 14;
const POSTER_CHIPS_GAP = 4;
const DISPLAY_LINE_HEIGHT = 0.88;
const PLUS_LANE = 12;
const PLUS_TO_LINE3 = 26;
const HUD_MARGIN_TOP = 8;
const HUD_PAD_X = 8;
const HUD_MIN_H = 26;

/**
 * Resolve poster display size: auto-fit to column width, or explicit display.fontSizePx (clamped).
 * @returns {{ fontSize: number, autoPx: number, source: "auto" | "fontSizePx" }}
 */
function resolveDisplayFontSize(display) {
  const lines = display.lines ?? [];
  if (lines.length === 0) throw new Error("display.lines must be a non-empty array");

  const longestChars = Math.max(...lines.map((l) => String(l).length));
  const innerW = POSTER_W - 28;
  const fitPx = innerW / (longestChars * DISPLAY_CHAR_RATIO);
  const autoPx = Math.min(
    DISPLAY_AUTO_MAX_PX,
    Math.max(DISPLAY_AUTO_MIN_PX, Math.floor(fitPx))
  );

  if (display.fontSizePx == null || display.fontSizePx === "") {
    return { fontSize: autoPx, autoPx, source: "auto" };
  }

  const raw = Number(display.fontSizePx);
  if (!Number.isFinite(raw)) {
    throw new Error(`display.fontSizePx must be a number (got ${JSON.stringify(display.fontSizePx)})`);
  }

  const rounded = Math.round(raw);
  const fontSize = Math.min(DISPLAY_OVERRIDE_MAX_PX, Math.max(DISPLAY_OVERRIDE_MIN_PX, rounded));
  if (fontSize !== rounded) {
    console.warn(
      `display.fontSizePx ${rounded} clamped to ${fontSize} (allowed ${DISPLAY_OVERRIDE_MIN_PX}–${DISPLAY_OVERRIDE_MAX_PX})`
    );
  }

  return { fontSize, autoPx, source: "fontSizePx" };
}

/** Largest display px that fits the poster column (same layout as posterLayout). */
function maxDisplayFontForPoster(display, zoneBottom) {
  for (let px = DISPLAY_OVERRIDE_MAX_PX; px >= DISPLAY_OVERRIDE_MIN_PX; px--) {
    try {
      posterLayout(display, zoneBottom, px);
      return px;
    } catch {
      /* try smaller */
    }
  }
  return DISPLAY_OVERRIDE_MIN_PX;
}

const ry = (n) => Math.round(n * 10) / 10;

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function repoShort(url) {
  if (!url) return "github.com/albegosu/micrographic-skill";
  return url.replace(/^git\+/, "").replace(/^https?:\/\//, "").replace(/\.git$/, "");
}

function carouselCss(classPrefix, items, duration) {
  const count = items.length;
  const slot = (100 / count).toFixed(3);
  const fadeEnd = (Number(slot) + 2).toFixed(3);
  const keyframes = `@keyframes ${classPrefix}Show {
        0%, ${slot}% { opacity: 1; }
        ${fadeEnd}%, 100% { opacity: 0; }
      }`;
  const rules = items
    .map((_, i) => {
      const delay = -(i * hold).toFixed(1);
      return `.${classPrefix}${i} { animation: ${classPrefix}Show ${duration}s ${delay}s infinite; }`;
    })
    .join("\n      ");
  return `${keyframes}\n      ${rules}`;
}

/** Centered label inside a bordered box (matches CSS chip / hud padding). */
function boxedText(x, y, w, h, text, opts = {}) {
  const {
    size = 8,
    weight = 600,
    fill = ink,
    tracking = 1.2,
    padX = 6,
    family = face,
  } = opts;
  const cy = y + h / 2;
  return `  <text x="${x + padX}" y="${cy}" dominant-baseline="central" font-family="${family}" font-size="${size}" font-weight="${weight}" fill="${fill}" letter-spacing="${tracking}">${esc(text)}</text>`;
}

/** Mode B poster — display + tagline + chips; Y from CSS flow (hanging baseline). */
function posterLayout(display, zoneBottom, fontSizePx) {
  const [line1, line2, line3] = display.lines;
  const fontSize = fontSizePx ?? resolveDisplayFontSize(display).fontSize;
  const lineStep = fontSize * DISPLAY_LINE_HEIGHT;
  const x = POSTER_PAD_X;
  let yTop = Y_META + POSTER_PAD_TOP;

  const displayRow = (text, y, size = fontSize, weight = 800, fill = ink, tracking = 1) =>
    `  <text x="${x}" y="${ry(y)}" dominant-baseline="hanging" font-family="${face}" font-size="${size}" font-weight="${weight}" fill="${fill}" letter-spacing="${tracking}">${esc(text)}</text>`;

  const rows = [displayRow(line1, yTop)];
  yTop += lineStep;
  rows.push(displayRow(line2, yTop));
  if (display.plus) {
    rows.push(displayRow("+", yTop + PLUS_LANE + 2, 10, 600, mid, 3));
    rows.push(displayRow(line3, yTop + PLUS_LANE + PLUS_TO_LINE3));
    yTop = ry(yTop + PLUS_LANE + PLUS_TO_LINE3 + lineStep);
  } else {
    yTop += lineStep;
    rows.push(displayRow(line3, yTop));
    yTop = ry(yTop + lineStep);
  }

  const hudY = ry(yTop + HUD_MARGIN_TOP);
  const hudH = HUD_MIN_H;
  const taglineCy = ry(hudY + hudH / 2);
  const chipsY = ry(hudY + hudH + POSTER_CHIPS_GAP);
  const blockEnd = chipsY + POSTER_CHIPS_H + 4;

  if (blockEnd > zoneBottom) {
    throw new Error(
      `Poster column overflow: content ends at ${blockEnd}px but zone ends at ${zoneBottom}px. Lower display.fontSizePx (current ${fontSize}px).`
    );
  }

  return { rows: rows.join("\n"), hudY, hudH, taglineCy, chipsY, fontSize, x };
}

function posterChipsRow(x, y) {
  return (data.posterChips ?? ["NPM", "MIT", "ESM"])
    .map((label, i) => {
      const cx = x + i * 44;
      const active = label === "NPM";
      const stroke = active ? accent : border;
      const color = active ? accent : mid;
      return `  <rect x="${cx}" y="${y}" width="38" height="${POSTER_CHIPS_H}" fill="none" stroke="${stroke}" stroke-width="1"/>
${boxedText(cx, y, 38, POSTER_CHIPS_H, label, { fill: color })}`;
    })
    .join("\n");
}

function buildTokens(displayPx) {
  return data.tokens.map((t) =>
    t.label === "DISPLAY" ? { ...t, value: `${displayPx}px` } : t
  );
}

function tokenStrip(x, y, tokens) {
  return tokens
    .map((t, i) => {
      const tx = x + i * 72;
      return `  <text x="${tx}" y="${y}" font-family="${mono}" font-size="7" fill="${faint}">${esc(t.label)} <tspan fill="${accent}" font-weight="600">${esc(t.value)}</tspan></text>`;
    })
    .join("\n");
}

function cornerBracket(x, y, accentStroke = false) {
  const stroke = accentStroke ? accent : "#1A1A1A";
  return `  <g aria-hidden="true">
    <line x1="${x}" y1="${y}" x2="${x + 10}" y2="${y}" stroke="${stroke}" stroke-width="1.5"/>
    <line x1="${x}" y1="${y}" x2="${x}" y2="${y + 10}" stroke="${stroke}" stroke-width="1.5"/>
  </g>`;
}

function dimensionLine(x1, x2, y, label) {
  const midX = (x1 + x2) / 2;
  return `  <g aria-hidden="true">
    <line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke="${border}" stroke-width="1"/>
    <line x1="${x1}" y1="${y - 3}" x2="${x1}" y2="${y + 3}" stroke="#1A1A1A" stroke-width="1"/>
    <line x1="${x2}" y1="${y - 3}" x2="${x2}" y2="${y + 3}" stroke="#1A1A1A" stroke-width="1"/>
    <line x1="${midX}" y1="${y - 2}" x2="${midX}" y2="${y + 2}" stroke="#1A1A1A" stroke-width="1"/>
    <text x="${midX}" y="${y + 11}" font-family="${mono}" font-size="7" fill="${mid}" text-anchor="middle" letter-spacing="0.5">${esc(label)}</text>
  </g>`;
}

function manifestRow(label, value, y) {
  return `  <text x="${MANIFEST_X + 14}" y="${y}" dominant-baseline="central" font-family="${face}" font-size="8" font-weight="600" fill="${mid}" letter-spacing="1">${esc(label)}</text>
  <text x="${MANIFEST_X + 72}" y="${y}" dominant-baseline="central" font-family="${mono}" font-size="7" fill="${ink}">${esc(value)}</text>`;
}

const triggers = data.cycles.triggers;
const principles = data.cycles.principles;
const triggerDuration = triggers.length * hold;
const principleDuration = principles.length * hold;

const serial = Array.from({ length: 20 }, (_, i) => String(i).padStart(4, "0")).join(" · ");
const snVertical = Array.from({ length: 40 }, (_, i) => String(i).padStart(2, "0")).join(" ");

const manifestRows = [
  ["NAME", pkg.name],
  ["VERSION", version],
  ["LICENSE", pkg.license ?? "MIT"],
  ["NODE", pkg.engines?.node ?? ">=18"],
  ["REGISTRY", repoShort(pkg.repository?.url)],
];

let displaySize = resolveDisplayFontSize(data.display);
const maxPosterPx = maxDisplayFontForPoster(data.display, Y_MAIN_END);
if (displaySize.fontSize > maxPosterPx) {
  console.warn(
    `display.fontSizePx ${displaySize.fontSize} clamped to ${maxPosterPx}px to fit poster column`
  );
  displaySize = { ...displaySize, fontSize: maxPosterPx, source: "poster-fit" };
}
const tokens = buildTokens(displaySize.fontSize);
const poster = posterLayout(data.display, Y_MAIN_END, displaySize.fontSize);
const footerChips = data.footerChips ?? ["OPEN SOURCE", "AGENT SKILL"];
const agents = data.agents.map((a) => (typeof a === "string" ? { name: a, path: "" } : a)).slice(0, 2);

const footerChipMarkup = footerChips
  .map((label, i) => {
    const widths = [68, 78, 72, 88];
    const xPositions = [10, 82, 164, 240];
    const w = widths[i] ?? 64;
    const x = xPositions[i] ?? 10 + i * 72;
    const filled = label === "PUBLISHED";
    const accentChip = label === "DESIGN SYSTEM";
    const bg = filled ? ink : "none";
    const stroke = accentChip ? accent : border;
    const color = filled ? white : accentChip ? accent : mid;
    return `  <rect x="${x}" y="${Y_CHIPS}" width="${w}" height="14" fill="${bg}" stroke="${stroke}" stroke-width="1"/>
${boxedText(x, Y_CHIPS, w, 14, label, { fill: color, weight: filled ? 600 : 600 })}`;
  })
  .join("\n");

const triggerTexts = triggers
  .map(
    (t, i) =>
      `  <text class="trigger-line trigger${i}" x="${MANIFEST_X + 14}" y="58" font-family="${face}" font-size="10" font-weight="600" fill="${mid}" letter-spacing="1.2">${esc(t)}</text>`
  )
  .join("\n");

const principleTexts = principles
  .map(
    (p, i) =>
      `  <text class="principle-line principle${i}" x="${MANIFEST_X + 14}" y="96" font-family="${face}" font-size="9" font-weight="700" fill="${accent}" letter-spacing="1">${esc(p)}</text>`
  )
  .join("\n");

const M_TOKENS = 102;
const M_PKG = 120;
const manifestBody = manifestRows
  .map((row, i) => manifestRow(row[0], row[1], M_PKG + 8 + i * 11))
  .join("\n");

const M_AGENTS = M_PKG + 8 + manifestRows.length * 11 + 10;
const agentMarkup = agents
  .map((agent, i) => {
    const cy = M_AGENTS + 10 + i * 11;
    return `  <rect x="${MANIFEST_X + 14}" y="${cy - 2.5}" width="5" height="5" fill="${ink}"/>
  <text x="${MANIFEST_X + 24}" y="${cy}" dominant-baseline="central" font-family="${face}" font-size="7" font-weight="600" fill="${ink}" letter-spacing="0.8">${esc(agent.name)}</text>
  <text x="${W - 28}" y="${cy}" dominant-baseline="central" font-family="${mono}" font-size="6.5" fill="${mid}" text-anchor="end">${esc(agent.path)}</text>`;
  })
  .join("\n");

const svg = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern id="dot-grid" width="5" height="5" patternUnits="userSpaceOnUse">
      <circle cx="2.5" cy="2.5" r="0.6" fill="#1A1A1A" opacity="0.12"/>
    </pattern>
    <style>
      ${carouselCss("trigger", triggers, triggerDuration)}
      ${carouselCss("principle", principles, principleDuration)}
      .trigger-line, .principle-line { opacity: 0; }
    </style>
  </defs>

  <rect width="${W}" height="${H}" fill="${canvas}"/>
  <rect x="0.5" y="0.5" width="${W - 1}" height="${H - 1}" fill="none" stroke="${border}" stroke-width="1"/>

  <text x="8" y="10" font-family="${mono}" font-size="8" fill="${faint}" letter-spacing="1">+ HDR</text>
  <text x="${W - 8}" y="10" font-family="${mono}" font-size="8" fill="${faint}" letter-spacing="1" text-anchor="end">PLT +</text>
  <text x="8" y="262" font-family="${mono}" font-size="8" fill="${faint}" letter-spacing="1">+ A01</text>
  <text x="${W - 8}" y="262" font-family="${mono}" font-size="8" fill="${faint}" letter-spacing="1" text-anchor="end">B01 +</text>

  <text x="14" y="26" font-family="${mono}" font-size="7" fill="${faint}" letter-spacing="1.2">A01-POSTER</text>
  <text x="${MANIFEST_X + 14}" y="26" font-family="${mono}" font-size="7" fill="${faint}" letter-spacing="1.2">B01-INDEX</text>
  <text x="${W / 2}" y="26" font-family="${mono}" font-size="7" fill="${faint}" letter-spacing="1.5" text-anchor="middle">README PLATE · ${W}×${H}</text>

  <line x1="0" y1="${Y_META}" x2="${W}" y2="${Y_META}" stroke="${border}" stroke-width="1"/>
  <rect x="10" y="10" width="72" height="14" fill="${ink}" stroke="${ink}" stroke-width="1"/>
${boxedText(10, 10, 72, 14, "PKG HEADER", { fill: white, weight: 700 })}
  <circle cx="92" cy="17" r="2.5" fill="${accent}"/>
  <circle cx="92" cy="17" r="5" fill="none" stroke="${accent}" stroke-width="1" opacity="0.45"/>
  <text x="102" y="17" dominant-baseline="central" font-family="${mono}" font-size="8" fill="${ink}" font-weight="600" letter-spacing="0.3">${esc(pkg.name)}@${esc(version)}</text>
  <rect x="248" y="10" width="52" height="14" fill="none" stroke="${accent}" stroke-width="1"/>
${boxedText(248, 10, 52, 14, "REGISTRY", { fill: accent })}
  <text x="${W - 10}" y="17" dominant-baseline="central" font-family="${mono}" font-size="7" fill="${faint}" letter-spacing="0.4" text-anchor="end">${esc(data.ref)} · ${esc(data.rev)} · ${year}</text>

  <line x1="${MANIFEST_X}" y1="${Y_META}" x2="${MANIFEST_X}" y2="${Y_MAIN_END}" stroke="${border}" stroke-width="1"/>
  <rect x="0" y="${Y_META}" width="${POSTER_W}" height="${Y_MAIN_END - Y_META}" fill="url(#dot-grid)" opacity="0.35"/>

${cornerBracket(6, 38, true)}

${poster.rows}
  <rect x="${poster.x}" y="${poster.hudY}" width="${POSTER_INNER_W}" height="${poster.hudH}" fill="none" stroke="${accent}" stroke-width="1"/>
  <text x="${poster.x + HUD_PAD_X}" y="${poster.taglineCy}" dominant-baseline="central" font-family="${face}" font-size="9" font-weight="600" fill="${ink}" letter-spacing="1.2">${esc(data.tagline)}</text>
${posterChipsRow(poster.x, poster.chipsY)}

  <text x="${MANIFEST_X + 14}" y="40" font-family="${face}" font-size="7" font-weight="600" fill="${faint}" letter-spacing="1.5">TRIGGER / CYCLE</text>
  <line x1="${MANIFEST_X + 14}" y1="44" x2="${W - 28}" y2="44" stroke="${border}" stroke-width="1"/>
${triggerTexts}
  <text x="${MANIFEST_X + 14}" y="76" font-family="${face}" font-size="7" font-weight="600" fill="${faint}" letter-spacing="1.5">PRINCIPLE</text>
  <line x1="${MANIFEST_X + 14}" y1="80" x2="${W - 28}" y2="80" stroke="${border}" stroke-width="1"/>
${principleTexts}
  <text x="${MANIFEST_X + 14}" y="${M_TOKENS - 4}" font-family="${face}" font-size="7" font-weight="600" fill="${faint}" letter-spacing="1.5">TOKENS</text>
  <line x1="${MANIFEST_X + 14}" y1="${M_TOKENS}" x2="${W - 28}" y2="${M_TOKENS}" stroke="${border}" stroke-width="1"/>
${tokenStrip(MANIFEST_X + 14, M_TOKENS + 10, tokens)}
  <text x="${MANIFEST_X + 14}" y="${M_PKG}" font-family="${face}" font-size="7" font-weight="600" fill="${faint}" letter-spacing="1.5">PACKAGE</text>
  <line x1="${MANIFEST_X + 14}" y1="${M_PKG + 4}" x2="${W - 28}" y2="${M_PKG + 4}" stroke="${border}" stroke-width="1"/>
${manifestBody}
  <text x="${MANIFEST_X + 14}" y="${M_AGENTS}" font-family="${face}" font-size="7" font-weight="600" fill="${faint}" letter-spacing="1.5">AGENTS</text>
  <line x1="${MANIFEST_X + 14}" y1="${M_AGENTS + 4}" x2="${W - 28}" y2="${M_AGENTS + 4}" stroke="${border}" stroke-width="1"/>
${agentMarkup}

  <text transform="translate(${W - 6} ${Y_MAIN_END - 4}) rotate(-90)" font-family="${mono}" font-size="5.5" fill="${faint}" letter-spacing="1.5" text-anchor="end">${esc(snVertical)}</text>

  <line x1="0" y1="${Y_SERIAL}" x2="${W}" y2="${Y_SERIAL}" stroke="${border}" stroke-width="1"/>
  <text x="10" y="${Y_SERIAL + 10}" font-family="${mono}" font-size="7" fill="${faint}" letter-spacing="1.5">${esc(serial)}</text>

  <line x1="0" y1="${Y_CHIPS - 2}" x2="${W}" y2="${Y_CHIPS - 2}" stroke="${border}" stroke-width="1"/>
${footerChipMarkup}

  <g aria-hidden="true">
    <line x1="340" y1="${Y_ANNO}" x2="360" y2="${Y_ANNO}" stroke="#1A1A1A" stroke-width="1"/>
    <line x1="340" y1="${Y_ANNO - 3}" x2="340" y2="${Y_ANNO + 3}" stroke="#1A1A1A" stroke-width="1"/>
    <line x1="360" y1="${Y_ANNO - 3}" x2="360" y2="${Y_ANNO + 3}" stroke="#1A1A1A" stroke-width="1"/>
    <circle cx="368" cy="${Y_ANNO}" r="3" fill="none" stroke="#1A1A1A" stroke-width="1"/>
    <circle cx="368" cy="${Y_ANNO}" r="0.8" fill="${mid}"/>
    <text x="378" y="${Y_ANNO + 3}" font-family="${mono}" font-size="7" fill="${mid}" letter-spacing="0.6">${esc(data.annotation ?? `${W}×${H} · OPEN SOURCE`)}</text>
    <circle cx="${W - 50}" cy="${Y_ANNO}" r="3" fill="none" stroke="#1A1A1A" stroke-width="1"/>
    <circle cx="${W - 50}" cy="${Y_ANNO}" r="0.8" fill="${mid}"/>
    <line x1="${W - 42}" y1="${Y_ANNO}" x2="${W - 22}" y2="${Y_ANNO}" stroke="#1A1A1A" stroke-width="1"/>
    <line x1="${W - 42}" y1="${Y_ANNO - 3}" x2="${W - 42}" y2="${Y_ANNO + 3}" stroke="#1A1A1A" stroke-width="1"/>
    <line x1="${W - 22}" y1="${Y_ANNO - 3}" x2="${W - 22}" y2="${Y_ANNO + 3}" stroke="#1A1A1A" stroke-width="1"/>
  </g>

  <rect x="0" y="${Y_TERM}" width="${W}" height="${H - Y_TERM}" fill="${ink}"/>
  <text x="12" y="${H - 8}" font-family="${mono}" font-size="9" fill="${accent}" font-weight="600">$</text>
  <text x="24" y="${H - 8}" font-family="${mono}" font-size="9" fill="${white}" letter-spacing="0.3">${esc(data.npx)}</text>
  <text x="${W - 12}" y="${H - 8}" font-family="${mono}" font-size="7" fill="${mid}" text-anchor="end">${esc(data.sku)} · v${esc(version)}</text>
</svg>
`;

const outPath = join(root, "assets/header.svg");
writeFileSync(outPath, svg, "utf8");
console.log(
  `Wrote ${outPath} (v${version}, display ${poster.fontSize}px [${displaySize.source}], auto ${displaySize.autoPx}px, ${W}×${H})`
);
