## Build: Cost of Living Calculator

No, it has not been built. There is no page, no route, and the Resources card (line 83) is a placeholder with no `live`/`button`/`href`, which is why no button renders. This plan builds it as a live-calculating tool (not a multi-step quiz), matching the existing tool pages.

### 1. New page: `src/pages/CostOfLivingCalculator.tsx`

A single page that updates results live as inputs change. It does both things you asked for in one screen: a category-by-category expense comparison (your city vs Madrid) and an income/purchasing-power read on what your salary buys in Madrid.

**Visual style** matches the sibling tools (PackingListBuilder / NeighborhoodMatcher):
- Tokens: `BG #FAF7F2`, `GOLD #8B7D3A`, `INK #1C1C1C`, `MUTED #5C544B`, `BORDER #E6E0D6`, `CARD #FFFFFF`
- Fonts: `serif = Georgia, serif`, `sans = Inter, sans-serif`
- Layout: `maxWidth: 820`, centered, `<Seo>`, "Back to Resources" link, print styles, Related Resources footer

**Layout:**

```
🧮  Cost of Living Calculator
Compare your current city to Madrid. See what your money actually buys.

[ SETUP CARD ]
  Who's coming?        [ Just me ] [ Couple ] [ Family ]      (segmented)
  Where to live?        [ 1BR, city centre ▾ ]                  (4 rent options)
  Monthly income        [ €  2500  ]   [ € | $ ] toggle          (after tax)

[ HEADLINE RESULT, live ]
  Living in Madrid would cost you about €X / month.
  Your income of €Y [covers it with €Z to spare / falls €Z short].
  Verdict pill:  comfortable / balanced / tight but workable / a real stretch
  Sub-line:  "Your income is [above / below] the Madrid average net salary of €2,201."

[ COMPARISON TABLE, live ]   Category | Madrid (default, editable) | Your city (input) | Difference
  Rent                 1,395        [ ____ ]        −...
  Groceries              250        [ ____ ]        −...
  Dining out            150        [ ____ ]        −...
  Transport              35        [ ____ ]        −...
  Utilities             169        [ ____ ]        −...
  Phone & internet       47        [ ____ ]        −...
  Fitness & health       43        [ ____ ]        −...
  Leisure & entertain.  60        [ ____ ]        −...
  Personal care          59        [ ____ ]        −...
  Childcare           (Family only) 627            [ ____ ]
  ────────────────────────────────────────────────
  TOTAL              €X            €Y            €(Y − X)   ←  positive = you save in Madrid

[ Print ] [ Start over ]     "Figures in euros. Last reviewed July 2026."
[ Related Resources: Move Abroad Roadmap, Madrid Neighborhood Matcher ]
```

- The **Madrid column** is prefilled with researched defaults (see data below) and is editable.
- The **Your city** column is empty inputs the user fills in.
- **Difference** = Your city − Madrid (positive = cheaper in Madrid, shown green-ish via the gold accent).
- The **headline** is income − Madrid total → surplus/deficit.
- Currency toggle (€/$) applies a fixed approx rate (1 EUR ≈ $1.08, labeled "approximate") to every displayed figure.

**Verdict logic** (surplus as % of Madrid monthly total):
- surplus ≥ 30% → "comfortable"
- 10–30% → "balanced"
- 0–10% → "tight but workable"
- deficit → "a real stretch" (and shows how much short per month)

### 2. Hardcoded Madrid figures (Numbeo, July 2026), household-adjusted

Source: numbeo.com/cost-of-living/in/Madrid (last update 25 July 2026). All EUR/month.

```
Category           Single  Couple  Family(4)
Groceries            250     400      700
Dining out           150     240      300
Transport             35      60      100
Utilities            169     185      220
Phone & internet     47      78      110
Fitness & health      43      86      100
Leisure               60     100      150
Personal care         59     120      200
Childcare              —       —      627   (per child, preschool; family only)
Subtotal (no rent)   ~813   ~1469    ~2907   ← matches Numbeo single €813 / family €2,920

Rent (user picks one):
  1BR city centre 1,395   1BR outside 1,058   3BR city centre 2,447   3BR outside 1,601

Madrid average net salary (after tax): €2,201/month  (reference insight only)
```

### 3. Wire the route

`src/App.tsx`:
- Import: `import CostOfLivingCalculator from "./pages/CostOfLivingCalculator";`
- Add route above the catch-all: `<Route path="/resources/cost-of-living-calculator" element={<CostOfLivingCalculator />} />`

### 4. Make the Resources card live

`src/pages/Resources.tsx` line 83 — add the props the built cards use:
```
{ emoji: "🧮", title: "Cost of Living Calculator", desc: "...",
  live: true, button: "RUN MY NUMBERS", href: "/resources/cost-of-living-calculator" },
```

### 5. Brand / copy rules (from project memory)
- No em dashes anywhere; use "to" and commas instead (e.g. "10 to 30%").
- Never use "expat" or "immigrant" in new copy; use "international residents" / "international".
- Match the tool-page aesthetic exactly (listed above).

### 6. Verification
- `tsgo` typecheck passes.
- Dev server: navigate to `/resources/cost-of-living-calculator`, confirm the page renders, inputs update the headline + table live, the Family toggle reveals the Childcare row, and the Print button triggers the print stylesheet.
- On `/resources`, confirm the card now shows the "RUN MY NUMBERS" button and links to the new page.
- Confirm the Timeline Builder's dangling references ("Use the Cost of Living Calculator at shelefthechat.com") now point to a tool that exists.
