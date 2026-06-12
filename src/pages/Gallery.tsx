import { motion } from "framer-motion";
import { ZoomIn, X } from "lucide-react";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import Seo from "@/components/Seo";
import chocolateriaSanGines from "@/assets/gallery/chocolateria-san-gines.jpg.asset.json";
import floralHallway from "@/assets/gallery/floral-hallway.jpg.asset.json";
import gumboAtTrikki from "@/assets/gallery/gumbo-at-trikki.jpg.asset.json";
import hotelAtlanticoBlueHour from "@/assets/gallery/hotel-atlantico-blue-hour.jpg.asset.json";
import metropolisCrosswalk from "@/assets/gallery/metropolis-crosswalk.jpg.asset.json";
import metropolisSunTraffic from "@/assets/gallery/metropolis-sun-traffic.jpg.asset.json";
import morningBreakfastTulips from "@/assets/gallery/morning-breakfast-tulips.jpg.asset.json";
import parkSpringPlanting from "@/assets/gallery/park-spring-planting.jpg.asset.json";
import quesadillaDinner from "@/assets/gallery/quesadilla-dinner.jpg.asset.json";
import quinoaLunch from "@/assets/gallery/quinoa-lunch.jpg.asset.json";
import redBarInterior from "@/assets/gallery/red-bar-interior.jpg.asset.json";

const photos = [
  { src: hotelAtlanticoBlueHour.url, alt: "Hotel Atlantico lit up at blue hour on Gran Via in Madrid", aspect: "aspect-[3/4]" },
  { src: metropolisCrosswalk.url, alt: "The Metropolis building seen from a crosswalk on Gran Via under a bright blue sky", aspect: "aspect-[3/4]" },
  { src: metropolisSunTraffic.url, alt: "The Metropolis building framed by sun and traffic on Gran Via in Madrid", aspect: "aspect-[3/4]" },
  { src: chocolateriaSanGines.url, alt: "Chocolatería San Ginés sign glowing on a narrow Madrid street", aspect: "aspect-[3/4]" },
  { src: redBarInterior.url, alt: "Red bar interior with a marble counter, gold lighting, and empty stools", aspect: "aspect-[3/4]" },
  { src: floralHallway.url, alt: "Tall pink floral arrangements hanging in a marble hallway with black drapes", aspect: "aspect-[3/4]" },
  { src: parkSpringPlanting.url, alt: "Young trees and rosemary bushes in a freshly planted Madrid park with apartment buildings behind", aspect: "aspect-[3/4]" },
  { src: morningBreakfastTulips.url, alt: "A breakfast of a jamon croissant, green grapes, and coffee next to a vase of bright pink tulips", aspect: "aspect-[3/4]" },
  { src: quesadillaDinner.url, alt: "Homemade quesadillas with guacamole and salsa on a blue plate, with a glass of tinto de verano", aspect: "aspect-[3/4]" },
  { src: quinoaLunch.url, alt: "A lunch of quinoa and spinach salad with cherry tomatoes at my kitchen counter", aspect: "aspect-[3/4]" },
  { src: gumboAtTrikki.url, alt: "A bowl of gumbo with rice at Trikki, the New Orleans restaurant in Madrid", aspect: "aspect-[3/4]" },
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
