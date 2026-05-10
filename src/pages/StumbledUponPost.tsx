import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { extractStyleAndBody, scopeCss } from "@/lib/htmlPost";

const C = {
  cream: "#faf7f2",
  gold: "#B8952A",
  textDark: "#1A1714",
  textMid: "#4A4540",
  textMuted: "#8A8078",
};

// Slugs that have full HTML files in /public/posts/<slug>.html
const POST_FILES: Record<string, string> = {
  "tablao-de-la-villa": "/posts/tablao-de-la-villa.html",
  "the-bookstore-that-exists-because-of-a-love-story":
    "/posts/the-bookstore-that-exists-because-of-a-love-story.html",
  "the-bullfight": "/posts/the-bullfight.html",
  "trikki-new-orleans-chamberi": "/posts/trikki-new-orleans-chamberi.html",
};

// Inline placeholders for slugs without an uploaded file yet
const PLACEHOLDERS: Record<string, { eyebrow: string; title: string }> = {};

type Extracted = { styleHtml: string; bodyHtml: string };

function extractStyleAndBody(html: string): Extracted {
  const styles = Array.from(html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi))
    .map((m) => m[1])
    .join("\n");
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  const body = bodyMatch ? bodyMatch[1] : html;
  return { styleHtml: styles, bodyHtml: body };
}

const FontLoader = () => {
  useEffect(() => {
    const links: { id: string; href: string }[] = [
      {
        id: "lato-font-link",
        href: "https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap",
      },
      {
        id: "post-fonts-link",
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500&family=Lora:ital,wght@0,400;0,500;1,400&display=swap",
      },
    ];
    links.forEach(({ id, href }) => {
      if (!document.getElementById(id)) {
        const link = document.createElement("link");
        link.id = id;
        link.rel = "stylesheet";
        link.href = href;
        document.head.appendChild(link);
      }
    });
  }, []);
  return null;
};

const BackLink = () => (
  <div style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 24px 0" }}>
    <Link
      to="/stumbled-upon"
      style={{
        fontFamily: "'Lato', sans-serif",
        fontSize: 12,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: C.gold,
        fontWeight: 600,
        textDecoration: "none",
      }}
    >
      ← Back to Stumbled Upon
    </Link>
  </div>
);

const StumbledUponPost = () => {
  const { slug = "" } = useParams();
  const filePath = POST_FILES[slug];
  const placeholder = PLACEHOLDERS[slug];

  const [content, setContent] = useState<Extracted | null>(null);
  const [loading, setLoading] = useState<boolean>(Boolean(filePath));
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!filePath) return;
    setLoading(true);
    fetch(filePath)
      .then((r) => {
        if (!r.ok) throw new Error(`Failed to load post (${r.status})`);
        return r.text();
      })
      .then((html) => {
        setContent(extractStyleAndBody(html));
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message);
        setLoading(false);
      });
  }, [filePath]);

  return (
    <div style={{ background: C.cream, minHeight: "100vh" }}>
      <FontLoader />
      <Navbar />
      <div style={{ height: 72 }} aria-hidden />
      <BackLink />
      <main>
        {filePath ? (
          <>
            {loading && (
              <div
                style={{
                  textAlign: "center",
                  padding: "80px 24px",
                  fontFamily: "'Lato', sans-serif",
                  color: C.textMuted,
                }}
              >
                Loading story…
              </div>
            )}
            {error && (
              <div
                style={{
                  textAlign: "center",
                  padding: "80px 24px",
                  fontFamily: "'Lato', sans-serif",
                  color: "#9B3A2A",
                }}
              >
                {error}
              </div>
            )}
            {content && (
              <div className="stumbled-post-scope">
                <style
                  dangerouslySetInnerHTML={{
                    __html: scopeCss(content.styleHtml, ".stumbled-post-scope"),
                  }}
                />
                <div
                  dangerouslySetInnerHTML={{ __html: content.bodyHtml }}
                />
              </div>
            )}
          </>
        ) : placeholder ? (
          <article
            style={{ maxWidth: 760, margin: "0 auto", padding: "48px 24px 64px" }}
          >
            <p
              style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: 12,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#9B3A2A",
                fontWeight: 700,
                marginBottom: 16,
              }}
            >
              {placeholder.eyebrow}
            </p>
            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                fontSize: "clamp(30px, 4.5vw, 46px)",
                color: C.textDark,
                lineHeight: 1.15,
                marginBottom: 24,
              }}
            >
              {placeholder.title}
            </h1>
            <p
              style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: 16,
                color: C.textMid,
                lineHeight: 1.75,
              }}
            >
              Full story coming soon.
            </p>
          </article>
        ) : (
          <div style={{ textAlign: "center", padding: "80px 24px" }}>
            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                fontSize: 32,
                color: C.textDark,
              }}
            >
              Story coming soon
            </h1>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

/**
 * Lightly scope the embedded post CSS so its body/html resets and font-family
 * declarations only affect the post container, not the rest of the site.
 * - body { ... }  ->  .stumbled-post-scope { ... }
 * - html { ... }  ->  .stumbled-post-scope { ... }
 * - * { ... }     ->  .stumbled-post-scope * { ... }
 * - :root { ... } left as-is (safe — defines CSS vars)
 */
function scopeCss(css: string, scope: string): string {
  return css
    .replace(/(^|\})\s*body\b/g, `$1 ${scope}`)
    .replace(/(^|\})\s*html\b/g, `$1 ${scope}`)
    .replace(/(^|\})\s*:root\b/g, `$1 ${scope}`)
    .replace(/(^|\})\s*\*\s*\{/g, `$1 ${scope} * {`);
}

export default StumbledUponPost;
