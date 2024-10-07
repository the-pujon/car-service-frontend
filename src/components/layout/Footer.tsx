import { Facebook,Instagram,Youtube } from "lucide-react"
import { Button } from "../ui/button"
import { Link } from "react-router-dom"

const Footer = () => {
    return (
        <div>
            <div className="border-t border-gray-600 backdrop-blur-sm">
                <div className="wrapper px-4 py-8 md:py-12">
                    <div className="text-white">
                        <div className="max-w-3xl text-3xl md:text-5xl font-bold mb-6">
                            <h1 className="w-full md:w-2/3">Need expert car service?</h1>
                        </div>
                        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                            <p className="max-w-3xl md:w-2/3 text-gray-400 mb-6 md:mb-0">
                                Our team of certified mechanics is ready to help with all your automotive needs. From routine maintenance to complex repairs, we've got you covered.
                            </p>
                            <div className="w-full md:w-auto">
                                <Button asChild className="button w-full md:w-auto">
                                    <Link to={"/book-appointment"}>
                                        BOOK APPOINTMENT
                                    </Link>
                                </Button>
                            </div>
                        </div>
                        <hr className="border-gray-600 my-8 border-dotted" />
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0">
                            <div className="text-3xl md:text-4xl tracking-widest font-bold">Sparkle Car Wash</div>
                            <div className="flex flex-wrap justify-center md:justify-end gap-4 md:gap-9">
                                <Link to="/about" className="cursor-pointer text-gray-200 hover:text-foreground uppercase">About</Link>
                                <Link to="/services" className="cursor-pointer text-gray-200 hover:text-foreground uppercase">Services</Link>
                                <Link to="/why-us" className="cursor-pointer text-gray-200 hover:text-foreground uppercase">Why Us</Link>
                                <Link to="/contact" className="cursor-pointer text-gray-200 hover:text-foreground uppercase">Contact</Link>
                            </div>
                            <div className="flex gap-6 md:gap-3 items-center justify-center md:justify-end mt-6 md:mt-0">
                                <a href="https://www.facebook.com/autocarepro" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                    <Facebook />
                                </a>
                                <a href="https://www.instagram.com/autocarepro" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                    <Instagram />
                                </a>
                                <a href="https://www.youtube.com/autocarepro" target="_blank" rel="noopener noreferrer" aria-label="Youtube">
                                    <Youtube />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <hr className="border-gray-600" />
                <p className="w-full text-center py-4 px-4 text-sm text-gray-600">Copyright © {new Date().getFullYear()} AutoCare Pro. All rights reserved.</p>
            </div>
        </div>
    )
}

export default Footer