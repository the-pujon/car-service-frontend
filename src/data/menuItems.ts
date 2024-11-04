import {
  HomeIcon,
  PackageIcon,
  CalendarIcon,
  UsersIcon,
  UserIcon,
  UserRoundPen,
  LockIcon,
  LayoutGrid,
  LayoutDashboardIcon,
} from "lucide-react";
import { TMenuItem } from "@/types/menuTypes";

export const menuItemsAdmin: TMenuItem[] = [
  { id: "home", label: "Home", icon: HomeIcon, path: "/" },
  {
    id: "overview",
    label: "Overview",
    icon: LayoutDashboardIcon,
    path: "/dashboard",
  },
  {
    id: "services-overview",
    label: "Services Overview",
    icon: LayoutGrid,
    //path: "/dashboard/service-overview",
    path: "/dashboard/users",
  },
  {
    id: "services",
    label: "Services",
    icon: PackageIcon,
    path: "/dashboard/services",
  },
  { id: "slots", label: "Slots", icon: CalendarIcon, path: "/dashboard/slots" },
  { id: "users", label: "Users", icon: UsersIcon, path: "/dashboard/users" },
  {
    id: "profile",
    label: "My Profile",
    icon: UserIcon,
    path: "/dashboard/profile",
  },
  {
    id: "edit-profile",
    label: "Edit Profile",
    icon: UserRoundPen,
    path: "/dashboard/edit-profile",
  },
  {
    id: "change-password",
    label: "Change Password",
    icon: LockIcon,
    path: "/dashboard/change-password",
  },
];

export const menuItemsUser: TMenuItem[] = [
  { id: "home", label: "Home", icon: HomeIcon, path: "/" },
  {
    id: "my-bookings",
    label: "My Bookings",
    icon: CalendarIcon,
    path: "/dashboard/my-bookings",
  },
  {
    id: "profile",
    label: "My Profile",
    icon: UserIcon,
    path: "/dashboard/profile",
  },
  {
    id: "edit-profile",
    label: "Edit Profile",
    icon: UserRoundPen,
    path: "/dashboard/edit-profile",
  },
  {
    id: "change-password",
    label: "Change Password",
    icon: LockIcon,
    path: "/dashboard/change-password",
  },
];
