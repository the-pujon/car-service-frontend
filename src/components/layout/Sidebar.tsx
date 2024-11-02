import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hook";
import { CalendarIcon,HomeIcon,PackageIcon,UsersIcon,Menu,XIcon,UserRoundPen,UserIcon,LockIcon } from "lucide-react";
import { Link,useLocation } from "react-router-dom";
import { useState } from "react";


export function Sidebar() {
    const [isOpen,setIsOpen] = useState(false);
    const user = useAppSelector(selectCurrentUser)?.role;
    const location = useLocation();
    console.log(location.pathname)

    const menuItemsAdmin = [
        { id: "home",label: "Home",icon: HomeIcon,path: "/dashboard" },
        { id: "overview",label: "Overview",icon: HomeIcon,path: "/dashboard" },
        { id: "services",label: "Services",icon: PackageIcon,path: "/dashboard/services" },
        { id: "slots",label: "Slots",icon: CalendarIcon,path: "/dashboard/slots" },
        { id: "users",label: "Users",icon: UsersIcon,path: "/dashboard/users" },
        { id: "profile",label: "My Profile",icon: UserIcon,path: "/dashboard/profile" },
        { id: "edit-profile",label: "Edit Profile",icon: UserRoundPen,path: "/dashboard/edit-profile" },
        { id: "change-password",label: "Change Password",icon: LockIcon,path: "/dashboard/change-password" },
    ]

    const menuItemsUser = [
        { id: "home",label: "Home",icon: HomeIcon,path: "/dashboard" },
        { id: "my-bookings",label: "My Bookings",icon: CalendarIcon,path: "/dashboard/my-bookings" },
        { id: "profile",label: "My Profile",icon: UserIcon,path: "/dashboard/profile" },
        { id: "edit-profile",label: "Edit Profile",icon: UserRoundPen,path: "/dashboard/edit-profile" },
        { id: "change-password",label: "Change Password",icon: LockIcon,path: "/dashboard/change-password" },
    ]


    const toggleSidebar = () => setIsOpen(!isOpen);

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
                    {user === "admin" && menuItemsAdmin.map((item) => (
                        <Link
                            to={item.id === "overview" ? "" : item.id}
                            key={item.id}
                            className={`flex items-center w-full px-4 py-3 text-left hover:bg-gray-700 transition-all duration-300 ${isOpen ? "ml-10" : ""} ${location.pathname === item.path ? "bg-gray-700" : ""}`}
                            onClick={() => setIsOpen(false)}
                        >

                            <item.icon className="w-5 h-5 mr-3" />
                            {item.label}
                        </Link>
                    ))}

                    {user === "user" && menuItemsUser.map((item) => (
                        <Link
                            to={item.id === "overview" ? "" : item.id}
                            key={item.id}
                            className="flex items-center w-full px-4 py-3 text-left hover:bg-gray-700 transition-all duration-300"
                            onClick={() => setIsOpen(false)}
                        >
                            <item.icon className="w-5 h-5 mr-3" />
                            {item.label}
                        </Link>
                    ))}
                </nav>
            </aside>
        </>
    );
}