import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hook";
import { Menu,XIcon } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { menuItemsAdmin,menuItemsUser } from "@/data/menuItems";
import { MenuLink } from "@/components/Dashboard/MenuLink";

export function Sidebar() {
    const [isOpen,setIsOpen] = useState(false);
    const user = useAppSelector(selectCurrentUser)?.role;
    const location = useLocation();

    const toggleSidebar = () => setIsOpen(!isOpen);
    const menuItems = user === "admin" ? menuItemsAdmin : menuItemsUser;

    return (
        <>
            <button
                className="fixed top-4 left-4 z-20 md:hidden text-white"
                onClick={toggleSidebar}
            >
                {isOpen ? <XIcon className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <aside className={`fixed inset-y-0 left-0 z-10 w-64 bg-primary-foreground text-white shadow-md transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0`}>
                <div className={`p-4 border-b border-gray-700 ${isOpen && "ml-10"}`}>
                    <h1 className="text-2xl font-bold">Dashboard</h1>
                </div>
                <nav className="mt-6">
                    {menuItems.map((item) => (
                        <MenuLink
                            key={item.id}
                            item={item}
                            isOpen={isOpen}
                            onClick={() => setIsOpen(false)}
                            isActive={location.pathname === item.path}
                        />
                    ))}
                </nav>
            </aside>
        </>
    );
}