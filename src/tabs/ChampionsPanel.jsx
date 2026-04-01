import { useState } from "react";
import { ResponsiveContainer, ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { Eye } from "lucide-react";
import { C } from '../data/colors';
import { champScoreData, champRubric, champRolesByVertical } from '../data/champions';
import InsightBox from '../components/InsightBox';
import VerticalSelector from '../components/VerticalSelector';
import CustomTooltip from '../components/CustomTooltip';

export default function ChampionsPanel() {
  const [vert, setVert] = useState("hospitality");

  const vData = champRolesByVertical[vert.charAt(0).toUpperCase() + vert.slice(1)] || champRolesByVertical.Hospitality;

  return (
    <div>
      {/* Rubric FIRST */}
      <div style={{ background: C.card, borderRadius: 12, padding: 24, border: `1px solid ${C.border}`, marginBottom: 24 }}>
        <h3 style={{ color: C.text, fontSize: 18, fontWeight: 700, margin: "0 0 4px" }}>What is a Champion Score?</h3>
        <p style={{ color: C.textMuted, fontSize: 14, margin: "0 0 20px", lineHeight: 1.5 }}>
          A champion isn't just a friendly contact. A champion <strong style={{ color: C.text }}>actively sells internally</strong> on Ottimate's behalf. The score measures the strength and reliability of this internal advocate — from 0 (absent) to 5 (elite). The gap between Score 3 and Score 4 is where deals are won or lost.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {champRubric.map(r => (
            <div key={r.score} style={{ display: "grid", gridTemplateColumns: "50px 1fr", gap: 14, padding: 14, borderRadius: 10, background: `${r.color}08`, border: `1px solid ${r.color}18` }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <div style={{ color: r.color, fontWeight: 800, fontSize: 24, lineHeight: 1 }}>{r.score}</div>
                <div style={{ color: r.color, fontSize: 10, fontWeight: 600, textTransform: "uppercase", marginTop: 2 }}>
                  {champScoreData.find(d => d.score === String(r.score))?.winRate ?? 0}% win
                </div>
              </div>
              <div>
                <div style={{ color: r.color, fontWeight: 600, fontSize: 14 }}>{r.label}</div>
                <div style={{ color: C.textMuted, fontSize: 12, lineHeight: 1.5, margin: "4px 0" }}>{r.desc}</div>
                <div style={{ color: C.text, fontSize: 12, fontStyle: "italic", opacity: 0.7 }}>{r.example}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Score → Win Rate chart */}
      <div style={{ background: C.card, borderRadius: 12, padding: 24, border: `1px solid ${C.border}`, marginBottom: 24 }}>
        <h3 style={{ color: C.text, fontSize: 16, fontWeight: 600, margin: "0 0 4px" }}>Champion Score vs. Outcome</h3>
        <p style={{ color: C.textMuted, fontSize: 13, margin: "0 0 16px" }}>423 deals scored. Won deals average <strong style={{ color: C.won }}>4.19</strong> vs <strong style={{ color: C.lost }}>1.72</strong> on losses — a 2.47-point gap.</p>
        <ResponsiveContainer width="100%" height={280}>
          <ComposedChart data={champScoreData} margin={{ left: 10, right: 30 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
            <XAxis dataKey="score" tick={{ fill: C.textMuted, fontSize: 12 }} label={{ value: "Champion Score", position: "bottom", fill: C.textMuted, fontSize: 12, offset: -5 }} />
            <YAxis yAxisId="left" tick={{ fill: C.textMuted, fontSize: 12 }} />
            <YAxis yAxisId="right" orientation="right" tick={{ fill: C.textMuted, fontSize: 12 }} tickFormatter={v => `${v}%`} domain={[0, 100]} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ color: C.textMuted, fontSize: 12 }} />
            <Bar yAxisId="left" dataKey="won" name="Won" fill={C.won} stackId="a" barSize={36} />
            <Bar yAxisId="left" dataKey="lost" name="Lost" fill={C.lost} stackId="a" radius={[4, 4, 0, 0]} barSize={36} />
            <Line yAxisId="right" type="monotone" dataKey="winRate" name="Win Rate %" stroke={C.accent1} strokeWidth={3} dot={{ fill: C.accent1, r: 5 }} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <InsightBox color={C.won} title="The Score 3→4 Cliff">
        Score 3 = <strong>33% win rate</strong> (helpful coordinator who likes the product). Score 4 = <strong>84% win rate</strong> (true advocate who facilitates intros and shares internal context). The difference: <strong>organizational influence</strong>. A Score 3 schedules calls. A Score 4 tells you how their CFO thinks and what will get the deal killed internally.
      </InsightBox>

      {/* Vertical breakdown */}
      <h3 style={{ color: C.text, fontSize: 18, fontWeight: 700, margin: "24px 0 16px" }}>Champion Roles by Vertical</h3>
      <VerticalSelector selected={vert} onChange={setVert} />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 24 }}>
        {/* Role table */}
        <div style={{ background: C.card, borderRadius: 12, padding: 24, border: `1px solid ${vData.color}33` }}>
          <h3 style={{ color: vData.color, fontSize: 16, fontWeight: 600, margin: "0 0 4px" }}>
            {vert.charAt(0).toUpperCase() + vert.slice(1)} — Champion Roles
          </h3>
          <p style={{ color: C.textMuted, fontSize: 13, margin: "0 0 16px" }}>
            Won avg: <strong style={{ color: C.won }}>{vData.avgWon}</strong> · Lost avg: <strong style={{ color: C.lost }}>{vData.avgLost}</strong>
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {vData.roles.map((r, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "10px 12px", borderRadius: 8, background: i === 0 ? `${C.won}11` : "transparent", border: i === 0 ? `1px solid ${C.won}22` : "none" }}>
                <div style={{ background: `${vData.color}22`, color: vData.color, fontWeight: 700, fontSize: 14, width: 28, height: 28, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {r.count}
                </div>
                <div>
                  <div style={{ color: C.text, fontWeight: 500, fontSize: 14 }}>{r.role}</div>
                  <div style={{ color: C.textMuted, fontSize: 12 }}>{r.note}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Insight + EB pattern */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ background: `${vData.color}11`, borderRadius: 12, padding: 20, border: `1px solid ${vData.color}33`, flex: 1 }}>
            <div style={{ color: vData.color, fontSize: 13, fontWeight: 600, textTransform: "uppercase", marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}><Eye size={14} />Vertical Insight</div>
            <div style={{ color: C.text, fontSize: 14, lineHeight: 1.6 }}>{vData.insight}</div>
          </div>
          <div style={{ background: C.card, borderRadius: 12, padding: 20, border: `1px solid ${C.border}`, flex: 1 }}>
            <div style={{ color: C.primary, fontSize: 13, fontWeight: 600, textTransform: "uppercase", marginBottom: 12 }}>Score Distribution — All Verticals</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
              {champScoreData.map(d => (
                <div key={d.score} style={{ textAlign: "center", padding: 8, borderRadius: 8, background: `${d.winRate >= 80 ? C.won : d.winRate >= 30 ? C.accent1 : C.lost}11` }}>
                  <div style={{ color: d.winRate >= 80 ? C.won : d.winRate >= 30 ? C.accent1 : C.lost, fontSize: 18, fontWeight: 700 }}>{d.total}</div>
                  <div style={{ color: C.textMuted, fontSize: 10 }}>Score {d.score}</div>
                  <div style={{ color: C.textMuted, fontSize: 10 }}>{d.winRate}% win</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
