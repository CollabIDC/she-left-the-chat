import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronUp, Printer, Download } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";

type Task = { offset: number; name: string; detail: string };
type Phase = { number: number; title: string; timeframe: string; tasks: Task[] };
type VisaPath = "inside" | "consulate" | "nlv";

const VISA_LABELS: Record<VisaPath, { title: string; desc: string; note: string }> = {
  inside: {
    title: "Digital Remote Work Visa — Inside Spain",
    desc: "You will enter Spain on your US passport and apply for residency from inside the country.",
    note: "Fastest route. 30-day response window. 3-year permit.",
  },
  consulate: {
    title: "Digital Remote Work Visa — US Consulate",
    desc: "You will apply at the Spanish Consulate in your US city before departing.",
    note: "Allow 4 to 8 months total. Passport held during processing.",
  },
  nlv: {
    title: "Non-Lucrative Visa",
    desc: "For pension, Social Security, investment income, or savings. No remote work permitted.",
    note: "Apply through US Consulate. Annual renewal in Spain.",
  },
};

const PHASES: Record<VisaPath, Phase[]> = {
  inside: [
    {
      number: 1,
      title: "Get Clear Before You Commit",
      timeframe: "12+ Months Before Move",
      tasks: [
        { offset: -365, name: "Book and complete a reconnaissance trip to Madrid", detail: "Minimum 10 to 14 days. Rent an apartment, not a hotel. Visit in October, November, March, or April if possible. Madrid in summer is not Madrid the rest of the year." },
        { offset: -365, name: "Confirm you qualify for the Digital Remote Work Visa", detail: "Requires minimum €2,849 per month income (2026 figure, verify annually), employer operating 1 or more years, maximum 20% of income from Spanish clients." },
        { offset: -350, name: "Consult a Spanish immigration lawyer based in Spain", detail: "Book a one-hour consultation. Verify your specific income type and employment situation qualifies before doing any paperwork. Budget €500 to €1,500 for application assistance." },
        { offset: -340, name: "Decide on Madrid neighborhoods to target", detail: "Use the Neighborhood Matcher at shelefthechat.com. Shortlist 2 to 3 neighborhoods for apartment hunting on arrival." },
      ],
    },
    {
      number: 2,
      title: "Research and Financial Setup",
      timeframe: "9 to 12 Months Before Move",
      tasks: [
        { offset: -300, name: "Find and hire your Spanish immigration lawyer", detail: "Ask for referrals in Madrid expat Facebook groups including Americans in Madrid and Women in Madrid. Verify they have recent Digital Remote Work Visa experience specifically." },
        { offset: -300, name: "Open a Wise account and test an international transfer", detail: "Do this before you need it. A small test transfer confirms the system works and you understand the process." },
        { offset: -290, name: "Research real Madrid cost of living numbers", detail: "Use the Cost of Living Calculator at shelefthechat.com. Run your actual monthly expenses against Madrid figures." },
        { offset: -280, name: "Find a US expat tax specialist", detail: "You still file US taxes living in Spain. Spain taxes you as a resident after 183 days. Find a specialist before your first tax year ends abroad." },
        { offset: -270, name: "Build your 3-month relocation fund", detail: "Separate from ongoing income. Budget an additional €5,000 to €8,000 for one-time arrival costs including first month rent, deposit, visa fees, and a buffer." },
      ],
    },
    {
      number: 3,
      title: "Document Preparation",
      timeframe: "6 to 9 Months Before Move",
      tasks: [
        { offset: -270, name: "Check passport validity", detail: "Must be valid for at least 1 year beyond your intended stay. Renew immediately if under 18 months remaining." },
        { offset: -260, name: "Order FBI background check", detail: "Federal level only. Allow 3 to 6 weeks processing. Must be apostilled after receipt. The 6-month validity clock starts at the date of issue." },
        { offset: -250, name: "Gather 3 to 6 months of bank statements", detail: "Must show consistent deposits matching your declared income. The UGE scrutinizes income consistency closely as of 2026." },
        { offset: -250, name: "Obtain employment contract or client contracts", detail: "Employer must have operated 1 or more years. Contract must explicitly authorize remote work from Spain." },
        { offset: -240, name: "Purchase Spain-approved private health insurance", detail: "No copays, no deductibles, full Spain coverage, repatriation included. Sanitas, Adeslas, and Asisa are accepted providers." },
        { offset: -220, name: "Apostille FBI background check via US Department of State", detail: "Allow 4 to 8 weeks. Expedited processing available at additional cost. Document must be under 6 months old at time of filing." },
        { offset: -210, name: "Get certified Spanish translations of all apostilled documents", detail: "Must be a sworn translator. Not Google Translate. Your lawyer can recommend one." },
        { offset: -200, name: "Obtain EU-format passport photos", detail: "35mm x 45mm format. Not US standard size. Get new ones specifically for this application." },
      ],
    },
    {
      number: 4,
      title: "Enter Spain and Apply In-Country",
      timeframe: "3 to 6 Months Before Intended Residency Start",
      tasks: [
        { offset: -180, name: "Book flights and short-term furnished accommodation", detail: "Furnished apartment for 4 to 8 weeks minimum. This is your base while you apply and apartment hunt." },
        { offset: -90, name: "Enter Spain on US passport before 90-day tourist entry limit expires", detail: "Critical. You must apply before your legal entry period expires. US citizens get 90 days visa-free in the Schengen Area." },
        { offset: -85, name: "Submit residency application to UGE through your lawyer", detail: "UGE stands for Unidad de Grandes Empresas. Your lawyer submits on your behalf. Application fee is €73.26 as of 2026." },
        { offset: -75, name: "Register at ayuntamiento for empadronamiento", detail: "Bring signed rental contract and passport. This certificate is required for TIE and almost every subsequent official process." },
        { offset: -55, name: "Follow up with lawyer if no UGE response after 30 days", detail: "If no response in 30 days, silencio administrativo positivo applies. Approval is implied by law. Your lawyer follows up to begin TIE documentation." },
      ],
    },
    {
      number: 5,
      title: "Financial and Logistics Setup",
      timeframe: "2 to 3 Months Before Move Date",
      tasks: [
        { offset: -60, name: "Open Spanish bank account", detail: "Santander, BBVA, or CaixaBank. Bring passport, NIE number, and empadronamiento certificate. Ask for a cuenta de no residente if residency is not yet confirmed." },
        { offset: -55, name: "Set up Bizum on Spanish account", detail: "Linked to your phone number. Essential for splitting bills and paying small vendors. Wise and Revolut do not support Bizum." },
        { offset: -45, name: "Confirm long-term apartment", detail: "Search on Idealista and Fotocasa. Budget 1 to 2 months deposit. Confirm landlord will sign your empadronamiento certificate before you pay anything." },
        { offset: -45, name: "Set up mail forwarding from US address", detail: "US Global Mail or Traveling Mailbox. You still need a US address for banking, tax, and correspondence." },
        { offset: -30, name: "Notify US bank and credit cards of international use", detail: "Prevents fraud holds at the worst possible moment. Do this before you leave, not after a card is declined abroad." },
        { offset: -30, name: "Arrange 3 to 6 months of prescription medications", detail: "With a doctor's letter describing each medication by generic name. Confirm each is legal to bring into Spain." },
        { offset: -21, name: "Decide what to bring, ship, or sell", detail: "Spain uses 220V at 50Hz. US appliances run on 110V at 60Hz. Price international shipping honestly before deciding what to move." },
      ],
    },
    {
      number: 6,
      title: "First 90 Days in Madrid",
      timeframe: "After You Land",
      tasks: [
        { offset: 0, name: "Buy a local SIM card on arrival day", detail: "Movistar, Vodafone, or Orange. A Spanish mobile number is required for almost every official form and online account setup." },
        { offset: 1, name: "Book TIE appointment", detail: "Book immediately on arrival. Appointments can be 4 to 8 weeks out. This is your physical residency card." },
        { offset: 3, name: "Register at ayuntamiento if not done before move", detail: "Bring rental contract and passport. Empadronamiento unlocks healthcare registration and TIE renewal." },
        { offset: 3, name: "Buy monthly metro Abono Transporte Zone A", detail: "€54.60 per month covers all metro and bus within central Madrid." },
        { offset: 5, name: "Open Spanish bank account if not done pre-move", detail: "Bring passport, NIE, and empadronamiento. Set up Bizum in the same visit." },
        { offset: 14, name: "Register with a local doctor or identify private clinic", detail: "You may access public health after registration. Use your private insurance provider in the meantime." },
        { offset: 30, name: "Attend TIE appointment and collect residency card", detail: "Bring all original documents plus copies. Your lawyer should advise exactly what is required at this appointment." },
        { offset: 270, name: "File FBAR if any foreign account exceeded $10,000", detail: "Required if Wise, Revolut, or any Spanish account hit $10,000 at any point during the calendar year. Filed separately from your tax return." },
        { offset: 285, name: "File US federal taxes for year of move", detail: "Use a US expat tax specialist. Claim the Foreign Earned Income Exclusion and Foreign Tax Credit as applicable. Deadline April 15." },
        { offset: 900, name: "Begin visa renewal research", detail: "The 3-year residency permit expires. Begin renewal research 6 months before expiry. Note: permanent residency after 5 years requires 183 or more days per year in Spain. Track your days from arrival." },
      ],
    },
  ],
  consulate: [
    {
      number: 1,
      title: "Get Clear Before You Commit",
      timeframe: "12+ Months Before Move",
      tasks: [
        { offset: -365, name: "Book and complete a reconnaissance trip to Madrid", detail: "Minimum 10 to 14 days. Rent an apartment, not a hotel. Non-summer months give a more realistic picture of daily life." },
        { offset: -365, name: "Confirm you qualify for the Digital Remote Work Visa", detail: "Requires minimum €2,849 per month, employer operating 1 or more years, maximum 20% income from Spanish clients." },
        { offset: -350, name: "Consult an immigration lawyer or gestor", detail: "Verify your situation qualifies before starting paperwork. Budget €500 to €1,500 for application assistance." },
        { offset: -340, name: "Check consulate appointment availability immediately", detail: "Critical first step. Some consulates have 2-week waits, others have 3-month waits. Your appointment date anchors your entire timeline." },
      ],
    },
    {
      number: 2,
      title: "Research and Financial Setup",
      timeframe: "9 to 12 Months Before Move",
      tasks: [
        { offset: -300, name: "Open a Wise account and test an international transfer", detail: "Do this before you need it urgently. A test transfer confirms the process works." },
        { offset: -280, name: "Build your 3-month relocation fund", detail: "Separate from ongoing income. Budget €5,000 to €8,000 for arrival costs." },
        { offset: -280, name: "Find a US expat tax specialist", detail: "Spain taxes you as a resident after 183 days. You still file US taxes regardless of where you live." },
        { offset: -270, name: "Research real Madrid cost of living", detail: "Use the Cost of Living Calculator at shelefthechat.com." },
      ],
    },
    {
      number: 3,
      title: "Document Preparation",
      timeframe: "6 to 9 Months Before Move",
      tasks: [
        { offset: -270, name: "Check passport validity", detail: "Must be valid 1 or more years beyond stay. Renew immediately if under 18 months remaining." },
        { offset: -260, name: "Order FBI background check", detail: "Federal level only. Allow 3 to 6 weeks. Must be apostilled. Under 6 months old at consulate appointment." },
        { offset: -250, name: "Gather 3 to 6 months of bank statements", detail: "Must show consistent income deposits matching your declared amount." },
        { offset: -245, name: "Obtain employment contract proving remote work authorization", detail: "Employer must have operated 1 or more years. Contract must explicitly authorize working from Spain." },
        { offset: -240, name: "Purchase Spain-approved private health insurance", detail: "No copays, full Spain coverage. Sanitas, Adeslas, and Asisa are accepted." },
        { offset: -220, name: "Apostille FBI background check via US Department of State", detail: "Allow 4 to 8 weeks. Cannot be older than 6 months at your consulate appointment." },
        { offset: -200, name: "Get certified Spanish translations of all apostilled documents", detail: "Sworn translator only." },
        { offset: -195, name: "Obtain EU-format passport photos", detail: "35mm x 45mm format. Not US standard size." },
      ],
    },
    {
      number: 4,
      title: "Consulate Application",
      timeframe: "4 to 6 Months Before Move",
      tasks: [
        { offset: -180, name: "Book consulate visa appointment", detail: "At the Spanish Consulate covering your US state of residence. Book the earliest available slot. This date drives your entire timeline." },
        { offset: -160, name: "Complete visa application form with lawyer or gestor", detail: "Government fee tasa 790-038 is €73.26 as of 2026. Your gestor assembles the full application package." },
        { offset: -150, name: "Attend consulate appointment and submit application", detail: "Bring originals and 2 copies of everything. Your passport is surrendered and held during processing." },
        { offset: -150, name: "Note: passport held during entire processing period", detail: "Allow 2 to 6 months processing time. You cannot travel internationally while your passport is being held by the consulate." },
        { offset: -30, name: "Collect visa from consulate once approved", detail: "You receive a 1-year visa sticker. This converts to a 3-year TIE after arrival in Spain." },
      ],
    },
    {
      number: 5,
      title: "Pre-Departure Logistics",
      timeframe: "1 to 3 Months Before Move",
      tasks: [
        { offset: -60, name: "Book short-term furnished accommodation for first 4 to 8 weeks", detail: "Do not sign a long-term lease before spending time in the neighborhood. Short-term first, always." },
        { offset: -45, name: "Set up mail forwarding", detail: "US Global Mail or Traveling Mailbox." },
        { offset: -30, name: "Notify US bank and credit cards of international use", detail: "Do before departure, not after a card is declined." },
        { offset: -30, name: "Arrange 3 to 6 months of prescription medications", detail: "With doctor's letter listing generic names. Confirm legal to bring into Spain." },
        { offset: -7, name: "Pack all documents in carry-on bag", detail: "Originals and copies. Never in checked luggage." },
      ],
    },
    {
      number: 6,
      title: "First 90 Days in Madrid",
      timeframe: "After You Land",
      tasks: [
        { offset: 0, name: "Buy a local SIM card on arrival day", detail: "Spanish number required for every official process and online account." },
        { offset: 1, name: "Book TIE appointment to convert visa to residency card", detail: "Your 1-year consulate visa must be converted to a TIE within 30 days of arrival. Book immediately." },
        { offset: 3, name: "Buy monthly metro Abono Transporte Zone A", detail: "€54.60 per month. Unlimited metro and bus in central Madrid." },
        { offset: 5, name: "Open Spanish bank account", detail: "Santander, BBVA, or CaixaBank. Bring passport, NIE, empadronamiento." },
        { offset: 7, name: "Register at ayuntamiento for empadronamiento", detail: "Bring rental contract and passport. Within your first 2 weeks." },
        { offset: 30, name: "Attend TIE appointment", detail: "Bring all original documents and copies." },
        { offset: 270, name: "File FBAR if any foreign account exceeded $10,000", detail: "File separately from tax return." },
        { offset: 285, name: "File US federal taxes for year of move", detail: "Use a US expat tax specialist. Deadline April 15." },
      ],
    },
  ],
  nlv: [
    {
      number: 1,
      title: "Confirm Eligibility and Make the Decision",
      timeframe: "12+ Months Before Move",
      tasks: [
        { offset: -365, name: "Confirm you qualify for the Non-Lucrative Visa", detail: "Requires approximately €28,800 per year in passive income (2026 figure, verify annually). You cannot do any remote work on this visa. Active work of any kind disqualifies you." },
        { offset: -365, name: "Verify your income type qualifies as passive", detail: "Pension, Social Security, investment income, savings drawdown, and rental income qualify. Active remote employment does not qualify even for non-Spanish clients." },
        { offset: -350, name: "Consult an immigration lawyer to confirm NLV is right for you", detail: "The most common mistake is applying for NLV while intending to do any remote work. Clarify this definitively before starting any paperwork." },
        { offset: -340, name: "Book and complete a reconnaissance trip to Madrid", detail: "Minimum 10 to 14 days. Non-summer months give a more realistic picture." },
        { offset: -330, name: "Check consulate appointment availability immediately", detail: "NLV processing through US consulates can take 4 to 6 months. Your appointment date is your most important deadline." },
      ],
    },
    {
      number: 2,
      title: "Research and Financial Preparation",
      timeframe: "9 to 12 Months Before Move",
      tasks: [
        { offset: -300, name: "Open a Wise account and test an international transfer", detail: "Best exchange rates for regular transfers between US and Spanish accounts." },
        { offset: -290, name: "Build your relocation fund", detail: "3 months liquid expenses minimum plus €5,000 to €8,000 for one-time arrival costs." },
        { offset: -280, name: "Find a US expat tax specialist", detail: "Spain taxes you as a resident after 183 days on worldwide income. FBAR required if foreign accounts exceed $10,000 at any point." },
        { offset: -270, name: "Research real Madrid cost of living", detail: "Use the Cost of Living Calculator at shelefthechat.com. Run your actual income against Madrid figures specifically." },
        { offset: -260, name: "Understand the NLV income documentation requirements", detail: "You need to show the full year's income threshold, not just a recent month. Gather documentation for a full 12-month period before applying." },
      ],
    },
    {
      number: 3,
      title: "Document Preparation",
      timeframe: "6 to 9 Months Before Move",
      tasks: [
        { offset: -270, name: "Check passport validity", detail: "Must be valid 1 or more years beyond stay. Renew immediately if under 18 months." },
        { offset: -260, name: "Order FBI background check", detail: "Federal level only. Allow 3 to 6 weeks. Must be apostilled. Under 6 months old at consulate appointment." },
        { offset: -250, name: "Gather proof of passive income for full year", detail: "Pension statements, Social Security award letter, investment account statements, bank statements. All 12 months, not just recent ones." },
        { offset: -240, name: "Purchase Spain-approved private health insurance", detail: "No copays, no deductibles, full Spain coverage. Required for NLV. Sanitas, Adeslas, and Asisa are accepted." },
        { offset: -220, name: "Apostille FBI background check", detail: "US Department of State. Allow 4 to 8 weeks." },
        { offset: -210, name: "Apostille birth certificate if required", detail: "Some NLV applications require it. Confirm with your specific consulate before ordering." },
        { offset: -200, name: "Get certified Spanish translations of all apostilled documents", detail: "Sworn translator only. Not Google Translate." },
        { offset: -195, name: "Obtain EU-format passport photos", detail: "35mm x 45mm. Different from US standard." },
        { offset: -180, name: "Complete NLV application form with gestor", detail: "Tasa 790-052 government fee applies. Your gestor assembles the full application package." },
      ],
    },
    {
      number: 4,
      title: "Consulate Application",
      timeframe: "4 to 6 Months Before Move",
      tasks: [
        { offset: -180, name: "Book consulate visa appointment", detail: "At the Spanish Consulate for your US state of residence. Book the earliest available slot." },
        { offset: -150, name: "Attend consulate appointment and submit NLV application", detail: "Bring originals and 2 copies of everything. Passport surrendered and held during processing." },
        { offset: -150, name: "Note: passport held during processing (typically 4 to 6 weeks)", detail: "NLV processing is typically faster than consulate DRW processing. Cannot travel internationally while passport is held." },
        { offset: -30, name: "Collect NLV visa from consulate", detail: "You receive a 1-year visa. This is renewed annually in Spain and converts to long-term residency after 5 continuous years." },
      ],
    },
    {
      number: 5,
      title: "Pre-Departure Logistics",
      timeframe: "1 to 3 Months Before Move",
      tasks: [
        { offset: -60, name: "Book short-term furnished accommodation for first 4 to 8 weeks", detail: "Do not sign long-term lease before visiting your shortlisted neighborhoods in person." },
        { offset: -45, name: "Set up mail forwarding", detail: "US Global Mail or Traveling Mailbox. You need a US address for banking and tax correspondence." },
        { offset: -30, name: "Notify US bank and credit cards of international use", detail: "Do before departure." },
        { offset: -30, name: "Arrange 3 to 6 months of prescription medications", detail: "With doctor's letter listing generic names. Confirm legal to bring into Spain." },
        { offset: -21, name: "Decide what to bring, ship, or sell", detail: "Spain uses 220V at 50Hz. US appliances need converters. Price international shipping honestly." },
        { offset: -7, name: "Pack all documents in carry-on bag", detail: "Originals and copies. Never in checked luggage." },
      ],
    },
    {
      number: 6,
      title: "First 90 Days in Madrid",
      timeframe: "After You Land",
      tasks: [
        { offset: 0, name: "Buy a local SIM card on arrival day", detail: "Spanish number required for every official process." },
        { offset: 1, name: "Book TIE appointment", detail: "Must be done within 30 days of arrival to convert visa to residency card. Book immediately." },
        { offset: 5, name: "Open Spanish bank account", detail: "Santander, BBVA, or CaixaBank. Bring passport, NIE, empadronamiento." },
        { offset: 7, name: "Register at ayuntamiento for empadronamiento", detail: "Within first 2 weeks. Bring rental contract and passport." },
        { offset: 14, name: "Register with local doctor through public health system", detail: "NLV holders can access public health after empadronamiento registration. Register early, before you need it." },
        { offset: 30, name: "Attend TIE appointment and collect residency card", detail: "Bring all original documents. Your gestor should advise exactly what is required." },
        { offset: 30, name: "Begin tracking days in Spain from arrival", detail: "Long-term residency after 5 years requires 183 or more days per year in Spain. Extended US visits count against this requirement. Track from your first day." },
        { offset: 270, name: "File FBAR if any foreign account exceeded $10,000", detail: "File separately from tax return. Includes Wise, Revolut, and Spanish accounts." },
        { offset: 285, name: "File US federal taxes for year of move", detail: "Use a US expat tax specialist. Deadline April 15." },
        { offset: 305, name: "Begin NLV annual renewal process", detail: "NLV renews 1 year at a time. Begin renewal paperwork 60 days before expiry. After 5 continuous years, apply for long-term residency." },
      ],
    },
  ],
};

