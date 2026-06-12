import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { Story } from "@/data/stories";
import { cn } from "@/lib/utils";

interface StoryCardProps {
  story: Story;
  index?: number;
}

const StoryCard = ({ story, index = 0 }: StoryCardProps) => {
  const isJournal = story.stream === "she-actually-did-it";

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="group h-full"
    >
      <Link to={`${isJournal ? "/stories" : "/the-real-guides"}/${story.slug}`} className="block h-full">
        {isJournal ? (
          // ───────── She Actually Did It (intimate, near-black) ─────────
          <div className="rounded-2xl overflow-hidden card-elevated bg-[hsl(var(--ink))] text-[hsl(var(--ink-foreground))] flex flex-col h-full min-h-[640px]">
            <div className="relative overflow-hidden shrink-0">
              <img
                src={story.image}
                alt={story.title}
                loading="lazy"
                className="w-full h-72 object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            </div>

            <div className="p-7 flex flex-col flex-1">
              {!story.hideStreamLabel && (
                <span className="inline-block self-start px-3 py-1 rounded-full bg-terracotta text-ivory font-label text-[11px] uppercase tracking-[0.18em] font-medium mb-4">
                  She Actually Did It
                </span>
              )}

              <h3 className="font-display text-2xl font-semibold text-ivory mb-3 leading-snug group-hover:text-gold transition-colors">
                {story.title}
              </h3>

              <p className="font-body text-ivory/75 mb-4 leading-relaxed line-clamp-2 italic">
                {story.excerpt}
              </p>

              <div className="flex items-center gap-2 text-ivory/75 mb-4 mt-auto">
                <Calendar className="w-3.5 h-3.5" />
                <span className="font-body text-xs">{story.date}</span>
              </div>

              <span className="inline-flex items-center gap-2 font-body text-sm font-medium text-gold group-hover:gap-3 transition-all">
                Read on
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        ) : (
          // ───────── The View From Here (warm ivory + 3 pills) ─────────
          <>
            <div className="relative overflow-hidden rounded-2xl mb-5 card-elevated bg-surface">
              <img
                src={story.image}
                alt={story.title}
                loading="lazy"
                className="w-full h-72 object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            <div className="flex flex-wrap gap-2 mb-3">
              {story.destination && (
                <span className="px-3 py-1 rounded-full bg-charcoal text-ivory font-label text-[10px] uppercase tracking-[0.16em] font-medium">
                  {story.destination}
                </span>
              )}
              {story.topic && (
                <span className="px-3 py-1 rounded-full bg-gold text-ivory font-label text-[10px] uppercase tracking-[0.16em] font-medium">
                  {story.topic}
                </span>
              )}
              {story.readerNeed && (
                <span className="px-3 py-1 rounded-full bg-terracotta text-ivory font-label text-[10px] uppercase tracking-[0.16em] font-medium">
                  {story.readerNeed}
                </span>
              )}
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
          </>
        )}
      </Link>
    </motion.article>
  );
};

export default StoryCard;
