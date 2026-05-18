---
name: micrographic
description: Use this skill to build micrographic UI components and views — cards, panels, dashboards, dense data displays — matching the industrial label collage north star (examples/reference-collage.png). Compression not minimalism; metadata as texture. Two type scales (display 80px+ vs micro 7–11px); dual display modes (light condensed OR heavy brutalist). Near-monochrome + signal accents (orange/red/yellow default). Schematic geometry, corner brackets, dimension lines, texture panels. Trigger for "micrographic", "spec sheet", "technical grid", "industrial aesthetic", "brutalist typography", "blueprint UI", "dense information UI", "schematic interface".
---

# Micrographic Design System

## Scope — components and views

Use this skill to implement **UI components and views**: `SpecCard`, `DataPanel`, `DisplayHero`, `MetricGrid`, `Chip`, settings blocks, dashboard tiles, detail panels, modals. The visual language comes from industrial labels and spec plates (`examples/reference-collage.png`), but the deliverable is **interface code** — not a printable document, shipping tag, or page mockup built from semantic HTML landmarks.

**Vocabulary:** component and region names (`MetaStrip`, `DisplayHero`, `TexturePanel`), not document anatomy (`<header>`, `<footer>`, "tags" as a layout section). Metadata strings (REF codes, serials) are **content inside components**, not separate page sections.

The aesthetic still reads like a physical label compressed onto a screen — maximum density, two type scales, hairline grids — applied to interactive UI.

## North Star — The Collage Feeling

**Visual reference:** `examples/reference-collage.png` — the sensory target for every output.

Every output should match an **industrial information collage**: disparate printed artifacts — care tags, shipping labels, customs forms, spec sheets, box dielines, price stickers, poster/index panels, regulatory marks, wireframe schematics, utilitarian logo treatments — sharing one visual logic on a neutral ground. Not one template repeated; a **family of label types** that all compress information the same way.

**Essence (use as a generation brief):**
> Industrial product-label collage — extreme type scale (huge display vs 7–11px micro), visible grids and hairline borders, schematic wireframes and dimension lines, barcodes/QR and regulatory metadata as decoration. Near-monochrome with signal accents only (safety orange, red, yellow). Ordered chaos: dense but grid-locked. Utilitarian, compressed, Swiss-technical — not minimal, not friendly UI.

**What the collage feels like:**
- **Compression, not minimalism** — minimalism removes; micrographic *packs*. Density is intentional; every pixel carries a job.
- **Ordered chaos** — maximum information density, but locked to a visible grid. It feels archival and accumulated, not randomly cluttered.
- **Function over decoration** — the piece reads like documentation, packaging, or equipment marking, not a marketing layout.
- **Metadata is the ornament** — REF codes, SKUs, serial strips, CE marks, barcodes, QR codes, dimensions, version numbers, and "Made in" stamps are visual texture *and* information.
- **Texture at distance, data up close** — zoomed out: gray zones, grid rhythm, signal-color bands, photocopy grain. Zoomed in: every line parseable.
- **Archival photocopy quality** — high contrast, slight grain or halftone texture; reads like a scan or duplicate of a physical document, not a glossy screen mockup.
- **Near-monochrome + signal color** — black, white, warm paper, ink grays; accent colors are *warnings and priorities* (safety orange, FRAGIL red, caution yellow), never a decorative palette. Orange and red are collage-default signals; blue is the HUD/screen variant.
- **Swiss objectivity + industrial labeling** — asymmetric grids, condensed type, objective layout — the reference is a **warehouse shelf of labels and spec plates**, not a SaaS marketing page.
- **Tech-wear graphic adjacency** — utilitarian, technical, slightly retro-futuristic; functional marks over brand expression. Optional retro-futurism panels (space diagram, wireframe globe) are valid *minor* collage members, not the default output.
- **Heterogeneous views** — compose different patterns (`SpecCard`, `PosterView`, `FormView`, `TicketView`, `GalleryView`) so screens feel like distinct artifacts, not one repeated template.

**What it is not:**
- A SaaS dashboard card with comfortable 14–16px body text
- Friendly, rounded, pastel UI
- Decorative illustration or organic curves as structure
- Color used for brand expression rather than system signals
- A generic marketing hero section (poster/index panels are valid *collage members* when they use heavy display + micro TOC — not default web heroes)

If the output would not belong on the reference collage next to a FRAGIL sticker, a Kodak box template, and an INDEX poster panel — it is not micrographic.

This distinction matters. A UI card has hierarchy, breathing room, comfortable reading sizes — it is optimized for interaction and scanning. A label has none of that. It contains the maximum amount of information in the minimum possible space, at the minimum legible type size, and it looks designed precisely *because* of that constraint. The design emerges from the compression, not from the decoration applied on top.

**Two scales only.** Either you are at display scale — one large number, one name, one thing that demands to be seen — or you are at micro scale, where everything else lives at 7–11px. There is no comfortable middle. The mid-scale (12–20px headings, readable body text) is where UI lives. The absence of it is what makes the label.

---

## Typography

Typography is the soul of micrographic design. Build the type system first.

**Preferred typefaces:**
```
Primary:  Barlow Condensed, Barlow Semi Condensed
          IBM Plex Sans Condensed
          Roboto Condensed
Mono:     IBM Plex Mono, DM Mono, JetBrains Mono
Fallback: ui-sans-serif, system-ui, sans-serif
```

Load via Google Fonts or system stacks. Condensed cuts are essential — regular-width fonts lose the schematic feel.

**Canonical type scale — micrographic output uses only these tokens:**
```css
:root {
  /* Micro scale — field labels, values, annotations, chips, meta rows */
  --text-micro: 7px;   /* decorative annotations, watermarks — never critical content */
  --text-xs:    8px;   /* dense spec annotations */
  --text-sm:    10px;  /* meta labels, secondary data, chips */
  --text-md:    11px;  /* micro values, table cells — upper bound of micro */

  /* Display scale — ONE element per component only */
  --text-display: 80px;   /* default display */
  --text-display-lg: 96px;
  --text-display-xl: 120px;
}
```

**Scale Brutalism — the defining law of micrographic typography:**

Real micrographic design operates at exactly two scales:
```
Display:  80px–120px — ONE number, name, word, or stat per component. Nothing else at this scale.
Micro:    7px–11px   — everything else: field labels, values, chips, meta rows, annotations
```

The **forbidden zone is 12px–20px.** Do not define or use tokens in this range. This is where UI components live — comfortable reading sizes, section headings, subheadings. Anything here destroys the physical label feel. Collapse: promote to display (make it huge) or demote to micro (make it tiny).

The only partial exception is a data cell value in a metrics grid — a single number at 11px in IBM Plex Mono, tightly surrounded by 7px Barlow Condensed labels. Even here, it reads as part of the micro field.

**Dual display modes — choose by layout pattern:**

