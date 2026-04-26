import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ZoomIn } from "lucide-react";

const photos = [
  {
    src: "https://images.unsplash.com/photo-1525193612562-0ec53b0e5d7c?w=900&q=80",
    alt: "Golden afternoon light through an apartment window",
    aspect: "aspect-[3/4]",
  },
  {
    src: "https://images.unsplash.com/photo-1497515114629-f71d768fd07c?w=900&q=80",
    alt: "Quiet cafe window with warm light",
    aspect: "aspect-[4/3]",
  },
  {
    src: "https://images.unsplash.com/photo-1481833761820-0509d3217039?w=900&q=80",
    alt: "Cobblestone street at golden hour",
    aspect: "aspect-[4/3]",
  },
  {
    src: "https://images.unsplash.com/photo-1559599101-f09722fb4948?w=900&q=80",
    alt: "Candid coffee moment on a quiet morning",
    aspect: "aspect-[3/4]",
  },
  {
    src: "https://images.unsplash.com/photo-1473625247510-8ceb1760943f?w=900&q=80",
    alt: "Bookshelf and warm corner of a personal space",
    aspect: "aspect-[3/4]",
  },
  {
    src: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=900&q=80",
    alt: "Sunlit interior with linen curtains",
    aspect: "aspect-[4/3]",
  },
];

const GalleryPreview = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="label-eyebrow">Photo Gallery</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-charcoal mt-4">
            Moments Captured
          </h2>
        </motion.div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
          {photos.map((photo, i) => (
            <motion.div
              key={photo.src}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="break-inside-avoid"
            >
              <div className="relative overflow-hidden rounded-2xl card-elevated group cursor-pointer">
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
            </motion.div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link to="/gallery" className="btn-gold">
            View Full Gallery
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GalleryPreview;
