import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/hooks/use-theme";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { UserDashboardLayout } from "@/components/layout/UserDashboardLayout";

// Lazy load all pages
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Complaints = lazy(() => import("./pages/Complaints"));
const AddComplaint = lazy(() => import("./pages/AddComplaint"));
const WasteManagement = lazy(() => import("./pages/WasteManagement"));
const Traffic = lazy(() => import("./pages/Traffic"));
const Utilities = lazy(() => import("./pages/Utilities"));
const Emergency = lazy(() => import("./pages/Emergency"));
const Reports = lazy(() => import("./pages/Reports"));
const Settings = lazy(() => import("./pages/Settings"));
const NotFound = lazy(() => import("./pages/NotFound"));
const UserDashboard = lazy(() => import("./pages/user/UserDashboard"));
const UserComplaints = lazy(() => import("./pages/user/UserComplaints"));
const UserAddComplaint = lazy(() => import("./pages/user/UserAddComplaint"));
const TrackComplaint = lazy(() => import("./pages/user/TrackComplaint"));

const queryClient = new QueryClient();

const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-background">
    <div className="w-8 h-8 border-3 border-primary/30 border-t-primary rounded-full animate-spin" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
              {/* Admin Routes */}
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
              {/* User Routes */}
              <Route element={<UserDashboardLayout />}>
                <Route path="/user/dashboard" element={<UserDashboard />} />
                <Route path="/user/complaints" element={<UserComplaints />} />
                <Route path="/user/add-complaint" element={<UserAddComplaint />} />
                <Route path="/user/track" element={<TrackComplaint />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
