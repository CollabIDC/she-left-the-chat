import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Seo from "@/components/Seo";

const BG = "#FAF7F2";
const GOLD = "#8B7D3A";
const INK = "#1C1C1C";
const MUTED_GRAY = "#9C928A";
const LIGHT_GRAY = "#C9C2B8";
const CARD = "#FFFFFF";
const BORDER = "#E6E0D6";

const serif = "Georgia, 'Times New Roman', serif";
const sans = "Inter, system-ui, -apple-system, sans-serif";

type Answers = {
  trip?: "recon" | "test" | "move";
  season?: "summer" | "shoulder" | "winter";
  stay?: "hotel" | "furnished" | "unfurnished";
  work?: "full" | "light" | "none";
  company?: "solo" | "partner";
  meds?: "daily" | "occasional" | "none";
  walk?: "everywhere" | "moderate" | "shorter";
  style?: "dressup" | "smart" | "comfort";
};

type Priority = "essential" | "recommended" | "nice";
type Item = { text: string; priority: Priority; callout?: string };
type Section = { title: string; intro?: string; topCallout?: string; items: Item[]; endNote?: string };

const QUESTIONS: {
  key: keyof Answers;
  title: string;
  note?: string;
  options: { value: string; label: string }[];
}[] = [
  {
    key: "trip",
    title: "What kind of trip is this?",
    note: "Your answer here shapes the entire list. Take a moment.",
    options: [
      { value: "recon", label: "A reconnaissance trip. I am exploring Madrid before committing. (7 to 14 days)" },
      { value: "test", label: "A test stay. I want to experience living there before deciding. (30 to 90 days)" },
      { value: "move", label: "A one-way move. I am not coming back the same way I arrived." },
    ],
  },
  {
    key: "season",
    title: "When are you going?",
    options: [
      { value: "summer", label: "Summer: May through September" },
      { value: "shoulder", label: "Shoulder season: March, April, October, or November" },
      { value: "winter", label: "Winter: December through February" },
    ],
  },
  {
    key: "stay",
    title: "Where are you staying?",
    options: [
      { value: "hotel", label: "Hotel or serviced apartment (linens, towels, and basics are provided)" },
      { value: "furnished", label: "Furnished short-term rental (kitchen and basics, but I supply toiletries)" },
      { value: "unfurnished", label: "Unfurnished or minimally furnished apartment (I am setting up a home)" },
    ],
  },
  {
    key: "work",
    title: "Will you be working remotely during this trip?",
    options: [
      { value: "full", label: "Yes, full working setup needed. Proper hours, calls, focused work." },
      { value: "light", label: "Yes but lightly. Occasional emails and nothing that requires full concentration." },
      { value: "none", label: "No. I am not working during this trip." },
    ],
  },
  {
    key: "company",
    title: "Are you traveling solo or with a partner?",
    options: [
      { value: "solo", label: "Solo" },
      { value: "partner", label: "With a partner" },
    ],
  },
  {
    key: "meds",
    title: "Do you manage any regular medications or medical equipment?",
    options: [
      { value: "daily", label: "Yes, I manage daily medications and/or medical equipment" },
      { value: "occasional", label: "Yes, occasional medications but nothing I manage daily" },
      { value: "none", label: "No regular medications" },
    ],
  },
  {
    key: "walk",
    title: "How do you move through a city?",
    options: [
      { value: "everywhere", label: "I walk everywhere. Long days on foot, 10,000 steps minimum." },
      { value: "moderate", label: "Moderate walking with regular breaks. I mix walking with sitting and transport." },
      { value: "shorter", label: "I prefer shorter walks and use the metro for most distances." },
    ],
  },
  {
    key: "style",
    title: "What is your honest day-to-day style?",
    options: [
      { value: "dressup", label: "I dress up most days. I feel better when I look put together." },
      { value: "smart", label: "Smart casual. Presentable and comfortable in equal measure." },
      { value: "comfort", label: "Comfort first. I dress down whenever the situation allows." },
    ],
  },
];

function bumpPriority(p: Priority): Priority {
  if (p === "nice") return "recommended";
  if (p === "recommended") return "essential";
  return "essential";
}

