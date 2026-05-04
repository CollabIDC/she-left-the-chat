import { motion } from "framer-motion";

const MantraDivider = () => {
  return (
    <section className="py-10 bg-background">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center font-display italic text-sm md:text-base text-terracotta tracking-wide"
      >
        Spain has not changed. I am the one adapting.
      </motion.p>
    </section>
  );
};

export default MantraDivider;
