import { motion } from "framer-motion";
import { Play, Youtube } from "lucide-react";
import { useState } from "react";

const videos = [
  {
    id: 1,
    title: "A Day in My Life in Madrid",
    thumbnail: "https://images.unsplash.com/photo-1509840841025-9088ba78a826?w=800&q=80",
    youtubeId: "dQw4w9WgXcQ", // Placeholder - replace with actual video ID
    duration: "12:34",
  },
  {
    id: 2,
    title: "Apartment Tour: My Spanish Home",
    thumbnail: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
    youtubeId: "dQw4w9WgXcQ",
    duration: "8:45",
  },
  {
    id: 3,
    title: "Weekend Trip to Toledo",
    thumbnail: "https://images.unsplash.com/photo-1578912996078-305d92249aa6?w=800&q=80",
    youtubeId: "dQw4w9WgXcQ",
    duration: "15:22",
  },
];

const VideoSection = () => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <section id="videos" className="py-24 bg-card">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-body text-sm font-medium text-primary uppercase tracking-widest">
            Video Diary
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-4">
            Watch My Adventures
          </h2>
          <p className="font-body text-muted-foreground mt-4 max-w-2xl mx-auto">
            Come along with me through vlogs, travel guides, and behind-the-scenes moments of expat life.
          </p>
        </motion.div>

        {/* Featured Video */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
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
              <>
                <img
                  src={videos[0].thumbnail}
                  alt={videos[0].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-foreground/30 flex items-center justify-center">
                  <button
                    onClick={() => setActiveVideo(videos[0].youtubeId)}
                    className="w-20 h-20 rounded-full bg-primary flex items-center justify-center transition-transform hover:scale-110"
                  >
                    <Play className="w-8 h-8 text-primary-foreground ml-1" fill="currentColor" />
                  </button>
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground">
                    {videos[0].title}
                  </h3>
                </div>
              </>
            )}
          </div>
        </motion.div>

        {/* Video Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.slice(1).map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer"
              onClick={() => setActiveVideo(video.youtubeId)}
            >
              <div className="relative aspect-video rounded-2xl overflow-hidden card-elevated mb-4">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-foreground/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center">
                    <Play className="w-6 h-6 text-primary-foreground ml-0.5" fill="currentColor" />
                  </div>
                </div>
                <div className="absolute bottom-3 right-3 px-2 py-1 bg-foreground/80 rounded text-xs font-body text-primary-foreground">
                  {video.duration}
                </div>
              </div>
              <h4 className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                {video.title}
              </h4>
            </motion.div>
          ))}
        </div>

        {/* YouTube Subscribe CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 text-center"
        >
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-full font-body font-medium transition-all hover:shadow-lg hover:scale-105"
          >
            <Youtube className="w-5 h-5" />
            Subscribe on YouTube
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default VideoSection;
