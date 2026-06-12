import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Seo from "@/components/Seo";

// ============ Design tokens ============
const BG = "#FAF7F2";
const INK = "#1C1C1C";
const GOLD = "#8B7D3A";
const GOLD_SOFT = "#A89859";
const MUTED = "#6B5E52";
const BORDER = "#E3DDD2";
const CARD = "#FFFFFF";

const serif = "Georgia, 'Times New Roman', serif";
const sans = "Inter, system-ui, -apple-system, sans-serif";

// ============ Quiz data ============
type Q = { id: string; question: string; answers: string[] };
const QUESTIONS: Q[] = [
  { id: "q1", question: "How do you feel about the move right now?", answers: [
    "I have a strong pull toward a specific region already",
    "I'm completely open, I just want somewhere that fits me",
    "I'm nervous and need to know this is actually doable",
    "I've researched but I'm stuck deciding between options",
  ]},
  { id: "q2", question: "What matters most to your daily happiness?", answers: [
    "Being outdoors and physically active (hiking, swimming, nature)",
    "Culture, food, markets, arts, and local life",
    "A quiet, slow pace with beautiful surroundings",
    "Building a real social community and friendships",
    "Feeling financially comfortable and free from money stress",
  ]},
  { id: "q3", question: "What climate do you genuinely thrive in?", answers: [
    "Warm and sunny almost all year",
    "Mediterranean: hot summers, mild and manageable winters",
    "Four seasons but nothing extreme",
    "Cool or temperate, I genuinely dislike heat",
  ]},
  { id: "q4", question: "How important is access to quality healthcare?", answers: [
    "Critical. I have ongoing health needs and this is non-negotiable",
    "Very important. I want easy, reliable access to good care",
    "Important, but I'm currently healthy and just want it available",
    "Not a top priority for me right now",
  ]},
  { id: "q5", question: "What is your honest monthly budget for living expenses, not including rent or housing?", answers: [
    "Under $1,500",
    "$1,500 to $2,500",
    "$2,500 to $4,000",
    "$4,000 or more",
  ]},
  { id: "q6", question: "How do you feel about the local language?", answers: [
    "English-speaking country only, that is a firm requirement",
    "I want daily life manageable in English but I'll learn basic phrases",
    "I already speak Spanish, French, or another relevant language",
    "I love the challenge and want full immersion",
  ]},
  { id: "q7", question: "What is your living situation for this move?", answers: [
    "Moving solo",
    "Moving with a partner",
    "I have adult children and flight distance back home matters a lot",
    "I may need to return to care for a parent or dependent",
  ]},
  { id: "q8", question: "How important is personal safety, especially as a woman living independently?", answers: [
    "My top priority. I need to feel safe walking alone, day and night",
    "Very important, but I'm street-smart and can navigate most places",
    "I've traveled widely and I can handle most environments comfortably",
  ]},
  { id: "q9", question: "What kind of community do you want around you?", answers: [
    "A large, established expat community where making English-speaking friends is easy",
    "A healthy mix of expats and locals",
    "Mostly local integration, I want to really live there not just land in an expat bubble",
    "Community is not a priority for me, I'm self-sufficient",
  ]},
  { id: "q10", question: "What is your primary income or financial situation?", answers: [
    "Pension or Social Security (fixed monthly income)",
    "Retirement savings I am drawing down",
    "Remote employment (I work for a company remotely)",
    "Freelance or self-employed",
    "Investment income, rental income, or other passive sources",
  ]},
  { id: "q11", question: "How soon are you realistically thinking about this?", answers: [
    "Within the next 12 months",
    "1 to 3 years out, I'm planning seriously",
    "No firm timeline, I'm exploring what is possible",
    "I want to do a long test stay first before committing",
  ]},
  { id: "q12", question: "What concerns you most about making this move?", answers: [
    "Navigating visas, residency paperwork, and legal requirements",
    "Being too far from family when they need me",
    "Not making friends or ending up isolated",
    "Healthcare going wrong when I'm far from home",
    "Running out of money or miscalculating costs",
    "Honestly, none of these. I'm ready to go.",
  ]},
];

// ============ Country dataset ============
type Country = {
  name: string;
  flag: string;
  climate: "tropical" | "mediterranean" | "temperate" | "four-seasons";
  cost_tier: 1 | 2 | 3 | 4;
  healthcare_tier: 1 | 2 | 3;
  residency_ease: 1 | 2 | 3;
  residency_visa_types: string[]; // keys: pension, savings, remote, freelance, investment
  expat_community_size: "low" | "medium" | "high";
  english_usability: "low" | "medium" | "high";
  solo_female_safety: "low" | "medium" | "high";
  flight_hours_from_us_east_coast: number;
  pace: "fast-city" | "slow-city" | "beach" | "rural" | "mixed";
  honest_caveat: string;
  visa_label: Partial<Record<string, string>>;
  numbeo: string;
  gov_info: string;
};

