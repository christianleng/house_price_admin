"use client";

import * as React from "react";
import { IconInnerShadowTop } from "@tabler/icons-react";
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
import { NAV_MAIN, NAV_SECONDARY } from "@/shared/constants/sidebar";

const USER = {
  name: "shadcn",
  email: "m@example.com",
  avatar: "/avatars/shadcn.jpg",
} as const;

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
        <NavMain items={NAV_MAIN} />
        <NavSecondary items={NAV_SECONDARY} />
      </SidebarContent>
      <SidebarFooter className="bg-muted">
        <NavUser user={USER} />
      </SidebarFooter>
    </Sidebar>
  );
}
