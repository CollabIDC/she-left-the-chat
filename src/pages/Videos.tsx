import { motion } from "framer-motion";
import { Play, Youtube } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import Seo from "@/components/Seo";

const videos = [
  { title: "A Day in My Life in Madrid", thumb: "https://images.unsplash.com/photo-1509840841025-9088ba78a826?w=900&q=80", duration: "12:34" },
  { title: "Apartment Tour: My Spanish Home", thumb: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=900&q=80", duration: "8:45" },
  { title: "Weekend Trip to Toledo", thumb: "https://images.unsplash.com/photo-1578912996078-305d92249aa6?w=900&q=80", duration: "15:22" },
  { title: "How I Found My Madrid Apartment", thumb: "https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=900&q=80", duration: "10:12" },
  { title: "Tapas Crawl in La Latina", thumb: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=80", duration: "9:30" },
  { title: "What I Eat in a Week in Spain", thumb: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80", duration: "11:48" },
];

const Videos = () => {
  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Madrid vlogs and city videos by Kimberly"
        description="Day-in-the-life vlogs, apartment tours, and short city guides from Madrid and nearby weekend trips."
        path="/videos"
      />
      <Navbar />
      <main>
        <PageHeader
          eyebrow="Video Diary"
          title="Watch My Adventures"
          subtitle="Real moments from the First 60 Days. Life on my own terms in Madrid."
        />

        <section className="bg-background pb-24" aria-labelledby="videos-heading">
          <div className="container mx-auto px-6">
            <h2 id="videos-heading" className="sr-only">All videos</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {videos.map((v, i) => (
                <motion.a
                  // PLACEHOLDER YouTube link
                  href="https://youtube.com/@shelefthechat"
                  target="_blank"
                  rel="noopener noreferrer"
                  key={v.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  className="group block"
                >
                  <div className="relative aspect-video rounded-2xl overflow-hidden card-elevated mb-4">
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

            <div className="text-center mt-16">
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
      </main>
      <Footer />
    </div>
  );
};

export default Videos;
