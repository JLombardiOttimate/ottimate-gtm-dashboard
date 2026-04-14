// ─── Deal Execution Data ───
// Source: analysis/sales-process/Pricing_Timing_Analysis.md + meta_overall.md
// Dataset: 306 deals with pricing data; 455 deals total for loss archetypes

export const pricingGate = {
  reachedPricing: { deals: 189, winRate: 54.5, won: 103, lost: 86 },
  noPricing:      { deals: 117, winRate: 23.9, won: 28,  lost: 89 },
};

// Days from first contact to first pricing conversation
export const pricingTiming = [
  { window: "Same day (0d)",  days: "0",    deals: 24, winRate: 50.0 },
  { window: "1-7 days",       days: "1-7",  deals: 36, winRate: 50.0 },
  { window: "8-14 days",      days: "8-14", deals: 42, winRate: 61.9, sweet: true },
  { window: "15-30 days",     days: "15-30",deals: 35, winRate: 60.0 },
  { window: "31+ days",       days: "31+",  deals: 51, winRate: 49.0 },
];

// What milestone sequencing precedes pricing
export const pricingSequencing = [
  { label: "EB engaged before pricing",              deals: 83, winRate: 60.2 },
  { label: "EB engaged after pricing",               deals: 48, winRate: 47.9 },
  { label: "All 3 milestones first (discovery + demo + EB)", deals: 82, winRate: 61.0 },
  { label: "2 of 3 milestones",                      deals: 74, winRate: 48.6 },
];

// How deals die — 7 loss patterns from 297 closed-lost deals
export const lossArchetypes = [
  {
    name: "No Decision / Stalled",
    deals: 100, pctOfLosses: 33.7,
    preventable: "partial",
    desc: "Deal entered evaluation but never reached a decision. Buyer couldn't or wouldn't commit to a timeline.",
    fix: "Lock a decision timeline at every call. If they can't give you a date, you don't have a deal — you have a conversation.",
  },
  {
    name: "The Ghost",
    deals: 72, pctOfLosses: 24.2,
    preventable: "yes",
    desc: "Rep sent a proposal or completed a demo and never followed up. Deal died in silence.",
    fix: "3-day follow-up standard after every call. 72 deals lost to silence. Estimate: $2M+ in ARR lost to no-follow-up discipline.",
  },
  {
    name: "Single-Thread",
    deals: 45, pctOfLosses: 15.2,
    preventable: "yes",
    desc: "Deal ran entirely through one contact who had no authority to buy or couldn't build internal consensus.",
    fix: "Ask 'Who else needs to be involved?' in Call 1. Map all stakeholders by Call 2. Single-threading is a choice, not a circumstance.",
  },
  {
    name: "EB Never Met",
    deals: 39, pctOfLosses: 13.1,
    preventable: "yes",
    desc: "The economic buyer was identified but never engaged. Rep stayed at the operational layer throughout.",
    fix: "EB engagement is not optional. If you haven't met the EB by Call 4, raise a flag. The deal is already at risk.",
  },
  {
    name: "Product Gap",
    deals: 15, pctOfLosses: 5.1,
    preventable: "partial",
    desc: "Ottimate couldn't solve a hard technical requirement: PO matching, complex procurement workflows, deep ERP dependency.",
    fix: "Qualify harder in discovery. If procurement complexity, custom PO workflows, or multi-entity ERP dependencies surface in Call 1 — probe before demoing.",
  },
  {
    name: "Price Without Value",
    deals: 15, pctOfLosses: 5.1,
    preventable: "yes",
    desc: "Pricing was introduced before the buyer had conviction. Price objection dominated remaining calls.",
    fix: "See Objections tab. Price frequency is a conviction signal, not an affordability signal. Build value before you open the price conversation.",
  },
  {
    name: "Competitive Loss",
    deals: 7, pctOfLosses: 2.4,
    preventable: "partial",
    desc: "Prospect chose a named competitor after an active evaluation.",
    fix: "Win rate vs named competitors ranges 50-90%. The real competitor is status quo (10% WR). Ask 'What happens if you don't change anything?' before pitching.",
  },
];
