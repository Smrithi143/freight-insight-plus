import { useState } from "react";
import DashboardShell from "@/components/DashboardShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DollarSign, ShieldCheck, Clock, Leaf, Star, ArrowRight, Zap } from "lucide-react";

interface Option {
  id: string;
  mode: string;
  carrier: string;
  cost: number;
  risk: number;
  days: number;
  co2: number;
  recommended: boolean;
}

const routeOptions: Record<string, Option[]> = {
  "shanghai-rotterdam": [
    { id: "1", mode: "Sea", carrier: "Maersk Line", cost: 3200, risk: 22, days: 28, co2: 420, recommended: true },
    { id: "2", mode: "Sea", carrier: "MSC", cost: 2900, risk: 31, days: 30, co2: 450, recommended: false },
    { id: "3", mode: "Air", carrier: "Emirates SkyCargo", cost: 12500, risk: 8, days: 3, co2: 2100, recommended: false },
    { id: "4", mode: "Multimodal", carrier: "DB Schenker", cost: 5800, risk: 18, days: 18, co2: 680, recommended: false },
  ],
  "la-tokyo": [
    { id: "5", mode: "Sea", carrier: "COSCO", cost: 2800, risk: 35, days: 14, co2: 380, recommended: false },
    { id: "6", mode: "Sea", carrier: "Hapag-Lloyd", cost: 3100, risk: 19, days: 13, co2: 360, recommended: true },
    { id: "7", mode: "Air", carrier: "FedEx Cargo", cost: 9800, risk: 6, days: 2, co2: 1800, recommended: false },
  ],
  "dubai-london": [
    { id: "8", mode: "Air", carrier: "British Airways Cargo", cost: 7200, risk: 10, days: 2, co2: 1500, recommended: false },
    { id: "9", mode: "Sea", carrier: "CMA CGM", cost: 2400, risk: 26, days: 21, co2: 350, recommended: true },
    { id: "10", mode: "Road", carrier: "DHL Freight", cost: 4100, risk: 15, days: 8, co2: 520, recommended: false },
  ],
};

const getRiskBadge = (risk: number) => {
  if (risk <= 15) return <Badge className="bg-risk-low/15 text-risk-low border-risk-low/30">Low Risk</Badge>;
  if (risk <= 30) return <Badge className="bg-risk-medium/15 text-risk-medium border-risk-medium/30">Medium</Badge>;
  return <Badge className="bg-risk-high/15 text-risk-high border-risk-high/30">High Risk</Badge>;
};

const CostRiskOptimizer = () => {
  const [route, setRoute] = useState("shanghai-rotterdam");
  const [selected, setSelected] = useState<string | null>(null);
  const options = routeOptions[route] || [];

  return (
    <DashboardShell title="Cost vs Risk Optimizer">
      <div className="space-y-6">
        <p className="text-muted-foreground">Compare shipping options by cost, risk, speed, and carbon footprint to find the optimal balance.</p>

        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-wrap items-end gap-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Route</label>
                <Select value={route} onValueChange={(v) => { setRoute(v); setSelected(null); }}>
                  <SelectTrigger className="w-[240px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="shanghai-rotterdam">Shanghai → Rotterdam</SelectItem>
                    <SelectItem value="la-tokyo">Los Angeles → Tokyo</SelectItem>
                    <SelectItem value="dubai-london">Dubai → London</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button variant="outline" size="sm" onClick={() => setSelected(options.find(o => o.recommended)?.id || null)}>
                <Zap className="w-4 h-4 mr-1" /> Auto-select Best
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {options.map((opt) => (
            <Card
              key={opt.id}
              className={`cursor-pointer transition-all hover:shadow-md ${selected === opt.id ? "ring-2 ring-primary border-primary" : ""} ${opt.recommended ? "border-risk-low/50" : ""}`}
              onClick={() => setSelected(opt.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{opt.carrier}</CardTitle>
                  {opt.recommended && (
                    <Badge className="bg-primary/10 text-primary border-primary/30">
                      <Star className="w-3 h-3 mr-1" /> Recommended
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{opt.mode}</Badge>
                  {getRiskBadge(opt.risk)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Cost</p>
                      <p className="font-bold">${opt.cost.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Risk Score</p>
                      <p className="font-bold">{opt.risk}/100</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Transit</p>
                      <p className="font-bold">{opt.days} days</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Leaf className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">CO₂</p>
                      <p className="font-bold">{opt.co2} kg</p>
                    </div>
                  </div>
                </div>

                {selected === opt.id && (
                  <Button className="w-full mt-4" size="sm">
                    Select This Option <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
};

export default CostRiskOptimizer;
