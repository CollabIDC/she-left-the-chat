import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";

const BG = "#FAF7F2";
const INK = "#1C1C1C";
const OLIVE = "#8B7D3A";
const MUTED = "#5C5448";

const display = "'Playfair Display', Georgia, serif";
const body = "'Inter', system-ui, sans-serif";

const sections = [
  { id: "legal", label: "The Legal Stuff", title: "The Legal Stuff Nobody Explains Clearly" },
  { id: "bureaucracy", label: "The Bureaucracy", title: "The Bureaucracy" },
  { id: "money", label: "Money and Banking", title: "Money and Banking" },
  { id: "rental", label: "The Rental Market", title: "The Rental Market" },
  { id: "social", label: "The Social Rules", title: "The Social Rules" },
  { id: "daily", label: "Day-to-Day Realities", title: "Day-to-Day Realities" },
  { id: "surprise", label: "The Things That Will Actually Surprise You", title: "The Things That Will Actually Surprise You" },
];

const h2Style: React.CSSProperties = {
  fontFamily: display,
  fontWeight: 700,
  fontSize: 30,
  color: INK,
  margin: "0 0 20px",
  lineHeight: 1.2,
  scrollMarginTop: 100,
};

const h3Style: React.CSSProperties = {
  fontFamily: display,
  fontWeight: 700,
  fontSize: 19,
  color: INK,
  margin: "28px 0 10px",
  lineHeight: 1.3,
};

const pStyle: React.CSSProperties = {
  fontFamily: body,
  fontSize: 16.5,
  lineHeight: 1.7,
  color: INK,
  margin: "0 0 16px",
};

const Rule = ({ opacity = 0.4, my = 40 }: { opacity?: number; my?: number }) => (
  <hr style={{ border: 0, borderTop: `1px solid ${OLIVE}`, opacity, margin: `${my}px 0` }} />
);

const Section = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => (
  <section id={id} style={{ marginTop: 48 }}>
    <h2 style={h2Style}>{title}</h2>
    {children}
  </section>
);

