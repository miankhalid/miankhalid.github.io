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
  link: "https://github.com/miankhalid/my-project",   // or "" to hide the link
  image: ""   // or "assets/projects/my-project.jpg" for a thumbnail
}
```

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
