import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const languages = [
  { name: "Spanish", flag: "🇪🇸", description: "Essential phrases and conversation tools for life in Spain." },
  { name: "French", flag: "🇫🇷", description: "Get started with everyday French before your trip to Paris." },
  { name: "Italian", flag: "🇮🇹", description: "Basic Italian for travelers exploring beyond the tourist path." },
  { name: "Portuguese", flag: "🇵🇹", description: "Practical Portuguese for navigating Lisbon and beyond." },
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
            Everything You Need to Actually Make the Move
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto mb-12">
          {languages.map((lang, i) => (
            <motion.div
              key={lang.name}
              {...anim(i + 1)}
              className="bg-ivory/5 border border-ivory/10 rounded-xl p-8 text-center"
            >
              <span className="text-5xl mb-4 block">{lang.flag}</span>
              <h3 className="font-display text-xl font-bold text-ivory mb-2">
                {lang.name}
              </h3>
              <p className="font-body text-ivory/60 text-sm leading-relaxed mb-6">
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

        <motion.div {...anim(5)} className="text-center">
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
