## Goal
On the Real Guides page (`src/pages/RealGuidesPage.tsx`), hide the three filter pill rows (Destination, Topic, Reader Need) behind a collapsible toggle button labeled "FILTER GUIDES".

## Changes
**File:** `src/pages/RealGuidesPage.tsx`

1. Add a local `useState` boolean `filtersOpen` (default `false` — collapsed on load).
2. In the filter `<section>`, replace the always-visible pill rows with:
   - A centered toggle button styled to match the existing gold pill aesthetic (gold border, uppercase label tracking, `font-label` 11px). Label: `FILTER GUIDES` with a small chevron icon (lucide `ChevronDown`) that rotates 180° when open. Active filter count (anything not `"All"`) shown as a small gold-bg badge next to the label, e.g. `FILTER GUIDES (2)`.
   - Below the button, conditionally render the existing three `renderPillRow` calls inside a wrapper with smooth height/opacity transition (`transition-all`, `overflow-hidden`, switching between `max-h-0 opacity-0` and `max-h-[1000px] opacity-100 mt-7`).
3. No other changes — pill styling, story grid, empty state, filter logic, and routing stay exactly as they are.

## Out of scope
- No changes to filter logic, story data, or any other page/component.
- No changes to copy elsewhere, colors, or layout outside this filter section.
