## Scope
Rebuild ONLY the "Everything You Need to Do Before You Fly to Madrid" post. No other page, image, or component will be modified.

## Files to change
1. **`src/data/stories.ts`** — update only this one story entry:
   - `slug`: `everything-before-you-fly-to-madrid` → `everything-you-need-to-do-before-you-fly-to-madrid` (matches the requested route)
   - `image`: → `/posts/pre-flight-hero.png` (new hero)
   - Keep title, excerpt, date, stream, destination, topic, readerNeed unchanged.

2. **`src/pages/BlogPost.tsx`** — add ONE entry to the `POST_FILES` map so this slug renders the new HTML file. No other changes.

3. **`public/posts/everything-you-need-to-do-before-you-fly-to-madrid.html`** — NEW file, built from the same locked template used by `first-time-in-madrid.html` (Post Format & Style Guide):
   - Hero: full-width image, height 460px, object-fit cover.
   - Centered post header (max 780px): eyebrow `THE REAL GUIDES · MADRID`, H1 headline, italic subhead, 48×2px `#9B3A2A` divider, byline `BY KIMBERLY · MAY 2026 · MADRID, SPAIN`.
   - Three tag pills: `MADRID` (charcoal), `PACKING AND PREP` (gold), `BEFORE YOU GO` (terracotta).
   - Body column max-width 740px, centered.
   - **Body text: 18px / line-height 1.9 everywhere** (mobile and desktop). Drop cap on the first letter of the first paragraph only.
   - H2 = Playfair Display bold 28px `#1A1714`. H3 = Lato bold 10px uppercase `#9B3A2A`.
   - `· · ·` centered `#9B3A2A` section breaks between major tone shifts.
   - Pull quotes with `border-left: 3px solid #9B3A2A`, Playfair italic 22px, for the strongest lines.
   - One "A Personal Note" block on `#2C1F1A` background with the locked signature: *Spain has not changed. I am the one adapting.* Placed at the most natural personal beat.
   - One Mood Break Band on `#2C1F1A` at the pivotal emotional moment ("Wow. I actually did it.").
   - "What Other Guides Do Not Tell You" rendered as an Insider List: filled `#9B3A2A` dots, `#D8D0C4` fine line separators.
   - All body content from the brief, rendered with H2 section headings derived from the provided structure (The Suitcase / Pack Smart / Most Important Packing Rule / Apps / The Flight / Chloe / The Arrival / Pre-Departure Checklist / What Other Guides Do Not Tell You / closing).
   - Closing line: *She Left the Chat · shelefthechat.com · By Kimberly · Madrid, Spain*.
   - Brand rules: byline "By Kimberly" only, no em dashes, no "expat"/"immigrant".

4. **`public/posts/pre-flight-hero.png`** — NEW image, generated: warm flat lay of passport, boarding pass, phone with travel apps visible, euro notes, and a pen on an ivory/light wood surface; terracotta/sand/olive brand palette; soft natural light; 16:9.

## Not changing
- No other post HTML files, no other story entries, no shared components, no other images, no nav, no listings, no Stories page, no Real Guides listing. Existing route path under `/the-real-guides/:slug` already resolves via the updated slug.

## Verification
After build: open `/the-real-guides/everything-you-need-to-do-before-you-fly-to-madrid`, confirm hero renders, body is 18px/1.9, pills/divider/byline/personal-note/mood-break/insider-list all present, and no other page changed.
