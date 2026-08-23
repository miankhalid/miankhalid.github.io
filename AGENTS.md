# AGENTS.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project at a glance
- Personal portfolio site, live at https://miankhalid.github.io/
- Plain static site: HTML + CSS + vanilla JS. No bundler, no framework, no build step, no package.json.
- Host: GitHub Pages. Repo MUST stay named `miankhalid.github.io` (root user site) if ever renamed/forked.
- Content split: ALL user-facing content lives in `content.js` (`window.SITE`). `app.js` renders it, `styles.css` styles it, `index.html` is the shell + head meta. Adding a project or editing bio/skills/experience should only ever touch `content.js` (+ an asset file in `assets/projects/` for images).
- Design: Clay design language, primary color bottle green `#006a4e` on cream canvas `#fffaf0`. Font Inter. Radii 12/16/24px. Cream footer (no dark footer). Full spec in `design.md` (gitignored, local only).

## Hard rules (non-negotiable)
1. **No em-dashes** (U+2014) anywhere in text, comments, or content, ever. Also avoid en-dash (U+2013). Use hyphen, comma, colon, or reword.
2. **No emojis** unless the user explicitly asks.
3. **Don't assume, ask** before picking between valid options or doing anything ambiguous.
4. **Never invent URLs/links** for a project. Only ship links the user provides or verifies as real. Prefer app icons over screenshots for project thumbnails.
5. Git commit identity for this repo: `Khalid <rampant.roar@gmail.com>`. Never add an AI co-author trailer to commits here.

## File map (what to touch for what)
| Task | File |
|---|---|
| Name/bio/skills/projects/experience/education/contact | `content.js` only |
| Add a project or its images/links | `content.js` (+ file in `assets/projects/`) |
| Styling, tokens, responsive | `styles.css` |
| Rendering behavior, effects, nav, parallax, icons | `app.js` |
| Title, OG/SEO meta, favicons, analytics scripts | `index.html` |
| SEO crawlers | `robots.txt`, `sitemap.xml`, JSON-LD in `index.html` |
| Build log | `docs/journey.html` |
| Theme toggle + back-to-top FAB (all pages) | `assets/controls.css` + `assets/controls.js` only |
| Favicon (every page, existing + new) | same 3 `<link>` tags as `index.html`, `assets/favicon-32.png`/`favicon-16.png`/`apple-touch-icon.png` |

