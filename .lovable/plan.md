## Goal
Make the "Consider Yourself Warned" card on the Resources page clickable so it links to its live page.

## Current State
The page `/resources/consider-yourself-warned` already exists and is routed in `App.tsx`. In `src/pages/Resources.tsx`, the card in the `comingSoon` array is missing the `live: true` flag and `href` property, so no link or button renders.

## Change
In `src/pages/Resources.tsx`, line 92, update the "Consider Yourself Warned" item from:

```js
{ emoji: "⚠️", title: "Consider Yourself Warned", desc: "The laws, regulations, and unspoken rules nobody warned me about before I moved to Madrid." },
```

to:

```js
{ emoji: "⚠️", title: "Consider Yourself Warned", desc: "The laws, regulations, and unspoken rules nobody warned me about before I moved to Madrid.", live: true, button: "READ IT", href: "/resources/consider-yourself-warned" },
```

This follows the exact pattern used by the other live cards (e.g. Country Matching App, Move Abroad Roadmap). No other UI or logic changes are needed.