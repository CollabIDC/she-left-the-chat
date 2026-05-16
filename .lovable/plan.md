# Restore the SHE ACTUALLY DID IT pill on the Christmas Eve card

Single, minimal change so the card matches the other She Actually Did It cards exactly.

## Change

In `src/data/stories.ts`, remove `hideStreamLabel: true` from the `i-walked-an-hour-for-ribs` entry (or set it to `false`).

That's it — the card will now render the "She Actually Did It" pill, title, excerpt, date, and "Read on" in the same vertical rhythm as every other She Actually Did It card.

## Optional cleanup

Leave the `hideStreamLabel?: boolean` flag on the `Story` type and the conditional in `StoryCard.tsx` in place — harmless, no other story uses it, and it stays available if needed later. (Can remove if you prefer a clean type.)

## Verify

Reload `/stories` and confirm the Christmas Eve card now has the terracotta SHE ACTUALLY DID IT pill above the title, matching the other cards in the section.
