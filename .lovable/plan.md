## Goal

Make the existing `public/posts/she-actually-did-it.html` post reachable from the app at `/stories/she-actually-did-it`, with entry-point cards on both the **She Actually Did It** page and the **Stories** page.

## Changes

### 1. Render the HTML post under `/stories/:slug`

Update `src/pages/BlogPost.tsx` to support HTML-file posts using the same loader pattern as `StumbledUponPost.tsx`:

- Add a `POST_FILES` map: `"she-actually-did-it" → "/posts/she-actually-did-it.html"`.
- When the slug matches, fetch the HTML, extract `<style>` and `<body>`, scope the CSS (reusing the same `scopeCss` + `extractStyleAndBody` helpers from `StumbledUponPost`), and render inside a `.story-post-scope` wrapper between the existing `Navbar` and `Footer`.
- When the slug does NOT match a file, keep the current `stories` array rendering path unchanged so all existing posts keep working.
- Add a small "← Back to She Actually Did It" link at the top when the post belongs to that stream, otherwise "← Back to Stories".

To avoid duplication, extract the two helpers (`extractStyleAndBody`, `scopeCss`) into a small shared module `src/lib/htmlPost.ts` and import from both `BlogPost.tsx` and `StumbledUponPost.tsx`.

### 2. Add the post to the stories data

In `src/data/stories.ts`, add one new entry so the card components can render it:

- `slug: "she-actually-did-it"`
- `title: "She Actually Did It"`
- `excerpt`: short subhead matching the hero overlay
- `date: "May 2026"`
- `image`: same Unsplash hero used in the HTML file (so the card preview matches)
- `stream: "she-actually-did-it"`
- `readTime: "6 min read"`

This automatically makes it appear on the **She Actually Did It** page (which already filters by `stream === "she-actually-did-it"`) and lets `StoryCard` link it to `/stories/she-actually-did-it`.

### 3. Surface it on the Stories page

Confirm `src/pages/Stories.tsx` lists all stories (or both streams). If it currently filters out `she-actually-did-it` entries, add a section/card so this post appears there too. The card uses the existing `StoryCard` component for visual consistency.

### 4. Verify

- Click the card from `/she-actually-did-it` → lands on `/stories/she-actually-did-it` and the HTML hero + serif body + asterisk divider render correctly.
- Click the card from `/stories` → same destination.
- Existing posts (`first-time-in-madrid-start-here`, the bookstore, etc.) still render with the current `BlogPost` layout — no regression.
- Stumbled Upon HTML posts continue to work after the helper extraction.

## Out of scope

- No edits to the HTML post itself.
- No global style or design-token changes.
- No changes to the Stumbled Upon route or its existing posts beyond the helper import.