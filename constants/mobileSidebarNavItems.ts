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
  { href: "/admin/cast", label: "Cast", icon: Users },
  { href: "/admin/plans", label: "Plans", icon: CreditCard },
  { href: "/admin/movies", label: "Movies", icon: Clapperboard },
  { href: "/admin/genres", label: "Genres", icon: Tags },
];