| Mode | Use for | Weight | Face | Example |
|------|---------|--------|------|---------|
| **A — Spec** | Spec cards, athlete IDs, serial plates, numeric dominance | 300 | Barlow Condensed | `287W`, `HX-4420` |
| **B — Poster** | Poster/Index panels, utilitarian headlines, word-dominant titles | 700–900 | Barlow Condensed / Semi Condensed | `INDEX`, `ATARI`, `THE RIGHT TO BE LAZY` |

One display element per component in either mode. Mode A: tabular numerals, tight tracking. Mode B: uppercase or tracked caps, `line-height: 0.95`, negative letter-spacing optional (`-0.02em`) for density.

**Display fit — typography is fixed; size must obey the zone**

The display face, weight, and casing are non-negotiable (Mode B: Barlow Condensed 800, uppercase, stacked lines). What fails in eval is **shrinking display into the forbidden zone (40–55px) or bleeding past hairline borders** because the column is too narrow.

**Zone containment — displays and headers stay inside the box**

Every bordered region (`MetaStrip`, `DisplayHero`, `poster-column`, `hud-box`, export card shell) is a **hard clip boundary**. No glyph, chip, or registration mark may cross its parent's `border` or the card edge. A shell may use `overflow: hidden` on the card — that is not permission to let the title overflow; it means the layout failed.

| Region | Containment rule |
|--------|------------------|
| **`MetaStrip`** (top header row) | Fixed height (28–32px). `overflow: hidden`. Long IDs ellipsize — never wrap to a second line or spill into `CardBody`. |
| **`DisplayHero`** | `width: 100%`, `max-width: 100%`. Size type to fit **inner width** — never `overflow: hidden` on the hero itself. |
| **`poster-column`** | `container-type: inline-size`, `min-width: 0`. Column width is the sizing context for display. |
| **Card shell** | `overflow: hidden` only on the outer shell; inner zones must self-contain so nothing is cropped invisibly. |

**Size the box before the type.** `DisplayHero` is the main title — it needs a **display zone** (column + inner box) wide enough for the **longest stacked line** at ≥64px. Typography `clamp()` alone cannot fix a column that is too narrow; widen `--col-poster-width` or `--card-width` first, or split long words across more `.display__line` rows.

**Pre-flight (mandatory before shipping any PosterView):**

1. Count characters on the **longest** `.display__line` (e.g. `GRAPHIC` → 7).
2. Inner poster width ≈ `max(var(--col-poster-width), var(--col-poster-min)) − horizontal padding`.
3. Required min column width: `longestChars × 0.58 × 64px + padding` (Barlow Condensed 800 uppercase ≈ **0.58em** average glyph width).
   - Example: 7 chars at 64px → **~280px** inner → set `--col-poster-min: 268px` or stack `GRAP` / `HIC`.
4. Set `--display-chars` on `.display--poster` to that longest count; use the char-fit `clamp` below.
5. Visually confirm: no letterform touches or crosses the column's right border.

Rules:
- **Always start from the display token** (`--text-display: 80px`). Scale down only to fit the container, never below **64px** — anything smaller reads as UI heading, not poster display. If 64px cannot fit, **widen the column or split the line** — do not clip and do not park in the 40–55px forbidden zone.
- **Fit to width, not by clipping** — no `overflow: hidden` on `DisplayHero` or its zone. If the longest line does not fit at 64px+, stack more lines, shorten the title, or widen the column — never crop letterforms.
- **Char-fit sizing (preferred over blind `36cqw`)** — set `--display-chars` to the longest line's character count; size from container width:

```css
:root {
  --display-char-ratio: 0.58; /* Barlow Condensed 800 uppercase */
}

.display--poster {
  width: 100%;
  max-width: 100%;
  font-size: clamp(
    4rem,
    calc(92cqw / (var(--display-chars, 6) * var(--display-char-ratio))),
    5rem
  );
}
```

```html
<h1 class="display--poster" style="--display-chars: 7">
  <span class="display__line">MICRO</span>
  <span class="display__line">GRAPHIC</span>
  ...
</h1>
```

- **Side-column posters** (manifest + poster split): poster column ≈ **35–40%** of `--card-width`, with a **floor** `--col-poster-min: 268px` when the longest line has **7+ characters** at 64px (560px cards with `MICRO` / `GRAPHIC` / `SKILL`). Set `container-type: inline-size` on the poster column.
- **Wrong:** `font-size: 46px` on `MICROGRAPHIC` / `SKILL` to avoid overflow — forbidden zone and still clips. **Wrong:** `clamp(4rem, 36cqw, 5rem)` alone on a 212px column with a 7-char line — the 4rem floor forces overflow past the border.
- **Right:** stacked lines + `--display-chars` + column wide enough for 64px, or char-fit `clamp` without a floor that exceeds the box; micro `+` stays at `--text-sm` / `--text-xs`.

**Card width — one knob, proportional columns**

Control overall density from a single token; derive the poster column (display zone width) from it:

```css
:root {
  --card-width: 560px;                              /* change this only */
  --col-poster-width: calc(var(--card-width) * 0.38); /* 35–40% for poster + DisplayHero */
  --col-poster-min: 268px;                        /* floor — 7-char line @ 64px (GRAPHIC) */
  --display-char-ratio: 0.58;
}

.spec-card {
  width: var(--card-width);
  max-width: calc(100vw - 48px);
}

.card-body--split {
  display: grid;
  grid-template-columns: max(var(--col-poster-width), var(--col-poster-min)) 1fr;
}
```

Reference: `examples/v1.1.0-micrographic-skill.html` (`?w=720` overrides `--card-width` for export previews).

```css
/* Mode A — spec / numeric display */
.display--spec {
  font-family: 'Barlow Condensed', ui-sans-serif;
  font-size: var(--text-display);
  font-weight: 300;
  line-height: 1.0;
  font-variant-numeric: tabular-nums;
  letter-spacing: -0.02em;
}

/* Mode B — poster / headline display */
.display--poster {
  font-family: 'Barlow Condensed', ui-sans-serif;
  font-size: var(--text-display);
  font-weight: 800;
  line-height: 0.95;
  text-transform: uppercase;
  letter-spacing: 0.02em;
}
```

**Rules (both scales):**
- Uppercase labels: letter-spacing `0.08em`–`0.15em` — makes tiny text read as designed
- All category labels, chips, field codes in ALL CAPS + tracked
- Line height: tight on display (`0.95`–`1.1`), tight on micro (`1.2`–`1.4`)
- Micro labels: 600–700; micro values: 400–500
- Numbers: always `font-variant-numeric: tabular-nums` in data contexts

---

## Color

Near-monochromatic palette. The constraint is the aesthetic. Two canonical modes exist — both are equally valid micrographic outputs.

