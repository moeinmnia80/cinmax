import {
  Tv,
  Tags,
  Users,
  HomeIcon,
  CreditCard,
  Clapperboard,
} from "lucide-react";

export const navItems = [
  { href: "/admin", label: "Dashboard", icon: HomeIcon, exact: true },
  { href: "/admin/serials", label: "Serials", icon: Tv },
  { href: "/admin/movies", label: "Movies", icon: Clapperboard },
  { href: "/admin/people", label: "People", icon: Users },
  { href: "/admin/plans", label: "Plans", icon: CreditCard },
  { href: "/admin/metadata", label: "Metadata", icon: Tags },
];
