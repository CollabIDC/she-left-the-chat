import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import portrait from "@/assets/portrait-kimberly.jpg";

const AboutTeaser = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-3xl card-elevated">
              <img
                src={portrait}
                alt="Portrait of Kimberly"
                className="w-full aspect-[4/5] object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gold/30 rounded-2xl -z-10" />
          </motion.div>

          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="label-eyebrow">About Me</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-charcoal mt-4 mb-6 leading-tight">
              Hey, I'm the one who left the chat.
            </h2>
            <p className="font-body text-charcoal/75 leading-relaxed text-lg mb-8">
              One day I decided the 9 to 5 wasn't enough anymore. I packed my
              bags, bought a one way ticket to Spain, and never looked back.
              Now I'm living in the heart of Madrid, figuring out life one
              adventure at a time. And I'm sharing every messy, magical moment
              of it here.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 font-body font-medium text-gold border-b border-gold pb-1 hover:text-gold-deep hover:border-gold-deep transition-colors"
            >
              Read My Full Story
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutTeaser;
