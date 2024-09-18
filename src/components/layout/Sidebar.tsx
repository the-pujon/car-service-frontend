import { CalendarIcon,HomeIcon,PackageIcon,UsersIcon } from "lucide-react";
import { Link } from "react-router-dom";

// Sidebar Component
export function Sidebar() {
    const menuItems = [
        { id: "overview",label: "Overview",icon: HomeIcon },
        { id: "services",label: "Services",icon: PackageIcon },
        { id: "slots",label: "Slots",icon: CalendarIcon },
        { id: "users",label: "Users",icon: UsersIcon },
        { id: "my-bookings",label: "My Bookings",icon: CalendarIcon },
        { id: "profile",label: "My Profile",icon: CalendarIcon },
    ]

    return (
        <aside className="w-64 bg-primary-foreground text-white shadow-md">
            <div className="p-4">
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            </div>
            <nav className="mt-8">
                {menuItems.map((item) => (
                    <Link
                        to={item.id === "overview" ? "" : item.id}
                        key={item.id}
                        className={`flex items-center w-full px-4 py-2 text-left hover:bg-background transition-all duration-300 bg-primary-foreground"
                            }`}
                    //onClick={() => setActiveTab(item.id)}
                    >
                        <item.icon className="w-5 h-5 mr-2" />
                        {item.label}
                    </Link>
                ))}
            </nav>
        </aside>
    )
}