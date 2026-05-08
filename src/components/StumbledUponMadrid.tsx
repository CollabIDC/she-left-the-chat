import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Store, PersonStanding, Clock, Eye, Map, Ticket } from "lucide-react";
import { stories } from "@/data/stories";
import featuredBookstore from "@/assets/featured-bookstore.jpg";

const angles = [
  {
    icon: Store,
    name: "The Unexpected Business",
    description: "The shops, restaurants, and people doing something remarkable in plain sight.",
    iconColor: "#C5A028",
    iconBg: "#FFF8E7",
  },
  {
    icon: PersonStanding,
    name: "While You Are There",
    description: "Experiences you will only find if someone who actually lives here tells you.",
    iconColor: "#B05A3A",
    iconBg: "#FDF0EA",
  },
  {
    icon: Clock,
    name: "Old Madrid",
    description: "The deep traditions, the tabernas, the things that have not changed in a hundred years.",
    iconColor: "#4a7c59",
    iconBg: "#EEF5F1",
  },
  {
    icon: Eye,
    name: "Through a Black Lens",
    description: "Madrid through my eyes. My perspective, my experience, my community.",
    iconColor: "#5a4a8a",
    iconBg: "#F0EEF8",
  },
  {
    icon: Map,
    name: "Only Locals Know",
    description: "The places, the shortcuts, the tips that never make the tourist lists.",
    iconColor: "#c4603a",
    iconBg: "#FDF0EA",
  },
  {
    icon: Ticket,
    name: "Things to Do",
    description: "Curated, honest, written from real experience. No affiliate fluff.",
    iconColor: "#2a6b8a",
    iconBg: "#EAF3F8",
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
            The most interesting stories in Madrid are the ones nobody is writing about.
          </h2>
          <p className="font-display italic text-2xl md:text-3xl text-charcoal/70">
            Until now.
          </p>
          <span className="block w-20 h-px bg-gold mx-auto mt-6" />
        </motion.div>

        {/* Angle cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {angles.map((angle, i) => {
            const Icon = angle.icon;
            return (
              <Link to="/she-actually-did-it" key={angle.name} className="block">
                <motion.div
                  {...anim(i + 1)}
                  className="bg-surface rounded-xl p-8 card-elevated cursor-pointer hover:shadow-lg transition-shadow"
                >
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: angle.iconBg }}>
                    <Icon className="w-6 h-6" style={{ color: angle.iconColor }} />
                  </div>
                  <h3 className="font-display text-lg font-bold text-charcoal mb-2">
                    {angle.name}
                  </h3>
                  <p className="font-body text-charcoal/70 text-sm leading-relaxed">
                    {angle.description}
                  </p>
                </motion.div>
              </Link>
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
                  Inside Secret Kingdoms, the English language bookstore in Madrid that a British-Spanish couple built for a community that did not know it needed them yet.
                </p>
                <span className="inline-flex items-center gap-2 font-body text-sm text-gold group-hover:gap-3 transition-all">
                  Read the Story <ArrowRight className="w-4 h-4" />
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
