import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import BookShipment from "./pages/BookShipment";
import RiskPrediction from "./pages/RiskPrediction";
import RiskAnalysis from "./pages/RiskAnalysis";
import AIActions from "./pages/AIActions";
import WhatIfSimulator from "./pages/WhatIfSimulator";
import ShipmentTimeline from "./pages/ShipmentTimeline";
import CarrierScoreboard from "./pages/CarrierScoreboard";
import CostRiskOptimizer from "./pages/CostRiskOptimizer";
import CarbonTracker from "./pages/CarbonTracker";
import AdminMonitoring from "./pages/AdminMonitoring";
import AdminAlerts from "./pages/AdminAlerts";
import AdminInsights from "./pages/AdminInsights";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/book-shipment" element={<BookShipment />} />
          <Route path="/risk-prediction" element={<RiskPrediction />} />
          <Route path="/risk-analysis" element={<RiskAnalysis />} />
          <Route path="/ai-actions" element={<AIActions />} />
          <Route path="/what-if" element={<WhatIfSimulator />} />
          <Route path="/shipment-timeline" element={<ShipmentTimeline />} />
          <Route path="/carrier-scoreboard" element={<CarrierScoreboard />} />
          <Route path="/cost-risk" element={<CostRiskOptimizer />} />
          <Route path="/carbon-tracker" element={<CarbonTracker />} />
          <Route path="/admin/monitoring" element={<AdminMonitoring />} />
          <Route path="/admin/alerts" element={<AdminAlerts />} />
          <Route path="/admin/insights" element={<AdminInsights />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