function buildList(a: Required<Answers>): Section[] {
  const sections: Section[] = [];

  // SECTION 1: Documents and Admin
  const docs: Item[] = [
    { text: "Passport, valid for at least six months beyond travel date", priority: "essential" },
    { text: "Printed copies of passport photo page, stored separately from the original", priority: "essential" },
    { text: "Travel insurance policy and emergency contact number", priority: "essential" },
    { text: "Health insurance card and policy number", priority: "essential" },
    {
      text: "Emergency contacts printed on paper",
      priority: "essential",
      callout:
        "Do not keep all your documents in one place. Passport in your bag, copies in your suitcase, digital scans in cloud storage. Losing your only copy of anything in a foreign city is a category of bad day you want to avoid.",
    },
  ];
  if (a.trip === "recon" || a.trip === "test") {
    docs.push(
      { text: "Printed accommodation confirmation", priority: "essential" },
      { text: "Printed flight confirmation", priority: "essential" },
      { text: "Any appointment confirmations (lawyer, gestor, viewing)", priority: "essential" },
    );
  }
  if (a.trip === "move") {
    docs.push(
      { text: "Original birth certificate, apostilled", priority: "essential" },
      { text: "Original FBI background check, apostilled", priority: "essential" },
      { text: "All visa application documents in a dedicated folder", priority: "essential" },
      { text: "Social Security card or copy", priority: "essential" },
      { text: "Three to six months of bank statements printed", priority: "essential" },
      { text: "Employment contract or proof of income", priority: "essential" },
      { text: "Medical records summary from your doctor", priority: "recommended" },
      { text: "Prescription documentation for all medications", priority: "essential" },
    );
  }
  sections.push({ title: "Documents and Admin", items: docs });

  // SECTION 2: Clothing
  const clothing: Item[] = [];
  let clothingTopCallout: string | undefined;
  if (a.trip === "recon") {
    clothing.push(
      { text: "5 to 7 day outfits", priority: "essential" },
      {
        text: "1 smart outfit suitable for professional meetings",
        priority: "essential",
        callout:
          "If you have any appointments with a lawyer, gestor, or letting agent, dress the part. First impressions carry more weight in Spanish professional settings than you may be used to.",
      },
      {
        text: "1 lightweight layer or cardigan regardless of season",
        priority: "essential",
        callout:
          "Spanish shops, restaurants, and metros run their air conditioning aggressively in summer. A light layer is not optional from June through August.",
      },
      { text: "Comfortable sleepwear", priority: "essential" },
      { text: "1 set of workout or relaxed clothes if needed", priority: "nice" },
    );
  } else if (a.trip === "test") {
    clothing.push(
      { text: "10 to 14 day outfits", priority: "essential" },
      {
        text: "2 smart outfits suitable for professional meetings",
        priority: "essential",
        callout:
          "First impressions carry more weight in Spanish professional settings than you may be used to.",
      },
      {
        text: "1 lightweight layer or cardigan regardless of season",
        priority: "essential",
        callout:
          "Spanish shops, restaurants, and metros run their air conditioning aggressively in summer.",
      },
      { text: "Comfortable sleepwear", priority: "essential" },
      {
        text: "Laundry bag",
        priority: "recommended",
        callout:
          "Most short-term rentals in Madrid have a washing machine. Learn to do smaller, more frequent loads rather than packing for the entire stay.",
      },
    );
  } else {
    clothingTopCallout =
      "You are not packing for a trip. You are packing the clothing foundation of a new wardrobe. Bring things you know fit your life, that travel well, and that you will still want in six months. Leave behind anything you are keeping out of guilt or habit. Madrid has excellent shopping.";
    clothing.push(
      { text: "10 to 14 carefully chosen day outfits", priority: "essential" },
      { text: "2 to 3 smart outfits for professional and social occasions", priority: "essential" },
      { text: "Clothing that represents how you actually want to live, not how you lived before", priority: "essential" },
      { text: "Comfortable sleepwear", priority: "essential" },
    );
  }
  if (a.season === "summer") {
    clothing.push(
      { text: "Minimum 4 lightweight, breathable tops or dresses", priority: "essential" },
      {
        text: "Sun hat with real coverage",
        priority: "essential",
        callout:
          "Madrid summer is serious heat. UV index regularly hits 9 or 10 from June through August. A sun hat is not a style choice, it is a health decision.",
      },
      { text: "Sandals in addition to walking shoes", priority: "recommended" },
      {
        text: "Small handheld fan",
        priority: "recommended",
        callout: "The metro in summer is hot. Locals carry fans. You will want one by day two.",
      },
    );
  } else if (a.season === "winter") {
    clothing.push(
      {
        text: "Proper coat rated for 3 to 8 degrees Celsius",
        priority: "essential",
        callout: "Madrid winters are short but genuinely cold. A light jacket is not enough. Bring a real coat.",
      },
      { text: "Minimum 3 warm layers", priority: "essential" },
      { text: "Scarf and gloves", priority: "recommended" },
      { text: "Boots suitable for wet cobblestones", priority: "essential" },
    );
  } else {
    clothing.push(
      { text: "Versatile layers that work in a 10 to 20 degree range", priority: "essential" },
      { text: "Light packable rain jacket or quality umbrella", priority: "recommended" },
      { text: "Closed-toe shoes that handle light rain", priority: "essential" },
    );
  }
  if (a.style === "dressup") {
    clothing.push({ text: "1 additional smart outfit", priority: "essential" });
    for (const it of clothing) it.priority = bumpPriority(it.priority);
  } else if (a.style === "comfort") {
    clothing.push(
      { text: "2 additional comfort layers", priority: "recommended" },
      { text: "Comfortable flats or slip-ons", priority: "recommended" },
    );
  }
  sections.push({
    title: "Clothing",
    intro:
      "Madrid is a well-dressed city. Not formal. But put-together. Worn-out trainers and wrinkled travel clothes are more noticeable here than in most capitals. Pack less than you think you need and make sure what you pack is things you actually feel good in.",
    topCallout: clothingTopCallout,
    items: clothing,
  });

  // SECTION 3: Shoes
  const shoes: Item[] = [
    { text: "1 pair of well-broken-in walking shoes or trainers, with real support", priority: "essential" },
    { text: "1 pair of versatile smart-casual shoes suitable for restaurants and meetings", priority: "essential" },
    { text: "1 pair of shoes that can handle wet uneven surfaces", priority: "recommended" },
  ];
  if (a.season === "summer") {
    shoes.push({
      text: "Sandals that can handle a full day of walking",
      priority: "recommended",
      callout: "Flat sandals with a proper footbed, not flip flops. You will be covering real distances.",
    });
  }
  let shoesEndNote: string | undefined;
  if (a.walk === "everywhere") {
    for (const it of shoes) it.priority = "essential";
    shoesEndNote =
      "Consider bringing a backup pair of your primary walking shoe. Blisters at the start of an eight-hour day of neighborhood research are a specific kind of miserable.";
  }
  if (a.trip === "move") {
    shoesEndNote =
      (shoesEndNote ? shoesEndNote + " " : "") +
      "Maximum 3 pairs total. Shoes are heavy and Madrid has excellent shoe shopping.";
  }
  sections.push({
    title: "Shoes",
    topCallout:
      "This section deserves more attention than any other. Madrid is a cobblestone city. The streets are beautiful and they are relentless on feet and on shoes. Every shoe on this list should be something you have already broken in. Do not bring new shoes to Madrid. Do not bring cheap shoes to Madrid. You will be walking more than you expect and your feet will tell you about every decision you made while packing.",
    items: shoes,
    endNote: shoesEndNote,
  });

  // SECTION 4: Tech and Power
  const tech: Item[] = [
    {
      text: "Type C and Type F plug adapter for Spain",
      priority: "essential",
      callout:
        "Spain uses Type C and F plugs at 220 volts. Every US device needs an adapter. If your device is not dual voltage, check the label before you plug it in. A dual-voltage device will say 100 to 240V. A device that says 120V only will be damaged or destroyed by Spanish current even with an adapter.",
    },
    { text: "Phone charger", priority: "essential" },
    {
      text: "Portable battery pack",
      priority: "recommended",
      callout:
        "Long days of walking and using Maps will drain your phone. A portable battery is not optional if you are doing serious neighborhood research.",
    },
  ];
  let techEnd: string | undefined;
  if (a.work === "full") {
    tech.push(
      { text: "Laptop and charger", priority: "essential" },
      { text: "Laptop adapter for Spanish outlets", priority: "essential" },
      { text: "Noise-canceling headphones or earbuds", priority: "recommended" },
      { text: "Any dongles or peripherals you depend on", priority: "recommended" },
    );
    techEnd = "Test your full work setup from your accommodation on day one, before you have a deadline that depends on it.";
  } else if (a.work === "light") {
    tech.push(
      { text: "Laptop or tablet", priority: "recommended" },
      { text: "Laptop adapter", priority: "recommended" },
    );
  }
  if (a.trip === "move") {
    tech.push(
      { text: "External hard drive with backup of all important files", priority: "essential" },
      { text: "Scans of all documents on a dedicated USB drive", priority: "recommended" },
    );
  }
  sections.push({ title: "Tech and Power", items: tech, endNote: techEnd });

  // SECTION 5: Health and Medical
  const medsCallout =
    a.trip === "recon"
      ? "Bring the full amount for your trip plus one week extra."
      : a.trip === "test"
      ? "Bring three months supply minimum. More if your medication is hard to source."
      : "Bring three to six months supply and a letter from your doctor describing your condition and the medication's generic name. Find a Madrid doctor in your first two weeks.";

  const health: Item[] = [
    { text: "All prescription medications", priority: "essential", callout: medsCallout },
    { text: "Written prescription or doctor's note for each medication", priority: "essential" },
    {
      text: "Basic first aid: blister plasters (critical given the walking), pain relief, antihistamine, antidiarrheal",
      priority: "essential",
    },
    { text: "Any vitamins or supplements you use regularly", priority: "recommended" },
    {
      text: "Sunscreen SPF 50",
      priority: a.season === "summer" ? "essential" : "recommended",
      callout:
        a.season === "summer"
          ? "SPF 50 minimum. Reapply. Madrid summer UV is serious and the sun reflects off the pale stone streets."
          : undefined,
    },
  ];
  if (a.meds === "daily") {
    health.push(
      { text: "Medical equipment in carry-on bag, never checked luggage", priority: "essential" },
      { text: "Doctor's letter on official letterhead describing equipment and necessity", priority: "essential" },
      { text: "Extra supplies beyond what you calculate needing", priority: "essential" },
    );
  }
  if (a.company === "solo") {
    health.push(
      { text: "Personal safety item of your choice", priority: "nice" },
      { text: "Written note of nearest hospital or clinic to your accommodation", priority: "recommended" },
    );
  }
  sections.push({
    title: "Health and Medical",
    topCallout:
      "This section is non-negotiable. Do not pack light here. Replacing prescription medication in a foreign country is genuinely difficult and sometimes impossible. Brand names differ. Some medications require a new local prescription. Some are simply not available. Bring more than you think you need.",
    items: health,
  });

  // SECTION 6: Everyday Practical
  const everyday: Item[] = [
    {
      text: "Crossbody bag that zips closed",
      priority: "essential",
      callout:
        "Madrid is generally safe but pickpocketing exists in tourist-heavy areas like Sol, Gran Via, and the Rastro market. An open tote or shoulder bag is a preventable risk. A zipped crossbody worn in front in crowded areas is the practical choice, not a paranoid one.",
    },
    {
      text: "Reusable water bottle",
      priority: "essential",
      callout:
        "Madrid tap water is safe to drink and genuinely good. You will be walking in a warm climate. Fill up before you leave your accommodation every morning.",
    },
    { text: "Small day backpack if doing longer exploring days", priority: "recommended" },
    {
      text: "Lightweight packable tote bag for market shopping",
      priority: "recommended",
      callout:
        "Spanish mercados and most small shops do not automatically provide bags. A packable tote takes up no space and you will use it constantly.",
    },
  ];
  if (a.season === "summer") {
    everyday.push(
      {
        text: "Small umbrella for sudden summer storms",
        priority: "recommended",
        callout:
          "Madrid summer storms arrive fast and move on fast. A small umbrella lives in your bag from June through September.",
      },
      {
        text: "Electrolyte packets",
        priority: "recommended",
        callout:
          "Heat exhaustion is real in Madrid July and August. Electrolyte packets are cheap, light, and one of the most useful things you can bring.",
      },
    );
  } else {
    everyday.push({ text: "Compact umbrella", priority: "essential" });
  }
  if (a.trip === "test" || a.trip === "move") {
    everyday.push(
      { text: "Laundry mesh bags", priority: "recommended" },
      { text: "Small sewing kit", priority: "nice" },
      { text: "Stain remover pen", priority: "recommended" },
    );
  }
  if (a.stay === "unfurnished") {
    everyday.push({
      text: "Small set of kitchen essentials for first week (coffee supplies, a sharp knife if shipping separately)",
      priority: "recommended",
      callout:
        "Even in a furnished apartment, the kitchen is often missing the small things that make mornings work. Pack coffee, a travel mug, and anything else that makes your morning routine non-negotiable.",
    });
  }
  sections.push({ title: "Everyday Practical", items: everyday });

  // SECTION 7: Home Comforts (only test/move)
  if (a.trip === "test" || a.trip === "move") {
    const home: Item[] = [
      {
        text: "One item from home that makes you feel settled (a photo, a small object, your own pillow cover)",
        priority: "recommended",
      },
      {
        text: "Your preferred brand of coffee or tea if it matters to you",
        priority: "recommended",
        callout:
          "You can find most things in Madrid but your specific brand of morning coffee may not be one of them. Bring enough for two weeks while you find your local alternative.",
      },
      { text: "A small speaker if music matters to your daily routine", priority: "nice" },
    ];
    if (a.trip === "move") {
      home.push({
        text: "One item of genuine sentimental value that cannot be replaced or shipped",
        priority: "essential",
        callout: "Put it in your carry-on. Not your suitcase.",
      });
    }
    sections.push({
      title: "Home Comforts",
      topCallout:
        "This section is about the small things that make a temporary apartment feel like somewhere you actually live. Do not underestimate them. The difference between feeling displaced and feeling at home in a new city is often three or four small familiar objects.",
      items: home,
    });
  }

  return sections;
}

