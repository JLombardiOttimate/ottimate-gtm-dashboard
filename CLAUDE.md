# Ottimate GTM Intelligence Dashboard

## What This Is

An internal-only React dashboard that visualizes GTM intelligence extracted from analyzing 463 closed deals and 1,993 Gong call transcripts. It surfaces insights that can't be pulled from Salesforce: buying triggers, objection patterns, and champion strength analysis, broken down by vertical.

**This is NOT a Salesforce metrics dashboard.** It does not show win/loss rates, MRR, deal counts, or rep performance leaderboards. Those exist in Salesforce already. This shows the *why* behind deal outcomes.

## Tech Stack

- **React 18** + **Vite 5** (static site, no backend)
- **Recharts** for all visualizations
- **Lucide React** for icons
- **GitHub Pages** for hosting (auto-deploys from `main` via `.github/workflows/deploy.yml`)
- **Client-side password gate** (`src/PasswordGate.jsx`), not cryptographic, just keeps casual visitors out

## Project Structure

```
src/
  App.jsx              Root: wraps Dashboard in PasswordGate
  main.jsx             React entry point
  PasswordGate.jsx     Simple password prompt (password: ottimate2026)
  Dashboard.jsx        Tab shell; composes the per-tab panels
  components/          Shared UI: CompareToggle, DeltaBadge, LowNPill, Badge, InsightBox
  hooks/               useCompareMode, useLiveCohort
  tabs/                One file per tab (see "The Tabs" below)
  data/                Frozen baseline JS modules (triggers, objections, champions, verticals, execution, q1_2026, colors)
  data/generated/      Live cohort JSON pulled from Supabase, plus _thresholds.js
```

The original Dashboard.jsx single-file layout has been split: data into `src/data/`, shared UI into `src/components/`, per-tab panels into `src/tabs/`. Dashboard.jsx now imports those panels and renders the tab shell.

## The Tabs

1. **Overview** (`OverviewPanel.jsx`). Summary of the 3 insight areas (triggers, objections, champions) plus the cross-vertical EB-by-Call-3 finding.
2. **Verticals** (`VerticalsPanel.jsx`). Segment performance for Hospitality, Grocery, Healthcare only. Each shows segments, pain points, EB engagement patterns.
3. **Buying Triggers** (`TriggersPanel.jsx`). 9 validated triggers ranked by win rate, expandable with per-vertical breakdown, SDR target persona, and trigger combination analysis.
4. **Objections** (`ObjectionsPanel.jsx`). 11 categories (9 proven, 2 gaps) with overcoming strategies, deal killers, timing impact. Filterable by vertical.
5. **Champions** (`ChampionsPanel.jsx`). Score rubric (0-5) at top, then score-vs-outcome chart, then champion roles by vertical.
6. **Execution** (`ExecutionPanel.jsx`). Layer 3 (MEDDICC / Deal Execution) view: pricing gate, pricing timing and sequencing, loss archetypes. Renders a Live Cohort MEDDICC averages table when CompareToggle is on and live n is non-zero.

## Design Principles

