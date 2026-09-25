---
version: alpha
name: Micrographic
description: >-
  Dense, schematic UI in the language of industrial labels, hardware spec
  sheets and Swiss grids. Compression, not minimalism: two type scales
  (display 80px+ vs micro 7–11px), hairline grids, near-monochrome ink on
  warm label paper, one signal accent spent exactly three times per view.
colors:
  primary: "{colors.ink}"
  secondary: "{colors.mid}"
  tertiary: "{colors.accent}"
  neutral: "{colors.bg}"
  bg: "#F4F2EE"
  ink: "#0A0A0A"
  dark: "#1A1A1A"
  mid: "#888888"
  muted: "#AAAAAA"
  faint: "#BBBBBB"
  border: "#C8C4BE"
  hatch: "#E4E0DA"
  accent: "#CC2200"
  white: "#FAFAFA"
typography:
  display-spec:
    fontFamily: Barlow Condensed
    fontSize: 80px
    fontWeight: 300
    lineHeight: 1
    letterSpacing: -0.02em
    fontFeature: '"tnum" 1'
  display-spec-lg:
    fontFamily: Barlow Condensed
    fontSize: 96px
    fontWeight: 300
    lineHeight: 1
    letterSpacing: -0.02em
    fontFeature: '"tnum" 1'
  display-spec-xl:
    fontFamily: Barlow Condensed
    fontSize: 120px
    fontWeight: 300
    lineHeight: 1
    letterSpacing: -0.02em
    fontFeature: '"tnum" 1'
  display-poster:
    fontFamily: Barlow Condensed
    fontSize: 80px
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: 0.02em
  label-micro:
    fontFamily: Barlow Condensed
    fontSize: 7px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: 0.12em
  label-xs:
    fontFamily: Barlow Condensed
    fontSize: 8px
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: 0.12em
  label-sm:
    fontFamily: Barlow Condensed
    fontSize: 10px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: 0.12em
  data-micro:
    fontFamily: IBM Plex Mono
    fontSize: 7px
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: 0.08em
  data-xs:
    fontFamily: IBM Plex Mono
    fontSize: 8px
    fontWeight: 400
    lineHeight: 1.3
    fontFeature: '"tnum" 1'
  data-sm:
    fontFamily: IBM Plex Mono
    fontSize: 10px
    fontWeight: 400
    lineHeight: 1.3
    fontFeature: '"tnum" 1'
  data-md:
    fontFamily: IBM Plex Mono
    fontSize: 11px
    fontWeight: 500
    lineHeight: 1.2
    fontFeature: '"tnum" 1'
rounded:
  none: 0px
  sm: 2px
  full: 9999px
spacing:
  "1": 4px
  "2": 8px
  "3": 12px
  "4": 16px
  "6": 24px
  "8": 32px
  "12": 48px
  "16": 64px
  card-width: 560px
  col-poster-min: 268px
components:
  spec-card:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "{spacing.3}"
    width: "{spacing.card-width}"
  meta-strip:
    typography: "{typography.label-xs}"
    padding: 0 10px
    height: 28px
  meta-bar:
    textColor: "{colors.faint}"
    typography: "{typography.data-micro}"
    padding: 8px 12px
  display-hero:
    textColor: "{colors.ink}"
    typography: "{typography.display-spec}"
    padding: 12px 10px 16px
  display-hero-poster:
    textColor: "{colors.ink}"
    typography: "{typography.display-poster}"
    padding: 12px 10px 16px
  chip:
    textColor: "{colors.mid}"
    typography: "{typography.label-xs}"
    rounded: "{rounded.none}"
    padding: 2px 6px
  chip-active:
    textColor: "{colors.accent}"
  chip-filled:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
  button:
    textColor: "{colors.ink}"
    typography: "{typography.label-xs}"
    rounded: "{rounded.none}"
    padding: 8px 16px
    height: 32px
  button-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
    typography: "{typography.label-xs}"
    rounded: "{rounded.none}"
    padding: 8px 16px
    height: 32px
  button-accent:
    textColor: "{colors.accent}"
    typography: "{typography.label-xs}"
    rounded: "{rounded.none}"
    padding: 8px 16px
    height: 32px
  button-accent-hover:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.white}"
  nav-item:
    textColor: "{colors.mid}"
    typography: "{typography.label-xs}"
    padding: 8px 16px
  nav-item-active:
    textColor: "{colors.accent}"
  field-label:
    textColor: "{colors.mid}"
    typography: "{typography.label-micro}"
  field-input:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    typography: "{typography.data-sm}"
    rounded: "{rounded.none}"
    padding: "{spacing.2}"
  data-table-header:
    textColor: "{colors.muted}"
    typography: "{typography.label-micro}"
    padding: 4px 8px
  data-table-cell:
    textColor: "{colors.ink}"
    typography: "{typography.data-xs}"
    padding: "{spacing.2}"
  metric-value:
    textColor: "{colors.ink}"
    typography: "{typography.data-md}"
  spec-annotation:
    textColor: "{colors.faint}"
    typography: "{typography.data-micro}"
  dimension-label:
    textColor: "{colors.muted}"
    typography: "{typography.data-micro}"
  hairline:
    backgroundColor: "{colors.border}"
    height: 1px
  hairline-dark:
    backgroundColor: "{colors.dark}"
    height: 1px
  hatch-stripe:
    backgroundColor: "{colors.hatch}"
    width: 1px
  status-dot:
    backgroundColor: "{colors.accent}"
    rounded: "{rounded.full}"
    size: 5px
