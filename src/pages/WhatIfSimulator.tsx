import DashboardShell from "@/components/DashboardShell";
import RiskGauge from "@/components/RiskGauge";
import { useState } from "react";
import { FlaskConical, ArrowRight } from "lucide-react";

const routes = ["Shanghai → Rotterdam", "Mumbai → Hamburg", "LA → Tokyo", "Dubai → London", "Singapore → Sydney"];
const modes = ["Sea", "Air", "Road", "Multimodal"];

const WhatIfSimulator = () => {
  const [original] = useState({ route: routes[0], mode: "Sea", date: "2026-03-15", risk: 72 });
  const [sim, setSim] = useState({ route: routes[0], mode: "Sea", date: "2026-03-15" });
  const [simulated, setSimulated] = useState(false);

  const computeNewRisk = () => {
    let risk = original.risk;
    if (sim.route !== original.route) risk -= Math.floor(Math.random() * 20) + 5;
    if (sim.mode !== original.mode) {
      if (sim.mode === "Air") risk -= 25;
      else if (sim.mode === "Road") risk -= 10;
      else if (sim.mode === "Multimodal") risk -= 15;
    }
    if (sim.date !== original.date) risk -= Math.floor(Math.random() * 10);
    return Math.max(5, Math.min(95, risk));
  };

  const newRisk = computeNewRisk();

  return (
    <DashboardShell title="What-If Simulator">
      <div className="mb-6 p-4 rounded-xl border border-primary/20 bg-primary/5 flex items-center gap-3">
        <FlaskConical className="w-5 h-5 text-primary shrink-0" />
        <p className="text-sm"><span className="font-semibold">Simulation Mode</span> — Change route, mode, or date to see how risk changes. No actual changes will be made.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Controls */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h3 className="font-semibold mb-4">Adjust Parameters</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Route</label>
              <select value={sim.route} onChange={(e) => setSim({...sim, route: e.target.value})} className="w-full h-11 rounded-lg bg-background border border-border px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
                {routes.map(r => <option key={r}>{r}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Mode</label>
              <select value={sim.mode} onChange={(e) => setSim({...sim, mode: e.target.value})} className="w-full h-11 rounded-lg bg-background border border-border px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
                {modes.map(m => <option key={m}>{m}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Departure Date</label>
              <input type="date" value={sim.date} onChange={(e) => setSim({...sim, date: e.target.value})} className="w-full h-11 rounded-lg bg-background border border-border px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>
            <button onClick={() => setSimulated(true)} className="w-full h-11 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
              Run Simulation <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Comparison */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h3 className="font-semibold mb-6">Risk Comparison</h3>
          {simulated ? (
            <div className="flex items-center justify-around">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">Original</p>
                <RiskGauge value={original.risk} size={160} label="Current Risk" />
              </div>
              <ArrowRight className="w-6 h-6 text-muted-foreground" />
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">Simulated</p>
                <RiskGauge value={newRisk} size={160} label="New Risk" />
              </div>
            </div>
          ) : (
            <div className="h-48 flex items-center justify-center text-muted-foreground text-sm">
              Adjust parameters and click "Run Simulation" to compare risks
            </div>
          )}

          {simulated && (
            <div className="mt-6 p-4 rounded-lg bg-muted/50 border border-border">
              <div className="flex items-center justify-between text-sm">
                <span>Risk Reduction</span>
                <span className="font-bold text-success">-{original.risk - newRisk} points ({Math.round(((original.risk - newRisk) / original.risk) * 100)}%)</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardShell>
  );
};

export default WhatIfSimulator;
