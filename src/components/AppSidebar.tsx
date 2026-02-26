import { Ship, LayoutDashboard, Package, AlertTriangle, BarChart3, Brain, FlaskConical, Globe, Bell, TrendingUp, LogOut, Clock, Trophy, DollarSign, Leaf } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

const userLinks = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/book-shipment", icon: Package, label: "Book Shipment" },
  { to: "/risk-prediction", icon: AlertTriangle, label: "Risk Prediction" },
  { to: "/risk-analysis", icon: BarChart3, label: "Risk Analysis" },
  { to: "/ai-actions", icon: Brain, label: "AI Actions" },
  { to: "/what-if", icon: FlaskConical, label: "What-If Simulator" },
  { to: "/shipment-timeline", icon: Clock, label: "Shipment Timeline" },
  { to: "/carrier-scoreboard", icon: Trophy, label: "Carrier Scoreboard" },
  { to: "/cost-risk", icon: DollarSign, label: "Cost vs Risk" },
  { to: "/carbon-tracker", icon: Leaf, label: "Carbon Tracker" },
];

const adminLinks = [
  { to: "/admin/monitoring", icon: Globe, label: "Global Monitoring" },
  { to: "/admin/alerts", icon: Bell, label: "Alert Management" },
  { to: "/admin/insights", icon: TrendingUp, label: "Risk Insights" },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar className={collapsed ? "w-14" : "w-64"} collapsible="icon">
      <div className="p-4 border-b border-sidebar-border flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-sidebar-primary flex items-center justify-center shrink-0">
          <Ship className="w-5 h-5 text-sidebar-primary-foreground" />
        </div>
        {!collapsed && <span className="font-bold text-sidebar-foreground text-lg">FreightIQ</span>}
      </div>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/50">Operations</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {userLinks.map((item) => (
                <SidebarMenuItem key={item.to}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.to}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors"
                      activeClassName="bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary hover:text-sidebar-primary-foreground"
                    >
                      <item.icon className="w-4 h-4 shrink-0" />
                      {!collapsed && <span className="text-sm">{item.label}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/50">Admin</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminLinks.map((item) => (
                <SidebarMenuItem key={item.to}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.to}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors"
                      activeClassName="bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary hover:text-sidebar-primary-foreground"
                    >
                      <item.icon className="w-4 h-4 shrink-0" />
                      {!collapsed && <span className="text-sm">{item.label}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <div className="mt-auto p-3 border-t border-sidebar-border">
        <NavLink
          to="/"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          {!collapsed && <span className="text-sm">Back to Home</span>}
        </NavLink>
      </div>
    </Sidebar>
  );
}
