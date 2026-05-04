import { motion } from "framer-motion";

const MantraSection = () => {
  return (
    <section className="bg-ink py-28 md:py-36">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          <span className="block w-24 h-px bg-gold mx-auto mb-12" />
          <p className="font-display italic text-2xl md:text-4xl lg:text-5xl leading-snug text-ivory">
            "Spain has not changed. I am the one adapting."
          </p>
          <span className="block w-24 h-px bg-gold mx-auto mt-12" />
        </motion.div>
      </div>
    </section>
  );
};

export default MantraSection;
