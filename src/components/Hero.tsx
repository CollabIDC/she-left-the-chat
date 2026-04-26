import { motion } from "framer-motion";
import { MapPin, ArrowDown } from "lucide-react";
import heroImage from "@/assets/hero-madrid.jpg";

const Hero = () => {
  return (
    <section
      id="home"
      className="hero-overlay relative h-screen flex items-center overflow-hidden"
    >
      {/* Background image (untouched) */}
      <img
        src={heroImage}
        alt="Woman in a champagne gown overlooking Madrid at golden hour"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Content — left aligned over the gradient area */}
      <div className="relative z-10 container mx-auto px-6 pt-24 pb-20">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/90 backdrop-blur-sm mb-8"
          >
            <MapPin className="w-4 h-4 text-charcoal" />
            <span className="font-label text-xs font-medium uppercase tracking-[0.18em] text-charcoal">
              Currently in Madrid, Spain
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="font-display text-ivory leading-[0.95] mb-6 lowercase"
          >
            <span className="block font-bold text-6xl md:text-7xl lg:text-8xl">
              she left
            </span>
            <span className="block italic font-normal text-5xl md:text-6xl lg:text-7xl mt-1">
              the chat
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="font-body font-light text-base md:text-lg text-ivory/95 max-w-xl mb-10 leading-relaxed"
          >
            From Atlanta to Madrid. Stories of wanderlust, bold choices, and
            building a life on your own terms. This is what it looks like when
            you finally choose yourself.
          </motion.p>

          <motion.a
            href="#latest-stories"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            className="btn-gold"
          >
            Explore My Journey
            <ArrowDown className="w-4 h-4" />
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
