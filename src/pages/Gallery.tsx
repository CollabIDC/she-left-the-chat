import { motion } from "framer-motion";
import { ZoomIn, X } from "lucide-react";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import Seo from "@/components/Seo";

const photos = [
  { src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80", alt: "Madrid street at sunset", aspect: "aspect-[3/4]" },
  { src: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=1200&q=80", alt: "Cafe interior", aspect: "aspect-[4/3]" },
  { src: "https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=1200&q=80", alt: "Gran Via at night", aspect: "aspect-[4/3]" },
  { src: "https://images.unsplash.com/photo-1509840841025-9088ba78a826?w=1200&q=80", alt: "Retiro Park", aspect: "aspect-[3/4]" },
  { src: "https://images.unsplash.com/photo-1578912996078-305d92249aa6?w=1200&q=80", alt: "Toledo", aspect: "aspect-[3/4]" },
  { src: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80", alt: "Apartment", aspect: "aspect-[4/3]" },
  { src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80", alt: "Tapas spread", aspect: "aspect-[4/3]" },
  { src: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80", alt: "Old door detail", aspect: "aspect-[3/4]" },
  { src: "https://images.unsplash.com/photo-1473773508845-188df298d2d1?w=1200&q=80", alt: "Train window", aspect: "aspect-[3/4]" },
  { src: "https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=1200&q=80", alt: "Plaza Mayor", aspect: "aspect-[4/3]" },
  { src: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&q=80", alt: "Paris detour", aspect: "aspect-[3/4]" },
  { src: "https://images.unsplash.com/photo-1493558103817-58b2924bce98?w=1200&q=80", alt: "Mediterranean coast", aspect: "aspect-[4/3]" },
];

const Gallery = () => {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Madrid photo gallery: streets, plazas, and quiet corners"
        description="A photo journal from Madrid and nearby travels. Street scenes, cafes, doorways, and the small details of a slow life in Spain."
        path="/gallery"
      />
      <Navbar />
      <main id="main-content">
        <PageHeader eyebrow="Photo Gallery" title="Moments Captured" />

        <section className="bg-background pb-24" aria-labelledby="gallery-heading">
          <div className="container mx-auto px-6">
            <h2 id="gallery-heading" className="sr-only">Photo gallery</h2>
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
              {photos.map((photo, i) => (
                <motion.button
                  key={photo.src}
                  type="button"
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (i % 6) * 0.05 }}
                  onClick={() => setSelected(i)}
                  className="break-inside-avoid w-full"
                >
                  <div className="relative overflow-hidden rounded-2xl card-elevated group">
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      loading="lazy"
                      className={`w-full ${photo.aspect} object-cover transition-transform duration-700 group-hover:scale-105`}
                    />
                    <div className="absolute inset-0 bg-gold/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <ZoomIn className="w-8 h-8 text-ivory" />
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* Lightbox */}
        {selected !== null && (
          <div
            className="fixed inset-0 z-[60] bg-charcoal/95 flex items-center justify-center p-4 animate-fade-in"
            onClick={() => setSelected(null)}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-6 right-6 p-2 text-ivory hover:text-gold transition-colors"
              aria-label="Close lightbox"
            >
              <X className="w-8 h-8" />
            </button>
            <img
              src={photos[selected].src}
              alt={photos[selected].alt}
              className="max-w-full max-h-[88vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Gallery;
