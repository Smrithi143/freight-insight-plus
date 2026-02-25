import DashboardLayout from "@/components/DashboardLayout";
import StatCard from "@/components/StatCard";
import ShipmentTable from "@/components/ShipmentTable";
import { DelayChart, RiskPieChart } from "@/components/Charts";
import { Package, AlertTriangle, Clock, TrendingUp } from "lucide-react";

const alerts = [
  { severity: "high", message: "Port of Rotterdam congestion detected — 3 shipments affected", time: "12 min ago" },
  { severity: "medium", message: "Tropical storm advisory: Bay of Bengal — reroute recommended", time: "1h ago" },
  { severity: "low", message: "Carrier MSC schedule update: 0.5 day adjustment on EU-US routes", time: "3h ago" },
];

const severityColors: Record<string, string> = {
  high: "bg-destructive",
  medium: "bg-warning",
  low: "bg-primary",
};

const Dashboard = () => {
  return (
    <DashboardLayout type="user">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={Package} title="Active Shipments" value="1,284" change="+12% this week" changeType="positive" />
          <StatCard icon={AlertTriangle} title="At Risk" value="47" change="+3 since yesterday" changeType="negative" iconColor="text-destructive" />
          <StatCard icon={Clock} title="Avg Predicted Delay" value="1.8 days" change="-0.3 days" changeType="positive" iconColor="text-warning" />
          <StatCard icon={TrendingUp} title="On-Time Rate" value="94.2%" change="+1.2%" changeType="positive" iconColor="text-success" />
        </div>

        {/* Charts row */}
        <div className="grid lg:grid-cols-2 gap-6">
          <DelayChart />
          <RiskPieChart />
        </div>

        {/* Alerts */}
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="font-semibold text-sm mb-4">Recent Risk Alerts</h3>
          <div className="space-y-3">
            {alerts.map((alert, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30 border border-border/50">
                <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${severityColors[alert.severity]}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm">{alert.message}</p>
                  <span className="text-xs text-muted-foreground">{alert.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Shipments Table */}
        <ShipmentTable />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
