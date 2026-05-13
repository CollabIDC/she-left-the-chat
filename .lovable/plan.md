# What went wrong & how to fix it

## Why these issues happened

**Problem 1 — Duplicate hero text.** Your uploaded hero image already has the title, subhead and "MY STORY" button baked into the photo (visible on the left side). The HTML post template also renders its own centered overlay (eyebrow + h1 + subhead + byline) on top of that same image. Result: two versions of the title showing at once.

**Problem 2 & 3 — Wrong nav highlight / "moved under The Real Guides".** The post route is `/stories/:slug` and the navbar item "The Real Guides" points to `/stories`. React Router's `NavLink` matches by prefix unless `end` is set — so `/stories/she-actually-did-it` makes The Real Guides light up, and the post effectively lives "under" that nav item. Meanwhile the "Stories" nav item points to `/she-actually-did-it`, which never matches the post URL, so Stories never highlights.

---

## Correction plan (no new content, presentation only)

### Fix 1 — Single hero, no duplicate overlay
In `public/posts/she-actually-did-it.html`, remove the overlay text block inside `.hero-content` (eyebrow, h1, subhead, byline) and the dark gradient `::after`, so the hero shows only the image with its existing baked-in title and MY STORY button. Keep all body content, pull quotes, divider, byline and signup section exactly as-is.

### Fix 2 — Move the post under the Stories nav
Move the post route so it lives under the URL the Stories nav points to.

- `src/App.tsx`: change `<Route path="/stories/:slug" …>` to `<Route path="/she-actually-did-it/:slug" element={<BlogPost />} />`.
- Update internal links to the new path:
  - `src/components/HeroCarousel.tsx` → `/she-actually-did-it/she-actually-did-it`
  - `src/components/StoryCard.tsx` and `src/components/LatestStories.tsx` → link She Actually Did It stream cards to `/she-actually-did-it/${slug}`, keep other streams on `/stories/${slug}` (so Real Guides posts still belong to The Real Guides).
  - `src/components/FeaturedStory.tsx` left unchanged (Real Guides post).
- `src/pages/BlogPost.tsx`: back link for `she-actually-did-it` stream stays `/she-actually-did-it`.

### Fix 3 — Correct active highlight
- `src/components/Navbar.tsx`: add `end` to the "The Real Guides" NavLink (`to="/stories"`) so it only highlights on the exact `/stories` index page, not on every `/stories/*` URL.
- After Fix 2, visiting `/she-actually-did-it/she-actually-did-it` will correctly highlight the "Stories" nav item (which points to `/she-actually-did-it`) via the same prefix behavior.

### Verification
After the edits I'll reload `/she-actually-did-it/she-actually-did-it` and confirm: (a) only one set of hero text, (b) "Stories" highlighted in the navbar, (c) "The Real Guides" not highlighted, (d) `/stories` index still highlights "The Real Guides".

No content rewrites, no design changes, no other pages touched.