const ConsiderYourselfWarned = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Consider Yourself Warned",
    description: "The laws, regulations, and unspoken rules nobody warned me about before I moved to Madrid.",
    author: { "@type": "Person", name: "Kimberly" },
    publisher: { "@type": "Organization", name: "She Left the Chat" },
  };

  return (
    <div style={{ minHeight: "100vh", background: BG }}>
      <Seo
        title="Consider Yourself Warned | She Left the Chat"
        description="The laws, regulations, and unspoken rules nobody warned me about before I moved to Madrid. Written from experience, updated regularly."
        path="/resources/consider-yourself-warned"
        ogType="article"
        jsonLd={jsonLd}
      />
      <Navbar />
      <main id="main-content" style={{ background: BG, paddingTop: 100, paddingBottom: 80 }}>
        {/* Header */}
        <header
          style={{
            borderTop: `3px solid ${OLIVE}`,
            background: BG,
            paddingTop: 32,
            paddingBottom: 28,
          }}
        >
          <div style={{ maxWidth: 740, margin: "0 auto", padding: "0 24px" }}>
            <Link
              to="/resources"
              style={{
                fontFamily: body,
                fontSize: 13,
                color: OLIVE,
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              ← Back to Resources
            </Link>

            <h1
              style={{
                fontFamily: display,
                fontWeight: 700,
                fontSize: 46,
                color: INK,
                lineHeight: 1.1,
                margin: "28px 0 16px",
              }}
            >
              Consider Yourself Warned
            </h1>
            <p
              style={{
                fontFamily: display,
                fontStyle: "italic",
                fontSize: 19,
                color: MUTED,
                lineHeight: 1.5,
                margin: 0,
              }}
            >
              The laws, regulations, and unspoken rules nobody told me about before I moved to Madrid.
            </p>
            <Rule my={24} />
            <p
              style={{
                fontFamily: body,
                fontStyle: "italic",
                fontSize: 13.5,
                color: MUTED,
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              This page gets updated as I learn new things. Last updated 2025. If something has changed, or something
              is missing that burned you, send me a note.
            </p>
          </div>
        </header>

        {/* Anchor nav */}
        <nav style={{ maxWidth: 740, margin: "0 auto", padding: "28px 24px 0" }}>
          <div
            style={{
              fontFamily: body,
              fontSize: 13,
              color: OLIVE,
              lineHeight: 1.9,
              textAlign: "center",
            }}
          >
            {sections.map((s, i) => (
              <span key={s.id}>
                <a href={`#${s.id}`} style={{ color: OLIVE, textDecoration: "none" }}>
                  {s.label}
                </a>
                {i < sections.length - 1 && <span style={{ margin: "0 10px", opacity: 0.6 }}>·</span>}
              </span>
            ))}
          </div>
        </nav>

        {/* Body */}
        <article style={{ maxWidth: 740, margin: "0 auto", padding: "0 24px" }}>
          <Section id="legal" title="The Legal Stuff Nobody Explains Clearly">
            <p style={pStyle}>
              Let's start here because this is the one that catches people when it actually matters, at a border
              control desk or a bank window or a notary's office, and by then it is too late to ask questions.
            </p>

            <h3 style={h3Style}>Your NIE and your TIE are not the same thing.</h3>
            <p style={pStyle}>
              Your NIE (Número de Identificación de Extranjero) is your foreign identification number. It is a number,
              not a card, and you need it for almost everything: opening a bank account, signing a lease, registering
              for anything official. You get it assigned when you apply for your visa or through a police station
              process once you arrive.
            </p>
            <p style={pStyle}>
              Your TIE (Tarjeta de Identidad de Extranjero) is your physical residency card. It has your NIE printed
              on it but it is a separate document and a separate process. People confuse them constantly and then show
              up to appointments with the wrong one. Know which one is being asked for before you go anywhere.
            </p>

            <h3 style={h3Style}>Empadronamiento is not optional, it is foundational.</h3>
            <p style={pStyle}>
              Registering your address at your local town hall (ayuntamiento) gives you a certificate called the
              empadronamiento. You need this certificate to get your TIE, to access certain public services, to enroll
              children in school, and often to open bank accounts. Your landlord must provide a signed letter
              confirming you live there. Get this done in your first two weeks. Everything else is slower without it.
            </p>

            <h3 style={h3Style}>The Golden Visa is gone.</h3>
            <p style={pStyle}>
              Spain ended its Golden Visa program on April 3, 2025. If you were counting on the €500,000 real estate
              investment route to residency, that door is closed. Existing holders keep their rights. New applicants
              do not. Your options now are the Non-Lucrative Visa, the Digital Nomad Visa, or the Entrepreneur Visa.
              Know which one fits your situation before you start any paperwork.
            </p>

            <h3 style={h3Style}>You are still required to file US taxes from Spain.</h3>
            <p style={pStyle}>
              This surprises people every year. The United States taxes based on citizenship, not residency. Living
              in Madrid does not end your US tax obligation. You file every year, full stop. The Foreign Earned
              Income Exclusion (up to $130,000 for 2025) and Foreign Tax Credits help reduce or eliminate what you
              owe, but you have to file to claim them. If you have more than $10,000 in foreign bank accounts at any
              point during the year, you also file an FBAR separately. Find a US expat tax specialist before your
              first year ends. A general accountant who does not work with expats will miss things.
            </p>

            <h3 style={h3Style}>Spain considers you a tax resident after 183 days.</h3>
            <p style={pStyle}>
              Once you cross that threshold in a calendar year, you are subject to Spanish income tax on your
              worldwide income. This interacts with your US tax obligations in ways that require professional
              guidance. Do not wing this.
            </p>
          </Section>

          <Rule />

          <Section id="bureaucracy" title="The Bureaucracy">
            <p style={pStyle}>
              I want to say this gently and then I want to say it honestly. The Spanish bureaucratic system operates
              on its own timeline, uses its own logic, and does not particularly care about yours. This is not an
              insult. It is just a fact of life here, and the people who struggle most are the ones who arrive
              expecting it to work the way things work at home.
            </p>

            <h3 style={h3Style}>Everything requires an appointment and appointments are hard to get.</h3>
            <p style={pStyle}>
              Police stations, immigration offices, the social security office, the tax authority: nearly all of them
              operate by appointment only, and the available slots are often weeks out. Book appointments the moment
              you know you need them, not when you feel ready. The appointment is the bottleneck, not your
              preparation.
            </p>

            <h3 style={h3Style}>Bring more copies than you think you need.</h3>
            <p style={pStyle}>
              Original plus two copies is the baseline. Some offices want originals. Some want certified copies. Some
              want both. I have never once regretted bringing extra copies. I have regretted not bringing them more
              times than I can count.
            </p>

            <h3 style={h3Style}>Systems do not talk to each other.</h3>
            <p style={pStyle}>
              Do not assume that because one office has your paperwork, another one does. Spain's administrative
              systems are not integrated in the way Americans are used to. You will hand over the same document in
              three different offices and be told by each one that they have no record of it. Bring your full file to
              every appointment.
            </p>

            <h3 style={h3Style}>Get a gestor.</h3>
            <p style={pStyle}>
              A gestor is a Spanish administrative professional, not a lawyer but someone who knows the bureaucratic
              system inside out and can navigate it on your behalf. For visa applications, residency renewals, tax
              filings, and registering as self-employed, a good gestor is not a luxury. It is the difference between
              your application going through and being returned for a missing stamp three months later. Ask for
              recommendations in expat communities. Personal referrals are more reliable than Google results here.
            </p>
          </Section>

          <Rule />

          <Section id="money" title="Money and Banking">
            <h3 style={h3Style}>Your US credit history does not transfer.</h3>
            <p style={pStyle}>
              You will arrive in Spain financially invisible. No credit score, no history, no track record. This
              affects your ability to rent an apartment, set up a mobile phone contract, and get any kind of credit.
              Landlords often work around this by requiring larger deposits or a Spanish guarantor. Expect it and
              plan for it.
            </p>

            <h3 style={h3Style}>Spanish banks charge fees for everything.</h3>
            <p style={pStyle}>
              Monthly maintenance fees, transfer fees, fees for not meeting minimum balance requirements. Read the
              terms carefully before you open an account. Santander and BBVA are the largest and have
              English-speaking staff at some Madrid branches, but shop around. Many expats use digital options like
              Wise or N26 as their primary accounts because the fee structure is more transparent and more
              favorable.
            </p>

            <h3 style={h3Style}>You will likely need a Wise account before you have a Spanish bank account.</h3>
            <p style={pStyle}>
              Most Spanish banks require a NIE to open an account. Your NIE takes time to get. A Wise account gives
              you a Euro IBAN immediately, which you can use to pay rent and receive transfers while you sort out
              your Spanish banking. Open it before you leave home.
            </p>

            <h3 style={h3Style}>Your electricity bill will shock you.</h3>
            <p style={pStyle}>
              Electricity in Spain is expensive and the billing structure is complicated. There are charges for the
              power you actually use and charges for contracted capacity regardless of usage. Many apartments are
              contracted at a low capacity level, which means if you run several appliances at once the circuit
              trips. Check the contracted capacity before you sign a lease and consider whether it matches how you
              actually live.
            </p>

            <h3 style={h3Style}>IVA is already in the price.</h3>
            <p style={pStyle}>
              Spain's VAT (Impuesto sobre el Valor Añadido) is 21% on most goods and services. Unlike in the US, it
              is included in displayed prices. What you see is what you pay. This is genuinely pleasant after years
              of adding tax at the register, but it catches people off guard when they expect the menu price to go up
              at checkout.
            </p>
          </Section>

          <Rule />

          <Section id="rental" title="The Rental Market">
            <h3 style={h3Style}>Finding an apartment without a Spanish guarantor is genuinely difficult.</h3>
            <p style={pStyle}>
              Landlords in Madrid often request a Spanish guarantor, meaning a Spanish resident who agrees to be
              liable if you do not pay. As a new arrival with no local credit history and possibly no NIE yet, you
              are a risk in the eyes of many landlords. The workarounds: offer two or three months deposit upfront
              instead of the standard one, show strong bank statements and proof of income, and look for landlords
              who have rented to expats before. They exist and they are worth finding.
            </p>

            <h3 style={h3Style}>Short-term rentals in Madrid just got significantly more complicated.</h3>
            <p style={pStyle}>
              A national law that came into effect in April 2025 now requires 60% approval from a building's property
              owners before a short-term tourist rental can operate. Madrid's city government had already frozen new
              tourist rental licenses. If you are planning to do a short-term furnished rental to test the city
              before committing to a long-term lease, this matters. Confirm that the apartment you are renting is
              licensed and legally operating. Around 14,000 listings in Madrid were operating without proper
              licensing as of 2025. Staying in one puts you in a legal gray zone.
            </p>

            <h3 style={h3Style}>Read your lease carefully, in Spanish, with help.</h3>
            <p style={pStyle}>
              Spanish rental law differs from US law in ways that matter. Breaking a lease early typically carries a
              financial penalty of one month's rent for every year remaining on the contract. Deposits are legally
              capped at one month's rent for unfurnished properties and two months for furnished, but landlords may
              request more informally. Know your rights before you sign. Your gestor can review a contract before you
              commit.
            </p>

            <h3 style={h3Style}>Furnished versus unfurnished is a bigger decision than it sounds.</h3>
            <p style={pStyle}>
              Unfurnished in Spain often means no light fixtures, no kitchen appliances, sometimes no wardrobes.
              Furnished apartments cost more per month but save you the upfront cost and logistical difficulty of
              equipping a place from scratch in a city where you do not yet know where anything is. For your first
              apartment, furnished is almost always the right call.
            </p>
          </Section>

          <Rule />

          <Section id="social" title="The Social Rules">
            <h3 style={h3Style}>Do not ask someone what they do for a living when you first meet them.</h3>
            <p style={pStyle}>
              This is the American reflex and it lands badly here. In Spain, asking about profession in early
              conversation feels intrusive. You will find out eventually. Lead with the conversation, not the resume.
            </p>

            <h3 style={h3Style}>Dinner is at nine. Not six. Not seven. Nine.</h3>
            <p style={pStyle}>
              If you sit down to dinner at six, you will be eating alone, surrounded by restaurant staff who are still
              setting up. The menu del día, the fixed-price lunch menu that is genuinely one of the best deals in
              Madrid (usually €12 to €15 for three courses with wine), is a midday institution. Lunch is the main
              meal. Dinner is lighter and later than anything you are used to.
            </p>

            <h3 style={h3Style}>Warmth is not the same as friendship.</h3>
            <p style={pStyle}>
              Spaniards are warm, genuinely so. They will greet you, include you in conversation, make you feel
              welcome. This can feel like the beginning of a deep friendship when it is often just how people are
              here. Real friendship in Spain tends to take longer to develop and runs deeper when it does. Do not
              mistake social warmth for closeness that has not been built yet. And do not take it personally when the
              warmth does not immediately become more.
            </p>

            <h3 style={h3Style}>Arrive fifteen to thirty minutes late to social events.</h3>
            <p style={pStyle}>
              Punctuality at Spanish social gatherings is flexible in a way that is culturally understood, not rude.
              If someone invites you to dinner at nine, showing up at nine sharp may put you in the awkward position
              of arriving before the host is ready. Ask locally if you are unsure about a specific event, but assume
              social time is more fluid than you are used to.
            </p>

            <h3 style={h3Style}>Noise rules are more specific than you expect, and your neighbors will enforce them.</h3>
            <p style={pStyle}>
              Madrid's noise ordinance caps nighttime residential noise at 45 decibels. Quiet hours are typically
              10pm to 8am on weekdays. The practical reality is that apartment buildings have thin walls, and the
              neighbors have been there longer than you have. Keep it down after 10pm. This includes rolling
              suitcases across tile floors, which carry sound through an entire building.
            </p>

            <h3 style={h3Style}>Separate your recycling.</h3>
            <p style={pStyle}>
              Madrid has a strict color-coded waste system: yellow containers for plastic and cans, blue for paper
              and cardboard, green igloos for glass, gray for general waste. Brown containers exist for organic waste
              in some areas. Non-compliance is noticeable and in some cases carries fines. Learn the system in your
              first week.
            </p>

            <h3 style={h3Style}>Do not touch produce at markets or small shops.</h3>
            <p style={pStyle}>
              The vendor selects and bags your produce. You tell them what you want and how much. Reaching in to
              squeeze the tomatoes yourself is considered rude. This also applies to bread at many bakeries.
            </p>
          </Section>

          <Rule />

          <Section id="daily" title="Day-to-Day Realities">
            <h3 style={h3Style}>August is its own category of experience.</h3>
            <p style={pStyle}>
              Madrid in August is hot, quiet, and in many neighborhoods, borderline empty. Many businesses, including
              small shops, some restaurants, and various services, close entirely for two to four weeks. If you are
              arriving in August, it is a beautiful time to learn the city. It is a terrible time to try to get
              anything administrative done. Plan accordingly and do not schedule important appointments in August.
            </p>

            <h3 style={h3Style}>Sunday is genuinely closed.</h3>
            <p style={pStyle}>
              Not a little slow. Closed. Most shops, many restaurants, nearly all services. Sunday in Madrid is a day
              for families, parks, and long lunches. Plan your week accordingly. Run your errands on Saturday.
            </p>

            <h3 style={h3Style}>Customer service operates on different premises here.</h3>
            <p style={pStyle}>
              The American expectation that the customer is always right, that you can escalate a complaint and get a
              resolution, that a manager will make it right: this does not reliably translate. Spanish customer
              service is often friendly but the system for returns, refunds, and formal complaints is more rigid and
              less immediately responsive. Return windows are shorter. Refunds take longer. Adjust your expectations
              rather than your volume.
            </p>

            <h3 style={h3Style}>Your US prescription may not exist here under the same name.</h3>
            <p style={pStyle}>
              Brand names for medications differ between countries. Some medications available over the counter in
              the US require a prescription in Spain. Some simply do not exist here under any name. Bring enough of
              any essential medication to cover your first three months and arrive with a letter from your doctor
              explaining your condition and the medication's generic name. Find a doctor early, before you need one
              urgently.
            </p>

            <h3 style={h3Style}>Your US appliances will not work without a converter, and some will still fail.</h3>
            <p style={pStyle}>
              Spain uses 220 volts at 50 hertz. The US runs on 110 volts at 60 hertz. A voltage converter handles the
              voltage difference but not the frequency difference, which matters for some appliances like certain
              hair tools and some kitchen appliances. Research each device before you pack it. In most cases,
              replacing appliances in Madrid is simpler and cheaper than converting them.
            </p>
          </Section>

          <Rule />

          <Section id="surprise" title="The Things That Will Actually Surprise You">
            <p style={pStyle}>These are the ones that did not come from a guide. They came from being here.</p>

            <h3 style={h3Style}>The loneliness hits around week six or eight, not week one.</h3>
            <p style={pStyle}>
              Week one is adrenaline. Week six is a Tuesday and you have handled enough bureaucracy that the
              excitement has worn off and you realize you do not have anyone to call who will understand exactly
              where you are in the city when you describe it. This is normal. It is not a sign that you made a
              mistake. It is a sign that building a life somewhere new takes longer than a month and that is just the
              truth. Get through week eight. It shifts.
            </p>

            <h3 style={h3Style}>Spaniards hold eye contact longer than Americans are used to.</h3>
            <p style={pStyle}>
              On the metro, in a shop, passing on the street. It is not aggressive and it is not flirting. It is just
              how people make contact here. You can hold the gaze, nod, look away. Do not stare back as a challenge
              because that is not what is happening.
            </p>

            <h3 style={h3Style}>The city walks slowly.</h3>
            <p style={pStyle}>
              Madrid is a walking city and it walks at its own pace. If you are used to New York or Chicago sidewalk
              velocity, the adjustment takes time. Moving through crowds quickly reads as anxious here. Slow down.
              The city rewards it.
            </p>

            <h3 style={h3Style}>The menu del día will change your relationship with lunch.</h3>
            <p style={pStyle}>
              Three courses, bread, a drink, and sometimes dessert or coffee, for around twelve to fifteen euros in a
              sit-down restaurant. This is lunch here. It is not fast food. It is not expensive. It is an
              institution, and one of the genuinely great everyday pleasures of living in Madrid. Find your
              neighborhood spot in the first two weeks. Go regularly. They will start to know your order.
            </p>
          </Section>

          <Rule my={56} />

          {/* Related resources */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 18,
              marginTop: 8,
            }}
          >
            {[
              {
                emoji: "🗺️",
                title: "The Move Abroad Roadmap",
                desc: "The step-by-step logistics guide.",
                to: "/resources?modal=roadmap#coming-soon",
              },
              {
                emoji: "📋",
                title: "The Inner Work",
                desc: "The emotional preparation guide.",
                to: "/resources?modal=innerwork#coming-soon",
              },
            ].map((c) => (
              <Link
                key={c.title}
                to={c.to}
                style={{
                  background: "#FFFFFF",
                  border: `1px solid ${OLIVE}`,
                  borderLeft: `4px solid ${OLIVE}`,
                  borderRadius: 10,
                  padding: 20,
                  textDecoration: "none",
                  display: "block",
                }}
              >
                <span style={{ fontSize: 22, display: "block", marginBottom: 8 }}>{c.emoji}</span>
                <div
                  style={{
                    fontFamily: display,
                    fontWeight: 700,
                    fontSize: 16,
                    color: INK,
                    marginBottom: 4,
                  }}
                >
                  {c.title}
                </div>
                <div style={{ fontFamily: body, fontSize: 13.5, color: MUTED, lineHeight: 1.5 }}>{c.desc}</div>
              </Link>
            ))}
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default ConsiderYourselfWarned;
