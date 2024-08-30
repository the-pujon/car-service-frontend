import { Heart,Search,User } from "lucide-react"




const Navbar: React.FC = () => {
    return (
        <div>
            {/* top */}
            <div className="container mx-auto px-4 py-8 ">
                <div className="flex items-center wrapper" >
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
                        <button> <Search className="text-black" /></button>
                    </form>

                    {/* Phone Number */}
                    <div className="ml-auto md:w-48 hidden sm:flex flex-col place-items-end">
                        <span className="font-bold md:text-xl">8 800 332 65-66</span>
                        <span className="font-semibold text-sm text-gray-400">Support 24/7</span>
                    </div>

                    {/* Buttons */}
                    <nav className="contents">
                        <ul className="ml-4 xl:w-48 flex items-center justify-end">
                            <li className="ml-2 lg:ml-4 relative inline-block">
                                <a href="">
                                    <User size={50} className=" p-2 text-gray-500" />
                                </a>
                            </li>
                            <li className="ml-2 lg:ml-4 relative inline-block">
                                <a href="">
                                    <div className="absolute -top-0 right-0 z-10 bg-primary text-primary-foreground rounded-full text-sm font-medium px-1">
                                        3
                                    </div>
                                    <Heart size={50} className=" p-2 text-gray-500" />
                                </a>
                            </li>

                        </ul>
                    </nav>
                </div>


            </div>

            <div className="bg-primary-foreground   text-white ">

                <div className="wrapper flex" >
                    <nav className="header-links contents font-semibold text-base lg:text-lg">
                        <ul className="flex items-center ml-4 xl:ml-8 mr-auto">
                            {['Home','Services','About','Projects','Skills','Contacts','Pages'].map((link,index) => (
                                <li className={`p-3 xl:p-4 ${index === 0 ? 'active' : ''}`} key={link}>
                                    <a href="#">
                                        <span>{link}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className=" flex items-center px-4 lg:px-6 xl:px-8">
                        <button className="bg-background hover:bg-gray-700 text-white font-bold px-4 xl:px-6 py-2 xl:py-3">Book Now</button>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Navbar