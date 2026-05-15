// Pure aggregation functions: take raw deal_analyses rows, return dashboard-shaped
// JSON. No Supabase client here, no I/O — that lets the aggregation logic be
// inspected and (later) unit-tested with fixture rows.
//
// Each builder mirrors the shape of its frozen counterpart in src/data/*.js so
// the panel components can render either with the same chart code.

import {
  TRIGGER_SLUG_TO_NAME,
  TRIGGERS_NOT_IN_LIVE,
  OBJECTION_CATEGORY_TO_NAME,
  OBJECTIONS_NOT_IN_LIVE,
  UNMAPPABLE_OBJECTION_BUCKET,
  VERTICAL_NORMALIZE,
  MEDDICC_KEY_TO_LABEL,
} from "./mappings.mjs";

// Per-bucket minimum — duplicated from src/data/generated/_thresholds.js so the
// script can flag coverage at write time. The UI also re-checks these values
// against the same thresholds module at render time.
const MIN_N_PER_BUCKET = 5;

const round = (n, places = 1) => {
  if (n === null || n === undefined || Number.isNaN(n)) return null;
  const f = 10 ** places;
  return Math.round(n * f) / f;
};

const pct = (numerator, denominator) =>
  denominator === 0 ? null : round((numerator / denominator) * 100, 1);

const normVertical = (raw) => {
  if (!raw) return null;
  const key = String(raw).toLowerCase();
  return VERTICAL_NORMALIZE[key] ?? null;
};

const isWon = (row) => row.outcome === "closed_won";
const isLost = (row) => row.outcome === "closed_lost";

