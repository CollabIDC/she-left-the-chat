import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import { Download, FileText, X } from "lucide-react";

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
  { flag: "🇮🇹", name: "Italian", desc: "Pronounce the wine list correctly and actually enjoy the conversation.", href: "https://chatgpt.com/g/g-6a16a606b3188191976d460ef98cb153-italian-for-life-abroad" },
  { flag: "🇵🇹", name: "Portuguese", desc: "Lisbon, Porto, or Rio. Soft accents, warm people, worth every word.", href: "https://chatgpt.com/g/g-6a16bdddc088819198421889c019d68a-portuguese-for-life-abroad" },
  { flag: "🇬🇧", name: "British English", desc: "Navigate London like you belong there. The phrases that actually matter.", href: "https://chatgpt.com/g/g-6a16d3b7068081918fe7a081d8c60a96-british-english-for-life-abroad" },

];

const planningTools = [
  { emoji: "📍", title: "Madrid Neighborhood Matcher", desc: "Tell it how you live. It tells you where in Madrid you belong." },
  { emoji: "🎒", title: "Packing List Builder", desc: "Answer a few questions. Get a list built for your trip, not everyone else's." },
  { emoji: "✅", title: "Relocation Readiness Quiz", desc: "Are you actually ready to make the move? Find out where you really stand.", live: true, button: "TRY THE QUIZ", href: "/tools/relocation-readiness-quiz" },
  { emoji: "🧮", title: "Cost of Living Calculator", desc: "Compare your current city to Madrid. See what your money actually buys." },
  { emoji: "📅", title: "Your Move Timeline Builder", desc: "Tell it your target date. It builds your backwards planning checklist." },
  { emoji: "🍽️", title: "Madrid Barrio Food Guide", desc: "Tell it what you like to eat. It points you to the right neighborhood." },
  { emoji: "🐾", title: "Service Dog Travel Guide", desc: "Everything that comes with traveling internationally with a service animal.", live: true, button: "DOWNLOAD THE GUIDE", href: "/assets/service-dog-travel-guide.pdf", download: true },
];

const comingSoon = [
  { emoji: "🌍", title: "Country Matching App", desc: "Answer a few questions and get matched with the countries where your life, your work, and your next chapter actually fit.", live: true, button: "FIND MY COUNTRY", href: "/quiz" },
  { emoji: "🧭", title: "Move Abroad Roadmap", desc: "Step by step for people who are actually planning to do this.", live: true, button: "GET THE FREE ROADMAP", href: "/assets/move-abroad-roadmap.pdf", download: true },
  { emoji: "📋", title: "What I Learned About Visas", desc: "An honest overview of the options, what I researched, and what nobody told me upfront.", live: true },
  { emoji: "⚠️", title: "Consider Yourself Warned", desc: "The laws, regulations, and unspoken rules nobody warned me about before I moved to Madrid.", live: true, button: "READ IT", href: "/resources/consider-yourself-warned" },
  { emoji: "💰", title: "The Banking and Money Guide", desc: "Opening accounts, transferring money, and avoiding fees. The stuff nobody explains clearly." },
  { emoji: "🧠", title: "The Inner Work", desc: "The mental and emotional preparation guide for anyone about to make a big life change.", live: true, button: "GET THE FREE WORKBOOK", modal: "innerwork" },
  { emoji: "🤝", title: "The Community Guide", desc: "How to find your people in a new city. Groups, spaces, and communities worth knowing in Madrid." },
  { emoji: "🛍️", title: "Digital Products", desc: "Courses, templates, and tools built for people who are ready to make the move or grow what they are building." },
];

const pills = ["Before You Leave", "At the Airport", "Getting Around", "Food & Dining", "Culture", "Safety", "Essential Apps", "Money Tips"];

