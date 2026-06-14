1. In `index.html`, add the Beehiiv loader script tag immediately before the closing `</body>` tag, after the existing attribution script:
   ```html
   <script async src="https://subscribe-forms.beehiiv.com/v3/loader.js" data-beehiiv-form="f240edd9-7a0b-41ac-87f0-9a679b86d47d"></script>
   ```
2. In `src/components/EmailSignup.tsx`, replace the entire file contents with the provided code that removes the `useEffect` hook and its `useEffect` import, keeping only the Framer Motion animated layout and the `data-beehiiv-form` container div. No other files or content are changed.