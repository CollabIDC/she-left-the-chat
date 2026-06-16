## Goal
Remove the email-capture popup for the "Move Abroad Roadmap" card on `/resources`. Clicking "GET THE FREE ROADMAP" should take the user straight to the PDF.

## Changes (src/pages/Resources.tsx)
1. Replace the roadmap modal button (line ~482-483) with an anchor link to `/assets/move-abroad-roadmap.pdf` opening in a new tab, styled with the same `btnStyle` as other live buttons.
2. Remove the now-unused pieces:
   - `roadmapOpen` state (line 102)
   - `if (modal === "roadmap") setRoadmapOpen(true);` handler (line 108)
   - `{roadmapOpen && <RoadmapModal ... />}` render (line 527)
   - The entire `RoadmapModal` component definition (lines ~534 to end of component)
3. Leave the card metadata (`modal: "roadmap"`) as-is or swap to an `href` — I'll switch it to `href: "/assets/move-abroad-roadmap.pdf"` and drop the `modal` field so it follows the same pattern as other PDF cards.

## Out of scope
No other modals, cards, styles, or pages are touched. The Inner Work and any other email-gated modals stay exactly as they are.