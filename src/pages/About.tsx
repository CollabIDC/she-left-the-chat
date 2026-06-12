import { motion } from "framer-motion";
import { Instagram, Youtube, Mail, BookOpen, Video, Sparkles, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EmailSignup from "@/components/EmailSignup";
import Seo from "@/components/Seo";
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
      <Seo
        title="About Kimberly: the woman behind she left the chat"
        description="Kimberly on leaving Atlanta for Madrid after forty years of putting everyone else first, and what it actually takes to choose yourself."
        path="/about"
      />
      <Navbar />
      <main id="main-content">
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
                  I am Kimberly. Program manager. Corporate trainer. AI consultant. And the woman who spent forty years knowing she was supposed to be somewhere else and kept putting everyone else first instead.
                </p>
                <p>
                  You need to be ready is the lie we were told to keep us still.
                </p>
                <p>
                  My grandmother did it. My mother did it. I did it. We called it love and devotion and doing the right thing. What it actually was is self-abandonment, self-erasure, and dutiful disappearing. Three generations of women who were last in their own lives.
                </p>
                <p>
                  I raised three kids, two of whom were not biologically mine, and I loved all three of them completely. I built a career. I showed up for everyone who needed me. And somewhere in the middle of all of that, I quietly stopped asking what I actually wanted.
                </p>
                <p>
                  Until one October, I stopped stopping.
                </p>
                <p>
                  I signed with a relocation company. I hired an immigration lawyer. I made sure my dog Chloe had every document she needed to come with me because she was never optional. I booked a Delta One flight for 420,000 miles because if I was finally doing this after forty years I was doing it right. And I had saved quietly and intentionally for years because I am a program manager and planning is not something I do, it is something I am.
                </p>
                <p>
                  And then my client contract fell through.
                </p>
                <p>
                  No income. No safety net visible to anyone on the outside. Just everything already in motion and a decision about whether I actually believed what I always said I believed.
                </p>
                <p>
                  My eldest daughter, who already lives abroad, said go anyway. This one is for you. No more sacrificing for everyone else. It is your turn.
                </p>
                <p>
                  So I prayed on it. Stood still. Let the Lord work.
                </p>
                <p>
                  And I got on the plane.
                </p>
                <p>
                  She Left the Chat exists to prove it is never too late to choose yourself. This is not a travel brand. It is not a consulting platform. It is proof. Raw, real, and written from inside the decision.
                </p>
                <p>
                  If you have a forty year dream sitting in the back of a room somewhere, this is for you.
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
