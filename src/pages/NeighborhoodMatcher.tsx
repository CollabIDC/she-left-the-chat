import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";

const BG = "#FAF7F2";
const INK = "#1C1C1C";
const OLIVE = "#8B7D3A";
const MUTED = "#5C5448";
const CARD_BG = "#FFFFFF";

const display = "'Playfair Display', Georgia, serif";
const body = "'Inter', system-ui, sans-serif";

// ------------------------------ Quiz ------------------------------

type Choice = { label: string; tag: string };
type Question = { q: string; key: string; choices: Choice[] };

const questions: Question[] = [
  {
    key: "morning",
    q: "What does your ideal morning in Madrid look like?",
    choices: [
      { label: "Coffee at a quiet cafe with a book, no rush, no noise", tag: "quiet" },
      { label: "A long walk through a market or park before the city wakes up", tag: "green_local" },
      { label: "Straight to work, I need strong wifi and somewhere I can focus", tag: "work" },
      { label: "Breakfast out at a proper sit-down place, then errands on foot", tag: "walkable" },
    ],
  },
  {
    key: "safety",
    q: "How important is it to feel physically safe walking alone at night?",
    choices: [
      { label: "It is my top priority. I will not compromise on this.", tag: "high" },
      { label: "Very important but I am street-smart and can navigate most situations", tag: "mid" },
      { label: "Important but I have lived in cities before and I know how to read a neighborhood", tag: "low" },
    ],
  },
  {
    key: "noise",
    q: "What is your honest relationship with noise?",
    choices: [
      { label: "I need genuine quiet to feel at home. Noise wears me out.", tag: "quiet" },
      { label: "Some ambient city noise is fine but I want to sleep without earplugs", tag: "moderate" },
      { label: "I like feeling the energy of a neighborhood around me, noise included", tag: "lively" },
    ],
  },
  {
    key: "transit",
    q: "How do you want to get around Madrid?",
    choices: [
      { label: "Almost entirely on foot. I want everything walkable.", tag: "walk" },
      { label: "Mix of walking and metro, I do not mind a short commute to things", tag: "mix" },
      { label: "I will take the metro regularly, neighborhood location is less critical to me", tag: "metro" },
    ],
  },
  {
    key: "shopping",
    q: "What matters most about where you eat and shop?",
    choices: [
      { label: "Local mercados, independent shops, places that feel like they belong to the neighborhood", tag: "local" },
      { label: "A mix of local character and some international options for comfort", tag: "mix" },
      { label: "Convenience and quality, I want good options close without having to search", tag: "convenience" },
    ],
  },
  {
    key: "community",
    q: "What kind of neighbors and street life do you want around you?",
    choices: [
      { label: "Mostly local Spanish residents, I want to integrate not just observe", tag: "local" },
      { label: "A healthy mix of locals and international residents", tag: "mix" },
      { label: "An established expat community where I can make English-speaking friends more easily", tag: "expat" },
    ],
  },
  {
    key: "budget",
    q: "What is your budget for rent on a one-bedroom apartment?",
    choices: [
      { label: "Under €1,200 per month", tag: "low" },
      { label: "€1,200 to €1,600 per month", tag: "mid" },
      { label: "€1,600 to €2,200 per month", tag: "high" },
      { label: "Above €2,200 per month", tag: "top" },
    ],
  },
  {
    key: "green",
    q: "What is your relationship with green space?",
    choices: [
      { label: "Essential. I need parks, trees, and somewhere to walk that is not concrete.", tag: "essential" },
      { label: "Nice to have but not a dealbreaker", tag: "nice" },
      { label: "Not a priority for me", tag: "no" },
    ],
  },
  {
    key: "tourists",
    q: "How do you feel about tourists?",
    choices: [
      { label: "I want to live somewhere locals actually live, away from tourist infrastructure", tag: "avoid" },
      { label: "A few tourist areas nearby is fine, I just do not want to be in the middle of it", tag: "ok" },
      { label: "I do not mind, I actually like being close to the energy of central Madrid", tag: "fine" },
    ],
  },
  {
    key: "evening",
    q: "What does your ideal evening in Madrid look like?",
    choices: [
      { label: "Home by nine, quiet dinner, early to bed", tag: "early" },
      { label: "Dinner out at a neighborhood spot around nine, home by midnight", tag: "moderate" },
      { label: "I want to be close to the action if I want it, even if I do not always use it", tag: "lively" },
    ],
  },
];

// ------------------------------ Neighborhoods ------------------------------

