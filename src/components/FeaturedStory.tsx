import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import featuredImage from "@/assets/featured-bookstore.jpg";

const FeaturedStory = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-stretch">
          {/* Image — 55% */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7"
          >
            <div className="relative overflow-hidden rounded-xl h-full min-h-[400px]">
              <img
                src={featuredImage}
                alt="Warm bookstore interior with amber lighting"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Copy — 45% */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 flex flex-col justify-center py-4"
          >
            <span className="label-eyebrow mb-3">Featured Story</span>
            <span className="inline-block self-start px-4 py-1.5 rounded-full text-xs font-label font-medium uppercase tracking-wider bg-gold text-ivory mb-6">
              The Real Guide
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal mb-6 leading-tight">
              The Bookstore That Exists Because of a Love Story
            </h2>
            <blockquote className="border-l-[3px] border-gold pl-5 mb-6">
              <p className="font-display italic text-lg md:text-xl text-charcoal/80 leading-relaxed">
                "They did not open a bookstore. They built a home for people who needed one."
              </p>
            </blockquote>
            <p className="font-body text-charcoal/70 leading-relaxed mb-8">
              Inside Secret Kingdoms, the English language bookstore in Madrid that a British-Spanish couple built for a community that did not know it needed them yet.
            </p>
            <Link
              to="/stories/the-bookstore-that-exists-because-of-a-love-story"
              className="btn-gold self-start"
            >
              Read the Full Story <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedStory;
