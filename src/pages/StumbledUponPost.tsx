import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const C = {
  cream: "#F2EDE4",
  gold: "#B8952A",
  textDark: "#1A1714",
  textMid: "#4A4540",
  textMuted: "#8A8078",
  border: "#D8D0C4",
  red: "#9B3A2A",
};

type PostContent = {
  eyebrow: string;
  title: string;
  body: React.ReactNode;
};

const posts: Record<string, PostContent> = {
  "tablao-de-la-villa": {
    eyebrow: "While You Are There",
    title: "The Night Flamenco Stopped Time",
    body: (
      <>
        <p>
          There are tourist flamenco shows and then there is this. One performs
          flamenco. The other lives it. You will know the difference the moment
          you walk in.
        </p>
        <p>
          Full story coming soon. The complete piece is being prepared and will
          appear here shortly.
        </p>
      </>
    ),
  },
  "the-bookstore-that-exists-because-of-a-love-story": {
    eyebrow: "The Unexpected Business",
    title: "The Bookstore That Exists Because of a Love Story",
    body: (
      <p>
        Most bookstores in Madrid sell books. This one exists because someone
        refused to let a love story end. Full story coming soon.
      </p>
    ),
  },
  trikki: {
    eyebrow: "The Unexpected Business",
    title: "Trikki",
    body: <p>Full story coming soon.</p>,
  },
  "the-bullfight": {
    eyebrow: "Old Madrid",
    title: "The Bullfight",
    body: <p>Full story coming soon.</p>,
  },
};

const StumbledUponPost = () => {
  const { slug = "" } = useParams();
  const post = posts[slug];

  useEffect(() => {
    const id = "lato-font-link";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  return (
    <div style={{ background: C.cream, minHeight: "100vh" }}>
      <Navbar />
      <main style={{ maxWidth: 760, margin: "0 auto", padding: "64px 24px" }}>
        <Link
          to="/stumbled-upon"
          style={{
            fontFamily: "'Lato', sans-serif",
            fontSize: 12,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: C.gold,
            fontWeight: 600,
          }}
        >
          ← Back to Stumbled Upon
        </Link>

        {post ? (
          <article style={{ marginTop: 32 }}>
            <p
              style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: 12,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: C.red,
                fontWeight: 700,
                marginBottom: 16,
              }}
            >
              {post.eyebrow}
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
              {post.title}
            </h1>
            <p
              style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: 13,
                color: C.textMuted,
                marginBottom: 32,
              }}
            >
              By Kimberly
            </p>
            <div
              style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: 17,
                color: C.textMid,
                lineHeight: 1.75,
              }}
              className="space-y-5"
            >
              {post.body}
            </div>
          </article>
        ) : (
          <div style={{ marginTop: 48, textAlign: "center" }}>
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
            <p
              style={{
                fontFamily: "'Lato', sans-serif",
                color: C.textMuted,
                marginTop: 12,
              }}
            >
              This piece is being prepared. Check back shortly.
            </p>
          </div>
        )}

        <p
          style={{
            textAlign: "center",
            marginTop: 64,
            fontFamily: "'Playfair Display', serif",
            fontStyle: "italic",
            color: C.textMid,
          }}
        >
          Spain has not changed. I am the one adapting.
        </p>
      </main>
      <Footer />
    </div>
  );
};

export default StumbledUponPost;
