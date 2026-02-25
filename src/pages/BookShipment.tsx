import DashboardShell from "@/components/DashboardShell";
import { useState } from "react";
import { Package, MapPin, Calendar, Ship, Plane, Truck, ArrowRight, CheckCircle } from "lucide-react";

const BookShipment = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    origin: "", destination: "", cargo: "", mode: "", date: "",
  });

  const shipmentId = `FIQ-${Date.now().toString().slice(-7)}`;
  const riskScore = Math.floor(Math.random() * 60) + 15;
  const eta = `${Math.floor(Math.random() * 20) + 5} days`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <DashboardShell title="Book Shipment">
        <div className="max-w-lg mx-auto mt-12">
          <div className="rounded-2xl border border-border bg-card p-8 shadow-sm text-center">
            <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Shipment Booked!</h2>
            <p className="text-muted-foreground mb-6">Your shipment has been registered and risk analysis has begun.</p>
            
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="p-4 rounded-xl bg-muted/50 border border-border">
                <p className="text-xs text-muted-foreground mb-1">Shipment ID</p>
                <p className="font-mono font-bold text-sm">{shipmentId}</p>
              </div>
              <div className="p-4 rounded-xl bg-muted/50 border border-border">
                <p className="text-xs text-muted-foreground mb-1">Initial Risk</p>
                <p className={`font-bold text-sm ${riskScore <= 33 ? "risk-low" : riskScore <= 66 ? "risk-medium" : "risk-high"}`}>{riskScore}/100</p>
              </div>
              <div className="p-4 rounded-xl bg-muted/50 border border-border">
                <p className="text-xs text-muted-foreground mb-1">ETA</p>
                <p className="font-bold text-sm">{eta}</p>
              </div>
            </div>

            <button onClick={() => setSubmitted(false)} className="bg-primary text-primary-foreground px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-primary/90 transition-colors">
              Book Another
            </button>
          </div>
        </div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell title="Book Shipment">
      <div className="max-w-2xl mx-auto">
        <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Package className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="font-bold text-lg">New Shipment</h2>
              <p className="text-sm text-muted-foreground">Fill in shipment details to get risk assessment</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Origin Port / City</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <input required value={formData.origin} onChange={(e) => setFormData({...formData, origin: e.target.value})} placeholder="e.g., Shanghai, China" className="w-full h-11 rounded-lg bg-background border border-border pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Destination Port / City</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <input required value={formData.destination} onChange={(e) => setFormData({...formData, destination: e.target.value})} placeholder="e.g., Rotterdam, Netherlands" className="w-full h-11 rounded-lg bg-background border border-border pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Cargo Type</label>
                <select required value={formData.cargo} onChange={(e) => setFormData({...formData, cargo: e.target.value})} className="w-full h-11 rounded-lg bg-background border border-border px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
                  <option value="">Select</option>
                  <option>Perishable</option>
                  <option>Electronics</option>
                  <option>Pharma</option>
                  <option>General</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Mode</label>
                <select required value={formData.mode} onChange={(e) => setFormData({...formData, mode: e.target.value})} className="w-full h-11 rounded-lg bg-background border border-border px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
                  <option value="">Select</option>
                  <option>Sea</option>
                  <option>Air</option>
                  <option>Road</option>
                  <option>Multimodal</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Ship Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <input required type="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} className="w-full h-11 rounded-lg bg-background border border-border pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
                </div>
              </div>
            </div>

            <button type="submit" className="w-full h-12 rounded-lg bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors shadow-lg">
              Book Shipment <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </DashboardShell>
  );
};

export default BookShipment;
