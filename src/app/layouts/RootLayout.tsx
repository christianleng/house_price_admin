import { AppSidebar } from "@/app/layouts/components/AppSidebar";
import { SiteHeader } from "@/app/layouts/components/SiteHeader";
import { SidebarInset, SidebarProvider } from "@/shared/ui/sidebar";
import { Toaster } from "@/shared/ui/sonner";
import { TooltipProvider } from "@/shared/ui/tooltip";
import { Outlet } from "react-router";

const RootLayout = () => {
  return (
    <TooltipProvider>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
            backgroundColor: "var(--muted)",
          } as React.CSSProperties
        }
      >
        <AppSidebar variant="inset" />
        <SidebarInset className="flex-1">
          <Toaster />
          <SiteHeader />
          <Outlet />
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
};

export default RootLayout;
