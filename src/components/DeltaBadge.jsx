import { C } from "../data/colors";
import { DELTA_SIGNIFICANCE_PP } from "../data/generated/_thresholds";

// Render a small "▲ +3.4" or "▼ -3.1" badge next to a live number.
//   delta      — numeric delta in percentage points (live - baseline)
//   inverted   — if true, an increase is "bad" (e.g. deal-killer rate)
//   muted      — if true, render gray regardless of magnitude (e.g. low n)
export default function DeltaBadge({ delta, inverted = false, muted = false }) {
  if (delta === null || delta === undefined || Number.isNaN(delta)) return null;

  const insignificant = Math.abs(delta) < DELTA_SIGNIFICANCE_PP;
  const goodDirection = inverted ? delta < 0 : delta > 0;

  const color =
    muted || insignificant
      ? C.textMuted
      : goodDirection
        ? C.won
        : C.lost;

  const arrow = delta > 0 ? "▲" : delta < 0 ? "▼" : "·";
  const sign = delta > 0 ? "+" : "";

  return (
    <span
      style={{
        color,
        fontSize: 11,
        fontWeight: 600,
        marginLeft: 6,
        whiteSpace: "nowrap",
      }}
    >
      {arrow} {sign}
      {delta.toFixed(1)}pp
    </span>
  );
}
