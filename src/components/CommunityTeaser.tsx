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
            You're Not the Only One Dreaming of This Life
          </h2>
          <p className="font-body text-charcoal/75 leading-relaxed text-lg mb-8">
            There's a whole community of women doing exactly what you're
            thinking about. Moving abroad, starting over, choosing themselves.
            Something special is being built for you. Get on the list and be
            the first to know.
          </p>
          {/* PLACEHOLDER community URL — swap for real Mighty Networks link */}
          <a
            href="https://mightynetworks.com/?placeholder=shelefthechat"
            target="_blank"
            rel="noopener noreferrer"
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
