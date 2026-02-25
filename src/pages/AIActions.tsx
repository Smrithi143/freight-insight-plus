import DashboardShell from "@/components/DashboardShell";
import { Brain, Anchor, ArrowRightLeft, Truck, ShieldAlert, TrendingDown, CheckCircle } from "lucide-react";

const actions = [
  {
    icon: Anchor,
    title: "Alternate Port Suggestion",
    desc: "Reroute from Shanghai to Ningbo-Zhoushan port to avoid congestion. Current wait time at Shanghai: 12hrs.",
    reduction: 35,
    original: 72,
    newRisk: 47,
    status: "Recommended",
  },
  {
    icon: ArrowRightLeft,
    title: "Rerouting via Alternate Route",
    desc: "Use southern corridor via Strait of Malacca instead of direct Pacific crossing to avoid typhoon zone.",
    reduction: 28,
    original: 72,
    newRisk: 52,
    status: "Suggested",
  },
  {
    icon: Truck,
    title: "Mode Change: Sea → Air",
    desc: "Switch perishable goods shipment FIQ-2024-001 from sea to air freight. Higher cost but 85% lower delay risk.",
    reduction: 55,
    original: 72,
    newRisk: 32,
    status: "High Impact",
  },
  {
    icon: ShieldAlert,
    title: "Priority Handling",
    desc: "Apply priority customs clearance and expedited port handling for pharma shipment FIQ-2024-004.",
    reduction: 18,
    original: 58,
    newRisk: 48,
    status: "Available",
  },
];

const AIActions = () => (
  <DashboardShell title="AI Action Recommendations">
    <div className="mb-6 p-4 rounded-xl border border-primary/20 bg-primary/5 flex items-center gap-3">
      <Brain className="w-5 h-5 text-primary shrink-0" />
      <p className="text-sm"><span className="font-semibold">AI Engine Active</span> — Analyzing 24 shipments across 8 routes. 4 action recommendations generated.</p>
    </div>

    <div className="grid gap-4">
      {actions.map((a, i) => (
        <div key={i} className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <a.icon className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-semibold text-lg">{a.title}</h3>
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary">{a.status}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">{a.desc}</p>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Risk:</span>
                  <span className="text-sm font-bold risk-high">{a.original}</span>
                  <span className="text-muted-foreground">→</span>
                  <span className="text-sm font-bold risk-low">{a.newRisk}</span>
                </div>
                <div className="flex items-center gap-1.5 text-success">
                  <TrendingDown className="w-4 h-4" />
                  <span className="text-sm font-semibold">-{a.reduction}% risk</span>
                </div>
                <button className="ml-auto flex items-center gap-1.5 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
                  <CheckCircle className="w-4 h-4" /> Apply Action
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </DashboardShell>
);

export default AIActions;
