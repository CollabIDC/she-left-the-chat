import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ZoomIn } from "lucide-react";

const photos = [
  {
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80",
    alt: "Madrid street at sunset",
    aspect: "aspect-[3/4]",
  },
  {
    src: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=900&q=80",
    alt: "Cafe in La Latina",
    aspect: "aspect-[4/3]",
  },
  {
    src: "https://images.unsplash.com/photo-1561409037-c7be81613c1f?w=900&q=80",
    alt: "Golden hour rooftop view in Madrid",
    aspect: "aspect-[4/3]",
  },
  {
    src: "https://images.unsplash.com/photo-1515443961218-a51367888e4b?w=900&q=80",
    alt: "Warm tapas lunch in a Madrid plaza",
    aspect: "aspect-[3/4]",
  },
  {
    src: "https://images.unsplash.com/photo-1578912996078-305d92249aa6?w=900&q=80",
    alt: "Toledo day trip",
    aspect: "aspect-[3/4]",
  },
  {
    src: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=900&q=80",
    alt: "Apartment in Madrid",
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
