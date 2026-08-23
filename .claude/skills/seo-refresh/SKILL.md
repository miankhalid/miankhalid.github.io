---
name: seo-refresh
description: >-
  Audits and updates SEO/discoverability for miankhalid.github.io: sitemap.xml,
  robots.txt, meta tags (title/description/canonical/robots), Open Graph,
  Twitter Card, and JSON-LD on every HTML page in the repo. Use when the user
  says "update seo", "update sitemap", "refresh seo", "seo check", or similar,
  or after adding/removing a page.
---

# seo-refresh

Site-wide SEO audit and fix for this repo. No questions needed unless a gap requires a real
fact only the user has (e.g. a missing og-image asset, a new canonical domain).

## Steps

1. Find every top-level HTML page (`find . -maxdepth 2 -name "*.html" -not -path "./node_modules/*"`).
2. For each page, check head has: `<title>`, `meta description`, `meta robots`,
   `link rel="canonical"` (absolute URL, matches its real path), `og:type/url/title/description/image`,
   `twitter:card/title/description/image`. Match the exact pattern already used in `index.html`
   (see AGENTS.md file map). Fill gaps using that page's own title/description, don't invent copy;
   reuse `assets/og-card.jpg` unless the user gives a page-specific image.
3. Update `sitemap.xml`: one `<url>` entry per public HTML page, `lastmod` = today's date
   (YYYY-MM-DD), `priority` 1.0 for the homepage, 0.5 for secondary pages, `changefreq` monthly
   unless told otherwise.
4. Check `robots.txt` still allows `/` and points `Sitemap:` at the right absolute sitemap URL.
5. Check `index.html`'s JSON-LD `Person` schema (name/url/image/jobTitle/description/sameAs)
   still matches `content.js` bio content, fix drift.
6. Grep for stray em-dashes in any file you touched: `grep -rn "—" *.html docs/*.html sitemap.xml robots.txt`.
7. `node --check app.js && node --check content.js` if you touched JS.
8. Summarize what changed. Don't commit unless asked.

## Ask the user only if

- A page's real canonical URL is ambiguous (new page, unclear final path).
- An og:image asset doesn't exist yet and there's no obvious existing image to reuse.
- Sitemap priority/changefreq for a brand-new page type isn't obvious from existing entries.

Otherwise just do it, following AGENTS.md hard rules (no em-dashes, no emojis, no invented URLs).
