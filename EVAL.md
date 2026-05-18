# Micrographic Skill — Evaluation Reference

Use the **generation prompt** below with `/micrographic` to evaluate any version of the skill.

---

## Version testing workflow

1. Check out the skill file for the release under test:
   ```bash
   git show v1.0.1:SKILL.md > SKILL.md
   # or: npx micrographic-skill --cursor   # installs package SKILL.md into agent path
   ```
2. Copy the **generation prompt** below; set `[X.X.X]` to the skill version (e.g. `1.1.0`).
3. Invoke with `/micrographic` (or your agent’s skill trigger).
4. Open the HTML in a browser → screenshot → save as `examples/v{X.X.X}-micrographic-skill.png` (and optionally commit `examples/v{X.X.X}-micrographic-skill.html`).

**North star (v1.1.0+):** `examples/v1.1.0-micrographic-skill.png` — PosterView / PKG-card plate with geometry scaffold, panel zone labels, and live token load from `SKILL.md` + `EVAL.md`.

---

## Version

```
Skill:   micrographic-skill
Author:  Alberto González <alberto@resiz.es>
```

*Update `[X.X.X]` in the generation prompt footer when testing a new release.*

---

## Generation prompts

> Copy and paste into your agent, then invoke with `/micrographic`.

### Prompt A — v1.0.x (legacy spec card)

````
/micrographic — LinkedIn-ready light-mode npm package spec card for micrographic-skill: ref band REF / MIC - SKL - 0 0 1 · REV . A · 2026 · OPEN SOURCE; left poster display MICROGRAPHIC + SKILL · npm + blue HUD tagline; right dense manifest table (package metadata + CURSOR/CLAUDE/CODEX compatibility rows + token counts); serial strip S/N 00–39; footer npx micrographic-skill.
````

### Prompt B — v1.1.0+ (PosterView / PKG card) **default**

````
/micrographic — LinkedIn export (560×420) light-mode PKG card for micrographic-skill v[X.X.X]. Geometry-first PosterView: crop marks, registration +, dimension strings (196mm×148mm, 560×420), panel zone labels (PKG CARD · P01-REF · A01-POSTER · POSTER/INDEX). Meta strip: PKG CARD chip · MICROGRAPHIC-SKILL@[X.X.X] with blue status dot · date · REGISTRY · REF/MIC-SKL-001 · REV.A. Left: Mode B stacked display MICRO/GRAPHIC/SKILL (≥64px clamp, no clip) · chips NPM/MIT/ESM · blue-outlined HUD box “DENSE · TECHNICAL · SCHEMATIC UI FOR AI AGENTS”. Right manifest: package table (name, version, license, node, module, author, registry path) · agents block (CURSOR skills+rules .cursor/, CLAUDE .claude/, CODEX .codex/) with filled status squares · TOKEN LOAD (EST.) rows for SKILL.md + EVAL.md line/token counts + bundle total (read files, don’t invent). Vertical S/N 00–39 on right margin. Footer chips PUBLISHED · OPEN SOURCE · AGENT SKILL · DESIGN SYSTEM · terminal bar “$ npx micrographic-skill” · annotation row github.com/albegosu/micrographic-skill · 72DPI · GRID 4PX. Accent #0033FF (HUD); warm paper #F4F2EE; scale brutalism only.
````

---

## Changelog

```
1.1.0  —           SKILL v1.1: collage north star, PosterView/PKG card, component vocabulary; EVAL prompt B; header build pipeline.
1.0.1  —           LICENSE fix; npm registry alignment. Prompt A spec card.
1.0.0  —           Initial release.
```
