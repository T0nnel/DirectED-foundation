import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import WhatWeDo from "./pages/WhatWeDo";
import Research from "./pages/Research";
import Stories from "./pages/Stories";
import About from "./pages/About";
import TakeAction from "./pages/TakeAction";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import AdminCreate from "./pages/AdminCreate";
import AdminEdit from "./pages/AdminEdit";
import Programs from "./pages/Programs";
import ProgramDetail from "./pages/ProgramDetail";
import NotFound from "./pages/NotFound";
import FocusAreaDetail from "./pages/FocusAreaDetail";
import Publications from "./pages/Publications";
import Team from "./pages/Team";
import Partnerships from "./pages/Partnerships";
import DataHub from "./pages/DataHub";

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
                        <Route path="/what-we-do" element={<WhatWeDo />} />
                        <Route path="/programs" element={<Programs />} />
                        <Route path="/programs/:id" element={<ProgramDetail />} />
                        <Route path="/focus/:slug" element={<FocusAreaDetail />} />
                        <Route path="/research" element={<Research />} />
                        <Route path="/publications" element={<Publications />} />
                        <Route path="/data" element={<DataHub />} />
                        <Route path="/stories" element={<Stories />} />
                        <Route path="/success-stories" element={<Stories />} />
                        <Route path="/blog" element={<Stories />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/mission" element={<About />} />
                        <Route path="/team" element={<Team />} />
                        <Route path="/partners" element={<Partnerships />} />
                        <Route path="/partnerships" element={<Partnerships />} />
                        <Route path="/take-action" element={<TakeAction />} />
                        <Route path="/donate" element={<TakeAction />} />
                        <Route path="/volunteer" element={<TakeAction />} />
                        <Route path="/auth" element={<Auth />} />
                        <Route path="/admin" element={<Admin />} />
                        <Route path="/admin/create" element={<AdminCreate />} />
                        <Route path="/admin/edit/:id" element={<AdminEdit />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </BrowserRouter>
            </TooltipProvider>
        </AuthProvider>
    </QueryClientProvider>
);

export default App;
