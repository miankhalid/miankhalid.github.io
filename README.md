# miankhalid.github.io

My personal portfolio. Live at https://miankhalid.github.io/

## How to edit

Everything you can change lives in **one file: `content.js`**. You never need to touch `index.html`, `styles.css`, or `app.js`; those just render whatever is in `content.js`.

### Edit on GitHub (no local setup needed)

1. Open the repo on github.com.
2. Click `content.js`.
3. Click the pencil icon (top right) to edit.
4. Make your change (see examples below).
5. Scroll down, click "Commit changes".
6. Wait ~1 minute; your site rebuilds automatically at https://miankhalid.github.io/

### Add a project

Find the `projects: [ ... ]` array and paste a new block, comma-separated from the one before it:

```js
{
  title: "My New Project",
  blurb: "One or two sentences about what it does.",
  tags: ["Python", "FastAPI"],
  links: [
    { label: "Google Play", url: "https://play.google.com/store/apps/details?id=..." },
    { label: "App Store",   url: "https://apps.apple.com/app/id..." },
    { label: "Web",         url: "https://my-project.site" }
  ],
  image: "assets/projects/my-project.jpg"   // thumbnail at top of card
}
```

- `links` shows one "View" button per platform, each with its app icon. Platform icon is auto-detected from the URL (play.google → Google Play, apps.apple → iOS, else web).
- Leave `links: []` and the card shows a greyed-out disabled "View" (still looks tidy). The meh option if you have no public link.
- Add the image file to `assets/projects/` (square app icon, or a jpg/svg cover).

Order doesn't matter; put it wherever in the list. No other file needs to change.

### Change your bio, role, or tagline

Edit the `name`, `role`, `tagline`, `about` fields near the top of `content.js`.

### Add/remove a skill

Find `skills: [ ... ]`, then add an item to an existing group's `items` array, or add a whole new `{ group: "...", items: [...] }` block.

### Hide a section entirely

Sections auto-hide when empty. E.g. to remove Education, empty the array: `education: []`.

### Swap your photo

Replace `assets/profile.jpeg` with a new file (same name), or add a new file and update `avatar: "assets/your-new-file.jpg"` in `content.js`.

## Rules to keep things from breaking

- Keep the commas and quotes exactly as shown; it's a JavaScript object.
- Strings go in `"double quotes"`.
- Arrays use `[ ]`, objects use `{ }`.
- If you're unsure, copy an existing block and just change the text inside it.

## Good to know (already set up)

- **Dark mode:** a sun/moon button in the top-right; follows your device by default, remembers your choice.
- **Icons:** everywhere via Iconify (tech logos on skill pills + project tags, platform icons on buttons). No need to manage image files for those.
- **Grid:** project cards flow in a masonry layout (varying heights, no empty rows).
- **Social preview:** sharing the link pastes a branded green card. Preview caching in WhatsApp/Slack is sticky; share `https://miankhalid.github.io/?v=3` to force a fresh one.
- **Analytics:** Cloudflare Web Analytics tracks visits (private, no cookies).
- **SEO:** robots.txt, sitemap.xml, structured data already in place.
- **Build log:** see `docs/journey.html` for the full why/how of every change.
