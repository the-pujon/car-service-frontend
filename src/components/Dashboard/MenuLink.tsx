import { Link } from "react-router-dom";
import { TMenuItemProps } from "@/types/menuTypes";

export function MenuLink({ item,isOpen,onClick,isActive }: TMenuItemProps) {
    return (
        <Link
            to={item.id === "overview" ? "" : item.id}
            key={item.id}
            className={`flex items-center w-full px-4 py-3 text-left hover:bg-gray-700 transition-all duration-300 ${isOpen ? "ml-10" : ""
                } ${isActive ? "bg-gray-700" : ""}`}
            onClick={onClick}
        >
            <item.icon className="w-5 h-5 mr-3" />
            {item.label}
        </Link>
    );
}