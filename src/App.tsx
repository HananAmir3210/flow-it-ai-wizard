
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthWrapper from "./components/AuthWrapper";
import Index from "./pages/Index";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import Blog from "./pages/Blog";
import About from "./pages/About";
import ApiDocs from "./pages/ApiDocs";
import Careers from "./pages/Careers";
import Community from "./pages/Community";
import Contact from "./pages/Contact";
import Templates from "./pages/Templates";
import HelpCenter from "./pages/HelpCenter";
import Documentation from "./pages/Documentation";
import PrivacyPolicy from "./pages/PrivacyPolicy";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthWrapper>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/features" element={<Features />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/about" element={<About />} />
            <Route path="/api" element={<ApiDocs />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/community" element={<Community />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/help-center" element={<HelpCenter />} />
            <Route path="/documentation" element={<Documentation />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          </Routes>
        </BrowserRouter>
      </AuthWrapper>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
