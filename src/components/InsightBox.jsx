import { Zap } from 'lucide-react';
import { C } from '../data/colors';

export default function InsightBox({ color, title, children }) {
  return (
    <div style={{ background: `linear-gradient(135deg, ${color}12, ${C.card})`, borderRadius: 12, padding: 20, border: `1px solid ${color}33`, marginBottom: 16 }}>
      <div style={{ color, fontSize: 13, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6, display: "flex", alignItems: "center", gap: 6 }}><Zap size={14} />{title}</div>
      <div style={{ color: C.text, fontSize: 14, lineHeight: 1.6 }}>{children}</div>
    </div>
  );
}
