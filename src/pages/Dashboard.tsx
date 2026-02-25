import DashboardShell from "@/components/DashboardShell";
import RiskGauge from "@/components/RiskGauge";
import { Package, HeartPulse, AlertTriangle, Brain, TrendingUp, Ship, Plane, Truck } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid, Legend } from "recharts";
import { useState, useEffect } from "react";

const shipments = [
  { id: "FIQ-2024-001", route: "Shanghai → Rotterdam", mode: "Sea", risk: 72, status: "In Transit", health: 65 },
  { id: "FIQ-2024-002", route: "Mumbai → Hamburg", mode: "Sea", risk: 45, status: "In Transit", health: 82 },
  { id: "FIQ-2024-003", route: "LA → Tokyo", mode: "Air", risk: 23, status: "Delivered", health: 95 },
  { id: "FIQ-2024-004", route: "Dubai → London", mode: "Air", risk: 58, status: "In Transit", health: 71 },
  { id: "FIQ-2024-005", route: "Singapore → Sydney", mode: "Sea", risk: 31, status: "In Transit", health: 88 },
];

const forecastData = [
  { day: "Mon", risk: 42, shipments: 12 },
  { day: "Tue", risk: 55, shipments: 15 },
  { day: "Wed", risk: 48, shipments: 11 },
  { day: "Thu", risk: 63, shipments: 18 },
  { day: "Fri", risk: 71, shipments: 14 },
  { day: "Sat", risk: 38, shipments: 8 },
  { day: "Sun", risk: 35, shipments: 6 },
];

const modeComparison = [
  { mode: "Sea", avgRisk: 52, avgDelay: 18, cost: 1200 },
  { mode: "Air", avgRisk: 28, avgDelay: 4, cost: 4500 },
  { mode: "Road", avgRisk: 38, avgDelay: 8, cost: 2100 },
  { mode: "Multi", avgRisk: 44, avgDelay: 12, cost: 1800 },
];

const getRiskColor = (risk: number) => {
  if (risk <= 33) return "bg-risk-low";
  if (risk <= 66) return "bg-risk-medium";
  return "bg-risk-high";
};

const getRiskText = (risk: number) => {
  if (risk <= 33) return "risk-low";
  if (risk <= 66) return "risk-medium";
  return "risk-high";
};

const Dashboard = () => {
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowAlert(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <DashboardShell title="Dashboard">
      {/* Popup Alert */}
      {showAlert && (
        <div className="mb-6 p-4 rounded-xl border border-destructive/30 bg-destructive/5 flex items-start gap-3 animate-fade-in">
          <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-semibold text-sm text-destructive">⚠️ High Risk Alert: Shanghai Port Congestion</p>
            <p className="text-sm text-muted-foreground mt-1">Average delay of 12 hours reported. 3 shipments affected. Weather disruption expected in South China Sea.</p>
          </div>
          <button onClick={() => setShowAlert(false)} className="text-muted-foreground hover:text-foreground text-sm">✕</button>
        </div>
      )}

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Active Shipments", value: "24", icon: Package, change: "+3 today", color: "text-primary" },
          { label: "Health Score", value: "78%", icon: HeartPulse, change: "Good", color: "text-success" },
          { label: "Risk Alerts", value: "12%", icon: AlertTriangle, change: "3 active", color: "text-warning" },
          { label: "AI Confidence", value: "94.2%", icon: Brain, change: "High", color: "text-primary" },
        ].map((stat, i) => (
          <div key={i} className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">{stat.label}</span>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <div className="text-3xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Risk Gauge + Risk Levels */}
      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm flex flex-col items-center justify-center">
          <RiskGauge value={58} size={200} label="Overall Risk Score" />
        </div>

        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h3 className="font-semibold mb-4">Risk Level Distribution</h3>
          <div className="space-y-4">
            {[
              { label: "Low Risk", count: 14, pct: 58, color: "bg-risk-low" },
              { label: "Medium Risk", count: 7, pct: 29, color: "bg-risk-medium" },
              { label: "High Risk", count: 3, pct: 13, color: "bg-risk-high" },
            ].map((level, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium">{level.label}</span>
                  <span className="text-muted-foreground">{level.count} ({level.pct}%)</span>
                </div>
                <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden">
                  <div className={`h-full ${level.color} rounded-full`} style={{ width: `${level.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h3 className="font-semibold mb-4">7-Day Risk Forecast</h3>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={forecastData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,15%,90%)" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line type="monotone" dataKey="risk" stroke="hsl(215,90%,50%)" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Mode Comparison */}
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary" /> Comparative Mode Risk
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={modeComparison}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,15%,90%)" />
              <XAxis dataKey="mode" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="avgRisk" fill="hsl(215,90%,50%)" name="Avg Risk" radius={[4,4,0,0]} />
              <Bar dataKey="avgDelay" fill="hsl(38,92%,50%)" name="Avg Delay (hrs)" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Smart Timeline */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h3 className="font-semibold mb-4">Smart Risk Timeline</h3>
          <div className="space-y-3">
            {[
              { time: "2h ago", event: "Port Shanghai congestion alert triggered", risk: "high" },
              { time: "5h ago", event: "Typhoon warning issued for South China Sea", risk: "high" },
              { time: "8h ago", event: "FIQ-2024-002 cleared customs in Suez", risk: "low" },
              { time: "12h ago", event: "Mode change recommended for FIQ-2024-004", risk: "medium" },
              { time: "1d ago", event: "All Rotterdam shipments on schedule", risk: "low" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className={`w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 ${item.risk === "high" ? "bg-risk-high" : item.risk === "medium" ? "bg-risk-medium" : "bg-risk-low"}`} />
                <div>
                  <p className="text-sm">{item.event}</p>
                  <p className="text-xs text-muted-foreground">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Shipments Table */}
      <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border">
          <h3 className="font-semibold">Active Shipments</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                {["Shipment ID", "Route", "Mode", "Risk", "Health", "Status"].map((h) => (
                  <th key={h} className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {shipments.map((s) => (
                <tr key={s.id} className="border-t border-border hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 text-sm font-mono font-medium">{s.id}</td>
                  <td className="px-6 py-4 text-sm">{s.route}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className="inline-flex items-center gap-1">
                      {s.mode === "Sea" ? <Ship className="w-3.5 h-3.5" /> : s.mode === "Air" ? <Plane className="w-3.5 h-3.5" /> : <Truck className="w-3.5 h-3.5" />}
                      {s.mode}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${getRiskColor(s.risk)}`} />
                      <span className={`text-sm font-semibold ${getRiskText(s.risk)}`}>{s.risk}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${s.health > 75 ? "bg-risk-low" : s.health > 50 ? "bg-risk-medium" : "bg-risk-high"}`} style={{ width: `${s.health}%` }} />
                      </div>
                      <span className="text-xs text-muted-foreground">{s.health}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${s.status === "Delivered" ? "bg-success/10 text-success" : "bg-primary/10 text-primary"}`}>
                      {s.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardShell>
  );
};

export default Dashboard;
