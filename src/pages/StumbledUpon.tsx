import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PencilLine } from "lucide-react";


/* ---------- Brand tokens (scoped to this page) ---------- */
const C = {
  cream: "#F2EDE4",
  creamDark: "#E8E0D3",
  gold: "#B8952A",
  goldLight: "#D4AE45",
  textDark: "#1A1714",
  textMid: "#4A4540",
  textMuted: "#8A8078",
  cardBg: "#FFFFFF",
  border: "#D8D0C4",
  red: "#9B3A2A",
};

const PLACEHOLDER =
  "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=900&q=70";

type Post = {
  title: string;
  cardTitle?: string;
  slug: string;
  teaser: string;
  image?: string;
};

type Section = {
  id: string;
  title: string;
  description: string;
  iconBg: string;
  emoji: string;
  posts: Post[];
  emptyFirstLabel?: string;
  totalSlots: number;
};

const sections: Section[] = [
  {
    id: "the-unexpected-business",
    title: "The Unexpected Business",
    description:
      "The shops, restaurants, and people doing something remarkable in plain sight.",
    iconBg: "#F0ECE2",
    emoji: "🏪",
    totalSlots: 3,
    posts: [
      {
        title: "The Bookstore That Exists Because of a Love Story",
        slug: "the-bookstore-that-exists-because-of-a-love-story",
        image: "/posts/images/bookstore-hero.jpg",
        teaser:
          "Most bookstores in Madrid sell books. This one exists because someone refused to let a love story end. It has been here for decades, and almost no one outside the neighborhood knows why.",
      },
      {
        title: "There Is a Portal to New Orleans Hiding in Chamberí",
        cardTitle: "Trikki New Orleans Restaurant",
        slug: "trikki-new-orleans-chamberi",
        image: "/posts/images/trikki-hero.jpg",
        teaser:
          "On paper it should not work. The concept is too specific, the location too quiet. In practice it is exactly the kind of place Madrid keeps producing and the rest of the world has not caught up to yet.",
      },
    ],
  },
  {
    id: "while-you-are-there",
    title: "While You Are There",
    description:
      "Experiences you will only find if someone who actually lives here tells you.",
    iconBg: "#F5EAE8",
    emoji: "🚶",
    totalSlots: 3,
    posts: [
      {
        title: "The Night Flamenco Stopped Time",
        cardTitle: "Tablao de la Villa",
        slug: "tablao-de-la-villa",
        image: "/posts/images/tablao-hero.jpg",
        teaser:
          "There are tourist flamenco shows and then there is this. One performs flamenco. The other lives it. You will know the difference the moment you walk in.",
      },
    ],
  },
  {
    id: "old-madrid",
    title: "Old Madrid",
    description:
      "The deep traditions, the tabernas, the things that have not changed in a hundred years.",
    iconBg: "#EAF0EC",
    emoji: "⏳",
    totalSlots: 3,
    posts: [
      {
        title: "The Bullfight",
        slug: "the-bullfight",
        image: "/posts/images/bullfight-hero.jpg",
        teaser:
          "I went. I had opinions before I arrived. I have different ones now. This is not a post about whether you should go. It is a post about what actually happens when you do.",
      },
    ],
  },
  {
    id: "through-a-black-lens",
    title: "Through a Black Lens",
    description:
      "Madrid through my eyes. My perspective, my experience, my community.",
    iconBg: "#ECE9F5",
    emoji: "👁️",
    totalSlots: 3,
    posts: [],
    emptyFirstLabel: "First story coming soon",
  },
  {
    id: "only-locals-know",
    title: "Only Locals Know",
    description:
      "The places, the shortcuts, the tips that never make the tourist lists.",
    iconBg: "#E8EFF5",
    emoji: "🗺️",
    totalSlots: 3,
    posts: [],
    emptyFirstLabel: "First story coming soon",
  },
  {
    id: "things-to-do",
    title: "Things to Do",
    description:
      "Curated, honest, written from real experience. No affiliate fluff.",
    iconBg: "#F5EDE8",
    emoji: "🎟️",
    totalSlots: 3,
    posts: [],
    emptyFirstLabel: "First story coming soon",
  },
];


/* ---------- Card pieces ---------- */

