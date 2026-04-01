import { useState } from "react";
import { ResponsiveContainer, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { ChevronDown, ChevronUp } from "lucide-react";
import { C } from '../data/colors';
import { triggers, triggerCombos, triggerCountWinRate } from '../data/triggers';
import InsightBox from '../components/InsightBox';
import VerticalSelector from '../components/VerticalSelector';
import CustomTooltip from '../components/CustomTooltip';

export default function TriggersPanel() {
  const [vert, setVert] = useState("all");
  const [expanded, setExpanded] = useState(null);

  const getVertWin = (t) => {
    if (vert === "hospitality") return t.hospWin;
    if (vert === "grocery") return t.grocWin;
    if (vert === "healthcare") return t.hcWin;
    return t.winRate;
  };
  const getVertDeals = (t) => {
    if (vert === "hospitality") return t.hospDeals;
    if (vert === "grocery") return t.grocDeals;
    if (vert === "healthcare") return t.hcDeals;
    return t.deals;
  };

  const sorted = [...triggers].sort((a, b) => getVertWin(b) - getVertWin(a));

  return (
    <div>
      <InsightBox color={C.won} title="Key Finding">
        <strong>Current Solution Frustration</strong> is the base layer in nearly every winning combination — it gets people to the table. But it doesn't close deals alone. Frustration + a <strong>forcing function</strong> (ERP migration, growth event, audit pressure, month-end pain) is what converts. The more triggers present, the higher the win rate: <strong>0 triggers = 21% win rate → 4+ triggers = 44%</strong>.
      </InsightBox>

      <VerticalSelector selected={vert} onChange={setVert} all />

      {/* Trigger cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
        {sorted.map((t, i) => {
          const wr = getVertWin(t);
          const deals = getVertDeals(t);
          const isOpen = expanded === i;
          const barColor = wr >= 50 ? C.won : wr >= 40 ? "#84cc16" : C.accent1;
          return (
            <div key={i} style={{ background: C.card, borderRadius: 12, border: `1px solid ${C.border}`, overflow: "hidden", transition: "all 0.2s" }}>
              <button onClick={() => setExpanded(isOpen ? null : i)} style={{
                width: "100%", background: "none", border: "none", cursor: "pointer", padding: "16px 20px",
                display: "grid", gridTemplateColumns: "1fr 100px 80px 30px", alignItems: "center", gap: 16,
              }}>
                <div style={{ textAlign: "left" }}>
                  <div style={{ color: C.text, fontWeight: 600, fontSize: 15 }}>{t.name}</div>
                  <div style={{ color: C.textMuted, fontSize: 12, marginTop: 2 }}>{deals} deals · +{t.lift}pp above baseline</div>
                </div>
                <div style={{ width: 100 }}>
                  <div style={{ height: 8, borderRadius: 99, background: `${C.border}`, overflow: "hidden" }}>
                    <div style={{ width: `${wr}%`, height: "100%", background: barColor, borderRadius: 99 }} />
                  </div>
                </div>
                <div style={{ color: barColor, fontWeight: 700, fontSize: 18, textAlign: "right" }}>{wr}%</div>
                <div style={{ color: C.textMuted }}>{isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}</div>
              </button>
              {isOpen && (
                <div style={{ padding: "0 20px 20px", borderTop: `1px solid ${C.border}` }}>
                  <p style={{ color: C.textMuted, fontSize: 13, lineHeight: 1.6, margin: "16px 0 12px" }}>{t.desc}</p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 12 }}>
                    {[
                      { label: "Hospitality", val: t.hospWin, deals: t.hospDeals, color: C.hospitality },
                      { label: "Grocery", val: t.grocWin, deals: t.grocDeals, color: C.retail },
                      { label: "Healthcare", val: t.hcWin, deals: t.hcDeals, color: C.healthcare },
                    ].map(v => (
                      <div key={v.label} style={{ background: `${v.color}11`, borderRadius: 8, padding: 12, textAlign: "center", border: `1px solid ${v.color}22` }}>
                        <div style={{ color: v.color, fontSize: 22, fontWeight: 700 }}>{v.val}%</div>
                        <div style={{ color: C.textMuted, fontSize: 11 }}>{v.label} ({v.deals} deals)</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ background: `${C.primary}11`, borderRadius: 8, padding: 12, border: `1px solid ${C.primary}22` }}>
                    <span style={{ color: C.primary, fontSize: 12, fontWeight: 600 }}>SDR TARGET: </span>
                    <span style={{ color: C.text, fontSize: 13 }}>{t.sdTarget}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Trigger count → win rate */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        <div style={{ background: C.card, borderRadius: 12, padding: 24, border: `1px solid ${C.border}` }}>
          <h3 style={{ color: C.text, fontSize: 16, fontWeight: 600, margin: "0 0 4px" }}>More Triggers = Higher Win Rate</h3>
          <p style={{ color: C.textMuted, fontSize: 13, margin: "0 0 16px" }}>Deals with multiple moderate-or-strong triggers convert at 2x the rate of single-trigger deals.</p>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={triggerCountWinRate} margin={{ left: 10, right: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
              <XAxis dataKey="triggers" tick={{ fill: C.textMuted, fontSize: 12 }} label={{ value: "Triggers Present", position: "bottom", fill: C.textMuted, fontSize: 12, offset: -5 }} />
              <YAxis tick={{ fill: C.textMuted, fontSize: 12 }} tickFormatter={v => `${v}%`} domain={[0, 55]} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="winRate" name="Win Rate %" stroke={C.primary} fill={`${C.primary}33`} strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div style={{ background: C.card, borderRadius: 12, padding: 24, border: `1px solid ${C.border}` }}>
          <h3 style={{ color: C.text, fontSize: 16, fontWeight: 600, margin: "0 0 4px" }}>Top Winning Trigger Combinations</h3>
          <p style={{ color: C.textMuted, fontSize: 13, margin: "0 0 16px" }}>Current Solution Frustration is the base layer in every winning combo.</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={triggerCombos} layout="vertical" margin={{ left: 10, right: 30 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
              <XAxis type="number" tick={{ fill: C.textMuted, fontSize: 12 }} tickFormatter={v => `${v}%`} />
              <YAxis dataKey="pair" type="category" tick={{ fill: C.textMuted, fontSize: 10 }} width={190} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="pctWins" name="% of All Wins" fill={C.won} radius={[0, 6, 6, 0]} barSize={14} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