const LEAVE_BEHIND_BASE: { title: string; desc: string }[] = [
  {
    title: "Your US hairdryer or straightener",
    desc: "Spain runs on 220V. Unless yours explicitly states 100 to 240V on the label, it will fry. Buy a cheap one in Madrid or bring a verified dual-voltage device.",
  },
  { title: "Brand new shoes", desc: "Break them in first or do not bring them. Cobblestones are unforgiving." },
  {
    title: "A full medicine cabinet",
    desc: "Bring your prescriptions and your essentials. Everything else is available at a Spanish farmacia and often cheaper.",
  },
  {
    title: "Excessive comfort food from home",
    desc: "One or two items that matter to your routine. Not a suitcase full. Spanish supermarkets are excellent.",
  },
  { title: "Clothes you are keeping out of guilt", desc: "You will not wear them. They will take up space. Leave them." },
];

const LEAVE_BEHIND_MOVE: { title: string; desc: string }[] = [
  {
    title: "Most of your furniture",
    desc: "International shipping is expensive. Price it honestly against buying secondhand in Madrid. The math rarely works in shipping's favor.",
  },
  {
    title: "US-specific large appliances",
    desc: "Voltage, frequency, and plug format differences make most large US appliances impractical in Spain. Sell them or store them.",
  },
  {
    title: "Anything you are taking because leaving it felt too final",
    desc: "That feeling is grief, not logistics. You can come back for things. You cannot come back for the clarity of traveling light.",
  },
];

