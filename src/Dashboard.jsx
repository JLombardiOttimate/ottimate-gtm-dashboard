import { useState } from "react";
import { BarChart3, Filter, Zap, ShieldCheck, Users } from "lucide-react";
import { C } from './data/colors';
import OverviewPanel from './tabs/OverviewPanel';
import VerticalsPanel from './tabs/VerticalsPanel';
import TriggersPanel from './tabs/TriggersPanel';
import ObjectionsPanel from './tabs/ObjectionsPanel';
import ChampionsPanel from './tabs/ChampionsPanel';

const tabs = [
  { id: "overview", label: "Overview", icon: BarChart3 },
  { id: "verticals", label: "Verticals", icon: Filter },
  { id: "triggers", label: "Buying Triggers", icon: Zap },
  { id: "objections", label: "Objections", icon: ShieldCheck },
  { id: "champions", label: "Champions", icon: Users },
];

export default function OttimateGTMDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  const panels = {
    overview: <OverviewPanel />,
    verticals: <VerticalsPanel />,
    triggers: <TriggersPanel />,
    objections: <ObjectionsPanel />,
    champions: <ChampionsPanel />,
  };

  return (
    <div style={{ background: C.bg, minHeight: "100vh", color: C.text, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>
      {/* Header */}
      <div style={{ background: `linear-gradient(135deg, ${C.card}, ${C.primaryDark}22)`, borderBottom: `1px solid ${C.border}`, padding: "24px 32px" }}>
        <h1 style={{ margin: 0, fontSize: 24, fontWeight: 700, background: `linear-gradient(135deg, ${C.text}, ${C.primaryLight})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          Ottimate GTM Intelligence
        </h1>
        <p style={{ margin: "4px 0 0", color: C.textMuted, fontSize: 14 }}>
          Buying triggers, objections, and champion patterns across 463 deals · 1,993 calls · Hospitality · Grocery · Healthcare
        </p>
      </div>

      {/* Tab Nav */}
      <div style={{ background: C.card, borderBottom: `1px solid ${C.border}`, padding: "0 32px", display: "flex", gap: 4, overflowX: "auto" }}>
        {tabs.map(t => {
          const Icon = t.icon;
          const active = activeTab === t.id;
          return (
            <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
              background: "none", border: "none", cursor: "pointer", padding: "14px 20px",
              color: active ? C.primary : C.textMuted, fontWeight: active ? 600 : 400,
              fontSize: 14, display: "flex", alignItems: "center", gap: 8,
              borderBottom: active ? `2px solid ${C.primary}` : "2px solid transparent",
              transition: "all 0.2s",
            }}>
              <Icon size={16} />
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div style={{ padding: "32px 32px 64px", maxWidth: 1200, margin: "0 auto" }}>
        {panels[activeTab]}
      </div>
    </div>
  );
}
