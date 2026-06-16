## Why Chrome is blocking it

The "This page has been blocked by Chrome" warning is Chrome Safe Browsing acting on the `*.lovableproject.com` preview host, not on your PDF. Preview/sandbox domains get flagged when they navigate the tab to a raw file. On your real domain (`shelefthechat.com`) this warning does not appear.

The current link in `src/pages/Resources.tsx` makes the problem worse:
- It renders a plain `<a href="/assets/move-abroad-roadmap.pdf">` with no `target` and no `download` attribute.
- The `download: true` flag in the card data is never read by the render code.

So clicking it navigates the entire preview tab to the PDF, which is the exact pattern Chrome blocks.

## Fix (one file: `src/pages/Resources.tsx`)

1. Update the internal-href branch (around lines 485–489) so that any href ending in `.pdf` (or any card with `download: true`) renders as:
   ```tsx
   <a
     href={c.href}
     target="_blank"
     rel="noopener noreferrer"
     download
     style={btnStyle}
   >
     {c.button}
   </a>
   ```
   Non-PDF internal links (like `/resources/consider-yourself-warned` and `/tools/relocation-readiness-quiz` and `/quiz`) keep the current same-tab `<a>` behavior — no `target`, no `download`.

2. Apply the same treatment to the Service Dog Travel Guide card, which has the same shape.

3. No changes to: card data, the Inner Work modal, styling, copy, or any other page.

## What this fixes

- New tab + `download` attribute tells the browser to save the file instead of navigating the current tab to it, which sidesteps the Safe Browsing interstitial on the preview host.
- On the published site, behavior stays clean (downloads the PDF in a new tab).

## Out of scope

No changes to routing, modals, other resource cards, or any other page.
