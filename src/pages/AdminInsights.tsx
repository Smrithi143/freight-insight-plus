import DashboardShell from "@/components/DashboardShell";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, BarChart, Bar } from "recharts";
import { TrendingUp, Brain, Target, AlertTriangle } from "lucide-react";

const delayTrends = [
  { month: "Sep", avg: 12 }, { month: "Oct", avg: 15 }, { month: "Nov", avg: 18 },
  { month: "Dec", avg: 22 }, { month: "Jan", avg: 16 }, { month: "Feb", avg: 14 },
];

const highRiskRoutes = [
  { route: "Shanghai → Rotterdam", risk: 82, delays: 24, incidents: 8 },
  { route: "Mumbai → Hamburg", risk: 65, delays: 15, incidents: 5 },
  { route: "LA → Tokyo", risk: 45, delays: 8, incidents: 2 },
  { route: "Dubai → London", risk: 58, delays: 12, incidents: 4 },
  { route: "Singapore → Sydney", risk: 32, delays: 5, incidents: 1 },
];

const accuracyData = [
  { week: "W1", accuracy: 91 }, { week: "W2", accuracy: 92.5 }, { week: "W3", accuracy: 93 },
  { week: "W4", accuracy: 93.8 }, { week: "W5", accuracy: 94.2 }, { week: "W6", accuracy: 94.5 },
];

const AdminInsights = () => (
  <DashboardShell title="Risk Insights">
    {/* KPI Cards */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {[
        { icon: TrendingUp, label: "Avg Delay Trend", value: "14 hrs", change: "-22% vs last month", color: "text-success" },
        { icon: AlertTriangle, label: "High-Risk Routes", value: "2", change: "Down from 4", color: "text-success" },
        { icon: Brain, label: "System Learning", value: "Active", change: "Model v3.2.1", color: "text-primary" },
        { icon: Target, label: "Model Accuracy", value: "94.5%", change: "+1.2% this month", color: "text-success" },
      ].map((kpi, i) => (
        <div key={i} className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <kpi.icon className="w-5 h-5 text-primary" />
          </div>
          <p className="text-2xl font-bold">{kpi.value}</p>
          <p className="text-sm text-muted-foreground">{kpi.label}</p>
          <p className={`text-xs mt-1 ${kpi.color}`}>{kpi.change}</p>
        </div>
      ))}
    </div>

    <div className="grid lg:grid-cols-2 gap-6 mb-6">
      {/* Delay Trends */}
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h3 className="font-semibold mb-4">Delay Trends (6 Months)</h3>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={delayTrends}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,15%,90%)" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Bar dataKey="avg" fill="hsl(215,90%,50%)" name="Avg Delay (hrs)" radius={[4,4,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Model Accuracy */}
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h3 className="font-semibold mb-4">Model Accuracy Trend</h3>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={accuracyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,15%,90%)" />
            <XAxis dataKey="week" tick={{ fontSize: 12 }} />
            <YAxis domain={[88, 96]} tick={{ fontSize: 12 }} />
            <Tooltip />
            <Line type="monotone" dataKey="accuracy" stroke="hsl(152,55%,42%)" strokeWidth={2} dot={{ r: 4 }} name="Accuracy %" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>

    {/* High-Risk Routes Table */}
    <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
      <div className="p-6 border-b border-border">
        <h3 className="font-semibold">High-Risk Routes</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              {["Route", "Risk Score", "Total Delays", "Incidents", "Status"].map(h => (
                <th key={h} className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {highRiskRoutes.map((r, i) => (
              <tr key={i} className="border-t border-border hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4 text-sm font-medium">{r.route}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${r.risk > 70 ? "bg-risk-high" : r.risk > 45 ? "bg-risk-medium" : "bg-risk-low"}`} />
                    <span className={`text-sm font-semibold ${r.risk > 70 ? "risk-high" : r.risk > 45 ? "risk-medium" : "risk-low"}`}>{r.risk}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm">{r.delays}</td>
                <td className="px-6 py-4 text-sm">{r.incidents}</td>
                <td className="px-6 py-4">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                    r.risk > 70 ? "bg-destructive/10 text-destructive" : r.risk > 45 ? "bg-warning/10 text-warning" : "bg-success/10 text-success"
                  }`}>{r.risk > 70 ? "Critical" : r.risk > 45 ? "Watch" : "Normal"}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </DashboardShell>
);

export default AdminInsights;
