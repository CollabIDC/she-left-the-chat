import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Download, ExternalLink, Map, Globe, Route, PawPrint, IdCard, Clock, FileText, Wifi } from "lucide-react";

const PAGE_BG = "#F2EDE4";
const INK = "#1A1714";
const MUTED = "#6B5E52";
const TERRA = "#9B3A2A";
const GOLD = "#B8952A";
const BORDER = "#D8D0C4";
const FOOT = "#8A8078";

const lato = "'Lato', system-ui, sans-serif";
const display = "'Playfair Display', serif";

const eyebrowStyle: React.CSSProperties = {
  fontFamily: lato,
  fontWeight: 700,
  fontSize: 11,
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  color: TERRA,
};

const sectionLabelStyle: React.CSSProperties = {
  fontFamily: lato,
  fontWeight: 700,
  fontSize: 10,
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  color: TERRA,
};

const sectionTitleStyle: React.CSSProperties = {
  fontFamily: display,
  fontWeight: 700,
  fontSize: 28,
  color: INK,
  marginTop: 8,
};

const sectionSubStyle: React.CSSProperties = {
  fontFamily: lato,
  fontSize: 17,
  color: MUTED,
  marginTop: 8,
  lineHeight: 1.6,
};

const Dots = () => (
  <div
    style={{
      textAlign: "center",
      color: TERRA,
      opacity: 0.5,
      fontSize: 14,
      letterSpacing: "0.5em",
      margin: "2.8rem 0",
    }}
  >
    · · ·
  </div>
);

const languages = [
  { flag: "🇪🇸", name: "Spanish", desc: "Order tapas, navigate the metro, and chat with your portera like a local." },
  { flag: "🇫🇷", name: "French", desc: "From Paris cafes to Provence markets, confidence in every conversation." },
  { flag: "🇮🇹", name: "Italian", desc: "Pronounce the wine list correctly and actually enjoy the conversation." },
  { flag: "🇵🇹", name: "Portuguese", desc: "Lisbon, Porto, or Rio. Soft accents, warm people, worth every word." },
];

const comingSoon = [
  { icon: Map, title: "City Cheat Sheets", desc: "Paris done. London next. More cities as the journey expands." },
  { icon: Globe, title: "Country Matching App", desc: "Figure out where you actually want to live. Builds your personal roadmap." },
  { icon: Route, title: "Move Abroad Roadmap", desc: "Step by step for people who are actually planning to do this." },
  { icon: PawPrint, title: "Service Dog Travel Guide", desc: "Everything that comes with traveling internationally with a service animal." },
  { icon: IdCard, title: "What I Learned About Visas", desc: "An honest overview of the options, what I researched, and what nobody told me upfront.", badge: "READ THE OVERVIEW", href: "/resources/spain-visa-overview" },
  { icon: Clock, title: "Extended Stay Guide", desc: "For people settling in longer. The things you only learn by actually living here." },
];

const pills = ["Before You Leave", "At the Airport", "Getting Around", "Food & Dining", "Culture", "Safety", "Essential Apps", "Money Tips"];

