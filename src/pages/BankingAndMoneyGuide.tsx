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
  { id: "before-you-arrive", label: "Before You Arrive", title: "Before You Arrive" },
  { id: "opening-account", label: "Opening a Spanish Account", title: "Opening a Spanish Account" },
  { id: "fee-reality", label: "The Fee Reality", title: "The Fee Reality" },
  { id: "moving-money", label: "Moving Money Between Countries", title: "Moving Money Between Countries" },
  { id: "bizum", label: "Bizum and Daily Life", title: "Bizum and Daily Life" },
  { id: "us-taxes", label: "Your US Tax Obligations", title: "Your US Tax Obligations While Banking Abroad" },
  { id: "mistakes", label: "Mistakes That Cost People Money", title: "Mistakes That Cost People Money" },
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

const P = ({ children }: { children: React.ReactNode }) => <p style={pStyle}>{children}</p>;
const Sub = ({ children }: { children: React.ReactNode }) => (
  <p style={{ ...pStyle, fontWeight: 700, marginBottom: 8 }}>{children}</p>
);

const BankingAndMoneyGuide = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "The Banking and Money Guide",
    description:
      "Opening accounts, moving money, and avoiding the fees nobody explains clearly when you move to Madrid.",
    author: { "@type": "Person", name: "Kimberly" },
    publisher: { "@type": "Organization", name: "She Left the Chat" },
  };

  return (
    <div style={{ minHeight: "100vh", background: BG }}>
      <Seo
        title="The Banking and Money Guide | She Left the Chat"
        description="Opening accounts, moving money, and avoiding the fees nobody explains clearly when you move to Madrid. Updated regularly."
        path="/resources/banking-and-money-guide"
        ogType="article"
        jsonLd={jsonLd}
      />
      <Navbar />
      <main id="main-content" style={{ background: BG, paddingTop: 100, paddingBottom: 80 }}>
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
              The Banking and Money Guide
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
              Opening accounts, moving money, and avoiding the fees nobody explains clearly.
            </p>

            <p
              style={{
                fontFamily: body,
                fontStyle: "italic",
                fontSize: 13,
                color: MUTED,
                lineHeight: 1.6,
                margin: "20px 0 0",
              }}
            >
              Banking products and fees change. This page gets updated when they do. Last updated June 2026.
            </p>
          </div>
        </header>

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

        <article style={{ maxWidth: 740, margin: "0 auto", padding: "0 24px" }}>
          <Section id="before-you-arrive" title="Before You Arrive">
            <P>Get your financial infrastructure in place before you land. You will have enough to deal with in your first two weeks without also trying to open a bank account.</P>
            <Sub>Open a digital account from the US first.</Sub>
            <P>Wise, N26, and Revolut all let you open an account before you have a NIE or a Spanish address. This gives you a Euro IBAN immediately, which means you can pay a deposit on an apartment, set up a phone contract, or pay for a short-term rental before you have any Spanish paperwork at all. Do this from home. It takes a few days and removes one entire category of stress from your arrival.</P>
            <Sub>Know that none of these three replace a Spanish bank account long-term.</Sub>
            <P>They are excellent for the first weeks and excellent for international transfers, but they do not support Bizum, Spain's instant payment system that locals use constantly, and they are not always accepted for things like setting up utilities or payroll. Think of them as your bridge, not your destination.</P>
            <Sub>Tell your US bank and credit cards you are moving before you go.</Sub>
            <P>Notify them of international use to avoid fraud holds at the worst possible moment, like standing at a Madrid ATM with no other way to access cash.</P>
          </Section>

          <Rule />

          <Section id="opening-account" title="Opening a Spanish Account">
            <P>Once you have your NIE and your empadronamiento, you can open a full Spanish account. Here is the honest state of the major options as of 2026.</P>
            <Sub>The traditional banks: Santander, BBVA, CaixaBank, Sabadell.</Sub>
            <P>All four accept foreigners. All four advertise fee-free accounts that are not actually fee-free unless you meet conditions, usually a minimum monthly direct deposit (often €600 to €1,000), a minimum number of card transactions per quarter, or active direct debits. Miss the conditions and you are paying €160 to €240 a year for an account you thought was free. Read the actual terms, not the marketing page.</P>
            <Sub>Sabadell and CaixaBank's HolaBank have the most expat-specific support.</Sub>
            <P>Both have a longer history of working with foreigners and relocation services, and English-speaking staff is more consistently available, particularly outside Madrid's city center. If in-person support matters to you, start there.</P>
            <Sub>Santander has the largest network and the easiest non-resident account.</Sub>
            <P>Their non-resident account can be opened with just a passport, and as of early 2025, EU residents can open it fully online without a branch visit. This makes Santander a reasonable first stop if you want one institution that can grow with you from non-resident to full resident status.</P>
            <P>What you will need at the appointment: passport, NIE, empadronamiento certificate, and sometimes proof of income or an employment contract. Bring all of it even if you are not sure it will be asked for. Appointments typically run 30 to 60 minutes once your documents are complete.</P>
          </Section>

          <Rule />

          <Section id="fee-reality" title="The Fee Reality">
            <P>This is the section that will save you actual money, so read it slowly.</P>
            <Sub>The conditions attached to "free" accounts are real and enforced.</Sub>
            <P>A bank can and will start charging you the moment you fall below the minimum salary deposit or stop meeting the card-use requirement. This is not a one-time warning. It is a recurring monthly or annual fee that shows up quietly.</P>
            <Sub>Non-resident accounts cost more, structurally.</Sub>
            <P>If you are banking as a non-resident (no NIE yet, or choosing to stay non-resident for tax reasons), expect higher annual maintenance fees, often €60 to €120 a year, plus a requirement to renew your certificado de no residencia roughly every 24 months for a small fee. This is the cost of flexibility. Know you are paying for it.</P>
            <Sub>ATM fees outside your bank's network add up fast.</Sub>
            <P>Spanish banks routinely charge for using another bank's ATM, on top of whatever your home bank charges for foreign withdrawals. Identify your bank's fee-free ATM network early and route your cash withdrawals through it.</P>
            <Sub>Account freezes happen, and they are the actual horror story in expat groups.</Sub>
            <P>Spain's anti-money-laundering regulations mean banks can and do freeze accounts that show patterns they flag, large unexplained transfers, inconsistent activity, missing documentation on file. It is rare but it is real, and when it happens it can take weeks to resolve. Keep your account documentation current and avoid large irregular transfers without a paper trail explaining them.</P>
          </Section>

          <Rule />

          <Section id="moving-money" title="Moving Money Between Countries">
            <Sub>Wise is generally the best value for transfers between US and Spanish accounts.</Sub>
            <P>The exchange rate is close to the actual market rate and the fee is transparent before you send. Compare it against your bank's transfer fee before assuming your bank is cheaper. It almost never is.</P>
            <Sub>Revolut is a strong second option, particularly if you are also using it for daily spending.</Sub>
            <P>The two work well together: Wise for larger periodic transfers, Revolut for day-to-day spending and smaller moves.</P>
            <Sub>Avoid airport currency exchange and hotel exchange desks entirely.</Sub>
            <P>The rates are built to profit from convenience, not to serve you. If you land and need cash immediately, withdraw a small amount from an ATM rather than exchanging at the airport counter.</P>
            <Sub>Set a recurring transfer if your income depends on it.</Sub>
            <P>If you are living on a pension, savings drawdown, or remote income from the US, automate your monthly transfer rather than doing it manually. It removes a decision point and protects you from forgetting during a busy week, which happens more than people expect once daily life takes over.</P>
          </Section>

          <Rule />

          <Section id="bizum" title="Bizum and Daily Life">
            <P>Bizum is Spain's instant person-to-person payment system, and it is genuinely woven into daily life here in a way that has no real US equivalent. Splitting a dinner bill, paying a friend back, paying a small local vendor: Bizum is how it happens, instantly, by phone number.</P>
            <P>The catch: Wise, N26, and Revolut do not support it. This is the most common reason people end up opening a traditional Spanish account even after getting comfortable with a digital one. Without Bizum, you become the person at the table fumbling with cash while everyone else has already settled up on their phone.</P>
            <P>Once you have your NIE and a Spanish account, set up Bizum in the first week. It is a small thing that makes you feel meaningfully more local, faster than almost anything else on this list.</P>
          </Section>

          <Rule />

          <Section id="us-taxes" title="Your US Tax Obligations While Banking Abroad">
            <P>This is not optional and it does not go away because you are excited about your new life.</P>
            <Sub>You file US taxes regardless of where you live.</Sub>
            <P>The US taxes citizens on worldwide income, not residency. Living in Madrid does not pause this. The Foreign Earned Income Exclusion lets you exclude a meaningful amount of foreign-earned income, and the Foreign Tax Credit covers taxes you have already paid to Spain, but you have to file to claim either one.</P>
            <Sub>If you hold more than $10,000 across foreign accounts at any point in the year, you file an FBAR.</Sub>
            <P>This is separate from your tax return and has its own deadline. It applies even if the money moved through your account briefly and the balance is usually much lower. Track your high-water balance across every foreign account you hold, including Wise and Revolut.</P>
            <Sub>Find a tax preparer who specifically works with US expats.</Sub>
            <P>A general accountant who has not handled foreign accounts before will miss things, sometimes expensive things. This is a research task worth doing before your first tax season abroad, not during it.</P>
          </Section>

          <Rule />

          <Section id="mistakes" title="Mistakes That Cost People Money">
            <P>Things I watched happen to people, or that happened to me.</P>
            <P>Opening only a digital account and then discovering at month four that paying rent, splitting bills with new friends, and registering for the public health system all assumed you had Bizum.</P>
            <P>Not reading the conditions on a "free" account and getting hit with a year of retroactive fees when a direct deposit pattern changed.</P>
            <P>Exchanging a large sum of money at the airport on arrival day because the adrenaline of landing overrode the planning that happened weeks earlier.</P>
            <P>Letting a foreign account's balance creep past $10,000 without realizing the FBAR threshold had been crossed, and only finding out at tax time.</P>
            <P>Assuming a US accountant who has never filed an FBAR would catch all of this. They did not.</P>
          </Section>

          <Rule my={56} />

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
                emoji: "⚠️",
                title: "Consider Yourself Warned",
                desc: "The laws, regulations, and rules nobody told me about.",
                to: "/resources/consider-yourself-warned",
              },
              {
                emoji: "🗺️",
                title: "The Move Abroad Roadmap",
                desc: "The step-by-step logistics guide.",
                to: "/resources",
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

export default BankingAndMoneyGuide;
