// Centralized story data — placeholder content, easy to swap later.
export interface Story {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
  readTime?: string;
}

export const stories: Story[] = [
  {
    slug: "finding-home-in-a-foreign-city",
    title: "Finding Home in a Foreign City",
    excerpt:
      "What it really means to build a life somewhere entirely new, one cafe at a time.",
    date: "January 2025",
    category: "Life Abroad",
    image:
      "https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=1200&q=80",
    readTime: "6 min read",
  },
  {
    slug: "the-art-of-getting-lost",
    title: "The Art of Getting Lost",
    excerpt:
      "Some of the best adventures happen when you throw away the map and just wander.",
    date: "December 2024",
    category: "Adventures",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
    readTime: "5 min read",
  },
  {
    slug: "what-nobody-tells-you-about-moving-abroad-after-50",
    title: "What Nobody Tells You About Moving Abroad After 50",
    excerpt:
      "The practical stuff, the emotional stuff, and everything in between.",
    date: "November 2024",
    category: "Travel Tips",
    image:
      "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=1200&q=80",
    readTime: "8 min read",
  },
  {
    slug: "tapas-tuesdays-and-other-rituals",
    title: "Tapas Tuesdays and Other Rituals That Saved Me",
    excerpt:
      "How small weekly traditions became the scaffolding of an entirely new life.",
    date: "October 2024",
    category: "Food & Culture",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80",
    readTime: "7 min read",
  },
  {
    slug: "the-paperwork-no-one-warns-you-about",
    title: "The Paperwork No One Warns You About",
    excerpt:
      "NIE, empadronamiento, healthcare, taxes — the unsexy guts of becoming an expat.",
    date: "September 2024",
    category: "Expat Life",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80",
    readTime: "9 min read",
  },
  {
    slug: "a-weekend-in-toledo",
    title: "A Weekend in Toledo Felt Like Time Travel",
    excerpt:
      "Cobblestone streets, marzipan, and a hilltop view that quietly rearranged me.",
    date: "August 2024",
    category: "Adventures",
    image:
      "https://images.unsplash.com/photo-1578912996078-305d92249aa6?w=1200&q=80",
    readTime: "6 min read",
  },
];

export const categories = [
  "All",
  "Life Abroad",
  "Adventures",
  "Travel Tips",
  "Expat Life",
  "Food & Culture",
] as const;
