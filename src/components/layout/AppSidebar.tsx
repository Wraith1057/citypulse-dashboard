 import { useState } from "react";
 import { NavLink, useLocation } from "react-router-dom";
 import {
   LayoutDashboard,
   MessageSquareWarning,
   Plus,
   Trash2,
   Car,
   Droplets,
   Siren,
   BarChart3,
   Settings,
   ChevronLeft,
   ChevronRight,
   Building2,
 } from "lucide-react";
 import { cn } from "@/lib/utils";
 
 const navItems = [
   { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
   { title: "Complaints", url: "/complaints", icon: MessageSquareWarning },
   { title: "Add Complaint", url: "/add-complaint", icon: Plus },
   { title: "Waste Management", url: "/waste", icon: Trash2 },
   { title: "Traffic & Transport", url: "/traffic", icon: Car },
   { title: "Water & Electricity", url: "/utilities", icon: Droplets },
   { title: "Emergency Services", url: "/emergency", icon: Siren },
   { title: "Reports & Analytics", url: "/reports", icon: BarChart3 },
   { title: "Settings", url: "/settings", icon: Settings },
 ];
 
 export function AppSidebar() {
   const [collapsed, setCollapsed] = useState(false);
   const location = useLocation();
 
   return (
     <aside
       className={cn(
         "fixed left-0 top-0 z-40 h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300",
         collapsed ? "w-20" : "w-64"
       )}
     >
       <div className="flex flex-col h-full">
         {/* Logo */}
         <div className="flex items-center gap-3 px-6 py-6 border-b border-sidebar-border">
           <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center glow-primary">
             <Building2 className="w-6 h-6 text-primary-foreground" />
           </div>
           {!collapsed && (
             <div className="animate-fade-in">
               <h1 className="font-bold text-lg gradient-text">CityOS</h1>
               <p className="text-xs text-muted-foreground">Smart City Platform</p>
             </div>
           )}
         </div>
 
         {/* Navigation */}
         <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
           {navItems.map((item) => {
             const isActive = location.pathname === item.url;
             return (
               <NavLink
                 key={item.url}
                 to={item.url}
                 className={cn(
                   "nav-item",
                   isActive && "nav-item-active",
                   collapsed && "justify-center px-3"
                 )}
               >
                 <item.icon className={cn("w-5 h-5 shrink-0", isActive && "text-primary")} />
                 {!collapsed && <span className="truncate">{item.title}</span>}
               </NavLink>
             );
           })}
         </nav>
 
         {/* Collapse Button */}
         <div className="p-4 border-t border-sidebar-border">
           <button
             onClick={() => setCollapsed(!collapsed)}
             className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-muted-foreground hover:bg-sidebar-accent hover:text-foreground transition-colors"
           >
             {collapsed ? (
               <ChevronRight className="w-5 h-5" />
             ) : (
               <>
                 <ChevronLeft className="w-5 h-5" />
                 <span>Collapse</span>
               </>
             )}
           </button>
         </div>
       </div>
     </aside>
   );
 }