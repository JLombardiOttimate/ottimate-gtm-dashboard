import { useMemo } from "react";
import { MIN_N_PER_BUCKET } from "../data/generated/_thresholds";
import { useCompareMode } from "./useCompareMode";

// Thin lookup that wraps a per-domain live JSON payload (triggers / objections /
// champions / meddicc) and exposes:
//   active   — true if compare mode is on AND there is any data to show
//   live     — the raw payload (or null)
//   byName(name)  — returns the matching item or null, with coverage info
//   isUnmappable(name) — true if `name` is in the payload's `unmappable` map
//
// Panels call useLiveCohort(import('triggers.live.json')) once and then look up
// each baseline row by name.
export function useLiveCohort(payload) {
  const { on } = useCompareMode();

  return useMemo(() => {
    const active = on && payload && (payload.n ?? 0) > 0;
    const items = Array.isArray(payload?.items) ? payload.items : [];
    const byName = new Map(items.map((row) => [row.name, row]));
    const unmappable = payload?.unmappable ?? {};

    return {
      active,
      live: payload,
      byName(name) {
        const row = byName.get(name) ?? null;
        if (!row) return null;
        const n =
          row.dealCount ??
          row.deals ??
          row.total ??
          0;
        return {
          ...row,
          n,
          coverageOk: row.coverage_ok ?? n >= MIN_N_PER_BUCKET,
        };
      },
      isUnmappable(name) {
        return Object.prototype.hasOwnProperty.call(unmappable, name);
      },
      generatedAt: payload?.generated_at ?? null,
      total: payload?.n ?? 0,
    };
  }, [on, payload]);
}
