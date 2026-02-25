import DashboardLayout from "@/components/DashboardLayout";
import StatCard from "@/components/StatCard";
import { AccuracyChart, RiskPieChart } from "@/components/Charts";
import { Users, Server, AlertTriangle, Globe, Activity, Shield, Truck } from "lucide-react";

const systemHealth = [
  { name: "ML Pipeline", status: "Operational", uptime: "99.98%" },
  { name: "Data Ingestion", status: "Operational", uptime: "99.95%" },
  { name: "Risk Engine", status: "Operational", uptime: "99.99%" },
  { name: "Notification Service", status: "Degraded", uptime: "98.20%" },
];

const recentUsers = [
  { name: "Maersk Logistics", role: "Enterprise", shipments: 342, lastActive: "2 min ago" },
  { name: "DHL Supply Chain", role: "Enterprise", shipments: 189, lastActive: "15 min ago" },
  { name: "Flexport Inc.", role: "Pro", shipments: 94, lastActive: "1h ago" },
  { name: "Kuehne+Nagel", role: "Enterprise", shipments: 267, lastActive: "3h ago" },
  { name: "DB Schenker", role: "Pro", shipments: 56, lastActive: "5h ago" },
];

const fleetData = [
  { type: "Container Ships", count: 847, inTransit: 623 },
  { type: "Cargo Aircraft", count: 234, inTransit: 178 },
  { type: "Rail Freight", count: 412, inTransit: 301 },
  { type: "Trucks", count: 1589, inTransit: 1102 },
];

const Admin = () => {
  return (
    <DashboardLayout type="admin">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={Users} title="Active Users" value="2,847" change="+156 this month" changeType="positive" />
          <StatCard icon={Globe} title="Global Shipments" value="24.8K" change="+8% MoM" changeType="positive" iconColor="text-success" />
          <StatCard icon={AlertTriangle} title="Active Alerts" value="23" change="5 critical" changeType="negative" iconColor="text-destructive" />
          <StatCard icon={Server} title="API Requests" value="14.2M/day" change="99.9% uptime" changeType="positive" iconColor="text-warning" />
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6">
          <AccuracyChart />
          <RiskPieChart />
        </div>

        {/* System Health + Users */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* System Health */}
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-4 h-4 text-primary" />
              <h3 className="font-semibold text-sm">System Health</h3>
            </div>
            <div className="space-y-3">
              {systemHealth.map((s, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 border border-border/50">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${s.status === "Operational" ? "bg-success" : "bg-warning"}`} />
                    <span className="text-sm">{s.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`text-xs font-medium ${s.status === "Operational" ? "text-success" : "text-warning"}`}>
                      {s.status}
                    </span>
                    <span className="text-xs text-muted-foreground font-mono">{s.uptime}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Fleet Overview */}
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center gap-2 mb-4">
              <Truck className="w-4 h-4 text-primary" />
              <h3 className="font-semibold text-sm">Fleet Overview</h3>
            </div>
            <div className="space-y-3">
              {fleetData.map((f, i) => (
                <div key={i} className="p-3 rounded-lg bg-secondary/30 border border-border/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">{f.type}</span>
                    <span className="text-xs text-muted-foreground">{f.inTransit}/{f.count} active</span>
                  </div>
                  <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${(f.inTransit / f.count) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" />
              <h3 className="font-semibold text-sm">Platform Users</h3>
            </div>
            <span className="text-xs text-muted-foreground">{recentUsers.length} users</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary/30">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground text-xs">Organization</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground text-xs">Plan</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground text-xs">Shipments</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground text-xs">Last Active</th>
                </tr>
              </thead>
              <tbody>
                {recentUsers.map((u, i) => (
                  <tr key={i} className="border-b border-border/50 hover:bg-secondary/20 transition-colors">
                    <td className="py-3 px-4 font-medium text-sm">{u.name}</td>
                    <td className="py-3 px-4">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${u.role === "Enterprise" ? "text-primary bg-primary/10" : "text-accent bg-accent/10"}`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm font-mono">{u.shipments}</td>
                    <td className="py-3 px-4 text-xs text-muted-foreground">{u.lastActive}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Admin;
