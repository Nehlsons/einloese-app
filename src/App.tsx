
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/context/LanguageContext";
import Index from "./pages/Index";
import Home from "./pages/Home";
import ScanPage from "./pages/ScanPage";
import VoucherDetails from "./pages/VoucherDetails";
import PartialRedeem from "./pages/PartialRedeem";
import RedemptionSuccess from "./pages/RedemptionSuccess";
import ReloadVoucher from "./pages/ReloadVoucher";
import TeamSharing from "./pages/TeamSharing";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/original-index" element={<Index />} />
            <Route path="/" element={<Home />} />
            <Route path="/scan" element={<ScanPage />} />
            <Route path="/voucher-details" element={<VoucherDetails />} />
            <Route path="/partial-redeem" element={<PartialRedeem />} />
            <Route path="/redemption-success" element={<RedemptionSuccess />} />
            <Route path="/reload" element={<ReloadVoucher />} />
            <Route path="/team-sharing" element={<TeamSharing />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
