#!/usr/bin/env node
/**
 * Drift guard: DESIGN.md must agree with SKILL.md (the source of truth).
 *
 * - Lints DESIGN.md with the official @google/design.md linter (fails on errors AND warnings).
 * - Reads CSS custom properties and rule declarations from SKILL.md ```css fences.
 * - Compares every DESIGN.md token (colors, dark-mode table, type scale, spacing, rounded,
 *   component values) against SKILL.md, in both directions where it matters.
 *
 * Usage: npm run check:design
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { parse as parseYaml } from "yaml";
import { lint } from "@google/design.md/linter";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const skill = readFileSync(join(root, "SKILL.md"), "utf8");
const designMd = readFileSync(join(root, "DESIGN.md"), "utf8");

// ── Mappings: DESIGN.md token → SKILL.md source ─────────────────────────────

/** Role aliases required by the DESIGN.md spec → micrographic primitive. */
const ROLES = { primary: "ink", secondary: "mid", tertiary: "accent", neutral: "bg" };

/** typography token → SKILL.md type-scale variable. */
const TYPE_SCALE = {
  "display-spec": "text-display",
  "display-spec-lg": "text-display-lg",
  "display-spec-xl": "text-display-xl",
  "display-poster": "text-display",
  "label-micro": "text-micro",
  "label-xs": "text-xs",
  "label-sm": "text-sm",
  "data-micro": "text-micro",
  "data-xs": "text-xs",
  "data-sm": "text-sm",
  "data-md": "text-md",
};

/** typography token → SKILL.md CSS rule that sets the same type. */
const TYPE_RULES = {
  "display-spec": ".display--spec",
  "display-poster": ".display--poster",
  "label-xs": ".chip",
  "label-micro": ".field-label",
  "data-micro": ".spec-card__meta-bar",
  "data-xs": ".data-table td",
  "data-sm": ".field-input",
};

/** spacing token → SKILL.md variable. Numeric keys map to --space-N. */
const SPACING = { "card-width": "card-width", "col-poster-min": "col-poster-min" };

/** component → SKILL.md CSS rule(s) (merged in order) or a border variable. */
const COMPONENT_RULES = {
  "spec-card": [".spec-card", ".spec-card__body"],
  "meta-strip": [".meta-strip"],
  "meta-bar": [".spec-card__meta-bar"],
  "display-hero": [".display-hero"],
  "display-hero-poster": [".display-hero"],
  chip: [".chip"],
  "chip-active": [".chip--active"],
  "chip-filled": [".chip--filled"],
  button: [".btn"],
  "button-hover": [".btn:hover"],
  "button-primary": [".btn--primary"],
  "button-accent": [".btn--accent"],
  "button-accent-hover": [".btn--accent:hover"],
  "nav-item": [".nav-item"],
  "nav-item-active": [".nav-item--active"],
  "field-label": [".field-label"],
  "field-input": [".field-input"],
  "data-table-header": [".data-table th"],
  "data-table-cell": [".data-table td"],
  "spec-annotation": [".spec"],
  "dimension-label": [".dim-annot"],
  "status-dot": [".status-dot"],
  hairline: "border",
  "hairline-dark": "border-dark",
};

/** Components described only in SKILL.md prose (no single CSS rule to compare). */
const PROSE_ONLY = {
  "metric-value": "11px IBM Plex Mono metric cell (Typography · Scale Brutalism)",
  "hatch-stripe": "light-mode --color-hatch stripe (Color · Light mode)",
};

/** Deliberate, documented differences. Key: "component.property". */
const EXCEPTIONS = {};

const CSS_PROP = { textColor: "color", backgroundColor: "background", padding: "padding", height: "height", size: "width", width: "width" };

// ── Helpers ─────────────────────────────────────────────────────────────────

const failures = [];
const passes = [];
const check = (area, ok, detail) => (ok ? null : failures.push(`${area}: ${detail}`));
const done = (area, summary) => passes.push(`${area.padEnd(11)} ${summary}`);

