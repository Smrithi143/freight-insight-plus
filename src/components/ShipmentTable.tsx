const shipments = [
  { id: "FIQ-28491", origin: "Shanghai, CN", dest: "Los Angeles, US", mode: "Sea", status: "In Transit", risk: "Low", eta: "Mar 02", delay: "On Time", carrier: "Maersk" },
  { id: "FIQ-28492", origin: "Rotterdam, NL", dest: "New York, US", mode: "Sea", status: "In Transit", risk: "High", eta: "Mar 05", delay: "+3.2 days", carrier: "MSC" },
  { id: "FIQ-28493", origin: "Dubai, AE", dest: "Mumbai, IN", mode: "Air", status: "Customs", risk: "Medium", eta: "Feb 27", delay: "+0.5 days", carrier: "Emirates" },
  { id: "FIQ-28494", origin: "Hamburg, DE", dest: "Singapore, SG", mode: "Sea", status: "Loading", risk: "Low", eta: "Mar 12", delay: "On Time", carrier: "Hapag-Lloyd" },
  { id: "FIQ-28495", origin: "Tokyo, JP", dest: "Vancouver, CA", mode: "Sea", status: "In Transit", risk: "Medium", eta: "Mar 08", delay: "+1.1 days", carrier: "ONE" },
  { id: "FIQ-28496", origin: "São Paulo, BR", dest: "Antwerp, BE", mode: "Sea", status: "In Transit", risk: "High", eta: "Mar 10", delay: "+4.7 days", carrier: "CMA CGM" },
  { id: "FIQ-28497", origin: "Shenzhen, CN", dest: "London, UK", mode: "Rail", status: "In Transit", risk: "Low", eta: "Mar 04", delay: "On Time", carrier: "COSCO" },
];

const riskColors: Record<string, string> = {
  Low: "text-success bg-success/10",
  Medium: "text-warning bg-warning/10",
  High: "text-destructive bg-destructive/10",
};

const statusColors: Record<string, string> = {
  "In Transit": "text-primary bg-primary/10",
  Customs: "text-warning bg-warning/10",
  Loading: "text-muted-foreground bg-muted",
};

const ShipmentTable = () => {
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h3 className="font-semibold text-sm">Active Shipments</h3>
        <span className="text-xs text-muted-foreground">{shipments.length} shipments</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/30">
              <th className="text-left py-3 px-4 font-medium text-muted-foreground text-xs">ID</th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground text-xs">Route</th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground text-xs">Mode</th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground text-xs">Carrier</th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground text-xs">Status</th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground text-xs">Risk</th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground text-xs">ETA</th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground text-xs">Delay</th>
            </tr>
          </thead>
          <tbody>
            {shipments.map((s, i) => (
              <tr key={i} className="border-b border-border/50 hover:bg-secondary/20 transition-colors cursor-pointer">
                <td className="py-3 px-4 font-mono text-xs text-primary">{s.id}</td>
                <td className="py-3 px-4">
                  <div className="text-xs">{s.origin}</div>
                  <div className="text-xs text-muted-foreground">→ {s.dest}</div>
                </td>
                <td className="py-3 px-4 text-xs">{s.mode}</td>
                <td className="py-3 px-4 text-xs text-muted-foreground">{s.carrier}</td>
                <td className="py-3 px-4">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[s.status] || ""}`}>
                    {s.status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${riskColors[s.risk]}`}>
                    {s.risk}
                  </span>
                </td>
                <td className="py-3 px-4 text-xs">{s.eta}</td>
                <td className="py-3 px-4">
                  <span className={`text-xs font-mono font-medium ${s.delay === "On Time" ? "text-success" : "text-destructive"}`}>
                    {s.delay}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShipmentTable;
