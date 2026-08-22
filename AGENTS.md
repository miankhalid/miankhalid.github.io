# AGENTS.md

Guidance for AI agents and future sessions working in this repo (the user's personal portfolio at https://miankhalid.github.io/).

## Project at a glance
- **Stack:** plain static site. HTML + CSS + vanilla JS. No bundler, no framework, no build step.
- **Host:** GitHub Pages. Repo MUST stay named `miankhalid.github.io` (root user site).
- **Content split:** ALL user-facing content lives in `content.js` (`window.SITE`). `app.js` renders it; `styles.css` styles it; `index.html` is the shell + head meta.
- **Design:** Clay design language, primary = bottle green `#006a4e` on cream canvas `#fffaf0`. Font Inter. Radii 12/16/24px. Cream footer (NO dark footer). See `design.md` (local/gitignored) for full spec.

## Hard rules (non-negotiable)
1. **No em-dashes (the mdash glyph U+2014), ever**, in text, comments, or anywhere in the repo. Use hyphen, comma, colon, or reword. En-dash (U+2013) also banned to be safe. This is a standing user rule, so the hygiene check below intentionally greps for the glyph.
2. **Never add emojis** unless the user explicitly asks.
3. **Be brief and terse** ("caveman") in replies. Sacrifice grammar for concision.
4. **Don't assume. Ask.** Ask the user before picking between valid options or before doing anything ambiguous.
5. **Git commit identity:** `Khalid <rampant.roar@gmail.com>` (set at project level). **Never add an AI co-author trailer to commits.**
6. **Never invent URLs/links** for a project. Only ship links the user provides or ones verified as real. Prefer app icons over screenshots for project thumbnails.

## Versioning / releases
- One commit + git tag `vX.0.0` per milestone, pushed with the branch.
  ```
  git commit -m "vX: short summary"
  git tag vX.0.0
  git push origin main
  git push origin vX.0.0
  ```
- Pages auto-builds on push to `main`. Verify with:
  ```
  gh api repos/miankhalid/miankhalid.github.io/pages --jq '.status'   # until "built"
  curl -sI https://miankhalid.github.io/ | head -1                    # expect 200
  ```

## File map (what to touch for what)
| Task | File |
|---|---|
| Change name/bio/skills/projects/experience/education/contact | `content.js` only |
| Add a project or its images/links | `content.js` (+ file in `assets/projects/`) |
| Styling, tokens, responsive | `styles.css` |
| Rendering behavior, effects, nav, parallax, icons | `app.js` |
| Title, OG/SEO meta, favicons, analytics scripts | `index.html` |
| SEO crawlers | `robots.txt`, `sitemap.xml`, JSON-LD in `index.html` |
| This build log | `docs/journey.html` |

## Icons
- Icons come from **Iconify** CDN (script in `index.html`). Render with a `<span class="iconify" data-icon="set:name">` element and call `Iconify.scan()` for dynamically injected icons (`app.js` does this).
- `app.js` holds `TECH_ICONS` (tech → icon) and `PLATFORM_ICONS` (Play/App Store/web → icon) maps. Add new icons there.

## Theme / dark mode
- Light is the `:root` default. Dark = `:root[data-theme="dark"]` override; OS-dark also applies via `@media (prefers-color-scheme: dark)` unless user forced light. A sun/moon toggle sets `data-theme` + `localStorage('theme')`. Keep colors theme-aware (pull from CSS vars via `getComputedStyle` where a color must exist in JS, e.g. parallax blobs).

## Background parallax
- `app.js` `buildShapes()` generates the decorative layer: ~5 large abstract organic blobs, random position/size/rotation/shade. Each blob has its own `vx, vy` so direction + speed differ. `initScrollFx()` (single rAF scroll handler) moves them via `translate3d`. Keep it abstract (organic, no perfect circles/triangles/squares) and subtle.

## Analytics & SEO (already configured)
- **Cloudflare Web Analytics:** beacon script in `index.html` with a per-site token. Don't move/rename the token.
- **SEO:** `robots.txt`, `sitemap.xml`, JSON-LD `Person` schema, `meta robots`, `og:`, `twitter:card` tags all present. Google Search Console verification meta tag is in `index.html` <head>.
- **Social previews cache** in WhatsApp/Slack/Discord: to refresh, share the URL with a cache-busting query string like `https://miankhalid.github.io/?v=3`. Test previews with opengraph.xyz or Facebook Sharing Debugger.

## `.gitignore` (do not violate)
`khalid-cv.md` (real CV), `design.md`, `PORTFOLIO-HANDOFF.md`, `*.bio.md`, `.DS_Store`, `.claude/`, `.commandcode/`, `.tokensave/`, `.tokensave.local.json`, `myenv/`. Never commit user-facing personal docs.

## Validation before finishing
- `node --check app.js && node --check content.js` (must pass).
- Grep to confirm no em-dashes slipped in: `grep -rn "—" index.html app.js content.js styles.css docs/ || true` (expect no hits outside gitignored docs).
- `git status` clean of personal/`*.bio.md` files before commit.