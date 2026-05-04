import { motion } from "framer-motion";

const statements = [
  "Real stories. Not highlight reels.",
  "Practical guides written from actual experience.",
  "A community for people who are done waiting.",
];

const SocialProofStrip = () => {
  return (
    <section className="py-12 bg-background">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-6"
      >
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0">
          {statements.map((s, i) => (
            <div key={i} className="flex items-center">
              {i > 0 && (
                <span className="hidden md:block w-1.5 h-1.5 rounded-full bg-gold mx-6" />
              )}
              <p className="font-display italic text-sm md:text-base text-charcoal text-center">
                {s}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default SocialProofStrip;
