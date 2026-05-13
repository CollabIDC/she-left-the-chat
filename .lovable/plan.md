# Separate Stories and The Real Guides

Two distinct content sections. No shared page, no shared filter, no shared route prefix.

## Final structure

| Nav item | Route | Content |
|---|---|---|
| Stories | `/stories` | She Actually Did It entries only |
| Stories post | `/stories/:slug` | She Actually Did It post |
| The Real Guides | `/the-real-guides` | View From Here practical guides only |
| Real Guides post | `/the-real-guides/:slug` | View From Here post |

The current `/she-actually-did-it` and `/she-actually-did-it/:slug` routes go away (or 301 to `/stories`).

## Changes

### 1. Routes — `src/App.tsx`
- `/stories` → `<SheActuallyDidIt />` (rename component later, see step 2)
- `/stories/:slug` → `<BlogPost />`
- `/the-real-guides` → new `<RealGuidesIndex />` page (built from current `Stories.tsx`, stripped of stream selector and journal tagline — only View From Here filter pills + cards)
- `/the-real-guides/:slug` → `<BlogPost />`
- Remove `/she-actually-did-it` and `/she-actually-did-it/:slug` (or keep as redirects to `/stories`)

### 2. Pages
- Rename `src/pages/SheActuallyDidIt.tsx` purpose → it becomes the Stories index. Header label "Stories" (keep "She Actually Did It" as subtitle/eyebrow if desired).
- Rename `src/pages/Stories.tsx` → `src/pages/RealGuides.tsx`. Remove the stream selector and the journal stream entirely; show only View From Here cards with destination/topic/reader-need filters. Header label "The Real Guides".
- Note: there's already a `src/components/RealGuides.tsx` (homepage section). Name the new page file `RealGuidesPage.tsx` to avoid collision.

### 3. Navbar — `src/components/Navbar.tsx`
- Stories → `/stories`
- The Real Guides → `/the-real-guides`
- Update `end` flags accordingly (both should match prefix so post pages highlight correctly; remove `end` from `/stories`).

### 4. Internal links
- `src/components/HeroCarousel.tsx` → `/stories/she-actually-did-it`
- `src/components/StoryCard.tsx` → `${isJournal ? "/stories" : "/the-real-guides"}/${slug}`
- `src/components/LatestStories.tsx` → same mapping
- `src/components/FeaturedStory.tsx` → `/the-real-guides/${slug}`
- `src/pages/BlogPost.tsx` back link → `/stories` for journal stream, `/the-real-guides` for view-from-here

### 5. BlogPost slug resolution
`BlogPost` already looks up by slug across both streams, so a single component handles both route prefixes. No data changes in `src/data/stories.ts`.

## Verification
- `/stories` shows only She Actually Did It cards; "Stories" nav highlighted.
- `/stories/she-actually-did-it` renders the post; "Stories" highlighted; "The Real Guides" not highlighted.
- `/the-real-guides` shows only View From Here cards with the three filter rows; "The Real Guides" highlighted.
- `/the-real-guides/<slug>` renders a guide post; "The Real Guides" highlighted.
- Old `/she-actually-did-it` URLs no longer route (or redirect cleanly).

No content rewrites, no design changes outside removing the now-unneeded stream selector on the Real Guides page.
