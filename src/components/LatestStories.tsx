import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { stories } from "@/data/stories";

const LatestStories = () => {
  const nightStory = stories.find((s) => s.slug === "the-night-i-wondered-if-i-made-a-mistake")!;
  const secondJournal = stories.find((s) => s.slug === "the-morning-i-stopped-translating-myself")!;

  const journalCards = [nightStory, secondJournal];

  const anim = (i: number) => ({
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5, delay: i * 0.1 },
  });

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div {...anim(0)} className="text-center mb-16">
          <span className="label-eyebrow">She Actually Did It</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-charcoal mt-4 mb-2">
            She Actually Did It
          </h2>
          <p className="font-display italic text-xl md:text-2xl text-charcoal/60">
            Raw. Real. Written from inside the decision.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {journalCards.map((story, i) => (
            <JournalCard key={story.slug} story={story} index={i} />
          ))}
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
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-label font-medium uppercase tracking-wider bg-terracotta text-ivory">
            She Actually Did It
          </span>
          <span className="inline-block px-3 py-1 rounded-full text-xs font-label font-medium uppercase tracking-wider bg-gold text-ivory">
            The First 60 Days
          </span>
        </div>
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

export default LatestStories;