**Dark mode** — screen/HUD interpretation. Near-black background, near-white text:
```css
:root {
  --color-bg:      #0A0A0A;
  --color-ink:     #1A1A1A;  /* hatching, arc inner */
  --color-dark:    #2A2A2A;  /* borders, brackets, dots, geo separators */
  --color-mid:     #555555;  /* chip text non-active */
  --color-muted:   #888888;  /* zone category labels */
  --color-faint:   #3A3A3A;  /* REF/SKU codes */
  --color-white:   #FAFAFA;  /* display number, primary text */
  --color-accent:  #FF8C00;  /* safety orange — collage default for dark/HUD; exactly 3 uses */
}
```

**Light mode** — physical label interpretation. Warm paper background, dark ink. This is the more authentic physical-object reading — most real care tags, spec stickers, and serial plates are printed on white or cream stock:
```css
:root {
  --color-bg:      #F4F2EE;  /* warm label paper — NOT pure white */
  --color-ink:     #0A0A0A;  /* display number, primary text */
  --color-dark:    #1A1A1A;  /* strong label text */
  --color-mid:     #888888;  /* field labels, chip text non-active */
  --color-muted:   #AAAAAA;  /* dimension line labels, unit suffix */
  --color-faint:   #BBBBBB;  /* REF/SKU codes, serial strip, meta bar */
  --color-border:  #C8C4BE;  /* all zone borders, brackets, dots, geo separators */
  --color-hatch:   #E4E0DA;  /* diagonal hatching stripes */
  --color-accent:  #CC2200;  /* signal red — collage default for light/physical; exactly 3 uses */
}
```

The warm paper background (`#F4F2EE`) is non-negotiable in light mode — pure `#FFFFFF` loses the physical object quality. The warmth references actual label card stock.

**Accent rule — both modes:** The accent color appears in exactly three places per view: one active `Chip`, one key metric highlight, and the top-left corner bracket. Three is the maximum. If used in four places, the accent stops reading as "signal" and starts reading as "color scheme."

**Choosing accents — collage defaults first, then context:**
```
#FF8C00   safety orange    collage default (dark mode) — industrial equipment, safety plate, dominant mood-board signal
#CC2200   signal red       collage default (light mode) — FRAGIL, shipping, customs, warning stamps
#0033FF   electric blue    HUD / screen / sport-tech monitor — not the collage default
#00CC66   terminal green   data terminal, biosensor, approved stamp
#C8A96E   warm gold        premium, archival, museum-quality
```

Orange (`#FF8C00`) and red (`#CC2200`) are the dominant signal colors on the reference collage. Default to orange in dark mode and red in light mode unless the subject explicitly calls for HUD/screen aesthetics (then blue). Never default to blue for physical-label or collage-aligned outputs.

**Multi-zone color** — not all pieces need to be near-monochromatic. Valid micrographic compositions include:
- One zone with a solid colored background (red block with white text, yellow zone, black zone) — like a shipping label with a colored PRIORITY band
- Colored stamp or seal against a neutral ground
- Multiple sticker-style elements of different colors on a white/cream ground

When using multi-zone color: each color must carry a function (red = warning/priority, yellow = caution, green = approved, black = classification). Color is never decorative — it is always a system signal.

---

## Spacing & Grid

```css
:root {
  --space-1:  4px;
  --space-2:  8px;
  --space-3:  12px;
  --space-4:  16px;
  --space-6:  24px;
  --space-8:  32px;
  --space-12: 48px;
  --space-16: 64px;
}
```

The 4px base unit is the micro-grid. Every spacing decision should derive from it. Components use very tight internal padding (`4px`–`8px`) contrasted with deliberately larger gaps between sections — compression followed by space creates the visual rhythm.

**Angular by default:** Border-radius should be `0`–`2px` maximum. Micrographic UIs are precise and rectilinear. Round corners signal softness; this aesthetic is sharp.

---

## Borders & Lines

Hairline borders are the skeleton. They define zones, annotate, and create structure without weight.

```css
:root {
  --border:        1px solid var(--color-border);
  --border-dark:   1px solid var(--color-dark);
  --border-accent: 1px solid var(--color-accent);
}
```

Use borders to: frame every component, divide internal sections with horizontal rules, create table-cell grids where rules cross, and annotate elements spec-sheet style. Avoid drop shadows — borders do the depth work here, not shadows.

### Background Texture Patterns

Two CSS-only patterns that add density and zone differentiation without SVG overhead:

**Dot grid** — texture inside a `TexturePanel` or passive sidebar column (matrix beside a `DisplayHero`). Not as a horizontal rule between stacked components — use solid `border-top` / `AnnotationRow` instead.

```css
.dot-pattern {
  background-image: radial-gradient(circle, var(--color-dark) 1px, transparent 1px);
  background-size: 5px 5px;
  background-position: 2px 2px;
}
```

**Diagonal hatching** — use to signal a passive zone, fill a background area, or create directional depth behind a subject band:
```css
.hatch-pattern {
  background-image: repeating-linear-gradient(
    -45deg,
    transparent,
    transparent 3px,
    var(--color-ink) 3px,
    var(--color-ink) 4px
  );
}
```

Both patterns must use `--color-dark` or `--color-ink` values only — never the accent color. Use one per component maximum. They should read as texture, not as a deliberate graphic element.

**Photocopy / archival grain** — optional overlay for collage-aligned outputs. Reads as a scanned duplicate, not a glossy screen. Use on the card container or a passive zone — one per component maximum. This is structure (archival texture), not a decorative gradient:

```css
.photocopy-grain {
  position: relative;
}
.photocopy-grain::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.06;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  mix-blend-mode: multiply;
}
```

Pair with high contrast (ink on warm paper or white on near-black). Avoid soft shadows — grain replaces gloss.

### Texture Zones

Texture fills are how labels cover large areas: not with decoration, but with repeated information that forms a solid visual block. At thumbnail size it reads as gray. At full size every character is legible. This is the NIKE c.72 technique — text IS the background.

**Repeated micro-text block** — tile a reference string to fill a column, sidebar, or background panel:
```css
.text-texture {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 7px;
  line-height: 1.3;
  letter-spacing: 0.04em;
  color: var(--color-ink);
  overflow: hidden;
  user-select: none;
  pointer-events: none;
  word-break: break-all;
}
```
The repeated string should be real metadata — `UNIT-07 VOLKOV-A UNIT-07 VOLKOV-A` — so it is both texture and information, not noise.

**Serial count strip** — sequential numbers running past the visible edge, implying a larger physical document:
```html
<div class="serial-strip" aria-hidden="true">
  0000 0001 0002 0003 0004 0005 0006 0007 0008 0009 0010 0011 0012 0013 0014 0015 0016 0017
</div>
```

**Dot matrix panel** — use the dot pattern not as a narrow 36px strip but as a full zone panel (100px+ wide). The dot matrix IS the design of that zone — not a background behind content. A blank panel with dot matrix is more correct than a blank panel with nothing.

### Label Boundary

A physical label exists as a cut object. The edge is as designed as the interior. A card where all four edges are identical `1px solid #2A2A2A` borders reads as a UI box. One edge that signals the physical cut reads as a physical object.