const Resources = () => {
  return (
    <div style={{ minHeight: "100vh", background: PAGE_BG }}>
      <Navbar />
      <main style={{ background: PAGE_BG, paddingTop: 120, paddingBottom: 80 }}>
        {/* Header */}
        <header style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
          <div style={eyebrowStyle}>FREE TOOLS &amp; RESOURCES</div>
          <h1 style={{ fontFamily: display, fontWeight: 700, fontSize: 48, color: INK, margin: "16px 0 14px", lineHeight: 1.1 }}>
            The Tools That Make It Easier
          </h1>
          <p style={{ fontFamily: display, fontStyle: "italic", fontSize: 19, color: MUTED, margin: 0, lineHeight: 1.5 }}>
            Whether you are spending a week in Madrid or building a life here, these resources take the guesswork out of getting started.
          </p>
          <div style={{ width: 48, height: 2, background: TERRA, margin: "24px auto 0" }} />
        </header>

        <div style={{ maxWidth: 900, margin: "0 auto", padding: "56px 24px 0" }}>
          {/* SECTION 1 — Start Here */}
          <section>
            <div style={sectionLabelStyle}>START HERE</div>
            <h2 style={sectionTitleStyle}>Your Free Cheat Sheet</h2>
            <p style={sectionSubStyle}>Everything a first-time Madrid visitor needs to know. One document. No fluff.</p>

            <div
              style={{
                background: "#2C1F1A",
                borderRadius: 12,
                padding: 32,
                marginTop: 24,
                display: "flex",
                gap: 24,
                alignItems: "flex-start",
              }}
              className="flex-col sm:flex-row"
            >
              <div
                style={{
                  background: TERRA,
                  borderRadius: 10,
                  width: 56,
                  height: 56,
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FileText color="#F2EDE4" size={28} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: lato, fontWeight: 700, fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: GOLD }}>
                  FREE DOWNLOAD · PDF
                </div>
                <h3 style={{ fontFamily: display, fontWeight: 700, fontSize: 20, color: "#F2EDE4", margin: "8px 0 10px" }}>
                  Madrid Visitor Cheat Sheet
                </h3>
                <p style={{ fontFamily: lato, fontSize: 14, color: "rgba(242,237,228,0.7)", lineHeight: 1.7, margin: 0 }}>
                  From the moment you book your flight through your first week in the city. Airport arrivals, getting around, food and dining, culture and etiquette, safety tips, essential apps, and more.
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 16 }}>
                  {pills.map((p) => (
                    <span
                      key={p}
                      style={{
                        background: "rgba(155,58,42,0.25)",
                        color: "#D4846A",
                        fontFamily: lato,
                        fontWeight: 700,
                        fontSize: 10,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        padding: "5px 10px",
                        borderRadius: 20,
                      }}
                    >
                      {p}
                    </span>
                  ))}
                </div>
                <a
                  href="#"
                  style={{
                    marginTop: 20,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    background: GOLD,
                    color: INK,
                    fontFamily: lato,
                    fontWeight: 700,
                    fontSize: 12,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    padding: "12px 24px",
                    borderRadius: 6,
                    textDecoration: "none",
                  }}
                >
                  <Download size={14} /> Download Free
                </a>
              </div>
            </div>
          </section>

          <Dots />

          {/* SECTION 2 — Language Tools */}
          <section>
            <div style={sectionLabelStyle}>LANGUAGE TOOLS</div>
            <h2 style={sectionTitleStyle}>Start Speaking Before You Land</h2>
            <p style={sectionSubStyle}>AI-powered language tools built for curious travelers and bold dreamers. Free to use.</p>

            <div
              style={{
                marginTop: 24,
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: 20,
              }}
            >
              {languages.map((l) => (
                <div
                  key={l.name}
                  style={{
                    background: "#FFFFFF",
                    border: `1.5px solid ${BORDER}`,
                    borderRadius: 12,
                    padding: 24,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div style={{ fontSize: 36, lineHeight: 1 }}>{l.flag}</div>
                  <h3 style={{ fontFamily: display, fontWeight: 700, fontSize: 17, color: INK, margin: "12px 0 8px" }}>{l.name}</h3>
                  <p style={{ fontFamily: lato, fontSize: 14, color: MUTED, lineHeight: 1.6, margin: 0, flex: 1 }}>{l.desc}</p>
                  <a
                    href={`https://chat.openai.com/?placeholder=${l.name.toLowerCase()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      marginTop: 16,
                      alignSelf: "flex-start",
                      background: GOLD,
                      color: INK,
                      fontFamily: lato,
                      fontWeight: 700,
                      fontSize: 11,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      padding: "9px 18px",
                      borderRadius: 20,
                      textDecoration: "none",
                    }}
                  >
                    Try It Free
                  </a>
                </div>
              ))}
            </div>
          </section>

          <Dots />

          {/* SECTION 3 — eSIM */}
          <section>
            <div style={sectionLabelStyle}>DATA &amp; CONNECTIVITY</div>
            <h2 style={sectionTitleStyle}>Do Not Overpay for Data</h2>
            <p style={sectionSubStyle}>Compare eSIM providers before you fly. These four all work well for Spain.</p>

            <div
              style={{
                marginTop: 24,
                background: "#FFFFFF",
                border: `1.5px solid ${BORDER}`,
                borderRadius: 12,
                padding: 24,
                display: "flex",
                alignItems: "center",
                gap: 20,
                flexWrap: "wrap",
              }}
            >
              <div
                style={{
                  background: "#EAF3F8",
                  borderRadius: 10,
                  width: 48,
                  height: 48,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Wifi color="#2A6B8A" size={24} />
              </div>
              <div style={{ flex: 1, minWidth: 240 }}>
                <div style={{ fontFamily: lato, fontWeight: 700, fontSize: 15, color: INK }}>
                  Compare eSIM Providers for Spain
                </div>
                <p style={{ fontFamily: lato, fontSize: 13, color: MUTED, margin: "6px 0 0", lineHeight: 1.6 }}>
                  Jetpac, Holafly, Airalo, and Saily all work well for Spain. Use esimdb.com to compare current pricing before you buy.
                </p>
              </div>
              <a
                href="https://esimdb.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  fontFamily: lato,
                  fontWeight: 700,
                  fontSize: 12,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#2A6B8A",
                  textDecoration: "none",
                }}
              >
                Visit esimdb.com <ExternalLink size={14} />
              </a>
            </div>
          </section>

          <Dots />

          {/* SECTION 4 — Coming Soon */}
          <section>
            <div style={sectionLabelStyle}>COMING SOON</div>
            <h2 style={sectionTitleStyle}>More Being Built</h2>
            <p style={sectionSubStyle}>The toolkit grows as the journey continues. Check back often.</p>

            <div
              style={{
                marginTop: 24,
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: 20,
              }}
            >
              {comingSoon.map((c) => {
                const Icon = c.icon;
                const isLink = !!c.href;
                const inner = (
                  <>
                    <span
                      style={{
                        alignSelf: "flex-start",
                        fontFamily: lato,
                        fontWeight: 700,
                        fontSize: 9,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        background: PAGE_BG,
                        color: c.badge ? TERRA : FOOT,
                        borderRadius: 20,
                        padding: "5px 10px",
                      }}
                    >
                      {c.badge || "Coming Soon"}
                    </span>
                    <Icon color={c.badge ? TERRA : BORDER} size={32} style={{ marginTop: 14 }} />
                    <h3 style={{ fontFamily: display, fontWeight: 700, fontSize: 17, color: INK, margin: "10px 0 6px" }}>{c.title}</h3>
                    <p style={{ fontFamily: lato, fontSize: 13, color: MUTED, lineHeight: 1.6, margin: 0 }}>{c.desc}</p>
                  </>
                );
                const cardStyle: React.CSSProperties = {
                  background: "#FFFFFF",
                  border: `1.5px dashed ${BORDER}`,
                  borderRadius: 12,
                  padding: 20,
                  display: "flex",
                  flexDirection: "column",
                  textDecoration: "none",
                };
                return isLink ? (
                  <a key={c.title} href={c.href} style={cardStyle}>{inner}</a>
                ) : (
                  <div key={c.title} style={cardStyle}>{inner}</div>
                );
              })}
            </div>
          </section>

          {/* Closing line */}
          <div
            style={{
              marginTop: 80,
              paddingTop: 24,
              borderTop: `1px solid ${BORDER}`,
              textAlign: "center",
              fontFamily: lato,
              fontWeight: 700,
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: FOOT,
            }}
          >
            She Left the Chat · shelefthechat.com · By Kimberly · Madrid, Spain
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Resources;