const COUNTRIES: Country[] = [
  { name: "Portugal", flag: "🇵🇹", climate: "mediterranean", cost_tier: 2, healthcare_tier: 3, residency_ease: 3,
    residency_visa_types: ["pension","savings","remote","freelance","investment"],
    expat_community_size: "high", english_usability: "high", solo_female_safety: "high",
    flight_hours_from_us_east_coast: 7, pace: "mixed",
    honest_caveat: "Lisbon and the Algarve are no longer cheap, and finding long-term housing takes patience and persistence.",
    visa_label: { pension: "D7 Passive Income Visa", savings: "D7 Passive Income Visa", remote: "Digital Nomad Visa", freelance: "Digital Nomad Visa", investment: "D7 Passive Income Visa" },
    numbeo: "https://www.numbeo.com/cost-of-living/country_result.jsp?country=Portugal",
    gov_info: "https://imigrante.sef.pt/en/" },
  { name: "Spain", flag: "🇪🇸", climate: "mediterranean", cost_tier: 2, healthcare_tier: 3, residency_ease: 2,
    residency_visa_types: ["pension","savings","remote","freelance","investment"],
    expat_community_size: "high", english_usability: "medium", solo_female_safety: "high",
    flight_hours_from_us_east_coast: 8, pace: "mixed",
    honest_caveat: "The paperwork is real, daily life runs on Spanish, and the bureaucracy will test your patience before it rewards you.",
    visa_label: { pension: "Non-Lucrative Visa", savings: "Non-Lucrative Visa", remote: "Digital Nomad Visa", freelance: "Freelancer Visa", investment: "Investor Residency" },
    numbeo: "https://www.numbeo.com/cost-of-living/country_result.jsp?country=Spain",
    gov_info: "https://www.exteriores.gob.es/Consulados/" },
  { name: "Mexico", flag: "🇲🇽", climate: "tropical", cost_tier: 2, healthcare_tier: 2, residency_ease: 3,
    residency_visa_types: ["pension","savings","remote","freelance","investment"],
    expat_community_size: "high", english_usability: "medium", solo_female_safety: "medium",
    flight_hours_from_us_east_coast: 4, pace: "mixed",
    honest_caveat: "Safety varies enormously by city and neighborhood. Where you live matters more here than almost anywhere else.",
    visa_label: { pension: "Temporary Resident Visa", savings: "Temporary Resident Visa", remote: "Temporary Resident Visa", freelance: "Temporary Resident Visa", investment: "Temporary Resident Visa" },
    numbeo: "https://www.numbeo.com/cost-of-living/country_result.jsp?country=Mexico",
    gov_info: "https://www.gob.mx/inm" },
  { name: "Costa Rica", flag: "🇨🇷", climate: "tropical", cost_tier: 2, healthcare_tier: 2, residency_ease: 3,
    residency_visa_types: ["pension","savings","remote","investment"],
    expat_community_size: "high", english_usability: "high", solo_female_safety: "high",
    flight_hours_from_us_east_coast: 5, pace: "slow-city",
    honest_caveat: "Costs have climbed steadily, and rainy season is genuinely six months long in much of the country.",
    visa_label: { pension: "Pensionado Visa", savings: "Rentista Visa", remote: "Digital Nomad Visa", freelance: "Rentista Visa", investment: "Investor Residency" },
    numbeo: "https://www.numbeo.com/cost-of-living/country_result.jsp?country=Costa+Rica",
    gov_info: "https://www.migracion.go.cr/" },
  { name: "Colombia", flag: "🇨🇴", climate: "temperate", cost_tier: 1, healthcare_tier: 2, residency_ease: 2,
    residency_visa_types: ["pension","remote","freelance","investment"],
    expat_community_size: "medium", english_usability: "medium", solo_female_safety: "medium",
    flight_hours_from_us_east_coast: 4, pace: "fast-city",
    honest_caveat: "Medellin's reputation has shifted, but you still need real awareness about neighborhoods and night-time movement.",
    visa_label: { pension: "Retirement Visa", savings: "Retirement Visa", remote: "Digital Nomad Visa", freelance: "Digital Nomad Visa", investment: "Investor Residency" },
    numbeo: "https://www.numbeo.com/cost-of-living/country_result.jsp?country=Colombia",
    gov_info: "https://www.cancilleria.gov.co/en/procedures_services/visa" },
  { name: "Greece", flag: "🇬🇷", climate: "mediterranean", cost_tier: 2, healthcare_tier: 2, residency_ease: 2,
    residency_visa_types: ["pension","savings","remote","investment"],
    expat_community_size: "medium", english_usability: "high", solo_female_safety: "high",
    flight_hours_from_us_east_coast: 10, pace: "slow-city",
    honest_caveat: "Public healthcare is uneven outside Athens, and the bureaucracy moves on its own quiet timeline.",
    visa_label: { pension: "Financially Independent Person Visa", savings: "Financially Independent Person Visa", remote: "Digital Nomad Visa", freelance: "Digital Nomad Visa", investment: "Golden Visa" },
    numbeo: "https://www.numbeo.com/cost-of-living/country_result.jsp?country=Greece",
    gov_info: "https://www.mfa.gr/en/visas/" },
  { name: "Italy", flag: "🇮🇹", climate: "mediterranean", cost_tier: 3, healthcare_tier: 3, residency_ease: 2,
    residency_visa_types: ["pension","savings","remote","freelance"],
    expat_community_size: "medium", english_usability: "medium", solo_female_safety: "high",
    flight_hours_from_us_east_coast: 9, pace: "slow-city",
    honest_caveat: "Outside major cities, English drops fast, and the cost of getting properly settled is often higher than people plan for.",
    visa_label: { pension: "Elective Residency Visa", savings: "Elective Residency Visa", remote: "Digital Nomad Visa", freelance: "Self-Employment Visa", investment: "Investor Visa" },
    numbeo: "https://www.numbeo.com/cost-of-living/country_result.jsp?country=Italy",
    gov_info: "https://vistoperitalia.esteri.it/home/en" },
  { name: "France", flag: "🇫🇷", climate: "four-seasons", cost_tier: 3, healthcare_tier: 3, residency_ease: 2,
    residency_visa_types: ["pension","savings","remote","freelance","investment"],
    expat_community_size: "medium", english_usability: "medium", solo_female_safety: "high",
    flight_hours_from_us_east_coast: 8, pace: "fast-city",
    honest_caveat: "French is not optional for real daily life, and Paris pricing can blow a careful budget very quickly.",
    visa_label: { pension: "Long-Stay Visitor Visa", savings: "Long-Stay Visitor Visa", remote: "Long-Stay Visitor Visa", freelance: "Profession Liberale Visa", investment: "Talent Passport" },
    numbeo: "https://www.numbeo.com/cost-of-living/country_result.jsp?country=France",
    gov_info: "https://france-visas.gouv.fr/en/" },
  { name: "Malta", flag: "🇲🇹", climate: "mediterranean", cost_tier: 3, healthcare_tier: 3, residency_ease: 3,
    residency_visa_types: ["pension","savings","remote","investment"],
    expat_community_size: "high", english_usability: "high", solo_female_safety: "high",
    flight_hours_from_us_east_coast: 10, pace: "slow-city",
    honest_caveat: "The island is small, and after a year that can either feel like home or feel like a very pretty cage.",
    visa_label: { pension: "Malta Retirement Programme", savings: "Ordinary Residence", remote: "Nomad Residence Permit", freelance: "Nomad Residence Permit", investment: "Malta Permanent Residence" },
    numbeo: "https://www.numbeo.com/cost-of-living/country_result.jsp?country=Malta",
    gov_info: "https://residencymalta.gov.mt/" },
  { name: "Thailand", flag: "🇹🇭", climate: "tropical", cost_tier: 1, healthcare_tier: 2, residency_ease: 2,
    residency_visa_types: ["pension","savings","remote","investment"],
    expat_community_size: "high", english_usability: "medium", solo_female_safety: "high",
    flight_hours_from_us_east_coast: 20, pace: "mixed",
    honest_caveat: "The flight home is brutal, and the heat and humidity are not for everyone, no matter how lovely the photos look.",
    visa_label: { pension: "Retirement Visa (O-A)", savings: "Long-Term Resident Visa", remote: "Long-Term Resident Visa", freelance: "Long-Term Resident Visa", investment: "Thailand Elite Visa" },
    numbeo: "https://www.numbeo.com/cost-of-living/country_result.jsp?country=Thailand",
    gov_info: "https://www.thaiembassy.com/thailand-visa" },
  { name: "Malaysia", flag: "🇲🇾", climate: "tropical", cost_tier: 1, healthcare_tier: 3, residency_ease: 3,
    residency_visa_types: ["pension","savings","investment"],
    expat_community_size: "medium", english_usability: "high", solo_female_safety: "high",
    flight_hours_from_us_east_coast: 22, pace: "mixed",
    honest_caveat: "It is genuinely far from family in the US, and the cultural distance is bigger than people expect.",
    visa_label: { pension: "MM2H Long-Term Visa", savings: "MM2H Long-Term Visa", remote: "DE Rantau Visa", freelance: "DE Rantau Visa", investment: "MM2H Long-Term Visa" },
    numbeo: "https://www.numbeo.com/cost-of-living/country_result.jsp?country=Malaysia",
    gov_info: "https://www.imi.gov.my/" },
  { name: "Morocco", flag: "🇲🇦", climate: "mediterranean", cost_tier: 1, healthcare_tier: 1, residency_ease: 2,
    residency_visa_types: ["pension","savings","remote","investment"],
    expat_community_size: "low", english_usability: "low", solo_female_safety: "medium",
    flight_hours_from_us_east_coast: 8, pace: "mixed",
    honest_caveat: "As a woman alone, daily life requires energy and boundaries you would not need in southern Europe.",
    visa_label: { pension: "Long-Stay Residence Card", savings: "Long-Stay Residence Card", remote: "Long-Stay Residence Card", freelance: "Long-Stay Residence Card", investment: "Investor Residency" },
    numbeo: "https://www.numbeo.com/cost-of-living/country_result.jsp?country=Morocco",
    gov_info: "https://www.consulat.ma/en" },
  { name: "Panama", flag: "🇵🇦", climate: "tropical", cost_tier: 2, healthcare_tier: 2, residency_ease: 3,
    residency_visa_types: ["pension","savings","remote","investment"],
    expat_community_size: "high", english_usability: "high", solo_female_safety: "medium",
    flight_hours_from_us_east_coast: 5, pace: "fast-city",
    honest_caveat: "Panama City is humid year-round, and outside the expat enclaves the lifestyle shift is sharper than the brochures suggest.",
    visa_label: { pension: "Pensionado Visa", savings: "Friendly Nations Visa", remote: "Remote Worker Visa", freelance: "Friendly Nations Visa", investment: "Qualified Investor Visa" },
    numbeo: "https://www.numbeo.com/cost-of-living/country_result.jsp?country=Panama",
    gov_info: "https://www.migracion.gob.pa/" },
  { name: "Ecuador", flag: "🇪🇨", climate: "temperate", cost_tier: 1, healthcare_tier: 2, residency_ease: 3,
    residency_visa_types: ["pension","savings","remote","investment"],
    expat_community_size: "medium", english_usability: "low", solo_female_safety: "medium",
    flight_hours_from_us_east_coast: 6, pace: "slow-city",
    honest_caveat: "The altitude in Cuenca and Quito is real, and it takes weeks to adjust before you can judge if the place fits you.",
    visa_label: { pension: "Pensioner Visa", savings: "Rentista Visa", remote: "Digital Nomad Visa", freelance: "Professional Visa", investment: "Investor Visa" },
    numbeo: "https://www.numbeo.com/cost-of-living/country_result.jsp?country=Ecuador",
    gov_info: "https://www.cancilleria.gob.ec/en/" },
  { name: "Senegal", flag: "🇸🇳", climate: "tropical", cost_tier: 1, healthcare_tier: 1, residency_ease: 2,
    residency_visa_types: ["pension","savings","remote","investment"],
    expat_community_size: "low", english_usability: "low", solo_female_safety: "medium",
    flight_hours_from_us_east_coast: 8, pace: "mixed",
    honest_caveat: "Infrastructure varies, French is essential, and quality medical care for complex needs may require travel out of country.",
    visa_label: { pension: "Long-Stay Visa", savings: "Long-Stay Visa", remote: "Long-Stay Visa", freelance: "Long-Stay Visa", investment: "Long-Stay Visa" },
    numbeo: "https://www.numbeo.com/cost-of-living/country_result.jsp?country=Senegal",
    gov_info: "https://www.diplomatie.gouv.sn/" },
];

