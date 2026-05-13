# Show all She Actually Did It entries on /stories

## Change
`src/pages/SheActuallyDidIt.tsx` — remove the `s.slug === "she-actually-did-it"` constraint from the filter so the page shows every entry in the `she-actually-did-it` stream:

```ts
const filtered = stories.filter((s) => s.stream === "she-actually-did-it");
```

That brings back the two missing cards on `/stories`:
- The Night I Wondered If I Made a Mistake
- The Morning I Stopped Translating Myself

…alongside the existing "She Actually Did It" entry.

## No other changes
- No data edits in `src/data/stories.ts`.
- No routing changes.
- The homepage `LatestStories` section already uses those two entries and is unaffected.
