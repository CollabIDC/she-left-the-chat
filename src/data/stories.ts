// Centralized story data — two-stream architecture.
export type Stream = "view-from-here" | "she-actually-did-it";

export type Destination = "Madrid" | "Paris" | "London" | "Senegal";
export type Topic =
  | "Travel Guides"
  | "Culture and Etiquette"
  | "Packing and Prep"
  | "Life Abroad"
  | "AI and Tech"
  | "The Unexpected Business";
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
  section?: "stumbled-upon-madrid";
  image: string;
  readTime?: string;
  stream: Stream;
  pullQuote?: string;
  hideStreamLabel?: boolean;
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
  "The Unexpected Business",
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
    slug: "first-time-in-madrid",
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
    slug: "now-what-what-nobody-tells-you-about-after",
    title: "Now What: What Nobody Tells You About After",
    excerpt:
      "The achievement, the arrival, and the silence that follows when the goal is done and the life has not filled in yet.",
    date: "January 2026",
    image: "/posts/now-what-hero-v2.png",
    readTime: "8 min read",
    stream: "she-actually-did-it",
    pullQuote:
      "Standing on faith does not always look like peace. Sometimes it looks like a long Wednesday with nowhere to be and a dog who wants to go home and a phone that cannot ring for six more hours.",
  },
  {
    slug: "she-made-sure-i-wasnt-alone-at-midnight",
    title: "She Made Sure I Wasn't Alone at Midnight",
    excerpt:
      "The night I realized that choosing yourself does not mean the people who matter forget about you.",
    date: "January 2026",
    image: "/posts/midnight-facetime-hero.png",
    readTime: "6 min read",
    stream: "she-actually-did-it",
    pullQuote:
      "Not enough people talk about the ones who quietly make sure you are held while you figure out how to stay.",
  },
  {
    slug: "i-walked-an-hour-for-ribs",
    title: "I Walked an Hour for Ribs and Christmas Eve Dinner Was a Sorry Ham Sandwich",
    excerpt: "This was not how Christmas Eve was supposed to go.",
    date: "December 2025",
    image: "/posts/ribs-sandwich-hero-v2.png",
    readTime: "7 min read",
    stream: "she-actually-did-it",
    
    pullQuote:
      "You can do everything right. And some years, Christmas Eve is just going to be a sandwich.",
  },
  {
    slug: "she-actually-did-it",
    title: "She Actually Did It",
    excerpt:
      "The morning the second-guessing went quiet, and the life I'd been rehearsing in my head finally became the one I was living.",
    date: "May 2026",
    image: "/posts/she-actually-did-it-hero-v2.png",
    readTime: "6 min read",
    stream: "she-actually-did-it",
  },
  {
    slug: "the-bookstore-that-exists-because-of-a-love-story",
    title: "The Bookstore That Exists Because of a Love Story",
    excerpt:
      "Inside Secret Kingdoms, the English language bookstore in Madrid that a British-Spanish couple built for a community that did not know it needed them yet.",
    pullQuote: "They did not open a bookstore. They built a home for people who needed one.",
    date: "February 2025",
    image: "", // will use featured-bookstore asset
    readTime: "10 min read",
    stream: "view-from-here",
    section: "stumbled-upon-madrid",
    destination: "Madrid",
    topic: "The Unexpected Business",
    readerNeed: "While You Are There",
  },
];
