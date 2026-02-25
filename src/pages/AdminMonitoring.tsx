import DashboardShell from "@/components/DashboardShell";
import { Globe, AlertTriangle, CloudRain, ShieldAlert, Landmark } from "lucide-react";

const zones = [
  { port: "Shanghai", lat: "31.2°N", lng: "121.5°E", congestion: 92, weather: "Typhoon Warning", strikes: false, political: "Low" },
  { port: "Rotterdam", lat: "51.9°N", lng: "4.5°E", congestion: 45, weather: "Clear", strikes: true, political: "Low" },
  { port: "Singapore", lat: "1.3°N", lng: "103.8°E", congestion: 28, weather: "Clear", strikes: false, political: "Low" },
  { port: "LA/Long Beach", lat: "33.7°N", lng: "118.2°W", congestion: 78, weather: "Clear", strikes: false, political: "Medium" },
  { port: "Hamburg", lat: "53.5°N", lng: "10.0°E", congestion: 55, weather: "Storm Advisory", strikes: false, political: "Low" },
  { port: "Dubai", lat: "25.3°N", lng: "55.3°E", congestion: 32, weather: "Clear", strikes: false, political: "Medium" },
];

const AdminMonitoring = () => (
  <DashboardShell title="Global Monitoring">
    <div className="mb-6 p-4 rounded-xl border border-primary/20 bg-primary/5 flex items-center gap-3">
      <Globe className="w-5 h-5 text-primary shrink-0" />
      <p className="text-sm"><span className="font-semibold">Global Port Monitoring</span> — Real-time status of major shipping ports worldwide.</p>
    </div>

    {/* Summary Cards */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {[
        { icon: AlertTriangle, label: "Congestion Alerts", value: "3", color: "text-destructive", bg: "bg-destructive/10" },
        { icon: CloudRain, label: "Weather Alerts", value: "2", color: "text-warning", bg: "bg-warning/10" },
        { icon: ShieldAlert, label: "Strike Alerts", value: "1", color: "text-primary", bg: "bg-primary/10" },
        { icon: Landmark, label: "Political Risks", value: "2", color: "text-muted-foreground", bg: "bg-muted" },
      ].map((c, i) => (
        <div key={i} className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <div className={`w-10 h-10 rounded-lg ${c.bg} flex items-center justify-center mb-3`}>
            <c.icon className={`w-5 h-5 ${c.color}`} />
          </div>
          <p className="text-2xl font-bold">{c.value}</p>
          <p className="text-sm text-muted-foreground">{c.label}</p>
        </div>
      ))}
    </div>

    {/* Port Grid */}
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {zones.map((z, i) => (
        <div key={i} className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">{z.port}</h3>
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
              z.congestion > 70 ? "bg-destructive/10 text-destructive" : z.congestion > 40 ? "bg-warning/10 text-warning" : "bg-success/10 text-success"
            }`}>
              {z.congestion > 70 ? "Critical" : z.congestion > 40 ? "Moderate" : "Normal"}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mb-3">{z.lat}, {z.lng}</p>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Congestion</span>
              <span className="font-medium">{z.congestion}%</span>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div className={`h-full rounded-full ${z.congestion > 70 ? "bg-risk-high" : z.congestion > 40 ? "bg-risk-medium" : "bg-risk-low"}`} style={{ width: `${z.congestion}%` }} />
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Weather</span>
              <span className={`font-medium ${z.weather !== "Clear" ? "risk-high" : ""}`}>{z.weather}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Strikes</span>
              <span className={`font-medium ${z.strikes ? "risk-high" : "risk-low"}`}>{z.strikes ? "Active" : "None"}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Political Risk</span>
              <span className="font-medium">{z.political}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </DashboardShell>
);

export default AdminMonitoring;