type Hood = {
  name: string;
  // Attributes for scoring
  noise: "quiet" | "moderate" | "lively";
  safety: "high" | "mid";
  budget: "low" | "mid" | "high" | "top"; // approximate band of typical rent
  budgetBands: ("low" | "mid" | "high" | "top")[]; // accepted bands
  community: "local" | "mix" | "expat";
  green: "essential" | "nice" | "no";
  tourist: "avoid" | "ok" | "fine";
  walkability: "walk" | "mix";
  mapsQuery: string;
  shortDesc: string;
  detail: {
    feel: string;
    thrives: string[];
    struggles: string[];
    rent: string;
    metro: string;
    mercado: string;
    noiseLevel: string;
    safety: string;
    insight: string;
  };
};

const hoods: Hood[] = [
  {
    name: "Chamberí",
    noise: "quiet",
    safety: "high",
    budget: "mid",
    budgetBands: ["mid", "high"],
    community: "local",
    green: "nice",
    tourist: "avoid",
    walkability: "walk",
    mapsQuery: "Chamberí, Madrid, Spain",
    shortDesc: "Residential, locally rooted, café culture without the performance.",
    detail: {
      feel: "Chamberí feels like a Madrid neighborhood that never stopped being a neighborhood. The pavements are wide. The mercado is busy on a Tuesday. People know the woman at the bakery. It rewards the kind of slow daily life that other central neighborhoods can't quite hold onto anymore.",
      thrives: [
        "Women building a settled, walkable daily routine",
        "Anyone who values a genuine residential feel over nightlife",
        "Readers, café regulars, people who want to be known by name",
        "Those who want to integrate locally without needing fluent Spanish on day one",
      ],
      struggles: [
        "People who need spontaneous evening energy outside their door",
        "Anyone moving in August expecting the neighborhood to be lively",
      ],
      rent: "€1,100 to €1,600 for a decent one-bedroom (2025)",
      metro: "Iglesia, Bilbao, Quevedo, Alonso Cano (lines 1, 2, 4, 7)",
      mercado: "Mercado de Vallehermoso, walkable from most of the neighborhood",
      noiseLevel: "Quiet to Moderate",
      safety: "One of the safest central neighborhoods, day and night. Calle Fuencarral near the southern edge is the noisier exception.",
      insight: "The noise in Chamberí is horizontal, not vertical. It comes from street-level bars, not upstairs neighbors. A first-floor or street-facing apartment around Alonso Martínez can be louder than the neighborhood's reputation suggests.",
    },
  },
  {
    name: "Salamanca",
    noise: "quiet",
    safety: "high",
    budget: "high",
    budgetBands: ["high", "top"],
    community: "mix",
    green: "nice",
    tourist: "avoid",
    walkability: "walk",
    mapsQuery: "Barrio de Salamanca, Madrid, Spain",
    shortDesc: "Polished, very safe, expensive, formal in a way you'll either love or find cold.",
    detail: {
      feel: "Salamanca is the Madrid you see in glossy magazines. Wide, tree-lined streets. Architecture that takes itself seriously. A neighborhood that runs on a quieter, more polished energy than almost anywhere else in the city.",
      thrives: [
        "Women who want infrastructure, polish, and safety as a baseline",
        "Anyone who walks Retiro daily and wants it as their backyard",
        "Buyers and renters with budget who don't want to compromise on quiet",
        "People who prefer formality and routine over neighborhood spontaneity",
      ],
      struggles: [
        "Anyone hoping to feel the texture of Madrid in their daily life",
        "Budgets under €1,600 for a comfortable one-bedroom",
      ],
      rent: "€1,600 to €2,500 for a decent one-bedroom (2025)",
      metro: "Goya, Velázquez, Príncipe de Vergara, Serrano (lines 2, 4, 5, 9)",
      mercado: "Mercado de la Paz, one of the best in Madrid",
      noiseLevel: "Quiet (Moderate near Goya and Jorge Juan on weekend nights)",
      safety: "Very safe day and night across the entire neighborhood.",
      insight: "Salamanca is not uniformly quiet. The blocks near Goya metro and Jorge Juan are noticeably louder on weekend nights than the residential blocks further east toward Príncipe de Vergara. The neighborhood breaks into two characters depending on which street you choose.",
    },
  },
  {
    name: "Retiro",
    noise: "quiet",
    safety: "high",
    budget: "mid",
    budgetBands: ["mid", "high"],
    community: "local",
    green: "essential",
    tourist: "avoid",
    walkability: "walk",
    mapsQuery: "Retiro, Madrid, Spain",
    shortDesc: "The park is your front garden. Calm, family-rooted, deliberate.",
    detail: {
      feel: "Retiro lives at the pace of the park it shares its name with. Families. Dog walkers. Older couples on slow evening strolls. It is one of the few central neighborhoods in Madrid where the rhythm of the day genuinely slows down after dinner.",
      thrives: [
        "Anyone who walks daily and wants Retiro on their doorstep",
        "Women who already have or are building a quieter social life",
        "People who want a residential feel without giving up central access",
        "Anyone who prefers neighborhood depth over neighborhood noise",
      ],
      struggles: [
        "Solo women new to Madrid who need spontaneous social infrastructure",
        "Anyone wanting an established English-speaking community within walking distance",
      ],
      rent: "€1,300 to €1,900 for a decent one-bedroom (2025)",
      metro: "Retiro, Ibiza, Príncipe de Vergara, O'Donnell (lines 2, 6, 9)",
      mercado: "Mercado de Ibiza and others nearby; less mercado-dense than Chamberí",
      noiseLevel: "Quiet",
      safety: "Very safe. Streets along the park edges see more foot traffic on weekends.",
      insight: "The blocks directly facing the park get noticeably more weekend foot traffic and noise than the streets one or two blocks east. If you want the park without the weekend crowd noise, look slightly inland.",
    },
  },
  {
    name: "Malasaña",
    noise: "lively",
    safety: "mid",
    budget: "mid",
    budgetBands: ["low", "mid"],
    community: "expat",
    green: "no",
    tourist: "ok",
    walkability: "walk",
    mapsQuery: "Malasaña, Madrid, Spain",
    shortDesc: "Walkable, creative, loud. The aesthetic is real and so is the noise.",
    detail: {
      feel: "Malasaña is the most walkable independent-shop neighborhood in central Madrid. It is also one of the loudest. The two facts are inseparable. The same streets that make it feel alive at noon do not go quiet until after three on weekend nights.",
      thrives: [
        "Women who want walkability, independent shops, and an international community",
        "Anyone embedded in or wanting to build a creative or freelance network",
        "Lighter sleepers who already know how to apartment-hunt for quiet",
      ],
      struggles: [
        "Anyone whose nervous system needs genuine evening quiet",
        "People moving sight-unseen into the loud core blocks",
      ],
      rent: "€1,000 to €1,500 for a decent one-bedroom (2025)",
      metro: "Tribunal, Noviciado, San Bernardo, Bilbao (lines 1, 2, 4, 10)",
      mercado: "Mercado de San Ildefonso and nearby Mercado de Barceló",
      noiseLevel: "Lively to Loud",
      safety: "Generally safe with normal city awareness; the core feels busy enough at night that solo walking is not isolating.",
      insight: "The streets north of Fuencarral and west of San Bernardo are meaningfully quieter than the core of Malasaña and still walkable to everything. If Malasaña is your match but noise concerns you, look there first.",
    },
  },
  {
    name: "Chueca",
    noise: "lively",
    safety: "high",
    budget: "mid",
    budgetBands: ["mid", "high"],
    community: "expat",
    green: "no",
    tourist: "ok",
    walkability: "walk",
    mapsQuery: "Chueca, Madrid, Spain",
    shortDesc: "Central, welcoming, English-friendly, loud on the plaza side.",
    detail: {
      feel: "Chueca is one of the easiest neighborhoods in Madrid to land in as a newcomer. The social infrastructure is visible. The community is openly welcoming. The plaza is busy until late most nights, which is part of why it works for some people and is too much for others.",
      thrives: [
        "Women who want an English-speaking community within walking distance",
        "Solo arrivals who need to make social connections quickly",
        "Anyone who values inclusivity and visibility in their daily neighborhood",
        "People who want central restaurants and cafés as part of their routine",
      ],
      struggles: [
        "Anyone seeking quiet evenings without leaving home",
        "People hoping to escape tourist foot traffic along the main commercial streets",
      ],
      rent: "€1,100 to €1,700 for a decent one-bedroom (2025)",
      metro: "Chueca, Gran Vía, Banco de España (lines 2, 5)",
      mercado: "Mercado de San Antón, walkable from the whole neighborhood",
      noiseLevel: "Lively (Loud near the plaza on weekend nights)",
      safety: "One of the safer central neighborhoods at night thanks to consistent foot traffic.",
      insight: "Chueca has one of the strongest social networks for solo women over 50 new to Madrid. The events, language exchanges, and community spaces here are more accessible than in quieter residential neighborhoods, and that matters more in the first six months than most people expect.",
    },
  },
  {
    name: "Lavapiés",
    noise: "lively",
    safety: "mid",
    budget: "low",
    budgetBands: ["low", "mid"],
    community: "local",
    green: "nice",
    tourist: "ok",
    walkability: "walk",
    mapsQuery: "Lavapiés, Madrid, Spain",
    shortDesc: "Multicultural, textured, affordable, divides people sharply.",
    detail: {
      feel: "Lavapiés is the most genuinely multicultural neighborhood in Madrid. It is dense, layered, and unpolished in ways that some people find energizing and others find overwhelming. It is also the most affordable central option by a meaningful margin.",
      thrives: [
        "Women who have lived in dense, multicultural cities before",
        "Anyone drawn to independent food and arts infrastructure",
        "People prioritizing affordability without leaving central Madrid",
      ],
      struggles: [
        "Anyone whose safety priority is non-negotiable, particularly at night",
        "People with mobility concerns or anyone who underestimates the hill",
      ],
      rent: "€900 to €1,300 for a decent one-bedroom (2025)",
      metro: "Lavapiés, Embajadores, Tirso de Molina (lines 1, 3, 5)",
      mercado: "Mercado de San Fernando, a cultural anchor as much as a market",
      noiseLevel: "Lively to Loud",
      safety: "Improving but uneven. Requires honest self-assessment for solo women walking late.",
      insight: "The hill. Lavapiés is built on a steep incline that becomes a daily consideration for anyone with knees, joints, or simply a preference for not climbing to get home. Almost no guide mentions this because almost no guide writer has lived there long enough to care.",
    },
  },
  {
    name: "Almagro",
    noise: "quiet",
    safety: "high",
    budget: "high",
    budgetBands: ["high", "top"],
    community: "local",
    green: "nice",
    tourist: "avoid",
    walkability: "walk",
    mapsQuery: "Almagro, Madrid, Spain",
    shortDesc: "Some of the quietest central streets in the city. Formal, beautiful, calm.",
    detail: {
      feel: "Almagro feels like a Madrid that takes itself seriously in a quiet way. The streets are unusually calm for how central they are. The architecture is beautiful. The neighborhood does not perform for anyone.",
      thrives: [
        "Women who already have a social network in Madrid",
        "Anyone who values genuine residential calm in a central location",
        "People drawn to architecture, embassies, and a slower professional pace",
      ],
      struggles: [
        "Newcomers without a social foothold; the neighborhood will not generate it for you",
        "Anyone wanting casual neighborhood friendliness at every café",
      ],
      rent: "€1,500 to €2,200 for a decent one-bedroom (2025)",
      metro: "Alonso Martínez, Rubén Darío, Colón (lines 4, 5, 10)",
      mercado: "Adjacent to Chamberí's mercado options; few inside Almagro itself",
      noiseLevel: "Quiet",
      safety: "Very safe day and night.",
      insight: "Almagro is where many embassy families and senior professionals live, and that gives it a formality that is not unfriendly but is meaningfully different from the casual warmth of Chamberí two streets over.",
    },
  },
  {
    name: "Argüelles and Moncloa",
    noise: "moderate",
    safety: "high",
    budget: "mid",
    budgetBands: ["low", "mid"],
    community: "mix",
    green: "essential",
    tourist: "avoid",
    walkability: "walk",
    mapsQuery: "Argüelles, Madrid, Spain",
    shortDesc: "Exceptional green space, calmer than the core, strong value.",
    detail: {
      feel: "Argüelles and Moncloa sit next to two of the largest green spaces in Madrid and that shapes the entire feel of the area. Wide streets. Long walks. A neighborhood that breathes in a way the denser central barrios do not.",
      thrives: [
        "Anyone whose daily life requires real green space, not just plazas",
        "Walkers, runners, people building a routine around the outdoors",
        "Women who want quieter streets without sacrificing strong metro access",
      ],
      struggles: [
        "People expecting uniform quiet; the university area runs younger and louder",
        "Anyone hoping for dense independent café and shop infrastructure",
      ],
      rent: "€1,000 to €1,500 for a decent one-bedroom (2025)",
      metro: "Argüelles, Moncloa, Ventura Rodríguez (lines 3, 4, 6)",
      mercado: "Mercado de Argüelles and nearby options",
      noiseLevel: "Moderate (louder near the university)",
      safety: "Very safe.",
      insight: "The Teleférico over Casa de Campo is walkable from much of Argüelles. It is a small pleasure but the kind that quietly makes daily life feel like it is happening somewhere worth being.",
    },
  },
  {
    name: "Conde Duque",
    noise: "moderate",
    safety: "high",
    budget: "mid",
    budgetBands: ["mid", "high"],
    community: "mix",
    green: "no",
    tourist: "avoid",
    walkability: "walk",
    mapsQuery: "Conde Duque, Madrid, Spain",
    shortDesc: "Creative and walkable, calmer than Malasaña, anchored by real community.",
    detail: {
      feel: "Conde Duque is small, walkable, and quietly creative. It carries some of the same independent café and bookshop infrastructure as Malasaña without the same noise level. The Centro Cultural Conde Duque gives the neighborhood a real anchor.",
      thrives: [
        "Women drawn to creative and cultural infrastructure on a daily scale",
        "Anyone who wants a smaller neighborhood feel inside central Madrid",
        "People comfortable using the metro to expand their world beyond the immediate area",
      ],
      struggles: [
        "Anyone who needs constant novelty within walking distance",
        "People uncomfortable using the metro regularly",
      ],
      rent: "€1,100 to €1,600 for a decent one-bedroom (2025)",
      metro: "Noviciado, Plaza de España, San Bernardo, Ventura Rodríguez (lines 2, 3, 10)",
      mercado: "Mercado de los Mostenses nearby",
      noiseLevel: "Moderate",
      safety: "Safe day and night with normal central-city awareness.",
      insight: "Conde Duque has the highest concentration of women-led independent businesses of any neighborhood on this list, from cafés to bookshops to studios. For a woman building a new life in Madrid, that is not a trivial detail.",
    },
  },
  {
    name: "Ríos Rosas and Nueva España",
    noise: "quiet",
    safety: "high",
    budget: "low",
    budgetBands: ["low", "mid"],
    community: "local",
    green: "nice",
    tourist: "avoid",
    walkability: "mix",
    mapsQuery: "Ríos Rosas, Madrid, Spain",
    shortDesc: "Off the expat radar, locally rooted, strong value for the safety level.",
    detail: {
      feel: "Ríos Rosas and Nueva España are the kind of neighborhoods that quietly work. Locally rooted. Safe. Calm in the evenings. They do not show up on most expat radars, which is part of why they hold their character so well.",
      thrives: [
        "Women with functional Spanish or actively learning",
        "Anyone who wants to become a regular somewhere within their first month",
        "People who value genuine local rhythm over English-friendly infrastructure",
        "Renters who want strong value without leaving safe, calm central-ish Madrid",
      ],
      struggles: [
        "Anyone whose Spanish is minimal and who needs English support in daily life",
        "People who need walkable nightlife or dense café culture",
      ],
      rent: "€950 to €1,400 for a decent one-bedroom (2025)",
      metro: "Ríos Rosas, Nuevos Ministerios, Alvarado, Cuatro Caminos (lines 1, 6, 7, 10)",
      mercado: "Strong local mercado culture; Mercado de Vallehermoso walkable from parts of Ríos Rosas",
      noiseLevel: "Quiet",
      safety: "Very safe day and night.",
      insight: "This is where a meaningful number of long-term American expats end up after they have tried the more obvious neighborhoods and decided they actually want to live somewhere local. It is the quiet secret of Madrid expat life.",
    },
  },
];

