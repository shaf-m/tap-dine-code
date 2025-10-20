import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CustomerMenu from "./pages/CustomerMenu";
import WaiterDashboard from "./pages/WaiterDashboard";
import KitchenDisplay from "./pages/KitchenDisplay";
import AdminPortal from "./pages/AdminPortal";
import MarketingLanding from "./pages/MarketingLanding";
import SetupGuide from "./pages/SetupGuide";
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
          <Route path="/menu" element={<CustomerMenu />} />
          <Route path="/waiter" element={<WaiterDashboard />} />
          <Route path="/kitchen" element={<KitchenDisplay />} />
          <Route path="/admin" element={<AdminPortal />} />
          <Route path="/marketing" element={<MarketingLanding />} />
          <Route path="/setup" element={<SetupGuide />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
