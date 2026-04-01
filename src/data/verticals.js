// ─── Hospitality Segments ───
export const hospSegments = [
  { name: "Country Clubs", won: 55, lost: 52, winRate: 51, avgClose: "52d", note: "Strongest segment. Thin finance staff, paper-heavy, board audit pressure, TrueClub referral network." },
  { name: "Hotels / Multi-Property", won: 12, lost: 18, winRate: 40, avgClose: "95d", note: "Multi-threaded consensus needed. Intercompany allocations and property-level GL mapping scrutinized." },
  { name: "Restaurants / Multi-Unit", won: 10, lost: 16, winRate: 38, avgClose: "68d", note: "High-volume invoices (200-600/wk). Strong OCR accuracy and multi-entity GL mapping required." },
  { name: "Golf Clubs (Public)", won: 8, lost: 9, winRate: 47, avgClose: "45d", note: "Similar to country clubs with simpler governance. Fast movers." },
  { name: "Resorts / Casinos", won: 4, lost: 7, winRate: 36, avgClose: "78d", note: "PO matching gaps and complex procurement hurt fit. Proceed with caution." },
  { name: "Specialty (Coffee, Events)", won: 5, lost: 3, winRate: 63, avgClose: "55d", note: "Small sample but strong close rate when engaged." },
];

// ─── Grocery Segments ───
export const grocSegments = [
  { name: "Independent / Ethnic Grocery", won: 12, lost: 14, winRate: 46, avgClose: "45d", note: "Beachhead segment. 500-1500 invoices/month, skeleton AP staff, owner often directly involved." },
  { name: "Food Cooperatives", won: 5, lost: 3, winRate: 63, avgClose: "40d", note: "NCG-mandated QBD→QBO migration creates a natural buying window. Staff extremely overstretched." },
  { name: "Regional Chains (5-15 stores)", won: 6, lost: 10, winRate: 38, avgClose: "65d", note: "Strong technical fit but longer multi-stakeholder cycles. DSD receiving and vendor allowance complexity." },
  { name: "Specialty Food / Distribution", won: 4, lost: 8, winRate: 33, avgClose: "55d", note: "Moderate engagement. Integration complexity with niche systems." },
  { name: "Pharmacy", won: 0, lost: 5, winRate: 0, avgClose: "—", note: "Low invoice volumes make per-unit ROI hard to justify. Not a viable segment." },
  { name: "Non-Food Retail", won: 2, lost: 12, winRate: 14, avgClose: "—", note: "Curiosity without acute pain. Not a priority." },
];

// ─── Healthcare Segments ───
export const hcSegments = [
  { name: "Senior Living / LTC", won: 7, lost: 12, winRate: 37, avgClose: "35d", note: "Strongest HC segment. Multi-facility, thin AP staff, CFO personally feels manual-process pain. Referral network active." },
  { name: "Dental / DSO", won: 3, lost: 5, winRate: 38, avgClose: "56d", note: "Growth-driven (15→45+ practices). Bill.com can't handle multi-location GL mapping — clear displacement opportunity." },
  { name: "Multi-Specialty Medical", won: 2, lost: 3, winRate: 40, avgClose: "64d", note: "Small sample. Allocation complexity is high but when handled, deals move." },
  { name: "Community Health Centers", won: 1, lost: 2, winRate: 33, avgClose: "22d", note: "Extreme complexity (17-way allocation splits) but fast close when product fits." },
  { name: "Hospice / Home Health", won: 0, lost: 3, winRate: 0, avgClose: "—", note: "Unique workflows Ottimate doesn't natively solve." },
];
