import DashboardShell from "@/components/DashboardShell";
import { Brain, Clock, TrendingUp, AlertTriangle, Ship, Plane, Truck, Zap, Target, Activity } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, AreaChart, Area, BarChart, Bar, Legend } from "recharts";
import { useState } from "react";

const shipments = [
  { id: "FIQ-2024-001", route: "Shanghai → Rotterdam", mode: "Sea", currentETA: "Mar 12, 14:00", mlETA: "Mar 13, 02:00", delayHrs: 12, confidence: 91, risk: 72 },
  { id: "FIQ-2024-002", route: "Mumbai → Hamburg", mode: "Sea", currentETA: "Mar 15, 08:00", mlETA: "Mar 15, 11:30", delayHrs: 3.5, confidence: 94, risk: 45 },
  { id: "FIQ-2024-003", route: "LA → Tokyo", mode: "Air", currentETA: "Mar 8, 20:00", mlETA: "Mar 8, 20:30", delayHrs: 0.5, confidence: 97, risk: 12 },
  { id: "FIQ-2024-004", route: "Dubai → London", mode: "Air", currentETA: "Mar 9, 06:00", mlETA: "Mar 9, 14:00", delayHrs: 8, confidence: 88, risk: 58 },
  { id: "FIQ-2024-005", route: "Singapore → Sydney", mode: "Sea", currentETA: "Mar 11, 16:00", mlETA: "Mar 11, 18:00", delayHrs: 2, confidence: 96, risk: 22 },
];

const hourlyForecast = Array.from({ length: 72 }, (_, i) => {
  const base = 35 + Math.sin(i / 8) * 20 + Math.random() * 10;
  return {
    hour: i,
    label: `${i}h`,
    riskScore: Math.min(100, Math.max(5, Math.round(base))),
    delayProb: Math.min(100, Math.max(2, Math.round(base * 0.8 + Math.random() * 15))),
    congestion: Math.min(100, Math.max(5, Math.round(base * 0.6 + Math.random() * 20))),
  };
});

const modelMetrics = [
  { name: "LSTM Network", accuracy: 94.2, mae: 1.8, rmse: 2.4 },
  { name: "XGBoost", accuracy: 91.7, mae: 2.3, rmse: 3.1 },
  { name: "Random Forest", accuracy: 89.4, mae: 2.8, rmse: 3.6 },
  { name: "Ensemble (Active)", accuracy: 96.1, mae: 1.2, rmse: 1.7 },
];

const featureImportance = [
  { feature: "Port Congestion", importance: 28 },
  { feature: "Weather Conditions", importance: 22 },
  { feature: "Historical Delays", importance: 18 },
  { feature: "Vessel Speed", importance: 14 },
  { feature: "Route Distance", importance: 10 },
  { feature: "Customs Processing", importance: 8 },
];

const getModeIcon = (mode: string) => {
  if (mode === "Sea") return Ship;
  if (mode === "Air") return Plane;
  return Truck;
};

