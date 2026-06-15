import { motion } from "framer-motion";
import { useState } from "react";

const EmailSignup = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) return;

    const KIT_API_KEY = "uHPgFjP4zNw77Q2Kqh6JlQ";
    const KIT_FORM_ID = "9568035";

    try {
      await fetch("https://api.kit.com/v4/subscribers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Kit-Api-Key": KIT_API_KEY,
        },
        body: JSON.stringify({ email_address: email }),
      });

      await fetch(`https://api.kit.com/v4/forms/${KIT_FORM_ID}/subscribers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Kit-Api-Key": KIT_API_KEY,
        },
        body: JSON.stringify({ email_address: email }),
      });

      setSubmitted(true);
    } catch (error) {
      console.error("Subscription error:", error);
      setSubmitted(true);
    }
  };

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

          {submitted ? (
            <p className="font-body text-charcoal/80 text-lg">
              You're on the list. Check your inbox.
            </p>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="max-w-md mx-auto flex flex-col sm:flex-row gap-3"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="flex-1 px-4 py-3 border border-charcoal/20 rounded-md font-body text-charcoal bg-white focus:outline-none focus:border-gold"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-gold text-white font-body font-medium rounded-md hover:bg-gold/90 transition-colors"
              >
                Subscribe
              </button>
            </form>
          )}

          <span className="block w-20 h-px bg-gold mx-auto mt-10" />
        </motion.div>
      </div>
    </section>
  );
};

export default EmailSignup;
