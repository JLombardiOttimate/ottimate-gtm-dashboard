import { C } from '../data/colors';

export default function Badge({ children, color = C.primary }) {
  return (
    <span style={{ background: `${color}22`, color, fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 99, letterSpacing: 0.3, textTransform: "uppercase", whiteSpace: "nowrap" }}>{children}</span>
  );
}
