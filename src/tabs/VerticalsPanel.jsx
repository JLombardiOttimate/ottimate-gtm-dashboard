import { useState } from "react";
import { C } from '../data/colors';
import { hospSegments, grocSegments, hcSegments, hospExecution, grocExecution, hcExecution } from '../data/verticals';
import Badge from '../components/Badge';
import WinLossBar from '../components/WinLossBar';
import InsightBox from '../components/InsightBox';
import VerticalSelector from '../components/VerticalSelector';

export default function VerticalsPanel() {
  const [vert, setVert] = useState("hospitality");

  const config = {
    hospitality: { label: "Hospitality", color: C.hospitality, segments: hospSegments, exec: hospExecution,
      beachhead: "Country Clubs / Private Clubs",
      keyInsight: "Country clubs are the beachhead: fastest close cycles, natural referral networks between club professionals, and the TrueClub partnership discount accelerates pricing. Economic buyer (CFO/GM) engagement by Call 3 is present in ~80% of wins.",
      ebWon: 80, ebLost: 18, ebNever: 58,
      topPain: ["Manual invoice entry and GL coding (90%+ of deals)", "Approval workflow bottlenecks (seasonal crunch)", "Statement reconciliation and month-end close burden", "Check fraud and payment security concerns"],
    },
    grocery: { label: "Grocery", color: C.retail, segments: grocSegments, exec: grocExecution,
      beachhead: "Independent / Ethnic Grocery (2-10 stores)",
      keyInsight: "Independent grocers are the beachhead: 500-1500 invoices/month, skeleton AP staff, owner often personally involved in check runs. Food Coops have a built-in urgency trigger: NCG-mandated QuickBooks Desktop→Online migration forces a system rethink.",
      ebWon: 73, ebLost: 18, ebNever: 62,
      topPain: ["Manual invoice processing and GL coding across locations", "No centralized invoice visibility (filing cabinets at each store)", "Uncaught vendor overcharges and sales tax errors", "Uncaptured vendor allowances and deal credits"],
    },
    healthcare: { label: "Healthcare", color: C.healthcare, segments: hcSegments, exec: hcExecution,
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

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 24 }}>
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

      {/* Execution Gaps (MEDDICC) */}
      <div style={{ background: C.card, borderRadius: 12, padding: 24, border: `1px solid ${C.border}`, marginBottom: 24 }}>
        <h3 style={{ color: C.text, fontSize: 16, fontWeight: 600, margin: "0 0 4px" }}>Execution Gaps</h3>
        <p style={{ color: C.textMuted, fontSize: 13, margin: "0 0 6px" }}>
          Where wins and losses separate — scored 0-5 based on transcript evidence. Sorted by gap size.
        </p>
        <p style={{ color: C.textMuted, fontSize: 12, margin: "0 0 20px" }}>{v.exec.execInsight}</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 80px 80px 60px", gap: 8 }}>
          <div style={{ color: C.textMuted, fontSize: 11, fontWeight: 600, textTransform: "uppercase", padding: "0 0 8px", borderBottom: `1px solid ${C.border}` }}>Element</div>
          <div style={{ color: C.won, fontSize: 11, fontWeight: 600, textTransform: "uppercase", padding: "0 0 8px", borderBottom: `1px solid ${C.border}`, textAlign: "center" }}>Won avg</div>
          <div style={{ color: C.lost, fontSize: 11, fontWeight: 600, textTransform: "uppercase", padding: "0 0 8px", borderBottom: `1px solid ${C.border}`, textAlign: "center" }}>Lost avg</div>
          <div style={{ color: C.textMuted, fontSize: 11, fontWeight: 600, textTransform: "uppercase", padding: "0 0 8px", borderBottom: `1px solid ${C.border}`, textAlign: "center" }}>Gap</div>
          {v.exec.meddic.map((m, i) => (
            <>
              <div key={`n${i}`} style={{ padding: "10px 0", color: C.text, fontSize: 13, borderBottom: `1px solid ${C.border}22`, fontWeight: i === 0 ? 600 : 400 }}>{m.element}{i === 0 && <span style={{ color: v.color, fontSize: 11, marginLeft: 8 }}>▲ #1 gap</span>}</div>
              <div key={`w${i}`} style={{ padding: "10px 0", color: C.won, fontSize: 13, fontWeight: 700, textAlign: "center", borderBottom: `1px solid ${C.border}22` }}>{m.wonScore}</div>
              <div key={`l${i}`} style={{ padding: "10px 0", color: C.textMuted, fontSize: 13, textAlign: "center", borderBottom: `1px solid ${C.border}22` }}>{m.lostScore}</div>
              <div key={`g${i}`} style={{ padding: "10px 0", color: C.lost, fontSize: 13, fontWeight: 700, textAlign: "center", borderBottom: `1px solid ${C.border}22` }}>+{m.gap}</div>
            </>
          ))}
        </div>
      </div>

      {/* Sales Cycle + Competitive Landscape */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        {/* Sales Cycle & Cadence */}
        <div style={{ background: C.card, borderRadius: 12, padding: 24, border: `1px solid ${C.border}` }}>
          <h3 style={{ color: C.text, fontSize: 16, fontWeight: 600, margin: "0 0 4px" }}>Sales Cycle & Call Cadence</h3>
          <p style={{ color: C.textMuted, fontSize: 12, margin: "0 0 16px" }}>{v.exec.cycleInsight}</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
            <div>
              <div style={{ color: C.textMuted, fontSize: 11, fontWeight: 600, textTransform: "uppercase", marginBottom: 8 }}>Days to Close</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {[{ label: "Overall", val: v.exec.cycle.overall, color: C.textMuted }, { label: "Won", val: v.exec.cycle.won, color: C.won }, { label: "Lost", val: v.exec.cycle.lost, color: C.lost }].map(r => (
                  <div key={r.label} style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: C.textMuted, fontSize: 12 }}>{r.label}</span>
                    <span style={{ color: r.color, fontWeight: r.label !== "Overall" ? 700 : 400, fontSize: 13 }}>{r.val}d</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div style={{ color: C.textMuted, fontSize: 11, fontWeight: 600, textTransform: "uppercase", marginBottom: 8 }}>Calls per Deal</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {[{ label: "Overall", val: v.exec.calls.overall, color: C.textMuted }, { label: "Won", val: v.exec.calls.won, color: C.won }, { label: "Lost", val: v.exec.calls.lost, color: C.lost }].map(r => (
                  <div key={r.label} style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: C.textMuted, fontSize: 12 }}>{r.label}</span>
                    <span style={{ color: r.color, fontWeight: r.label !== "Overall" ? 700 : 400, fontSize: 13 }}>{r.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Competitive Landscape */}
        <div style={{ background: C.card, borderRadius: 12, padding: 24, border: `1px solid ${C.border}` }}>
          <h3 style={{ color: C.text, fontSize: 16, fontWeight: 600, margin: "0 0 4px" }}>Competitive Landscape</h3>
          <p style={{ color: C.textMuted, fontSize: 12, margin: "0 0 16px" }}>Competitors by deal volume in {v.label}. Ottimate wins 50-90% against named competitors. Status quo (no change) is the hardest opponent at 10% win rate.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {v.exec.competitors.map((c, i) => {
              const maxDeals = v.exec.competitors[0].deals;
              return (
                <div key={i}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ color: C.text, fontSize: 13 }}>{c.name}</span>
                    <span style={{ color: C.textMuted, fontSize: 12 }}>{c.deals} deals</span>
                  </div>
                  <div style={{ height: 6, borderRadius: 99, background: C.border, overflow: "hidden" }}>
                    <div style={{ width: `${(c.deals / maxDeals) * 100}%`, height: "100%", background: v.color, borderRadius: 99 }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
