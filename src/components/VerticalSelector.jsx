import { C } from '../data/colors';

export default function VerticalSelector({ selected, onChange, all = false }) {
  const verts = [
    ...(all ? [{ id: "all", label: "All Verticals", color: C.primary }] : []),
    { id: "hospitality", label: "Hospitality", color: C.hospitality },
    { id: "grocery", label: "Grocery", color: C.retail },
    { id: "healthcare", label: "Healthcare", color: C.healthcare },
  ];
  return (
    <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
      {verts.map(v => (
        <button key={v.id} onClick={() => onChange(v.id)} style={{
          background: selected === v.id ? v.color + "22" : C.card,
          border: `1px solid ${selected === v.id ? v.color : C.border}`,
          borderRadius: 10, padding: "10px 18px", cursor: "pointer",
          color: selected === v.id ? v.color : C.textMuted, fontWeight: 600, fontSize: 14,
          transition: "all 0.2s",
        }}>
          {v.label}
        </button>
      ))}
    </div>
  );
}
