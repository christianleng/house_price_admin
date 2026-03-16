"use client";

import { memo } from "react";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shared/ui/sidebar";
import { NavLink } from "react-router";
import type { NavItem } from "@/shared/constants/sidebar";

const NavMainItem = memo(({ item }: { item: NavItem }) => (
  <SidebarMenuItem>
    <NavLink to={item.url} end={item.url === "/"}>
      {({ isActive }) => (
        <SidebarMenuButton size="lg" isActive={isActive}>
          {item.icon && <item.icon />}
          <span className="text-base">{item.title}</span>
        </SidebarMenuButton>
      )}
    </NavLink>
  </SidebarMenuItem>
));

NavMainItem.displayName = "NavMainItem";

export const NavMain = memo(({ items }: { items: readonly NavItem[] }) => (
  <SidebarGroup>
    <SidebarMenu className="flex gap-2">
      {items.map((item) => (
        <NavMainItem key={item.title} item={item} />
      ))}
    </SidebarMenu>
  </SidebarGroup>
));

NavMain.displayName = "NavMain";
