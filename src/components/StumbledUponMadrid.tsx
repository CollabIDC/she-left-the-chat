import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Store, MapPin, Building2, Eye, Lock, Compass } from "lucide-react";
import { stories } from "@/data/stories";
import featuredBookstore from "@/assets/featured-bookstore.jpg";

const angles = [
  {
    icon: Store,
    name: "The Unexpected Business",
    description: "The hidden shops, studios, and passion projects locals built from scratch.",
  },
  {
    icon: MapPin,
    name: "While You Are There",
    description: "The things worth doing once you have actually arrived.",
  },
  {
    icon: Building2,
    name: "Old Madrid",
    description: "The history, architecture, and traditions that shaped the city.",
  },
  {
    icon: Eye,
    name: "Through a Black Lens",
    description: "Seeing Madrid through a perspective rarely written about.",
  },
  {
    icon: Lock,
    name: "Only Locals Know",
    description: "The places, customs, and secrets you will not find in any guidebook.",
  },
  {
    icon: Compass,
    name: "Things to Do",
    description: "Curated activities, day trips, and experiences worth your time.",
  },
];

const anim = (i: number) => ({
  initial: { opacity: 0, y: 20 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true },
  transition: { duration: 0.5, delay: i * 0.08 },
});

const StumbledUponMadrid = () => {
  const bookstoreStory = stories.find(
    (s) => s.slug === "the-bookstore-that-exists-because-of-a-love-story"
  )!;

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div {...anim(0)} className="text-center mb-16">
          <span className="label-eyebrow">Stumbled Upon Madrid</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-charcoal mt-4 mb-2 leading-tight">
            The Most Interesting Stories in Madrid Are the Ones Nobody Is Writing About.
          </h2>
          <p className="font-display italic text-2xl md:text-3xl text-charcoal/70">
            Until now.
          </p>
        </motion.div>

        {/* Angle cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {angles.map((angle, i) => {
            const Icon = angle.icon;
            return (
              <motion.div
                key={angle.name}
                {...anim(i + 1)}
                className="bg-surface rounded-xl p-8 card-elevated"
              >
                <Icon className="w-7 h-7 text-gold mb-4" />
                <h3 className="font-display text-lg font-bold text-charcoal mb-2">
                  {angle.name}
                </h3>
                <p className="font-body text-charcoal/70 text-sm leading-relaxed">
                  {angle.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Featured bookstore story */}
        <motion.div {...anim(7)}>
          <Link
            to={`/stories/${bookstoreStory.slug}`}
            className="block bg-ink rounded-xl overflow-hidden group"
          >
            <div className="grid md:grid-cols-2">
              <div className="aspect-[16/10] md:aspect-auto overflow-hidden">
                <img
                  src={featuredBookstore}
                  alt="Warm bookstore interior with amber lighting"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-8 md:p-10 flex flex-col justify-center">
                <span className="inline-block self-start px-3 py-1 rounded-full text-xs font-label font-medium uppercase tracking-wider bg-gold text-ivory mb-4">
                  The Unexpected Business
                </span>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-ivory mb-4 leading-tight group-hover:text-gold transition-colors">
                  {bookstoreStory.title}
                </h3>
                {bookstoreStory.pullQuote && (
                  <blockquote className="border-l-[3px] border-gold pl-5 mb-4">
                    <p className="font-display italic text-lg text-ivory/80 leading-relaxed">
                      "{bookstoreStory.pullQuote}"
                    </p>
                  </blockquote>
                )}
                <p className="font-body text-ivory/70 leading-relaxed mb-6 text-sm">
                  {bookstoreStory.excerpt}
                </p>
                <span className="inline-flex items-center gap-2 font-body text-sm text-gold group-hover:gap-3 transition-all">
                  Read the Full Story <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default StumbledUponMadrid;
