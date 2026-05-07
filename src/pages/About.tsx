import { motion } from "framer-motion";
import { Instagram, Youtube, Mail, BookOpen, Video, Sparkles, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EmailSignup from "@/components/EmailSignup";
import portrait from "@/assets/portrait-kimberly.jpg";

const tiles = [
  {
    icon: BookOpen,
    title: "Stories",
    description: "Real life essays and journal entries from life abroad.",
  },
  {
    icon: Video,
    title: "Videos",
    description: "Vlogs, apartment tours, and city guides from Madrid and beyond.",
  },
  {
    icon: Sparkles,
    title: "Resources",
    description: "Free AI language tools to help you connect wherever you travel.",
  },
  {
    icon: Users,
    title: "Community",
    description: "A growing space for women who chose themselves — coming soon.",
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Full width portrait */}
        <div className="pt-20">
          <div className="overflow-hidden rounded-b-3xl">
            <img
              src={portrait}
              alt="Portrait of Kimberly"
              className="w-full h-[55vh] md:h-[65vh] object-cover object-top"
            />
          </div>
        </div>

        {/* Bio */}
        <section className="bg-background py-20">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl mx-auto"
            >
              <span className="label-eyebrow">About Me</span>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal mt-4 mb-8 leading-tight">
                Hey, I'm the one who left the chat.
              </h1>
              <div className="space-y-5 font-body text-[17px] text-charcoal/80 leading-[1.8]">
                <p>
                  One day I decided that the 9 to 5 wasn't cutting it anymore.
                  I packed my bags, booked a one way ticket to Spain, and never
                  looked back. Now I'm living in the heart of Madrid, eating
                  tapas for dinner, and figuring out life one adventure at a time.
                </p>
                <p>
                  This blog is my digital journal. A place where I share the raw,
                  unfiltered experience of someone who chose a different life. The wins, the losses,
                  the late night walks through empty streets, and the friends who
                  become family.
                </p>
                <p>
                  Whether you're dreaming of your own escape or just along for
                  the ride, I'm glad you're here. Pull up a chair, grab a café
                  con leche, and let's explore together.
                </p>
              </div>

              {/* Social */}
              <div className="flex items-center gap-5 mt-10 text-gold">
                <a href="https://instagram.com/shelefthechat" aria-label="Instagram" className="hover:text-gold-deep transition-colors">
                  <Instagram className="w-6 h-6" />
                </a>
                <a href="https://youtube.com/@shelefthechat" aria-label="YouTube" className="hover:text-gold-deep transition-colors">
                  <Youtube className="w-6 h-6" />
                </a>
                <a href="mailto:hello@shelefthechat.com" aria-label="Email" className="hover:text-gold-deep transition-colors">
                  <Mail className="w-6 h-6" />
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* What you'll find here */}
        <section className="bg-background py-20">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-14"
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal">
                What You'll Find Here
              </h2>
              <span className="block w-20 h-px bg-gold mx-auto mt-6" />
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {tiles.map((t, i) => {
                const Icon = t.icon;
                return (
                  <motion.div
                    key={t.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="bg-surface rounded-2xl p-8 card-elevated"
                  >
                    <Icon className="w-8 h-8 text-gold mb-4" />
                    <h3 className="font-display text-xl font-bold text-charcoal mb-2">
                      {t.title}
                    </h3>
                    <p className="font-body text-charcoal/70 leading-relaxed">
                      {t.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <EmailSignup />
      </main>
      <Footer />
    </div>
  );
};

export default About;
