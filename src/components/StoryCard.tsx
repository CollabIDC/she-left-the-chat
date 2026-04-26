import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { Story } from "@/data/stories";

interface StoryCardProps {
  story: Story;
  index?: number;
}

const StoryCard = ({ story, index = 0 }: StoryCardProps) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="group"
    >
      <Link to={`/stories/${story.slug}`} className="block">
        <div className="relative overflow-hidden rounded-2xl mb-5 card-elevated bg-surface">
          <img
            src={story.image}
            alt={story.title}
            loading="lazy"
            className="w-full h-72 object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 rounded-full bg-gold text-ivory font-label text-[11px] uppercase tracking-[0.18em] font-medium">
              {story.category}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-charcoal/60 mb-2">
          <Calendar className="w-3.5 h-3.5" />
          <span className="font-body text-xs">{story.date}</span>
        </div>

        <h3 className="font-display text-2xl font-semibold text-charcoal mb-2 leading-snug group-hover:text-terracotta transition-colors">
          {story.title}
        </h3>

        <p className="font-body text-charcoal/70 mb-4 leading-relaxed line-clamp-2">
          {story.excerpt}
        </p>

        <span className="inline-flex items-center gap-2 font-body text-sm font-medium text-terracotta group-hover:gap-3 transition-all">
          Read more
          <ArrowRight className="w-4 h-4" />
        </span>
      </Link>
    </motion.article>
  );
};

export default StoryCard;
