import DashboardShell from "@/components/DashboardShell";
import { useState } from "react";
import { Bell, AlertTriangle, CloudRain, ArrowRightLeft, Send, CheckCircle } from "lucide-react";

const AdminAlerts = () => {
  const [sent, setSent] = useState<number[]>([]);

  const alertTypes = [
    { icon: AlertTriangle, type: "Congestion Alert", desc: "Notify all users about port congestion affecting their shipments.", severity: "High", color: "text-destructive", bg: "bg-destructive/10" },
    { icon: CloudRain, type: "Weather Delay", desc: "Broadcast weather disruption warning for affected routes.", severity: "Medium", color: "text-warning", bg: "bg-warning/10" },
    { icon: ArrowRightLeft, type: "Route Issue", desc: "Alert users about route instability or closures.", severity: "High", color: "text-destructive", bg: "bg-destructive/10" },
  ];

  const recentAlerts = [
    { type: "Congestion", message: "Shanghai port congestion — Level HIGH", time: "2 hours ago", recipients: 142 },
    { type: "Weather", message: "Typhoon warning — South China Sea routes", time: "5 hours ago", recipients: 89 },
    { type: "Route", message: "Suez Canal traffic surge advisory", time: "1 day ago", recipients: 234 },
  ];

  return (
    <DashboardShell title="Alert Management">
      <div className="mb-6 p-4 rounded-xl border border-primary/20 bg-primary/5 flex items-center gap-3">
        <Bell className="w-5 h-5 text-primary shrink-0" />
        <p className="text-sm"><span className="font-semibold">Alert Broadcast System</span> — Triggered alerts reflect instantly on all user dashboards.</p>
      </div>

      {/* Trigger Cards */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {alertTypes.map((a, i) => (
          <div key={i} className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <div className={`w-12 h-12 rounded-xl ${a.bg} flex items-center justify-center mb-4`}>
              <a.icon className={`w-6 h-6 ${a.color}`} />
            </div>
            <h3 className="font-semibold mb-1">{a.type}</h3>
            <p className="text-sm text-muted-foreground mb-4">{a.desc}</p>
            <div className="flex items-center justify-between">
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${a.bg} ${a.color}`}>{a.severity}</span>
              {sent.includes(i) ? (
                <span className="flex items-center gap-1 text-success text-sm font-medium"><CheckCircle className="w-4 h-4" /> Sent</span>
              ) : (
                <button onClick={() => setSent([...sent, i])} className="flex items-center gap-1.5 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
                  <Send className="w-3.5 h-3.5" /> Trigger
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Recent Alerts */}
      <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border">
          <h3 className="font-semibold">Recent Broadcast History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                {["Type", "Message", "Sent", "Recipients"].map(h => (
                  <th key={h} className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentAlerts.map((a, i) => (
                <tr key={i} className="border-t border-border">
                  <td className="px-6 py-4"><span className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary">{a.type}</span></td>
                  <td className="px-6 py-4 text-sm">{a.message}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{a.time}</td>
                  <td className="px-6 py-4 text-sm font-medium">{a.recipients}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardShell>
  );
};

export default AdminAlerts;