// ============ Mapping helpers ============
const climateFromQ3 = (a: number) => ["tropical","mediterranean","four-seasons","temperate"][a] as Country["climate"];
const costBudgetTier = (a: number) => [1,2,3,4][a]; // max acceptable tier
const healthcareNeed = (a: number) => [3,3,2,1][a]; // min tier
const incomeKey = (a: number) => ["pension","savings","remote","freelance","investment"][a];
const expatPref = (a: number) => ["high","medium","low","low"][a] as Country["expat_community_size"];
const englishNeed = (a: number) => ["high","high","medium","low"][a] as Country["english_usability"];
const safetyNeed = (a: number) => ["high","high","medium"][a] as Country["solo_female_safety"];

const tierVal = (t: "low"|"medium"|"high") => ({ low: 1, medium: 2, high: 3 }[t]);

function scoreCountry(c: Country, ans: number[]) {
  let s = 0;
  // climate
  if (c.climate === climateFromQ3(ans[2])) s += 20;
  else if (
    (climateFromQ3(ans[2]) === "mediterranean" && c.climate === "temperate") ||
    (climateFromQ3(ans[2]) === "temperate" && c.climate === "mediterranean")
  ) s += 10;
  // cost
  if (c.cost_tier <= costBudgetTier(ans[4])) s += 20;
  else if (c.cost_tier - costBudgetTier(ans[4]) === 1) s += 10;
  // healthcare
  if (c.healthcare_tier >= healthcareNeed(ans[3])) s += 20;
  else if (c.healthcare_tier === healthcareNeed(ans[3]) - 1) s += 8;
  // visa
  if (c.residency_visa_types.includes(incomeKey(ans[9]))) s += 15;
  // safety
  const need = tierVal(safetyNeed(ans[7]));
  const have = tierVal(c.solo_female_safety);
  if (have >= need) s += 10;
  else if (have === need - 1) s += 4;
  // expat community
  if (c.expat_community_size === expatPref(ans[8])) s += 10;
  else if (expatPref(ans[8]) === "medium") s += 6;
  // english
  const eNeed = tierVal(englishNeed(ans[5]));
  const eHave = tierVal(c.english_usability);
  if (eHave >= eNeed) s += 5;
  // flight distance bonus if Q7 demands closeness
  if ((ans[6] === 2 || ans[6] === 3) && c.flight_hours_from_us_east_coast <= 8) s += 4;
  return s;
}

