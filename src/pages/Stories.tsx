import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import StoryCard from "@/components/StoryCard";
import { stories, categories } from "@/data/stories";
import { cn } from "@/lib/utils";

const Stories = () => {
  const [active, setActive] = useState<(typeof categories)[number]>("All");

  const filtered =
    active === "All" ? stories : stories.filter((s) => s.category === active);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <PageHeader
          eyebrow="The Journal"
          title="All Stories"
          subtitle="Real life. Real adventures. No filter."
        />

        {/* Filter pills */}
        <section className="bg-background pb-12">
          <div className="container mx-auto px-6">
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className={cn(
                    "px-5 py-2 rounded-full font-label text-xs uppercase tracking-[0.18em] transition-all border",
                    active === cat
                      ? "bg-gold text-charcoal border-gold"
                      : "bg-ivory text-charcoal/80 border-charcoal/15 hover:border-gold hover:text-gold",
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Cards */}
        <section className="bg-background pb-24">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-10 lg:gap-12 max-w-5xl mx-auto">
              {filtered.map((story, i) => (
                <StoryCard key={story.slug} story={story} index={i} />
              ))}
            </div>

            {/* Pagination — placeholder */}
            <div className="mt-16 flex justify-center items-center gap-2">
              {[1, 2, 3].map((n) => (
                <button
                  key={n}
                  className={cn(
                    "w-10 h-10 rounded-full font-body text-sm transition-colors",
                    n === 1
                      ? "bg-gold text-charcoal"
                      : "text-charcoal/60 hover:text-gold border border-charcoal/15",
                  )}
                >
                  {n}
                </button>
              ))}
              <span className="text-charcoal/40 px-2">…</span>
              <button className="px-4 h-10 rounded-full font-body text-sm text-charcoal/60 hover:text-gold border border-charcoal/15">
                Next →
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Stories;
