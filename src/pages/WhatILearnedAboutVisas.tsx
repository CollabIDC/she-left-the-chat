import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";

const BG = "#FAF7F2";
const INK = "#1C1C1C";
const OLIVE = "#8B7D3A";
const MUTED = "#5C5448";
const CALLOUT_BG = "#F5F0E4";

const display = "'Playfair Display', Georgia, serif";
const body = "'Inter', system-ui, sans-serif";

const sections = [
  { id: "decision", label: "The Big Decision I Had to Make", title: "The Big Decision I Had to Make" },
  { id: "inside-spain", label: "Why I Applied From Inside Spain", title: "Why I Applied From Inside Spain" },
  { id: "requirements", label: "What the Digital Nomad Visa Actually Requires", title: "What the Digital Nomad Visa Actually Requires" },
  { id: "documents", label: "The Document Reality", title: "The Document Reality" },
  { id: "thirty-day", label: "The 30-Day Rule Nobody Talks About", title: "The 30-Day Rule Nobody Talks About" },
  { id: "permanent", label: "The Permanent Residency Trap", title: "The Permanent Residency Trap" },
  { id: "other-visas", label: "The Other Visa Options", title: "The Other Visa Options" },
  { id: "lawyer", label: "Should You Use a Lawyer", title: "Should You Use a Lawyer" },
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

const WhatILearnedAboutVisas = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "What I Learned About Visas",
    description:
      "An honest overview of Spain's visa options, what I researched, and what nobody told me upfront.",
    author: { "@type": "Person", name: "Kimberly" },
    publisher: { "@type": "Organization", name: "She Left the Chat" },
  };

  return (
    <div style={{ minHeight: "100vh", background: BG }}>
      <Seo
        title="What I Learned About Visas | She Left the Chat"
        description="I got the Digital Nomad Visa by applying from inside Spain. Here is what I learned about the process, the document reality, and what nobody tells you about permanent residency."
        path="/resources/what-i-learned-about-visas"
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
              What I Learned About Visas
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
              An honest overview of the options, what I researched, and what nobody told me upfront.
            </p>

            <div
              style={{
                background: CALLOUT_BG,
                borderLeft: `4px solid ${OLIVE}`,
                borderRadius: 8,
                padding: "16px 20px",
                margin: "28px 0 14px",
                fontFamily: body,
                fontSize: 13.5,
                lineHeight: 1.65,
                color: INK,
              }}
            >
              I am not an immigration lawyer. I got the Digital Nomad Visa with the help of a Spanish
              immigration lawyer based in Madrid. What follows is my personal experience and research, not
              legal advice. Immigration rules change frequently. The numbers and requirements on this page
              are updated as of June 2026, but always verify your specific situation with a qualified
              immigration professional before making any decisions.
            </div>

            <p
              style={{
                fontFamily: body,
                fontStyle: "italic",
                fontSize: 13,
                color: MUTED,
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              Last updated June 2026. This page is updated when rules change.
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
          <Section id="decision" title="The Big Decision I Had to Make">
            <P>Before I could research anything else, I had to figure out which visa I was even eligible for. This sounds like it should be a simple step. It is not.</P>
            <P>Spain has several paths for non-EU residents and each one has a different set of requirements, a different income threshold, and a different relationship to work. Choosing the wrong one is not just a paperwork problem. It is the kind of mistake that can require leaving the country and starting over.</P>
            <P>The two most common options for Americans moving to Madrid are the Non-Lucrative Visa and the Digital Nomad Visa. They sound like they might be similar. They are not.</P>
            <P>The Non-Lucrative Visa is for people who can prove passive income, savings, pension, or investment returns without actively working in Spain or anywhere else. If you work remotely while on this visa, you are violating the terms. This is not a technicality. People have had renewals denied because of it.</P>
            <P>The Digital Nomad Visa is specifically for remote workers and freelancers whose income comes from clients or employers outside Spain. It allows you to work legally while living in Spain. This was the right visa for my situation.</P>
            <P>The question of which one fits you depends entirely on your income type, not just your income level. If you are drawing a pension or living off investments and not working, the Non-Lucrative Visa is your path. If you are working remotely for a company or clients outside Spain, the Digital Nomad Visa is yours. If you are somewhere in between, you need a lawyer before you do anything else.</P>
          </Section>

          <Rule />

          <Section id="inside-spain" title="Why I Applied From Inside Spain">
            <P>This is the part that surprised people the most when I told them.</P>
            <P>Most of what you read online about the Digital Nomad Visa describes applying through a Spanish consulate in the US. That process can take up to eight months from start to finish. Eight months of waiting, often without your passport, dependent on a consulate that may have a two-month appointment backlog before you even submit anything.</P>
            <P>What almost nobody writes about is the alternative. If you are legally present in Spain, including on a standard US tourist entry, you can apply for the Digital Nomad Visa residency permit directly from inside Spain through a unit called the UGE (Unidad de Grandes Empresas y Colectivos Estratégicos). You do not need a prior telework visa to do this. The Spanish government states this explicitly.</P>
            <P>The in-country route gives you a three-year residency permit rather than the one-year visa you get through a consulate. It also triggers a legal response requirement. The administration has 30 days to respond to your application. If they do not respond within that window, the application is considered approved by default under the principle of silencio administrativo positivo. You do not get a card automatically at that point but you do have implied approval and a legal basis to follow up and get your documentation.</P>
            <P>I entered Spain on my US passport, which gives Americans up to 90 days in the Schengen Area without a visa. I applied for residency before those 90 days expired. I had my lawyer in Madrid handle the submission. The timeline was a fraction of what it would have been through a US consulate.</P>
            <P>This route is not widely advertised and it is not without its own paperwork demands. But if you are planning to spend time in Spain before committing to residency anyway, which I would recommend regardless, applying from inside the country is worth serious consideration.</P>
            <P>One thing to be clear about: this only works if you apply before your legal entry period expires. Overstaying your tourist entry and then applying does not work. The legal presence requirement is real and it is verified.</P>
          </Section>

          <Rule />

          <Section id="requirements" title="What the Digital Nomad Visa Actually Requires">
            <P>Here are the requirements as of June 2026. These numbers are tied to Spain's minimum wage (SMI), which is updated annually. Verify current figures before you apply.</P>
            <P><strong>Income.</strong> You must demonstrate a minimum monthly income of €2,849 for a single applicant (200% of the 2026 SMI). If you are bringing a spouse or partner, add €1,068 per month. Each dependent child adds €356 per month. Immigration lawyers generally recommend showing at least €3,000 per month as a single applicant to account for currency fluctuations and documentation margin.</P>
            <P><strong>How income is verified.</strong> Bank statements showing consistent deposits, a work contract or client contracts, payslips or invoices for the prior three to six months. As of 2026 the UGE is scrutinizing whether your bank statements match your declared income. A contract that says one number and statements that show another is a fast path to rejection.</P>
            <P><strong>Employment history.</strong> You must have been working for your current employer or clients for at least three months before applying. If you just started a new remote job, wait until you have a clean three-month history before submitting.</P>
            <P><strong>Your employer.</strong> If you are a W2 employee, your employer must have been in operation for at least one year and you must be able to prove they have authorized remote work from Spain.</P>
            <P><strong>Qualifications.</strong> Either an undergraduate or postgraduate degree from a recognized institution, or at least three years of professional experience in your current field.</P>
            <P><strong>Health insurance.</strong> Private health insurance with no copays, no deductibles, full coverage in Spain matching the Spanish public health system standard, and repatriation coverage. Providers commonly accepted include Sanitas, Adeslas, and Asisa. Travel insurance does not qualify.</P>
            <P><strong>Criminal record certificate.</strong> Issued by your country of residence for the past two years, apostilled, and translated into Spanish if not already in Spanish. It must be less than six months old at the time of filing.</P>
            <P><strong>The Spanish client limit.</strong> If you are a freelancer, no more than 20% of your total income can come from Spanish clients. Document your client geography carefully. This is one of the most common reasons freelance applications are refused or later revoked.</P>
            <P><strong>Application fee.</strong> As of 2026, the government fee (tasa 790-038) is €73.26 per applicant.</P>
          </Section>

          <Rule />

          <Section id="documents" title="The Document Reality">
            <P>I want to spend a moment on documents because the list above looks manageable until you are actually doing it.</P>
            <P>Every foreign document needs to be apostilled. An apostille is an authentication recognized between countries that have signed the Hague Convention, which includes the US and Spain. For federal documents like an FBI background check, the US Department of State handles apostilles. For state-issued documents, your Secretary of State office handles them. Allow four to eight weeks minimum for this process, more if you need expedited handling.</P>
            <P>Apostilled documents then need to be translated into Spanish by a certified translator. Not Google Translate. A certified, sworn translator whose stamp Spanish immigration authorities will accept.</P>
            <P>Your criminal background check has a six-month expiration from the date of issue, not the date of apostille. Time your document requests so everything is still valid by the time you submit. This requires backward planning from your intended application date.</P>
            <P>Bank statements need to show clean, consistent, matching deposits over the prior three to six months. If your income fluctuates significantly month to month, flag this with your lawyer before submitting. The UGE has tightened its scrutiny on income consistency in 2026 following a fraud crackdown.</P>
            <P>Bring everything in originals and at least two copies to any appointment. Spanish administrative offices do not share systems and will not accept that another office already has your document.</P>
          </Section>

          <Rule />

          <Section id="thirty-day" title="The 30-Day Rule Nobody Talks About">
            <P>When you apply from inside Spain, the UGE is legally required to respond within 30 days.</P>
            <P>This is a meaningful legal protection called silencio administrativo positivo. If the administration does not issue a decision within the legal timeframe, the application is deemed approved by default. You are not in a gray area. You have implied legal approval.</P>
            <P>What this does not do is produce a physical card automatically. You still need to follow up to get your TIE (Tarjeta de Identidad de Extranjero), your actual residency card. The implied approval gives you the legal standing to push for this and to remain in Spain while the paperwork catches up.</P>
            <P>In practice this means the in-country route has a meaningful speed advantage over the consulate route, where no such obligation exists and processing times can stretch to six months or more with no legal recourse. If speed matters to you, and for most people making a major life move it does, this alone is a strong argument for applying from inside Spain.</P>
          </Section>

          <Rule />

          <Section id="permanent" title="The Permanent Residency Trap">
            <P>This is the section I wish someone had written for me before I made any decisions. Read it carefully.</P>
            <P>The Digital Nomad Visa gives you a three-year residency permit when applied from inside Spain. It can be renewed for an additional two years. After five years of continuous legal residence, you become eligible to apply for long-term residency, which functions as permanent residency in practice.</P>
            <P>Here is what the word continuous actually means, and it is stricter than it sounds.</P>
            <P>To qualify for long-term residency, you need five years of documented legal residence in Spain. Continuous means you must have been physically present in Spain for at least 183 days per year during that five-year period. Absences are tracked. They are verified through passport stamps, flight records, and your empadronamiento registration.</P>
            <P>If you travel extensively, if you return to the US for extended periods to see family, manage property, or attend to obligations, if you work remotely and assume that means you can be anywhere, you may be inadvertently undermining your path to permanent residency without realizing it.</P>
            <P>There is no grace period framing around this. If your absences do not meet the requirement over the five-year accumulation period, your clock may need to restart.</P>
            <P>For people who moved to Spain imagining they would split time between Madrid and the US, or who have aging parents at home that require extended visits, this is a real constraint that needs to be factored into the decision before you commit to the residency path, not after.</P>
            <P>Talk to your immigration lawyer specifically about your travel plans and your long-term intentions before your first renewal. This is not a question to save for later.</P>
          </Section>

          <Rule />

          <Section id="other-visas" title="The Other Visa Options">
            <P>I chose the Digital Nomad Visa because it fit my situation. Here is an honest summary of the other main routes Americans take, and who each one actually suits.</P>
            <P><strong>Non-Lucrative Visa (NLV).</strong> For people with passive income, pensions, savings, or investment returns who are not actively working. The income requirement as of 2026 is approximately €28,800 per year for a single applicant (400% of IPREM). You cannot work on this visa at all, including remote work for clients outside Spain. If you retire, draw Social Security, or have investment income and do not plan to work, this is your visa. If there is any chance you will do remote work, do not apply for this one.</P>
            <P><strong>Entrepreneur Visa.</strong> For people starting a business in Spain that is considered innovative or of economic interest. Requires a business plan, approval from a government body, and a meaningful level of complexity to navigate. Less common for individual relocators.</P>
            <P><strong>Student Visa.</strong> Some people use enrollment in a Spanish language school as an entry point. This is legal if the enrollment is genuine. Note that years on a student visa count at half value toward permanent residency, so four years as a student counts as only two years toward the five-year threshold.</P>
            <P><strong>What happened to the Golden Visa.</strong> Spain's Golden Visa, which previously allowed residency through a €500,000 real estate investment, was officially ended on April 3, 2025. New applications are no longer accepted. If you were planning on this route, it is gone.</P>
          </Section>

          <Rule />

          <Section id="lawyer" title="Should You Use a Lawyer">
            <P>I used a Spanish immigration lawyer based in Madrid and I would do it again without hesitation.</P>
            <P>This is not because the process is impossible to navigate alone. Some people do. But the margin for error on an immigration application is low, the consequences of mistakes are high, and the rules change more frequently than most online resources are updated. My lawyer knew which documents the UGE was currently scrutinizing, which income presentation formats were being questioned, and how to structure my application to avoid the most common rejection triggers.</P>
            <P>What a good immigration lawyer based in Spain gives you that a US-based one often cannot: current, on-the-ground knowledge of what the actual processing office is doing right now, not what the official guidelines say they should be doing.</P>
            <P>What to look for: a lawyer who specializes in Spanish immigration, who works primarily with expats and international clients, who has recent direct experience with the specific visa you are applying for, and who can be reached when something changes mid-process.</P>
            <P>What it costs: immigration lawyer fees for Digital Nomad Visa applications typically run between €500 and €1,500 depending on complexity and the firm. That is real money. It is also real money compared to the cost of a rejected application, a missed renewal, or having to leave the country and restart.</P>
            <P>Ask for recommendations in expat Facebook groups before hiring anyone. Personal referrals from people who recently completed the same process you are doing are more reliable than any other screening method.</P>
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
                desc: "The laws and unspoken rules nobody told me about.",
                to: "/resources/consider-yourself-warned",
              },
              {
                emoji: "💰",
                title: "The Banking and Money Guide",
                desc: "Opening accounts and moving money without the fees.",
                to: "/resources/banking-and-money-guide",
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

export default WhatILearnedAboutVisas;
