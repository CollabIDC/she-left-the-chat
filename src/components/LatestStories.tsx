import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { stories } from "@/data/stories";

const LatestStories = () => {
  const nightStory = stories.find((s) => s.slug === "the-night-i-wondered-if-i-made-a-mistake")!;
  const firstTime = stories.find((s) => s.slug === "first-time-in-madrid-start-here")!;
  const beforeFly = stories.find((s) => s.slug === "everything-before-you-fly-to-madrid")!;
  const cultureGuide = stories.find((s) => s.slug === "honest-guide-spanish-culture-etiquette")!;

  // She Actually Did It section — two journal cards
  const journalCards = [nightStory];
  // Add a second personal journal entry placeholder
  const secondJournal = {
    slug: "the-morning-i-stopped-translating-myself",
    title: "The Morning I Stopped Translating Myself",
    excerpt:
      "I woke up and realized I had stopped rehearsing who I was supposed to be. The city did not ask me to explain. So I stopped.",
    stream: "she-actually-did-it" as const,
    date: "February 2025",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80",
  };
  journalCards.push(secondJournal as typeof nightStory);

  const guideCards = [firstTime, beforeFly, cultureGuide];

  const anim = (i: number) => ({
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5, delay: i * 0.1 },
  });

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* She Actually Did It */}
        <motion.div {...anim(0)} className="text-center mb-16">
          <span className="label-eyebrow">She Actually Did It</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-charcoal mt-4 mb-2">
            She Actually Did It
          </h2>
          <p className="font-display italic text-xl md:text-2xl text-charcoal/60">
            Raw. Real. Written from inside the decision.
          </p>
        </motion.div>

        {/* Two journal cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {journalCards.map((story, i) => (
            <JournalCard key={story.slug} story={story} index={i} />
          ))}
        </div>

        {/* The View From Here */}
        <motion.div {...anim(0)} className="text-center mb-16">
          <span className="label-eyebrow">The View From Here</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-charcoal mt-4">
            What I Have Been Writing
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {guideCards.map((story, i) => (
            <GuideCard key={story.slug} story={story} index={i} />
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link to="/stories" className="btn-gold">
            View All Stories
          </Link>
        </div>
      </div>
    </section>
  );
};

interface CardProps {
  story: (typeof stories)[0];
  index: number;
}

const JournalCard = ({ story, index }: CardProps) => {
  const anim = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5, delay: index * 0.1 },
  };

  return (
    <motion.div {...anim}>
      <Link
        to={`/stories/${story.slug}`}
        className="block bg-ink rounded-xl p-8 md:p-10 h-full group transition-all duration-300 hover:shadow-lg"
      >
        <span className="inline-block px-3 py-1 rounded-full text-xs font-label font-medium uppercase tracking-wider bg-terracotta text-ivory mb-4">
          She Actually Did It
        </span>
        <p className="font-display italic text-sm text-gold mb-6">
          Spain has not changed. I am the one adapting.
        </p>
        <h3 className="font-display text-2xl md:text-3xl font-bold text-ivory mb-4 leading-tight group-hover:text-gold transition-colors">
          {story.title}
        </h3>
        <p className="font-body text-ivory/70 leading-relaxed mb-6">
          {story.excerpt}
        </p>
        <span className="inline-flex items-center gap-2 font-body text-sm text-gold group-hover:gap-3 transition-all">
          Read the Entry <ArrowRight className="w-4 h-4" />
        </span>
      </Link>
    </motion.div>
  );
};

const GuideCard = ({ story, index }: CardProps) => {
  const anim = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5, delay: index * 0.1 },
  };

  return (
    <motion.div {...anim}>
      <Link
        to={`/stories/${story.slug}`}
        className="block bg-background rounded-xl overflow-hidden h-full group card-elevated"
      >
        <div className="overflow-hidden aspect-[16/10]">
          <img
            src={story.image}
            alt={story.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        <div className="p-6">
          <div className="flex flex-wrap gap-2 mb-4">
            {story.destination && (
              <span className="px-3 py-1 rounded-full text-xs font-label font-medium uppercase tracking-wider bg-charcoal text-ivory">
                {story.destination}
              </span>
            )}
            {story.topic && (
              <span className="px-3 py-1 rounded-full text-xs font-label font-medium uppercase tracking-wider bg-gold text-ivory">
                {story.topic}
              </span>
            )}
            {story.readerNeed && (
              <span className="px-3 py-1 rounded-full text-xs font-label font-medium uppercase tracking-wider bg-terracotta text-ivory">
                {story.readerNeed}
              </span>
            )}
          </div>
          <h3 className="font-display text-xl md:text-2xl font-bold text-charcoal mb-3 leading-tight group-hover:text-gold transition-colors">
            {story.title}
          </h3>
          <p className="font-body text-charcoal/70 leading-relaxed mb-4 text-sm">
            {story.excerpt}
          </p>
          <span className="inline-flex items-center gap-2 font-body text-sm text-terracotta group-hover:gap-3 transition-all">
            Read more <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
};

export default LatestStories;
