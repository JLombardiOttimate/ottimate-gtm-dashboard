import { C } from "../data/colors";

const VARIANTS = {
  lowN: { label: "Low n", color: C.accent1, title: "Live bucket below minimum for a reliable comparison." },
  baselineOnly: {
    label: "Baseline only",
    color: C.textMuted,
    title: "No Supabase equivalent for this category.",
  },
  notInLive: {
    label: "Baseline only — not in live taxonomy",
    color: C.textMuted,
    title: "Live data is bucketed at a coarser level than the baseline category.",
  },
};

export default function LowNPill({ variant = "lowN" }) {
  const { label, color, title } = VARIANTS[variant] ?? VARIANTS.lowN;
  return (
    <span
      title={title}
      style={{
        display: "inline-block",
        padding: "2px 8px",
        borderRadius: 999,
        background: `${color}1a`,
        color,
        fontSize: 10,
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: 0.3,
        marginLeft: 8,
        verticalAlign: "middle",
      }}
    >
      {label}
    </span>
  );
}