// ------------------------------ Scoring ------------------------------

type Answers = Record<string, string>;

function scoreHood(h: Hood, a: Answers): number {
  let score = 0;

  // Noise (25)
  const noiseMap: Record<string, string> = { quiet: "quiet", moderate: "moderate", lively: "lively" };
  const wantedNoise = noiseMap[a.noise];
  if (h.noise === wantedNoise) score += 25;
  else if (
    (wantedNoise === "quiet" && h.noise === "moderate") ||
    (wantedNoise === "moderate" && (h.noise === "quiet" || h.noise === "lively")) ||
    (wantedNoise === "lively" && h.noise === "moderate")
  )
    score += 12;

  // Safety (20)
  if (a.safety === "high" && h.safety === "high") score += 20;
  else if (a.safety === "high" && h.safety === "mid") score += 6;
  else if (a.safety === "mid") score += h.safety === "high" ? 18 : 14;
  else if (a.safety === "low") score += h.safety === "high" ? 16 : 16;

  // Budget (20)
  if (h.budgetBands.includes(a.budget as any)) score += 20;
  else {
    const order = ["low", "mid", "high", "top"];
    const want = order.indexOf(a.budget);
    const closest = Math.min(...h.budgetBands.map((b) => Math.abs(order.indexOf(b) - want)));
    if (closest === 1) score += 8;
  }

  // Community (15)
  if (h.community === a.community) score += 15;
  else if (h.community === "mix" || a.community === "mix") score += 8;

  // Green (10)
  if (a.green === "essential") score += h.green === "essential" ? 10 : h.green === "nice" ? 5 : 0;
  else if (a.green === "nice") score += h.green === "no" ? 5 : 8;
  else score += 7;

  // Tourist (10)
  if (a.tourists === h.tourist) score += 10;
  else if (
    (a.tourists === "avoid" && h.tourist === "ok") ||
    (a.tourists === "ok" && (h.tourist === "avoid" || h.tourist === "fine")) ||
    (a.tourists === "fine" && h.tourist === "ok")
  )
    score += 5;

  // Small walkability nudge (not weighted heavily, just tie-breaker via transit/morning)
  if (a.transit === "walk" && h.walkability === "walk") score += 3;
  if ((a.morning === "walkable" || a.morning === "green_local") && h.walkability === "walk") score += 2;
  if (a.evening === "lively" && h.noise === "lively") score += 2;
  if (a.evening === "early" && h.noise === "quiet") score += 2;
  if (a.shopping === "local" && h.community === "local") score += 2;

  return score;
}

