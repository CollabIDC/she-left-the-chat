import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Download, FileText } from "lucide-react";

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

const languageCards = [
  { flag: "🇪🇸", name: "Spanish", desc: "Order tapas, navigate the metro, and chat with your portera like a local.", href: "https://chatgpt.com/g/g-69988b23c4748191b2a354f34ea19105-spanish-for-your-life-abroad" },
  { flag: "🇫🇷", name: "French", desc: "From Paris cafes to Provence markets, confidence in every conversation.", href: "https://chatgpt.com/g/g-69ad4b7548988191aca96625b641a542-french-for-life-abroad" },
  { flag: "🇸🇳", name: "Wolof", desc: "Connect in Senegal. Greetings, market phrases, and everyday conversation.", href: "https://chatgpt.com/g/g-6999f1271bf08191aefe55d6a7e39c45-wolof-for-life-abroad" },
  { flag: "🇮🇹", name: "Italian", desc: "Pronounce the wine list correctly and actually enjoy the conversation." },
  { flag: "🇵🇹", name: "Portuguese", desc: "Lisbon, Porto, or Rio. Soft accents, warm people, worth every word." },
  { flag: "🇬🇧", name: "British English", desc: "Navigate London like you belong there. The phrases that actually matter." },
];

const planningTools = [
  { emoji: "📍", title: "Madrid Neighborhood Matcher", desc: "Tell it how you live. It tells you where in Madrid you belong." },
  { emoji: "🎒", title: "Packing List Builder", desc: "Answer a few questions. Get a list built for your trip, not everyone else's." },
  { emoji: "✅", title: "Relocation Readiness Quiz", desc: "Are you actually ready to make the move? Find out where you really stand." },
  { emoji: "🧮", title: "Cost of Living Calculator", desc: "Compare your current city to Madrid. See what your money actually buys." },
  { emoji: "📅", title: "Your Move Timeline Builder", desc: "Tell it your target date. It builds your backwards planning checklist." },
  { emoji: "🍽️", title: "Madrid Barrio Food Guide", desc: "Tell it what you like to eat. It points you to the right neighborhood." },
];

