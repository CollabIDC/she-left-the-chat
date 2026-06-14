import { motion } from "framer-motion";

const EmailSignup = () => {
  return (
    <section id="email-signup" className="bg-background">
      <div className="container mx-auto px-6 py-20 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <span className="block w-20 h-px bg-gold mx-auto mb-10" />
          <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal mb-4">
            Want Dispatches From the Other Side of the Decision?
          </h2>
          <p className="font-body text-charcoal/70 leading-relaxed mb-8">
            Real stories, honest guides, and the occasional moment that will make you think. Delivered straight to your inbox. No spam. Just the good stuff.
          </p>
          <div data-beehiiv-form="f240edd9-7a0b-41ac-87f0-9a679b86d47d" className="max-w-md mx-auto" />
          <span className="block w-20 h-px bg-gold mx-auto mt-10" />
        </motion.div>
      </div>
    </section>
  );
};

export default EmailSignup;
