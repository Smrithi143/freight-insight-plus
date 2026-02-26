import DashboardShell from "@/components/DashboardShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, AlertTriangle, Clock, Ship, Anchor, Truck, MapPin, CloudRain, ShieldAlert } from "lucide-react";

const shipments = [
  {
    id: "FIQ-7821",
    route: "Shanghai → Rotterdam",
    mode: "Sea",
    status: "In Transit",
    events: [
      { time: "Feb 20, 06:00", label: "Departed Shanghai Port", icon: Ship, type: "success" as const },
      { time: "Feb 21, 14:30", label: "Passed East China Sea checkpoint", icon: MapPin, type: "success" as const },
      { time: "Feb 22, 09:15", label: "Weather alert: Tropical storm detected ahead", icon: CloudRain, type: "warning" as const },
      { time: "Feb 23, 11:00", label: "Route adjusted to avoid storm zone", icon: ShieldAlert, type: "info" as const },
      { time: "Feb 24, 08:00", label: "Entered Strait of Malacca", icon: Anchor, type: "success" as const },
      { time: "Feb 26, current", label: "In Indian Ocean — ETA recalculated", icon: Clock, type: "pending" as const },
    ],
  },
  {
    id: "FIQ-7835",
    route: "Los Angeles → Tokyo",
    mode: "Sea",
    status: "At Port",
    events: [
      { time: "Feb 18, 10:00", label: "Cargo loaded at LA Terminal", icon: Truck, type: "success" as const },
      { time: "Feb 18, 18:00", label: "Customs clearance completed", icon: CheckCircle2, type: "success" as const },
      { time: "Feb 19, 06:00", label: "Departed Los Angeles", icon: Ship, type: "success" as const },
      { time: "Feb 22, 12:00", label: "Port congestion alert at Tokyo Bay", icon: AlertTriangle, type: "danger" as const },
      { time: "Feb 25, 09:00", label: "Arrived at Tokyo — waiting for berth", icon: Anchor, type: "pending" as const },
    ],
  },
];

const typeStyles = {
  success: "bg-risk-low/15 text-risk-low border-risk-low/30",
  warning: "bg-risk-medium/15 text-risk-medium border-risk-medium/30",
  danger: "bg-risk-high/15 text-risk-high border-risk-high/30",
  info: "bg-primary/10 text-primary border-primary/30",
  pending: "bg-muted text-muted-foreground border-border",
};

const dotColor = {
  success: "bg-risk-low",
  warning: "bg-risk-medium",
  danger: "bg-risk-high",
  info: "bg-primary",
  pending: "bg-muted-foreground",
};

const ShipmentTimeline = () => (
  <DashboardShell title="Live Shipment Timeline">
    <div className="space-y-6">
      <p className="text-muted-foreground">Real-time journey tracking with risk events, route changes, and milestone updates.</p>

      {shipments.map((shipment) => (
        <Card key={shipment.id}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Ship className="w-5 h-5 text-primary" />
                {shipment.id} — {shipment.route}
              </CardTitle>
              <Badge variant={shipment.status === "In Transit" ? "default" : "secondary"}>{shipment.status}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="relative ml-4">
              {/* Vertical line */}
              <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-border" />

              <div className="space-y-4">
                {shipment.events.map((event, i) => (
                  <div key={i} className="relative flex items-start gap-4 pl-6">
                    {/* Dot */}
                    <div className={`absolute left-0 top-1.5 w-4 h-4 rounded-full border-2 border-background ${dotColor[event.type]} ring-2 ring-background`} />

                    <div className={`flex-1 px-4 py-3 rounded-xl border ${typeStyles[event.type]}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <event.icon className="w-4 h-4" />
                        <span className="font-medium text-sm">{event.label}</span>
                      </div>
                      <span className="text-xs opacity-70">{event.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </DashboardShell>
);

export default ShipmentTimeline;
