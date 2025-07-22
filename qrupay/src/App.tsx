import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import ProfileEdit from "./pages/ProfileEdit";
import EmergencyView from "./pages/EmergencyView";
import DemoEmergency from "./pages/DemoEmergency";
import FirstAid from "./pages/FirstAid";
import HealthEducation from "./pages/HealthEducation";
import SymptomChecker from "./pages/SymptomChecker";
import HealthServices from "./pages/HealthServices";
import NotFound from "./pages/NotFound";
import MedicationReminders from "./pages/MedicationReminders";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile/edit" element={<ProfileEdit />} />
            <Route path="/emergency/:profileId" element={<EmergencyView />} />
            <Route path="/emergency/demo" element={<DemoEmergency />} />
            <Route path="/first-aid" element={<FirstAid />} />
            <Route path="/health-education" element={<HealthEducation />} />
            <Route path="/symptom-checker" element={<SymptomChecker />} />
            <Route path="/health-services" element={<HealthServices />} />
            <Route path="/medications" element={<MedicationReminders />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