const Resources = () => {
  const [innerworkOpen, setInnerworkOpen] = useState(false);
  const location = useLocation();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const modal = params.get("modal");
    if (modal === "innerwork") setInnerworkOpen(true);
  }, [location.search]);
  return (
    <div style={{ minHeight: "100vh", background: PAGE_BG }}>
      <Seo
        title="Free Madrid travel and AI language resources"
        description="Free downloadable tools and AI language helpers for visiting Madrid or building a life in Spain. No fluff, just the stuff that actually helps."
        path="/resources"
      />
      <Navbar />
      <main id="main-content" style={{ background: PAGE_BG, paddingTop: 120, paddingBottom: 80 }}>
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
                  href="https://drive.google.com/file/d/1vyQciv-h5zgGyhMQm53cyGYl0MpVf5yB/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"

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
              {planningTools.map((p: any) => {
                const isDownload = p.download;
                const borderColor = isDownload ? "#8B7D3A" : p.live ? GOLD : BORDER;
                const leftBorderWidth = isDownload ? "4px" : p.live ? "1.5px" : "4px";
                const leftBorderColor = isDownload ? "#8B7D3A" : p.live ? GOLD : GOLD;
                return (
                  <div
                    key={p.title}
                    style={{
                      background: "#FFFFFF",
                      border: `1.5px solid ${borderColor}`,
                      borderLeft: `${leftBorderWidth} solid ${leftBorderColor}`,
                      borderRadius: 12,
                      padding: 22,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <span style={{ fontSize: 26, display: "block", marginBottom: 10, lineHeight: 1 }}>{p.emoji}</span>
                    <h3 style={{ fontFamily: display, fontWeight: 700, fontSize: 14, color: INK, lineHeight: 1.3, margin: "0 0 5px" }}>{p.title}</h3>
                    <p style={{ fontFamily: lato, fontSize: 12, color: MUTED, lineHeight: 1.6, margin: 0, marginBottom: p.live && p.href ? 14 : 0, flex: 1 }}>{p.desc}</p>
                    {p.live && p.href && (
                      <a
                        href={p.href}
                        download={isDownload ? "" : undefined}
                        style={{
                          alignSelf: "flex-start",
                          background: isDownload ? "#8B7D3A" : GOLD,
                          color: isDownload ? "#FFFFFF" : INK,
                          fontFamily: lato,
                          fontWeight: 700,
                          fontSize: 10,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          padding: isDownload ? "10px 18px" : "8px 16px",
                          borderRadius: isDownload ? 6 : 20,
                          textDecoration: "none",
                        }}
                      >
                        {p.button}
                      </a>
                    )}
                  </div>
                );
              })}
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
              {comingSoon.map((c: any) => {
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
                const btnStyle: React.CSSProperties = {
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
                  border: "none",
                  cursor: "pointer",
                };
                return (
                  <div key={c.title} style={cardStyle}>
                    <span style={{ fontSize: 26, display: "block", marginBottom: 10, lineHeight: 1 }}>{c.emoji}</span>
                    <h3 style={{ fontFamily: display, fontWeight: 700, fontSize: 14, color: INK, lineHeight: 1.3, margin: "0 0 5px" }}>{c.title}</h3>
                    <p style={{ fontFamily: lato, fontSize: 12, color: MUTED, lineHeight: 1.6, margin: 0, marginBottom: c.live ? 14 : 0, flex: 1 }}>{c.desc}</p>
                    {c.live && c.modal === "innerwork" && (
                      <button type="button" onClick={() => setInnerworkOpen(true)} style={btnStyle}>
                        {c.button}
                      </button>
                    )}
                    {c.live && c.href && c.href.startsWith("/") && (
                      <a href={c.href} style={btnStyle}>
                        {c.button}
                      </a>
                    )}
                    {c.live && c.href && !c.href.startsWith("/") && (
                      <a href={c.href} target="_blank" rel="noopener noreferrer" style={btnStyle}>
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
      
      {innerworkOpen && <InnerWorkModal onClose={() => setInnerworkOpen(false)} />}
      <Footer />
    </div>
  );
};


type InnerWorkModalProps = { onClose: () => void };

const InnerWorkModal = ({ onClose }: InnerWorkModalProps) => {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const triggerDownload = () => {
    const a = document.createElement("a");
    a.href = "/assets/the-inner-work.pdf";
    a.download = "The-Inner-Work.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("https://formspree.io/f/REPLACE_WITH_YOUR_ID", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email, source: "The Inner Work" }),
      });
      if (!res.ok) throw new Error("Submission failed");
      setDone(true);
      triggerDownload();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(20,15,12,0.65)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          background: "#FFFFFF",
          borderTop: `3px solid ${GOLD}`,
          borderRadius: 12,
          maxWidth: 460,
          width: "100%",
          padding: "36px 28px 28px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
        }}
      >
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            background: "transparent",
            border: "none",
            cursor: "pointer",
            color: MUTED,
            padding: 6,
            lineHeight: 0,
          }}
        >
          <X size={20} />
        </button>

        {!done ? (
          <>
            <h2 style={{ fontFamily: display, fontWeight: 700, fontSize: 24, color: INK, margin: "0 0 8px", lineHeight: 1.2 }}>
              The Inner Work
            </h2>
            <p style={{ fontFamily: lato, fontSize: 14, color: MUTED, margin: "0 0 20px", lineHeight: 1.6 }}>
              A workbook for the mental and emotional side of making a big life change. Free.
            </p>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  fontFamily: lato,
                  fontSize: 14,
                  border: `1px solid ${BORDER}`,
                  borderRadius: 6,
                  outline: "none",
                  marginBottom: 12,
                  boxSizing: "border-box",
                }}
              />
              <button
                type="submit"
                disabled={submitting}
                style={{
                  width: "100%",
                  background: GOLD,
                  color: INK,
                  fontFamily: lato,
                  fontWeight: 700,
                  fontSize: 12,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  padding: "13px 18px",
                  borderRadius: 6,
                  border: "none",
                  cursor: submitting ? "wait" : "pointer",
                  opacity: submitting ? 0.7 : 1,
                }}
              >
                {submitting ? "Sending..." : "Send me the workbook"}
              </button>
              <p style={{ fontFamily: lato, fontSize: 11, color: FOOT, textAlign: "center", margin: "10px 0 0" }}>
                No spam. Just the guide.
              </p>
              {error && (
                <p style={{ fontFamily: lato, fontSize: 12, color: TERRA, textAlign: "center", margin: "10px 0 0" }}>
                  {error}
                </p>
              )}
            </form>
          </>
        ) : (
          <div style={{ textAlign: "center", padding: "12px 0 4px" }}>
            <h2 style={{ fontFamily: display, fontWeight: 700, fontSize: 22, color: INK, margin: "0 0 10px", lineHeight: 1.3 }}>
              It is in your inbox.
            </h2>
            <p style={{ fontFamily: display, fontStyle: "italic", fontSize: 16, color: MUTED, margin: "0 0 20px" }}>
              Now do the work.
            </p>
            <button
              type="button"
              onClick={triggerDownload}
              style={{
                background: "transparent",
                color: GOLD,
                fontFamily: lato,
                fontWeight: 700,
                fontSize: 11,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                border: `1px solid ${GOLD}`,
                borderRadius: 6,
                padding: "10px 18px",
                cursor: "pointer",
              }}
            >
              Download again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Resources;
