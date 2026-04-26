import { motion } from "framer-motion";
import { useState, FormEvent } from "react";
import { toast } from "sonner";

interface EmailSignupProps {
  variant?: "cream" | "white";
}

const EmailSignup = ({ variant = "cream" }: EmailSignupProps) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // Placeholder — wire up to Lovable Cloud / email provider later
    toast.success("You're on the list! Check your inbox soon.");
    setEmail("");
  };

  return (
    <section className={variant === "cream" ? "bg-background" : "bg-surface"}>
      <div className="container mx-auto px-6 py-20 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          {/* Top divider */}
          <span className="block w-20 h-px bg-gold mx-auto mb-10" />

          <h2 className="font-display text-4xl md:text-5xl font-bold text-charcoal mb-4">
            Come Travel With Me
          </h2>
          <p className="font-body text-charcoal/70 leading-relaxed mb-8">
            Get stories, travel tips, and honest expat updates delivered straight to your inbox.
            No spam. Just the good stuff.
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="flex-1 px-5 py-3 rounded-full border border-border bg-surface text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:border-gold transition-colors font-body"
              aria-label="Email address"
            />
            <button type="submit" className="btn-gold whitespace-nowrap">
              Join the Journey
            </button>
          </form>

          <p className="font-body italic text-sm text-charcoal/60 mt-5">
            Join 500+ women already on the list.
          </p>

          {/* Bottom divider */}
          <span className="block w-20 h-px bg-gold mx-auto mt-10" />
        </motion.div>
      </div>
    </section>
  );
};

export default EmailSignup;
