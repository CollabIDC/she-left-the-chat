import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const languages = [
  { name: "Spanish", flag: "🇪🇸", description: "Order tapas, navigate the metro, and chat with your portera like a local." },
  { name: "French", flag: "🇫🇷", description: "From Paris cafes to Provence markets, confidence in every conversation." },
  { name: "Italian", flag: "🇮🇹", description: "Pronounce the wine list correctly and actually enjoy the dinner." },
  { name: "Portuguese", flag: "🇵🇹", description: "Lisbon, Porto, or Rio. Soft accents, warm welcomes, real connection." },
  { name: "Wolof", flag: "🇸🇳", description: "Greet your hosts, navigate Dakar, and connect with the warmth Senegal is known for." },
  { name: "British English", flag: "🇬🇧", description: "Same language. Completely different country. Navigate the culture, the slang, and the unspoken rules." },
];

const anim = (i: number) => ({
  initial: { opacity: 0, y: 20 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true },
  transition: { duration: 0.5, delay: i * 0.1 },
});

const ResourcesPreview = () => {
  return (
    <section className="py-24 bg-ink">
      <div className="container mx-auto px-6">
        <motion.div {...anim(0)} className="text-center mb-16">
          <span className="label-eyebrow text-gold">Resources and Tools</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-ivory mt-4">
            The Resources I Wish I Had Before I Left
          </h2>
          <p className="font-display italic text-xl md:text-2xl text-ivory/80 mt-3">
            Starting with language. More coming soon.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
          {languages.map((lang, i) => (
            <motion.div
              key={lang.name}
              {...anim(i + 1)}
              className="bg-ivory border border-charcoal/10 rounded-xl p-8 text-center"
            >
              <span className="text-5xl mb-4 block">{lang.flag}</span>
              <h3 className="font-display text-xl font-bold text-ink mb-2">
                {lang.name}
              </h3>
              <p className="font-body text-ink/60 text-sm leading-relaxed mb-6">
                {lang.description}
              </p>
              <Link
                to="/resources"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-gold text-gold text-sm font-label font-medium uppercase tracking-wider hover:bg-gold hover:text-ivory transition-all duration-300"
              >
                Try It Free
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div {...anim(7)} className="text-center">
          <Link
            to="/resources"
            className="inline-flex items-center gap-2 font-body font-medium text-gold border-b border-gold pb-1 hover:text-ivory hover:border-ivory transition-colors"
          >
            Browse All Resources <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ResourcesPreview;
