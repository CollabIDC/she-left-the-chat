import { motion } from "framer-motion";
import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const photos = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    alt: "Madrid street at sunset",
    location: "Madrid, Spain",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800&q=80",
    alt: "Spanish cafe",
    location: "La Latina, Madrid",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=800&q=80",
    alt: "Gran Via at night",
    location: "Gran Via, Madrid",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1509840841025-9088ba78a826?w=800&q=80",
    alt: "Retiro Park",
    location: "Retiro Park",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1578912996078-305d92249aa6?w=800&q=80",
    alt: "Toledo day trip",
    location: "Toledo, Spain",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
    alt: "My apartment",
    location: "Home in Madrid",
  },
];

const PhotoGallery = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

  const openLightbox = (index: number) => setSelectedPhoto(index);
  const closeLightbox = () => setSelectedPhoto(null);
  
  const nextPhoto = () => {
    if (selectedPhoto !== null) {
      setSelectedPhoto((selectedPhoto + 1) % photos.length);
    }
  };
  
  const prevPhoto = () => {
    if (selectedPhoto !== null) {
      setSelectedPhoto((selectedPhoto - 1 + photos.length) % photos.length);
    }
  };

  return (
    <section id="gallery" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-body text-sm font-medium text-primary uppercase tracking-widest">
            Photo Gallery
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-4">
            Moments Captured
          </h2>
        </motion.div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="break-inside-avoid group cursor-pointer"
              onClick={() => openLightbox(index)}
            >
              <div className="relative overflow-hidden rounded-2xl card-elevated">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4">
                    <p className="font-body text-sm text-primary-foreground/90">
                      {photo.location}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedPhoto !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/95 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 p-2 text-primary-foreground hover:text-primary transition-colors"
              aria-label="Close lightbox"
            >
              <X className="w-8 h-8" />
            </button>
            
            <button
              onClick={(e) => { e.stopPropagation(); prevPhoto(); }}
              className="absolute left-6 p-2 text-primary-foreground hover:text-primary transition-colors"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-10 h-10" />
            </button>

            <motion.img
              key={selectedPhoto}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              src={photos[selectedPhoto].src}
              alt={photos[selectedPhoto].alt}
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />

            <button
              onClick={(e) => { e.stopPropagation(); nextPhoto(); }}
              className="absolute right-6 p-2 text-primary-foreground hover:text-primary transition-colors"
              aria-label="Next photo"
            >
              <ChevronRight className="w-10 h-10" />
            </button>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
              <p className="font-body text-primary-foreground">
                {photos[selectedPhoto].location}
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default PhotoGallery;
