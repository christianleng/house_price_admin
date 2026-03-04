"use client";

import * as React from "react";
import {
  IconDashboard,
  IconInnerShadowTop,
  IconSettings,
  IconBuilding,
  IconHelp,
} from "@tabler/icons-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shared/ui/sidebar";
import { NavMain } from "./nav/NavMain";
import { NavDocuments } from "./nav/NavDocuments";
import { NavSecondary } from "./nav/NavSecondary";
import { NavUser } from "./nav/NavUser";
import { Link } from "react-router";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },

  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: IconDashboard,
    },
    {
      title: "Propriétés",
      url: "/properties",
      icon: IconBuilding,
    },
  ],

  navSecondary: [
    {
      title: "Mon profil",
      url: "/profile",
      icon: IconSettings,
    },
    {
      title: "Aide",
      url: "#",
      icon: IconHelp,
    },
  ],

  documents: [],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <Link to="#">
                <IconInnerShadowTop className="size-5!" />
                <span className="text-base font-semibold">House Price</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
