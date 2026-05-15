## Why the images look unchanged

The PNG files were correctly replaced on disk:
- `public/posts/now-what-hero.png` → new "dog with carrier" image
- `public/posts/she-actually-did-it-hero.png` → new "woman at balcony with Chloe" image

Both are referenced by `src/data/stories.ts` and by the post HTML files. The cards on `/stories` and the post hero images load from those exact paths, so the new images are being served — your browser is just showing its cached copy from before the swap.

## Fix

Rename the new image files so the URL changes (cleanest cache bust, no code-side query strings to maintain):

1. Rename on disk:
   - `public/posts/now-what-hero.png` → `public/posts/now-what-hero-v2.png`
   - `public/posts/she-actually-did-it-hero.png` → `public/posts/she-actually-did-it-hero-v2.png`

2. Update the two references for each:
   - `src/data/stories.ts` — update the `image:` field for the `now-what-what-nobody-tells-you-about-after` and `she-actually-did-it` entries.
   - `public/posts/now-what.html` — update the `<img src="/posts/now-what-hero.png">` to `-v2`.
   - `public/posts/she-actually-did-it.html` — same update for its hero `<img>`.

No component logic, routing, or layout changes. After this, a normal page load will fetch the new files.

(Alternative if you'd rather not rename: hard-refresh the preview with Cmd/Ctrl+Shift+R — same files, just a forced reload.)