- **Dark theme** (bg: #0f172a, cards: #1e293b)
- **Three verticals only**: Hospitality, Grocery, Healthcare. No Emerging Markets, no CAS/Other; insufficient data quality.
- **No T-numbers**. Always use full trigger names ("New Financial Leader", not "T7").
- **No Salesforce-available metrics**. No win rates as headline KPIs, no deal counts as primary stats, no rep performance tables.
- **Explain before showing**. Rubrics and definitions come BEFORE charts (see Champions tab).
- **Every insight needs context**. Don't just show a number, explain what it means and why it matters.

TODO(doc-keeper): src/tabs/Q1Panel.jsx surfaces "Q1 Deals", "Q1 Win Rate", "Lost-to-Won Ratio" KPI cards and a Retail vertical row. That conflicts with the "No Salesforce-available metrics" and "Three verticals only" principles above. Needs Joe's call on whether the principles change or the panel changes. Discovered 2026-05-19.

## Data Sources

All baseline data comes from analysis of Gong call transcripts organized in a separate project. Key source files:
- Buying triggers: `ottimate_buying_trigger_validation.md` (463 deals, 1993 calls)
- Champions: `champion_role_analysis.md` (423 deals scored)
- Objections: `Ottimate_Objection_Scorecard.md` (464 deals, ~17K objection instances)
- Verticals: Individual pipeline analysis files per vertical

The frozen baseline lives in `src/data/*.js` (handwritten JS modules). Do not edit these to add new deals. They represent the validated 463-deal closed corpus.

## Live cohort layer

In addition to the frozen baseline, the dashboard can overlay a live cohort pulled from the Supabase `deal_analyses` table (written by SAN's P3 pipeline, same table the `deal-intelligence-web` Flask app reads from).

**How it works:**
- `scripts/refresh-live.mjs` queries Supabase at build/local time, aggregates closed deals into per-domain JSON.
- Outputs land in `src/data/generated/*.live.json` (committed to git, which gives a free history of how live numbers evolve).
- Each panel imports both the frozen `*.js` baseline and the generated `*.live.json`. A header-level `<CompareToggle />` controls whether live numbers are displayed.
- Thresholds in `src/data/generated/_thresholds.js`: `MIN_N_GLOBAL = 20` disables the toggle below 20 live deals; `MIN_N_PER_BUCKET = 5` mutes individual buckets.

**Schema mismatches (intentional, surfaced in UI):**
- Triggers: 8 baseline names map 1:1 to SAN slugs. `Paper/Manual Process (No Prior Automation)` has no Supabase equivalent → rendered with `Baseline only` pill.
- Objections: SAN uses 8 coarse categories; baseline uses 11 detailed. 4 baseline categories (`Uncertainty / Low Conviction`, `Deflection / Stalling`, `Feature Limitations / Capability Gaps`, `Workflow Change / Team Adoption`) cannot be sourced from live data → rendered with `Baseline only — not in live taxonomy` pill.

Edit `scripts/lib/mappings.mjs` if the SAN prompt taxonomy changes.

**Refresh:**
- Local: `npm run refresh-live` (requires `.env.local`, copy `.env.local.example`). Required vars: `SUPABASE_URL`, `SUPABASE_ANON_KEY`. Optional fallback: `SUPABASE_SERVICE_ROLE_KEY` for the case where RLS blocks aggregate selects with the anon key. Service-role bypasses RLS and never ships to the browser bundle (the refresh script runs locally or in GitHub Actions only).
- Scheduled: `.github/workflows/refresh-live.yml` runs every Monday 9am ET. Commits any JSON changes to `main`, which triggers `deploy.yml`.

The five committed `*.live.json` outputs under `src/data/generated/` are: `triggers.live.json`, `objections.live.json`, `champions.live.json`, `meddicc.live.json`, `cohort.live.json`. Never edit these by hand.

## Commands

```bash
npm run dev           # Local dev server (http://localhost:5173)
npm run build         # Production build to dist/
npm run preview       # Preview production build locally
npm run refresh-live  # Pull the live cohort from Supabase into src/data/generated/*.live.json
```

## Deployment

Push to `main` → GitHub Actions builds → deploys to GitHub Pages automatically.

The `base` path in `vite.config.js` must match the repo name for GitHub Pages routing to work.

## Future Roadmap

- [x] Split Dashboard.jsx into separate tab components
- [x] Extract data into JSON files under src/data/
- [x] Add Layer 3 (MEDDICC / Deal Execution) tab once scoring is re-done
- [ ] Add Layer 4 (Rep Performance Patterns) tab
- [ ] Add search/filter across all tabs
- [ ] Add "export to PDF" for sharing individual sections
- [ ] Consider moving to a real auth solution if this goes beyond leadership review