const OLIVE = "#8B7D3A";
const BG = "#FAF7F2";
const INK = "#1C1C1C";
const GREEN = "#D4EDDA";
const AMBER = "#FFF3CD";
const RED = "#F8D7DA";

function addDays(date: Date, days: number) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}
function fmtDate(d: Date) {
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}
function daysBetween(a: Date, b: Date) {
  return Math.round((a.getTime() - b.getTime()) / (1000 * 60 * 60 * 24));
}

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

const TimelineBuilder = () => {
  const [moveDate, setMoveDate] = useState<string>("");
  const [visa, setVisa] = useState<VisaPath>("inside");
  const [built, setBuilt] = useState(false);
  const [error, setError] = useState("");
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const today = useMemo(() => {
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return t;
  }, []);

  const target = moveDate ? new Date(moveDate + "T00:00:00") : null;
  const phases = PHASES[visa];

  const totalTasks = phases.reduce((n, p) => n + p.tasks.length, 0);
  const completedCount = Object.values(checked).filter(Boolean).length;

  const overdueOrUrgent = useMemo(() => {
    if (!target) return 0;
    let n = 0;
    phases.forEach((p, pi) =>
      p.tasks.forEach((t, ti) => {
        const key = `${pi}-${ti}`;
        if (checked[key]) return;
        const d = addDays(target, t.offset);
        const diff = daysBetween(d, today);
        if (diff <= 30) n++;
      })
    );
    return n;
  }, [target, phases, checked, today]);

  const monthsUntil = useMemo(() => {
    if (!target) return 0;
    return Math.max(0, Math.round(daysBetween(target, today) / 30));
  }, [target, today]);

  const handleBuild = () => {
    if (!moveDate) {
      setError("Please enter your target move date first.");
      return;
    }
    setError("");
    setBuilt(true);
    setTimeout(() => {
      document.getElementById("timeline-results")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Madrid Move Timeline Builder",
    url: "https://www.shelefthechat.com/resources/timeline-builder",
    applicationCategory: "PlanningApplication",
  };

  return (
    <>
      <Seo
        title="Madrid Move Timeline Builder | She Left the Chat"
        description="Enter your target move date. Get a backwards planning checklist for your Spain Digital Remote Work Visa or Non-Lucrative Visa with every deadline calculated automatically."
        path="/resources/timeline-builder"
        jsonLd={jsonLd}
      />
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; }
          .print-area { background: white !important; }
        }
      `}</style>
      <div className="no-print">
        <Navbar />
      </div>
      <main
        id="main-content"
        style={{ backgroundColor: BG, color: INK, fontFamily: "Inter, system-ui, sans-serif" }}
        className="min-h-screen"
      >
        <div className="no-print max-w-5xl mx-auto px-6 pt-28 md:pt-32 pb-4">
          <Link
            to="/resources"
            className="text-sm font-medium hover:underline"
            style={{ color: OLIVE }}
          >
            ← Back to Resources
          </Link>
        </div>

        <header className="no-print max-w-5xl mx-auto px-6 pb-8">
          <div className="text-4xl mb-3">📅</div>
          <h1
            className="text-4xl md:text-5xl font-bold mb-3"
            style={{ fontFamily: "Georgia, serif", color: INK }}
          >
            Madrid Move Timeline Builder
          </h1>
          <p className="text-lg md:text-xl mb-6" style={{ color: INK, opacity: 0.85 }}>
            Tell it your target date. It builds your backwards planning checklist.
          </p>
          <div className="flex flex-wrap gap-3 mb-3">
            <a
              href="#input-section"
              className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border-2 transition-colors"
              style={{ borderColor: OLIVE, color: OLIVE }}
            >
              Use the web tool ↓
            </a>
            <a
              href="/assets/madrid-move-timeline-builder.xlsx"
              download
              className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: OLIVE }}
            >
              Download the Excel version
            </a>
          </div>
          <p className="text-sm italic" style={{ color: INK, opacity: 0.7 }}>
            The web tool gives you an instant overview. The Excel is the working document you live
            in for the next 6 to 12 months. Most people use both.
          </p>
        </header>

        {/* INPUT CARD */}
        <section id="input-section" className="no-print max-w-5xl mx-auto px-6 pb-10">
          {!built && (
            <div
              className="bg-white p-6 md:p-8"
              style={{
                borderLeft: `3px solid ${OLIVE}`,
                borderRadius: "12px",
                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
              }}
            >
              <h2
                className="text-2xl font-bold mb-6"
                style={{ fontFamily: "Georgia, serif", color: INK }}
              >
                Step 1: Tell us about your move
              </h2>

              <div className="mb-6">
                <label className="block font-medium mb-2">
                  When do you want to be living in Madrid?
                </label>
                <input
                  type="date"
                  value={moveDate}
                  onChange={(e) => {
                    setMoveDate(e.target.value);
                    if (error) setError("");
                  }}
                  className="w-full md:w-64 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                  style={{ borderColor: error ? "#DC3545" : "#D0C9B8" }}
                />
                {error && (
                  <p className="text-sm mt-2" style={{ color: "#DC3545" }}>
                    {error}
                  </p>
                )}
                <p className="text-sm italic mt-2" style={{ color: "#6B6B6B" }}>
                  This is the date every deadline calculates backwards from. You can change it
                  anytime.
                </p>
              </div>

              <div className="mb-6">
                <label className="block font-medium mb-3">
                  Which visa are you applying for?
                </label>
                <div className="grid gap-3">
                  {(Object.keys(VISA_LABELS) as VisaPath[]).map((k) => {
                    const info = VISA_LABELS[k];
                    const active = visa === k;
                    return (
                      <button
                        key={k}
                        type="button"
                        onClick={() => setVisa(k)}
                        className="text-left p-4 bg-white transition-all"
                        style={{
                          border: `2px solid ${active ? OLIVE : "#E5DFC8"}`,
                          borderRadius: "12px",
                          boxShadow: active ? "0 2px 12px rgba(139,125,58,0.15)" : "none",
                        }}
                      >
                        <div
                          className="font-bold mb-1"
                          style={{ fontFamily: "Georgia, serif", color: INK }}
                        >
                          {info.title}
                        </div>
                        <div className="text-sm mb-1" style={{ color: INK, opacity: 0.85 }}>
                          {info.desc}
                        </div>
                        <div className="text-xs italic" style={{ color: "#6B6B6B" }}>
                          {info.note}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mb-6">
                <label className="block font-medium mb-2">Starting from today.</label>
                <input
                  type="text"
                  readOnly
                  value={fmtDate(today)}
                  className="w-full md:w-64 px-4 py-2 border rounded-lg bg-gray-50"
                  style={{ borderColor: "#D0C9B8" }}
                />
              </div>

              <button
                onClick={handleBuild}
                className="px-8 py-3 rounded-full font-medium text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: OLIVE }}
              >
                Build My Timeline
              </button>
            </div>
          )}
          {built && (
            <div className="text-right">
              <button
                onClick={() => setBuilt(false)}
                className="text-sm font-medium hover:underline"
                style={{ color: OLIVE }}
              >
                Edit My Details ↑
              </button>
            </div>
          )}
        </section>

        {/* TIMELINE */}
        {built && target && (
          <section id="timeline-results" className="max-w-5xl mx-auto px-6 pb-16 print-area">
            {/* Summary stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6 no-print">
              <StatCard label="Months Until Move" value={monthsUntil} />
              <StatCard label="Tasks Total" value={totalTasks} />
              <StatCard label="Completed" value={completedCount} />
              <StatCard
                label="Overdue or Urgent"
                value={overdueOrUrgent}
                highlight={overdueOrUrgent > 0}
              />
            </div>

            {/* Banners */}
            {(() => {
              const daysToMove = daysBetween(target, today);
              if (daysToMove < 90) {
                return (
                  <div
                    className="p-4 mb-6 rounded-lg no-print"
                    style={{ backgroundColor: RED, color: INK }}
                  >
                    <strong>Your timeline is tight.</strong> Red items need immediate attention.
                    Consider consulting your immigration lawyer this week.
                  </div>
                );
              }
              if (daysToMove > 365 && overdueOrUrgent === 0) {
                return (
                  <div
                    className="p-4 mb-6 rounded-lg no-print"
                    style={{ backgroundColor: GREEN, color: INK }}
                  >
                    You have good time ahead of you. The tasks marked amber are coming up within
                    the next 30 days.
                  </div>
                );
              }
              return null;
            })()}

            <p className="text-sm italic mb-6 no-print" style={{ color: "#6B6B6B" }}>
              Your progress is not saved between sessions. Download the Excel version to track
              over time.
            </p>

            {phases.map((phase, pi) => (
              <div key={pi} className="mb-6">
                <div
                  className="px-5 py-3 rounded-t-lg font-bold flex flex-wrap gap-x-3 items-baseline text-white"
                  style={{ backgroundColor: OLIVE, fontFamily: "Georgia, serif" }}
                >
                  <span>Phase {phase.number}:</span>
                  <span>{phase.title}</span>
                  <span className="text-sm font-normal opacity-90 ml-auto">
                    {phase.timeframe}
                  </span>
                </div>
                <div
                  className="bg-white rounded-b-lg overflow-hidden"
                  style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
                >
                  {phase.tasks.map((task, ti) => {
                    const key = `${pi}-${ti}`;
                    const deadline = addDays(target, task.offset);
                    const diff = daysBetween(deadline, today);
                    const isChecked = !!checked[key];
                    const isExpanded = !!expanded[key];

                    let rowBg = "transparent";
                    let dot = "#28A745";
                    if (isChecked) {
                      rowBg = GREEN;
                    } else if (diff < 0) {
                      rowBg = RED;
                      dot = "#DC3545";
                    } else if (diff <= 30) {
                      rowBg = AMBER;
                      dot = "#F0AD4E";
                    }

                    return (
                      <div
                        key={key}
                        className="border-b last:border-b-0"
                        style={{ backgroundColor: rowBg, borderColor: "#F0EBD8" }}
                      >
                        <div className="flex items-start gap-3 px-4 py-3">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() =>
                              setChecked((prev) => ({ ...prev, [key]: !prev[key] }))
                            }
                            className="mt-1 w-4 h-4 flex-shrink-0 cursor-pointer"
                            style={{ accentColor: OLIVE }}
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <span
                                className="font-semibold"
                                style={{
                                  textDecoration: isChecked ? "line-through" : "none",
                                  opacity: isChecked ? 0.6 : 1,
                                  color: INK,
                                }}
                              >
                                {task.name}
                              </span>
                              <span
                                className="text-xs px-2 py-0.5 rounded-full"
                                style={{ backgroundColor: "#EFEAD8", color: "#555" }}
                              >
                                {fmtDate(deadline)}
                              </span>
                              <span
                                className="inline-block w-2.5 h-2.5 rounded-full flex-shrink-0"
                                style={{ backgroundColor: dot }}
                                aria-label="deadline status"
                              />
                            </div>
                            {isExpanded && (
                              <p className="text-sm italic mt-2" style={{ color: "#555" }}>
                                {task.detail}
                              </p>
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              setExpanded((prev) => ({ ...prev, [key]: !prev[key] }))
                            }
                            className="p-1 no-print"
                            aria-label="Toggle details"
                          >
                            {isExpanded ? (
                              <ChevronUp className="w-4 h-4" style={{ color: OLIVE }} />
                            ) : (
                              <ChevronDown className="w-4 h-4" style={{ color: OLIVE }} />
                            )}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Actions */}
            <div className="no-print flex flex-wrap items-center gap-4 mt-8 pt-6 border-t" style={{ borderColor: "#E5DFC8" }}>
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium border-2 transition-colors"
                style={{ borderColor: OLIVE, color: OLIVE }}
              >
                <Printer className="w-4 h-4" /> Print This Timeline
              </button>
              <a
                href="/assets/madrid-move-timeline-builder.xlsx"
                download
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: OLIVE }}
              >
                <Download className="w-4 h-4" /> Download the Excel Version
              </a>
              <p className="text-sm italic" style={{ color: "#6B6B6B" }}>
                The Excel version is editable, saveable, and includes a permanent residency day
                tracker.
              </p>
            </div>
          </section>
        )}

        {/* Related Resources */}
        <section className="no-print max-w-5xl mx-auto px-6 pb-20">
          <div style={{ height: "2px", backgroundColor: OLIVE }} className="mb-8" />
          <div className="grid md:grid-cols-2 gap-4">
            <Link
              to="/resources/what-i-learned-about-visas"
              className="block bg-white p-5 transition-all hover:shadow-lg"
              style={{
                borderLeft: `3px solid ${OLIVE}`,
                borderRadius: "12px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              }}
            >
              <div className="text-2xl mb-2">📋</div>
              <div className="font-bold mb-1" style={{ fontFamily: "Georgia, serif" }}>
                What I Learned About Visas
              </div>
              <div className="text-sm" style={{ color: "#555" }}>
                The honest breakdown of the Digital Remote Work and Non-Lucrative Visa options.
              </div>
            </Link>
            <a
              href="/assets/move-abroad-roadmap.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download
              className="block bg-white p-5 transition-all hover:shadow-lg"
              style={{
                borderLeft: `3px solid ${OLIVE}`,
                borderRadius: "12px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              }}
            >
              <div className="text-2xl mb-2">🗺️</div>
              <div className="font-bold mb-1" style={{ fontFamily: "Georgia, serif" }}>
                The Move Abroad Roadmap
              </div>
              <div className="text-sm" style={{ color: "#555" }}>
                The full step-by-step guide. Free download.
              </div>
            </a>
          </div>
        </section>
      </main>
      <div className="no-print">
        <Footer />
      </div>
    </>
  );
};

const StatCard = ({
  label,
  value,
  highlight,
}: {
  label: string;
  value: number;
  highlight?: boolean;
}) => (
  <div
    className="p-4 bg-white text-center"
    style={{
      borderLeft: `3px solid ${OLIVE}`,
      borderRadius: "12px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      backgroundColor: highlight ? AMBER : "white",
    }}
  >
    <div className="text-2xl font-bold" style={{ color: INK, fontFamily: "Georgia, serif" }}>
      {value}
    </div>
    <div className="text-xs uppercase tracking-wide mt-1" style={{ color: "#6B6B6B" }}>
      {label}
    </div>
  </div>
);

export default TimelineBuilder;
