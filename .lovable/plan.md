### Objective
Revert the footer tagline change from the most recent update.

### Current State
- Footer tagline reads: "Real stories. Bold choices. Life in Madrid and beyond."
- This was changed in the June 3 update (prompt version with homepage/Resources/Stumbled Upon/Stories fixes).

### Previous State
- Footer tagline was: "Choosing myself, one country at a time."
- This tagline was originally added on April 26 and was in place until the June 3 update.

### Plan
1. Edit `src/components/Footer.tsx`
2. Replace the tagline on line 15 back to: "Choosing myself, one country at a time."
3. No other footer changes (navigation, layout, or styling) will be touched.

### Technical Details
- Single-line text replacement in one file.
- No routing, dependencies, or build changes required.