import { AlertTriangle, CloudRain, Clock, Anchor } from "lucide-react";

const alerts = [
  { icon: Anchor, text: "Port Shanghai: Congestion Level HIGH — 12hr avg delay", type: "high" as const },
  { icon: CloudRain, text: "Typhoon Warning: South China Sea — Routes affected", type: "high" as const },
  { icon: Clock, text: "Rotterdam Port: Moderate delays — 4hr avg wait", type: "medium" as const },
  { icon: AlertTriangle, text: "Suez Canal: Traffic surge — 6hr additional transit", type: "medium" as const },
  { icon: CloudRain, text: "North Atlantic: Storm advisory — Sea routes impacted", type: "high" as const },
  { icon: Anchor, text: "Singapore Port: Operating normally — Low congestion", type: "low" as const },
  { icon: Clock, text: "LA/Long Beach: Berth availability limited — 8hr delay", type: "high" as const },
  { icon: AlertTriangle, text: "Hamburg Port: Customs processing delays reported", type: "medium" as const },
];

const typeColors = {
  high: "text-destructive",
  medium: "text-warning",
  low: "text-success",
};

const AlertTicker = () => (
  <div className="w-full overflow-hidden bg-card border-y border-border py-3">
    <div className="flex animate-scroll-left" style={{ width: "200%" }}>
      {[...alerts, ...alerts].map((alert, i) => (
        <div key={i} className="flex items-center gap-2 mx-8 whitespace-nowrap">
          <alert.icon className={`w-4 h-4 ${typeColors[alert.type]} shrink-0`} />
          <span className="text-sm text-muted-foreground">{alert.text}</span>
        </div>
      ))}
    </div>
  </div>
);

export default AlertTicker;
