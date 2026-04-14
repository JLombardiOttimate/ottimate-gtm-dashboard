import { C } from '../data/colors';
import { pricingGate, pricingTiming, pricingSequencing, lossArchetypes } from '../data/execution';
import InsightBox from '../components/InsightBox';
import Badge from '../components/Badge';

export default function ExecutionPanel() {
  const maxWR = 65;

  return (
    <div>
      <InsightBox color={C.accent1} title="The Pricing Gate">
        Deals that reached a pricing conversation closed at <strong>54.5%</strong> (103 of 189 deals). Deals that never got there closed at <strong>23.9%</strong> (28 of 117 deals). That's a <strong>30-point gap</strong> — and it's driven entirely by whether the rep got to a pricing conversation, not what happened in it. Coaching reps to accelerate the path to pricing matters more than pricing presentation quality.
      </InsightBox>

      {/* Pricing Gate Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
        <div style={{ background: `${C.won}11`, borderRadius: 12, padding: 20, border: `1px solid ${C.won}33` }}>
          <div style={{ color: C.won, fontSize: 12, fontWeight: 600, textTransform: "uppercase", marginBottom: 8 }}>Reached Pricing</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
            <div style={{ color: C.won, fontSize: 36, fontWeight: 700 }}>54.5%</div>
            <div style={{ color: C.textMuted, fontSize: 13 }}>win rate</div>
          </div>
          <div style={{ color: C.textMuted, fontSize: 12, marginTop: 4 }}>189 deals · 103 won, 86 lost</div>
        </div>
        <div style={{ background: `${C.lost}11`, borderRadius: 12, padding: 20, border: `1px solid ${C.lost}33` }}>
          <div style={{ color: C.lost, fontSize: 12, fontWeight: 600, textTransform: "uppercase", marginBottom: 8 }}>Never Reached Pricing</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
            <div style={{ color: C.lost, fontSize: 36, fontWeight: 700 }}>23.9%</div>
            <div style={{ color: C.textMuted, fontSize: 13 }}>win rate</div>
          </div>
          <div style={{ color: C.textMuted, fontSize: 12, marginTop: 4 }}>117 deals · 28 won, 89 lost</div>
        </div>
      </div>

      {/* Pricing Timing */}
      <div style={{ background: C.card, borderRadius: 12, padding: 24, border: `1px solid ${C.border}`, marginBottom: 24 }}>
        <h3 style={{ color: C.text, fontSize: 16, fontWeight: 600, margin: "0 0 4px" }}>When to Price</h3>
        <p style={{ color: C.textMuted, fontSize: 13, margin: "0 0 20px" }}>
          Days from first contact to first pricing conversation — and win rate for each window. Based on 188 deals where timing could be determined. Won deals averaged 27 days to pricing; lost deals averaged 37 days.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {pricingTiming.map((t, i) => (
            <div key={i}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ color: C.text, fontSize: 13, fontWeight: t.sweet ? 600 : 400 }}>{t.window}</span>
                  {t.sweet && <Badge color={C.won}>Sweet spot</Badge>}
                </div>
                <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                  <span style={{ color: C.textMuted, fontSize: 12 }}>{t.deals} deals</span>
                  <span style={{ color: t.sweet ? C.won : t.winRate >= 58 ? C.won : t.winRate >= 50 ? C.accent1 : C.textMuted, fontWeight: 700, fontSize: 14, width: 48, textAlign: "right" }}>{t.winRate}%</span>
                </div>
              </div>
              <div style={{ height: 8, borderRadius: 99, background: C.border, overflow: "hidden" }}>
                <div style={{ width: `${(t.winRate / maxWR) * 100}%`, height: "100%", background: t.sweet ? C.won : t.winRate >= 58 ? C.won : t.winRate >= 50 ? C.accent1 : C.primary, borderRadius: 99 }} />
              </div>
            </div>
          ))}
        </div>
        <p style={{ color: C.textMuted, fontSize: 12, marginTop: 16 }}>
          The 8-14 day window is optimal. Rush it and you haven't built conviction. Drag it past 30 days and momentum dies. Both the same-day (50%) and 31+ day (49%) paths underperform the middle window by 12 points.
        </p>
      </div>

      {/* Sequencing */}
      <div style={{ background: C.card, borderRadius: 12, padding: 24, border: `1px solid ${C.border}`, marginBottom: 24 }}>
        <h3 style={{ color: C.text, fontSize: 16, fontWeight: 600, margin: "0 0 4px" }}>What Needs to Happen Before Pricing</h3>
        <p style={{ color: C.textMuted, fontSize: 13, margin: "0 0 20px" }}>
          Milestone sequencing before the first pricing conversation — and win rate for each path. The three milestones are: discovery complete, product demo done, and economic buyer engaged.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {pricingSequencing.map((s, i) => (
            <div key={i}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                <span style={{ color: C.text, fontSize: 13, fontWeight: i === 0 || i === 2 ? 600 : 400 }}>{s.label}</span>
                <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                  <span style={{ color: C.textMuted, fontSize: 12 }}>{s.deals} deals</span>
                  <span style={{ color: s.winRate >= 58 ? C.won : s.winRate >= 50 ? C.accent1 : C.textMuted, fontWeight: 700, fontSize: 14, width: 48, textAlign: "right" }}>{s.winRate}%</span>
                </div>
              </div>
              <div style={{ height: 8, borderRadius: 99, background: C.border, overflow: "hidden" }}>
                <div style={{ width: `${(s.winRate / maxWR) * 100}%`, height: "100%", background: s.winRate >= 58 ? C.won : C.primary, borderRadius: 99 }} />
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 16, padding: 14, borderRadius: 8, background: `${C.accent1}11`, border: `1px solid ${C.accent1}22` }}>
          <p style={{ color: C.text, fontSize: 13, margin: "0 0 8px", fontWeight: 600 }}>Retail exception</p>
          <p style={{ color: C.textMuted, fontSize: 12, margin: 0 }}>
            Retail inverts this pattern: EB after pricing closes at 69.2% vs 42.9% before. In Retail, the operational champion validates the product first and carries the business case to the EB. Don't force the Hospitality playbook onto a Retail deal.
          </p>
        </div>
      </div>

      {/* Loss Archetypes */}
      <div style={{ background: C.card, borderRadius: 12, padding: 24, border: `1px solid ${C.border}` }}>
        <h3 style={{ color: C.text, fontSize: 16, fontWeight: 600, margin: "0 0 4px" }}>How Deals Die</h3>
        <p style={{ color: C.textMuted, fontSize: 13, margin: "0 0 6px" }}>
          7 loss patterns from 297 closed-lost deals. Percentages are share of all losses.
        </p>
        <p style={{ color: C.textMuted, fontSize: 12, margin: "0 0 20px" }}>
          The Ghost and Single-Thread together account for 117 deals — 39% of all losses — and both are entirely within rep control. These aren't market or product losses.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {lossArchetypes.map((a, i) => (
            <div key={i}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ color: C.text, fontSize: 13, fontWeight: 600 }}>{a.name}</span>
                  {a.preventable === "yes" && <Badge color={C.lost}>Preventable</Badge>}
                  {a.preventable === "partial" && <Badge color={C.accent1}>Partially preventable</Badge>}
                </div>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <span style={{ color: C.textMuted, fontSize: 12 }}>{a.deals} deals</span>
                  <span style={{ color: C.lost, fontWeight: 700, fontSize: 14 }}>{a.pctOfLosses}% of losses</span>
                </div>
              </div>
              <div style={{ height: 6, borderRadius: 99, background: C.border, overflow: "hidden", marginBottom: 6 }}>
                <div style={{ width: `${(a.pctOfLosses / 35) * 100}%`, height: "100%", background: a.preventable === "yes" ? C.lost : C.accent1, borderRadius: 99 }} />
              </div>
              <div style={{ color: C.textMuted, fontSize: 12, marginBottom: 4 }}>{a.desc}</div>
              <div style={{ color: C.won, fontSize: 12 }}><strong>Fix:</strong> {a.fix}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
