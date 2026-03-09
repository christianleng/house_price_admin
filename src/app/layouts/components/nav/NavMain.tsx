"use client";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shared/ui/sidebar";
import { Link, useLocation } from "react-router";
import type { NavItem } from "@/shared/constants/sidebar";

export function NavMain({ items }: { items: readonly NavItem[] }) {
  const { pathname } = useLocation();

  const isActive = (url: string) => {
    if (url === "/") return pathname === "/";
    return pathname.startsWith(url);
  };

  return (
    <SidebarGroup>
      <SidebarMenu className="flex gap-2">
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton asChild size="lg" isActive={isActive(item.url)}>
              <Link to={item.url}>
                {item.icon && <item.icon />}
                <span className="text-base">{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
