 import { Outlet } from "react-router-dom";
 import { AppSidebar } from "./AppSidebar";
 import { TopNavbar } from "./TopNavbar";
 
 export function DashboardLayout() {
   return (
     <div className="min-h-screen bg-background">
       <AppSidebar />
       <div className="ml-64 transition-all duration-300">
         <TopNavbar />
         <main className="p-6 animate-fade-in">
           <Outlet />
         </main>
       </div>
     </div>
   );
 }