import { User } from "lucide-react";
import MobileNav from "../MobileNav";
import { Link } from "react-router-dom";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useAppSelector } from "@/redux/hook";
import { selectCurrentUser,signOut,useCurrentToken } from "@/redux/features/auth/authSlice";
import { isTokenExpired } from "@/utils/isTokenExpired";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";

const Navbar: React.FC = () => {
    const dispatch = useDispatch();
    const token = useAppSelector(useCurrentToken);
    const expiredToken = isTokenExpired(token);
    const user = useAppSelector(selectCurrentUser);

    return (
        <div className="sticky top-0 z-50 backdrop-blur-2xl bg-black/50">
            <div className="container mx-auto px-4 py-4 sm:py-8">
                <div className="flex items-center wrapper">
                    {/* Logo */}
                    <div className="mr-auto text-2xl sm:text-3xl font-extrabold">
                        <Link to="/" aria-label="Sparkle Car Wash Home">
                            Sparkle Car Wash
                        </Link>
                    </div>

                    {/* Phone Number */}
                    <div className="ml-auto hidden sm:flex flex-col place-items-end">
                            <span className="font-bold text-lg md:text-xl">8 800 332 65-66</span>
                            <span className="font-semibold text-xs sm:text-sm text-gray-400">
                                Support 24/7
                            </span>
                    </div>

                    {/* User Menu */}
                    <nav className="contents" aria-label="User menu">
                        <ul className="ml-2 sm:ml-4 flex items-center justify-end">
                            <li className="relative inline-block">
                                {expiredToken ? (
                                    <Button
                                        asChild
                                        className="bg-foreground hover:bg-white text-white hover:text-black font-bold uppercase tracking-widest text-xs sm:text-sm"
                                    >
                                        <Link to={"/auth/signin"}>Sign In</Link>
                                    </Button>
                                ) : (
                                    <DropdownMenu>
                                        <DropdownMenuTrigger aria-label="Open user menu">
                                            <User size={40} className="p-2 text-gray-200" />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem asChild>
                                                {user?.role === "admin" ? 
                                                    <Link to="/dashboard" aria-label="Go to admin dashboard">Dashboard</Link> : 
                                                    <Link to="/dashboard/my-bookings" aria-label="View my bookings">My Bookings</Link>
                                                }
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                onClick={() => dispatch(signOut())}
                                                asChild
                                            >
                                                <button aria-label="Sign out of account">Logout</button>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                )}
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>

            {/* Navigation Menu */}
            <div className="bg-primary-foreground/50 text-white">
                <div className="wrapper flex justify-between items-center">
                    <nav className="sm:hidden" aria-label="Mobile navigation">
                        <MobileNav />
                    </nav>

                    <nav className="hidden sm:contents font-semibold text-sm lg:text-base" aria-label="Main navigation">
                        <ul className="flex items-center mr-auto">
                            {["Home", "Services", "About", "Review"].map((link, index) => (
                                <Link
                                    to={link === "Home" ? "/" : link.toLowerCase()}
                                    key={index}
                                    className="p-2 sm:p-3 xl:p-4 -tracking-wider hover:text-foreground transition-colors duration-150"
                                    aria-label={`Go to ${link} page`}
                                >
                                    <span>{link}</span>
                                </Link>
                            ))}
                        </ul>
                    </nav>

                    <div className="flex items-center px-2 sm:px-4 lg:px-6">
                        <Link 
                            to="/services" 
                            className="bg-background hover:bg-gray-700 text-white font-bold px-3 sm:px-4 xl:px-6 py-2 xl:py-3 text-xs sm:text-sm uppercase tracking-widest"
                            aria-label="Book a car wash service"
                        >
                            Book Now
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
