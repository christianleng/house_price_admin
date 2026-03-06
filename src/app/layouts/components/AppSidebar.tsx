"use client";

import * as React from "react";
import {
  IconDashboard,
  IconInnerShadowTop,
  IconHelp,
  IconBuildingEstate,
  IconHomeDollar,
  IconHomeHeart,
  IconMapPin,
  IconUserCircle,
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
      icon: IconBuildingEstate,
    },
    {
      title: "Ventes",
      url: "/sell",
      icon: IconHomeDollar,
    },
    {
      title: "Locations",
      url: "/locations",
      icon: IconHomeHeart,
    },
    {
      title: "Villes",
      url: "/city",
      icon: IconMapPin,
    },
  ],

  navSecondary: [
    {
      title: "Mon profil",
      url: "/profile",
      icon: IconUserCircle,
    },
    {
      title: "Aide",
      url: "#",
      icon: IconHelp,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader className="bg-muted">
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
      <SidebarContent className="bg-muted">
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter className="bg-muted">
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
