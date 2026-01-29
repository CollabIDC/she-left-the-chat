import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";

const stories = [
  {
    id: 1,
    title: "Finding Home in a Foreign City",
    excerpt: "What it really means to build a life somewhere entirely new, one cafe at a time.",
    date: "January 2025",
    category: "Life Abroad",
    image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800&q=80",
  },
  {
    id: 2,
    title: "The Art of Getting Lost",
    excerpt: "Some of the best adventures happen when you throw away the map and just wander.",
    date: "December 2024",
    category: "Adventures",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
  },
  {
    id: 3,
    title: "Madrid's Hidden Gems",
    excerpt: "The secret spots the locals know about that most tourists will never find.",
    date: "November 2024",
    category: "Travel Tips",
    image: "https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=800&q=80",
  },
];

const FeaturedStories = () => {
  return (
    <section id="stories" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-body text-sm font-medium text-primary uppercase tracking-widest">
            Latest Stories
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-4">
            From My Journal
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story, index) => (
            <motion.article
              key={story.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-2xl mb-6 card-elevated">
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-background/90 backdrop-blur-sm rounded-full font-body text-xs font-medium text-foreground">
                    {story.category}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-muted-foreground mb-3">
                <Calendar className="w-4 h-4" />
                <span className="font-body text-sm">{story.date}</span>
              </div>

              <h3 className="font-display text-2xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                {story.title}
              </h3>

              <p className="font-body text-muted-foreground mb-4 leading-relaxed">
                {story.excerpt}
              </p>

              <div className="flex items-center gap-2 font-body text-sm font-medium text-primary group-hover:gap-3 transition-all">
                Read more
                <ArrowRight className="w-4 h-4" />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedStories;