**Dashed cut line** — a dashed border on one edge signals the label was cut from a larger sheet:
```css
.cut-edge {
  border-right: 1px dashed var(--color-dark);
  /* or bottom, depending on cut direction */
}
```

**Perforation strip** — optional on `TicketView` only: circles along a **split boundary** between two detachable UI regions (e.g. main panel vs stub). Omit on standard cards and dashboards.
```html
<div class="perforation" aria-hidden="true"></div>
```
```css
.perforation {
  width: 100%;
  height: 6px;
  background-image: radial-gradient(circle, var(--color-dark) 1.5px, transparent 1.5px);
  background-size: 8px 6px;
  background-position: 0 0;
}
```

**Bleed margin** — a 4–6px strip at one edge using the dot pattern or diagonal hatching. On physical labels this is the trim area; it immediately signals "edge of object." Use it at the bottom or right edge, not all four.

---

## Core Components

Build these as reusable UI primitives (React/Vue/Svelte/HTML+CSS). Compose them into views below.

### Chip (status / category badge)

The atomic badge for status, category, and filter state.

```css
.chip {
  font-family: 'Barlow Condensed', ui-sans-serif;
  font-size: var(--text-xs);         /* 10px */
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-mid);
  border: var(--border);
  padding: 2px 6px;
  display: inline-block;
  line-height: 1.4;
}

.chip--active {
  color: var(--color-accent);
  border-color: var(--color-accent);
}

.chip--filled {
  background: var(--color-ink);
  color: var(--color-white);
  border-color: var(--color-ink);
}
```

Stack chips in a `ChipRow`. Four to six chips with distinct meaning reads intentional, not cluttered.

**Segmented `ChipRow`** — adjacent chips share a single hairline (no double borders):

```css
.chip-row { display: flex; padding: 4px 8px; }
.chip-row .chip + .chip { margin-left: -1px; }
.chip-row .chip:not(:last-child) { border-right: none; }
/* :last-child keeps full box — never border-right: none on every chip */
```

Inside a card shell with `overflow: hidden`, keep **≥1px horizontal padding** on the row (`padding-right: 9px` is enough) so the **last chip's right border** is not clipped. A missing right edge on the final chip (e.g. accent `DESIGN SYSTEM`) is a layout bug, not an eval prompt issue.

### SpecCard (panel shell)

Primary container for a dense UI block. Three slots — not document landmarks:

| Slot | Role |
|------|------|
| `MetaStrip` | Top row: category code, REF, version (micro) |
| `CardBody` | Main content: display, tables, splits |
| `MetaBar` | Bottom row: secondary IDs, timestamps, optional command text (micro) |

```css
.spec-card {
  border: var(--border-dark);
  background: var(--color-white);
}

.spec-card__meta-strip {
  padding: var(--space-2) var(--space-3);
  border-bottom: var(--border);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-2);
}

.spec-card__body {
  padding: var(--space-3);
}

.spec-card__meta-bar {
  padding: var(--space-2) var(--space-3);
  border-top: var(--border);
  font-family: 'IBM Plex Mono', monospace;
  font-size: var(--text-micro);
  color: var(--color-faint);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
```

Fill `MetaBar` with reference strings when the view needs extra density — never leave the slot empty on a finished card.

### MetaStrip (top header row)

The **header band** — category chip, entity title, REF/version. Micro scale only; fixed height. This row is the most common overflow failure (long package names + dates + REF strings).

```css
.meta-strip {
  height: 28px;
  min-height: 28px;
  max-height: 28px;
  overflow: hidden;              /* hard boundary — content must not spill into CardBody */
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0 10px;
  border-bottom: var(--border);
}

.meta-strip__title {
  flex: 1 1 auto;
  min-width: 0;                  /* allow flex child to shrink below content width */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.meta-strip__right {
  flex: 0 1 auto;
  min-width: 0;
  margin-left: auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.meta-strip .chip {
  flex-shrink: 0;
}
```

- **Do not** let the title or REF row wrap to a second line or increase strip height.
- **Do** ellipsize the center title and/or right REF block when space is tight; chips at the left keep `flex-shrink: 0`.
- **Do** shorten copy in data (e.g. `MICROGRAPHIC-SKILL@1.1.0` → truncate in CSS, not smaller font).

### DisplayHero

The **main title** of the component — one display-scale element per view. Use `.display--spec` (Mode A) or `.display--poster` (Mode B) from Typography. Lives inside a **display zone** in `CardBody` or a `PosterView` column — never two heroes in one view.

**Structure — column + box + title**

```html
<div class="poster-column">           <!-- grid column; container-type: inline-size -->
  <div class="display-hero">        <!-- display zone: padding + min-height; no overflow:hidden -->
    <h1 class="display--poster" style="--display-chars: 7">
      <span class="display__line">MICRO</span>
      <span class="display__line">GRAPHIC</span>
      <span class="display__sep" aria-hidden="true">+</span>  <!-- micro scale only -->
      <span class="display__line">SKILL</span>
    </h1>
  </div>
  <!-- ChipRow, hud tagline, etc. below — not inside display-hero -->
</div>
```

```css
.poster-column {
  container-type: inline-size;
  min-width: 0;
}

.display-hero {
  position: relative;
  z-index: 2;
  padding: 12px 10px 16px;
  min-height: 11rem;           /* ~3 stacked lines at clamp(4rem, …) */
  /* Do not clip: no overflow: hidden */
}

.display-hero .display--poster {
  width: 100%;
  max-width: 100%;
  font-family: 'Barlow Condensed', ui-sans-serif;
  font-weight: 800;
  font-size: clamp(
    4rem,
    calc(92cqw / (var(--display-chars, 6) * var(--display-char-ratio, 0.58))),
    5rem
  );
  line-height: 0.92;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

.display__line {
  display: block;
  max-width: 100%;
}

.display__sep {
  display: block;
  font-size: var(--text-sm);
  font-weight: 600;
  letter-spacing: 0.2em;
  color: var(--color-mid);
  margin: 2px 0;
  line-height: 1;
}
```

**Sizing checklist**
- Run the **pre-flight** (longest line chars × 0.58 × 64px ≤ inner column width)
- Set `--display-chars` on `.display--poster` to the longest line's character count
- Poster column: `max(calc(var(--card-width) * 0.38), var(--col-poster-min))` before tuning `clamp`
- Long titles: one word (or syllable group) per `.display__line` — never one line for `MICROGRAPHIC` in a side column
- `MetaStrip`: fixed 28px height + ellipsis — header row never bleeds into the body
- Schematic/geo SVG behind the title: `position: absolute` on a sibling, not inside `.display-hero`
- If the title still crosses a border: increase `--card-width` or `--col-poster-min`, or split the long line — never `overflow: hidden` on the hero

### Buttons

Micrographic buttons are flat, precise, and feel like physical controls on technical equipment.

