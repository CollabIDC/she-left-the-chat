import { motion } from "framer-motion";
import { Play, Youtube } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const featured = {
  title: "A Day in My Life in Madrid",
  thumbnail:
    "https://images.unsplash.com/photo-1509840841025-9088ba78a826?w=1400&q=80",
  youtubeId: "dQw4w9WgXcQ", // PLACEHOLDER
};

const more = [
  {
    title: "Apartment Tour: My Spanish Home",
    thumbnail:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=900&q=80",
    youtubeId: "dQw4w9WgXcQ",
    duration: "8:45",
  },
  {
    title: "Weekend Trip to Toledo",
    thumbnail:
      "https://images.unsplash.com/photo-1578912996078-305d92249aa6?w=900&q=80",
    youtubeId: "dQw4w9WgXcQ",
    duration: "15:22",
  },
];

const VideoSection = () => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <section className="py-24 bg-ink">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="label-eyebrow">Video Diary</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-ivory mt-4">
            Watch My Adventures
          </h2>
          <p className="font-body text-ivory/70 mt-4 max-w-2xl mx-auto">
            Vlogs, travel guides, and behind the scenes moments of expat life.
          </p>
        </motion.div>

        {/* Featured video */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <div className="relative aspect-video rounded-3xl overflow-hidden card-elevated">
            {activeVideo ? (
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`}
                title="YouTube video"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <button
                type="button"
                onClick={() => setActiveVideo(featured.youtubeId)}
                className="group block w-full h-full text-left"
                aria-label={`Play ${featured.title}`}
              >
                <img
                  src={featured.thumbnail}
                  alt={featured.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-charcoal/40 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-gold flex items-center justify-center transition-transform group-hover:scale-110">
                    <Play
                      className="w-8 h-8 text-charcoal ml-1"
                      fill="currentColor"
                    />
                  </div>
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-ivory">
                    {featured.title}
                  </h3>
                </div>
              </button>
            )}
          </div>
        </motion.div>

        {/* Two thumbnails */}
        <div className="grid sm:grid-cols-2 gap-6">
          {more.map((video, index) => (
            <motion.button
              key={video.title}
              type="button"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => setActiveVideo(video.youtubeId)}
              className="group text-left"
            >
              <div className="relative aspect-video rounded-2xl overflow-hidden card-elevated mb-4">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-charcoal/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-gold flex items-center justify-center">
                    <Play
                      className="w-6 h-6 text-charcoal ml-0.5"
                      fill="currentColor"
                    />
                  </div>
                </div>
                <div className="absolute bottom-3 right-3 px-2 py-1 bg-charcoal/80 rounded text-xs font-body text-ivory">
                  {video.duration}
                </div>
              </div>
              <h4 className="font-display text-lg font-semibold text-ivory group-hover:text-gold transition-colors">
                {video.title}
              </h4>
            </motion.button>
          ))}
        </div>

        <div className="mt-12 text-center space-y-4">
          <a
            href="https://youtube.com/@shelefthechat"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold"
          >
            <Youtube className="w-5 h-5" />
            Subscribe on YouTube
          </a>
          <div>
            <Link
              to="/videos"
              className="inline-block font-body text-sm font-medium text-terracotta hover:text-gold transition-colors"
            >
              Watch All Videos →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