const MLPrediction = () => {
  const [selectedShipment, setSelectedShipment] = useState(shipments[0]);

  return (
    <DashboardShell title="ML ETA Prediction — 72hr Forecast">
      {/* Model Status Banner */}
      <div className="mb-6 p-4 rounded-xl border border-primary/20 bg-primary/5 flex items-center gap-3">
        <Brain className="w-5 h-5 text-primary shrink-0" />
        <div className="flex-1">
          <p className="font-semibold text-sm">Ensemble ML Model Active — 96.1% Accuracy</p>
          <p className="text-xs text-muted-foreground">LSTM + XGBoost + Random Forest | Last trained: 2 hours ago | Next update in 4 hours</p>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-risk-low animate-pulse" />
          <span className="text-xs font-medium text-muted-foreground">Live</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Model Accuracy", value: "96.1%", icon: Target, desc: "Ensemble model", accent: "text-primary" },
          { label: "Avg Prediction Error", value: "1.2 hrs", icon: Clock, desc: "MAE across fleet", accent: "text-success" },
          { label: "Shipments Tracked", value: "24", icon: Activity, desc: "Real-time monitoring", accent: "text-primary" },
          { label: "Alerts Predicted", value: "7", icon: AlertTriangle, desc: "Next 72 hours", accent: "text-warning" },
        ].map((stat, i) => (
          <div key={i} className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-muted-foreground">{stat.label}</span>
              <stat.icon className={`w-4 h-4 ${stat.accent}`} />
            </div>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{stat.desc}</p>
          </div>
        ))}
      </div>

      {/* 72-Hour Forecast Chart */}
      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 rounded-xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold flex items-center gap-2">
                <Zap className="w-4 h-4 text-primary" /> 72-Hour Risk & Delay Forecast
              </h3>
              <p className="text-xs text-muted-foreground mt-1">ML-predicted risk score and delay probability over the next 72 hours</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={hourlyForecast.filter((_, i) => i % 3 === 0)}>
              <defs>
                <linearGradient id="riskGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(215,90%,50%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(215,90%,50%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="delayGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(38,92%,50%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(38,92%,50%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,15%,90%)" />
              <XAxis dataKey="label" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="riskScore" name="Risk Score" stroke="hsl(215,90%,50%)" fill="url(#riskGrad)" strokeWidth={2} />
              <Area type="monotone" dataKey="delayProb" name="Delay Probability %" stroke="hsl(38,92%,50%)" fill="url(#delayGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Feature Importance */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Brain className="w-4 h-4 text-primary" /> Feature Importance
          </h3>
          <div className="space-y-3">
            {featureImportance.map((f, i) => (
              <div key={i}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium">{f.feature}</span>
                  <span className="text-muted-foreground">{f.importance}%</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${f.importance}%`, opacity: 0.5 + (f.importance / 56) }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Shipment ETA Predictions Table */}
      <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden mb-6">
        <div className="p-6 border-b border-border">
          <h3 className="font-semibold flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" /> ML-Predicted ETA — Per Shipment
          </h3>
          <p className="text-xs text-muted-foreground mt-1">Comparing scheduled ETA vs ML-predicted ETA with confidence scores</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                {["Shipment", "Route", "Mode", "Scheduled ETA", "ML Predicted ETA", "Predicted Delay", "Confidence", "Risk"].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {shipments.map(s => {
                const Icon = getModeIcon(s.mode);
                return (
                  <tr key={s.id} onClick={() => setSelectedShipment(s)} className={`border-t border-border cursor-pointer transition-colors ${selectedShipment.id === s.id ? "bg-primary/5" : "hover:bg-muted/30"}`}>
                    <td className="px-5 py-4 text-sm font-mono font-medium">{s.id}</td>
                    <td className="px-5 py-4 text-sm">{s.route}</td>
                    <td className="px-5 py-4 text-sm"><span className="inline-flex items-center gap-1"><Icon className="w-3.5 h-3.5" />{s.mode}</span></td>
                    <td className="px-5 py-4 text-sm text-muted-foreground">{s.currentETA}</td>
                    <td className="px-5 py-4 text-sm font-semibold">{s.mlETA}</td>
                    <td className="px-5 py-4">
                      <span className={`text-sm font-bold ${s.delayHrs > 6 ? "risk-high" : s.delayHrs > 2 ? "risk-medium" : "risk-low"}`}>
                        +{s.delayHrs}h
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-12 h-1.5 bg-muted rounded-full overflow-hidden">
                          <div className="h-full rounded-full bg-primary" style={{ width: `${s.confidence}%` }} />
                        </div>
                        <span className="text-xs font-medium">{s.confidence}%</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${s.risk > 60 ? "bg-destructive/10 text-destructive" : s.risk > 30 ? "bg-warning/10 text-warning" : "bg-success/10 text-success"}`}>
                        {s.risk}/100
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Model Performance Comparison */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary" /> Model Performance Comparison
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={modelMetrics}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,15%,90%)" />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="accuracy" name="Accuracy %" fill="hsl(215,90%,50%)" radius={[4,4,0,0]} />
              <Bar dataKey="mae" name="MAE (hrs)" fill="hsl(38,92%,50%)" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Congestion Heatmap Timeline */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h3 className="font-semibold mb-4">72hr Congestion Severity Timeline</h3>
          <div className="space-y-2">
            {[
              { port: "Shanghai", data: [85, 78, 90, 72, 65, 80, 88, 70, 60, 55, 50, 45] },
              { port: "Rotterdam", data: [30, 35, 40, 45, 50, 42, 38, 35, 30, 28, 25, 22] },
              { port: "Singapore", data: [20, 25, 30, 28, 22, 18, 15, 20, 25, 30, 28, 22] },
              { port: "Hamburg", data: [45, 50, 55, 60, 58, 52, 48, 45, 42, 40, 38, 35] },
              { port: "Dubai", data: [15, 18, 20, 22, 25, 28, 30, 28, 25, 22, 20, 18] },
            ].map((port, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-xs w-20 shrink-0 font-medium">{port.port}</span>
                <div className="flex-1 flex gap-0.5">
                  {port.data.map((v, j) => (
                    <div
                      key={j}
                      className="flex-1 h-6 rounded-sm"
                      title={`${j * 6}h: ${v}% congestion`}
                      style={{
                        backgroundColor: v > 70 ? "hsl(0,72%,51%)" : v > 45 ? "hsl(38,92%,50%)" : "hsl(142,71%,45%)",
                        opacity: 0.4 + (v / 150),
                      }}
                    />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground w-8">{port.data[port.data.length - 1]}%</span>
              </div>
            ))}
            <div className="flex justify-between text-[10px] text-muted-foreground mt-1 pl-[92px] pr-8">
              <span>Now</span><span>24h</span><span>48h</span><span>72h</span>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
};

export default MLPrediction;
