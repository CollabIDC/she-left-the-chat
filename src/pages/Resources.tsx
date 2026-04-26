import { motion } from "framer-motion";
import { useState, FormEvent } from "react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";

const tools = [
  {
    flag: "🇪🇸",
    language: "Spanish",
    description: "Order tapas, navigate the metro, and chat with your portera like a local.",
  },
  {
    flag: "🇫🇷",
    language: "French",
    description: "From Paris cafes to Provence markets — confidence in every conversation.",
  },
  {
    flag: "🇮🇹",
    language: "Italian",
    description: "Pronounce the wine list correctly and actually enjoy the dinner.",
  },
  {
    flag: "🇵🇹",
    language: "Portuguese",
    description: "Lisbon, Porto, or Rio — soft accents, warm welcomes, real connection.",
  },
  {
    flag: "🇩🇪",
    language: "German",
    description: "Berlin practical. Bavarian charming. Survival to small talk.",
  },
  {
    flag: "🇯🇵",
    language: "Japanese",
    description: "Polite phrases, train station essentials, and respectful introductions.",
  },
];

const Resources = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success("You'll be the first to know when new tools drop.");
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <PageHeader
          eyebrow="Free Tools"
          title="Your Travel Toolkit"
          subtitle="AI powered language tools built for curious travelers and bold dreamers who want to connect wherever they land. Free to use. No strings attached."
        />

        <section className="bg-background pb-24">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {tools.map((tool, i) => (
                <motion.div
                  key={tool.language}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  className="bg-surface rounded-2xl p-8 card-elevated flex flex-col"
                >
                  <div className="text-5xl mb-4">{tool.flag}</div>
                  <h3 className="font-display text-2xl font-bold text-charcoal mb-2">
                    {tool.language}
                  </h3>
                  <p className="font-body text-charcoal/70 leading-relaxed mb-6 flex-1">
                    {tool.description}
                  </p>
                  {/* PLACEHOLDER GPT URL */}
                  <a
                    href={`https://chat.openai.com/?placeholder=${tool.language.toLowerCase()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold self-start"
                  >
                    Try It Free
                  </a>
                </motion.div>
              ))}
            </div>

            {/* Soft email capture */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl mx-auto mt-20 bg-blush rounded-3xl p-10 text-center"
            >
              <h3 className="font-display text-2xl md:text-3xl font-bold text-charcoal mb-3">
                Want to know when we add new tools?
              </h3>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mt-6"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="flex-1 px-5 py-3 rounded-full border border-charcoal/15 bg-ivory text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:border-gold transition-colors font-body"
                  aria-label="Email address"
                />
                <button type="submit" className="btn-gold whitespace-nowrap">
                  Subscribe
                </button>
              </form>
              <p className="font-body italic text-sm text-charcoal/60 mt-6">
                Powered by AI. Built for travelers who want to actually connect, not just survive.
              </p>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Resources;
