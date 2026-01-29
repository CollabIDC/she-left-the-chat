import { motion } from "framer-motion";
import { Instagram, Youtube, Mail } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="py-24 bg-card">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-3xl card-elevated">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80"
                alt="Profile photo"
                className="w-full aspect-[4/5] object-cover"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/20 rounded-2xl -z-10" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-body text-sm font-medium text-primary uppercase tracking-widest">
              About Me
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-4 mb-6">
              Hey, I'm the one who left the chat
            </h2>
            
            <div className="space-y-4 font-body text-muted-foreground leading-relaxed">
              <p>
                One day I decided that the 9-to-5 wasn't cutting it anymore. I packed my bags, 
                booked a one-way ticket to Spain, and never looked back. Now I'm living in the 
                heart of Madrid, eating tapas for dinner, and figuring out life one adventure at a time.
              </p>
              <p>
                This blog is my digital journal—a place where I share the raw, unfiltered 
                experience of being an expat. The wins, the losses, the late-night walks 
                through empty streets, and the friends who become family.
              </p>
              <p>
                Whether you're dreaming of your own escape or just along for the ride, 
                I'm glad you're here. Pull up a chair, grab a café con leche, and let's 
                explore together.
              </p>
            </div>

            {/* Social Links */}
            <div className="mt-8 flex items-center gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href="mailto:hello@shelefthechat.com"
                className="p-3 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
