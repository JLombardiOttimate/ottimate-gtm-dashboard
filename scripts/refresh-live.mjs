// Refresh the dashboard's live cohort JSON from Supabase.
//
// Usage:   npm run refresh-live
// Reads:   SUPABASE_URL + SUPABASE_ANON_KEY (or SUPABASE_SERVICE_ROLE_KEY) from
//          .env.local (loaded via the `--env-file` flag in package.json).
// Writes:  src/data/generated/{triggers,objections,champions,meddicc,cohort}.live.json
//
// Aggregation is pure JS in scripts/lib/aggregators.mjs. This file only handles
// I/O: fetching rows, writing files, printing a summary.

import { createClient } from "@supabase/supabase-js";
import { writeFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import {
  buildCohort,
  buildTriggers,
  buildObjections,
  buildChampions,
  buildMeddicc,
} from "./lib/aggregators.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, "..", "src", "data", "generated");
const PAGE_SIZE = 1000;

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error(
    "Missing SUPABASE_URL or SUPABASE_ANON_KEY (or SUPABASE_SERVICE_ROLE_KEY).\n" +
      "Copy .env.local.example to .env.local and fill in the values.",
  );
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { persistSession: false },
});

async function fetchAllDealAnalyses() {
  const rows = [];
  let from = 0;
  // Paginate by range — covers the case where the table grows past PAGE_SIZE.
  for (;;) {
    const { data, error } = await supabase
      .from("deal_analyses")
      .select(
        `
        outcome,
        vertical,
        close_date,
        sales_cycle_days,
        meddicc,
        frontmatter_json
      `,
      )
      .in("outcome", ["closed_won", "closed_lost"])
      .order("close_date", { ascending: false })
      .range(from, from + PAGE_SIZE - 1);

    if (error) {
      console.error("Supabase query failed:", error.message);
      process.exit(1);
    }
    if (!data || data.length === 0) break;
    rows.push(...data);
    if (data.length < PAGE_SIZE) break;
    from += PAGE_SIZE;
  }

  // Lift the JSONB fields off frontmatter_json so aggregators can read them
  // either directly (r.buying_trigger) or nested (r.frontmatter_json.buying_trigger).
  for (const r of rows) {
    const fm = r.frontmatter_json ?? {};
    r.buying_trigger = fm.buying_trigger ?? null;
    r.objections = fm.objections ?? null;
    r.champion = fm.champion ?? null;
  }

  return rows;
}

async function writeJson(name, payload) {
  const path = join(OUT_DIR, name);
  await writeFile(path, JSON.stringify(payload, null, 2) + "\n", "utf8");
  return path;
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  console.log("Fetching deal_analyses rows from Supabase...");
  const rows = await fetchAllDealAnalyses();
  console.log(`Pulled ${rows.length} closed deals.\n`);

  const cohort = buildCohort(rows);
  const triggers = buildTriggers(rows);
  const objections = buildObjections(rows);
  const champions = buildChampions(rows);
  const meddicc = buildMeddicc(rows);

  await Promise.all([
    writeJson("cohort.live.json", cohort),
    writeJson("triggers.live.json", triggers),
    writeJson("objections.live.json", objections),
    writeJson("champions.live.json", champions),
    writeJson("meddicc.live.json", meddicc),
  ]);

  // Summary table
  console.log("Wrote generated/*.live.json:");
  console.log(`  cohort       n=${cohort.n}  won=${cohort.outcome.won}  lost=${cohort.outcome.lost}`);
  console.log(
    `               range ${cohort.oldest_close_date ?? "—"} → ${cohort.newest_close_date ?? "—"}`,
  );
  console.log(
    `               verticals  H=${cohort.vertical.Hospitality}  G=${cohort.vertical.Grocery}  HC=${cohort.vertical.Healthcare}  Other=${cohort.vertical.Other}`,
  );
  console.log(`  triggers     items=${triggers.items.length}  unmappable=${Object.keys(triggers.unmappable).length}  unmapped_rows=${triggers.unmapped_rows}`);
  console.log(
    `  objections   items=${objections.items.length}  unmappable=${Object.keys(objections.unmappable).length}  with_objections=${objections.n_with_objections}  other_instances=${objections.other_category_instances}`,
  );
  console.log(`  champions    scored=${champions.n_with_score}  avgWon=${champions.avgWon ?? "—"}  avgLost=${champions.avgLost ?? "—"}`);
  console.log(`  meddicc      elements=${meddicc.overall.length}`);
  console.log("");
  console.log("Done. Run `npm run dev` to preview, or commit + push to deploy.");
}

main().catch((err) => {
  console.error("refresh-live failed:", err);
  process.exit(1);
});
