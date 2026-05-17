import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import StoryCard from "@/components/StoryCard";
import { stories } from "@/data/stories";

const SheActuallyDidIt = () => {
  const filtered = [
    stories.find((s) => s.slug === "she-actually-did-it")!,
    stories.find((s) => s.slug === "i-walked-an-hour-for-ribs")!,
    stories.find((s) => s.slug === "she-made-sure-i-wasnt-alone-at-midnight")!,
    stories.find((s) => s.slug === "now-what-what-nobody-tells-you-about-after")!,
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <PageHeader
          eyebrow="Stories"
          title="She Actually Did It"
          subtitle="Raw. Real. Written from inside the decision."
        />

        <section className="bg-background pb-24">
          <div className="container mx-auto px-6">
            {filtered.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-10 lg:gap-12 max-w-5xl mx-auto">
                {filtered.map((story, i) => (
                  <StoryCard key={story.slug} story={story} index={i} />
                ))}
              </div>
            ) : (
              <div className="max-w-xl mx-auto text-center bg-surface rounded-2xl px-8 py-14 card-elevated">
                <p className="font-display text-2xl text-charcoal mb-3">
                  More stories coming soon.
                </p>
                <p className="font-body text-charcoal/70">
                  Subscribe below to be the first to know.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SheActuallyDidIt;