function summaryLine(a: Required<Answers>) {
  const tripLabel =
    a.trip === "recon" ? "reconnaissance trip, 7 to 14 days" : a.trip === "test" ? "30 to 90 day test stay" : "one-way move";
  const seasonLabel = a.season === "summer" ? "summer" : a.season === "winter" ? "winter" : "shoulder season";
  return `Built for a ${seasonLabel} ${tripLabel}.`;
}

function PriorityPill({ p }: { p: Priority }) {
  const map: Record<Priority, { label: string; bg: string; color: string }> = {
    essential: { label: "Essential", bg: GOLD, color: "#FFFFFF" },
    recommended: { label: "Strongly Recommended", bg: MUTED_GRAY, color: "#FFFFFF" },
    nice: { label: "Nice to Have", bg: LIGHT_GRAY, color: INK },
  };
  const s = map[p];
  return (
    <span
      style={{
        background: s.bg,
        color: s.color,
        fontFamily: sans,
        fontWeight: 600,
        fontSize: 10,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        padding: "3px 8px",
        borderRadius: 999,
        whiteSpace: "nowrap",
        marginLeft: 8,
      }}
    >
      {s.label}
    </span>
  );
}

function listToPlainText(sections: Section[], summary: string, leaveBehind: { title: string; desc: string }[]) {
  let out = `YOUR MADRID PACKING LIST\n${summary}\n\n`;
  for (const sec of sections) {
    out += `== ${sec.title.toUpperCase()} ==\n`;
    if (sec.topCallout) out += `Note: ${sec.topCallout}\n`;
    if (sec.intro) out += `${sec.intro}\n`;
    for (const it of sec.items) {
      out += `- [ ] ${it.text} (${
        it.priority === "essential" ? "Essential" : it.priority === "recommended" ? "Strongly Recommended" : "Nice to Have"
      })\n`;
      if (it.callout) out += `   Note: ${it.callout}\n`;
    }
    if (sec.endNote) out += `Note: ${sec.endNote}\n`;
    out += "\n";
  }
  out += "== LEAVE THESE BEHIND ==\n";
  for (const lb of leaveBehind) out += `- ${lb.title}: ${lb.desc}\n`;
  return out;
}

