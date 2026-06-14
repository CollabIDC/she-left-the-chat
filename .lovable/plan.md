## Goal
Insert the existing `EmailSignup` component into the homepage so it appears between the `CommunityTeaser` and `Footer` sections.

## Changes
1. In `src/pages/Index.tsx`:
   - Add `import EmailSignup from "@/components/EmailSignup";`
   - Insert `<EmailSignup />` on a new line immediately after `<CommunityTeaser />` and before the closing `</main>` tag.

No other files or components will be touched.