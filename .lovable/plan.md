# Add the Timeline Builder button to the Resources page

## Problem
On `/resources`, the "Your Move Timeline Builder" card in the `planningTools` array (line 84 of `src/pages/Resources.tsx`) has no `live`, `button`, or `href` properties. The card render logic only draws a button when `p.live && p.href` is true (line 357), so the card currently shows no button and the tool is unreachable from this page.

The route `/resources/timeline-builder` already exists and is wired in `src/App.tsx`.

## Change
In `src/pages/Resources.tsx`, update the single `planningTools` entry for the Timeline Builder:

```text
Before:
{ emoji: "📅", title: "Your Move Timeline Builder", desc: "Tell it your target date. It builds your backwards planning checklist." },

After:
{ emoji: "📅", title: "Your Move Timeline Builder", desc: "Tell it your target date. It builds your backwards planning checklist.", live: true, button: "BUILD MY TIMELINE", href: "/resources/timeline-builder" },
```

This matches the exact pattern used by the live sibling cards (Neighborhood Matcher, Packing List Builder) and will render a gold pill button linking to the existing internal route. No styling, no other cards, and no other files are touched.

## Verification
- Confirm the button appears on the card in the preview at `/resources`.
- Confirm clicking it navigates to `/resources/timeline-builder`.