import { useState } from "react";
import { C } from '../data/colors';
import { objCategories, dealKillers, objStageData } from '../data/objections';
import Badge from '../components/Badge';
import InsightBox from '../components/InsightBox';
import VerticalSelector from '../components/VerticalSelector';

export default function ObjectionsPanel() {
  const [vert, setVert] = useState("all");

  const getPct = (o) => {
    if (vert === "hospitality") return o.hospPct;
    if (vert === "grocery") return o.grocPct;
    if (vert === "healthcare") return o.hcPct;
    return o.pct;
  };

  const sorted = [...objCategories].sort((a, b) => getPct(b) - getPct(a));

  return (
    <div>
      <InsightBox color={C.accent1} title="The Objection Paradox">
        Won deals average <strong>104 objections</strong> vs only <strong>69 on lost deals</strong>. Objections aren't the problem — it's how they're handled. Top performers overcome with <strong>specificity and next-step clarity</strong>. The real killer: <strong>53% of objections go completely unaddressed</strong>. Reps who surface objections in Calls 1-3 win at <strong>2.5x the rate</strong> of those who let objections harden in Calls 5-7.
      </InsightBox>

      <VerticalSelector selected={vert} onChange={setVert} all />

      {/* Category landscape */}
      <div style={{ background: C.card, borderRadius: 12, padding: 24, border: `1px solid ${C.border}`, marginBottom: 24 }}>
        <h3 style={{ color: C.text, fontSize: 16, fontWeight: 600, margin: "0 0 4px" }}>Objection Categories{vert !== "all" ? ` — ${vert.charAt(0).toUpperCase() + vert.slice(1)}` : ""}</h3>
        <p style={{ color: C.textMuted, fontSize: 13, margin: "0 0 20px" }}>
          <Badge color={C.won}>9 Proven Strategies</Badge>{" "}
          <Badge color={C.lost}>2 Untested Gaps</Badge>
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {sorted.map((o, i) => {
            const pct = getPct(o);
            return (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "280px 1fr 100px 60px", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: `1px solid ${C.border}22` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ width: 8, height: 8, borderRadius: 99, background: o.status === "gap" ? C.lost : C.won, flexShrink: 0 }} />
                  <span style={{ color: C.text, fontSize: 13, fontWeight: 500 }}>{o.name}</span>
                </div>
                <div style={{ height: 8, borderRadius: 99, background: C.border, overflow: "hidden" }}>
                  <div style={{ width: `${(pct / 35) * 100}%`, height: "100%", background: o.status === "gap" ? C.lost : C.primary, borderRadius: 99 }} />
                </div>
                <span style={{ color: C.textMuted, fontSize: 12, textAlign: "right" }}>{pct}% of deals ({o.dealCount})</span>
                <span style={{ textAlign: "right" }}>
                  {o.winWhenOvercome ? (
                    <span style={{ color: C.won, fontWeight: 700, fontSize: 14 }}>{o.winWhenOvercome}%</span>
                  ) : (
                    <Badge color={C.lost}>Gap</Badge>
                  )}
                </span>
              </div>
            );
          })}
        </div>
        <div style={{ display: "flex", gap: 16, marginTop: 16, fontSize: 12, color: C.textMuted }}>
          <span><span style={{ display: "inline-block", width: 8, height: 8, borderRadius: 99, background: C.won, marginRight: 4 }} />Proven strategy</span>
          <span><span style={{ display: "inline-block", width: 8, height: 8, borderRadius: 99, background: C.lost, marginRight: 4 }} />No proven strategy</span>
          <span style={{ marginLeft: "auto" }}>Win % = rate when objection is overcome with specificity</span>
        </div>
      </div>

      {/* Deal killers — full width, elevated */}
      <div style={{ background: C.card, borderRadius: 12, padding: 24, border: `1px solid ${C.border}`, marginBottom: 24 }}>
        <h3 style={{ color: C.text, fontSize: 16, fontWeight: 600, margin: "0 0 4px" }}>Top Deal Killers</h3>
        <p style={{ color: C.textMuted, fontSize: 13, margin: "0 0 20px" }}>Patterns from 464 deals where loss was near-certain once the signal appeared.</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {dealKillers.map((d, i) => (
            <div key={i}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                <span style={{ color: C.text, fontSize: 13, fontWeight: 600 }}>{d.name}</span>
                <span style={{ color: C.lost, fontWeight: 700, fontSize: 14, flexShrink: 0, marginLeft: 12 }}>{d.lossRate}% loss rate</span>
              </div>
              <div style={{ height: 6, borderRadius: 99, background: `${C.border}`, overflow: "hidden", marginBottom: 6 }}>
                <div style={{ width: `${d.lossRate}%`, height: "100%", background: C.lost, borderRadius: 99 }} />
              </div>
              <div style={{ color: C.textMuted, fontSize: 12, marginBottom: 4 }}>{d.desc}</div>
              <div style={{ color: C.won, fontSize: 12 }}><strong>Instead:</strong> {d.fix}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Proven strategies table */}
      <div style={{ background: C.card, borderRadius: 12, padding: 24, border: `1px solid ${C.border}`, marginBottom: 24 }}>
        <h3 style={{ color: C.text, fontSize: 16, fontWeight: 600, margin: "0 0 4px" }}>Proven Overcoming Strategies</h3>
        <p style={{ color: C.textMuted, fontSize: 13, margin: "0 0 16px" }}>
          A strategy is labeled "proven" when the specific approach was observed in multiple transcripts and correlated with a documented move-forward rate. Win % = rate when the rep used <em>this specific approach</em>, not the overall win rate for deals where the objection appeared.
        </p>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${C.border}` }}>
              {["Objection", "Proven Strategy", "Win Rate"].map(h => (
                <th key={h} style={{ color: C.textMuted, fontWeight: 600, padding: "10px 12px", textAlign: "left", fontSize: 11, textTransform: "uppercase" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {objCategories.map((o, i) => (
              <tr key={i} style={{ borderBottom: `1px solid ${C.border}22` }}>
                <td style={{ padding: "10px 12px", color: C.text, fontWeight: 500, width: "25%" }}>{o.name}</td>
                <td style={{ padding: "10px 12px", color: o.status === "gap" ? C.lost : C.textMuted, fontStyle: o.status === "gap" ? "italic" : "normal" }}>{o.strategy}</td>
                <td style={{ padding: "10px 12px", textAlign: "center", width: 80 }}>
                  {o.winWhenOvercome ? (
                    <span style={{ color: C.won, fontWeight: 700 }}>{o.winWhenOvercome}%</span>
                  ) : (
                    <span style={{ color: C.lost, fontWeight: 600 }}>—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Timing chart — full width */}
      <div style={{ background: C.card, borderRadius: 12, padding: 24, border: `1px solid ${C.border}`, marginBottom: 24 }}>
        <h3 style={{ color: C.text, fontSize: 16, fontWeight: 600, margin: "0 0 4px" }}>When Objections Surface Matters</h3>
        <p style={{ color: C.textMuted, fontSize: 13, margin: "0 0 16px" }}>Objections surfaced in Discovery (Calls 1-2) are 2.5x more winnable than the same objection raised in Evaluation (Calls 5-7).</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {objStageData.map((s, i) => (
            <div key={i}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ color: C.text, fontSize: 13, fontWeight: 500 }}>{s.stage}</span>
                <span style={{ color: s.lossRate >= 70 ? C.lost : s.lossRate >= 50 ? C.accent1 : C.won, fontWeight: 600, fontSize: 13 }}>{s.lossRate}% loss if unaddressed</span>
              </div>
              <div style={{ height: 8, borderRadius: 99, background: `${C.border}`, overflow: "hidden", marginBottom: 4 }}>
                <div style={{ width: `${s.lossRate}%`, height: "100%", background: s.lossRate >= 70 ? C.lost : s.lossRate >= 50 ? C.accent1 : C.won, borderRadius: 99 }} />
              </div>
              <div style={{ color: C.textMuted, fontSize: 11 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Won vs lost comparison callouts */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{ background: `${C.lost}11`, borderRadius: 12, padding: 20, border: `1px solid ${C.lost}33` }}>
          <div style={{ color: C.lost, fontSize: 13, fontWeight: 600, textTransform: "uppercase", marginBottom: 8 }}>Price Objection: Won vs Lost</div>
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <div style={{ textAlign: "center" }}><div style={{ color: C.won, fontSize: 28, fontWeight: 700 }}>18.2</div><div style={{ color: C.textMuted, fontSize: 11 }}>avg instances/deal (won)</div></div>
            <div style={{ color: C.textMuted, fontSize: 20 }}>{"\u2192"}</div>
            <div style={{ textAlign: "center" }}><div style={{ color: C.lost, fontSize: 28, fontWeight: 700 }}>84.6</div><div style={{ color: C.textMuted, fontSize: 11 }}>avg instances/deal (lost)</div></div>
          </div>
          <p style={{ color: C.textMuted, fontSize: 12, marginTop: 8 }}>On deals we won, price came up about 18 times across all calls. On deals we lost, it surfaced 85 times. High frequency means the buyer was never convinced, not that the price was wrong.</p>
        </div>
        <div style={{ background: `${C.lost}11`, borderRadius: 12, padding: 20, border: `1px solid ${C.lost}33` }}>
          <div style={{ color: C.lost, fontSize: 13, fontWeight: 600, textTransform: "uppercase", marginBottom: 8 }}>Uncertainty Objection: Won vs Lost</div>
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <div style={{ textAlign: "center" }}><div style={{ color: C.won, fontSize: 28, fontWeight: 700 }}>14.1</div><div style={{ color: C.textMuted, fontSize: 11 }}>avg instances/deal (won)</div></div>
            <div style={{ color: C.textMuted, fontSize: 20 }}>{"\u2192"}</div>
            <div style={{ textAlign: "center" }}><div style={{ color: C.lost, fontSize: 28, fontWeight: 700 }}>68.7</div><div style={{ color: C.textMuted, fontSize: 11 }}>avg instances/deal (lost)</div></div>
          </div>
          <p style={{ color: C.textMuted, fontSize: 12, marginTop: 8 }}>On won deals, uncertainty came up about 14 times per deal. On lost deals, 69 times. There is no proven overcoming strategy yet. This is the biggest coaching gap in the dataset.</p>
        </div>
      </div>
    </div>
  );
}
