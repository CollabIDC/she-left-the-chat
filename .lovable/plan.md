## What I found

The three Stumbled Upon cards in `src/pages/StumbledUpon.tsx` (Bookstore, Trikki, Tablao) have **never had a per-card `image` field set** in the code. Every commit of this file shows the same: the `posts` array entries omit `image`, so they fall through to the `PLACEHOLDER` constant — the Madrid rooftop Unsplash URL. So technically nothing was "swapped"; the rooftop has always been the default fallback. But the visible result you're seeing is wrong, and the fix is the same either way: give each card its own correct image.

## Available images already in the project

- **Bookstore** → `src/assets/featured-bookstore.jpg` (already used on the homepage Stumbled Upon feature) and `public/posts/images/bookstore-hero.jpg` — both are the Secret Kingdoms interior.
- **Tablao de la Villa** → `public/posts/images/tablao-hero.jpg` (already used as the post hero).
- **Trikki** → **no Trikki image exists in the project.** No `trikki-*.jpg` in `src/assets/` or `public/posts/images/`. The Trikki post page (`public/posts/trikki-new-orleans-chamberi.html`) does not reference a hero image file either.

## Plan

1. Add an `image` field to the three card entries in `src/pages/StumbledUpon.tsx`:
   - Bookstore card → `/posts/images/bookstore-hero.jpg`
   - Tablao card → `/posts/images/tablao-hero.jpg`
   - Trikki card → **needs your input** (see below)
2. Leave `PLACEHOLDER` in place for any future card that hasn't been given an image yet, but change its URL away from the Madrid rooftop so the rooftop only appears on the First Time in Madrid post hero. Suggested neutral fallback: a soft cream/textured Unsplash image, or I can simply use a plain solid color block — your call.
3. Do not touch: First Time in Madrid post, any other page, any other card, the angle cards, the hero, or anything outside `src/pages/StumbledUpon.tsx`.

## What I need from you

**Trikki image.** I have no original Trikki photo to restore — none has ever existed in the codebase. Please either:
- Upload the photo you want used for the Trikki card, or
- Tell me to use a specific Unsplash image (link), or
- Confirm you want the Trikki card to use a neutral placeholder until you provide a real photo.

Also confirm preference for step 2 (neutral fallback color vs. a neutral Unsplash image).
