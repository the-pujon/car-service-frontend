import { Facebook,Instagram,Youtube } from "lucide-react"
import { Button } from "../ui/button"
import { Link } from "react-router-dom"

const Footer = () => {
    return (
        <div>
            <div className="border-t border-gray-600">
                <div className="wrapper flex items-center justify-center py-5">
                    <div className="w-full px-4 text-white flex flex-col">
                        <div className="max-w-3xl text-5xl font-bold">
                            <h1 className="w-full md:w-2/3">How can we help you get in touch</h1>
                        </div>
                        <div className="flex mt-8 flex-col md:flex-row md:justify-between">
                            <p className="max-w-3xl md:w-2/3 text-gray-400">
                                To ensure that all Wikipedia content is verifiable, anyone may question an uncited claim. If your work has been tagged
                            </p>
                            <div className="w-44 pt-6 md:pt-0">
                                <Button asChild
                                    className="button"
                                >
                                    <Link to={"#"}
                                    //className="bg-foreground justify-center text-center rounded-lg shadow px-10 py-3 flex items-center"
                                    >
                                        CONTACT US
                                    </Link>
                                </Button>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <hr className="border-gray-600 my-4 border-dotted" />
                            <div className="flex mt-1 flex-row items-center justify-between">
                                <div className="text-4xl tracking-widest font-bold">Car Service</div>
                                <div className="flex gap-9">
                                    <a className="hidden md:block cursor-pointer text-gray-200 hover:text-foreground uppercase" href="#">
                                        About
                                    </a>
                                    <a className="hidden md:block cursor-pointer text-gray-200 hover:text-foreground uppercase" href="#">
                                        Services
                                    </a>
                                    <a className="hidden md:block cursor-pointer text-gray-200 hover:text-foreground uppercase" href="#">
                                        Why Us
                                    </a>
                                    <a className="hidden md:block cursor-pointer text-gray-200 hover:text-foreground uppercase" href="#">
                                        Contact
                                    </a>
                                </div>
                                <div className="flex flex-row gap-3 items-center justify-between">
                                    <a href="#" aria-label="Facebook">
                                        <Facebook />
                                    </a>
                                    <a href="#" aria-label="Instagram">
                                        <Instagram />
                                    </a>
                                    <a href="https://www.youtube.com/channel/UCjtCbnkIaiCJgj13sEZ9iqw" aria-label="Youtube">
                                        <Youtube />
                                    </a>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <hr className="border-gray-600" />
                <p className="w-full text-center my-4 wrapper text-gray-600">Copyright © {new Date().getFullYear()} Besnik Creative</p>
            </div>
        </div>
    )
}

export default Footer