# Plan: First Time in Madrid? Start Here.

Build a new individual Real Guides post page following the locked Post Format & Style Guide. No existing pages, listings, or styles will be touched.

## Route

Requested: `/the-real-guides/first-time-in-madrid`

The existing card in `src/data/stories.ts` currently uses slug `first-time-in-madrid-start-here` (routing to `/the-real-guides/first-time-in-madrid-start-here`). To honor the requested URL, I will update only that one slug string to `first-time-in-madrid`. This is a data-only change and does not modify the listing page UI, styles, or any other card.

## Files

1. **New:** `public/posts/first-time-in-madrid.html` — full self-contained HTML/CSS post following the style guide.
2. **Edit:** `src/pages/BlogPost.tsx` — add one line to `POST_FILES` mapping: `"first-time-in-madrid": "/posts/first-time-in-madrid.html"`. No other changes to the renderer.
3. **Edit:** `src/data/stories.ts` — change the single slug `first-time-in-madrid-start-here` → `first-time-in-madrid`. Nothing else touched.

The BlogPost renderer already handles Real Guides breadcrumb, font loading, and CSS scoping for HTML posts — no rendering logic changes needed.

## Hero image

Reuse the existing card image already on the listing:
`https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=1600&q=80` (Madrid rooftops), full width, height 460px, `object-fit: cover`.

## Post structure (per style guide)

1. Hero image (460px, full-width cover)
2. Post header (centered, max 780px)
   - Eyebrow: `THE REAL GUIDES · MADRID` (#9B3A2A)
   - Headline: "First Time in Madrid? Start Here." (Playfair bold 48px)
   - Subhead: "Your honest beginner's guide to one of Europe's most underrated cities." (Playfair italic 19px #6B5E52)
   - 48×2 #9B3A2A divider
   - Byline: `BY KIMBERLY · MAY 2026 · MADRID, SPAIN`
3. Three Real Guides pills (centered, below byline): `MADRID` (#1A1714), `TRAVEL GUIDES` (#B8952A), `BEFORE YOU GO` (#9B3A2A) — all ivory text.
4. Post body (max 900px, 40px side padding, #F2EDE4)
5. Closing line + #D8D0C4 top border

## Body composition

Content reproduced verbatim from the brief (no em dashes, no "expat"/"immigrant" — user copy already complies). Applied formatting:

- **Drop cap** on the very first letter of the first paragraph ("There are a thousand…").
- **H2 sections** (Playfair bold 28px):
  - Why Madrid Though
  - A Quick Note About Who I Am and Why This Guide Exists
  - What This Guide Series Covers
  - A Few Things Nobody Told Me Before I Got Here
  - What Other Guides Do Not Tell You
  - A Word About This Resource
- **H3 subheads** (Lato bold 10px uppercase #9B3A2A) under "What This Guide Series Covers" (Before You Leave Home, When You Land, Understanding the City, Eating and Drinking, Things to Do, Beyond Madrid, Practical Essentials) and under "A Few Things Nobody Told Me Before I Got Here" (each bolded mini-headline becomes an H3: The food schedule is real…, Not every restaurant does takeaway, etc.).
- **Section break dots** `· · ·` between major tone shifts: after the intro (before "Why Madrid Though"), after the "Who I Am" section, after the guide map, after "A Few Things Nobody Told Me", and before the closing "A Word About This Resource".
- **Pull quote** for the brand-thesis line that already appears in the copy: *"Spain has not changed. I am the one adapting."* used once as a pull quote in the intro section.
- **Mood Break Band** (max one) at the most pivotal emotional moment — placed right before "A Quick Note About Who I Am", carrying: *"Madrid did not come to fit my plan. It came to rearrange it."*
- **Personal Note Block** (one) at the most natural personal moment — placed right after the "Who I Am" section, with the locked signature line *"Spain has not changed. I am the one adapting."* (gold label "A PERSONAL NOTE", dark #2C1F1A bg).
- **Insider List** for the entire "What Other Guides Do Not Tell You" section — 9 items, each with bold label + regular detail, #9B3A2A dot, #D8D0C4 separators.
- Closing line: `She Left the Chat · shelefthechat.com · By Kimberly · Madrid, Spain`.

## Brand compliance check

- "By Kimberly" only, no last name.
- No em dashes anywhere — will use commas/sentences (the source copy is already clean).
- Locked signature used verbatim.
- No "expat"/"immigrant" used.
- Hero is a real photo (Unsplash rooftop), no generated images.
- No info card or YouTube embed requested → omitted (guide allows optional elements).

## Out of scope

- The Real Guides listing page and all other Real Guides cards stay untouched.
- All other pages stay untouched.
- No global styling, nav, or data shape changes beyond the single slug rename.
