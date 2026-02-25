import DashboardShell from "@/components/DashboardShell";
import RiskGauge from "@/components/RiskGauge";
import { AlertTriangle, Anchor, CloudRain, Clock, Percent } from "lucide-react";

const predictions = [
  { label: "Delay Probability", value: "73%", icon: Percent, desc: "Based on current conditions", color: "risk-high" },
  { label: "Risk Score", value: "68/100", icon: AlertTriangle, desc: "Moderate-High risk", color: "risk-medium" },
  { label: "Predicted Delay", value: "14 hrs", icon: Clock, desc: "Estimated additional time", color: "risk-high" },
  { label: "Port Congestion Impact", value: "42%", icon: Anchor, desc: "Shanghai port affected", color: "risk-high" },
  { label: "Weather Impact", value: "28%", icon: CloudRain, desc: "Typhoon advisory active", color: "risk-medium" },
];

const RiskPrediction = () => (
  <DashboardShell title="Risk Prediction">
    {/* Alert Badge */}
    <div className="mb-6 p-4 rounded-xl border border-warning/30 bg-warning/5 flex items-center gap-3">
      <Anchor className="w-5 h-5 text-warning shrink-0" />
      <div>
        <p className="font-semibold text-sm">Port Congestion Alert — Shanghai</p>
        <p className="text-sm text-muted-foreground">Current congestion level: HIGH. Average berth waiting time: 12 hours.</p>
      </div>
    </div>

    <div className="grid lg:grid-cols-3 gap-6 mb-6">
      {/* Risk Gauge */}
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm flex flex-col items-center justify-center">
        <RiskGauge value={68} size={220} label="Overall Risk Score" />
      </div>

      {/* Prediction Cards */}
      <div className="lg:col-span-2 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {predictions.map((p, i) => (
          <div key={i} className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                p.color === "risk-high" ? "bg-destructive/10" : p.color === "risk-medium" ? "bg-warning/10" : "bg-success/10"
              }`}>
                <p.icon className={`w-4 h-4 ${p.color}`} />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">{p.label}</p>
            <p className={`text-2xl font-bold mt-1 ${p.color}`}>{p.value}</p>
            <p className="text-xs text-muted-foreground mt-2">{p.desc}</p>
          </div>
        ))}
      </div>
    </div>

    {/* Route Stability Index */}
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
      <h3 className="font-semibold mb-4">Route Stability Index</h3>
      <div className="space-y-3">
        {[
          { route: "Shanghai → Rotterdam", stability: 38, label: "Unstable" },
          { route: "Mumbai → Hamburg", stability: 72, label: "Moderate" },
          { route: "LA → Tokyo", stability: 91, label: "Stable" },
          { route: "Dubai → London", stability: 55, label: "Moderate" },
          { route: "Singapore → Sydney", stability: 85, label: "Stable" },
        ].map((r, i) => (
          <div key={i} className="flex items-center gap-4">
            <span className="text-sm w-48 shrink-0">{r.route}</span>
            <div className="flex-1 h-2.5 bg-muted rounded-full overflow-hidden">
              <div className={`h-full rounded-full ${r.stability > 70 ? "bg-risk-low" : r.stability > 45 ? "bg-risk-medium" : "bg-risk-high"}`} style={{ width: `${r.stability}%` }} />
            </div>
            <span className="text-xs text-muted-foreground w-20">{r.stability}% — {r.label}</span>
          </div>
        ))}
      </div>
    </div>
  </DashboardShell>
);

export default RiskPrediction;