```css
.btn {
  font-family: 'Barlow Condensed', ui-sans-serif;
  font-size: var(--text-xs);
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: var(--space-2) var(--space-4);
  border: var(--border-dark);
  background: transparent;
  color: var(--color-ink);
  cursor: pointer;
  border-radius: 0;
  transition: background 80ms, color 80ms;
}

.btn:hover {
  background: var(--color-ink);
  color: var(--color-white);
}

.btn--primary {
  background: var(--color-ink);
  color: var(--color-white);
}

.btn--accent {
  border-color: var(--color-accent);
  color: var(--color-accent);
}

.btn--accent:hover {
  background: var(--color-accent);
  color: var(--color-white);
}
```

No border-radius. No gradients. No box shadows. The transition should be fast (80ms) — snappy, not smooth.

### Data Tables

Tables in micrographic style are dense and grid-like. Every row is a data entry; every column is a spec field.

```css
.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--text-xs);
}

.data-table th {
  font-size: var(--text-micro);
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-muted);
  padding: var(--space-1) var(--space-2);
  border-bottom: var(--border-dark);
  text-align: left;
}

.data-table td {
  padding: var(--space-2) var(--space-2);
  border-bottom: var(--border);
  color: var(--color-ink);
  font-variant-numeric: tabular-nums;
  font-family: 'IBM Plex Mono', monospace;
}

.data-table tr:hover td {
  background: var(--color-surface);
}
```

### Navigation

Navigation looks like a directory or filing system — category codes, reference numbers, precise labels.

```css
.nav {
  border-bottom: var(--border-dark);
  display: flex;
  gap: 0;
}

.nav-item {
  font-size: var(--text-xs);
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: var(--space-2) var(--space-4);
  border-right: var(--border);
  color: var(--color-mid);
  text-decoration: none;
  display: block;
}

.nav-item:hover { color: var(--color-ink); }

.nav-item--active {
  color: var(--color-accent);
  box-shadow: inset 0 -2px 0 var(--color-accent);
}
```

### Inputs & Form Fields

Forms should feel like filling in a technical document.

```css
.field-label {
  font-size: var(--text-micro);
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-mid);
  display: block;
  margin-bottom: var(--space-1);
}

.field-input {
  width: 100%;
  font-family: 'IBM Plex Mono', monospace;
  font-size: var(--text-sm);
  padding: var(--space-2) var(--space-2);
  border: var(--border-dark);
  border-radius: 0;
  background: var(--color-white);
  color: var(--color-ink);
  outline: none;
}

.field-input:focus {
  border-color: var(--color-accent);
  outline: none;
}
```

---

## Decorative Micro-Elements

These are what separate micrographic UI from just "minimal" UI. Sprinkle them throughout:

**Spec annotations** — alphanumeric references that suggest hidden depth:
```html
<span class="spec" aria-hidden="true">REF-4821-A · SKU/0042 · REV.03</span>
<span class="spec" aria-hidden="true">148mm × 210mm · A4 · 72dpi · v2.1</span>
```

**Crosshairs / registration marks** — `+` or `×` symbols at corners or layout intersections:
```css
.registration-mark {
  position: absolute;
  font-size: 8px;
  color: var(--color-faint);
  user-select: none;
}
```

**Serial number rules** — long monospaced strings used as horizontal dividers:
```html
<div class="serial-rule" aria-hidden="true">
  0000 0001 0002 0003 0004 0005 0006 0007 0008 0009 0010 0011 0012
</div>
```

**Grid coordinates** — column/row references (`A1`, `B3`) placed schematically at component corners.

**Barcodes** — vertical stripe patterns that carry the physical energy of shipping labels, spec plates, and product stickers. One of the most recognizable signals that a piece belongs to the micrographic language. Use CSS or inline SVG:

```html
<div class="barcode" aria-hidden="true">
  <!-- alternate 1px and 2px bars, grouped -->
</div>
<span class="barcode__number">0 00432 17834 6</span>
```
```css
.barcode {
  display: flex;
  gap: 1px;
  height: 28px;
  align-items: stretch;
}
.barcode__bar {
  background: var(--color-ink);
  flex-shrink: 0;
}
.barcode__number {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 7px;
  color: var(--color-dark);
  letter-spacing: 0.08em;
  display: block;
  margin-top: 3px;
  text-align: center;
}
```
**Barcode placement rules — strict:**

A barcode belongs only in an **`IdStrip`** component: bottom of a `SpecCard`, inside `MetaBar`, or a dedicated `ScanPanel`. Use when the UI represents something with a scannable physical ID (product, asset, ticket). Never structural decoration, never a full-height column fill.

When placing a barcode:
- Anchor it at the bottom of the card shell or inside a bounded `IdStrip`
- Keep it narrow — 28px–44px tall maximum, full zone width
- Always pair it with a human-readable number below (7px IBM Plex Mono)
- Separate it from content above with a 1px border
- If the piece already has a serial strip, a barcode may be redundant — choose one

When NOT to use a barcode: if the component is a screen view, a data table, or anything that is never physically printed or attached to an object, the barcode is out of context. Omit it.

Generate stripe widths in code by alternating 1px–2px bars in groups of 4–7.

**QR codes** — square matrix pattern for digital ID. Same placement as barcodes: `IdStrip` / `ScanPanel` only. Never structural fill. Use inline SVG or a minimal 21×21 module grid in `--color-ink` on neutral ground:

```html
<svg class="qr-code" viewBox="0 0 21 21" aria-hidden="true" fill="var(--color-ink)">
  <!-- 21×21 module grid — finder patterns at three corners -->
</svg>
<span class="qr-code__label">SCAN · REF-0710-A</span>
```
```css
.qr-code {
  width: 44px;
  height: 44px;
  display: block;
}
.qr-code__label {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 7px;
  color: var(--color-dark);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-top: 3px;
}
```

If both barcode and QR are contextually valid, choose one — not both in the same identification zone.

**Certification and warning symbols** — the ISO / care-label symbol vocabulary is central to the physical label aesthetic. These should read as functional marks, not decoration:

```html
<!-- Care label symbols via Unicode -->
<span class="cert-sym" aria-hidden="true">⚠</span>
<span class="cert-sym" aria-hidden="true">◉</span>
<span class="cert-sym" aria-hidden="true">△</span>

<!-- CE / LPS style certification mark -->
<svg class="cert-mark" viewBox="0 0 28 14" fill="none" aria-hidden="true">
  <rect x="0.5" y="0.5" width="27" height="13" stroke="var(--color-dark)" stroke-width="0.75"/>
  <text x="14" y="10" text-anchor="middle" font-family="IBM Plex Mono" font-size="7"
        fill="var(--color-dark)" font-weight="500" letter-spacing="1">CE</text>
</svg>
```
```css
.cert-sym {
  font-size: 8px;
  color: var(--color-mid);
  user-select: none;
  pointer-events: none;
}
.cert-mark {
  display: inline-block;
  width: 28px;
  height: 14px;
  pointer-events: none;
}
```