---

# Micrographic

<!-- Source of truth: SKILL.md in github.com/albegosu/micrographic-skill. Tokens are checked against it by `npm run check:design`. -->

## Overview

Micrographic is an industrial information collage compressed onto a screen: care tags, shipping labels, customs forms, spec plates, box dielines and regulatory marks, all sharing one visual logic on a neutral ground. It **compresses; it does not minimalize.** Minimalism removes. Micrographic packs the maximum information into the minimum space, at the minimum legible size, locked to a visible grid.

- **Ordered chaos.** Dense, but grid-locked. It should feel archival and accumulated, never randomly cluttered.
- **Metadata is the ornament.** REF codes, SKUs, serials, dimensions, version strings and CE marks are texture *and* information.
- **Texture at distance, data up close.** Zoomed out: gray zones, grid rhythm, one signal band. Zoomed in: every line parseable.
- **Function over decoration.** It reads like documentation, packaging or equipment marking, not a marketing layout.

The deliverable is interface code: components and views (`SpecCard`, `DisplayHero`, `DataPanel`, `ChipRow`, `MetaStrip`), not printable documents. The feel is professional equipment, a scientific instrument, a fashion brand's inner label. It is **not** a SaaS card with comfortable 14–16px body text, not friendly or rounded, not pastel, not a generic hero section. If a screen would not belong on a wall of labels next to a FRAGILE sticker and a spec plate, it is not micrographic.

## Colors

Near-monochrome. The constraint is the aesthetic. Tokens describe **light mode**, the physical-label reading (most real care tags and serial plates are printed on white or cream stock). Dark mode is the screen/HUD reading and swaps the values below.

| Token | Light (default) | Dark / HUD | Job |
|---|---|---|---|
| `bg` | `#F4F2EE` | `#0A0A0A` | Ground. Warm label paper in light mode, never pure `#FFFFFF`. |
| `ink` | `#0A0A0A` | `#1A1A1A` | Light: display, primary text, filled chips. Dark: hatching only. |
| `dark` | `#1A1A1A` | `#2A2A2A` | Strong label text, component boundaries, rules. Dark: borders and brackets. |
| `mid` | `#888888` | `#555555` | Field labels, inactive chip and nav text. |
| `muted` | `#AAAAAA` | `#888888` | Dimension labels, unit suffixes, table headers. |
| `faint` | `#BBBBBB` | `#3A3A3A` | REF/SKU codes, serial strips, MetaBar, registration marks. |
| `border` | `#C8C4BE` | — | Every hairline zone border, bracket and separator. |
| `hatch` | `#E4E0DA` | — | Diagonal hatching stripes in passive zones. |
| `white` | — | `#FAFAFA` | Text on ink or accent fills, input wells. Dark: display and primary text. |
| `accent` | `#CC2200` | `#FF8C00` | The single signal: signal red (light) or safety orange (dark). |

Roles for generic tooling: `primary` = ink, `secondary` = mid, `tertiary` = accent, `neutral` = paper.

**The accent is spent exactly three times per view:** one active chip, one key metric, and the top-left corner bracket. A fourth use turns a signal into a color scheme. Swap the accent only when the subject calls for it, and never run two at once: `#0033FF` electric blue for HUD / sport-tech screens (never the default for label-like output), `#00CC66` terminal green for approved or biosensor data, `#C8A96E` warm gold for archival or museum pieces.

**Multi-zone color** is allowed when every color carries a function: a solid PRIORITY band, a colored stamp on a neutral ground, sticker-style blocks. Red = warning/priority, yellow = caution, green = approved, black = classification. Color is always a system signal, never decoration.

**Contrast.** `ink` on paper is 17.7:1 and `accent` on paper 4.95:1. `mid` (3.2:1), `muted` (2.1:1) and `faint` (1.7:1) sit below WCAG AA on purpose: they carry tracked uppercase labels that repeat nearby information and `aria-hidden` texture. Anything a user must read goes in `ink` or `dark`.

