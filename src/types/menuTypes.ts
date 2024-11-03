import { LucideIcon } from "lucide-react";

export type TMenuItem = {
  id: string;
  label: string;
  icon: LucideIcon;
  path: string;
};

export type TMenuItemProps = {
  item: TMenuItem;
  isOpen: boolean;
  onClick: () => void;
  isActive: boolean;
};
