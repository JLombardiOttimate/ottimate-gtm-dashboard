// ─── Hospitality Vertical Execution Data ───
// Source: analysis/meta-analysis/meta_vertical_Hospitality.md (200 deals)
export const hospExecution = {
  cycle: { overall: 112, won: 78, lost: 144 },
  calls: { overall: 4.4, won: 4.7, lost: 4.1 },
  meddic: [
    { element: "Champion",        wonScore: 3.96, lostScore: 1.53, gap: 2.43 },
    { element: "Competition",     wonScore: 3.71, lostScore: 1.39, gap: 2.33 },
    { element: "Decision Process",wonScore: 3.95, lostScore: 1.65, gap: 2.30 },
    { element: "Economic Buyer",  wonScore: 4.16, lostScore: 2.01, gap: 2.15 },
  ],
  competitors: [
    { name: "BILL",     deals: 42 },
    { name: "Bill.com", deals: 33 },
    { name: "Concur",   deals: 19 },
    { name: "Sage",     deals: 18 },
  ],
  execInsight: "Champion is the #1 execution gap. Won deals score 3.96 on Champion; lost deals score 1.53 — a 2.4-point gap. Finding and qualifying a champion should be the explicit goal of Call 1. Pricing sequencing also matters here: 66.7% WR when EB is engaged before pricing, vs. 40.6% when pricing comes first.",
  cycleInsight: "Won deals close in 78 days. Lost deals drag to 144. If a Hospitality deal passes 90 days without EB engagement, reassess.",
};

// ─── Hospitality Segments ───
export const hospSegments = [
  { name: "Country Clubs", won: 55, lost: 52, winRate: 51, avgClose: "52d", note: "Strongest segment. Thin finance staff, paper-heavy, board audit pressure, TrueClub referral network." },
  { name: "Hotels / Multi-Property", won: 12, lost: 18, winRate: 40, avgClose: "95d", note: "Multi-threaded consensus needed. Intercompany allocations and property-level GL mapping scrutinized." },
  { name: "Restaurants / Multi-Unit", won: 10, lost: 16, winRate: 38, avgClose: "68d", note: "High-volume invoices (200-600/wk). Strong OCR accuracy and multi-entity GL mapping required." },
  { name: "Golf Clubs (Public)", won: 8, lost: 9, winRate: 47, avgClose: "45d", note: "Similar to country clubs with simpler governance. Fast movers." },
  { name: "Resorts / Casinos", won: 4, lost: 7, winRate: 36, avgClose: "78d", note: "PO matching gaps and complex procurement hurt fit. Proceed with caution." },
  { name: "Specialty (Coffee, Events)", won: 5, lost: 3, winRate: 63, avgClose: "55d", note: "Small sample but strong close rate when engaged." },
];

// ─── Grocery / Retail Vertical Execution Data ───
// Source: analysis/meta-analysis/meta_vertical_Retail.md (100 deals)
export const grocExecution = {
  cycle: { overall: 127, won: 89, lost: 146 },
  calls: { overall: 5.5, won: 6.0, lost: 5.2 },
  meddic: [
    { element: "Decision Process", wonScore: 3.66, lostScore: 1.40, gap: 2.25 },
    { element: "Champion",         wonScore: 3.79, lostScore: 1.71, gap: 2.08 },
    { element: "Economic Buyer",   wonScore: 4.10, lostScore: 2.18, gap: 1.92 },
    { element: "Decision Criteria",wonScore: 3.76, lostScore: 2.03, gap: 1.73 },
  ],
  competitors: [
    { name: "BILL",         deals: 24 },
    { name: "Bill.com",     deals: 22 },
    { name: "Sage",         deals: 16 },
    { name: "QuickBooks",   deals: 4  },
  ],
  execInsight: "Decision Process is the #1 execution gap. Won deals have a clear timeline and decision team mapped; lost deals don't. Retail also inverts the standard pricing playbook: EB after pricing closes at 69.2% vs. 42.9% when EB comes first — because the operational champion validates first and carries the business case up. Don't force the Hospitality sequencing.",
  cycleInsight: "Won deals close in 89 days. Lost deals drag to 146. The extra 57 days on losses often reflects a stalled decision process, not buyer interest.",
};

