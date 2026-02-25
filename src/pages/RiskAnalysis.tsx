import DashboardShell from "@/components/DashboardShell";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const causes = [
  { cause: "Port Congestion", impact: 35, color: "hsl(0,72%,50%)" },
  { cause: "Weather Disruption", impact: 25, color: "hsl(38,92%,50%)" },
  { cause: "Route Instability", impact: 18, color: "hsl(215,90%,50%)" },
  { cause: "Customs Delay", impact: 14, color: "hsl(270,60%,50%)" },
  { cause: "Operational Issues", impact: 8, color: "hsl(152,55%,42%)" },
];

const congestionSeverity = [
  { port: "Shanghai", severity: 92, status: "Critical" },
  { port: "Rotterdam", severity: 45, status: "Moderate" },
  { port: "Singapore", severity: 28, status: "Normal" },
  { port: "LA/Long Beach", severity: 78, status: "High" },
  { port: "Hamburg", severity: 55, status: "Elevated" },
];

const RiskAnalysis = () => (
  <DashboardShell title="Risk Analysis">
    <div className="grid lg:grid-cols-2 gap-6 mb-6">
      {/* Impact Bars */}
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h3 className="font-semibold mb-6">Delay Cause Breakdown</h3>
        <div className="space-y-5">
          {causes.map((c, i) => (
            <div key={i}>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium">{c.cause}</span>
                <span className="font-bold">{c.impact}%</span>
              </div>
              <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all duration-500" style={{ width: `${c.impact}%`, backgroundColor: c.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h3 className="font-semibold mb-4">Impact Comparison</h3>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={causes} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,15%,90%)" />
            <XAxis type="number" tick={{ fontSize: 12 }} />
            <YAxis dataKey="cause" type="category" tick={{ fontSize: 11 }} width={120} />
            <Tooltip />
            <Bar dataKey="impact" radius={[0,4,4,0]}>
              {causes.map((entry, i) => (
                <rect key={i} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>

    {/* Congestion Severity */}
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
      <h3 className="font-semibold mb-4">Congestion Severity Indicator</h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {congestionSeverity.map((p, i) => (
          <div key={i} className="rounded-xl border border-border p-4 text-center">
            <p className="font-medium text-sm mb-2">{p.port}</p>
            <div className="relative w-20 h-20 mx-auto mb-2">
              <svg className="w-20 h-20 -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15.5" fill="none" stroke="hsl(220,15%,92%)" strokeWidth="3" />
                <circle cx="18" cy="18" r="15.5" fill="none" strokeWidth="3" strokeDasharray={`${p.severity} ${100 - p.severity}`}
                  stroke={p.severity > 70 ? "hsl(0,72%,50%)" : p.severity > 40 ? "hsl(38,92%,50%)" : "hsl(152,55%,42%)"}
                  strokeLinecap="round" />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-sm font-bold">{p.severity}</span>
            </div>
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
              p.severity > 70 ? "bg-destructive/10 text-destructive" : p.severity > 40 ? "bg-warning/10 text-warning" : "bg-success/10 text-success"
            }`}>{p.status}</span>
          </div>
        ))}
      </div>
    </div>
  </DashboardShell>
);

export default RiskAnalysis;