## Typography

Typography is the soul of the system. **Two scales only, nothing in between.**

- **Display, 80–120px:** one number, name or word per component. Nothing else at this scale.
- **Micro, 7–11px:** everything else: field labels, values, chips, meta rows, annotations.
- **Forbidden zone, 12–20px:** comfortable reading sizes, section headings and subheadings are where generic UI lives. Collapse them: promote to display or demote to micro.

**Faces.** **Barlow Condensed** carries display and labels; **IBM Plex Mono** carries data, codes and annotations. Condensed cuts are essential: regular-width faces lose the schematic feel. Alternates: Barlow Semi Condensed, IBM Plex Sans Condensed, Roboto Condensed; DM Mono or JetBrains Mono. Fallback: `ui-sans-serif, system-ui, sans-serif`. Never a "Rounded" variant.

**Display modes: choose by format.**

- **Mode A, Spec (`display-spec`, weight 300):** numeric dominance on spec cards, athlete IDs, serial plates (`287W`, `HX-4420`). Tabular numerals, tight tracking. `-lg` (96px) and `-xl` (120px) scale the same cut.
- **Mode B, Poster (`display-poster`, weight 800, uppercase):** word-dominant poster and index panels (`INDEX`, a product name), set as stacked lines. Fit the type to the column: size between **64px and 80px** so the longest line fits (`longest line chars × 0.58 × font size ≤ inner column width`). Never shrink it into 40–55px, never clip it, never let a glyph cross a border. If 64px does not fit, widen the column or split the word across more lines.

**Micro rules.** Labels (`label-*`) are ALL CAPS, tracked `0.08em`–`0.15em`, weight 600–700. Values (`data-*`) are IBM Plex Mono at 400–500 with tabular numerals wherever numbers appear. Line height is tight on both scales: 0.95–1.1 on display, 1.2–1.4 on micro. `*-micro` (7px) is decorative only, never critical content. `data-md` (11px) is the ceiling of micro: a single metric value in a grid, surrounded by 7px labels.

## Layout

