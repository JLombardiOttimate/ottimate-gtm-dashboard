import { C } from './colors';

// ─── Champions ───
export const champScoreData = [
  { score: "0", won: 0, lost: 25, total: 25, winRate: 0 },
  { score: "1", won: 2, lost: 113, total: 115, winRate: 2 },
  { score: "2", won: 7, lost: 75, total: 82, winRate: 9 },
  { score: "3", won: 18, lost: 36, total: 54, winRate: 33 },
  { score: "4", won: 59, lost: 11, total: 70, winRate: 84 },
  { score: "5", won: 67, lost: 10, total: 77, winRate: 87 },
];

export const champRubric = [
  { score: 5, label: "Elite Champion", color: "#22c55e",
    desc: "Actively sold Ottimate internally without being asked. Gave direct EB access, shared internal politics and decision dynamics, coached rep on how to pitch stakeholders, created urgency or removed obstacles. This person treats the deal as their initiative.",
    example: '"When you talk to our CFO, lead with the month-end close impact — that\'s what keeps him up at night."' },
  { score: 4, label: "Strong Champion", color: "#84cc16",
    desc: "Advocated for Ottimate and drove the eval forward. Facilitated intros to stakeholders, shared budget situation and timeline pressures. The gap from a 5: EB access was limited or indirect.",
    example: '"I mentioned this to our COO and she said she\'d be open to a quick call next week."' },
  { score: 3, label: "Helpful Coordinator", color: "#f59e0b",
    desc: "Engaged and positive — scheduled calls, gathered data, shared documents. But no evidence they sold internally, shared political context, or brokered EB access. Likes the product, not putting their reputation on the line.",
    example: '"I\'ll send you the invoice volumes you asked for and set up the demo with my team."' },
  { score: 2, label: "Passive Contact", color: "#f97316",
    desc: "Showed up on calls but limited initiative. Didn't introduce other stakeholders, didn't provide access upward. May have expressed personal interest without organizational influence. AE drove all momentum.",
    example: '"Yeah, this looks interesting. Let me know what you need from me."' },
  { score: 1, label: "No Champion", color: "#ef4444",
    desc: "No one on the prospect side advocated for Ottimate. All momentum came from the AE or external factors. Contact may have gone silent mid-cycle.",
    example: "Radio silence after demo. AE doing all the pushing." },
  { score: 0, label: "Complete Absence", color: "#7f1d1d",
    desc: "No champion-like behavior whatsoever. Deal stalled after initial contact with zero internal traction.",
    example: "Single cold call → no follow-up → closed lost." },
];

export const champRolesByVertical = {
  Hospitality: {
    color: C.hospitality,
    avgWon: 4.24, avgLost: 1.74,
    roles: [
      { role: "Manager (GM / Club Mgr / Ops Mgr)", count: 31, note: "Most common — person managing day-to-day AP pain" },
      { role: "Accountant / Bookkeeper", count: 26, note: "Lives the manual process daily, strong internal advocate" },
      { role: "Controller", count: 21, note: "Owns pain and budget request — reliable champion" },
      { role: "Director (Finance / Ops)", count: 20, note: "Mid-cycle engager, validates fit" },
      { role: "CFO", count: 15, note: "Often doubles as champion and EB in smaller orgs" },
    ],
    insight: "In country clubs, the champion is typically whoever personally feels the paper-and-manual-entry pain — the Controller, GM, or Accountant. They need to be the one presenting to the Board or GM for budget approval."
  },
  Grocery: {
    color: C.retail,
    avgWon: 4.09, avgLost: 1.76,
    roles: [
      { role: "Controller", count: 5, note: "Dominant champion role — owns pain and budget case" },
      { role: "VP Finance", count: 2, note: "Acts on growth/scaling pain" },
      { role: "CFO", count: 2, note: "Both champion and EB in independent grocers" },
      { role: "CEO / President / Owner", count: 1, note: "In smaller chains, owner IS the decision — skip the middle" },
      { role: "AP Director", count: 1, note: "Operational champion, needs pairing with EB" },
    ],
    insight: "In independent grocery, the owner is often both champion and EB — there's no committee. In regional chains, the Controller builds the case and needs ammunition (ROI model, peer references) to sell to the owner."
  },
  Healthcare: {
    color: C.healthcare,
    avgWon: 4.29, avgLost: 1.86,
    roles: [
      { role: "Executive / EB (CFO, VP Finance)", count: 4, note: "Champions sit higher in healthcare orgs" },
      { role: "Controller", count: 2, note: "Pain owner, but PE/mgmt company adds layers above" },
      { role: "Finance Manager", count: 2, note: "Operational champion in multi-facility setups" },
      { role: "Accountant / Bookkeeper", count: 2, note: "Daily process owner" },
      { role: "IT / Systems", count: 1, note: "Gate-opener for integration; not a deal champion" },
    ],
    insight: "Healthcare champions tend to sit higher in the org chart. In PE-backed healthcare, the CFO at the management company level must approve — and they may not feel the AP pain at all. Map the approval chain immediately."
  },
};