**Stamp and circular seal** — a circle with text running along the inside edge. Suggests certification, validation, arrival. Visually distinct from arcs — it is a complete closed form, not a schematic line:

```html
<svg class="stamp-seal" viewBox="0 0 80 80" fill="none" aria-hidden="true">
  <circle cx="40" cy="40" r="35" stroke="var(--color-dark)" stroke-width="1"/>
  <circle cx="40" cy="40" r="28" stroke="var(--color-dark)" stroke-width="0.5"
          stroke-dasharray="2 4"/>
  <path id="seal-text-path"
    d="M40,40 m-24,0 a24,24 0 1,1 48,0 a24,24 0 1,1-48,0" fill="none"/>
  <text font-family="IBM Plex Mono" font-size="5.5" fill="var(--color-dark)"
        letter-spacing="2.5">
    <textPath href="#seal-text-path">VALIDATED · REF-0710-A · SESSION-04 ·</textPath>
  </text>
</svg>
```
```css
.stamp-seal {
  width: 56px;
  height: 56px;
  pointer-events: none;
  user-select: none;
}
```

**Non-Latin characters as texture** — Japanese, Korean, or Cyrillic characters placed at micro scale (7–8px) in passive zones or alongside serial strips. They read as visual texture from a distance, as foreign-market spec data up close. Use sparingly, `aria-hidden="true"`.

All decorative elements should have `aria-hidden="true"` — they enrich the visual experience, not the semantic content.

```css
.spec {
  font-family: 'IBM Plex Mono', monospace;
  font-size: var(--text-micro);
  color: var(--color-faint);
  letter-spacing: 0.05em;
  user-select: none;
}
```

### Micro-Geometry Layer — Mandatory

This is the layer that separates a micrographic output from a "dense dark UI card." It has nothing to do with big structural arcs or background decoration — it is the accumulation of small, precise, technical marks distributed across the component. Every zone boundary, data cell, and content edge is an opportunity for a micro-geometric mark.

**What counts as micro-geometry:**
- `+` or `×` registration marks at zone corners and intersection points
- Tick marks (`|`) at the edges of data cells, alongside metric values, or on dimension lines
- Grid coordinate labels (`A1`, `B3`, `C2`) positioned at zone entry points
- Measurement annotation brackets (` ←——— 287W ——→ `) adjacent to display elements
- Short orthogonal lines crossing zone borders — a 4px vertical line protruding from a horizontal rule
- Right-angle corner marks inside content areas (not just the outer card)
- Small numeric sequences (`.01`, `.02`, `.03`) running alongside a column of metrics

**Minimum density requirements:**
- At least 3 registration marks or crosshair ticks distributed across zone boundaries
- At least 1 dimension annotation bracketing the primary display element
- At least 1 grid coordinate label visible in the layout
- At least 1 intersection mark where two borders cross (a small `+` or extended tick)

These marks should be `aria-hidden="true"`, `user-select: none`, `pointer-events: none`. They are CSS-positioned or inline SVG. They do not require a separate SVG layer — most can be absolute-positioned spans or pseudo-elements.

```html
<!-- Registration mark at a zone boundary intersection -->
<span class="reg-mark" aria-hidden="true" style="top: 0; left: 54px">+</span>

<!-- Grid coordinate at zone entry -->
<span class="grid-coord" aria-hidden="true">A2</span>

<!-- Dimension annotation bracketing a metric value -->
<span class="dim-annot" aria-hidden="true">←——</span>
<span class="dim-annot" aria-hidden="true">——→</span>
```

```css
.reg-mark {
  position: absolute;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 8px;
  color: var(--color-faint);
  line-height: 1;
  user-select: none;
  pointer-events: none;
}
.grid-coord {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 7px;
  color: var(--color-faint);
  letter-spacing: 0.08em;
  user-select: none;
  pointer-events: none;
}
.dim-annot {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 7px;
  color: var(--color-muted);
  letter-spacing: 0;
  user-select: none;
  pointer-events: none;
}
```

The micro-geometry layer is invisible at a glance but makes itself known the moment you look closely. That gap — noticing it exists only when you inspect — is exactly correct.

### SVG Geometric Layer

This is what separates a micrographic UI from a "minimal dark card". Every component must carry at least one element from this vocabulary. Use inline SVG — it stays crisp at any resolution and requires no assets.

**Corner brackets** — L-shaped SVG lines replace simple `+` characters at component corners. The top-left bracket uses the accent color as the single geometric anchor; all others use `--color-dark`:

```html
<svg class="corner-bracket corner-bracket--tl" viewBox="0 0 14 14" fill="none" aria-hidden="true">
  <line x1="0" y1="0" x2="10" y2="0" stroke="var(--color-accent)" stroke-width="1.5"/>
  <line x1="0" y1="0" x2="0"  y2="10" stroke="var(--color-accent)" stroke-width="1.5"/>
</svg>
<svg class="corner-bracket corner-bracket--tr" viewBox="0 0 14 14" fill="none" aria-hidden="true">
  <line x1="0" y1="0" x2="10" y2="0" stroke="#2A2A2A" stroke-width="1.5"/>
  <line x1="0" y1="0" x2="0"  y2="10" stroke="#2A2A2A" stroke-width="1.5"/>
</svg>
```

```css
.corner-bracket {
  position: absolute;
  width: 14px;
  height: 14px;
  pointer-events: none;
  z-index: 10;
}
.corner-bracket--tl { top: -1px;    left: -1px;  }
.corner-bracket--tr { top: -1px;    right: -1px; transform: scaleX(-1); }
.corner-bracket--bl { bottom: -1px; left: -1px;  transform: scaleY(-1); }
.corner-bracket--br { bottom: -1px; right: -1px; transform: scale(-1);  }
```

Rule: the accent-colored bracket is the only geometric use of the accent color. It does not compete with the accent label or metric — it anchors the composition at a different visual layer.

**Geometry is rectilinear — lines and schematics, not empty squares.**

The micrographic vocabulary is built from straight lines — horizontal, vertical, and 45° diagonal — plus **schematic content** (wireframe globes, lens diagrams, concentric oval moiré, angled tick fields, dimension annotations). Rectilinear does **not** mean filling zones with empty 1:1 square cells or checker grids; those read as UI placeholders, not collage reference.

**Avoid as primary geometry:**
- Empty square cell grids (`repeat(N, 1fr)` boxes with no labels or values)
- Large filled square blocks used only as decoration
- Chunky rectilinear “geo fields” made only of vertical ticks on a diagonal with no schematic subject

**Prefer (match `examples/reference-collage.png`):**
- Wireframe spheres / globes, exploded views, lens cross-sections
- Concentric circles / oval moiré (HUMANOID-style label texture)
- Angled dimension fields with measurement labels
- Stamp rings, linear tick marks, corner brackets

Freeform arcs and curves remain prohibited as *structural* elements. Circles are valid when they carry schematic or seal meaning, not as arbitrary blobs.