function pctMatch(raw: number) {
  const max = 104; // 20+20+20+15+10+10+5 +4 bonus
  return Math.max(45, Math.min(98, Math.round((raw / max) * 100)));
}

// ============ Personalized content ============
function whatYoullLove(c: Country, ans: number[]): string[] {
  const out: string[] = [];
  // daily happiness Q2
  const q2 = ans[1];
  if (q2 === 0) out.push(`Outdoor life is built in here, not an effort you have to schedule.`);
  if (q2 === 1) out.push(`Markets, cafes, and neighborhood culture are the texture of ordinary days in ${c.name}.`);
  if (q2 === 2) out.push(`The pace is genuinely slower, and no one will rush you out of a long lunch.`);
  if (q2 === 3) out.push(`There is a real community here that newcomers can actually join, not just observe.`);
  if (q2 === 4) out.push(`Your money goes further in ${c.name} than it does in most US cities.`);
  // climate
  if (c.climate === "mediterranean") out.push(`Long sunny shoulder seasons make spring and fall the best parts of the year.`);
  if (c.climate === "tropical") out.push(`Warmth almost every day, and the kind of light that lifts your mood without trying.`);
  if (c.climate === "temperate") out.push(`Comfortable year-round temperatures without the extremes that exhaust you.`);
  if (c.climate === "four-seasons") out.push(`Real seasons that mark time and give the year a rhythm.`);
  // healthcare
  if (c.healthcare_tier === 3) out.push(`Healthcare here is genuinely excellent and affordable compared to the US.`);
  return out.slice(0, 3);
}

function whyThisFits(c: Country, ans: number[]): string {
  const parts: string[] = [];
  if (c.climate === climateFromQ3(ans[2])) parts.push(`your climate preference`);
  if (c.healthcare_tier >= healthcareNeed(ans[3])) parts.push(`the level of healthcare you said you need`);
  if (c.cost_tier <= costBudgetTier(ans[4])) parts.push(`your honest monthly budget`);
  if (c.expat_community_size === expatPref(ans[8])) parts.push(`the kind of community you want around you`);
  if (parts.length === 0) parts.push(`several of your priorities`);
  const list = parts.length === 1 ? parts[0] : parts.slice(0, -1).join(", ") + ", and " + parts.slice(-1);
  return `You prioritized ${list}. ${c.name} delivers on those well.`;
}

