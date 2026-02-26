import DashboardShell from "@/components/DashboardShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Leaf, TrendingDown, Ship, Plane, Truck, ArrowDown, Target } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const monthlyData = [
  { month: "Sep", co2: 18200 },
  { month: "Oct", co2: 17800 },
  { month: "Nov", co2: 16500 },
  { month: "Dec", co2: 15900 },
  { month: "Jan", co2: 14200 },
  { month: "Feb", co2: 13400 },
];

const modeBreakdown = [
  { name: "Sea", value: 58, co2: 7772, color: "hsl(var(--primary))" },
  { name: "Air", value: 25, co2: 3350, color: "hsl(var(--risk-high))" },
  { name: "Road", value: 12, co2: 1608, color: "hsl(var(--risk-medium))" },
  { name: "Rail", value: 5, co2: 670, color: "hsl(var(--risk-low))" },
];

const tips = [
  { icon: Ship, title: "Switch Air → Sea for non-urgent cargo", saving: "1,200 kg CO₂/shipment", impact: "high" },
  { icon: TrendingDown, title: "Use slow-steaming vessels on Pacific routes", saving: "340 kg CO₂/shipment", impact: "medium" },
  { icon: Truck, title: "Consolidate LTL shipments on EU routes", saving: "180 kg CO₂/trip", impact: "medium" },
];

const CarbonTracker = () => (
  <DashboardShell title="Carbon Footprint Tracker">
    <div className="space-y-6">
      <p className="text-muted-foreground">Monitor and reduce your logistics carbon emissions with AI-driven recommendations.</p>

      {/* KPI row */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total CO₂ This Month", value: "13,400 kg", icon: Leaf, sub: "↓ 5.6% vs last month" },
          { label: "CO₂ Per Shipment", value: "87 kg", icon: Target, sub: "Industry avg: 120 kg" },
          { label: "Green Score", value: "82/100", icon: TrendingDown, sub: "Top 15% in sector" },
          { label: "Reduction Target", value: "72%", icon: ArrowDown, sub: "of annual goal met" },
        ].map((kpi, i) => (
          <Card key={i}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-lg bg-risk-low/10 flex items-center justify-center">
                  <kpi.icon className="w-5 h-5 text-risk-low" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{kpi.label}</p>
                  <p className="text-xl font-bold">{kpi.value}</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">{kpi.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Monthly trend */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Monthly CO₂ Emissions (kg)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
                  <Bar dataKey="co2" fill="hsl(var(--risk-low))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Mode breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Emissions by Transport Mode</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6">
              <div className="h-[200px] w-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={modeBreakdown} dataKey="value" cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3}>
                      {modeBreakdown.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-3 flex-1">
                {modeBreakdown.map((m, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ background: m.color }} />
                      <span>{m.name}</span>
                    </div>
                    <span className="font-medium">{m.co2.toLocaleString()} kg</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI tips */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Leaf className="w-4 h-4 text-risk-low" /> AI Reduction Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {tips.map((tip, i) => (
            <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-muted/50 border border-border">
              <tip.icon className="w-5 h-5 text-primary shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium">{tip.title}</p>
                <p className="text-xs text-muted-foreground">Estimated saving: {tip.saving}</p>
              </div>
              <Badge variant={tip.impact === "high" ? "default" : "secondary"}>{tip.impact} impact</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  </DashboardShell>
);

export default CarbonTracker;