const PackingListBuilder = () => {
  const [step, setStep] = useState(0); // 0..7 questions, 8 = results
  const [answers, setAnswers] = useState<Answers>({});
  const [copied, setCopied] = useState(false);
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const total = QUESTIONS.length;
  const isResults = step >= total;

  const sections = useMemo(() => {
    if (!isResults) return [];
    return buildList(answers as Required<Answers>);
  }, [isResults, answers]);

  const leaveBehind = useMemo(() => {
    if (!isResults) return [];
    return answers.trip === "move" ? [...LEAVE_BEHIND_BASE, ...LEAVE_BEHIND_MOVE] : LEAVE_BEHIND_BASE;
  }, [isResults, answers.trip]);

  const summary = isResults ? summaryLine(answers as Required<Answers>) : "";

  function selectAnswer(key: keyof Answers, value: string) {
    setAnswers((prev) => ({ ...prev, [key]: value as Answers[keyof Answers] }));
    setStep((s) => s + 1);
  }

  function handleCopy() {
    const text = listToPlainText(sections, summary, leaveBehind);
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  }

  function handlePrint() {
    window.print();
  }

  function restart() {
    setAnswers({});
    setStep(0);
    setCollapsed({});
  }

  const backLink = (
    <Link
      to="/resources"
      className="no-print"
      style={{
        fontFamily: sans,
        fontSize: 14,
        color: GOLD,
        textDecoration: "none",
        fontWeight: 500,
      }}
    >
      ← Back to Resources
    </Link>
  );

  return (
    <div style={{ minHeight: "100vh", background: BG, color: INK }}>
      <Seo
        title="Madrid Packing List Builder | She Left the Chat"
        description="Answer eight questions. Get a packing list built for your Madrid trip, not everyone else's. Reconnaissance, test stay, or one-way move."
        path="/resources/packing-list-builder"
      />
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body, html { background: #fff !important; }
          .print-root { background: #fff !important; padding: 0 !important; }
          .print-card { box-shadow: none !important; border: none !important; border-left: 3px solid ${GOLD} !important; page-break-inside: avoid; }
          .print-checkbox { width: 14px; height: 14px; border: 1.5px solid #000; display: inline-block; margin-right: 10px; vertical-align: middle; }
        }
      `}</style>

      <div className="print-root" style={{ maxWidth: 820, margin: "0 auto", padding: "32px 20px 80px" }}>
        <div className="no-print" style={{ marginBottom: 24 }}>{backLink}</div>

        {/* Header */}
        <header style={{ textAlign: "center", marginBottom: 32 }} className={isResults ? "no-print" : ""}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>📋</div>
          <h1 style={{ fontFamily: serif, fontWeight: 700, fontSize: 36, lineHeight: 1.15, margin: "0 0 12px", color: INK }}>
            Madrid Packing List Builder
          </h1>
          <p style={{ fontFamily: sans, fontSize: 16, color: "#5C544B", margin: 0, lineHeight: 1.5 }}>
            Answer eight questions. Get a list built for your trip, not everyone else's.
          </p>
        </header>

        {!isResults && (
          <div className="no-print">
            {/* Progress */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontFamily: sans, fontSize: 12, color: "#5C544B", marginBottom: 8, letterSpacing: "0.08em" }}>
                QUESTION {step + 1} OF {total}
              </div>
              <div style={{ height: 6, background: "#E6E0D6", borderRadius: 999, overflow: "hidden" }}>
                <div
                  style={{
                    width: `${((step + 1) / total) * 100}%`,
                    height: "100%",
                    background: GOLD,
                    transition: "width 0.3s ease",
                  }}
                />
              </div>
            </div>

            <QuestionView
              question={QUESTIONS[step]}
              onSelect={(v) => selectAnswer(QUESTIONS[step].key, v)}
            />

            {step > 0 && (
              <button
                onClick={() => setStep((s) => s - 1)}
                style={{
                  marginTop: 24,
                  background: "transparent",
                  border: "none",
                  color: GOLD,
                  fontFamily: sans,
                  fontSize: 14,
                  cursor: "pointer",
                  padding: 0,
                }}
              >
                ← Back
              </button>
            )}
          </div>
        )}

        {isResults && (
          <>
            <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 24, marginBottom: 24 }}>
              <h2 style={{ fontFamily: serif, fontWeight: 700, fontSize: 30, margin: "0 0 8px", color: INK }}>
                Your Madrid Packing List
              </h2>
              <p style={{ fontFamily: serif, fontStyle: "italic", fontSize: 17, color: "#5C544B", margin: 0 }}>
                {summary}
              </p>
            </div>

            <div className="no-print" style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 32 }}>
              <button
                onClick={handlePrint}
                style={{
                  background: GOLD,
                  color: "#fff",
                  border: "none",
                  padding: "12px 20px",
                  borderRadius: 8,
                  fontFamily: sans,
                  fontWeight: 600,
                  fontSize: 14,
                  cursor: "pointer",
                  letterSpacing: "0.04em",
                }}
              >
                Print This List
              </button>
              <button
                onClick={handleCopy}
                style={{
                  background: "transparent",
                  color: GOLD,
                  border: `2px solid ${GOLD}`,
                  padding: "10px 20px",
                  borderRadius: 8,
                  fontFamily: sans,
                  fontWeight: 600,
                  fontSize: 14,
                  cursor: "pointer",
                  letterSpacing: "0.04em",
                }}
              >
                Copy to Clipboard
              </button>
              {copied && (
                <span style={{ alignSelf: "center", fontFamily: serif, fontStyle: "italic", color: GOLD, fontSize: 14 }}>
                  Copied. Go pack.
                </span>
              )}
              <button
                onClick={restart}
                style={{
                  background: "transparent",
                  color: "#5C544B",
                  border: "none",
                  padding: "10px 0",
                  fontFamily: sans,
                  fontSize: 14,
                  cursor: "pointer",
                  marginLeft: "auto",
                }}
              >
                Start over
              </button>
            </div>

            {sections.map((sec) => {
              const isOpen = !collapsed[sec.title];
              return (
                <div
                  key={sec.title}
                  className="print-card"
                  style={{
                    background: CARD,
                    borderLeft: `3px solid ${GOLD}`,
                    borderRadius: 12,
                    boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
                    padding: 24,
                    marginBottom: 20,
                  }}
                >
                  <button
                    onClick={() => setCollapsed((c) => ({ ...c, [sec.title]: !c[sec.title] }))}
                    className="no-print"
                    style={{
                      background: "transparent",
                      border: "none",
                      padding: 0,
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                  >
                    <h3 style={{ fontFamily: serif, fontWeight: 700, fontSize: 22, margin: 0, color: INK }}>
                      {sec.title}
                    </h3>
                    <span style={{ color: GOLD, fontSize: 16, transform: isOpen ? "rotate(0deg)" : "rotate(-90deg)", transition: "transform 0.2s" }}>
                      ▾
                    </span>
                  </button>
                  <h3 className="print-only" style={{ display: "none" }}>
                    {sec.title}
                  </h3>

                  {(isOpen || true) && (
                    <div style={{ marginTop: 14 }} className={isOpen ? "" : "no-print"}>
                      {!isOpen && null}
                      {isOpen && (
                        <>
                          {sec.topCallout && <Callout text={sec.topCallout} />}
                          {sec.intro && (
                            <p style={{ fontFamily: serif, fontStyle: "italic", color: "#5C544B", fontSize: 15, lineHeight: 1.6, margin: "0 0 16px" }}>
                              {sec.intro}
                            </p>
                          )}
                          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                            {sec.items.map((it, idx) => (
                              <ItemRow key={idx} item={it} />
                            ))}
                          </ul>
                          {sec.endNote && <div style={{ marginTop: 12 }}><Callout text={sec.endNote} /></div>}
                        </>
                      )}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Leave Behind */}
            <div
              className="print-card"
              style={{
                background: CARD,
                borderLeft: `3px solid ${GOLD}`,
                borderRadius: 12,
                boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
                padding: 24,
                marginBottom: 32,
              }}
            >
              <h3 style={{ fontFamily: serif, fontWeight: 700, fontSize: 22, margin: "0 0 16px", color: INK }}>
                Leave These Behind
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {leaveBehind.map((lb) => (
                  <li key={lb.title} style={{ marginBottom: 14, fontFamily: sans, fontSize: 15, lineHeight: 1.6, color: INK }}>
                    <strong style={{ fontFamily: serif }}>{lb.title}:</strong>{" "}
                    <span style={{ color: "#5C544B" }}>{lb.desc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bottom action strip */}
            <div className="no-print" style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center", marginBottom: 12 }}>
              <button
                onClick={handlePrint}
                style={{
                  background: GOLD,
                  color: "#fff",
                  border: "none",
                  padding: "12px 20px",
                  borderRadius: 8,
                  fontFamily: sans,
                  fontWeight: 600,
                  fontSize: 14,
                  cursor: "pointer",
                }}
              >
                Print This List
              </button>
              <button
                onClick={handleCopy}
                style={{
                  background: "transparent",
                  color: GOLD,
                  border: `2px solid ${GOLD}`,
                  padding: "10px 20px",
                  borderRadius: 8,
                  fontFamily: sans,
                  fontWeight: 600,
                  fontSize: 14,
                  cursor: "pointer",
                }}
              >
                Copy to Clipboard
              </button>
            </div>
            <p className="no-print" style={{ fontFamily: serif, fontStyle: "italic", color: "#8A8078", fontSize: 13, margin: "8px 0 40px" }}>
              This list updates as Spain does. Last reviewed June 2026.
            </p>

            {/* Related Resources */}
            <div className="no-print">
              <div style={{ height: 1, background: GOLD, opacity: 0.5, margin: "32px 0 24px" }} />
              <h4 style={{ fontFamily: serif, fontWeight: 700, fontSize: 18, margin: "0 0 16px", color: INK }}>
                Related Resources
              </h4>
              <div style={{ display: "grid", gap: 12, gridTemplateColumns: "1fr" }}>
                <Link
                  to="/resources"
                  style={{
                    background: CARD,
                    borderLeft: `3px solid ${GOLD}`,
                    borderRadius: 12,
                    padding: 16,
                    textDecoration: "none",
                    color: INK,
                    boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
                  }}
                >
                  <div style={{ fontFamily: serif, fontWeight: 700, fontSize: 16 }}>🗺️ The Move Abroad Roadmap</div>
                  <div style={{ fontFamily: sans, fontSize: 14, color: "#5C544B", marginTop: 4 }}>
                    The step-by-step logistics guide.
                  </div>
                </Link>
                <Link
                  to="/resources/neighborhood-matcher"
                  style={{
                    background: CARD,
                    borderLeft: `3px solid ${GOLD}`,
                    borderRadius: 12,
                    padding: 16,
                    textDecoration: "none",
                    color: INK,
                    boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
                  }}
                >
                  <div style={{ fontFamily: serif, fontWeight: 700, fontSize: 16 }}>📍 Madrid Neighborhood Matcher</div>
                  <div style={{ fontFamily: sans, fontSize: 14, color: "#5C544B", marginTop: 4 }}>
                    Find the neighborhood that fits how you actually live.
                  </div>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

function QuestionView({
  question,
  onSelect,
}: {
  question: (typeof QUESTIONS)[number];
  onSelect: (v: string) => void;
}) {
  return (
    <div>
      <h2 style={{ fontFamily: serif, fontWeight: 700, fontSize: 26, lineHeight: 1.25, margin: "0 0 8px", color: INK }}>
        {question.title}
      </h2>
      {question.note && (
        <p style={{ fontFamily: serif, fontStyle: "italic", fontSize: 14, color: GOLD, margin: "0 0 20px" }}>
          {question.note}
        </p>
      )}
      <div style={{ display: "grid", gap: 12, marginTop: 20 }}>
        {question.options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onSelect(opt.value)}
            style={{
              background: CARD,
              borderLeft: `3px solid ${GOLD}`,
              border: "none",
              borderLeftWidth: 3,
              borderLeftStyle: "solid",
              borderLeftColor: GOLD,
              borderRadius: 12,
              padding: "18px 20px",
              textAlign: "left",
              cursor: "pointer",
              fontFamily: sans,
              fontSize: 16,
              color: INK,
              lineHeight: 1.5,
              boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
              transition: "transform 0.15s, box-shadow 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.08)";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.06)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function ItemRow({ item }: { item: Item }) {
  return (
    <li style={{ padding: "10px 0", borderBottom: `1px solid ${BORDER}` }}>
      <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer", fontFamily: sans, fontSize: 15, lineHeight: 1.5, color: INK }}>
        <input type="checkbox" className="print-checkbox" style={{ marginTop: 4, accentColor: GOLD }} />
        <span style={{ flex: 1 }}>
          {item.text}
          <PriorityPill p={item.priority} />
        </span>
      </label>
      {item.callout && <div style={{ marginTop: 8, marginLeft: 24 }}><Callout text={item.callout} /></div>}
    </li>
  );
}

function Callout({ text }: { text: string }) {
  return (
    <div
      style={{
        background: "rgba(139,125,58,0.08)",
        borderLeft: `2px solid ${GOLD}`,
        padding: "10px 14px",
        borderRadius: 6,
        fontFamily: serif,
        fontStyle: "italic",
        fontSize: 14,
        lineHeight: 1.55,
        color: "#6B5E2E",
        margin: "10px 0",
      }}
    >
      {text}
    </div>
  );
}

export default PackingListBuilder;
