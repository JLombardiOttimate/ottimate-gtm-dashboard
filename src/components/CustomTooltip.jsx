import { C } from '../data/colors';

export default function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 14px", fontSize: 13 }}>
      <div style={{ color: C.text, fontWeight: 600, marginBottom: 4 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color || C.textMuted, display: "flex", gap: 8, alignItems: "center" }}>
          <span style={{ width: 8, height: 8, borderRadius: 99, background: p.color || C.primary, display: "inline-block" }} />
          {p.name}: <strong style={{ color: C.text }}>{typeof p.value === "number" ? (p.value % 1 === 0 ? p.value : p.value.toFixed(1)) : p.value}</strong>
        </div>
      ))}
    </div>
  );
}
