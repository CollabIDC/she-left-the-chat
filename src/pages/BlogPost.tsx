import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Instagram, Youtube, Mail } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EmailSignup from "@/components/EmailSignup";
import StoryCard from "@/components/StoryCard";
import { stories } from "@/data/stories";
import { extractStyleAndBody, scopeCss, type ExtractedHtml } from "@/lib/htmlPost";
import portrait from "@/assets/portrait-kimberly.jpg";

const POST_FILES: Record<string, string> = {
  "she-actually-did-it": "/posts/she-actually-did-it.html",
};

const BlogPost = () => {
  const { slug = "" } = useParams();
  const post = stories.find((s) => s.slug === slug) ?? stories[0];
  const related = stories.filter((s) => s.slug !== post.slug).slice(0, 3);
  const filePath = POST_FILES[slug];

  const [htmlContent, setHtmlContent] = useState<ExtractedHtml | null>(null);
  const [htmlLoading, setHtmlLoading] = useState<boolean>(Boolean(filePath));
  const [htmlError, setHtmlError] = useState<string | null>(null);

  useEffect(() => {
    if (!filePath) {
      setHtmlContent(null);
      return;
    }
    setHtmlLoading(true);
    fetch(filePath)
      .then((r) => {
        if (!r.ok) throw new Error(`Failed to load post (${r.status})`);
        return r.text();
      })
      .then((html) => {
        setHtmlContent(extractStyleAndBody(html));
        setHtmlLoading(false);
      })
      .catch((e) => {
        setHtmlError(e.message);
        setHtmlLoading(false);
      });
  }, [filePath]);

  useEffect(() => {
    if (!filePath) return;
    const id = "blog-html-post-fonts";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Lato:wght@400;700&display=swap";
    document.head.appendChild(link);
  }, [filePath]);

  if (filePath) {
    const backHref =
      post.stream === "she-actually-did-it" ? "/stories" : "/the-real-guides";
    const backLabel =
      post.stream === "she-actually-did-it"
        ? "← Back to Stories"
        : "← Back to The Real Guides";
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="h-16" aria-hidden />
        <div className="max-w-[1100px] mx-auto px-6 pt-6">
          <Link
            to={backHref}
            className="font-label text-xs uppercase tracking-[0.18em] text-gold font-semibold hover:text-gold-deep"
          >
            {backLabel}
          </Link>
        </div>
        <main>
          {htmlLoading && (
            <div className="text-center py-20 font-body text-charcoal/60">
              Loading story…
            </div>
          )}
          {htmlError && (
            <div className="text-center py-20 font-body text-terracotta">
              {htmlError}
            </div>
          )}
          {htmlContent && (
            <div className="story-post-scope">
              <style
                dangerouslySetInnerHTML={{
                  __html: scopeCss(htmlContent.styleHtml, ".story-post-scope"),
                }}
              />
              <div dangerouslySetInnerHTML={{ __html: htmlContent.bodyHtml }} />
            </div>
          )}
        </main>
        <EmailSignup />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-28 pb-20">
        <article className="container mx-auto px-6">
          <div className="max-w-[740px] mx-auto">
            {/* Stream / category pills */}
            <div className="flex flex-wrap gap-2 mb-6">
              {post.stream === "she-actually-did-it" ? (
                <span className="inline-block px-3 py-1 rounded-full bg-terracotta text-ivory font-label text-[11px] uppercase tracking-[0.18em] font-medium">
                  She Actually Did It
                </span>
              ) : (
                <>
                  {post.destination && (
                    <span className="inline-block px-3 py-1 rounded-full bg-charcoal text-ivory font-label text-[11px] uppercase tracking-[0.18em] font-medium">
                      {post.destination}
                    </span>
                  )}
                  {post.topic && (
                    <span className="inline-block px-3 py-1 rounded-full bg-gold text-ivory font-label text-[11px] uppercase tracking-[0.18em] font-medium">
                      {post.topic}
                    </span>
                  )}
                  {post.readerNeed && (
                    <span className="inline-block px-3 py-1 rounded-full bg-terracotta text-ivory font-label text-[11px] uppercase tracking-[0.18em] font-medium">
                      {post.readerNeed}
                    </span>
                  )}
                </>
              )}
            </div>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal leading-tight mb-5">
              {post.title}
            </h1>

            <div className="flex items-center gap-3 text-charcoal/60 font-body text-sm mb-10">
              <span>By Kimberly</span>
              <span className="w-1 h-1 rounded-full bg-charcoal/40" />
              <span>{post.date}</span>
              <span className="w-1 h-1 rounded-full bg-charcoal/40" />
              <span>{post.readTime ?? "6 min read"}</span>
            </div>

            <div className="rounded-2xl overflow-hidden mb-12 card-elevated">
              <img
                src={post.image}
                alt={post.title}
                className="w-full aspect-[16/9] object-cover"
              />
            </div>

            {/* Body */}
            <div className="drop-cap font-body text-[18px] leading-[1.85] text-charcoal/85 space-y-6">
              <p>
                {post.excerpt} I never imagined writing those words. A year ago I was
                pacing my Atlanta kitchen at 2am, scrolling jobs I didn't want and
                wondering if this was really it. The answer, as it turned out, was
                a quiet but unmistakable no.
              </p>
              <p>
                Madrid didn't fix me. It didn't have to. What it did do was give
                me the room to set the version of myself I'd been performing for
                a decade gently down on a park bench in Retiro and walk away.
              </p>

              <blockquote className="my-10 pl-6 border-l-2 border-gold">
                <p className="font-display italic text-2xl md:text-3xl leading-snug text-charcoal">
                  Some decisions don't feel brave when you're making them. They
                  just feel like the only honest move you have left.
                </p>
              </blockquote>

              <p>
                I'm still figuring out the language, the paperwork, the rhythm of
                a city that eats dinner at 10pm. But I'm figuring it out as me —
                not as the woman I was supposed to become.
              </p>
              <p>
                If you're standing in your own kitchen at 2am, this is your sign.
                Not necessarily to move countries. Just to stop pretending the
                story's already written.
              </p>
            </div>

            {/* Author bio */}
            <div className="mt-16 p-8 rounded-2xl bg-surface border border-border flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <img
                src={portrait}
                alt="Kimberly"
                className="w-24 h-24 rounded-full object-cover flex-shrink-0"
              />
              <div className="text-center sm:text-left">
                <h3 className="font-display text-xl font-semibold text-charcoal mb-2">
                  About Kimberly
                </h3>
                <p className="font-body text-charcoal/70 text-sm leading-relaxed mb-4">
                  Atlanta-born, Madrid-based memoirist sharing the messy, magical
                  reality of choosing yourself in your second act.
                </p>
                <div className="flex justify-center sm:justify-start gap-3 text-gold">
                  <a href="https://instagram.com/shelefthechat" aria-label="Instagram" className="hover:text-gold-deep">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href="https://youtube.com/@shelefthechat" aria-label="YouTube" className="hover:text-gold-deep">
                    <Youtube className="w-5 h-5" />
                  </a>
                  <a href="mailto:hello@shelefthechat.com" aria-label="Email" className="hover:text-gold-deep">
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Related */}
        <section className="container mx-auto px-6 mt-24">
          <div className="text-center mb-12">
            <span className="label-eyebrow">Keep Reading</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal mt-3">
              You Might Also Like
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {related.map((s, i) => (
              <StoryCard key={s.slug} story={s} index={i} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link to="/stories" className="btn-gold-outline">
              Back to All Stories
            </Link>
          </div>
        </section>
      </main>

      <EmailSignup />
      <Footer />
    </div>
  );
};

export default BlogPost;