A **4px micro-grid**. Spacing tokens `1`–`16` map to 4–64px (the same steps as Tailwind's default scale). Components use very tight internal padding (4–8px) against deliberately larger gaps between zones: compression followed by space is the rhythm.

- **One density knob.** `card-width` (560px) sets the card. The poster column (display zone) is 38% of it, floored at `col-poster-min` (268px) when the longest display line has seven or more characters. Size the box before the type.
- **Asymmetric splits.** 160px + 360px beats 50/50. One `DisplayHero` per view, and it is the tallest zone. Texture rows are 16–24px; `MetaStrip` and `MetaBar` stay minimal.
- **Every bordered region is a hard boundary.** `MetaStrip` is a fixed 28px band that ellipsizes and never wraps. No glyph, chip or mark crosses its parent's border. `overflow: hidden` belongs only on the outer shell, never on the display zone.
- **Geometry first.** Establish the scaffold (corner brackets, dimension lines, schematic field), then slot components into it. Never bolt decoration onto a finished flex stack.
- **No empty regions.** Passive areas get a `TexturePanel` (dot matrix column, serial strip, repeated micro-text). Vary column widths and row heights; eight equal horizontal bands is a failure.

## Elevation & Depth

Flat. No drop shadows, no blur, no glass, no gradients. Hierarchy comes from line weight, texture and scale.

- **Hairlines are the skeleton.** `border` (1px `#C8C4BE`) frames every zone, divides sections and crosses into table grids; `border-dark` (1px `dark`) frames the component shell.
- **Texture zones, one per component, never in the accent.** Dot matrix (1px dots on a 5px grid) as a full side panel, 100px or wider. Diagonal hatching (1px stripe every 4px at −45°) for passive zones. Repeated real metadata at 7px mono as a text block: gray at a distance, legible up close.
- **Archival photocopy grain.** Optional fractal-noise overlay at 6% opacity with `multiply`, once per view. Grain replaces gloss.
- **The label boundary.** One edge signals the physical cut: a dashed border, a 4–6px bleed margin of dots or hatching, or perforation on a ticket split. Four identical edges read as a UI box.

## Shapes

Rectilinear and sharp. Radius `none` (0) by default, `sm` (2px) as the maximum. Geometry is horizontal, vertical and 45° lines, plus schematic subjects: wireframe globes, lens cross-sections, concentric moiré, angled dimension fields.

Circles appear only when they mean something: a stamp or seal ring with text on its path, perforation holes on a ticket split, and the 5px status dot (the only use of `rounded.full`). No freeform arcs, no blobs, no empty square cell grids or checkerboards.

**The micro-geometry layer is mandatory** (`aria-hidden`, `pointer-events: none`): at least three `+` registration marks at zone corners and intersections, one dimension annotation bracketing the display element, one grid coordinate (`A1`, `B3`), and one intersection tick where borders cross. Corner brackets are 14px L-shapes in 1.5px strokes: top-left in the accent, the other three in `dark`.

## Components

Compose views from these primitives. Name them as components, not document landmarks: `MetaStrip`, not `<header>`.

- **SpecCard** (`spec-card`): the panel shell with three slots. `MetaStrip` on top (category chip, entity title, REF/version), `CardBody` (display, tables, splits; 12px padding), `MetaBar` at the bottom (secondary IDs, timestamps; never left empty on a finished card). Shell: `border-dark`, one cut edge.
- **MetaStrip** (`meta-strip`): fixed 28px band, `overflow: hidden`. The title and REF block ellipsize; chips on the left never shrink. Shorten data, not the font.
- **DisplayHero** (`display-hero`, `display-hero-poster`): the single display-scale element in its own zone, with no `overflow: hidden`. A schematic behind it sits on a sibling layer.
- **Chip** (`chip`, `chip-active`, `chip-filled`): 8px caps in a 1px `border` box, `2px 6px` padding. Active = accent text and accent border. A `ChipRow` holds four to six chips, segmented so neighbors share one hairline, with `◇ △ ·` as separators instead of pipes. The last chip keeps its right border.
- **Button** (`button`, `button-primary`, `button-accent`): a flat control on equipment. Transparent, 1px `border-dark`, radius 0, 32px minimum target. Hover inverts to ink and white in 80ms: snappy, not smooth.
- **Navigation** (`nav-item`, `nav-item-active`): a filing system. Cells split by hairlines, category codes as labels; active = accent text with a 2px inset underline.
- **DataPanel** (`data-table-header`, `data-table-cell`, `metric-value`): every row a data entry, every column a spec field. Header 7px caps over a `border-dark` rule; mono cells with hairline row rules; one 11px metric value per cell.
- **Field** (`field-label`, `field-input`): filling in a technical document. 7px caps label, mono input on white, `border-dark`, focus turns the border to the accent.
- **Annotations** (`spec-annotation`, `dimension-label`): `REF-4821-A · SKU/0042 · REV.03`, `148mm × 210mm`, serial strips (`0000 0001 0002 …`) running past the visible edge. Dimension lines carry end and mid ticks.
- **Rules and texture** (`hairline`, `hairline-dark`, `hatch-stripe`): the structural atoms. Separate stacked components with a solid rule or an `AnnotationRow` (circle markers joined by dimension lines with spec text between), never a dot-matrix divider.
- **Status dot** (`status-dot`): 5px accent dot with an 11px ring at 40%. Once per view, paired with the active chip.
- **IdStrip**: a barcode (28–44px tall, 1–2px bars in groups, 7px mono number below) or a 44px QR, only when the entity is scannable. Never both, never as structural fill.

View compositions: **SpecCard**; **PosterView** (Mode B display, `ChipRow`, optional schematic panel, micro table of contents); **FormView** (label/value manifest, hairline rows); **TicketView** (two or three regions, perforation only on the split); **GalleryView** (two to four mini cards, one signal band per row).

## Do's and Don'ts

**Do**

- Pack information tightly. Density is intentional, and a component should feel like it holds more than is immediately visible.
- Set labels, categories and headings in ALL CAPS with tracking.
- Use reference codes, serials and dimensions as texture, and mark them `aria-hidden`.
- Let hairline borders and rules do the structural work.
- Spend the accent exactly three times: active chip, key metric, top-left bracket.
- Use IBM Plex Mono and tabular numerals for numbers, codes and data.
- Design the geometry first; content annotates within it.
- Signal the physical cut on at least one edge.
- Fill passive regions with texture, not empty space.
- Keep readable content at AA contrast (`ink` / `dark`), 32px minimum targets, a visible focus ring (`2px solid` accent, `2px` offset), and never rely on color alone for state.

**Don't**

- Use a border radius above 2px, drop shadows, blur, or gradients (texture patterns are structure, not decoration).
- Use more than one accent, or default to blue on label-like output.
- Use rounded or friendly typefaces, pastel base tones, or pure `#FFFFFF` paper.
- Use mid-scale type (12–20px) for anything, or shrink poster display into 40–55px to fit a narrow column.
- Let display or `MetaStrip` text bleed past a hairline border, or crop it with `overflow: hidden`.
- Decorate with empty square grids, checker blocks or freeform arcs.
- Use barcodes or QR codes as fill, perforation outside a ticket split, or dot matrix as a divider.
- Let components breathe. The aesthetic demands compression.