// ============ UI ============
const BLOG_NAME = "She Left the Chat";

const QuizPage = () => {
  const [step, setStep] = useState(0); // 0..11 questions, 12 results, 13 roadmap
  const [answers, setAnswers] = useState<(number | null)[]>(Array(12).fill(null));
  const [checks, setChecks] = useState<boolean[]>([false,false,false,false]);
  const [copied, setCopied] = useState(false);

  const ranked = useMemo(() => {
    if (answers.some((a) => a === null)) return [];
    const a = answers as number[];
    return [...COUNTRIES]
      .map((c) => ({ c, raw: scoreCountry(c, a) }))
      .sort((x, y) => y.raw - x.raw);
  }, [answers]);

  const selectAnswer = (i: number) => {
    const next = [...answers];
    next[step] = i;
    setAnswers(next);
    setTimeout(() => setStep((s) => s + 1), 180);
  };

  const renderHeader = () => (
    <header style={{ maxWidth: 720, margin: "0 auto", padding: "32px 20px 12px" }}>
      <Link to="/resources" style={{ fontFamily: sans, fontSize: 13, color: MUTED, textDecoration: "none" }}>
        ← Back to Blog
      </Link>
      <div style={{ marginTop: 24, display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: 28 }}>🌍</span>
        <h1 style={{ fontFamily: serif, fontWeight: 700, fontSize: 28, color: INK, margin: 0, lineHeight: 1.15 }}>
          Where Should You Live Next?
        </h1>
      </div>
      <p style={{ fontFamily: sans, fontSize: 15, color: MUTED, margin: "10px 0 0", lineHeight: 1.5 }}>
        A personal quiz for women seriously considering a move abroad. No fluff, just clarity.
      </p>
    </header>
  );

  // ============ QUIZ SCREEN ============
  if (step < 12) {
    const q = QUESTIONS[step];
    const pct = ((step + 1) / 12) * 100;
    return (
      <div style={{ minHeight: "100vh", background: BG, color: INK }}>
        <Seo
          title="Country Match Quiz: where should you actually move?"
          description="A 12-question quiz that matches your priorities, budget, and pace of life to the country that fits you best."
          path="/quiz"
        />
        {renderHeader()}
        <main style={{ maxWidth: 720, margin: "0 auto", padding: "20px 20px 80px" }}>
          {/* Progress */}
          <div style={{ marginTop: 20, marginBottom: 28 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontFamily: sans, fontSize: 12, color: MUTED, marginBottom: 8 }}>
              <span>Question {step + 1} of 12</span>
              <span>{Math.round(pct)}%</span>
            </div>
            <div style={{ height: 6, background: BORDER, borderRadius: 999, overflow: "hidden" }}>
              <div style={{ width: `${pct}%`, height: "100%", background: GOLD, transition: "width .3s ease" }} />
            </div>
          </div>

          {step > 0 && (
            <button
              onClick={() => setStep(step - 1)}
              style={{ background: "none", border: "none", padding: 0, fontFamily: sans, fontSize: 13, color: MUTED, cursor: "pointer", marginBottom: 16 }}
            >
              ← Back
            </button>
          )}

          <h2 style={{ fontFamily: serif, fontWeight: 700, fontSize: 24, color: INK, margin: "0 0 24px", lineHeight: 1.25 }}>
            {q.question}
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {q.answers.map((ans, i) => {
              const selected = answers[step] === i;
              return (
                <button
                  key={i}
                  onClick={() => selectAnswer(i)}
                  style={{
                    textAlign: "left",
                    background: CARD,
                    border: `1px solid ${selected ? GOLD : BORDER}`,
                    borderLeft: `3px solid ${GOLD}`,
                    borderRadius: 12,
                    padding: "16px 18px",
                    fontFamily: sans,
                    fontSize: 15,
                    color: INK,
                    lineHeight: 1.45,
                    cursor: "pointer",
                    boxShadow: selected ? "0 4px 14px rgba(139,125,58,0.15)" : "0 1px 3px rgba(0,0,0,0.04)",
                    transition: "all .15s ease",
                  }}
                >
                  {ans}
                </button>
              );
            })}
          </div>
        </main>
      </div>
    );
  }

  // ============ RESULTS ============
  if (step === 12) {
    const a = answers as number[];
    const top3 = ranked.slice(0, 3);
    const runners = ranked.slice(3, 5);
    const incomeK = incomeKey(a[9]);

    return (
      <div style={{ minHeight: "100vh", background: BG, color: INK }}>
        {renderHeader()}
        <main style={{ maxWidth: 720, margin: "0 auto", padding: "20px 20px 80px" }}>
          <div style={{ marginTop: 20 }}>
            <h2 style={{ fontFamily: serif, fontWeight: 700, fontSize: 28, color: INK, margin: "0 0 8px" }}>
              Your Top Matches
            </h2>
            <p style={{ fontFamily: sans, fontSize: 15, color: MUTED, margin: 0, lineHeight: 1.5 }}>
              Based on your answers, here are the three countries that fit your life best.
            </p>
          </div>

          <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 18 }}>
            {top3.map(({ c, raw }) => {
              const pct = pctMatch(raw);
              const bullets = whatYoullLove(c, a);
              const visaLabel = c.visa_label[incomeK] || "Long-Stay Visa";
              return (
                <article key={c.name} style={{
                  background: CARD,
                  border: `1px solid ${BORDER}`,
                  borderLeft: `3px solid ${GOLD}`,
                  borderRadius: 12,
                  padding: "22px 22px 20px",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, flexWrap: "wrap" }}>
                    <h3 style={{ fontFamily: serif, fontWeight: 700, fontSize: 22, color: INK, margin: 0 }}>
                      {c.flag} {c.name}
                    </h3>
                    <span style={{ fontFamily: sans, fontWeight: 700, fontSize: 15, color: GOLD }}>{pct}% Match</span>
                  </div>

                  <p style={{ fontFamily: serif, fontStyle: "italic", fontSize: 15, color: INK, margin: "12px 0 14px", lineHeight: 1.55 }}>
                    Why this fits you: {whyThisFits(c, a)}
                  </p>

                  <div style={{ fontFamily: sans, fontSize: 12, fontWeight: 600, color: MUTED, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>
                    What you'll love
                  </div>
                  <ul style={{ margin: "0 0 14px", paddingLeft: 20, fontFamily: sans, fontSize: 14, color: INK, lineHeight: 1.55 }}>
                    {bullets.map((b, i) => <li key={i} style={{ marginBottom: 4 }}>{b}</li>)}
                  </ul>

                  <div style={{ fontFamily: sans, fontSize: 12, fontWeight: 600, color: MUTED, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>
                    Be honest with yourself about
                  </div>
                  <p style={{ fontFamily: sans, fontSize: 14, color: INK, margin: "0 0 16px", lineHeight: 1.55 }}>
                    {c.honest_caveat}
                  </p>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{
                      fontFamily: sans, fontSize: 12, fontWeight: 600,
                      background: "#F1ECD9", color: GOLD,
                      padding: "6px 12px", borderRadius: 999,
                    }}>
                      {visaLabel}
                    </span>
                    <a href={c.numbeo} target="_blank" rel="noopener noreferrer"
                      style={{ fontFamily: sans, fontSize: 13, color: GOLD, textDecoration: "underline" }}>
                      Learn More →
                    </a>
                  </div>
                </article>
              );
            })}
          </div>

          {runners.length > 0 && (
            <div style={{ marginTop: 36 }}>
              <h3 style={{ fontFamily: serif, fontWeight: 700, fontSize: 18, color: INK, margin: "0 0 10px" }}>
                Also worth considering
              </h3>
              <p style={{ fontFamily: sans, fontSize: 14, color: MUTED, margin: 0 }}>
                {runners.map(({ c }, i) => (
                  <span key={c.name}>
                    <a href={c.numbeo} target="_blank" rel="noopener noreferrer"
                      style={{ color: INK, textDecoration: "underline" }}>
                      {c.flag} {c.name}
                    </a>
                    {i < runners.length - 1 ? "  ·  " : ""}
                  </span>
                ))}
              </p>
            </div>
          )}

          <div style={{ marginTop: 40, display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button
              onClick={() => { setAnswers(Array(12).fill(null)); setStep(0); }}
              style={{
                fontFamily: sans, fontSize: 14, fontWeight: 600,
                background: "transparent", color: GOLD,
                border: `1.5px solid ${GOLD}`, borderRadius: 999,
                padding: "12px 22px", cursor: "pointer",
              }}
            >
              Retake Quiz
            </button>
            <button
              onClick={() => setStep(13)}
              style={{
                fontFamily: sans, fontSize: 14, fontWeight: 600,
                background: GOLD, color: "#fff",
                border: `1.5px solid ${GOLD}`, borderRadius: 999,
                padding: "12px 22px", cursor: "pointer",
              }}
            >
              See My First Steps →
            </button>
          </div>

          <p style={{ marginTop: 48, fontFamily: serif, fontStyle: "italic", fontSize: 13, color: MUTED, textAlign: "center" }}>
            Built for {BLOG_NAME}. Written from experience, not algorithms.
          </p>
        </main>
      </div>
    );
  }

  // ============ ROADMAP ============
  const a = answers as number[];
  const top = ranked[0].c;
  const incomeK = incomeKey(a[9]);
  const visaLabel = top.visa_label[incomeK] || "Long-Stay Visa";
  const q11 = a[10];
  const q12 = a[11];
  const q9 = a[8];
  const q7 = a[6];

  // Step 1 copy
  let step1 = "";
  if (q11 === 0) {
    const concernLine = [
      "Use that month to sit with a local immigration lawyer for one consultation, in person. Paperwork looks different when you can see the office and ask follow-up questions.",
      "While you are there, time the flight home in your head every morning. A month tells you whether the distance feels manageable or whether it quietly weighs on you.",
      "Eat alone in a restaurant at least three times that month. If you can do that comfortably, you have the foundation for a life here.",
      "Visit a clinic once during that stay, even for something minor, so you know exactly what the process feels like before you actually need it.",
      "Track every euro you spend, not what you think you will spend. The real number is almost always different.",
      "Use the month to test ordinary days, not vacation days. Buy groceries, do laundry, sit through a slow afternoon.",
    ][q12];
    step1 = `Book a 30-day test stay. One month is long enough to understand what daily life actually costs and whether the place suits you, not just whether it makes a nice vacation. ${concernLine}`;
  } else if (q11 === 1) {
    step1 = "Plan a two-week research trip focused on neighborhoods, not tourist areas. Visit a local market, a pharmacy, a clinic, and sit in a cafe for a full morning.";
  } else {
    step1 = "Start with a 10-day trip and give yourself one honest question to answer: could I be comfortably bored here?";
  }

  // Step 2 copy
  const incomeReadable: Record<string, string> = {
    pension: "fixed monthly income from a pension or Social Security",
    savings: "drawing from your retirement savings",
    remote: "remote employment income",
    freelance: "freelance or self-employed income",
    investment: "investment, rental, or other passive income",
  };
  const step2 = `Based on your ${incomeReadable[incomeK]}, the path most women in your situation use in ${top.name} is the ${visaLabel}. In plain language: the country wants to see steady income or assets that show you can support yourself, plus health coverage and a clean background check. The process is ${top.residency_ease === 3 ? "relatively straightforward, though slow" : top.residency_ease === 2 ? "manageable but requires patience and paperwork" : "more complex and worth handling with a local immigration attorney"}.`;

  // Step 3
  let step3Extra = "";
  if (a[9] === 0 || a[9] === 1) {
    step3Extra = `Many women find their monthly expenses drop 35 to 55 percent in ${top.name} compared to major US cities. Run your actual spending against local prices before you decide whether this is or is not affordable for you.`;
  }

  // Step 4
  const expatGroups: Record<string, string> = {
    Portugal: "https://www.facebook.com/groups/AmericansLivingInPortugal/",
    Spain: "https://www.facebook.com/groups/americansinspain/",
    Mexico: "https://www.facebook.com/groups/expatsinmexico/",
    "Costa Rica": "https://www.facebook.com/groups/expatsincostarica/",
    Colombia: "https://www.facebook.com/groups/expatsincolombia/",
    Greece: "https://www.facebook.com/groups/expatsingreece/",
    Italy: "https://www.facebook.com/groups/expatsinitaly/",
    France: "https://www.facebook.com/groups/expatsinfrance/",
    Malta: "https://www.facebook.com/groups/expatsinmalta/",
    Thailand: "https://www.facebook.com/groups/expatsinthailand/",
    Malaysia: "https://www.facebook.com/groups/expatsinmalaysia/",
    Morocco: "https://www.facebook.com/groups/expatsinmorocco/",
    Panama: "https://www.facebook.com/groups/expatsinpanama/",
    Ecuador: "https://www.facebook.com/groups/expatsinecuador/",
    Senegal: "https://www.facebook.com/groups/expatsinsenegal/",
  };
  const languageMap: Record<string, { name: string; url: string }> = {
    Portugal: { name: "Practical Portuguese (Memrise)", url: "https://www.memrise.com/courses/english/portuguese-european/" },
    Spain: { name: "Coffee Break Spanish", url: "https://coffeebreaklanguages.com/coffeebreakspanish/" },
    Mexico: { name: "Coffee Break Spanish", url: "https://coffeebreaklanguages.com/coffeebreakspanish/" },
    "Costa Rica": { name: "Coffee Break Spanish", url: "https://coffeebreaklanguages.com/coffeebreakspanish/" },
    Colombia: { name: "Coffee Break Spanish", url: "https://coffeebreaklanguages.com/coffeebreakspanish/" },
    Greece: { name: "Greek Pod 101", url: "https://www.greekpod101.com/" },
    Italy: { name: "Coffee Break Italian", url: "https://coffeebreaklanguages.com/coffeebreakitalian/" },
    France: { name: "Coffee Break French", url: "https://coffeebreaklanguages.com/coffeebreakfrench/" },
    Malta: { name: "Maltese Language Lessons", url: "https://www.illum.com.mt/" },
    Thailand: { name: "ThaiPod101", url: "https://www.thaipod101.com/" },
    Malaysia: { name: "Malay 101", url: "https://www.malayskill.com/" },
    Morocco: { name: "Darija (Moroccan Arabic) lessons", url: "https://speakmoroccan.com/" },
    Panama: { name: "Coffee Break Spanish", url: "https://coffeebreaklanguages.com/coffeebreakspanish/" },
    Ecuador: { name: "Coffee Break Spanish", url: "https://coffeebreaklanguages.com/coffeebreakspanish/" },
    Senegal: { name: "Wolof for Life Abroad", url: "https://chatgpt.com/g/g-6999f1271bf08191aefe55d6a7e39c45-wolof-for-life-abroad" },
  };

  let step4Title = "Find your people before you arrive";
  let step4Node: JSX.Element;
  if (q9 === 3) {
    step4Title = "Choose your neighborhood, not just the country";
    step4Node = <p style={{ margin: 0 }}>Identify one neighborhood in {top.name} that matches your pace. Research it specifically, not the country generally.</p>;
  } else if (q9 === 0) {
    step4Node = <p style={{ margin: 0 }}>Join the most active English-speaking community for {top.name} before you move. Start here: <a href={expatGroups[top.name]} target="_blank" rel="noopener noreferrer" style={{ color: GOLD, textDecoration: "underline" }}>Expats in {top.name} (Facebook)</a>.</p>;
  } else if (q9 === 2) {
    const l = languageMap[top.name];
    step4Node = <p style={{ margin: 0 }}>Start the local language now, not later. A good place to begin: <a href={l.url} target="_blank" rel="noopener noreferrer" style={{ color: GOLD, textDecoration: "underline" }}>{l.name}</a>.</p>;
  } else if (q7 === 0) {
    step4Node = <p style={{ margin: 0 }}>If you are moving solo, find a community of women who have done this. A good starting point: <a href="https://soloftravelers.com/" target="_blank" rel="noopener noreferrer" style={{ color: GOLD, textDecoration: "underline" }}>Solo Female Travelers</a> and the country forum on <a href={`https://www.expat.com/en/destination/`} target="_blank" rel="noopener noreferrer" style={{ color: GOLD, textDecoration: "underline" }}>Expat.com</a>.</p>;
  } else {
    step4Node = <p style={{ margin: 0 }}>Join the most active community for {top.name} before you move. Start here: <a href={expatGroups[top.name]} target="_blank" rel="noopener noreferrer" style={{ color: GOLD, textDecoration: "underline" }}>Expats in {top.name} (Facebook)</a>.</p>;
  }

  const steps = [
    { title: "Test it before you commit", body: <p style={{ margin: 0 }}>{step1}</p> },
    { title: "Understand your residency path", body: <><p style={{ margin: "0 0 10px" }}>{step2}</p><a href={top.gov_info} target="_blank" rel="noopener noreferrer" style={{ fontFamily: sans, fontSize: 14, color: GOLD, textDecoration: "underline" }}>Official immigration information for {top.name} →</a></> },
    { title: "Run your real numbers", body: <><p style={{ margin: "0 0 10px" }}>Use Numbeo to compare your current city against {top.name}. <a href={`https://www.numbeo.com/cost-of-living/comparison.jsp`} target="_blank" rel="noopener noreferrer" style={{ color: GOLD, textDecoration: "underline" }}>Open the Numbeo cost of living comparison →</a></p>{step3Extra && <p style={{ margin: 0 }}>{step3Extra}</p>}</> },
    { title: step4Title, body: step4Node },
  ];

  const copyResults = async () => {
    const bullets = whatYoullLove(top, a);
    const text = [
      `Top Match: ${top.flag} ${top.name}`,
      ``,
      `What you'll love:`,
      ...bullets.map((b) => `- ${b}`),
      ``,
      `Residency path: ${visaLabel}`,
      ``,
      `Your first steps:`,
      `1. ${steps[0].title} — ${step1}`,
      `2. ${steps[1].title} — ${step2}`,
      `3. ${steps[2].title} — Compare your current city to ${top.name} on Numbeo.${step3Extra ? " " + step3Extra : ""}`,
      `4. ${step4Title}`,
      ``,
      `From ${BLOG_NAME}.`,
    ].join("\n");
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {}
  };

  return (
    <div style={{ minHeight: "100vh", background: BG, color: INK }}>
      {renderHeader()}
      <main style={{ maxWidth: 720, margin: "0 auto", padding: "20px 20px 80px" }}>
        <button
          onClick={() => setStep(12)}
          style={{ background: "none", border: "none", padding: 0, fontFamily: sans, fontSize: 13, color: MUTED, cursor: "pointer", marginTop: 20, marginBottom: 16 }}
        >
          ← Back to results
        </button>

        <h2 style={{ fontFamily: serif, fontWeight: 700, fontSize: 28, color: INK, margin: "0 0 8px", lineHeight: 1.2 }}>
          Your Starting Point for {top.name}
        </h2>
        <p style={{ fontFamily: sans, fontSize: 15, color: MUTED, margin: 0, lineHeight: 1.5 }}>
          Four concrete steps based on your situation.
        </p>

        <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 16 }}>
          {steps.map((s, i) => {
            const checked = checks[i];
            return (
              <article key={i} style={{
                background: CARD,
                border: `1px solid ${BORDER}`,
                borderLeft: `3px solid ${GOLD}`,
                borderRadius: 12,
                padding: "20px 22px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                display: "flex",
                gap: 14,
                alignItems: "flex-start",
              }}>
                <button
                  onClick={() => { const n = [...checks]; n[i] = !n[i]; setChecks(n); }}
                  aria-label={`Mark step ${i+1} complete`}
                  style={{
                    flexShrink: 0, marginTop: 3,
                    width: 22, height: 22, borderRadius: 6,
                    border: `1.5px solid ${checked ? GOLD : BORDER}`,
                    background: checked ? GOLD : "#fff",
                    color: "#fff",
                    cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: sans, fontSize: 14, fontWeight: 700, lineHeight: 1,
                  }}
                >
                  {checked ? "✓" : ""}
                </button>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: sans, fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: GOLD_SOFT, marginBottom: 4 }}>
                    Step {i + 1}
                  </div>
                  <h3 style={{ fontFamily: serif, fontWeight: 700, fontSize: 19, color: INK, margin: "0 0 10px", textDecoration: checked ? "line-through" : "none", opacity: checked ? 0.6 : 1 }}>
                    {s.title}
                  </h3>
                  <div style={{ fontFamily: sans, fontSize: 14.5, color: INK, lineHeight: 1.6 }}>
                    {s.body}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div style={{ marginTop: 36, display: "flex", justifyContent: "center" }}>
          <button
            onClick={copyResults}
            style={{
              fontFamily: sans, fontSize: 14, fontWeight: 600,
              background: GOLD, color: "#fff",
              border: `1.5px solid ${GOLD}`, borderRadius: 999,
              padding: "12px 26px", cursor: "pointer",
            }}
          >
            {copied ? "Copied to clipboard ✓" : "Copy My Results"}
          </button>
        </div>

        <p style={{ marginTop: 48, fontFamily: serif, fontStyle: "italic", fontSize: 13, color: MUTED, textAlign: "center" }}>
          Built for {BLOG_NAME}. Written from experience, not algorithms.
        </p>
      </main>
    </div>
  );
};

export default QuizPage;
