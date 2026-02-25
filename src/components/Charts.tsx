import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";

const delayData = [
  { name: "Mon", predicted: 2.1, actual: 2.4 },
  { name: "Tue", predicted: 1.8, actual: 1.6 },
  { name: "Wed", predicted: 3.2, actual: 3.5 },
  { name: "Thu", predicted: 1.5, actual: 1.3 },
  { name: "Fri", predicted: 2.8, actual: 3.1 },
  { name: "Sat", predicted: 1.2, actual: 1.0 },
  { name: "Sun", predicted: 0.8, actual: 0.9 },
];

const riskDistribution = [
  { name: "Low", value: 62, color: "hsl(152, 60%, 45%)" },
  { name: "Medium", value: 25, color: "hsl(38, 95%, 55%)" },
  { name: "High", value: 13, color: "hsl(0, 72%, 55%)" },
];

const tooltipStyle = {
  backgroundColor: "hsl(222, 22%, 9%)",
  border: "1px solid hsl(215, 18%, 16%)",
  borderRadius: "8px",
  fontSize: "12px",
};

export const DelayChart = () => (
  <div className="rounded-xl border border-border bg-card p-5">
    <h3 className="font-semibold text-sm mb-4">Delay Predictions vs Actual (days)</h3>
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={delayData}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(215, 18%, 16%)" />
        <XAxis dataKey="name" tick={{ fontSize: 11, fill: "hsl(215, 15%, 55%)" }} axisLine={false} />
        <YAxis tick={{ fontSize: 11, fill: "hsl(215, 15%, 55%)" }} axisLine={false} />
        <Tooltip contentStyle={tooltipStyle} />
        <Bar dataKey="predicted" fill="hsl(210, 100%, 55%)" radius={[4, 4, 0, 0]} name="Predicted" />
        <Bar dataKey="actual" fill="hsl(210, 100%, 55%, 0.4)" radius={[4, 4, 0, 0]} name="Actual" />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export const RiskPieChart = () => (
  <div className="rounded-xl border border-border bg-card p-5">
    <h3 className="font-semibold text-sm mb-4">Risk Distribution</h3>
    <ResponsiveContainer width="100%" height={240}>
      <PieChart>
        <Pie data={riskDistribution} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={4} dataKey="value">
          {riskDistribution.map((entry, i) => (
            <Cell key={i} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip contentStyle={tooltipStyle} />
      </PieChart>
    </ResponsiveContainer>
    <div className="flex justify-center gap-4 mt-2">
      {riskDistribution.map((r, i) => (
        <div key={i} className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: r.color }} />
          {r.name} ({r.value}%)
        </div>
      ))}
    </div>
  </div>
);

const performanceData = [
  { name: "Jan", accuracy: 96.2 }, { name: "Feb", accuracy: 97.1 }, { name: "Mar", accuracy: 97.8 },
  { name: "Apr", accuracy: 98.2 }, { name: "May", accuracy: 98.5 }, { name: "Jun", accuracy: 99.0 },
  { name: "Jul", accuracy: 99.2 },
];

export const AccuracyChart = () => (
  <div className="rounded-xl border border-border bg-card p-5">
    <h3 className="font-semibold text-sm mb-4">Model Accuracy Trend (%)</h3>
    <ResponsiveContainer width="100%" height={240}>
      <LineChart data={performanceData}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(215, 18%, 16%)" />
        <XAxis dataKey="name" tick={{ fontSize: 11, fill: "hsl(215, 15%, 55%)" }} axisLine={false} />
        <YAxis domain={[95, 100]} tick={{ fontSize: 11, fill: "hsl(215, 15%, 55%)" }} axisLine={false} />
        <Tooltip contentStyle={tooltipStyle} />
        <Line type="monotone" dataKey="accuracy" stroke="hsl(152, 60%, 45%)" strokeWidth={2} dot={{ fill: "hsl(152, 60%, 45%)", r: 3 }} />
      </LineChart>
    </ResponsiveContainer>
  </div>
);
