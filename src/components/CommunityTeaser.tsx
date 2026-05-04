import { motion } from "framer-motion";

const CommunityTeaser = () => {
  return (
    <section className="py-24 bg-blush">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <span className="label-eyebrow">Coming Soon</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-charcoal mt-4 mb-6 leading-tight">
            You Are Not the Only One Who Feels This Way.
          </h2>
          <p className="font-body text-charcoal/75 leading-relaxed text-lg mb-8">
            There is a whole community of people doing exactly what you are thinking about.
            Starting over. Choosing themselves. Something special is being built. Get on the
            list and be the first to know.
          </p>
          {/* PLACEHOLDER community URL — swap for real link */}
          <a
            href="#email-signup"
            className="btn-gold"
          >
            Notify Me
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default CommunityTeaser;