// ─────────────────────────────────────────────────────────────────────────────
// Cohort metadata — n, outcome breakdown, vertical breakdown, date range
// ─────────────────────────────────────────────────────────────────────────────
export function buildCohort(rows) {
  const closeDates = rows
    .map((r) => r.close_date)
    .filter(Boolean)
    .sort();

  const outcome = { won: 0, lost: 0 };
  const vertical = { Hospitality: 0, Grocery: 0, Healthcare: 0, Other: 0 };

  for (const r of rows) {
    if (isWon(r)) outcome.won += 1;
    else if (isLost(r)) outcome.lost += 1;
    const v = normVertical(r.vertical);
    if (v && vertical[v] !== undefined) vertical[v] += 1;
    else vertical.Other += 1;
  }

  return {
    n: rows.length,
    generated_at: new Date().toISOString(),
    outcome,
    vertical,
    oldest_close_date: closeDates[0] ?? null,
    newest_close_date: closeDates[closeDates.length - 1] ?? null,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Triggers — primary_trigger per deal, per-vertical win rates
// Shape mirrors src/data/triggers.js `triggers` array.
// ─────────────────────────────────────────────────────────────────────────────
export function buildTriggers(rows) {
  // Initialize buckets for every mapped trigger name
  const buckets = {};
  for (const name of Object.values(TRIGGER_SLUG_TO_NAME)) {
    buckets[name] = freshTriggerBucket();
  }

  let unmappedRows = 0;

  for (const r of rows) {
    const trigger = r.buying_trigger ?? r.frontmatter_json?.buying_trigger;
    const slug = trigger?.primary_trigger;
    if (!slug || slug === "none_detected") continue;

    const name = TRIGGER_SLUG_TO_NAME[slug];
    if (!name) {
      unmappedRows += 1;
      continue;
    }

    const v = normVertical(r.vertical);
    const won = isWon(r);
    const lost = isLost(r);

    buckets[name].deals += 1;
    if (won) buckets[name].won += 1;

    if (v === "Hospitality") {
      buckets[name].hospDeals += 1;
      if (won) buckets[name].hospWon += 1;
    } else if (v === "Grocery") {
      buckets[name].grocDeals += 1;
      if (won) buckets[name].grocWon += 1;
    } else if (v === "Healthcare") {
      buckets[name].hcDeals += 1;
      if (won) buckets[name].hcWon += 1;
    }
  }

  const items = Object.entries(buckets).map(([name, b]) => ({
    name,
    deals: b.deals,
    winRate: pct(b.won, b.deals),
    hospDeals: b.hospDeals,
    hospWin: b.hospDeals >= MIN_N_PER_BUCKET ? pct(b.hospWon, b.hospDeals) : null,
    grocDeals: b.grocDeals,
    grocWin: b.grocDeals >= MIN_N_PER_BUCKET ? pct(b.grocWon, b.grocDeals) : null,
    hcDeals: b.hcDeals,
    hcWin: b.hcDeals >= MIN_N_PER_BUCKET ? pct(b.hcWon, b.hcDeals) : null,
    coverage_ok: b.deals >= MIN_N_PER_BUCKET,
  }));

  const unmappable = {};
  for (const name of TRIGGERS_NOT_IN_LIVE) {
    unmappable[name] = "no_supabase_equivalent";
  }

  return {
    n: rows.length,
    generated_at: new Date().toISOString(),
    items,
    unmappable,
    unmapped_rows: unmappedRows,
  };
}

const freshTriggerBucket = () => ({
  deals: 0,
  won: 0,
  hospDeals: 0,
  hospWon: 0,
  grocDeals: 0,
  grocWon: 0,
  hcDeals: 0,
  hcWon: 0,
});

// ─────────────────────────────────────────────────────────────────────────────
// Objections — by category, deals-affected and win-when-overcome
// Shape mirrors src/data/objections.js `objCategories` array.
// "Overcome" is approximated from the SAN handling enum:
//   addressed_with_evidence | escalated  → counts as overcome
//   deflected | unaddressed | other      → counts as not overcome
// ─────────────────────────────────────────────────────────────────────────────
const OVERCOME_HANDLING = new Set(["addressed_with_evidence", "escalated"]);

export function buildObjections(rows) {
  const buckets = {};
  for (const name of Object.values(OBJECTION_CATEGORY_TO_NAME)) {
    buckets[name] = freshObjectionBucket();
  }

  let otherCategoryCount = 0;
  let rowsWithAnyObjection = 0;

  for (const r of rows) {
    const objs = r.objections ?? r.frontmatter_json?.objections;
    const list = Array.isArray(objs?.objection_detail) ? objs.objection_detail : [];
    if (list.length === 0) continue;
    rowsWithAnyObjection += 1;

    const v = normVertical(r.vertical);
    const won = isWon(r);

    // Track which baseline categories were affected for this single deal,
    // so dealCount counts deals-affected (not raw objection instances).
    const dealCategoriesSeen = new Set();
    // Track whether at least one objection in each category was overcome
    const overcomeCategoriesSeen = new Set();

    for (const o of list) {
      const cat = o?.category;
      if (cat === UNMAPPABLE_OBJECTION_BUCKET) {
        otherCategoryCount += 1;
        continue;
      }
      const name = OBJECTION_CATEGORY_TO_NAME[cat];
      if (!name) continue;
      dealCategoriesSeen.add(name);
      if (OVERCOME_HANDLING.has(o?.handling)) {
        overcomeCategoriesSeen.add(name);
      }
    }

    for (const name of dealCategoriesSeen) {
      const b = buckets[name];
      b.dealsAffected += 1;
      if (won) b.dealsWon += 1;

      const overcame = overcomeCategoriesSeen.has(name);
      if (overcame) {
        b.dealsOvercame += 1;
        if (won) b.dealsOvercameAndWon += 1;
      }

      if (v === "Hospitality") b.hosp += 1;
      else if (v === "Grocery") b.groc += 1;
      else if (v === "Healthcare") b.hc += 1;
    }
  }

  const items = Object.entries(buckets).map(([name, b]) => {
    const pctOfDeals = pct(b.dealsAffected, rowsWithAnyObjection);
    return {
      name,
      pct: pctOfDeals,
      dealCount: b.dealsAffected,
      winWhenOvercome:
        b.dealsOvercame >= MIN_N_PER_BUCKET
          ? pct(b.dealsOvercameAndWon, b.dealsOvercame)
          : null,
      hospPct: pct(b.hosp, rowsWithAnyObjection),
      grocPct: pct(b.groc, rowsWithAnyObjection),
      hcPct: pct(b.hc, rowsWithAnyObjection),
      coverage_ok: b.dealsAffected >= MIN_N_PER_BUCKET,
    };
  });

  const unmappable = {};
  for (const name of OBJECTIONS_NOT_IN_LIVE) {
    unmappable[name] = "not_in_live_taxonomy";
  }

  return {
    n: rows.length,
    n_with_objections: rowsWithAnyObjection,
    generated_at: new Date().toISOString(),
    items,
    unmappable,
    other_category_instances: otherCategoryCount,
  };
}

const freshObjectionBucket = () => ({
  dealsAffected: 0,
  dealsWon: 0,
  dealsOvercame: 0,
  dealsOvercameAndWon: 0,
  hosp: 0,
  groc: 0,
  hc: 0,
});

// ─────────────────────────────────────────────────────────────────────────────
// Champions — score distribution + won/lost averages
// Shape mirrors src/data/champions.js `champScoreData` + average fields.
// ─────────────────────────────────────────────────────────────────────────────
export function buildChampions(rows) {
  const scoreBuckets = {};
  for (let s = 0; s <= 5; s += 1) {
    scoreBuckets[s] = { won: 0, lost: 0, total: 0 };
  }

  let wonScoreSum = 0;
  let wonScoreCount = 0;
  let lostScoreSum = 0;
  let lostScoreCount = 0;

  for (const r of rows) {
    const champion = r.champion ?? r.frontmatter_json?.champion;
    const strengthRaw = champion?.strength;
    if (strengthRaw === undefined || strengthRaw === null) continue;
    const score = Math.max(0, Math.min(5, Math.round(Number(strengthRaw))));
    if (Number.isNaN(score)) continue;

    scoreBuckets[score].total += 1;
    if (isWon(r)) {
      scoreBuckets[score].won += 1;
      wonScoreSum += score;
      wonScoreCount += 1;
    } else if (isLost(r)) {
      scoreBuckets[score].lost += 1;
      lostScoreSum += score;
      lostScoreCount += 1;
    }
  }

  const scoreData = Object.entries(scoreBuckets).map(([score, b]) => ({
    score: String(score),
    won: b.won,
    lost: b.lost,
    total: b.total,
    winRate: pct(b.won, b.total),
    coverage_ok: b.total >= MIN_N_PER_BUCKET,
  }));

  return {
    n: rows.length,
    n_with_score: wonScoreCount + lostScoreCount,
    generated_at: new Date().toISOString(),
    scoreData,
    avgWon: wonScoreCount > 0 ? round(wonScoreSum / wonScoreCount, 2) : null,
    avgLost: lostScoreCount > 0 ? round(lostScoreSum / lostScoreCount, 2) : null,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// MEDDICC — per-element average for won vs lost, with gap.
// Shape mirrors the `meddic` arrays in src/data/verticals.js (per-vertical) and
// adds an `overall` array for the ExecutionPanel.
// ─────────────────────────────────────────────────────────────────────────────
export function buildMeddicc(rows) {
  const elementSums = {};
  for (const key of Object.keys(MEDDICC_KEY_TO_LABEL)) {
    elementSums[key] = { wonSum: 0, wonN: 0, lostSum: 0, lostN: 0 };
  }

  for (const r of rows) {
    const m = r.meddicc ?? r.frontmatter_json?.meddicc;
    if (!m) continue;
    const won = isWon(r);
    const lost = isLost(r);
    if (!won && !lost) continue;

    for (const key of Object.keys(MEDDICC_KEY_TO_LABEL)) {
      const raw = m[key];
      if (raw === undefined || raw === null) continue;
      const v = Number(raw);
      if (Number.isNaN(v)) continue;
      if (won) {
        elementSums[key].wonSum += v;
        elementSums[key].wonN += 1;
      } else {
        elementSums[key].lostSum += v;
        elementSums[key].lostN += 1;
      }
    }
  }

  const overall = Object.entries(MEDDICC_KEY_TO_LABEL).map(([key, label]) => {
    const s = elementSums[key];
    const wonScore = s.wonN > 0 ? round(s.wonSum / s.wonN, 2) : null;
    const lostScore = s.lostN > 0 ? round(s.lostSum / s.lostN, 2) : null;
    return {
      element: label,
      wonScore,
      lostScore,
      gap: wonScore !== null && lostScore !== null ? round(wonScore - lostScore, 2) : null,
      coverage_ok:
        s.wonN >= MIN_N_PER_BUCKET && s.lostN >= MIN_N_PER_BUCKET,
    };
  });

  return {
    n: rows.length,
    generated_at: new Date().toISOString(),
    overall,
  };
}
