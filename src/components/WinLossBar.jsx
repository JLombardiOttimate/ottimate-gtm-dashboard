import { C } from '../data/colors';

export default function WinLossBar({ won, lost, height = 8 }) {
  const total = won + lost;
  const pct = total > 0 ? (won / total) * 100 : 0;
  return (
    <div style={{ display: "flex", borderRadius: 99, overflow: "hidden", height, background: C.lost + "44", width: "100%" }}>
      <div style={{ width: `${pct}%`, background: C.won, borderRadius: 99, transition: "width 0.5s" }} />
    </div>
  );
}
