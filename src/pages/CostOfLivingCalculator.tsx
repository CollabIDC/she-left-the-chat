import { useMemo, useState, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import Seo from "@/components/Seo";

// ---- palette (matches sibling tool pages) ----
const BG = "#FAF7F2";
const GOLD = "#8B7D3A";
const INK = "#1C1C1C";
const MUTED = "#5C544B";
const FAINT = "#8A8078";
const CARD = "#FFFFFF";
const BORDER = "#E6E0D6";
const SAVE = "#6F7D3A"; // olive: cheaper in Madrid
const COST = "#9B3A2A"; // terracotta: more expensive in Madrid

const serif = "Georgia, 'Times New Roman', serif";
const sans = "Inter, system-ui, -apple-system, sans-serif";

type Household = "single" | "couple" | "family";
type HousingKey = "1br-centre" | "1br-out" | "3br-centre" | "3br-out";
type Currency = "EUR" | "USD";

type Cat = { key: string; label: string; sub?: string; familyOnly?: boolean };

const CATS: Cat[] = [
  { key: "groceries", label: "Groceries" },
  { key: "dining", label: "Dining out" },
  { key: "transport", label: "Transport" },
  { key: "utilities", label: "Utilities", sub: "Electricity, water, heating" },
  { key: "phone", label: "Phone & internet" },
  { key: "fitness", label: "Fitness & health" },
  { key: "leisure", label: "Leisure & entertainment" },
  { key: "personal", label: "Personal care & household" },
  { key: "childcare", label: "Childcare", sub: "Preschool, per child", familyOnly: true },
];

// Hardcoded Madrid figures (EUR/month). Source: Numbeo, Madrid, July 2026,
// adjusted for household size. Single excludes rent ≈ €813; family of four ≈ €2,920.
const MADRID: Record<Household, Record<string, number>> = {
  single: { groceries: 250, dining: 150, transport: 35, utilities: 169, phone: 47, fitness: 43, leisure: 60, personal: 59, childcare: 0 },
  couple: { groceries: 400, dining: 240, transport: 60, utilities: 185, phone: 78, fitness: 86, leisure: 100, personal: 120, childcare: 0 },
  family: { groceries: 700, dining: 300, transport: 100, utilities: 220, phone: 110, fitness: 100, leisure: 150, personal: 200, childcare: 627 },
};

const RENT: Record<HousingKey, number> = {
  "1br-centre": 1395,
  "1br-out": 1058,
  "3br-centre": 2447,
  "3br-out": 1601,
};

const HOUSING_OPTIONS: { key: HousingKey; label: string }[] = [
  { key: "1br-centre", label: "1BR, city centre" },
  { key: "1br-out", label: "1BR, outside centre" },
  { key: "3br-centre", label: "3BR, city centre" },
  { key: "3br-out", label: "3BR, outside centre" },
];

const DEFAULT_HOUSING: Record<Household, HousingKey> = {
  single: "1br-centre",
  couple: "1br-centre",
  family: "3br-centre",
};

const HOUSEHOLD_LABELS: Record<Household, string> = {
  single: "Just me",
  couple: "Couple",
  family: "Family",
};

const AVG_SALARY_EUR = 2201; // Madrid average net salary after tax
const EUR_TO_USD = 1.08; // approximate display rate

// ---- style helpers ----
const setupLabel: CSSProperties = {
  display: "block",
  fontFamily: sans,
  fontSize: 13,
  fontWeight: 600,
  color: MUTED,
  marginBottom: 8,
};

const inputBase: CSSProperties = {
  fontFamily: sans,
  fontSize: 16,
  color: INK,
  background: "#FBFAF7",
  border: `1px solid ${BORDER}`,
  borderRadius: 8,
  padding: "12px 14px",
  outline: "none",
  boxSizing: "border-box",
  width: "100%",
};

const relLink: CSSProperties = {
  background: CARD,
  borderLeft: `3px solid ${GOLD}`,
  borderRadius: 12,
  padding: 16,
  textDecoration: "none",
  color: INK,
  boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
};

function segStyle(active: boolean): CSSProperties {
  return {
    background: active ? GOLD : "transparent",
    color: active ? "#fff" : INK,
    border: `1px solid ${active ? GOLD : BORDER}`,
    padding: "10px 18px",
    borderRadius: 8,
    fontFamily: sans,
    fontWeight: 600,
    fontSize: 14,
    cursor: "pointer",
  };
}

function currStyle(active: boolean): CSSProperties {
  return {
    background: active ? INK : "transparent",
    color: active ? "#fff" : MUTED,
    border: "none",
    padding: "12px 16px",
    fontFamily: sans,
    fontWeight: 600,
    fontSize: 14,
    cursor: "pointer",
  };
}

function verdictPill(tone: "good" | "ok" | "tight" | "bad"): CSSProperties {
  const bg = tone === "good" ? "rgba(111,125,58,0.14)" : tone === "bad" ? "rgba(155,58,42,0.12)" : "rgba(139,125,58,0.14)";
  const color = tone === "good" ? SAVE : tone === "bad" ? COST : GOLD;
  return {
    display: "inline-block",
    background: bg,
    color,
    fontFamily: sans,
    fontWeight: 700,
    fontSize: 12,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    padding: "6px 12px",
    borderRadius: 999,
  };
}

function diffColor(diff: number): string {
  if (diff > 0) return SAVE; // your city costs more -> you save in Madrid
  if (diff < 0) return COST; // Madrid costs more
  return FAINT;
}

function diffText(diff: number, fmt: (n: number) => string): string {
  if (diff === 0) return "break even";
  if (diff > 0) return `save ${fmt(Math.abs(diff))}`;
  return `pay ${fmt(Math.abs(diff))} more`;
}

// ---- main component ----
export default function CostOfLivingCalculator() {
  const [household, setHousehold] = useState<Household>("single");
  const [housing, setHousing] = useState<HousingKey>("1br-centre");
  const [incomeEur, setIncomeEur] = useState<number>(0);
  const [currency, setCurrency] = useState<Currency>("EUR");
  const [overrides, setOverrides] = useState<Record<string, number>>({});
  const [yourCity, setYourCity] = useState<Record<string, number>>({});

  const visibleCats = useMemo(
    () => CATS.filter((c) => !c.familyOnly || household === "family"),
    [household]
  );

  const madridCat = (key: string) => overrides[key] ?? MADRID[household][key] ?? 0;
  const madridRent = RENT[housing];

  const madridTotal = useMemo(
    () => madridRent + visibleCats.reduce((s, c) => s + madridCat(c.key), 0),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [madridRent, visibleCats, overrides, household]
  );

  const yourTotal = useMemo(
    () => (yourCity.rent ?? 0) + visibleCats.reduce((s, c) => s + (yourCity[c.key] ?? 0), 0),
    [yourCity, visibleCats]
  );

  const surplus = incomeEur - madridTotal;

  const sym = currency === "USD" ? "$" : "€";
  const fmt = (eur: number) =>
    sym + Math.round((currency === "USD" ? eur * EUR_TO_USD : eur)).toLocaleString("en-US");

  const toDisplay = (eur: number) =>
    eur ? String(Math.round(currency === "USD" ? eur * EUR_TO_USD : eur)) : "";
  const fromDisplay = (val: string) => {
    const n = parseFloat(val);
    if (isNaN(n)) return 0;
    return currency === "USD" ? n / EUR_TO_USD : n;
  };

  // verdict
  let verdictTone: "good" | "ok" | "tight" | "bad" = "ok";
  let verdictLabel = "";
  if (incomeEur > 0) {
    if (surplus < 0) {
      verdictTone = "bad";
      verdictLabel = "A real stretch";
    } else {
      const pct = madridTotal > 0 ? surplus / madridTotal : 0;
      if (pct >= 0.3) {
        verdictTone = "good";
        verdictLabel = "Comfortable";
      } else if (pct >= 0.1) {
        verdictTone = "ok";
        verdictLabel = "Balanced";
      } else {
        verdictTone = "tight";
        verdictLabel = "Tight but workable";
      }
    }
  }

  const salaryNote =
    incomeEur > 0
      ? incomeEur >= AVG_SALARY_EUR
        ? `Your income is above the Madrid average net salary of €${AVG_SALARY_EUR.toLocaleString("en-US")}.`
        : `Your income is below the Madrid average net salary of €${AVG_SALARY_EUR.toLocaleString("en-US")}.`
      : "";

  function changeHousehold(h: Household) {
    setHousehold(h);
    setHousing(DEFAULT_HOUSING[h]);
    setOverrides({});
  }

  function startOver() {
    setHousehold("single");
    setHousing("1br-centre");
    setIncomeEur(0);
    setCurrency("EUR");
    setOverrides({});
    setYourCity({});
  }

  const housingLabel = HOUSING_OPTIONS.find((o) => o.key === housing)?.label ?? "";

  return (
    <div style={{ minHeight: "100vh", background: BG, color: INK }}>
      <Seo
        title="Madrid Cost of Living Calculator | She Left the Chat"
        description="Compare your current city to Madrid. Enter your income and spending and see what your money actually buys in Madrid, category by category."
        path="/resources/cost-of-living-calculator"
      />
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body, html { background: #fff !important; }
          .print-root { background: #fff !important; padding: 0 !important; }
          .print-card { box-shadow: none !important; }
        }
      `}</style>

      <div className="print-root" style={{ maxWidth: 820, margin: "0 auto", padding: "32px 20px 80px" }}>
        <div className="no-print" style={{ marginBottom: 24 }}>
          <Link to="/resources" style={{ fontFamily: sans, fontSize: 14, color: GOLD, textDecoration: "none", fontWeight: 500 }}>
            ← Back to Resources
          </Link>
        </div>

        {/* Header */}
        <header style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>🧮</div>
          <h1 style={{ fontFamily: serif, fontWeight: 700, fontSize: 36, lineHeight: 1.15, margin: "0 0 12px", color: INK }}>
            Cost of Living Calculator
          </h1>
          <p style={{ fontFamily: sans, fontSize: 16, color: MUTED, margin: 0, lineHeight: 1.5 }}>
            Compare your current city to Madrid. See what your money actually buys.
          </p>
        </header>

        {/* Setup card */}
        <div className="print-card" style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 12, padding: 24, marginBottom: 24, boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
          <div style={{ marginBottom: 20 }}>
            <label style={setupLabel}>Who's coming?</label>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {(["single", "couple", "family"] as Household[]).map((h) => (
                <button key={h} onClick={() => changeHousehold(h)} style={segStyle(household === h)}>
                  {HOUSEHOLD_LABELS[h]}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={setupLabel}>Where do you want to live?</label>
            <select
              value={housing}
              onChange={(e) => setHousing(e.target.value as HousingKey)}
              style={{ ...inputBase, cursor: "pointer", appearance: "none" }}
            >
              {HOUSING_OPTIONS.map((o) => (
                <option key={o.key} value={o.key}>
                  {o.label} (about {fmt(RENT[o.key])}/mo)
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={setupLabel}>Your monthly income, after tax</label>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "stretch" }}>
              <div style={{ position: "relative", flex: "1 1 220px" }}>
                <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontFamily: sans, fontSize: 16, color: FAINT, pointerEvents: "none" }}>{sym}</span>
                <input
                  type="number"
                  min={0}
                  value={toDisplay(incomeEur)}
                  onChange={(e) => setIncomeEur(fromDisplay(e.target.value))}
                  placeholder="0"
                  style={{ ...inputBase, paddingLeft: 30 }}
                />
              </div>
              <div style={{ display: "flex", border: `1px solid ${BORDER}`, borderRadius: 8, overflow: "hidden" }}>
                {(["EUR", "USD"] as Currency[]).map((c) => (
                  <button key={c} onClick={() => setCurrency(c)} style={currStyle(currency === c)}>
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Headline result */}
        <div className="print-card" style={{ background: CARD, borderLeft: `3px solid ${GOLD}`, borderRadius: 12, padding: 24, marginBottom: 28, boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
          <div style={{ fontFamily: sans, fontSize: 12, letterSpacing: "0.08em", color: FAINT, marginBottom: 8, textTransform: "uppercase" }}>
            What it costs to live in Madrid
          </div>
          <div style={{ fontFamily: serif, fontWeight: 700, fontSize: 30, color: INK, lineHeight: 1.2, marginBottom: 4 }}>
            About {fmt(madridTotal)} <span style={{ fontSize: 18, fontWeight: 400, color: MUTED }}>per month</span>
          </div>

          {incomeEur > 0 ? (
            <>
              <div style={{ fontFamily: sans, fontSize: 15, color: MUTED, lineHeight: 1.55, marginTop: 10 }}>
                {surplus >= 0
                  ? `Your income of ${fmt(incomeEur)} covers it with ${fmt(surplus)} to spare each month.`
                  : `Your income of ${fmt(incomeEur)} falls about ${fmt(Math.abs(surplus))} short each month.`}
              </div>
              <div style={{ marginTop: 14 }}>
                <span style={verdictPill(verdictTone)}>{verdictLabel}</span>
              </div>
            </>
          ) : (
            <div style={{ fontFamily: serif, fontStyle: "italic", fontSize: 15, color: MUTED, marginTop: 8 }}>
              Enter your income above to see what it buys in Madrid.
            </div>
          )}

          {salaryNote && (
            <div style={{ fontFamily: sans, fontSize: 13, color: FAINT, marginTop: 12 }}>{salaryNote}</div>
          )}
        </div>

        {/* Comparison */}
        <div className="print-card" style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 12, padding: 24, marginBottom: 24, boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
          <h2 style={{ fontFamily: serif, fontWeight: 700, fontSize: 22, margin: "0 0 4px", color: INK }}>
            Your city, side by side
          </h2>
          <p style={{ fontFamily: serif, fontStyle: "italic", fontSize: 14, color: MUTED, margin: "0 0 6px", lineHeight: 1.5 }}>
            Madrid figures are real, researched defaults. Adjust them if your situation differs, then enter your current costs to see the difference.
          </p>

          <div style={{ borderTop: `1px solid ${BORDER}`, marginTop: 16 }}>
            {/* Rent row */}
            <CompRow
              label="Rent"
              sub={housingLabel}
              madridReadOnly
              madridValue={fmt(madridRent)}
              yourDisplay={toDisplay(yourCity.rent ?? 0)}
              onYourChange={(v) => setYourCity((p) => ({ ...p, rent: fromDisplay(v) }))}
              diff={yourCity.rent ? yourCity.rent - madridRent : 0}
              fmt={fmt}
              sym={sym}
            />

            {visibleCats.map((c) => (
              <CompRow
                key={c.key}
                label={c.label}
                sub={c.sub}
                madridDisplay={toDisplay(madridCat(c.key))}
                onMadridChange={(v) => setOverrides((p) => ({ ...p, [c.key]: fromDisplay(v) }))}
                yourDisplay={toDisplay(yourCity[c.key] ?? 0)}
                onYourChange={(v) => setYourCity((p) => ({ ...p, [c.key]: fromDisplay(v) }))}
                diff={yourCity[c.key] ? yourCity[c.key] - madridCat(c.key) : 0}
                fmt={fmt}
                sym={sym}
              />
            ))}
          </div>

          {/* Total row */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap", borderTop: `2px solid ${BORDER}`, marginTop: 4, paddingTop: 16 }}>
            <div style={{ fontFamily: serif, fontWeight: 700, fontSize: 17, color: INK }}>Total / month</div>
            <div style={{ display: "flex", gap: 24, flexWrap: "wrap", alignItems: "center" }}>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontFamily: sans, fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: FAINT }}>Madrid</div>
                <div style={{ fontFamily: sans, fontWeight: 700, fontSize: 18, color: INK }}>{fmt(madridTotal)}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontFamily: sans, fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: FAINT }}>Your city</div>
                <div style={{ fontFamily: sans, fontWeight: 700, fontSize: 18, color: INK }}>{yourTotal ? fmt(yourTotal) : "—"}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontFamily: sans, fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: FAINT }}>In Madrid you'd</div>
                <div style={{ fontFamily: sans, fontWeight: 700, fontSize: 16, color: yourTotal ? diffColor(yourTotal - madridTotal) : FAINT }}>
                  {yourTotal ? diffText(yourTotal - madridTotal, fmt) : "—"}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="no-print" style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center", marginBottom: 8 }}>
          <button
            onClick={() => window.print()}
            style={{ background: GOLD, color: "#fff", border: "none", padding: "12px 20px", borderRadius: 8, fontFamily: sans, fontWeight: 600, fontSize: 14, cursor: "pointer" }}
          >
            Print this
          </button>
          <button
            onClick={startOver}
            style={{ background: "transparent", color: MUTED, border: `1px solid ${BORDER}`, padding: "11px 20px", borderRadius: 8, fontFamily: sans, fontWeight: 600, fontSize: 14, cursor: "pointer" }}
          >
            Start over
          </button>
        </div>
        <p style={{ fontFamily: serif, fontStyle: "italic", color: FAINT, fontSize: 13, margin: "10px 0 36px", lineHeight: 1.6 }}>
          Madrid figures are in euros, researched from Numbeo (July 2026) and adjusted for household size. USD shown at an approximate rate of 1 EUR ≈ $1.08. Last reviewed July 2026.
        </p>

        {/* Related */}
        <div className="no-print">
          <div style={{ height: 1, background: GOLD, opacity: 0.5, margin: "0 0 24px" }} />
          <h4 style={{ fontFamily: serif, fontWeight: 700, fontSize: 18, margin: "0 0 16px", color: INK }}>Related Resources</h4>
          <div style={{ display: "grid", gap: 12, gridTemplateColumns: "1fr" }}>
            <Link to="/resources" style={relLink}>
              <div style={{ fontFamily: serif, fontWeight: 700, fontSize: 16 }}>🗺️ Move Abroad Roadmap</div>
              <div style={{ fontFamily: sans, fontSize: 14, color: MUTED, marginTop: 4 }}>The step by step logistics guide.</div>
            </Link>
            <Link to="/resources/neighborhood-matcher" style={relLink}>
              <div style={{ fontFamily: serif, fontWeight: 700, fontSize: 16 }}>📍 Madrid Neighborhood Matcher</div>
              <div style={{ fontFamily: sans, fontSize: 14, color: MUTED, marginTop: 4 }}>Find the neighborhood that fits how you actually live.</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---- comparison row ----
function CompRow({
  label,
  sub,
  madridValue,
  madridDisplay,
  madridReadOnly,
  onMadridChange,
  yourDisplay,
  onYourChange,
  diff,
  fmt,
  sym,
}: {
  label: string;
  sub?: string;
  madridValue?: string;
  madridDisplay?: string;
  madridReadOnly?: boolean;
  onMadridChange?: (v: string) => void;
  yourDisplay: string;
  onYourChange: (v: string) => void;
  diff: number;
  fmt: (n: number) => string;
  sym: string;
}) {
  const moneyInput = (display: string, onChange: (v: string) => void) => (
    <div style={{ position: "relative" }}>
      <span style={{ position: "absolute", left: 9, top: "50%", transform: "translateY(-50%)", fontSize: 13, color: FAINT, pointerEvents: "none" }}>{sym}</span>
      <input
        type="number"
        min={0}
        value={display}
        onChange={(e) => onChange(e.target.value)}
        placeholder="0"
        style={{ ...inputBase, paddingLeft: 24, padding: "9px 10px 9px 24px", fontSize: 14 }}
      />
    </div>
  );

  return (
    <div style={{ borderBottom: `1px solid ${BORDER}`, padding: "14px 0" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 160px" }}>
          <div style={{ fontFamily: serif, fontWeight: 700, fontSize: 15, color: INK, lineHeight: 1.2 }}>{label}</div>
          {sub && <div style={{ fontFamily: sans, fontSize: 11, color: FAINT, marginTop: 2, lineHeight: 1.3 }}>{sub}</div>}
        </div>
        <div style={{ fontFamily: sans, fontSize: 13, fontWeight: 600, textAlign: "right", color: diff !== 0 ? diffColor(diff) : FAINT, minWidth: 90 }}>
          {diff !== 0 ? `In Madrid you'd ${diffText(diff, fmt)}` : "—"}
        </div>
      </div>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 12 }}>
        <div style={{ flex: "1 1 140px", minWidth: 120 }}>
          <div style={{ fontFamily: sans, fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: FAINT, marginBottom: 5 }}>Madrid</div>
          {madridReadOnly ? (
            <div style={{ ...inputBase, padding: "9px 10px", fontSize: 14, fontWeight: 600, background: "#F3EFE7", color: INK }}>{madridValue}</div>
          ) : (
            moneyInput(madridDisplay ?? "", onMadridChange ?? (() => {}))
          )}
        </div>
        <div style={{ flex: "1 1 140px", minWidth: 120 }}>
          <div style={{ fontFamily: sans, fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: FAINT, marginBottom: 5 }}>Your city</div>
          {moneyInput(yourDisplay, onYourChange)}
        </div>
      </div>
    </div>
  );
}
