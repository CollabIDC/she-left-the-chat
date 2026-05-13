import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import StoryCard from "@/components/StoryCard";
import {
  stories,
  destinations,
  topics,
  readerNeeds,
} from "@/data/stories";
import { cn } from "@/lib/utils";

const RealGuidesPage = () => {
  const [destination, setDestination] =
    useState<(typeof destinations)[number]>("All");
  const [topic, setTopic] = useState<(typeof topics)[number]>("All");
  const [readerNeed, setReaderNeed] =
    useState<(typeof readerNeeds)[number]>("All");

  const filtered = stories.filter((s) => {
    if (s.stream !== "view-from-here") return false;
    if (destination !== "All" && s.destination !== destination) return false;
    if (topic !== "All" && s.topic !== topic) return false;
    if (readerNeed !== "All" && s.readerNeed !== readerNeed) return false;
    return true;
  });

  const renderPillRow = <T extends string>(
    label: string,
    options: readonly T[],
    active: T,
    setter: (v: T) => void,
  ) => (
    <div>
      <p className="font-label text-[10px] uppercase tracking-[0.22em] text-charcoal/50 mb-3 text-center">
        {label}
      </p>
      <div className="flex flex-wrap justify-center gap-2.5">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => setter(opt)}
            className={cn(
              "px-4 py-1.5 rounded-full font-label text-[11px] uppercase tracking-[0.16em] transition-all border",
              active === opt
                ? "bg-gold text-charcoal border-gold"
                : "bg-ivory text-charcoal/80 border-charcoal/20 hover:border-gold hover:text-gold",
            )}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <PageHeader
          eyebrow="The Real Guides"
          title="The Real Guides"
          subtitle="The Practical Stuff. Honestly."
        />

        <section className="bg-background pt-4 pb-12">
          <div className="container mx-auto px-6 space-y-7 max-w-5xl">
            {renderPillRow("Destination", destinations, destination, setDestination as (v: string) => void)}
            {renderPillRow("Topic", topics, topic, setTopic as (v: string) => void)}
            {renderPillRow("Reader Need", readerNeeds, readerNeed, setReaderNeed as (v: string) => void)}
          </div>
        </section>

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
                  More guides coming soon.
                </p>
                <p className="font-body text-charcoal/70 mb-5">
                  Subscribe below to be the first to know.
                </p>
                <Link
                  to="/#email-signup"
                  className="font-label text-xs uppercase tracking-[0.2em] text-gold underline underline-offset-4 hover:text-gold-deep transition-colors"
                >
                  Join the email list
                </Link>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default RealGuidesPage;
