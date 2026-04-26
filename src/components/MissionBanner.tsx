import { motion } from "framer-motion";

const MissionBanner = () => {
  return (
    <section className="bg-ink py-24 md:py-28">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          <span className="block w-24 h-px bg-gold mx-auto mb-10" />
          <p className="font-display italic text-2xl md:text-4xl leading-snug text-ivory">
            “The most powerful thing I ever did was decide that my story wasn't
            finished yet.”
          </p>
          <span className="block w-24 h-px bg-gold mx-auto mt-10" />
        </motion.div>
      </div>
    </section>
  );
};

export default MissionBanner;
