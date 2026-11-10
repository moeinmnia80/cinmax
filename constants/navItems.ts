import {
  Tv,
  Tags,
  Users,
  HomeIcon,
  CreditCard,
  Clapperboard,
  Cast,
} from "lucide-react";

export const adminNavItems = [
  { href: "/admin", label: "Dashboard", icon: HomeIcon, exact: true },
  { href: "/admin/serials", label: "Serials", icon: Tv },
  { href: "/admin/movies", label: "Movies", icon: Clapperboard },
  { href: "/admin/people", label: "People", icon: Users },
  { href: "/admin/plans", label: "Plans", icon: CreditCard },
  { href: "/admin/metadata", label: "Metadata", icon: Tags },
  { href: "/admin/broadcast", label: "Broadcast", icon: Cast },
];

export const navItems = [
  { href: "/serials", label: "Serials", icon: Tv },
  { href: "/movies", label: "Movies", icon: Clapperboard },
];
