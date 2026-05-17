## Plan: Restore Trikki post hero image

### Scope
Only `/stumbled-upon/trikki-new-orleans-chamberi` post page. No other page, card, listing, or the First Time in Madrid post will be touched.

### Steps

1. **Save the uploaded gumbo image** to the same folder the other post heroes live in:
   - Copy `user-uploads://Gumbo.png` → `public/posts/images/trikki-hero.jpg`
   - This matches the existing convention used by `bookstore-hero.jpg` and `tablao-hero.jpg`.

2. **Replace the placeholder in `public/posts/trikki-new-orleans-chamberi.html`:**
   - Current line 251 is:
     ```html
     <div class="hero-placeholder">Hero image placeholder</div>
     ```
   - Replace with:
     ```html
     <img class="hero-image" src="/posts/images/trikki-hero.jpg" alt="Bowl of gumbo at Trikki in Chamberí, Madrid" />
     ```
   - This is the exact same pattern used by the Bookstore and Tablao post pages.

3. **No CSS changes.** The existing `.hero-image` rule on the Trikki page is already identical to Bookstore/Tablao:
   - `width: 100%`
   - `object-fit: cover`
   - `display: block`
   - `height: 480px`

### One thing to confirm before I build

Your message says **"height 420 to 450px"**, but you also said **"match the same hero image styling as the Bookstore and Tablao post pages exactly."** Those two pages currently use **480px**. I will not guess — please pick one:

- **A)** Match Bookstore/Tablao exactly → keep `height: 480px` (no CSS change).
- **B)** Use the 420–450px range you specified → change Trikki's `.hero-image` and `.hero-placeholder` height to `440px` (Trikki only, Bookstore and Tablao untouched).

### What will NOT change
- No edits to the Stumbled Upon listing or any card images.
- No edits to the First Time in Madrid post.
- No edits to Bookstore or Tablao pages.
- No new components, no routing changes, no style-token changes.

Reply with **A** or **B** and I'll implement.