const PostCard = ({ post }: { post: Post }) => (
  <Link
    to={`/stumbled-upon/${post.slug}`}
    className="group block rounded-[12px] overflow-hidden transition-all"
    style={{
      background: C.cardBg,
      border: `1.5px solid ${C.border}`,
    }}
  >
    <div
      className="w-full"
      style={{
        height: 150,
        backgroundImage: `url(${post.image || PLACEHOLDER})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    />
    <div style={{ padding: "16px 18px" }}>
      <h4
        style={{
          fontFamily: "'Playfair Display', serif",
          fontWeight: 700,
          fontSize: 16,
          color: C.textDark,
          marginBottom: 8,
          lineHeight: 1.3,
        }}
      >
        {post.cardTitle || post.title}
      </h4>
      <p
        style={{
          fontFamily: "'Lato', sans-serif",
          fontSize: 12.5,
          color: C.textMuted,
          lineHeight: 1.6,
          marginBottom: 14,
        }}
      >
        {post.teaser}
      </p>
      <span
        className="transition-colors"
        style={{
          fontFamily: "'Lato', sans-serif",
          fontSize: 11,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: C.textMid,
          borderBottom: `1px solid ${C.textMid}`,
          paddingBottom: 2,
        }}
      >
        Read the Story
      </span>
    </div>
    <style>{`
      a:hover .group-hover\\:gold { color: ${C.gold}; border-color: ${C.gold}; }
    `}</style>
  </Link>
);

const ComingSoonCard = ({ label }: { label: string }) => (
  <div
    className="flex flex-col items-center justify-center text-center"
    style={{
      border: `1.5px dashed ${C.border}`,
      borderRadius: 12,
      minHeight: 220,
      padding: 24,
      background: "transparent",
    }}
  >
    <PencilLine size={22} color={C.textMuted} />
    <p
      style={{
        fontFamily: "'Lato', sans-serif",
        fontSize: 13,
        color: C.textMuted,
        marginTop: 10,
      }}
    >
      {label}
    </p>
  </div>
);

const AngleCard = ({
  section,
  active,
  onClick,
}: {
  section: Section;
  active: boolean;
  onClick: () => void;
}) => {
  const [hover, setHover] = useState(false);
  const lifted = hover || active;
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="text-left transition-all"
      style={{
        background: lifted ? "#FBF7EF" : C.cardBg,
        border: `1.5px solid ${C.gold}`,
        borderRadius: 12,
        padding: 22,
        transform: lifted ? "translateY(-2px)" : "translateY(0)",
        boxShadow: active ? `inset 0 0 0 2px ${C.goldLight}` : "none",
        cursor: "pointer",
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 10,
          background: section.iconBg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 14,
          fontSize: 24,
          lineHeight: 1,
        }}
      >
        <span>{section.emoji}</span>
      </div>

      <h3
        style={{
          fontFamily: "'Playfair Display', serif",
          fontWeight: 700,
          fontSize: 19,
          color: C.textDark,
          marginBottom: 8,
          lineHeight: 1.25,
        }}
      >
        {section.title}
      </h3>
      <p
        style={{
          fontFamily: "'Lato', sans-serif",
          fontSize: 13.5,
          color: C.textMuted,
          lineHeight: 1.55,
          marginBottom: 14,
        }}
      >
        {section.description}
      </p>
      <span
        style={{
          fontFamily: "'Lato', sans-serif",
          fontSize: 12,
          letterSpacing: "0.08em",
          color: C.gold,
          fontWeight: 600,
        }}
      >
        Explore →
      </span>
    </button>
  );
};

/* ---------- Section block ---------- */

const SectionBlock = ({ section }: { section: Section }) => {
  const filled = section.posts.length;
  const placeholders = Math.max(0, section.totalSlots - filled);
  return (
    <section id={section.id} style={{ paddingTop: 48 }}>
      <div
        className="flex items-center gap-4"
        style={{
          paddingBottom: 16,
          borderBottom: `1.5px solid ${C.border}`,
          marginBottom: 24,
        }}
      >
        <div
          style={{
            width: 42,
            height: 42,
            borderRadius: 10,
            background: section.iconBg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            fontSize: 22,
            lineHeight: 1,
          }}
        >
          <span>{section.emoji}</span>
        </div>

        <div className="flex-1 min-w-0">
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              fontSize: 23,
              color: C.textDark,
              lineHeight: 1.2,
            }}
          >
            {section.title}
          </h2>
          <p
            style={{
              fontFamily: "'Lato', sans-serif",
              fontSize: 13,
              color: C.textMuted,
              marginTop: 2,
            }}
          >
            {section.description}
          </p>
        </div>
        <span
          style={{
            fontFamily: "'Lato', sans-serif",
            fontSize: 11,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: C.gold,
            fontWeight: 600,
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          See all →
        </span>
      </div>

      <div
        className="grid gap-[18px]"
        style={{ gridTemplateColumns: "repeat(3, minmax(0, 1fr))" }}
      >
        {section.posts.map((p) => (
          <PostCard key={p.slug} post={p} />
        ))}
        {Array.from({ length: placeholders }).map((_, i) => {
          const label =
            filled === 0 && i === 0 && section.emptyFirstLabel
              ? section.emptyFirstLabel
              : "More stories coming soon";
          return <ComingSoonCard key={i} label={label} />;
        })}
      </div>
    </section>
  );
};

/* ---------- Page ---------- */

const StumbledUpon = () => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const sectionsRef = useRef<HTMLDivElement | null>(null);

  // Inject Lato font once
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

  const handleCardClick = (id: string) => {
    if (activeId === id) {
      setActiveId(null);
      return;
    }
    setActiveId(id);
    setTimeout(() => {
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const visibleSections = activeId
    ? sections.filter((s) => s.id === activeId)
    : sections;

  return (
    <div style={{ background: C.cream, minHeight: "100vh" }}>
      <Navbar />
      <main>
        {/* HERO */}
        <section
          style={{
            background: C.cream,
            padding: "80px 24px 56px",
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <p
              style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: 12,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: C.red,
                fontWeight: 700,
                marginBottom: 20,
              }}
            >
              Stumbled Upon Madrid
            </p>
            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                fontSize: "clamp(32px, 5vw, 52px)",
                color: C.textDark,
                lineHeight: 1.15,
                marginBottom: 12,
              }}
            >
              The most interesting stories in Madrid are the ones nobody is
              writing about.
            </h1>
            <p
              style={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: "italic",
                fontSize: "clamp(20px, 2.5vw, 28px)",
                color: C.gold,
              }}
            >
              Until now.
            </p>
            <div
              style={{
                width: 60,
                height: 2,
                background: C.gold,
                margin: "24px auto 0",
              }}
            />
          </div>
        </section>

        {/* ANGLE CARDS */}
        <section style={{ padding: "32px 24px 8px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div
              className="grid gap-5"
              style={{ gridTemplateColumns: "repeat(3, minmax(0, 1fr))" }}
            >
              {sections.map((s) => (
                <AngleCard
                  key={s.id}
                  section={s}
                  active={activeId === s.id}
                  onClick={() => handleCardClick(s.id)}
                />
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 24 }}>
              <button
                type="button"
                onClick={() => setActiveId(null)}
                style={{
                  fontFamily: "'Lato', sans-serif",
                  fontSize: 12,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: C.textMid,
                  borderBottom: `1px solid ${C.border}`,
                  paddingBottom: 2,
                  background: "transparent",
                  cursor: "pointer",
                }}
              >
                Show All Sections
              </button>
            </div>
          </div>
        </section>

        {/* CONTENT SECTIONS */}
        <div
          ref={sectionsRef}
          style={{ maxWidth: 1100, margin: "0 auto", padding: "16px 24px 80px" }}
        >
          {visibleSections.map((s, i) => (
            <div
              key={s.id}
              style={{
                borderTop: i === 0 ? "none" : `1px solid ${C.border}`,
              }}
            >
              <SectionBlock section={s} />
            </div>
          ))}
        </div>

        {/* Brand signature */}
        <div
          style={{
            textAlign: "center",
            padding: "0 24px 56px",
            fontFamily: "'Playfair Display', serif",
            fontStyle: "italic",
            color: C.textMid,
            fontSize: 15,
          }}
        >
          Spain has not changed. I am the one adapting.
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default StumbledUpon;
