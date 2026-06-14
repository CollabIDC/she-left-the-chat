In `src/components/CommunityTeaser.tsx`, replace the anchor tag:
```tsx
<a href="#email-signup" className="btn-gold">Join the email list</a>
```
with a `<button>` element that keeps the same `btn-gold` className and "Join the email list" text, but adds an `onClick` handler calling `document.getElementById('email-signup')?.scrollIntoView({ behavior: 'smooth' })`.

This change is limited to the CommunityTeaser component only. No other files or content will be touched.