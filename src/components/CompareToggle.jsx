import { C } from "../data/colors";
import { useCompareMode } from "../hooks/useCompareMode";
import { MIN_N_GLOBAL } from "../data/generated/_thresholds";

function formatRefreshed(iso) {
  if (!iso) return "never refreshed";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "never refreshed";
  const diffMs = Date.now() - d.getTime();
  const hrs = Math.round(diffMs / (1000 * 60 * 60));
  if (hrs < 1) return "refreshed just now";
  if (hrs < 48) return `refreshed ${hrs}h ago`;
  const days = Math.round(hrs / 24);
  return `refreshed ${days}d ago`;
}

export default function CompareToggle() {
  const { enabled, on, toggle, cohort, reason } = useCompareMode();
  const tooltip = !enabled
    ? reason === "no_data"
      ? "Live cohort not refreshed yet. Run `npm run refresh-live`."
      : `Live cohort too small (n=${cohort?.n ?? 0}). Comparison enabled at n=${MIN_N_GLOBAL}.`
    : "Toggle off to view baseline only.";

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
      <button
        onClick={enabled ? toggle : undefined}
        title={tooltip}
        disabled={!enabled}
        style={{
          background: on ? `${C.primary}33` : C.card,
          border: `1px solid ${on ? C.primary : C.border}`,
          borderRadius: 999,
          color: enabled ? (on ? C.primaryLight : C.text) : C.textMuted,
          cursor: enabled ? "pointer" : "not-allowed",
          opacity: enabled ? 1 : 0.5,
          padding: "8px 14px",
          fontSize: 13,
          fontWeight: 600,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span
          style={{
            width: 28,
            height: 16,
            borderRadius: 999,
            background: on ? C.primary : C.border,
            position: "relative",
            transition: "background 0.2s",
          }}
        >
          <span
            style={{
              position: "absolute",
              top: 2,
              left: on ? 14 : 2,
              width: 12,
              height: 12,
              borderRadius: 999,
              background: C.text,
              transition: "left 0.2s",
            }}
          />
        </span>
        Compare to live cohort
      </button>
      {enabled && (
        <div style={{ color: C.textMuted, fontSize: 11 }}>
          Live n={cohort?.n ?? 0} · {formatRefreshed(cohort?.generated_at)}
        </div>
      )}
    </div>
  );
}
