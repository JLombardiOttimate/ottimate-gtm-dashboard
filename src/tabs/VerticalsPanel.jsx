import { useState } from "react";
import { C } from '../data/colors';
import { hospSegments, grocSegments, hcSegments } from '../data/verticals';
import Badge from '../components/Badge';
import WinLossBar from '../components/WinLossBar';
import InsightBox from '../components/InsightBox';
import VerticalSelector from '../components/VerticalSelector';

export default function VerticalsPanel() {
  const [vert, setVert] = useState("hospitality");

  const config = {
    hospitality: { label: "Hospitality", color: C.hospitality, segments: hospSegments,
      beachhead: "Country Clubs / Private Clubs",
      keyInsight: "Country clubs are the beachhead: fastest close cycles, natural referral networks between club professionals, and the TrueClub partnership discount accelerates pricing. Economic buyer (CFO/GM) engagement by Call 3 is present in ~80% of wins.",
      ebWon: 80, ebLost: 18, ebNever: 58,
      topPain: ["Manual invoice entry and GL coding (90%+ of deals)", "Approval workflow bottlenecks (seasonal crunch)", "Statement reconciliation and month-end close burden", "Check fraud and payment security concerns"],
    },
    grocery: { label: "Grocery", color: C.retail, segments: grocSegments,
      beachhead: "Independent / Ethnic Grocery (2-10 stores)",
      keyInsight: "Independent grocers are the beachhead: 500-1500 invoices/month, skeleton AP staff, owner often personally involved in check runs. Food Coops have a built-in urgency trigger: NCG-mandated QuickBooks Desktop→Online migration forces a system rethink.",
      ebWon: 73, ebLost: 18, ebNever: 62,
      topPain: ["Manual invoice processing and GL coding across locations", "No centralized invoice visibility (filing cabinets at each store)", "Uncaught vendor overcharges and sales tax errors", "Uncaptured vendor allowances and deal credits"],
    },
    healthcare: { label: "Healthcare", color: C.healthcare, segments: hcSegments,
      beachhead: "Senior Living / Long-Term Care",
      keyInsight: "Senior Living is the strongest HC segment: multi-facility with thin AP staffing, CFO personally feels the manual-process pain. Close cycles average 35 days. Referral network is active. PE-backed healthcare adds complexity — CFO at mgmt company must approve but may not feel the pain.",
      ebWon: 80, ebLost: 18, ebNever: 59,
      topPain: ["Manual invoice processing across multiple Sage 50 instances", "Cash flow and check-run burden (1-2 full days/week)", "Audit and compliance exposure (board mandates)", "Multi-location allocation splits and intercompany complexity"],
    },
  };

  const v = config[vert];

  return (
    <div>
      <VerticalSelector selected={vert} onChange={setVert} />

      <InsightBox color={v.color} title={`${v.label} — Key Insight`}>
        {v.keyInsight}
      </InsightBox>

      {/* Segment table */}
      <div style={{ background: C.card, borderRadius: 12, padding: 24, border: `1px solid ${C.border}`, marginBottom: 24 }}>
        <h3 style={{ color: C.text, fontSize: 16, fontWeight: 600, margin: "0 0 16px" }}>Segment Performance — {v.label}</h3>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${C.border}` }}>
              {["Segment", "Won", "Lost", "Win Rate", "Avg Close", ""].map(h => (
                <th key={h} style={{ color: C.textMuted, fontWeight: 600, padding: "10px 12px", textAlign: "left", fontSize: 11, textTransform: "uppercase" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {v.segments.map((s, i) => (
              <tr key={i} style={{ borderBottom: `1px solid ${C.border}22` }}>
                <td style={{ padding: "10px 12px", color: C.text, fontWeight: 500 }}>
                  {s.name}
                  {s.name === v.beachhead && <Badge color={v.color}> Beachhead</Badge>}
                </td>
                <td style={{ padding: "10px 12px", color: C.won }}>{s.won}</td>
                <td style={{ padding: "10px 12px", color: C.lost }}>{s.lost}</td>
                <td style={{ padding: "10px 12px" }}>
                  <span style={{ color: s.winRate >= 50 ? C.won : s.winRate >= 35 ? C.accent1 : s.winRate > 0 ? C.lost : C.textMuted, fontWeight: 700 }}>
                    {s.winRate}%
                  </span>
                </td>
                <td style={{ padding: "10px 12px", color: C.textMuted }}>{s.avgClose}</td>
                <td style={{ padding: "10px 12px", width: 100 }}><WinLossBar won={s.won} lost={s.lost} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Segment notes */}
      <div style={{ background: C.card, borderRadius: 12, padding: 24, border: `1px solid ${C.border}`, marginBottom: 24 }}>
        <h3 style={{ color: C.text, fontSize: 16, fontWeight: 600, margin: "0 0 16px" }}>Segment Notes</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {v.segments.filter(s => s.note).map((s, i) => (
            <div key={i} style={{ padding: 14, borderRadius: 8, background: `${v.color}08`, border: `1px solid ${v.color}15` }}>
              <div style={{ color: C.text, fontWeight: 600, fontSize: 13, marginBottom: 4 }}>{s.name}</div>
              <div style={{ color: C.textMuted, fontSize: 12, lineHeight: 1.5 }}>{s.note}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        {/* EB Engagement */}
        <div style={{ background: C.card, borderRadius: 12, padding: 24, border: `1px solid ${C.border}` }}>
          <h3 style={{ color: C.text, fontSize: 16, fontWeight: 600, margin: "0 0 16px" }}>Economic Buyer Engagement</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: 12, borderRadius: 8, background: `${C.won}11` }}>
              <span style={{ color: C.textMuted, fontSize: 13 }}>Won: EB engaged by Call 3</span>
              <span style={{ color: C.won, fontSize: 24, fontWeight: 700 }}>{v.ebWon}%</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: 12, borderRadius: 8, background: `${C.lost}11` }}>
              <span style={{ color: C.textMuted, fontSize: 13 }}>Lost: EB engaged by Call 3</span>
              <span style={{ color: C.lost, fontSize: 24, fontWeight: 700 }}>{v.ebLost}%</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: 12, borderRadius: 8, background: `${C.lost}11` }}>
              <span style={{ color: C.textMuted, fontSize: 13 }}>Lost: EB never engaged</span>
              <span style={{ color: C.lost, fontSize: 24, fontWeight: 700 }}>{v.ebNever}%</span>
            </div>
          </div>
        </div>

        {/* Top pain points */}
        <div style={{ background: C.card, borderRadius: 12, padding: 24, border: `1px solid ${C.border}` }}>
          <h3 style={{ color: C.text, fontSize: 16, fontWeight: 600, margin: "0 0 16px" }}>Top Pain Points — {v.label}</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {v.topPain.map((p, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: 10, borderRadius: 8, background: i === 0 ? `${v.color}11` : "transparent" }}>
                <div style={{ background: `${v.color}22`, color: v.color, fontWeight: 700, fontSize: 12, width: 24, height: 24, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{i + 1}</div>
                <span style={{ color: C.text, fontSize: 13, lineHeight: 1.4 }}>{p}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
