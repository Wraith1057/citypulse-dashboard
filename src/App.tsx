 import { Toaster } from "@/components/ui/toaster";
 import { Toaster as Sonner } from "@/components/ui/sonner";
 import { TooltipProvider } from "@/components/ui/tooltip";
 import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
 import { BrowserRouter, Routes, Route } from "react-router-dom";
 import { DashboardLayout } from "@/components/layout/DashboardLayout";
 import Login from "./pages/Login";
 import Dashboard from "./pages/Dashboard";
 import Complaints from "./pages/Complaints";
 import AddComplaint from "./pages/AddComplaint";
 import WasteManagement from "./pages/WasteManagement";
 import Traffic from "./pages/Traffic";
 import Utilities from "./pages/Utilities";
 import Emergency from "./pages/Emergency";
 import Reports from "./pages/Reports";
 import Settings from "./pages/Settings";
 import NotFound from "./pages/NotFound";
 
 const queryClient = new QueryClient();
 
 const App = () => (
   <QueryClientProvider client={queryClient}>
     <TooltipProvider>
       <Toaster />
       <Sonner />
       <BrowserRouter>
         <Routes>
           <Route path="/" element={<Login />} />
           <Route element={<DashboardLayout />}>
             <Route path="/dashboard" element={<Dashboard />} />
             <Route path="/complaints" element={<Complaints />} />
             <Route path="/add-complaint" element={<AddComplaint />} />
             <Route path="/waste" element={<WasteManagement />} />
             <Route path="/traffic" element={<Traffic />} />
             <Route path="/utilities" element={<Utilities />} />
             <Route path="/emergency" element={<Emergency />} />
             <Route path="/reports" element={<Reports />} />
             <Route path="/settings" element={<Settings />} />
           </Route>
           <Route path="*" element={<NotFound />} />
         </Routes>
       </BrowserRouter>
     </TooltipProvider>
   </QueryClientProvider>
 );
 
 export default App;