The only valid circle forms are:
- **Stamp / circular seal** — a complete closed ring with textPath (see Stamp section). Self-contained, deliberate, never used as a background layer.
- **Perforation holes** — repeating small circles at a boundary to simulate a physical tear strip. Functional metaphor, not schematic decoration.
- **Status dot** — 5px filled circle for active state indicator. Never used at large scale.

Everything else that would be a "curved layer behind the display element" should instead be a **rectilinear field**: an angled `<line>`, a `<rect>` at partial opacity, a diagonal ruled block, or a grid of ticks. Angled lines at 30°–60° carry schematic energy without the organic quality of an arc.

```html
<!-- Instead of an arc behind 287W: angled dimension field -->
<svg class="geo-field" aria-hidden="true" viewBox="0 0 220 120" fill="none">
  <!-- Angled boundary line — structural, not decorative -->
  <line x1="0" y1="120" x2="220" y2="40" stroke="var(--color-border)" stroke-width="1"/>
  <!-- Parallel tick field -->
  <line x1="0" y1="100" x2="220" y2="20"  stroke="var(--color-border)" stroke-width="0.5"/>
  <!-- Zone mark ticks along the angle -->
  <line x1="44" y1="120" x2="44" y2="108" stroke="var(--color-faint)" stroke-width="1"/>
  <line x1="88" y1="120" x2="88" y2="96"  stroke="var(--color-faint)" stroke-width="1"/>
  <line x1="132" y1="108" x2="132" y2="84" stroke="var(--color-faint)" stroke-width="1"/>
</svg>
```

```css
.geo-field {
  position: absolute;
  bottom: 0; right: 0;
  pointer-events: none;
  user-select: none;
}
```

**Dimension lines** — horizontal or vertical measurement annotations with tick marks at both ends and optional mid-point ticks. They annotate scale, range, or proportion:

```html
<div class="dimension-line">
  <div class="dimension-line__body"><span></span></div>
  <span class="dimension-line__label">0 ——— 400W</span>
</div>
```

```css
.dimension-line {
  display: flex;
  align-items: center;
  gap: 6px;
}
.dimension-line__body {
  flex: 1;
  height: 1px;
  background: var(--color-dark);
  position: relative;
}
/* End ticks */
.dimension-line__body::before,
.dimension-line__body::after {
  content: '';
  position: absolute;
  top: -3px;
  width: 1px;
  height: 7px;
  background: var(--color-dark);
}
.dimension-line__body::before { left: 0; }
.dimension-line__body::after  { right: 0; }
/* Mid tick */
.dimension-line__body > span {
  position: absolute;
  top: -3px;
  left: 50%;
  width: 1px;
  height: 7px;
  background: var(--color-dark);
  display: block;
}
.dimension-line__label {
  font-family: 'IBM Plex Mono', monospace;
  font-size: var(--text-micro);
  color: var(--color-dark);
  letter-spacing: 0.05em;
  white-space: nowrap;
}
```

**Geometric separators** — use `◇`, `△`, or `·` between inline `Chip` groups instead of pipes or slashes. They carry visual weight at micro scale without adding semantic meaning:

```html
<span aria-hidden="true" class="geo-sep">◇</span>
<span aria-hidden="true" class="geo-sep">△ 04/05</span>
```

```css
.geo-sep {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 7px;
  color: var(--color-dark);
  user-select: none;
}
```

**Status indicators** — a filled dot with a concentric ring signals a live or active state. Use once per view, paired with an accent `Chip`:

```html
<span class="status-dot" aria-label="Active"></span>
```

```css
.status-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--color-accent);
  display: inline-block;
  position: relative;
  flex-shrink: 0;
}
.status-dot::after {
  content: '';
  position: absolute;
  top: -3px; left: -3px;
  width: 11px; height: 11px;
  border: 1px solid var(--color-accent);
  border-radius: 50%;
  opacity: 0.4;
}
```

---

## View compositions

A micrographic **view** is a composed layout of components inside a `SpecCard` (or full-screen panel) — a technical drawing with data in it, not a decorated generic card.

**Geometry-first** — before placing components, establish the scaffold: dimension lines, schematic field, corner brackets. Then slot `DisplayHero`, `DataPanel`, `TexturePanel`, etc. into that grid. Never bolt SVG decoration onto a finished flex stack.

**Typical composition** — pick components to match the view; not every item is required every time:

| Component | Purpose |
|-----------|---------|
| `MetaStrip` | REF / category / version (micro, top) |
| `SubjectRow` | Primary ID + status dot |
| `DisplayHero` | One display-scale number or title |
| `DataPanel` | Metrics table or key-value grid (micro) |
| `ChipRow` | Status / category chips + geo separators |
| `TexturePanel` | Dot matrix, serial strip, repeated micro-text |
| `AnnotationRow` | Dimension brackets + spec string (`aria-hidden`) |
| `MetaBar` | Secondary IDs, timestamps (micro, bottom) |
| `IdStrip` | Barcode / QR when the entity is scannable |

**Layout rules:**
- **One `DisplayHero` per view** — single dominant element at display scale; everything else micro
- **Asymmetric splits** — e.g. 160px + 360px columns beat equal 50/50
- **`DisplayHero` tallest** — texture rows 16–24px; `MetaStrip` / `MetaBar` minimal height
- **`TexturePanel` placement** — full-height side column beside `DisplayHero` often beats a bottom strip
- **Partial-span rules** — `AnnotationRow` or dimension line stopping at a column edge reads more schematic

**Compositional variation** — avoid eight equal-height horizontal bands. Vary column width, row height, and which edge carries the cut signal (`cut-edge`).

**The Annotated Schematic** — A horizontal annotation band placed between content zones: circle markers connected by dimension lines, with spec text running between them. This is a technical drawing cross-section, not a decorative divider. Use it instead of a plain 1px rule when the boundary needs to carry meaning.

**FormView** — customs-form / manifest layout: `DataPanel` with label column + value column, hairline row rules, alternating row tint. Optional `IdStrip` at bottom. Bureaucratic, system-generated tone.

**TicketView** — horizontal split panel: 2–3 regions with distinct background (one signal color max). `Perforation` only on the split between regions. `IdStrip` at one end.

**PosterView** — word-dominant side panel (`INDEX`, product name). **Display Mode B**. Compose: `MetaStrip` → `DisplayHero` (≥64px per line, see Display fit) → `ChipRow` → optional `SchematicPanel` (30–40% width, wireframe line art) → `DataPanel` TOC at micro scale. Accent on one chip or one word max.

**GalleryView** — grid of 2–4 mini `SpecCard`s (archival strip). Warm paper, one signal band per row max. Photocopy grain optional.

**SchematicPanel** — bounded component (30–50% width), 1px border, inline SVG wireframe (globe, lens, exploded view). Strokes only; pair with `DimensionLine`. Category label: micro field code (`SCHEMATIC · FIG.02`).

