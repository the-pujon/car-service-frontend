import { Outlet,useLocation } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"
import { useEffect } from "react";

const MainLayout = () => {

    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0,0);
    },[pathname]);


    return (
        <div className="bg-background min-h-screen text-white">
            <Navbar />

            <div className="relative">
                <div
                    className=" fixed inset-x-0 top-1/2 -z-[1] flex -translate-y-1/2 justify-center overflow-hidden [mask-image:radial-gradient(50%_45%_at_50%_55%,white,transparent)]">
                    {/*<svg className="h-[60rem] w-[100rem] flex-none stroke-[#ffffff] opacity-30" aria-hidden="true">
                        <defs>
                            <pattern id="e9033f3e-f665-41a6-84ef-756f6778e6fe" width="100" height="100" x="50%" y="50%"
                                patternUnits="userSpaceOnUse" patternTransform="translate(-100 0)">
                                <path d="M.5 200V.5H200" fill="none"></path>
                            </pattern>
                        </defs>
                        <svg x="50%" y="50%" className="overflow-visible fill-foreground">
                            <path d="M-300 0h101v101h-101Z M-600 100h101v101h-101Z M300 200h101v101h-101Z M100 300h101v101h-101Z M-200 -200h101v101h-101Z M200 -200h101v101h-101Z M-200 200h101v101h-101Z M200 500h101v101h-101Z" stroke-width="0"></path>
                        </svg>
                        <rect width="100%" height="100%" stroke-width="0" fill="url(#e9033f3e-f665-41a6-84ef-756f6778e6fe)">
                        </rect>
                    </svg>*/}


                </div>
                {/*<div
                    style={
                        {
                            background: `radial-gradient(circle, rgba(4,53,190,0.2) 0%, rgba(4,53,190,0.2) 30%)`,
                            borderRadius: `30% 70% 70% 30% / 30% 30% 70% 70% `
                        }
                    }
                    className="bg-foreground/30 inset-x-0 -z-10 top-1/2 left-[30%] xl:left-1/3  w-[50rem] h-[30rem] blur-3xl fixed -translate-y-1/2  flex justify-center"></div>*/}

                <div className="z-10 min-h-[80vh]">
                    <Outlet />
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default MainLayout