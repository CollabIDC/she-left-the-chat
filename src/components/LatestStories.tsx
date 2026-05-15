import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { stories } from "@/data/stories";
import journalNight from "@/assets/journal-night-window.png";

const LatestStories = () => {
  const nowWhat = stories.find((s) => s.slug === "now-what-what-nobody-tells-you-about-after")!;
  const sheDidIt = stories.find((s) => s.slug === "she-actually-did-it")!;

  const journalCards = [
    { story: nowWhat, image: nowWhat.image, alt: "Woman at a Madrid balcony window with her dog at her feet" },
    { story: sheDidIt, image: sheDidIt.image, alt: "She Actually Did It hero" },
  ];

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
            The Stories Nobody Else Is Telling
          </h2>
          <p className="font-display italic text-xl md:text-2xl text-charcoal/60">
            Raw. Real. Written from inside the decision.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {journalCards.map((card, i) => (
            <motion.div
              key={card.story.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link
                to={`${card.story.stream === "she-actually-did-it" ? "/stories" : "/the-real-guides"}/${card.story.slug}`}
                className="block bg-ink rounded-xl overflow-hidden h-full group transition-all duration-300 hover:shadow-lg"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.alt}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-8 md:p-10">
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-ivory mb-4 leading-tight group-hover:text-gold transition-colors">
                    {card.story.title}
                  </h3>
                  <p className="font-body text-ivory/70 leading-relaxed mb-6">
                    {card.story.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-2 font-body text-sm text-gold group-hover:gap-3 transition-all">
                    Read the Entry <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestStories;