const MAX_SCORE = 100 + 9; // soft cap including nudges
function pct(score: number) {
  return Math.max(35, Math.min(98, Math.round((score / MAX_SCORE) * 100)));
}

// ------------------------------ Why-this-fits builder ------------------------------

function whyFits(h: Hood, a: Answers): string {
  const bits: string[] = [];
  if (a.noise === "quiet" && h.noise === "quiet") bits.push("you need real evening quiet");
  if (a.noise === "lively" && h.noise === "lively") bits.push("you want a neighborhood with energy at the door");
  if (a.safety === "high" && h.safety === "high") bits.push("safety walking alone at night is non-negotiable");
  if (a.transit === "walk" && h.walkability === "walk") bits.push("you want a fully walkable daily life");
  if (a.community === "local" && h.community === "local") bits.push("you want to integrate with local Spanish residents, not just observe");
  if (a.community === "expat" && h.community === "expat") bits.push("you want an English-speaking community within reach");
  if (a.green === "essential" && (h.green === "essential" || h.green === "nice")) bits.push("daily green space matters");
  if (a.tourists === "avoid" && h.tourist === "avoid") bits.push("you want distance from tourist infrastructure");
  if (h.budgetBands.includes(a.budget as any)) bits.push("the rent range fits your budget");

  const tail = bits.slice(0, 3).join(", ");
  return `You prioritized ${tail || "a balance of safety, walkability, and neighborhood character"}. ${h.name} delivers on those without asking you to compromise on the parts that matter most.`;
}

