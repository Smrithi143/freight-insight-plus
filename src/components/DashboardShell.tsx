import { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Bell } from "lucide-react";

interface DashboardShellProps {
  children: ReactNode;
  title: string;
}

const DashboardShell = ({ children, title }: DashboardShellProps) => (
  <SidebarProvider>
    <div className="min-h-screen flex w-full bg-background">
      <AppSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-40 h-14 border-b border-border bg-card/90 backdrop-blur flex items-center px-4 gap-4">
          <SidebarTrigger />
          <h1 className="font-semibold text-base">{title}</h1>
          <div className="ml-auto flex items-center gap-3">
            <div className="relative">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full" />
            </div>
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-xs font-medium text-primary-foreground">JD</span>
            </div>
          </div>
        </header>
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  </SidebarProvider>
);

export default DashboardShell;