const comingSoon = [
  { emoji: "🗺️", title: "City Cheat Sheets", desc: "Paris done. London next. More cities as the journey expands." },
  { emoji: "🌍", title: "Country Matching App", desc: "Figure out where you actually want to live. Builds your personal roadmap." },
  { emoji: "🧭", title: "Move Abroad Roadmap", desc: "Step by step for people who are actually planning to do this." },
  { emoji: "🐾", title: "Service Dog Travel Guide", desc: "Everything that comes with traveling internationally with a service animal." },
  { emoji: "📋", title: "What I Learned About Visas", desc: "An honest overview of the options, what I researched, and what nobody told me upfront.", live: true, button: "READ THE OVERVIEW", href: "/resources/spain-visa-overview" },
  { emoji: "🏡", title: "Extended Stay Guide", desc: "For people settling in longer. The things you only learn by actually living here." },
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

          {/* SECTION 2 — Free AI Tools */}
          <section>
            <div style={sectionLabelStyle}>FREE AI TOOLS</div>
            <h2 style={sectionTitleStyle}>Tools That Think With You</h2>
            <p style={sectionSubStyle}>Interactive AI tools built for people who are curious, planning, or already on their way.</p>
            <p style={{ fontFamily: lato, fontStyle: "italic", fontSize: 14, color: FOOT, marginTop: 8, marginBottom: 28 }}>
              These tools are built on ChatGPT. A ChatGPT account is required to use them.
            </p>

            {/* Language Tools label */}
            <div
              style={{
                marginBottom: 16,
                paddingBottom: 8,
                borderBottom: `1px solid ${BORDER}`,
                fontFamily: lato,
                fontWeight: 700,
                fontSize: 10,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: FOOT,
              }}
            >
              LANGUAGE TOOLS
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: 20,
              }}
            >
              {languageCards.map((l) => (
                <div
                  key={l.name}
                  style={{
                    background: "#FFFFFF",
                    border: `1.5px solid ${GOLD}`,
                    borderRadius: 12,
                    padding: 22,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <span style={{ fontSize: 26, display: "block", marginBottom: 10, lineHeight: 1 }}>{l.flag}</span>
                  <h3 style={{ fontFamily: display, fontWeight: 700, fontSize: 14, color: INK, lineHeight: 1.3, margin: "0 0 5px" }}>{l.name}</h3>
                  <p style={{ fontFamily: lato, fontSize: 12, color: MUTED, lineHeight: 1.6, margin: 0, marginBottom: l.href ? 14 : 0, flex: 1 }}>{l.desc}</p>
                  {l.href && (
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        alignSelf: "flex-start",
                        background: GOLD,
                        color: INK,
                        fontFamily: lato,
                        fontWeight: 700,
                        fontSize: 10,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        padding: "8px 16px",
                        borderRadius: 20,
                        textDecoration: "none",
                      }}
                    >
                      Try It Free
                    </a>
                  )}
                </div>
              ))}
            </div>

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

            {/* Planning Tools label */}
            <div
              style={{
                marginBottom: 16,
                paddingBottom: 8,
                borderBottom: `1px solid ${BORDER}`,
                fontFamily: lato,
                fontWeight: 700,
                fontSize: 10,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: FOOT,
              }}
            >
              PLANNING TOOLS
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: 20,
              }}
            >
              {planningTools.map((p) => (
                <div
                  key={p.title}
                  style={{
                    background: "#FFFFFF",
                    border: `1.5px solid ${BORDER}`,
                    borderLeft: `4px solid ${GOLD}`,
                    borderRadius: 12,
                    padding: 22,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <span style={{ fontSize: 26, display: "block", marginBottom: 10, lineHeight: 1 }}>{p.emoji}</span>
                  <h3 style={{ fontFamily: display, fontWeight: 700, fontSize: 14, color: INK, lineHeight: 1.3, margin: "0 0 5px" }}>{p.title}</h3>
                  <p style={{ fontFamily: lato, fontSize: 12, color: MUTED, lineHeight: 1.6, margin: 0 }}>{p.desc}</p>
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
                border: `1.5px solid ${GOLD}`,
                borderRadius: 12,
                padding: 22,
                display: "flex",
                flexDirection: "column",
                maxWidth: 360,
              }}
            >
              <span style={{ fontSize: 26, display: "block", marginBottom: 10, lineHeight: 1 }}>📶</span>
              <h3 style={{ fontFamily: display, fontWeight: 700, fontSize: 14, color: INK, lineHeight: 1.3, margin: "0 0 5px" }}>
                Compare eSIM Providers for Spain
              </h3>
              <p style={{ fontFamily: lato, fontSize: 12, color: MUTED, lineHeight: 1.6, margin: 0, marginBottom: 14 }}>
                Jetpac, Holafly, Airalo, and Saily all work well for Spain. Use esimdb.com to compare current pricing before you buy.
              </p>
              <a
                href="https://esimdb.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  alignSelf: "flex-start",
                  background: GOLD,
                  color: INK,
                  fontFamily: lato,
                  fontWeight: 700,
                  fontSize: 10,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  padding: "8px 16px",
                  borderRadius: 20,
                  textDecoration: "none",
                }}
              >
                Visit esimdb.com
              </a>
            </div>
          </section>

          <Dots />

          {/* SECTION 4 — More Being Built */}
          <section>
            <h2 style={sectionTitleStyle}>More Being Built</h2>
            <p style={sectionSubStyle}>The toolkit grows as the journey continues. Check back often.</p>

            <div
              style={{
                marginTop: 24,
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: 20,
              }}
            >
              {comingSoon.map((c) => {
                const cardStyle: React.CSSProperties = {
                  background: "#FFFFFF",
                  border: c.live ? `1.5px solid ${GOLD}` : `1.5px solid ${BORDER}`,
                  borderLeft: c.live ? `1.5px solid ${GOLD}` : `4px solid ${GOLD}`,
                  borderRadius: 12,
                  padding: 22,
                  display: "flex",
                  flexDirection: "column",
                  textDecoration: "none",
                };
                return (
                  <div key={c.title} style={cardStyle}>
                    <span style={{ fontSize: 26, display: "block", marginBottom: 10, lineHeight: 1 }}>{c.emoji}</span>
                    <h3 style={{ fontFamily: display, fontWeight: 700, fontSize: 14, color: INK, lineHeight: 1.3, margin: "0 0 5px" }}>{c.title}</h3>
                    <p style={{ fontFamily: lato, fontSize: 12, color: MUTED, lineHeight: 1.6, margin: 0, marginBottom: c.live ? 14 : 0, flex: 1 }}>{c.desc}</p>
                    {c.live && c.href && (
                      <a
                        href={c.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          alignSelf: "flex-start",
                          background: GOLD,
                          color: INK,
                          fontFamily: lato,
                          fontWeight: 700,
                          fontSize: 10,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          padding: "8px 16px",
                          borderRadius: 20,
                          textDecoration: "none",
                        }}
                      >
                        {c.button}
                      </a>
                    )}
                  </div>
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
