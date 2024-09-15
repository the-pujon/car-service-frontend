import { Search,User } from "lucide-react";
import MobileNav from "../MobileNav";
import { Link } from "react-router-dom";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useAppSelector } from "@/redux/hook";
import { signOut,useCurrentToken } from "@/redux/features/auth/authSlice";
import { isTokenExpired } from "@/utils/isTokenExpired";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";

const Navbar: React.FC = () => {
    const dispatch = useDispatch();
    const token = useAppSelector(useCurrentToken);
    const expiredToken = isTokenExpired(token);

    return (
        <div>
            {/* top */}
            <div className="container mx-auto px-4 py-8 ">
                <div className="flex items-center wrapper">
                    {/* Logo */}
                    <div className="mr-auto md:w-48 flex-shrink-0 text-3xl font-extrabold">
                        Car Service
                    </div>

                    {/* Search */}
                    <form className="w-full max-w-xs xl:max-w-lg 2xl:max-w-2xl p-2 bg-gray-100 rounded-md hidden xl:flex items-center">
                        <input
                            className="border-none outline-none text-background text-base bg-transparent font-semibold w-full pl-4"
                            type="text"
                            placeholder="I'm searching for ..."
                        />
                        <button>
                            <Search className="text-black" />
                        </button>
                    </form>

                    {/* Phone Number */}
                    <div className="ml-auto md:w-48 hidden sm:flex flex-col place-items-end">
                        <span className="font-bold md:text-xl">8 800 332 65-66</span>
                        <span className="font-semibold text-sm text-gray-400">
                            Support 24/7
                        </span>
                    </div>

                    {/* Buttons */}
                    <nav className="contents">
                        <ul className="ml-4 xl:w-48 flex items-center justify-end">
                            <li className="ml-2 lg:ml-4 relative inline-block rounded-full ">
                                {expiredToken ? (
                                    <Button
                                        asChild
                                        className="bg-foreground hover:bg-white text-white hover:text-black font-bold uppercase tracking-widest"
                                    >
                                        <Link to={"/auth/signin"}>Sign In</Link>
                                    </Button>
                                ) : (
                                    <DropdownMenu>
                                        <DropdownMenuTrigger>
                                            <User size={50} className=" p-2 text-gray-200" />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem asChild>
                                                <Link to="/dashboard">Dashboard</Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                onClick={() => dispatch(signOut())}
                                                asChild
                                            >
                                                <p>Logout</p>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                )}
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>

            <div className="bg-primary-foreground   text-white ">
                <div className="wrapper flex justify-between">
                    {/* for small device */}
                    <nav className="sm:hidden">
                        <MobileNav />
                    </nav>

                    <nav className="hidden sm:contents font-semibold text-base  lg:text-lg">
                        <ul className="flex items-center ml-4 xl:ml-8 mr-auto">
                            {["Home","Services","About","Reviews"].map((link,index) => (
                                //<li className={`p-3 xl:p-4 ${index === 0 ? 'active' : ''}`} key={link}>
                                <Link
                                    to={link === "Home" ? "/" : link.toLowerCase()}
                                    key={index}
                                    className="p-3 xl:p-4 -tracking-wider hover:text-foreground transition-colors duration-150"
                                >
                                    <span>{link}</span>
                                </Link>
                                //</li>
                            ))}
                        </ul>
                    </nav>

                    <div className=" flex items-center px-4 lg:px-6 xl:px-8">
                        <button className="bg-background hover:bg-gray-700 text-white font-bold px-4 xl:px-6 py-2 xl:py-3 uppercase tracking-widest">
                            Book Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