function loveBullets(h: Hood, a: Answers): string[] {
  const out: string[] = [];
  if (h.walkability === "walk") out.push("A daily life you can largely do on foot");
  if (h.noise === "quiet") out.push("Evenings calm enough to actually rest at home");
  if (h.noise === "lively") out.push("Street life that does not require you to go looking for it");
  if (h.community === "local") out.push("Becoming a regular somewhere within your first month");
  if (h.community === "expat") out.push("An English-speaking community within walking distance");
  if (h.green === "essential" || (h.green === "nice" && a.green === "essential")) out.push("Real green space inside your daily routine");
  if (h.safety === "high") out.push("Feeling safe walking home alone at night");
  if (a.shopping === "local") out.push("A genuine mercado you'll come back to weekly");
  if (a.tourists === "avoid" && h.tourist === "avoid") out.push("A neighborhood that is not built around visitors");
  // Take first 3 unique
  const seen = new Set<string>();
  return out.filter((x) => (seen.has(x) ? false : (seen.add(x), true))).slice(0, 3);
}

function caveat(h: Hood): string {
  return h.detail.struggles[0];
}

// ------------------------------ UI ------------------------------

const cardStyle: React.CSSProperties = {
  background: CARD_BG,
  borderLeft: `3px solid ${OLIVE}`,
  borderRadius: 12,
  boxShadow: "0 2px 10px rgba(28,28,28,0.06)",
  padding: 20,
};

