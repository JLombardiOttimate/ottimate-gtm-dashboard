import { Zap, ShieldCheck, Users } from "lucide-react";
import { C } from '../data/colors';
import { triggers } from '../data/triggers';
import InsightBox from '../components/InsightBox';

export default function OverviewPanel() {
  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <p style={{ color: C.textMuted, fontSize: 15, lineHeight: 1.7, margin: 0 }}>
          This dashboard surfaces the intelligence from <strong style={{ color: C.text }}>463 deals</strong> and <strong style={{ color: C.text }}>1,993 call transcripts</strong> that can't be pulled from Salesforce: what triggers buying behavior, which objections kill deals (and how to overcome them), and what separates a deal with a real champion from one that stalls. Use the tabs above to drill into each area by vertical.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 32 }}>
        {/* Trigger snapshot */}
        <div style={{ background: C.card, borderRadius: 12, padding: 24, border: `1px solid ${C.border}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <Zap size={18} color={C.accent1} />
            <h3 style={{ color: C.text, fontSize: 16, fontWeight: 600, margin: 0 }}>Buying Triggers</h3>
          </div>
          <div style={{ color: C.textMuted, fontSize: 13, lineHeight: 1.6, marginBottom: 16 }}>
            <strong style={{ color: C.text }}>9 validated triggers</strong> that cause prospects to engage. The top 3 that actually convert:
          </div>
          {triggers.slice(0, 3).map((t, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: `1px solid ${C.border}22` }}>
              <span style={{ color: C.text, fontSize: 13 }}>{t.name}</span>
              <span style={{ color: C.won, fontWeight: 700, fontSize: 14 }}>{t.winRate}%</span>
            </div>
          ))}
          <div style={{ color: C.textMuted, fontSize: 12, marginTop: 12, fontStyle: "italic" }}>Current Solution Frustration (most common) gets people to the table but only converts at 39.6% alone — it needs a forcing function.</div>
        </div>

        {/* Objection snapshot */}
        <div style={{ background: C.card, borderRadius: 12, padding: 24, border: `1px solid ${C.border}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <ShieldCheck size={18} color={C.primary} />
            <h3 style={{ color: C.text, fontSize: 16, fontWeight: 600, margin: 0 }}>Objections</h3>
          </div>
          <div style={{ color: C.textMuted, fontSize: 13, lineHeight: 1.6, marginBottom: 16 }}>
            <strong style={{ color: C.text }}>11 objection categories</strong> identified. 9 have proven overcoming strategies. 2 critical gaps:
          </div>
          <div style={{ padding: 10, borderRadius: 8, background: `${C.lost}11`, marginBottom: 8, border: `1px solid ${C.lost}22` }}>
            <div style={{ color: C.lost, fontSize: 12, fontWeight: 600 }}>Uncertainty / Low Conviction</div>
            <div style={{ color: C.textMuted, fontSize: 11 }}>15% of corpus · 77% loss rate · ZERO proven strategy</div>
          </div>
          <div style={{ padding: 10, borderRadius: 8, background: `${C.lost}11`, border: `1px solid ${C.lost}22` }}>
            <div style={{ color: C.lost, fontSize: 12, fontWeight: 600 }}>External Blockers</div>
            <div style={{ color: C.textMuted, fontSize: 11 }}>5% of corpus · 85-95% loss rate · uncontrollable</div>
          </div>
          <div style={{ color: C.textMuted, fontSize: 12, marginTop: 12, fontStyle: "italic" }}>53% of objections go unaddressed — the single largest avoidable loss driver.</div>
        </div>

        {/* Champion snapshot */}
        <div style={{ background: C.card, borderRadius: 12, padding: 24, border: `1px solid ${C.border}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <Users size={18} color={C.accent3} />
            <h3 style={{ color: C.text, fontSize: 16, fontWeight: 600, margin: 0 }}>Champions</h3>
          </div>
          <div style={{ color: C.textMuted, fontSize: 13, lineHeight: 1.6, marginBottom: 16 }}>
            Champion strength is the <strong style={{ color: C.text }}>single strongest predictor</strong> of deal outcome in this dataset.
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
            <div style={{ textAlign: "center", padding: 12, borderRadius: 8, background: `${C.won}11` }}>
              <div style={{ color: C.won, fontSize: 26, fontWeight: 700 }}>4.19</div>
              <div style={{ color: C.textMuted, fontSize: 11 }}>Won Avg Score</div>
            </div>
            <div style={{ textAlign: "center", padding: 12, borderRadius: 8, background: `${C.lost}11` }}>
              <div style={{ color: C.lost, fontSize: 26, fontWeight: 700 }}>1.72</div>
              <div style={{ color: C.textMuted, fontSize: 11 }}>Lost Avg Score</div>
            </div>
          </div>
          <div style={{ color: C.textMuted, fontSize: 12, lineHeight: 1.5 }}>
            Score 3 (helpful coordinator) = <strong style={{ color: C.accent1 }}>33%</strong> win rate<br />
            Score 4 (true advocate) = <strong style={{ color: C.won }}>84%</strong> win rate<br />
            <span style={{ fontStyle: "italic", marginTop: 4, display: "block" }}>That gap is where deals are won or lost.</span>
          </div>
        </div>
      </div>

      {/* EB engagement cross-vertical */}
      <InsightBox color={C.primary} title="Cross-Vertical Finding: Economic Buyer by Call 3">
        Across Hospitality, Grocery, and Healthcare, <strong>~80% of won deals</strong> had the CFO/owner actively engaged by Call 3. <strong>~60% of lost deals never engaged the economic buyer at all.</strong> If you're still only talking to the AP manager by Call 3, the deal is stalling. This should be a hard qualification gate.
      </InsightBox>
    </div>
  );
}
