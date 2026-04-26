import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { stories } from "@/data/stories";
import StoryCard from "./StoryCard";

const LatestStories = () => {
  // Two View From Here + one She Actually Did It, in original requested order
  const viewFromHere = stories.filter((s) => s.stream === "view-from-here").slice(0, 2);
  const journal = stories.filter((s) => s.stream === "she-actually-did-it").slice(0, 1);
  const featured = [...viewFromHere, ...journal];

  return (
    <section id="latest-stories" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-label text-xs uppercase tracking-[0.22em] text-terracotta block">
            The View From Here
            <span className="mx-2 text-charcoal/30">·</span>
            She Actually Did It
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-charcoal mt-4">
            From My Journal
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {featured.map((story, i) => (
            <StoryCard key={story.slug} story={story} index={i} />
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

export default LatestStories;
