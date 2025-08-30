import "./global.css";
import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/lib/auth-context";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AIAdvisor from "./pages/AIAdvisor";
import Upload from "./pages/Upload";
import Assistance from "./pages/Assistance";
import Flashcards from "./pages/Flashcards";
import Dashboard from "./pages/Dashboard";
import StudyGroups from "./pages/StudyGroups";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

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
            <Route path="/ai-advisor" element={<AIAdvisor />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/assistance" element={<Assistance />} />
            <Route path="/flashcards" element={<Flashcards />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/study-groups" element={<StudyGroups />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
