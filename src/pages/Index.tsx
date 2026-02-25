import { Link } from "react-router-dom";
import { ArrowRight, Globe, Shield, Zap, BarChart3, Clock, AlertTriangle, TrendingUp, Anchor, Truck, Plane, Ship } from "lucide-react";
import Navbar from "@/components/Navbar";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0" style={{ background: "var(--gradient-glow)" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10 blur-3xl bg-primary" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-medium mb-6 animate-fade-in">
              <Zap className="w-3.5 h-3.5" />
              AI-Powered Freight Intelligence
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              Predict Delays.{" "}
              <span className="text-gradient">Assess Risk.</span>
              <br />
              Move Freight Smarter.
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Leverage machine learning and real-time global data to predict shipment delays, assess route risks, and optimize your entire supply chain before disruptions strike.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <Link
                to="/dashboard"
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-lg font-semibold text-base hover:bg-primary/90 transition-all hover:shadow-[var(--shadow-glow)]"
              >
                Launch Dashboard
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/admin"
                className="inline-flex items-center justify-center gap-2 border border-border text-foreground px-8 py-3.5 rounded-lg font-semibold text-base hover:bg-secondary transition-colors"
              >
                Admin Portal
              </Link>
            </div>
          </div>

          {/* Floating transport icons */}
          <div className="hidden lg:block">
            <div className="absolute left-16 top-48 animate-float opacity-20">
              <Anchor className="w-10 h-10 text-primary" />
            </div>
            <div className="absolute right-20 top-56 animate-float opacity-20" style={{ animationDelay: "2s" }}>
              <Truck className="w-10 h-10 text-accent" />
            </div>
            <div className="absolute left-32 bottom-20 animate-float opacity-20" style={{ animationDelay: "4s" }}>
              <Plane className="w-10 h-10 text-success" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section id="stats" className="border-y border-border bg-card/50">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "99.2%", label: "Prediction Accuracy", icon: TrendingUp },
              { value: "2.4M+", label: "Shipments Tracked", icon: Globe },
              { value: "< 50ms", label: "Risk Assessment", icon: Clock },
              { value: "142", label: "Countries Covered", icon: Shield },
            ].map((stat, i) => (
              <div key={i} className="text-center animate-fade-in" style={{ animationDelay: `${0.1 * i}s` }}>
                <stat.icon className="w-5 h-5 text-primary mx-auto mb-2" />
                <div className="text-2xl sm:text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Intelligent Freight Operations</h2>
            <p className="text-muted-foreground text-lg">
              End-to-end visibility and predictive analytics for every shipment across every mode.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: BarChart3,
                title: "Predictive Delay Analysis",
                desc: "ML models analyze weather, port congestion, customs data, and historical patterns to predict delays up to 72 hours ahead.",
                color: "text-primary",
              },
              {
                icon: AlertTriangle,
                title: "Risk Scoring Engine",
                desc: "Real-time risk scores for every route, carrier, and shipment based on 50+ dynamic risk factors worldwide.",
                color: "text-accent",
              },
              {
                icon: Globe,
                title: "Global Route Optimization",
                desc: "Analyze thousands of alternative routes instantly, factoring in cost, time, risk, and carbon footprint.",
                color: "text-success",
              },
              {
                icon: Shield,
                title: "Compliance & Customs Intel",
                desc: "Automated customs risk assessment with predictive clearance times for 142 countries.",
                color: "text-primary",
              },
              {
                icon: Clock,
                title: "Real-Time ETA Updates",
                desc: "Continuous ETA recalculation using live vessel AIS data, flight tracking, and ground transportation feeds.",
                color: "text-accent",
              },
              {
                icon: Zap,
                title: "Smart Alert System",
                desc: "Proactive notifications for potential disruptions with recommended mitigation actions and alternatives.",
                color: "text-success",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="p-6 rounded-xl bg-card border border-border card-hover animate-fade-in"
                style={{ animationDelay: `${0.1 * i}s` }}
              >
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center mb-4">
                  <feature.icon className={`w-5 h-5 ${feature.color}`} />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground text-lg">From data ingestion to actionable intelligence in milliseconds.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Data Ingestion", desc: "Aggregate real-time data from AIS, weather APIs, port systems, and carrier feeds." },
              { step: "02", title: "ML Processing", desc: "Our models process 500+ variables per shipment using deep learning architectures." },
              { step: "03", title: "Risk Assessment", desc: "Generate granular risk scores and delay predictions with confidence intervals." },
              { step: "04", title: "Action & Optimize", desc: "Receive alerts, reroute suggestions, and automated mitigation workflows." },
            ].map((item, i) => (
              <div key={i} className="text-center animate-fade-in" style={{ animationDelay: `${0.15 * i}s` }}>
                <div className="text-4xl font-black text-primary/20 mb-4 font-mono">{item.step}</div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center p-12 rounded-2xl border border-primary/20 bg-primary/5 relative overflow-hidden">
            <div className="absolute inset-0 bg-primary/5 blur-3xl" />
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Eliminate Supply Chain Blind Spots?</h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
                Join leading logistics companies using FreightIQ to predict disruptions and optimize global freight operations.
              </p>
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-lg font-semibold hover:bg-primary/90 transition-all hover:shadow-[var(--shadow-glow)]"
              >
                Start Free Trial
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-primary/20 flex items-center justify-center">
                <Ship className="w-4 h-4 text-primary" />
              </div>
              <span className="font-bold text-sm">FreightIQ</span>
            </div>
            <p className="text-xs text-muted-foreground">
              © 2026 FreightIQ. Predictive Delay & Risk Assessment for Global Freight.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
