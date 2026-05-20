import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index";
import BlogPost from "./pages/BlogPost";
import Resources from "./pages/Resources";
import About from "./pages/About";
import Videos from "./pages/Videos";
import Gallery from "./pages/Gallery";
import SheActuallyDidIt from "./pages/SheActuallyDidIt";
import RealGuidesPage from "./pages/RealGuidesPage";
import StumbledUpon from "./pages/StumbledUpon";
import StumbledUponPost from "./pages/StumbledUponPost";
import CountryMatchQuiz from "./pages/CountryMatchQuiz";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/stories" element={<SheActuallyDidIt />} />
          <Route path="/stories/:slug" element={<BlogPost />} />
          <Route path="/the-real-guides" element={<RealGuidesPage />} />
          <Route path="/the-real-guides/:slug" element={<BlogPost />} />
          <Route path="/she-actually-did-it" element={<Navigate to="/stories" replace />} />
          <Route path="/she-actually-did-it/:slug" element={<Navigate to="/stories/she-actually-did-it" replace />} />
          <Route path="/stumbled-upon" element={<StumbledUpon />} />
          <Route path="/stumbled-upon/:slug" element={<StumbledUponPost />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/about" element={<About />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
