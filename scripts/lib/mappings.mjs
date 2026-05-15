// Slug → display-name maps for triggers and objection categories.
//
// The dashboard's frozen baseline uses long descriptive names. SAN's P3 pipeline
// (writer of deal_analyses rows in Supabase) uses short slugs. This module is the
// single source of truth for the translation. When the SAN prompt taxonomy
// changes, edit this file only.

// Supabase trigger slug → dashboard baseline trigger name.
// SAN slugs that should be IGNORED in aggregation: 'none_detected'.
export const TRIGGER_SLUG_TO_NAME = {
  staff_loss: "Staff Loss / AP Turnover",
  growth_event: "Growth Event (Acquisitions / New Locations)",
  audit_compliance: "Audit / Compliance Pressure",
  erp_migration: "ERP Migration / System Overhaul",
  month_end_breaking: "Month-End Close Pain",
  vendor_payment_friction: "Vendor Payment Friction / Margin Leakage",
  new_financial_leader: "New Financial Leader",
  frustration_current_solution: "Current Solution Frustration",
};

// Baseline trigger names that have no Supabase equivalent.
// These render a "Baseline only" pill when compare mode is on.
export const TRIGGERS_NOT_IN_LIVE = [
  "Paper/Manual Process (No Prior Automation)",
];

// Supabase objection category enum → dashboard baseline category name.
// Supabase has 8 coarse buckets; baseline has 11 detailed. Many baseline
// categories cannot be sourced from the coarse Supabase taxonomy.
export const OBJECTION_CATEGORY_TO_NAME = {
  technical: "Integration / System Compatibility",
  pricing: "Price / Cost / ROI Justification",
  timing: "Implementation / Timeline / Resource",
  authority: "Decision-Maker / Multi-Stakeholder",
  competition: "Competitive Evaluation",
  status_quo: "Incumbent Vendor / Current System",
  risk: "External Blockers (Audit/M&A/Regulatory)",
  // 'other' intentionally unmapped — counted into UNMAPPABLE_OBJECTIONS in the aggregator
};

// Baseline objection categories that have no Supabase counterpart.
// These render a "Baseline only — not in live taxonomy" pill.
export const OBJECTIONS_NOT_IN_LIVE = [
  "Uncertainty / Low Conviction",
  "Deflection / Stalling",
  "Feature Limitations / Capability Gaps",
  "Workflow Change / Team Adoption",
];

// Used by the aggregator to bucket Supabase 'other' / unknown rows
// separately from mapped categories, for reporting only.
export const UNMAPPABLE_OBJECTION_BUCKET = "other";

// Canonical vertical labels in the dashboard.
// Supabase may store variations ("Retail" vs "Grocery"); normalize via this map.
export const VERTICAL_NORMALIZE = {
  hospitality: "Hospitality",
  retail: "Grocery",
  grocery: "Grocery",
  healthcare: "Healthcare",
  // Other / Emerging Markets / CAS not surfaced in the dashboard (insufficient data)
};

// MEDDICC element keys as stored in Supabase top-level `meddicc` JSONB,
// mapped to dashboard element labels.
export const MEDDICC_KEY_TO_LABEL = {
  metrics: "Metrics",
  economic_buyer: "Economic Buyer",
  decision_criteria: "Decision Criteria",
  decision_process: "Decision Process",
  implicate_pain: "Implicate Pain",
  champion: "Champion",
  competition: "Competition",
};
