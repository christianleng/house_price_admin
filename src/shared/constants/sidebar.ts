import {
  IconDashboard,
  IconHelp,
  IconBuildingEstate,
  IconHomeDollar,
  IconHomeHeart,
  IconMapPin,
  IconUserCircle,
  type Icon,
} from "@tabler/icons-react";

export interface NavItem {
  title: string;
  url: string;
  icon?: Icon;
}

export const NAV_MAIN = [
  { title: "Dashboard", url: "/", icon: IconDashboard },
  { title: "Propriétés", url: "/properties", icon: IconBuildingEstate },
  { title: "Ventes", url: "/sell", icon: IconHomeDollar },
  { title: "Locations", url: "/locations", icon: IconHomeHeart },
  { title: "Villes", url: "/city", icon: IconMapPin },
  { title: "Villes", url: "/city", icon: IconMapPin },
] as const satisfies readonly NavItem[];

export const NAV_SECONDARY = [
  { title: "Mon profil", url: "/profile", icon: IconUserCircle },
  { title: "Aide", url: "#", icon: IconHelp },
] as const satisfies readonly NavItem[];
