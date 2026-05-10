---
name: micrographic
description: Use this skill to build UI components, web pages, dashboards, or design systems with a micrographic aesthetic — dense, technical, schematic design inspired by industrial labels, hardware spec sheets, and Swiss modernist typography. Trigger when users mention "micrographic", "micro-graphics", "dense information UI", "schematic interface", "spec sheet style", "industrial aesthetic", "technical grid", "Maison Margiela style", "Virgil Abloh / Off-White aesthetic", "blueprint UI", or when they want UI that feels layered, precise, and data-rich. Also trigger for "technical", "engineering", "dense", or "compressed" visual design, or when the UI should feel like professional equipment, a scientific instrument, or a fashion brand's inner label. Use proactively whenever the design direction is monochromatic, typographically intense, and information-dense.
---

# Micrographic Design System

Micrographic design builds UI that operates at two scales simultaneously: visual texture from a distance, readable information up close. It draws from industrial product labeling, hardware spec sheets, care instruction tags, and Swiss modernist typography. Think Maison Margiela's inner labels, Virgil Abloh's Off-White graphics, Wim Crouwel's grid systems — translated into a digital UI language.

The core appeal is **compression**: every pixel carries intent. Dense grids of tiny type, hairline borders, schematic annotations, and compact iconography combine into interfaces that feel technical, precise, and strangely beautiful. Information that would normally be hidden (metadata, specs, references, version numbers) becomes decoration.

This is not minimalism. Minimalism removes. Micrographic *compresses*. The density should feel earned, not cluttered — every element has a specific job.

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

**Type scale — use extreme contrast between levels:**
```css
:root {
  --text-micro: 8px;   /* decorative annotations, watermarks — never critical content */
  --text-xs:   10px;   /* meta labels, secondary data, tags */
  --text-sm:   11px;   /* body text, descriptions, table rows */
  --text-base: 13px;   /* primary readable content */
  --text-md:   15px;   /* component headings */
  --text-lg:   20px;   /* section titles */
  --text-xl:   32px;   /* display numerals, counters */
  --text-2xl:  56px;   /* hero numbers, large stats */
  --text-3xl:  80px;   /* hero display, decorative type */
}
```

**Rules:**
- Uppercase labels: letter-spacing `0.08em`–`0.15em` — this is what makes tiny text read as designed
- Most category labels, tags, headings in ALL CAPS or tracked small caps
- Line height: tight on display (`1.0`–`1.1`), normal on body (`1.4`–`1.6`)
- Font weight: 300 light condensed for large display; 500–600 for labels; 400 for body
- Numbers: always `font-variant-numeric: tabular-nums` in data contexts

---

## Color

Near-monochromatic palette. The constraint is the aesthetic.

```css
:root {
  --color-black:   #0A0A0A;
  --color-ink:     #1A1A1A;
  --color-dark:    #2A2A2A;
  --color-mid:     #555555;
  --color-muted:   #888888;
  --color-faint:   #BBBBBB;
  --color-border:  #D4D4D4;
  --color-surface: #F2F2F2;
  --color-white:   #FAFAFA;

  /* Choose ONE accent per project — use it sparingly */
  --color-accent:  #0033FF;  /* electric blue: technical / industrial */
  /* OR */
  --color-accent:  #FF2D00;  /* signal red: label / warning aesthetic */
  /* OR */
  --color-accent:  #00CC66;  /* terminal green: data / monitor aesthetic */
  /* OR */
  --color-accent:  #C8A96E;  /* warm gold: premium industrial */
}
```

The accent color appears only on: active states, one key metric per component, a single highlight. Everything else is grayscale. If you use the accent color in three places on the same screen, you've used it too much.

**Dark mode:** Invert the surface and ink values — the aesthetic holds perfectly with near-black backgrounds and near-white text.

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

---

## Core Components

### Labels & Tags

The atomic unit of micrographic design. Labels should look like they belong on a product.

```css
.label {
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

.label--active {
  color: var(--color-accent);
  border-color: var(--color-accent);
}

.label--filled {
  background: var(--color-ink);
  color: var(--color-white);
  border-color: var(--color-ink);
}
```

Stack labels. Repeat them. A micrographic component can carry 4–6 labels simultaneously and it reads as designed, not cluttered — because each has a distinct meaning.

### Cards & Panels

Cards are spec sheets. They have a header zone (label + identifier), a data zone, and an annotation footer.

```css
.card {
  border: var(--border-dark);
  background: var(--color-white);
}

.card-header {
  padding: var(--space-2) var(--space-3);
  border-bottom: var(--border);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-2);
}

.card-body {
  padding: var(--space-3);
}

.card-footer {
  padding: var(--space-2) var(--space-3);
  border-top: var(--border);
  font-family: 'IBM Plex Mono', monospace;
  font-size: var(--text-micro);
  color: var(--color-faint);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
```

The footer zone is critical — fill it with reference codes, timestamps, spec identifiers, version numbers. These details make the component feel like it contains more information than is immediately readable.

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

---

## Layout Patterns

**The Spec Sheet** — Divide the page into labeled zones with hairline borders. Each zone has a category code in the top-left corner. Information within zones is tightly packed. This is the most native micrographic layout.

**The Dense Grid** — CSS grid with very tight gaps (`4px`–`8px`), each cell a data point. Numbers dominate. Ideal for dashboards and status boards.

**The Strip** — Horizontal bands of information, each separated by a 1px rule, alternating between display-size and micro-size type. The scale contrast creates rhythm.

**The Overlay** — Large display typography (50px+) with micro-text annotations layered over or around it, labeling and describing the large text. Creates depth without gradients or blur.

---

## Do / Don't

**Do:**
- Pack information tightly — density is intentional, not accidental
- Use ALL CAPS + letter-spacing for labels, categories, and headings
- Add reference codes, serial numbers, and spec annotations as texture
- Create visual rhythm through repeating small elements
- Let hairline borders and rules do the structural work
- Use the single accent color sparingly — one strong hit per screen
- Use monospaced fonts for numbers, codes, and data
- Make components feel like they contain more information than is immediately visible

**Don't:**
- Use border-radius larger than 2px
- Add drop shadows or blur effects
- Use gradients (except very subtle single-axis texture — rare exceptions)
- Use more than one accent color
- Use soft, rounded, friendly typefaces (no "Rounded" variants)
- Use pastel or warm tones in the base palette
- Let components breathe too much — the aesthetic demands compression
- Treat decorative spec elements as content — always `aria-hidden`

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

When beginning a micrographic UI, work through this in order:

1. Import condensed typeface (Barlow Condensed) + mono (IBM Plex Mono)
2. Set the CSS custom properties — palette, type scale, spacing, borders
3. Apply `border: var(--border-dark)` to every component boundary
4. Label every section and component with a micro uppercase category tag
5. Choose one accent color and identify the one place per screen it will appear
6. Add at least one layer of spec annotations (ref codes, serial numbers, coordinates)
7. Use `font-variant-numeric: tabular-nums` on all numeric data
8. Step back: does it read as texture at zoom-out and as information at zoom-in? That's the test.
