## Fix: Restore bullfight image on the Stumbled Upon card

### What's wrong
In `src/pages/StumbledUpon.tsx`, the "The Bullfight" post entry (in the "Old Madrid" section) has no `image` field. The `PostCard` component falls back to a generic Unsplash placeholder when `image` is missing — that's why the card looks wrong.

The actual file `public/posts/images/bullfight-hero.jpg` already exists and is used correctly on the post hero.

### The change (one line, one file)
`src/pages/StumbledUpon.tsx`, in the Bullfight post object (~line 110), add the image path — same pattern Bookstore and Tablao already use:

```ts
{
  title: "The Bullfight",
  slug: "the-bullfight",
  image: "/posts/images/bullfight-hero.jpg",
  teaser: "I went. I had opinions before I arrived. ...",
},
```

### What will NOT change
- No edits to the bullfight post page itself.
- No edits to any other card, section, or image.
- No CSS, no routing, no component changes.

Approve and I'll make the one-line edit.