```html
<div class="annotation-row" aria-hidden="true">
  <div class="anno-bracket"></div>
  <div class="anno-circle"></div>
  <div class="anno-bracket"></div>
  <span class="anno-text">148mm × 74mm · ISO/SPORT-A4 · 72dpi · GRID: 4px · LAYER: 03/06</span>
  <div class="anno-circle"></div>
  <div class="anno-bracket"></div>
</div>
```

```css
.annotation-row {
  display: flex;
  align-items: center;
  padding: 5px 14px;
  gap: 8px;
  overflow: hidden;
  border-bottom: var(--border-dark);
}
.anno-circle {
  width: 8px;
  height: 8px;
  border: 1px solid var(--color-dark);
  border-radius: 50%;
  flex-shrink: 0;
  position: relative;
}
.anno-circle::after {
  content: '';
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 2px; height: 2px;
  background: var(--color-mid);
  border-radius: 50%;
}
.anno-bracket {
  width: 20px;
  height: 1px;
  background: var(--color-dark);
  position: relative;
  flex-shrink: 0;
}
.anno-bracket::before,
.anno-bracket::after {
  content: '';
  position: absolute;
  top: -3px;
  width: 1px;
  height: 7px;
  background: var(--color-dark);
}
.anno-bracket::before { left: 0; }
.anno-bracket::after  { right: 0; }
.anno-text {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 7px;
  color: var(--color-mid);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
```

---

## Do / Don't

**Do:**
- Pack information tightly — density is intentional, not accidental
- Use ALL CAPS + letter-spacing for labels, categories, and headings
- Add reference codes, serial numbers, and spec annotations as texture
- Create visual rhythm through repeating small elements
- Let hairline borders and rules do the structural work
- Use the single accent color sparingly — max three uses per view (active chip + key metric + top-left bracket)
- Use monospaced fonts for numbers, codes, and data
- Make components feel like they contain more information than is immediately visible
- Design geometry first — rectilinear schematic fields, brackets, and dimension lines define the layout; content annotates within it
- Signal the physical cut on at least one edge — dashed border, perforation strip, or bleed margin
- Fill passive regions with `TexturePanel` (dot matrix in side columns, serial strip, repeated micro-text) — not empty space
- Separate stacked components with solid `border-top` or `AnnotationRow` — not dot-matrix horizontal rules
- Give `DisplayHero` a dedicated zone (`display-hero` box + poster column ≥38% of card or `--col-poster-min` ≥268px for 7-char lines); use `--display-chars` + char-fit `clamp`, ≥64px, so stacked titles never cross borders
- Keep `MetaStrip` at fixed height with ellipsis — header row stays inside its band
- Choose display mode by format: Mode A (light) for spec/numeric cards; Mode B (heavy) for poster/index panels
- Default accent to orange (`#FF8C00`) in dark mode or red (`#CC2200`) in light mode unless HUD/screen context

**Don't:**
- Use border-radius larger than 2px
- Add drop shadows or blur effects
- Use gradients (except background texture patterns — those are structure, not decoration)
- Use more than one accent color
- Use soft, rounded, friendly typefaces (no "Rounded" variants)
- Use pastel or warm tones in the base palette
- Let components breathe too much — the aesthetic demands compression
- Treat decorative spec elements as content — always `aria-hidden`
- Use mid-scale type (12–20px) for labels, headings, or body text — there are only two scales: display (80px+) and micro (7–11px). Mid-scale makes it feel like UI.
- Shrink poster display into 40–55px to fit a narrow column — use char-fit `clamp` (min 64px), stack lines, or widen the column; never clip with `overflow: hidden` on `DisplayHero`
- Let display or `MetaStrip` text bleed past hairline borders — widen the zone, ellipsize the header, or split display lines
- Use `clamp(4rem, 36cqw, 5rem)` without `--display-chars` on narrow poster columns — the 4rem floor overflows 7-character lines
- Use empty square cell grids or checker blocks as decoration — use schematics, serial strips, or micro columns instead
- Use dot-matrix or perforation as a divider between arbitrary view sections — reserve perforation for `TicketView` splits only
- Use freeform arcs or curves as geometric elements — all geometry is rectilinear (horizontal, vertical, 45° diagonal). Circles exist for schematics/seals, perforation holes, and 5px status dots — not as empty square grids.
- Place a barcode or QR as a structural column or space-fill — `IdStrip` / `ScanPanel` only, when the entity is scannable
- Default to blue accent on physical-label outputs — collage default is orange (dark) or red (light)
- Use Display Mode A (light 300) for word-dominant poster/index titles — use Mode B (heavy 700–900) instead
- Skip the micro-geometry layer — registration marks, tick marks, grid coordinates, and dimension annotations are mandatory, not optional decoration
- Make all four component edges identical plain borders — one edge should signal the physical object boundary

---

## Accessibility

Dense design creates real accessibility challenges. Address them deliberately:

- Maintain WCAG AA contrast even at small sizes — use `--color-ink` (#1A1A1A) not `--color-mid` for any readable body text
- Text at `--text-micro` (8px) should be **decorative only** — never put critical content at this size
- Interactive elements need minimum 32px touch/click targets regardless of visual size
- Visible focus states are essential: `outline: 2px solid var(--color-accent); outline-offset: 2px`
- Don't rely on color alone for state — pair color changes with border or text label changes
- All decorative spec annotations: `aria-hidden="true"`

---

## Starting Checklist

When beginning a micrographic view, work through this in order:

1. **North star** — `examples/reference-collage.png`; pick a composition: `SpecCard`, `PosterView`, `FormView`, `TicketView`, `GalleryView`
2. Import Barlow Condensed (300 + 700/800) + IBM Plex Mono
3. CSS tokens — palette, type scale (micro + display only), spacing, borders. Accent: `#FF8C00` dark / `#CC2200` light
4. **Display mode** — A (light numeric) or B (heavy word title); one `DisplayHero` only
5. **Geometry scaffold** — corner brackets, schematic field, dimension lines; then place components
6. `SpecCard` shell + `border: var(--border-dark)`; one `cut-edge` on the shell
7. Field labels + `ChipRow` — micro uppercase, ALL CAPS, tracked
8. Accent ×3: active chip, key metric, top-left bracket
9. Passive areas → `TexturePanel` (serial strip, dot column, repeated micro-text)
10. SVG layer + `SchematicPanel` if needed; micro-geometry (3 reg marks, 1 dim bracket, 1 grid coord)
11. Optional photocopy grain — one per view
12. `IdStrip` with barcode/QR only when the UI entity is scannable
13. `font-variant-numeric: tabular-nums` on numeric data
14. **Containment audit** — `MetaStrip` fixed height, no spill; `DisplayHero` `--display-chars` set, no glyph past column border; card shell not clipping display; segmented `ChipRow` last chip has intact right border inside shell padding
15. **Scale audit** — no 12–20px; `DisplayHero` ≥64px, not clipped
16. **Geometry audit** — schematics / dimension lines; no empty square cell grids
17. **Collage test** — thumbnail reads industrial; zoomed in, every line parseable