// ─── Grocery Segments ───
export const grocSegments = [
  { name: "Independent / Ethnic Grocery", won: 12, lost: 14, winRate: 46, avgClose: "45d", note: "Beachhead segment. 500-1500 invoices/month, skeleton AP staff, owner often directly involved." },
  { name: "Food Cooperatives", won: 5, lost: 3, winRate: 63, avgClose: "40d", note: "NCG-mandated QBD→QBO migration creates a natural buying window. Staff extremely overstretched." },
  { name: "Regional Chains (5-15 stores)", won: 6, lost: 10, winRate: 38, avgClose: "65d", note: "Strong technical fit but longer multi-stakeholder cycles. DSD receiving and vendor allowance complexity." },
  { name: "Specialty Food / Distribution", won: 4, lost: 8, winRate: 33, avgClose: "55d", note: "Moderate engagement. Integration complexity with niche systems." },
  { name: "Pharmacy", won: 0, lost: 5, winRate: 0, avgClose: "—", note: "Low invoice volumes make per-unit ROI hard to justify. Not a viable segment." },
  { name: "Non-Food Retail", won: 2, lost: 12, winRate: 14, avgClose: "—", note: "Curiosity without acute pain. Not a priority." },
];

// ─── Healthcare Vertical Execution Data ───
// Source: analysis/meta-analysis/meta_vertical_Healthcare.md (49 deals)
export const hcExecution = {
  cycle: { overall: 109, won: 46, lost: 141 },
  calls: { overall: 5.2, won: 6.2, lost: 4.7 },
  meddic: [
    { element: "Economic Buyer",   wonScore: 4.67, lostScore: 1.98, gap: 2.69 },
    { element: "Champion",         wonScore: 4.21, lostScore: 1.96, gap: 2.25 },
    { element: "Decision Process", wonScore: 4.11, lostScore: 2.00, gap: 2.11 },
    { element: "Implicate Pain",   wonScore: 4.54, lostScore: 2.70, gap: 1.85 },
  ],
  competitors: [
    { name: "Bill.com", deals: 18 },
    { name: "BILL",     deals: 14 },
    { name: "Coupa",    deals: 5  },
    { name: "Sage",     deals: 4  },
  ],
  execInsight: "EB is everything in Healthcare — the largest single-element gap in any vertical (2.69 points). Won deals score 4.67 on Economic Buyer; lost deals score 1.98. Without the EB, you're running demos into a void. Won deals also require more calls (6.2 vs. 4.7) — that's engagement depth, not drag. Healthcare wins take time; healthcare losses die fast.",
  cycleInsight: "Won deals close in just 46 days — fastest in any vertical. Lost deals drag to 141 days. If it's not moving by day 60, you likely don't have an EB.",
};

// ─── Healthcare Segments ───
export const hcSegments = [
  { name: "Senior Living / LTC", won: 7, lost: 12, winRate: 37, avgClose: "35d", note: "Strongest HC segment. Multi-facility, thin AP staff, CFO personally feels manual-process pain. Referral network active." },
  { name: "Dental / DSO", won: 3, lost: 5, winRate: 38, avgClose: "56d", note: "Growth-driven (15→45+ practices). Bill.com can't handle multi-location GL mapping — clear displacement opportunity." },
  { name: "Multi-Specialty Medical", won: 2, lost: 3, winRate: 40, avgClose: "64d", note: "Small sample. Allocation complexity is high but when handled, deals move." },
  { name: "Community Health Centers", won: 1, lost: 2, winRate: 33, avgClose: "22d", note: "Extreme complexity (17-way allocation splits) but fast close when product fits." },
  { name: "Hospice / Home Health", won: 0, lost: 3, winRate: 0, avgClose: "—", note: "Unique workflows Ottimate doesn't natively solve." },
];
