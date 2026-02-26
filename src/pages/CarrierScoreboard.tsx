import DashboardShell from "@/components/DashboardShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, Star, TrendingUp, TrendingDown, Shield, Clock, AlertTriangle, Award } from "lucide-react";

const carriers = [
  { rank: 1, name: "Maersk Line", onTime: 94.2, damageRate: 0.3, riskScore: 18, reliability: 96, trend: "up", shipments: 12400, badge: "Elite" },
  { rank: 2, name: "CMA CGM", onTime: 91.8, damageRate: 0.5, riskScore: 22, reliability: 93, trend: "up", shipments: 9800, badge: "Premier" },
  { rank: 3, name: "MSC", onTime: 90.1, damageRate: 0.7, riskScore: 25, reliability: 91, trend: "stable", shipments: 11200, badge: "Premier" },
  { rank: 4, name: "Hapag-Lloyd", onTime: 88.5, damageRate: 0.6, riskScore: 28, reliability: 89, trend: "up", shipments: 7600, badge: "Trusted" },
  { rank: 5, name: "COSCO Shipping", onTime: 86.9, damageRate: 0.9, riskScore: 32, reliability: 86, trend: "down", shipments: 8900, badge: "Trusted" },
  { rank: 6, name: "Evergreen Marine", onTime: 85.3, damageRate: 1.1, riskScore: 35, reliability: 84, trend: "down", shipments: 6400, badge: "Standard" },
  { rank: 7, name: "ONE (Ocean Network)", onTime: 83.7, damageRate: 0.8, riskScore: 38, reliability: 82, trend: "stable", shipments: 5200, badge: "Standard" },
];

const badgeColors: Record<string, string> = {
  Elite: "bg-amber-100 text-amber-800 border-amber-300",
  Premier: "bg-blue-100 text-blue-800 border-blue-300",
  Trusted: "bg-emerald-100 text-emerald-800 border-emerald-300",
  Standard: "bg-muted text-muted-foreground border-border",
};

const getRiskColor = (score: number) => {
  if (score <= 20) return "text-risk-low";
  if (score <= 35) return "text-risk-medium";
  return "text-risk-high";
};

const CarrierScoreboard = () => (
  <DashboardShell title="Carrier Reliability Scoreboard">
    <div className="space-y-6">
      <p className="text-muted-foreground">Carriers ranked by on-time delivery, damage rate, and AI risk score — helping you pick the best partner.</p>

      {/* Top 3 podium */}
      <div className="grid md:grid-cols-3 gap-4">
        {carriers.slice(0, 3).map((c) => (
          <Card key={c.rank} className={c.rank === 1 ? "border-amber-300 bg-amber-50/50" : ""}>
            <CardContent className="pt-6 text-center">
              <div className="flex justify-center mb-3">
                {c.rank === 1 ? (
                  <Trophy className="w-10 h-10 text-amber-500" />
                ) : (
                  <Award className="w-8 h-8 text-muted-foreground" />
                )}
              </div>
              <p className="text-xs text-muted-foreground mb-1">#{c.rank}</p>
              <h3 className="font-bold text-lg mb-2">{c.name}</h3>
              <Badge className={`${badgeColors[c.badge]} mb-3`}>{c.badge}</Badge>
              <div className="grid grid-cols-2 gap-3 mt-4 text-sm">
                <div>
                  <p className="text-muted-foreground text-xs">On-Time</p>
                  <p className="font-bold text-risk-low">{c.onTime}%</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Risk Score</p>
                  <p className={`font-bold ${getRiskColor(c.riskScore)}`}>{c.riskScore}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Full table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Star className="w-4 h-4 text-primary" />
            Full Rankings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="pb-3 font-medium text-muted-foreground">#</th>
                  <th className="pb-3 font-medium text-muted-foreground">Carrier</th>
                  <th className="pb-3 font-medium text-muted-foreground">On-Time %</th>
                  <th className="pb-3 font-medium text-muted-foreground">Damage Rate</th>
                  <th className="pb-3 font-medium text-muted-foreground">Risk Score</th>
                  <th className="pb-3 font-medium text-muted-foreground">Reliability</th>
                  <th className="pb-3 font-medium text-muted-foreground">Trend</th>
                  <th className="pb-3 font-medium text-muted-foreground">Shipments</th>
                </tr>
              </thead>
              <tbody>
                {carriers.map((c) => (
                  <tr key={c.rank} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="py-3 font-bold">{c.rank}</td>
                    <td className="py-3 font-medium">{c.name}</td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <Progress value={c.onTime} className="w-16 h-2" />
                        <span>{c.onTime}%</span>
                      </div>
                    </td>
                    <td className="py-3">
                      <span className={c.damageRate > 0.8 ? "text-risk-high" : "text-risk-low"}>{c.damageRate}%</span>
                    </td>
                    <td className="py-3">
                      <span className={`font-semibold ${getRiskColor(c.riskScore)}`}>{c.riskScore}</span>
                    </td>
                    <td className="py-3">{c.reliability}%</td>
                    <td className="py-3">
                      {c.trend === "up" ? <TrendingUp className="w-4 h-4 text-risk-low" /> : c.trend === "down" ? <TrendingDown className="w-4 h-4 text-risk-high" /> : <Shield className="w-4 h-4 text-muted-foreground" />}
                    </td>
                    <td className="py-3 text-muted-foreground">{c.shipments.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  </DashboardShell>
);

export default CarrierScoreboard;
