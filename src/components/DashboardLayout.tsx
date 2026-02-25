import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Ship, LayoutDashboard, Package, AlertTriangle, BarChart3, Settings, LogOut, Users, Bell, Map } from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
  type: "user" | "admin";
}

const userLinks = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Overview" },
  { to: "/dashboard", icon: Package, label: "Shipments" },
  { to: "/dashboard", icon: AlertTriangle, label: "Risk Alerts" },
  { to: "/dashboard", icon: Map, label: "Live Map" },
  { to: "/dashboard", icon: BarChart3, label: "Analytics" },
];

const adminLinks = [
  { to: "/admin", icon: LayoutDashboard, label: "Overview" },
  { to: "/admin", icon: Users, label: "Users" },
  { to: "/admin", icon: Package, label: "Fleet" },
  { to: "/admin", icon: Bell, label: "Alerts" },
  { to: "/admin", icon: BarChart3, label: "Reports" },
  { to: "/admin", icon: Settings, label: "Settings" },
];

const DashboardLayout = ({ children, type }: DashboardLayoutProps) => {
  const location = useLocation();
  const links = type === "admin" ? adminLinks : userLinks;

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card flex flex-col shrink-0 hidden md:flex">
        <div className="p-4 border-b border-border">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
              <Ship className="w-5 h-5 text-primary" />
            </div>
            <div>
              <span className="font-bold text-sm">FreightIQ</span>
              <span className="text-xs text-muted-foreground ml-2 capitalize">{type}</span>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {links.map((link, i) => {
            const isActive = i === 0;
            return (
              <Link
                key={i}
                to={link.to}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  isActive
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                <link.icon className="w-4 h-4" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-border">
          <Link
            to="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {/* Top bar */}
        <header className="sticky top-0 z-40 h-14 border-b border-border bg-card/80 backdrop-blur flex items-center px-6 justify-between">
          <h2 className="font-semibold text-sm capitalize">{type} Dashboard</h2>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="text-xs text-muted-foreground">Live</span>
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
              <span className="text-xs font-medium">JD</span>
            </div>
          </div>
        </header>

        <div className="p-6">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