## Architecture notes
- **Icons:** Iconify CDN (script tag in `index.html`). Render with `<span class="iconify" data-icon="set:name">`, call `Iconify.scan()` after injecting new icons dynamically (`app.js` already does this for rendered content). `app.js` holds `TECH_ICONS` (tech -> icon) and `PLATFORM_ICONS` (Play/App Store/web -> icon) lookup maps; add new icons there.
- **Shared controls (`assets/controls.css` + `assets/controls.js`):** the theme toggle (`#theme-toggle`, class `theme-toggle`) and the back-to-top FAB (`#fab`, class `fab`) are STANDARDIZED in these two shared files and are the single source of truth for both. Every page (index, docs/journey.html, any future page) must load `assets/controls.css` in `<head>` (after the page's own CSS) and `assets/controls.js` at end of body, and use the exact same markup (`<button id="theme-toggle" class="theme-toggle">` with empty `.icon-moon`/`.icon-sun` spans, `<button id="fab" class="fab">`). controls.js injects the icons and wires click/scroll behavior; do NOT re-declare `.theme-toggle`/`.fab` rules or duplicate the JS in a page's own CSS/scripts. Keep the z-index of `.fab` above any page header if the page has a sticky header.
- **New page checklist (every future HTML page, non-negotiable):**
  1. Favicon: same 3 tags as `index.html` (`favicon-32.png`, `favicon-16.png`, `apple-touch-icon.png` from `assets/`, fix relative path for subfolders).
  2. Load `assets/controls.css` in `<head>` (after page's own CSS) + `assets/controls.js` at end of body. Reuse exact `#theme-toggle`/`#fab` markup, never redeclare their CSS/JS.
  3. Theme: same `:root` / `:root[data-theme="dark"]` / `@media (prefers-color-scheme: dark)` pattern, plus the pre-paint inline script that restores `localStorage('theme')` before first paint (see `journey.html` head).
  4. WCAG AA in both themes for every text/bg pair. Any CSS var reused for a "fixed" decorative fill (e.g. a pastel card color) must NOT double as a var that also flips value under `[data-theme="dark"]` for chrome elsewhere on the same page, or the fill silently goes dark under forced-dark text (or vice versa). Give it its own dedicated, theme-stable value/var instead.
  5. Any dot/rail/connector-style UI: give repeating items a uniform fixed width so connecting lines can be positioned as `dot-center to dot-center` via simple `%`-based `calc()`; never anchor a connector to `calc(100% - Npx)` of a variable-width item.
  6. Mobile responsive from the start, not bolted on after: set `html,body{max-width:100%;overflow-x:hidden}` so nothing can force page-level horizontal scroll, and add `pre{max-width:100%;overflow-x:auto}` (or the same on any fixed-width block like code snippets) so long content scrolls inside its own box instead of clipping/overflowing the viewport. Test at a real narrow width (~375px) before calling a page done, same as WCAG contrast is checked in both themes.
- **Theme:** light is the `:root` default. Dark = `:root[data-theme="dark"]` override; OS dark-mode also applies via `@media (prefers-color-scheme: dark)` unless the user forced light. A sun/moon toggle sets `data-theme` + `localStorage('theme')`. Colors used from JS (e.g. parallax blob shades) must be pulled from CSS vars via `getComputedStyle`, not hardcoded, to stay theme-aware.
- **Background parallax:** `app.js`'s `buildShapes()` generates ~5 large abstract organic blobs (random position/size/rotation/shade, each with its own `vx, vy`). `initScrollFx()` is a single rAF scroll handler that moves them via `translate3d`. Keep new shapes organic (no perfect circles/triangles/squares) and subtle.
- **Projects:** cards flow in a masonry layout. A project's `links` array renders one "View" button per platform with an auto-detected platform icon (play.google -> Google Play, apps.apple -> iOS, else web). Empty `links: []` renders a disabled "View" button.
- **Analytics/SEO:** Cloudflare Web Analytics beacon in `index.html` with a per-site token, don't move/rename it. SEO already wired: `robots.txt`, `sitemap.xml`, JSON-LD `Person` schema, `meta robots`, `og:`/`twitter:card` tags, Google Search Console verification meta, all in `index.html` head.

## Versioning / releases
One commit + git tag `vX.0.0` per milestone:
```
git commit -m "vX: short summary"
git tag vX.0.0
git push origin main
git push origin vX.0.0
```
Pages auto-builds on push to `main`. Verify with:
```
gh api repos/miankhalid/miankhalid.github.io/pages --jq '.status'   # until "built"
curl -sI https://miankhalid.github.io/ | head -1                    # expect 200
```

## Build log (`docs/journey.html`): keep it current
- **Every released change MUST also be documented in `docs/journey.html`** (same commit/release), matching its existing format: new timeline card (id `vN`, color-cycle class, `<details>` closed) with What / Why / exact Steps / "Check it" links (real URLs).
- Rail runs **newest-first**: insert the new version's rail dot at the LEFT and mark it `current` (blinking); un-mark the previous one. Each dot shows version + `date · time` (e.g. `23 Aug · 12:50 am`, real commit timestamps, 12h format).
- Keep all cards collapsed on load; keep the accordion `<script>` (opening one closes the others).
- Docs-only changes don't bump a version tag, but still update the journey if they're a meaningful step.

## Journey page features to preserve
- Footer "Peek behind the curtain" link in the main site (`app.js`) points to `docs/journey.html`. Keep it subtle but present.
- Journey page has a sticky header: "back to portfolio" link + dark/light/system theme toggle (uses the shared `assets/controls.css` + `assets/controls.js`, same `data-theme` + `localStorage('theme')` pattern as the main site). Keep both.
- Timeline rail: horizontally scrollable dots, **newest on the left**, newest dot blinking `current`, each item shows version + date + time (stacked, two lines). Connecting lines run dot-center to dot-center via fixed-width `.rail-item` (percentage `calc()`, not edge-anchored), vertically aligned (3px, `top:14px`), and the last item has no line. Keep each rail node text from overlapping (use fixed/nowrap widths). Keep it.
- Accordion: opening a card closes all others. Keep the `<script>`.
- **Accessibility (hard rule):** every text element on the journey page must meet **WCAG AA** (≥ 4.5:1 normal, ≥ 3:1 large) in BOTH light and dark themes. Pastel/cream fills (cream, ochre, lav, peach) keep **dark text** in every theme; dark fills (pink `#932444`, teal) keep **light text**. Never let dark-mode CSS vars (that flip light) wash out text on an always-light background. Links on colored cards use a per-card `--card-link` var (dark green on pastels, light green on dark fills) because the standard `--primary` flips and fails on some fills. When adding any color/text change, verify contrast in both themes.
- Back-to-top FAB button (bottom-right) + theme toggle script. Keep them.
- Matches the main site's dark/light/system theming and is mobile responsive. Preserve both.
- Cloudflare Web Analytics beacon in `index.html` (per-site token). Don't move/rename/remove.

## Validation before finishing a change
- `node --check app.js && node --check content.js` must pass (only syntax check available, no test suite/build step exists).
- Grep for stray em-dashes: `grep -rn "—" index.html app.js content.js styles.css docs/ || true` (expect no hits outside gitignored docs).
- `git status` clean of personal/gitignored docs before commit.

## `.gitignore` (do not violate)
`khalid-cv.md` (real CV), `design.md`, `PORTFOLIO-HANDOFF.md`, `linkedin-bio.md`, `*.bio.md`, `.DS_Store`, `.claude/`, `.commandcode/`, `.tokensave/`, `.tokensave.local.json`, `myenv/`. Never commit these personal/local-only docs.
