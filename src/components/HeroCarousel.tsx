import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-madrid.jpg";
import slideCobblestone from "@/assets/slide-cobblestone.jpg";
import slideBookstore from "@/assets/slide-bookstore.jpg";
import slideRooftops from "@/assets/slide-rooftops.jpg";
import slideMarket from "@/assets/slide-market.jpg";

interface Slide {
  image: string;
  alt: string;
  content: React.ReactNode;
}

const slides: Slide[] = [
  {
    image: heroImage,
    alt: "Woman with locs in earth tone wrap dress on Madrid balcony overlooking Gran Via",
    content: (
      <div className="max-w-2xl">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/90 backdrop-blur-sm mb-8">
          <MapPin className="w-4 h-4 text-charcoal" />
          <span className="font-label text-xs font-medium uppercase tracking-[0.18em] text-charcoal">
            Currently in Madrid, Spain
          </span>
        </div>
        <h1 className="font-display text-ivory leading-[0.95] mb-6 lowercase">
          <span className="block font-bold text-6xl md:text-7xl lg:text-8xl">she left</span>
          <span className="block italic font-normal text-5xl md:text-6xl lg:text-7xl mt-1">the chat</span>
        </h1>
        <p className="font-body font-light text-base md:text-lg text-ivory/95 max-w-xl mb-10 leading-relaxed">
          From Atlanta to Madrid. Stories of wanderlust, bold choices, and building a life on your own terms. This is what it looks like when you finally choose yourself.
        </p>
        <Link to="/stories/she-actually-did-it" className="btn-gold">
          Read She Actually Did It <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    ),
  },
  {
    image: slideCobblestone,
    alt: "Madrid street at blue hour with deep cool blue sky and warm golden cafe lights",
    content: (
      <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
        <h2 className="font-display italic text-4xl md:text-5xl lg:text-6xl text-ivory leading-tight mb-10">
          "Nobody told me it would be this hard. Nobody told me it would be this good."
        </h2>
        <Link to="/stories" className="btn-gold">
          She Actually Did It <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    ),
  },
  {
    image: slideBookstore,
    alt: "Intimate Madrid bookstore with warm amber lighting",
    content: (
      <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-ivory leading-tight mb-10">
          Some places exist because someone refused to accept they couldn't.
        </h2>
        <Link to="/the-real-guides" className="btn-gold">
          Browse The Real Guides <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    ),
  },
  {
    image: slideRooftops,
    alt: "Madrid rooftops at dusk with city lights and deep amber sky",
    content: (
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="font-display italic text-4xl md:text-5xl lg:text-6xl text-ivory leading-tight">
          "Spain has not changed. I am the one adapting."
        </h2>
      </div>
    ),
  },
  {
    image: slideMarket,
    alt: "Bright outdoor Madrid morning market with fresh produce, flowers, and blue sky",
    content: (
      <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-ivory leading-tight mb-2">
          This is not a travel blog.
        </h2>
        <p className="font-display italic text-3xl md:text-4xl text-ivory/90 mb-10">
          This is what happens after you finally say yes to yourself.
        </p>
        <Link to="/stories" className="btn-gold">
          Read the Stories <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    ),
  },
];

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative overflow-hidden pt-20" style={{ minHeight: 640, height: "calc(100vh - 80px)" }}>

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <img
            src={slides[current].image}
            alt={slides[current].alt}
            width={1920}
            height={1080}
            fetchPriority={current === 0 ? "high" : "auto"}
            decoding="async"
            className={`absolute inset-0 w-full h-full object-cover object-center`}
          />
          {/* Gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: current === 0
                ? "linear-gradient(90deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0) 60%)"
                : "linear-gradient(90deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.25) 40%, rgba(0,0,0,0) 70%)",
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {slides[current].content}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              i === current
                ? "bg-gold scale-110"
                : "bg-ivory/40 hover:bg-ivory/60"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;