const stripComments = (s) => s.replace(/\/\*[\s\S]*?\*\//g, "");
const cssBlocks = [...skill.matchAll(/```css\n([\s\S]*?)```/g)].map((m) => ({ css: m[1], index: m.index }));
const varsOf = (css) =>
  Object.fromEntries([...stripComments(css).matchAll(/--([\w-]+)\s*:\s*([^;]+);/g)].map((m) => [m[1], m[2].trim()]));
const blockAfter = (marker) => {
  const at = skill.indexOf(marker);
  if (at < 0) throw new Error(`SKILL.md: marker not found: ${marker}`);
  return cssBlocks.find((b) => b.index > at).css;
};

const light = varsOf(blockAfter("**Light mode**"));
const dark = varsOf(blockAfter("**Dark mode**"));

/** Non-color variables (type scale, spacing, layout) across all fences; must not conflict. */
const globals = {};
for (const { css } of cssBlocks) {
  for (const [k, v] of Object.entries(varsOf(css))) {
    if (k.startsWith("color-")) continue;
    check("SKILL.md", !(k in globals) || globals[k] === v, `--${k} defined twice with different values`);
    globals[k] = v;
  }
}

/** CSS rules: selector → merged declarations (later blocks win, like the cascade). */
const rules = {};
for (const { css } of cssBlocks) {
  for (const m of stripComments(css).matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    const decls = Object.fromEntries(
      m[2].split(";").map((d) => d.split(/:(.*)/s).map((x) => x.trim())).filter(([k, v]) => k && v)
    );
    for (const sel of m[1].split(",").map((s) => s.trim())) rules[sel] = { ...rules[sel], ...decls };
  }
}

/** Resolve var(--x) against the light palette + globals. */
const lightColor = (name) => light[name];
const resolveCss = (value) =>
  value.replace(/var\(--([\w-]+)\)/g, (_, n) => resolveCss(lightColor(n) ?? globals[n] ?? `var(--${n})`));

/** DESIGN.md front matter (raw, so unitless values survive) + reference resolution. */
const front = parseYaml(designMd.match(/^---\n([\s\S]*?)\n---/)[1]);
const body = designMd.slice(designMd.indexOf("\n---", 4) + 4);
const resolveRef = (value) => {
  const m = typeof value === "string" && value.match(/^\{([\w-]+)\.([\w-]+)\}$/);
  return m ? resolveRef(front[m[1]][m[2]]) : value;
};

const hex = (v) => String(v).trim().toUpperCase();
const num = (v) => parseFloat(String(v));
const dim = (v) => {
  const s = String(v).trim();
  return /^-?[\d.]+$/.test(s) ? `${num(s)}px` : `${num(s)}${s.replace(/^-?[\d.]+/, "")}`;
};
const box = (v) => {
  const p = String(v).trim().split(/\s+/).map(dim);
  const [t, r = t, b = t, l = r] = p;
  return [t, r, b, l].join(" ");
};
const firstFamily = (v) => String(v).split(",")[0].replace(/['"]/g, "").trim();
const COMPARE = {
  color: (a, b) => hex(a) === hex(b),
  background: (a, b) => hex(a) === hex(b),
  padding: (a, b) => box(a) === box(b),
  height: (a, b) => dim(a) === dim(b),
  width: (a, b) => dim(a) === dim(b),
};

// ── 1. Lint (official DESIGN.md linter) ─────────────────────────────────────

const report = lint(designMd);
for (const f of report.findings.filter((f) => f.severity !== "info")) {
  check("lint", false, `${f.severity} ${f.rule ?? ""} ${f.path ?? ""} — ${f.message}`);
}
done("lint", `${report.summary.errors} errors · ${report.summary.warnings} warnings (@google/design.md)`);

// ── 2. Colors ───────────────────────────────────────────────────────────────

const colors = front.colors;
for (const [role, target] of Object.entries(ROLES)) {
  check("colors", colors[role] === `{colors.${target}}`, `${role} must be "{colors.${target}}" (got ${colors[role]})`);
}
const primitives = Object.keys(colors).filter((k) => !(k in ROLES));
for (const name of primitives) {
  const want = lightColor(`color-${name}`);
  check("colors", want !== undefined, `${name} has no --color-${name} in SKILL.md`);
  if (want) check("colors", hex(colors[name]) === hex(want), `${name} is ${colors[name]}, SKILL.md says ${want}`);
}
for (const v of Object.keys(light)) {
  check("colors", v.replace("color-", "") in colors, `SKILL.md light --${v} missing from DESIGN.md colors`);
}

// Colors table in prose: | `token` | light | dark | job |
const table = [...body.matchAll(/^\|\s*`([\w-]+)`\s*\|\s*(\S+)\s*\|\s*(\S+)\s*\|/gm)].map((m) => ({
  name: m[1],
  light: m[2].replace(/`/g, ""),
  dark: m[3].replace(/`/g, ""),
}));
const cell = (v) => (v === undefined ? "—" : hex(v));
for (const row of table) {
  check("colors", cell(light[`color-${row.name}`]) === hex(row.light), `table ${row.name} light ${row.light} ≠ SKILL.md ${cell(light[`color-${row.name}`])}`);
  check("colors", cell(dark[`color-${row.name}`]) === hex(row.dark), `table ${row.name} dark ${row.dark} ≠ SKILL.md ${cell(dark[`color-${row.name}`])}`);
}
for (const v of new Set([...Object.keys(light), ...Object.keys(dark)])) {
  check("colors", table.some((r) => `color-${r.name}` === v), `--${v} missing from the Colors table`);
}
for (const [h] of body.matchAll(/#[0-9A-Fa-f]{6}\b/g)) {
  check("colors", skill.toUpperCase().includes(hex(h)), `${h} in DESIGN.md prose does not appear in SKILL.md`);
}
done("colors", `${primitives.length} tokens + ${Object.keys(ROLES).length} roles + ${table.length}-row light/dark table`);

// ── 3. Typography ───────────────────────────────────────────────────────────

const typography = front.typography;
const families = skill
  .match(/\*\*Preferred typefaces:\*\*\n```\n([\s\S]*?)```/)[1]
  .split("\n")
  .flatMap((l) => l.replace(/^\s*\w+:\s*/, "").split(","))
  .map((f) => f.trim())
  .filter(Boolean);
for (const [name, t] of Object.entries(typography)) {
  const scaleVar = TYPE_SCALE[name];
  check("typography", scaleVar, `${name} is not mapped in TYPE_SCALE (scripts/check-design-md.mjs)`);
  if (scaleVar) check("typography", dim(t.fontSize) === dim(globals[scaleVar]), `${name} fontSize ${t.fontSize} ≠ --${scaleVar} ${globals[scaleVar]}`);
  const px = num(t.fontSize);
  check("typography", (px >= 7 && px <= 11) || (px >= 64 && px <= 120), `${name} ${t.fontSize} is outside micro (7–11px) and display (64–120px)`);
  check("typography", families.includes(t.fontFamily), `${name} fontFamily "${t.fontFamily}" is not a SKILL.md preferred typeface`);
}
for (const v of Object.keys(globals).filter((k) => k.startsWith("text-"))) {
  check("typography", Object.values(TYPE_SCALE).includes(v), `SKILL.md --${v} has no typography token`);
}
for (const [name, sel] of Object.entries(TYPE_RULES)) {
  const t = typography[name];
  const r = rules[sel];
  check("typography", t && r, `${name} ↔ ${sel}: missing on one side`);
  if (!t || !r) continue;
  const pairs = [
    ["font-family", "fontFamily", (a, b) => firstFamily(a) === b],
    ["font-size", "fontSize", (a, b) => dim(resolveCss(a)) === dim(b)],
    ["font-weight", "fontWeight", (a, b) => num(a) === num(b)],
    ["line-height", "lineHeight", (a, b) => num(a) === num(b)],
    ["letter-spacing", "letterSpacing", (a, b) => dim(a) === dim(b)],
  ];
  for (const [cssProp, tokProp, eq] of pairs) {
    if (r[cssProp] === undefined || t[tokProp] === undefined) continue;
    check("typography", eq(r[cssProp], t[tokProp]), `${name}.${tokProp} ${t[tokProp]} ≠ ${sel} ${cssProp}: ${r[cssProp]}`);
  }
  if (r["font-variant-numeric"] === "tabular-nums") {
    check("typography", String(t.fontFeature ?? "").includes("tnum"), `${name} needs fontFeature "tnum" (${sel} uses tabular-nums)`);
  }
}
done("typography", `${Object.keys(typography).length} tokens on the two scales · ${Object.keys(TYPE_RULES).length} checked against CSS rules`);

// ── 4. Spacing & rounded ────────────────────────────────────────────────────

for (const [key, value] of Object.entries(front.spacing)) {
  const v = /^\d+$/.test(key) ? `space-${key}` : SPACING[key];
  check("spacing", v, `${key} is not mapped to a SKILL.md variable`);
  if (v) check("spacing", dim(value) === dim(globals[v]), `${key} is ${value}, SKILL.md --${v} is ${globals[v]}`);
}
for (const v of Object.keys(globals).filter((k) => k.startsWith("space-"))) {
  check("spacing", v.replace("space-", "") in front.spacing, `SKILL.md --${v} missing from DESIGN.md spacing`);
}
const posterRatio = globals["col-poster-width"]?.match(/\*\s*([\d.]+)/)?.[1];
check("spacing", posterRatio && body.includes(`${Math.round(num(posterRatio) * 100)}%`), `Layout prose must state the poster column ratio (${posterRatio})`);
check("spacing", body.includes(String(globals["display-char-ratio"])), `prose must state the display char ratio (${globals["display-char-ratio"]})`);

const maxRadius = skill.match(/Border-radius should be `0`–`(\d+px)` maximum/)?.[1];
check("rounded", maxRadius && dim(front.rounded.sm) === dim(maxRadius), `rounded.sm ${front.rounded.sm} ≠ SKILL.md maximum ${maxRadius}`);
check("rounded", dim(front.rounded.none) === "0px", "rounded.none must be 0px");
for (const [name, c] of Object.entries(front.components)) {
  if (c.rounded === undefined) continue;
  const r = num(resolveRef(c.rounded));
  check("rounded", r <= num(maxRadius) || name === "status-dot", `${name} rounded ${r}px exceeds ${maxRadius} (only status-dot may be round)`);
}
done("spacing", `${Object.keys(front.spacing).length} tokens · 4px grid · radius ≤ ${maxRadius}`);

// ── 5. Components ───────────────────────────────────────────────────────────

let compared = 0;
for (const [name, comp] of Object.entries(front.components)) {
  const source = COMPONENT_RULES[name];
  if (!source) {
    check("components", name in PROSE_ONLY, `${name} is neither mapped in COMPONENT_RULES nor listed in PROSE_ONLY`);
    continue;
  }
  let decls;
  if (typeof source === "string") {
    const [width, , color] = resolveCss(globals[source]).split(/\s+/);
    decls = { background: color, height: width };
  } else {
    check("components", source.every((s) => rules[s]), `${name}: SKILL.md rule ${source.join(" + ")} not found`);
    decls = Object.assign({}, ...source.map((s) => rules[s]));
  }
  for (const [prop, raw] of Object.entries(comp)) {
    const cssProp = CSS_PROP[prop];
    if (!cssProp || decls[cssProp] === undefined) continue;
    const key = `${name}.${prop}`;
    const want = resolveCss(decls[cssProp]);
    const got = resolveRef(raw);
    const same = COMPARE[cssProp](want, got);
    if (!same && key in EXCEPTIONS) continue;
    check("components", same, `${key} ${got} ≠ SKILL.md ${[].concat(source).join(" + ")} ${cssProp}: ${want}`);
    compared += 1;
  }
}
for (const key of Object.keys(EXCEPTIONS)) {
  const [name, prop] = key.split(".");
  check("components", front.components[name]?.[prop] !== undefined, `stale exception ${key}`);
}
done("components", `${Object.keys(front.components).length} components · ${compared} values match SKILL.md CSS · ${Object.keys(EXCEPTIONS).length} documented exception${Object.keys(EXCEPTIONS).length === 1 ? "" : "s"}`);

// ── Report ──────────────────────────────────────────────────────────────────

if (failures.length) {
  console.error(`\n  DESIGN.md drifted from SKILL.md (${failures.length}):\n`);
  for (const f of failures) console.error(`  ✖  ${f}`);
  console.error("\n  SKILL.md is the source of truth: update DESIGN.md (or the mapping in scripts/check-design-md.mjs).\n");
  process.exit(1);
}
console.log("\n  DESIGN.md ↔ SKILL.md\n");
for (const p of passes) console.log(`  ✔  ${p}`);
console.log("");
