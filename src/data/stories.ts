// Centralized story data — two-stream architecture.
export type Stream = "view-from-here" | "she-actually-did-it";

export type Destination = "Madrid" | "Paris" | "London" | "Senegal";
export type Topic =
  | "Travel Guides"
  | "Culture and Etiquette"
  | "Packing and Prep"
  | "Life Abroad"
  | "AI and Tech";
export type ReaderNeed =
  | "Before You Go"
  | "When You Arrive"
  | "While You Are There"
  | "Living It";

export interface Story {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  readTime?: string;
  stream: Stream;
  // Only present for view-from-here stream
  destination?: Destination;
  topic?: Topic;
  readerNeed?: ReaderNeed;
}

export const destinations = ["All", "Madrid", "Paris", "London", "Senegal"] as const;
export const topics = [
  "All",
  "Travel Guides",
  "Culture and Etiquette",
  "Packing and Prep",
  "Life Abroad",
  "AI and Tech",
] as const;
export const readerNeeds = [
  "All",
  "Before You Go",
  "When You Arrive",
  "While You Are There",
  "Living It",
] as const;

export const stories: Story[] = [
  {
    slug: "first-time-in-madrid-start-here",
    title: "First Time in Madrid? Start Here.",
    excerpt:
      "Your honest beginner's guide to one of Europe's most underrated cities — what to see, skip, and savor.",
    date: "January 2025",
    image:
      "https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=1200&q=80",
    readTime: "8 min read",
    stream: "view-from-here",
    destination: "Madrid",
    topic: "Travel Guides",
    readerNeed: "Before You Go",
  },
  {
    slug: "everything-before-you-fly-to-madrid",
    title: "Everything You Need to Do Before You Fly to Madrid",
    excerpt:
      "The pre-flight checklist nobody hands you — paperwork, apps, money, and the small things that save you on day one.",
    date: "January 2025",
    image:
      "https://images.unsplash.com/photo-1553531384-cc64ac80f931?w=1200&q=80",
    readTime: "7 min read",
    stream: "view-from-here",
    destination: "Madrid",
    topic: "Packing and Prep",
    readerNeed: "Before You Go",
  },
  {
    slug: "what-to-pack-for-madrid",
    title: "What to Pack for Madrid",
    excerpt:
      "A real style and practical guide — what actually earns space in your suitcase for Madrid's seasons and streets.",
    date: "December 2024",
    image:
      "https://images.unsplash.com/photo-1581553680321-4fffae59fccd?w=1200&q=80",
    readTime: "6 min read",
    stream: "view-from-here",
    destination: "Madrid",
    topic: "Packing and Prep",
    readerNeed: "Before You Go",
  },
  {
    slug: "honest-guide-spanish-culture-etiquette",
    title: "The Honest Guide to Spanish Culture and Etiquette in Madrid",
    excerpt:
      "How locals actually greet, eat, queue, and socialize — the unspoken rules that make or break your first weeks.",
    date: "December 2024",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80",
    readTime: "9 min read",
    stream: "view-from-here",
    destination: "Madrid",
    topic: "Culture and Etiquette",
    readerNeed: "Before You Go",
  },
  {
    slug: "madrid-airport-guide",
    title: "The Madrid Airport Guide",
    excerpt:
      "Everything that happens from the moment you land at Barajas — customs, transit, SIM cards, and getting into the city.",
    date: "November 2024",
    image:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&q=80",
    readTime: "7 min read",
    stream: "view-from-here",
    destination: "Madrid",
    topic: "Travel Guides",
    readerNeed: "When You Arrive",
  },
  {
    slug: "the-night-i-wondered-if-i-made-a-mistake",
    title: "The Night I Wondered If I Made a Mistake",
    excerpt:
      "And what happened next. A 3am window, a quiet city, and the question every brave person eventually asks herself.",
    date: "January 2025",
    image:
      "https://images.unsplash.com/photo-1492571350019-22de08371fd3?w=1200&q=80",
    readTime: "5 min read",
    stream: "she-actually-did-it",
  },
];
