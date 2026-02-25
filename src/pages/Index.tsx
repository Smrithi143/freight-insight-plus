import { Link } from "react-router-dom";
import { ArrowRight, Shield, Zap, BarChart3, Clock, TrendingUp, Globe as GlobeIcon } from "lucide-react";
import { Suspense, lazy } from "react";
import AlertTicker from "@/components/AlertTicker";

const Globe = lazy(() => import("@/components/Globe"));

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 border-b border-border bg-card/90 backdrop-blur">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <GlobeIcon className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg">FreightIQ</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/signin" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-4 py-2">
              Sign In
            </Link>
            <Link to="/signup" className="text-sm font-medium bg-primary text-primary-foreground px-5 py-2 rounded-lg hover:bg-primary/90 transition-colors">
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Alert Ticker */}
      <div className="pt-16">
        <AlertTicker />
      </div>

      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[500px]">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-medium mb-6">
                <Zap className="w-3.5 h-3.5" />
                AI-Powered Freight Intelligence Platform
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-6 text-foreground leading-tight">
                Smarter Freight{" "}
                <span className="text-gradient">Decisions</span>{" "}
                Start Here
              </h1>

              <p className="text-lg text-muted-foreground max-w-xl mb-8 leading-relaxed">
                Predicting shipment delays and risk before they occur. Leverage machine learning and real-time global data to optimize your entire supply chain.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/signup"
                  className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-lg font-semibold text-base hover:bg-primary/90 transition-all shadow-lg"
                >
                  Sign Up Free
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/signin"
                  className="inline-flex items-center justify-center gap-2 border-2 border-border text-foreground px-8 py-3.5 rounded-lg font-semibold text-base hover:bg-secondary transition-colors"
                >
                  Sign In
                </Link>
              </div>
            </div>

            {/* 3D Globe */}
            <div className="h-[450px] lg:h-[500px] relative">
              <Suspense fallback={
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
                </div>
              }>
                <Globe />
              </Suspense>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-card">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "99.2%", label: "Prediction Accuracy", icon: TrendingUp },
              { value: "2.4M+", label: "Shipments Tracked", icon: GlobeIcon },
              { value: "< 50ms", label: "Risk Assessment", icon: Clock },
              { value: "142", label: "Countries Covered", icon: Shield },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <stat.icon className="w-5 h-5 text-primary mx-auto mb-2" />
                <div className="text-2xl sm:text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Intelligent Freight Operations</h2>
            <p className="text-muted-foreground text-lg">End-to-end visibility and predictive analytics for every shipment.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: BarChart3, title: "Predictive Delay Analysis", desc: "ML models predict delays up to 72 hours ahead using weather, port congestion, and customs data." },
              { icon: Shield, title: "Risk Scoring Engine", desc: "Real-time risk scores for every route, carrier, and shipment based on 50+ dynamic factors." },
              { icon: GlobeIcon, title: "Global Route Optimization", desc: "Analyze thousands of alternative routes factoring cost, time, risk, and carbon footprint." },
              { icon: Clock, title: "Real-Time ETA Updates", desc: "Continuous ETA recalculation using live vessel AIS data, flight tracking, and ground feeds." },
              { icon: Zap, title: "Smart Alert System", desc: "Proactive notifications for disruptions with recommended mitigation actions." },
              { icon: TrendingUp, title: "What-If Simulation", desc: "Compare scenarios by changing routes, modes, and dates to see risk impact." },
            ].map((feature, i) => (
              <div key={i} className="p-6 rounded-xl bg-card border border-border card-hover shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center p-12 rounded-2xl border border-primary/20 bg-primary/5">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Eliminate Supply Chain Blind Spots?</h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
              Join leading logistics companies using FreightIQ to predict disruptions and optimize freight operations.
            </p>
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-lg font-semibold hover:bg-primary/90 transition-all shadow-lg"
            >
              Get Started Free <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 bg-card">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
              <GlobeIcon className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-sm">FreightIQ</span>
          </div>
          <p className="text-xs text-muted-foreground">© 2026 FreightIQ. Predictive Delay & Risk Assessment.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