const NeighborhoodMatcher = () => {
  const [step, setStep] = useState(0); // 0..9 quiz, 10 results
  const [answers, setAnswers] = useState<Answers>({});

  const onPick = (key: string, tag: string) => {
    const next = { ...answers, [key]: tag };
    setAnswers(next);
    setStep((s) => s + 1);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const reset = () => {
    setAnswers({});
    setStep(0);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const ranked = useMemo(() => {
    if (step < questions.length) return [];
    return hoods
      .map((h) => ({ h, s: scoreHood(h, answers) }))
      .sort((a, b) => b.s - a.s);
  }, [step, answers]);

  const top = ranked.slice(0, 2);
  const runners = ranked.slice(2, 4);

  return (
    <div style={{ minHeight: "100vh", background: BG, color: INK, fontFamily: body }}>
      <Seo
        title="Madrid Neighborhood Matcher | She Left the Chat"
        description="An honest, interactive quiz that matches you to a Madrid neighborhood based on how you actually want to live, not aesthetic preferences."
        path="/resources/neighborhood-matcher"
      />
      <Navbar />
      <main id="main-content" style={{ paddingTop: 110, paddingBottom: 80 }}>
        <div style={{ maxWidth: 740, margin: "0 auto", padding: "0 20px" }}>
          <Link
            to="/resources"
            style={{ color: OLIVE, fontSize: 14, textDecoration: "none", borderBottom: `1px solid ${OLIVE}` }}
          >
            ← Back to Resources
          </Link>

          {/* Header */}
          <header style={{ marginTop: 28, marginBottom: 32 }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>📍</div>
            <h1
              style={{
                fontFamily: display,
                fontWeight: 700,
                fontSize: 38,
                lineHeight: 1.15,
                margin: "0 0 12px",
              }}
            >
              Madrid Neighborhood Matcher
            </h1>
            <p style={{ fontSize: 17, lineHeight: 1.55, color: MUTED, margin: 0 }}>
              Not every neighborhood in Madrid is built for the life you are actually planning. Find yours.
            </p>
          </header>

          {step < questions.length ? (
            <QuizScreen
              step={step}
              q={questions[step]}
              onPick={onPick}
              onBack={() => setStep((s) => Math.max(0, s - 1))}
            />
          ) : (
            <ResultsScreen top={top} runners={runners} answers={answers} onReset={reset} />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

const QuizScreen = ({
  step,
  q,
  onPick,
  onBack,
}: {
  step: number;
  q: Question;
  onPick: (key: string, tag: string) => void;
  onBack: () => void;
}) => {
  const progress = ((step + 1) / questions.length) * 100;
  return (
    <section>
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 13, color: MUTED }}>
          <span>
            Question {step + 1} of {questions.length}
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div style={{ height: 6, background: "#E8E0CE", borderRadius: 999, overflow: "hidden" }}>
          <div style={{ width: `${progress}%`, height: "100%", background: OLIVE, transition: "width 0.3s ease" }} />
        </div>
      </div>

      <h2 style={{ fontFamily: display, fontSize: 24, lineHeight: 1.3, margin: "0 0 20px", fontWeight: 700 }}>
        {q.q}
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {q.choices.map((c) => (
          <button
            key={c.label}
            onClick={() => onPick(q.key, c.tag)}
            style={{
              ...cardStyle,
              textAlign: "left",
              cursor: "pointer",
              fontFamily: body,
              fontSize: 16,
              lineHeight: 1.5,
              color: INK,
              border: "none",
              borderLeft: `3px solid ${OLIVE}`,
              transition: "transform 0.15s ease, box-shadow 0.15s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 16px rgba(28,28,28,0.10)";
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 2px 10px rgba(28,28,28,0.06)";
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
            }}
          >
            {c.label}
          </button>
        ))}
      </div>

      {step > 0 && (
        <div style={{ marginTop: 20 }}>
          <button
            onClick={onBack}
            style={{ background: "none", border: "none", color: OLIVE, fontSize: 14, cursor: "pointer", padding: 0 }}
          >
            ← Back
          </button>
        </div>
      )}
    </section>
  );
};

const ResultsScreen = ({
  top,
  runners,
  answers,
  onReset,
}: {
  top: { h: Hood; s: number }[];
  runners: { h: Hood; s: number }[];
  answers: Answers;
  onReset: () => void;
}) => {
  const scrollToDetail = () => {
    const el = document.getElementById("hood-detail");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const topHood = top[0]?.h;

  return (
    <section>
      <h2 style={{ fontFamily: display, fontSize: 28, fontWeight: 700, margin: "0 0 8px" }}>
        Your Madrid Neighborhood Match
      </h2>
      <p style={{ color: MUTED, fontSize: 15, margin: "0 0 28px" }}>
        Based on how you actually want to live, not just what looks good in photos.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {top.map(({ h, s }, i) => (
          <article key={h.name} style={cardStyle}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
              <h3 style={{ fontFamily: display, fontSize: 24, fontWeight: 700, margin: 0 }}>
                {i === 0 ? "" : "Runner-up: "}
                {h.name}
              </h3>
              <span style={{ color: OLIVE, fontWeight: 600, fontSize: 16 }}>{pct(s)}% Match</span>
            </div>

            <p style={{ fontStyle: "italic", color: MUTED, fontSize: 15, margin: "12px 0 4px" }}>Why this fits you:</p>
            <p style={{ fontSize: 15.5, lineHeight: 1.6, margin: "0 0 16px" }}>{whyFits(h, answers)}</p>

            <p style={{ fontWeight: 600, fontSize: 14, margin: "0 0 8px" }}>What you will love</p>
            <ul style={{ paddingLeft: 20, margin: "0 0 16px", fontSize: 15, lineHeight: 1.6 }}>
              {loveBullets(h, answers).map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>

            <p style={{ fontWeight: 600, fontSize: 14, margin: "0 0 6px" }}>Be honest with yourself about</p>
            <p style={{ fontSize: 15, lineHeight: 1.6, margin: "0 0 14px", color: INK }}>{caveat(h)}.</p>

            <a
              href={`https://www.google.com/maps/search/${encodeURIComponent(h.mapsQuery)}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: OLIVE, fontSize: 14, textDecoration: "none", borderBottom: `1px solid ${OLIVE}` }}
            >
              See on map ↗
            </a>
          </article>
        ))}
      </div>

      {runners.length > 0 && (
        <div style={{ marginTop: 32 }}>
          <h3 style={{ fontFamily: display, fontSize: 18, fontWeight: 600, margin: "0 0 12px", color: MUTED }}>
            Also worth exploring
          </h3>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {runners.map(({ h }) => (
              <li key={h.name} style={{ fontSize: 15, lineHeight: 1.6, padding: "8px 0", borderBottom: `1px solid #E8E0CE` }}>
                <strong style={{ fontFamily: display, fontWeight: 700 }}>{h.name}</strong>
                <span style={{ color: MUTED }}> — {h.shortDesc}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div style={{ display: "flex", gap: 12, marginTop: 32, flexWrap: "wrap" }}>
        <button
          onClick={onReset}
          style={{
            background: "transparent",
            border: `1.5px solid ${OLIVE}`,
            color: OLIVE,
            padding: "12px 20px",
            borderRadius: 8,
            fontFamily: body,
            fontSize: 15,
            cursor: "pointer",
            fontWeight: 500,
          }}
        >
          Retake Quiz
        </button>
        <button
          onClick={scrollToDetail}
          style={{
            background: OLIVE,
            border: `1.5px solid ${OLIVE}`,
            color: "#FFF",
            padding: "12px 20px",
            borderRadius: 8,
            fontFamily: body,
            fontSize: 15,
            cursor: "pointer",
            fontWeight: 500,
          }}
        >
          Explore the Neighborhood
        </button>
      </div>

      {topHood && (
        <section id="hood-detail" style={{ marginTop: 56, scrollMarginTop: 100 }}>
          <h2 style={{ fontFamily: display, fontSize: 26, fontWeight: 700, margin: "0 0 20px" }}>
            A Closer Look at {topHood.name}
          </h2>

          <DetailBlock label="The feel" body={topHood.detail.feel} />

          <DetailList label="Who tends to do well here" items={topHood.detail.thrives} />
          <DetailList label="Who tends to struggle here" items={topHood.detail.struggles} />

          <div style={{ ...cardStyle, marginTop: 16 }}>
            <p style={{ fontWeight: 600, fontSize: 14, margin: "0 0 10px" }}>Practical notes</p>
            <ul style={{ paddingLeft: 18, margin: 0, fontSize: 15, lineHeight: 1.7 }}>
              <li><strong>Rent (1-bed, 2025):</strong> {topHood.detail.rent}</li>
              <li><strong>Metro:</strong> {topHood.detail.metro}</li>
              <li><strong>Mercado:</strong> {topHood.detail.mercado}</li>
              <li><strong>Noise level:</strong> {topHood.detail.noiseLevel}</li>
              <li><strong>Safety:</strong> {topHood.detail.safety}</li>
            </ul>
          </div>

          <div style={{ ...cardStyle, marginTop: 16 }}>
            <p style={{ fontWeight: 600, fontSize: 14, margin: "0 0 8px" }}>One thing I noticed that no guide mentions</p>
            <p style={{ fontSize: 15.5, lineHeight: 1.65, margin: 0, fontStyle: "italic", color: INK }}>
              {topHood.detail.insight}
            </p>
          </div>
        </section>
      )}
    </section>
  );
};

const DetailBlock = ({ label, body: text }: { label: string; body: string }) => (
  <div style={{ ...cardStyle, marginTop: 16 }}>
    <p style={{ fontWeight: 600, fontSize: 14, margin: "0 0 8px" }}>{label}</p>
    <p style={{ fontSize: 15.5, lineHeight: 1.65, margin: 0 }}>{text}</p>
  </div>
);

const DetailList = ({ label, items }: { label: string; items: string[] }) => (
  <div style={{ ...cardStyle, marginTop: 16 }}>
    <p style={{ fontWeight: 600, fontSize: 14, margin: "0 0 8px" }}>{label}</p>
    <ul style={{ paddingLeft: 18, margin: 0, fontSize: 15, lineHeight: 1.65 }}>
      {items.map((i) => (
        <li key={i}>{i}</li>
      ))}
    </ul>
  </div>
);

export default NeighborhoodMatcher;
