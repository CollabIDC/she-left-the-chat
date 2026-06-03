import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const angles = [
  {
    emoji: "🏪",
    name: "The Unexpected Business",
    description: "The shops, restaurants, and people doing something remarkable in plain sight.",
  },
  {
    emoji: "🚶",
    name: "While You Are There",
    description: "Experiences you will only find if someone who actually lives here tells you.",
  },
  {
    emoji: "⏳",
    name: "Old Madrid",
    description: "The deep traditions, the tabernas, the things that have not changed in a hundred years.",
  },
  {
    emoji: "👁️",
    name: "Through a Black Lens",
    description: "Madrid through my eyes. My perspective, my experience, my community.",
  },
  {
    emoji: "🗺️",
    name: "Only Locals Know",
    description: "The places, the shortcuts, the tips that never make the tourist lists.",
  },
  {
    emoji: "🎟️",
    name: "Things to Do",
    description: "Curated, honest, written from real experience. No affiliate fluff.",
  },
];

const anim = (i: number) => ({
  initial: { opacity: 0, y: 20 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true },
  transition: { duration: 0.5, delay: i * 0.08 },
});

const StumbledUponMadrid = () => {
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {angles.map((angle, i) => (
            <Link to="/stumbled-upon" key={angle.name} className="block">
              <motion.div
                {...anim(i + 1)}
                className="rounded-xl p-8 cursor-pointer transition-shadow hover:shadow-lg"
                style={{ border: "1.5px solid #D4A843", backgroundColor: "#F5EDD8" }}
              >
                <span className="text-4xl mb-4 block leading-none">{angle.emoji}</span>
                <h3 className="font-display text-lg font-bold mb-2" style={{ color: "#2C1810" }}>
                  {angle.name}
                </h3>
                <p className="font-body text-sm leading-relaxed" style={{ color: "#8A7D72" }}>
                  {angle.description}
                </p>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StumbledUponMadrid;
