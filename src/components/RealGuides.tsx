import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import destMadrid from "@/assets/dest-madrid.jpg";
import destParis from "@/assets/dest-paris.jpg";
import destLondon from "@/assets/dest-london.jpg";
import destSenegal from "@/assets/dest-senegal.jpg";

const destinations = [
  { name: "Madrid", image: destMadrid, count: "5 guides", comingSoon: false },
  { name: "Paris", image: destParis, count: "Coming Soon", comingSoon: true },
  { name: "London", image: destLondon, count: "Coming Soon", comingSoon: true },
  { name: "Senegal", image: destSenegal, count: "Coming Soon", comingSoon: true },
];

const RealGuides = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <span className="block w-full h-px bg-gold/30 mb-16" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="label-eyebrow">The Real Guides</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-charcoal mt-4 mb-4">
            The Practical Stuff. Honestly.
          </h2>
          <p className="font-body text-charcoal/70 max-w-2xl mx-auto leading-relaxed">
            Need to know what to pack, how the airport works, or what nobody tells you before you go?
            It is all here. Written from actual experience. No fluff.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((dest, i) => (
            <motion.div
              key={dest.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link
                to={`/stories?destination=${dest.name}`}
                className="relative block overflow-hidden rounded-xl aspect-[4/5] group"
              >
                <img
                  src={dest.image}
                  alt={dest.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-charcoal/30 group-hover:bg-gold/20 transition-colors duration-300" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <h3 className="font-display text-3xl font-bold text-ivory mb-3">
                    {dest.name}
                  </h3>
                  <span
                    className={`px-4 py-1.5 rounded-full text-xs font-label font-medium uppercase tracking-wider ${
                      dest.comingSoon
                        ? "bg-terracotta text-ivory"
                        : "bg-ivory text-charcoal"
                    }`}
                  >
                    {dest.count}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link to="/the-real-guides" className="btn-gold">
            Browse All Guides
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RealGuides;
