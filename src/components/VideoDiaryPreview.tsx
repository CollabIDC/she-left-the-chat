import { motion } from "framer-motion";
import { Play, Youtube } from "lucide-react";
import { useState, FormEvent } from "react";
import { toast } from "sonner";

const videos = [
  { title: "A Day in My Life in Madrid", thumb: "https://images.unsplash.com/photo-1509840841025-9088ba78a826?w=900&q=80", duration: "12:34" },
  { title: "Apartment Tour: My Spanish Home", thumb: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=900&q=80", duration: "8:45" },
  { title: "Weekend Trip to Toledo", thumb: "https://images.unsplash.com/photo-1578912996078-305d92249aa6?w=900&q=80", duration: "15:22" },
];

const anim = (i: number) => ({
  initial: { opacity: 0, y: 20 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true },
  transition: { duration: 0.5, delay: i * 0.08 },
});

const VideoDiaryPreview = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success("You'll be first to know when new videos drop!");
    setEmail("");
  };

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div {...anim(0)} className="text-center mb-16">
          <span className="label-eyebrow">Video Diary</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-charcoal mt-4 mb-4">
            Watch My Adventures
          </h2>
          <p className="font-body text-charcoal/70 max-w-2xl mx-auto leading-relaxed">
            Real moments from the First 60 Days. Life on my own terms in Madrid.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-14">
          {videos.map((v, i) => (
            <motion.a
              href="https://youtube.com/@shelefthechat"
              target="_blank"
              rel="noopener noreferrer"
              key={v.title}
              {...anim(i + 1)}
              className="group block"
            >
              <div className="relative aspect-video rounded-xl overflow-hidden card-elevated mb-4">
                <img
                  src={v.thumb}
                  alt={v.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-charcoal/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-gold flex items-center justify-center">
                    <Play className="w-6 h-6 text-charcoal ml-0.5" fill="currentColor" />
                  </div>
                </div>
                <div className="absolute bottom-3 right-3 px-2 py-1 bg-charcoal/80 rounded text-xs font-body text-ivory">
                  {v.duration}
                </div>
              </div>
              <h3 className="font-display text-lg font-semibold text-charcoal group-hover:text-terracotta transition-colors">
                {v.title}
              </h3>
            </motion.a>
          ))}
        </div>

        {/* Coming soon email capture */}
        <motion.div {...anim(4)} className="max-w-lg mx-auto text-center bg-surface rounded-2xl p-8 card-elevated mb-10">
          <p className="font-display italic text-lg text-charcoal mb-2">New episodes coming soon</p>
          <p className="font-body text-charcoal/60 text-sm mb-6">
            Get notified when new videos drop.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="flex-1 px-5 py-3 rounded-full border border-border bg-background text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:border-gold transition-colors font-body"
              aria-label="Email for video updates"
            />
            <button type="submit" className="btn-gold whitespace-nowrap">
              Notify Me
            </button>
          </form>
        </motion.div>

        <div className="text-center">
          <a
            href="https://youtube.com/@shelefthechat"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold"
          >
            <Youtube className="w-5 h-5" />
            Subscribe on YouTube
          </a>
        </div>
      </div>
    </section>
  );
};

export default VideoDiaryPreview;
