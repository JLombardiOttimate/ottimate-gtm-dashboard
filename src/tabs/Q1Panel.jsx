import { Calendar, AlertTriangle } from "lucide-react";
import { C, verticalColor } from '../data/colors';
import { q1_2026 } from '../data/q1_2026';
import { triggers as histTriggers } from '../data/triggers';
import { objCategories as histObjections } from '../data/objections';
import InsightBox from '../components/InsightBox';

const fmtPct = (v, fallback = "—") =>
  (v === null || v === undefined || Number.isNaN(v)) ? fallback : `${v}%`;

const Stat = ({ label, value, sub, color = C.text }) => (
  <div style={{ background: C.card, borderRadius: 12, padding: 20, border: `1px solid ${C.border}` }}>
    <div style={{ color: C.textMuted, fontSize: 12, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>{label}</div>
    <div style={{ color, fontSize: 28, fontWeight: 700, lineHeight: 1.1 }}>{value}</div>
    {sub && <div style={{ color: C.textMuted, fontSize: 12, marginTop: 4 }}>{sub}</div>}
  </div>
);

const Delta = ({ q1, hist, suffix = "%", invert = false }) => {
  if (q1 === null || hist === null || q1 === undefined || hist === undefined) {
    return <span style={{ color: C.textMuted }}>—</span>;
  }
  const d = q1 - hist;
  const positive = invert ? d < 0 : d > 0;
  const color = d === 0 ? C.textMuted : positive ? C.won : C.lost;
  const sign = d > 0 ? "+" : "";
  return <span style={{ color, fontWeight: 600 }}>{sign}{d.toFixed(1)}{suffix === "%" ? "pp" : suffix}</span>;
};

const ComparisonRow = ({ label, q1, hist, suffix = "%", invert = false }) => (
  <tr style={{ borderBottom: `1px solid ${C.border}22` }}>
    <td style={{ padding: "10px 12px", color: C.text, fontSize: 13 }}>{label}</td>
    <td style={{ padding: "10px 12px", color: C.text, fontSize: 13, textAlign: "right" }}>{q1 === null || q1 === undefined ? "—" : `${q1}${suffix}`}</td>
    <td style={{ padding: "10px 12px", color: C.textMuted, fontSize: 13, textAlign: "right" }}>{hist === null || hist === undefined ? "—" : `${hist}${suffix}`}</td>
    <td style={{ padding: "10px 12px", fontSize: 13, textAlign: "right" }}><Delta q1={q1} hist={hist} suffix={suffix} invert={invert} /></td>
  </tr>
);

const SectionHeader = ({ title, subtitle }) => (
  <div style={{ marginTop: 32, marginBottom: 12 }}>
    <h3 style={{ color: C.text, fontSize: 18, fontWeight: 700, margin: 0 }}>{title}</h3>
    {subtitle && <p style={{ color: C.textMuted, fontSize: 13, margin: "4px 0 0" }}>{subtitle}</p>}
  </div>
);

const Table = ({ headers, children }) => (
  <div style={{ background: C.card, borderRadius: 12, border: `1px solid ${C.border}`, overflow: "hidden" }}>
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr style={{ background: `${C.border}33` }}>
          {headers.map((h, i) => (
            <th key={i} style={{ padding: "10px 12px", color: C.textMuted, fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5, textAlign: i === 0 ? "left" : "right" }}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  </div>
);

const PendingCard = ({ count, total }) => (
  <div style={{ background: C.card, borderRadius: 12, padding: 24, border: `1px dashed ${C.border}`, color: C.textMuted, fontSize: 13, textAlign: "center" }}>
    <AlertTriangle size={18} color={C.accent1} style={{ verticalAlign: "middle", marginRight: 6 }} />
    Per-deal Pipeline 3 analyses are pending — currently <strong style={{ color: C.text }}>{count} / {total}</strong> Q1 deals analyzed.
    Run <code style={{ color: C.text, fontSize: 12 }}>scripts/batch_analyze_q1.py</code> to fill in this section.
  </div>
);

export default function Q1Panel() {
  const { kpis, historical_baseline: hist, triggers, objections, champions, economic_buyer, outcomes } = q1_2026;
  const q1HasP3Data = kpis.analyzed >= 5;

  // Build trigger comparison rows
  const triggerRows = histTriggers.map(h => {
    const q1Match = (triggers || []).find(t =>
      t.name.toLowerCase().includes(h.name.toLowerCase().split(" ")[0]) ||
      h.name.toLowerCase().includes(t.name.toLowerCase().split(" ")[0])
    );
    return {
      name: h.name,
      q1_freq: q1Match?.freq_pct ?? null,
      hist_freq: Math.round(100 * h.deals / 463 * 10) / 10,  // %
      q1_winrate: q1Match?.win_rate ?? null,
      hist_winrate: h.winRate,
      q1_deals: q1Match?.deals ?? 0,
      hist_deals: h.deals,
    };
  });

  const objectionRows = histObjections.map(h => {
    const q1Match = (objections || []).find(o =>
      o.category && (o.category.toLowerCase().includes(h.name.toLowerCase().split(" ")[0]) ||
                     h.name.toLowerCase().includes(o.category.toLowerCase().split(" ")[0]))
    );
    return {
      name: h.name,
      q1_freq: q1Match?.freq_pct ?? null,
      hist_freq: h.pct,
      q1_loss: q1Match?.loss_rate ?? null,
      hist_loss: h.winWhenOvercome ? Math.round(100 - h.winWhenOvercome) : null,
    };
  });

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
        <Calendar size={20} color={C.primary} />
        <h2 style={{ color: C.text, fontSize: 22, fontWeight: 700, margin: 0 }}>Q1 2026 vs Historical Baseline</h2>
      </div>
      <p style={{ color: C.textMuted, fontSize: 13, margin: "0 0 24px" }}>
        Comparison of {kpis.total_opps} closed deals from {kpis.date_range.start} → {kpis.date_range.end} against the {hist.sample.total}-deal historical baseline.
      </p>

      {/* Headline KPI cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 16 }}>
        <Stat label="Q1 Deals" value={kpis.total_opps}
              sub={`${kpis.won} won • ${kpis.lost} lost`} />
        <Stat label="Q1 Win Rate" value={`${kpis.win_rate}%`}
              color={kpis.win_rate < hist.win_rate ? C.lost : C.won}
              sub={<>vs hist {hist.win_rate}% &nbsp;<Delta q1={kpis.win_rate} hist={hist.win_rate} /></>} />
        <Stat label="Lost-to-Won Ratio" value={`${kpis.lost_to_won_ratio}×`}
              color={C.lost}
              sub={`vs hist 1.9× — pipeline quality concern`} />
        <Stat label="P3 Analyzed" value={`${kpis.analyzed} / ${kpis.total_opps}`}
              color={q1HasP3Data ? C.won : C.accent1}
              sub={q1HasP3Data ? "ready for comparison" : "running…"} />
      </div>

      {/* Sample-bias callout */}
      <InsightBox color={C.lost} title="Sample-Size Disclosure">
        Q1 closed at <strong>{kpis.lost_to_won_ratio}× lost:won</strong> versus a historical baseline of ~1.9×. With <strong>{kpis.won} wins</strong> in Q1, sub-vertical win-rate breakdowns are below the 30-deal threshold for confident inference. Treat per-vertical numbers as directional, and read deltas with caution.
      </InsightBox>

      {/* Per-vertical breakdown */}
      <SectionHeader title="Per-Vertical Win Rate"
                     subtitle="Q1 close-volume by vertical and win rate." />
      <Table headers={["Vertical", "Total", "Won", "Lost", "Win Rate"]}>
        {Object.entries(kpis.per_vertical).map(([v, s]) => (
          <tr key={v} style={{ borderBottom: `1px solid ${C.border}22` }}>
            <td style={{ padding: "10px 12px", color: verticalColor[v === "Retail" ? "Grocery" : v] || C.text, fontSize: 13, fontWeight: 600 }}>{v}</td>
            <td style={{ padding: "10px 12px", color: C.text, fontSize: 13, textAlign: "right" }}>{s.total}</td>
            <td style={{ padding: "10px 12px", color: C.won, fontSize: 13, textAlign: "right" }}>{s.won}</td>
            <td style={{ padding: "10px 12px", color: C.lost, fontSize: 13, textAlign: "right" }}>{s.lost}</td>
            <td style={{ padding: "10px 12px", color: s.win_rate < 10 ? C.lost : s.win_rate < 25 ? C.accent1 : C.won, fontSize: 14, fontWeight: 600, textAlign: "right" }}>{s.win_rate}%</td>
          </tr>
        ))}
      </Table>

      {/* Champions / EB / single-thread cross-cohort comparison (data we already have) */}
      <SectionHeader title="Engagement Quality Comparison"
                     subtitle="MEDDICC scores and engagement rates from per-deal records (where Q1 P3 data is available)." />
      <Table headers={["Metric", "Q1 2026", `Hist (${hist.sample.total})`, "Δ"]}>
        <ComparisonRow label="Win rate (overall)" q1={kpis.win_rate} hist={hist.win_rate} />
        <ComparisonRow label="EB engaged on wins" q1={economic_buyer?.engaged_won_pct} hist={hist.eb_engaged_won_pct} />
        <ComparisonRow label="EB engaged on losses" q1={economic_buyer?.engaged_lost_pct} hist={hist.eb_engaged_lost_pct} invert />
        <ComparisonRow label="Single-threaded on wins" q1={champions?.single_threaded_won_pct} hist={hist.single_threaded_won_pct} invert />
        <ComparisonRow label="Single-threaded on losses" q1={champions?.single_threaded_lost_pct} hist={hist.single_threaded_lost_pct} invert />
        <ComparisonRow label="Avg MEDDICC: EB (wins)" q1={economic_buyer?.avg_meddicc_eb_won} hist={hist.avg_meddicc_eb_won} suffix="" />
        <ComparisonRow label="Avg MEDDICC: EB (losses)" q1={economic_buyer?.avg_meddicc_eb_lost} hist={hist.avg_meddicc_eb_lost} suffix="" />
        <ComparisonRow label="Avg champion score (wins)" q1={champions?.avg_score_won} hist={hist.avg_meddicc_champion_won} suffix="" />
        <ComparisonRow label="Avg champion score (losses)" q1={champions?.avg_score_lost} hist={hist.avg_meddicc_champion_lost} suffix="" />
      </Table>

      {/* Buying triggers comparison */}
      <SectionHeader title="Buying Triggers" subtitle="Frequency and win-rate per trigger, Q1 vs historical." />
      {!q1HasP3Data ? <PendingCard count={kpis.analyzed} total={kpis.total_opps} /> : (
        <Table headers={["Trigger", "Q1 Freq", "Hist Freq", "Q1 Win", "Hist Win"]}>
          {triggerRows.map((r, i) => (
            <tr key={i} style={{ borderBottom: `1px solid ${C.border}22` }}>
              <td style={{ padding: "10px 12px", color: C.text, fontSize: 13 }}>{r.name}</td>
              <td style={{ padding: "10px 12px", color: C.text, fontSize: 13, textAlign: "right" }}>{r.q1_freq === null ? "—" : `${r.q1_freq}%`}</td>
              <td style={{ padding: "10px 12px", color: C.textMuted, fontSize: 13, textAlign: "right" }}>{r.hist_freq}%</td>
              <td style={{ padding: "10px 12px", color: r.q1_winrate < r.hist_winrate ? C.lost : C.won, fontSize: 13, textAlign: "right" }}>{r.q1_winrate === null ? "—" : `${r.q1_winrate}%`}</td>
              <td style={{ padding: "10px 12px", color: C.textMuted, fontSize: 13, textAlign: "right" }}>{r.hist_winrate}%</td>
            </tr>
          ))}
        </Table>
      )}

      {/* Objections comparison */}
      <SectionHeader title="Objections" subtitle="11 categories from the historical scorecard, with Q1 frequency where available." />
      {!q1HasP3Data ? <PendingCard count={kpis.analyzed} total={kpis.total_opps} /> : (
        <Table headers={["Category", "Q1 Freq", "Hist Freq", "Q1 Loss Rate", "Hist Loss Rate"]}>
          {objectionRows.map((r, i) => (
            <tr key={i} style={{ borderBottom: `1px solid ${C.border}22` }}>
              <td style={{ padding: "10px 12px", color: C.text, fontSize: 13 }}>{r.name}</td>
              <td style={{ padding: "10px 12px", color: C.text, fontSize: 13, textAlign: "right" }}>{r.q1_freq === null ? "—" : `${r.q1_freq}%`}</td>
              <td style={{ padding: "10px 12px", color: C.textMuted, fontSize: 13, textAlign: "right" }}>{r.hist_freq}%</td>
              <td style={{ padding: "10px 12px", color: C.text, fontSize: 13, textAlign: "right" }}>{r.q1_loss === null ? "—" : `${r.q1_loss}%`}</td>
              <td style={{ padding: "10px 12px", color: C.textMuted, fontSize: 13, textAlign: "right" }}>{r.hist_loss === null ? "—" : `${r.hist_loss}%`}</td>
            </tr>
          ))}
        </Table>
      )}

      {/* Win/Loss Reasons */}
      <SectionHeader title="Win & Loss Reasons" subtitle="Top primary reasons across Q1 wins and lost-deal archetypes." />
      {!q1HasP3Data ? <PendingCard count={kpis.analyzed} total={kpis.total_opps} /> : (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div>
            <h4 style={{ color: C.text, fontSize: 14, fontWeight: 600, margin: "0 0 8px" }}>Top Win Reasons</h4>
            <Table headers={["Reason", "Count"]}>
              {(outcomes?.top_win_reasons || []).slice(0, 7).map((r, i) => (
                <tr key={i} style={{ borderBottom: `1px solid ${C.border}22` }}>
                  <td style={{ padding: "10px 12px", color: C.text, fontSize: 13 }}>{r.reason}</td>
                  <td style={{ padding: "10px 12px", color: C.won, fontSize: 13, textAlign: "right", fontWeight: 600 }}>{r.count}</td>
                </tr>
              ))}
            </Table>
          </div>
          <div>
            <h4 style={{ color: C.text, fontSize: 14, fontWeight: 600, margin: "0 0 8px" }}>Loss Archetypes</h4>
            <Table headers={["Archetype", "Count"]}>
              {(outcomes?.loss_archetypes || []).slice(0, 7).map((r, i) => (
                <tr key={i} style={{ borderBottom: `1px solid ${C.border}22` }}>
                  <td style={{ padding: "10px 12px", color: C.text, fontSize: 13 }}>{r.archetype}</td>
                  <td style={{ padding: "10px 12px", color: C.lost, fontSize: 13, textAlign: "right", fontWeight: 600 }}>{r.count}</td>
                </tr>
              ))}
            </Table>
          </div>
        </div>
      )}

      {/* Footer */}
      <div style={{ marginTop: 32, padding: 16, borderTop: `1px solid ${C.border}`, color: C.textMuted, fontSize: 11 }}>
        Generated {q1_2026.metadata.generated_at} from {q1_2026.metadata.historical_source} ({q1_2026.metadata.n_historical_deals} historical deals) and Supabase deal_analyses (Q1 cohort).
      </div>
    </div>
  );
}
