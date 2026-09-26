<div align="center">
  <img src="./assets/hero.png" alt="micrographic-skill spec plate: MICRO GRAPHIC display type, the two formats it ships as (SKILL.md, DESIGN.md, Cursor rules) with their install commands, and the spec read from DESIGN.md: 14 colors, 11 type tokens, 26 components, 4px grid, radius up to 2px, lint 0 errors 0 warnings." width="100%"/>
</div>

<br/>

<div align="center">

[![npm](https://img.shields.io/npm/v/micrographic-skill?color=0A0A0A&labelColor=0A0A0A&logo=npm&logoColor=FAFAFA)](https://www.npmjs.com/package/micrographic-skill)
[![license](https://img.shields.io/badge/license-MIT-0A0A0A?labelColor=0A0A0A)](./LICENSE)
[![agents](https://img.shields.io/badge/agents-Cursor·Claude·Codex·Windsurf-0033FF?labelColor=0A0A0A)](https://github.com/albegosu/micrographic-skill)

</div>

---

**Dense, technical, schematic UI for AI coding agents.** Industrial product labels, hardware
spec sheets, care tags and Swiss grids, as a design system your agent follows by default.
One system, two formats: a `SKILL.md` for Cursor, Claude Code, Codex, Windsurf and Gemini,
and a [`DESIGN.md`](./DESIGN.md) in Google Labs' format for any DESIGN.md-aware tool.

```bash
npx micrographic-skill              # the skill, into the agent you use
npx micrographic-skill --design-md  # the same system as ./DESIGN.md
```

<div align="center">
  <img src="./examples/design-md-spec-card.png" alt="A field-sensor panel in the micrographic style: one 12.4 display reading, a dense channel table, a status chip row, hatching and a barcode" width="560"/>
  <br/><sub>An agent built this panel from <code>DESIGN.md</code> alone, without <code>SKILL.md</code> (<a href="./examples/design-md-spec-card.html">source</a>).</sub>
</div>

> **This is not minimalism. Minimalism removes. Micrographic *compresses*.**  
> Every element earns its place. Information becomes decoration. Think Maison Margiela's inner
> labels, Virgil Abloh's Off-White graphics and Wim Crouwel's grids.

---

## Install

Run inside any project. The installer auto-detects which agent you have set up and drops the skill in the right place.

```bash
npx micrographic-skill
```

**Target a specific agent:**

```bash
npx micrographic-skill --cursor      # → .cursor/skills/micrographic/SKILL.md
npx micrographic-skill --claude      # → .claude/skills/micrographic/SKILL.md
npx micrographic-skill --all         # → all detected agents at once
```

**Optional — install as a Cursor always-on rule** (applies to every UI task in the project):

```bash
npx micrographic-skill --rules       # → .cursor/rules/micrographic.mdc
```

**Preview without writing:**

```bash
npx micrographic-skill --dry-run
```

---

## Use as DESIGN.md

The same system ships as a [`DESIGN.md`](./DESIGN.md) in Google Labs' open [DESIGN.md format](https://github.com/google-labs-code/design.md): machine-readable tokens in YAML front matter plus the rules as prose, read by any DESIGN.md-aware agent or tool from your project root. No skill loader required.

```bash
npx micrographic-skill --design-md               # → ./DESIGN.md only
npx micrographic-skill --claude --design-md      # skill + DESIGN.md
npx micrographic-skill --design-md --force       # overwrite an existing ./DESIGN.md
```

The installer never overwrites a `DESIGN.md` you already have unless you pass `--force`. Or fetch the file directly:

```bash
curl -O https://raw.githubusercontent.com/albegosu/micrographic-skill/main/DESIGN.md
```

Validate it, or turn the tokens into a theme, with the official CLI:

```bash
npx @google/design.md lint DESIGN.md                                      # 0 errors · 0 warnings
npx @google/design.md export --format css-tailwind DESIGN.md > theme.css  # Tailwind v4 @theme
```

Inside: the light-mode label palette (ink on warm paper, one signal accent) with the dark/HUD values in its Colors table, 11 type tokens on the two scales (display 80px+ / micro 7–11px), the 4px grid, radius ≤ 2px, and 26 component tokens (`spec-card`, `meta-strip`, `chip`, `button`, `data-table-*`, `status-dot`, …). The color tokens export as `--color-ink`, `--color-accent`, … — the same variable names the skill's CSS uses.

`SKILL.md` stays the source of truth. `npm run check:design` lints `DESIGN.md` and fails if any token drifts from `SKILL.md`.

---

## Usage

After installing, prompt your agent naturally. The skill activates when it detects relevant intent:

```
"build me a micrographic product card"
"create a dashboard — dense, technical, spec-sheet style"
"I want the UI to feel industrial, like a hardware label"
"use the micrographic skill for this landing page"
```

---

## What your agent will produce

The skill encodes a complete design system — your agent follows it to generate CSS and HTML that is consistent across every component it builds.

| Token | Value | Purpose |
|---|---|---|
| `--text-micro` | `7px` | Decorative annotations only |
| `--text-xs` · `--text-sm` · `--text-md` | `8 · 10 · 11px` | The micro scale: annotations, chips, table cells |
| `--text-display` · `-lg` · `-xl` | `80 · 96 · 120px` | One display element per component; nothing between 11 and 80 |
| `--color-bg` | `#F4F2EE` | Warm label paper (light mode), never pure white |
| `--color-accent` | `#CC2200` signal red (light) · `#FF8C00` safety orange (dark) | Exactly three uses per view |
| `--border` | `1px solid #C8C4BE` | Zone skeleton |
| `--border-dark` | `1px solid #1A1A1A` | Component boundary |
| `border-radius` | `0–2px` | Angular only |

**Typography:** `Barlow Condensed` (display) + `IBM Plex Mono` (data, annotations)  
**Palette:** Near-monochromatic: ink on warm paper, five grays, one accent  
**Spacing:** 4px micro-grid (`4 / 8 / 12 / 16 / 24 / 32 / 48 / 64px`)  
**Decoration:** Registration marks `+`, reference codes `REF-0042-A`, serial number strips, grid coordinates `A1`

---

## Supported agents

| Agent | Skills path | Rules path |
|---|---|---|
| [Cursor](https://cursor.com) | `.cursor/skills/micrographic/` | `.cursor/rules/micrographic.mdc` |
| [Claude Code](https://claude.ai/code) | `.claude/skills/micrographic/` | — |
| [Codex](https://openai.com/codex) | `.codex/skills/micrographic/` | — |
| [Windsurf](https://codeium.com/windsurf) | `.windsurf/skills/micrographic/` | — |
| [Gemini CLI](https://ai.google.dev) | `.gemini/skills/micrographic/` | — |

---

## Install paths at a glance

```
your-project/
├── .cursor/
│   ├── skills/
│   │   └── micrographic/
│   │       └── SKILL.md       ← loaded dynamically when relevant
│   └── rules/
│       └── micrographic.mdc   ← always-on (--rules flag)
├── .claude/
│   └── skills/micrographic/SKILL.md
├── DESIGN.md                  ← tokens + rules (--design-md flag)
└── ...
```

---

## Aesthetic references

The micrographic aesthetic has deep roots — from Swiss Modernism to contemporary fashion branding:

- **Maison Margiela** — inner garment labels as typographic art
- **Virgil Abloh / Off-White** — industrial graphics as high fashion
- **Raf Simons** — dense label typography as branding
- **Wim Crouwel** — Swiss grid systems and schematic type
- **Josef Müller-Brockmann** — information design as visual structure
- **Daily Dialogue Studio** — contemporary micro-graphic branding

---

## Releases

Every [npm](https://www.npmjs.com/package/micrographic-skill) version has a matching Git tag `vMAJOR.MINOR.PATCH` on this repository.

```bash
npm run release:patch   # or release:minor / release:major — bumps version, commits, creates tag v…
git push --follow-tags origin main
npm publish           # add --otp=… if you use 2FA
```

---

## Contributing

Pull requests are welcome. Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for language expectations (English), branch workflow, and a short checklist.

```bash
git clone https://github.com/albegosu/micrographic-skill.git
cd micrographic-skill
# edit SKILL.md (and DESIGN.md when tokens change)
# test locally: node bin/install.mjs --dry-run && node bin/install.mjs --cursor
npm install && npm run check:design   # DESIGN.md lint + drift guard against SKILL.md
```

---

## License

MIT — [alberto@resiz.es](mailto:alberto@resiz.es)

<br/>

<div align="center">
  <sub><code>REF/MIC-SKL-001 · REV.A · 2026 · SKU/OPEN-SOURCE</code></sub>
</div>
