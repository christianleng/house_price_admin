import { Separator } from "@/shared/ui/separator";
import { SidebarTrigger } from "@/shared/ui/sidebar";
import { Link } from "react-router";
import { IconPlus, IconCalendar } from "@tabler/icons-react";
import { OfflineBanner } from "@/shared/ui/OfflineBanner";
import { PendingMutationsBadge } from "@/shared/ui/PendingMutationsBadge";

export function SiteHeader() {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />

        <div className="ml-auto flex items-center gap-2">
          <PendingMutationsBadge />
          <OfflineBanner />

          <button className="flex items-center shadow-sidebar-active gap-1.5 rounded-sm px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted">
            <IconCalendar className="size-3.5" />6 derniers mois
          </button>

          <Link
            to="/properties/create"
            className="flex items-center gap-1.5 bg-primary text-primary-foreground rounded-sm px-3 py-1.5 text-xs font-semibold transition-colors"
          >
            <IconPlus className="size-3.5" />
            Ajouter un bien
          </Link>
        </div>
      </div>
    </header>
  );
}
