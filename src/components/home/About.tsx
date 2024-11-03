import { motion } from "framer-motion";
import { CheckCircle,PhoneCall } from "lucide-react";
import hero1 from "../../assets/heroImage/hero4.jpg";
import hero2 from "../../assets/heroImage/hero5.jpeg";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const About = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="wrapper py-32 z-30"
        >
            <div className="flex flex-col lg:flex-row gap-9 justify-center">
                <motion.div
                    initial={{ x: -50,opacity: 0 }}
                    animate={{ x: 0,opacity: 1 }}
                    transition={{ duration: 0.5,delay: 0.2 }}
                    className="relative w-11/12"
                >
                    <img src={hero1} alt="Car being washed" className="" />
                    <motion.img
                        initial={{ y: 50,opacity: 0 }}
                        animate={{ y: 0,opacity: 1 }}
                        transition={{ duration: 0.5,delay: 0.4 }}
                        src={hero2}
                        alt="Detailed car interior"
                        className="w-72 absolute -right-10 border-[12px] border-background -bottom-4"
                    />
                </motion.div>
                <motion.div
                    initial={{ x: 50,opacity: 0 }}
                    animate={{ x: 0,opacity: 1 }}
                    transition={{ duration: 0.5,delay: 0.2 }}
                    className="flex flex-col gap-5"
                >
                    <motion.p
                        initial={{ y: -20,opacity: 0 }}
                        animate={{ y: 0,opacity: 1 }}
                        transition={{ duration: 0.5,delay: 0.4 }}
                        className='tracking-widest'
                    >
                        ABOUT SPARKLE CAR WASH
                    </motion.p>
                    <motion.h1
                        initial={{ y: -20,opacity: 0 }}
                        animate={{ y: 0,opacity: 1 }}
                        transition={{ duration: 0.5,delay: 0.5 }}
                        className="text-5xl font-bold"
                    >
                        Your Trusted Car Wash and Detailing Center
                    </motion.h1>
                    <motion.div
                        initial={{ y: -20,opacity: 0 }}
                        animate={{ y: 0,opacity: 1 }}
                        transition={{ duration: 0.5,delay: 0.6 }}
                    >
                        At Sparkle Car Wash, we're dedicated to keeping your vehicle looking its best.
                        With state-of-the-art equipment and eco-friendly products, we provide top-notch
                        car washing and detailing services that will make your car shine like new.
                    </motion.div>
                    <motion.div
                        initial={{ y: -20,opacity: 0 }}
                        animate={{ y: 0,opacity: 1 }}
                        transition={{ duration: 0.5,delay: 0.7 }}
                        className="flex justify-around"
                    >
                        <div className="flex flex-col gap-3">
                            <p className="flex items-center gap-2">
                                <CheckCircle className="inline" size={18} /> Eco-friendly cleaning solutions
                            </p>
                            <p className="flex items-center gap-2">
                                <CheckCircle className="inline" size={18} /> Experienced, professional staff
                            </p>
                            <p className="flex items-center gap-2">
                                <CheckCircle className="inline" size={18} /> Quick service, no appointments needed
                            </p>
                        </div>
                        <div className="flex flex-col gap-3">
                            <p className="flex items-center gap-2">
                                <CheckCircle className="inline" size={18} /> Interior and exterior detailing
                            </p>
                            <p className="flex items-center gap-2">
                                <CheckCircle className="inline" size={18} /> Satisfaction guaranteed
                            </p>
                            <p className="flex items-center gap-2">
                                <CheckCircle className="inline" size={18} /> Open 7 days a week
                            </p>
                        </div>
                    </motion.div>
                    <motion.hr
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.5,delay: 0.8 }}
                        className="border-white"
                    />
                    <motion.div
                        initial={{ y: 20,opacity: 0 }}
                        animate={{ y: 0,opacity: 1 }}
                        transition={{ duration: 0.5,delay: 0.9 }}
                        className="flex flex-col lg:flex-row gap-4 sm:items-center"
                    >
                        <Button asChild className="bg-foreground text-white font-bold hover:text-black">
                            <Link to="/about">Learn More</Link>
                        </Button>
                        <Button className="bg-foreground text-white font-bold hover:text-black">
                            Book Now
                        </Button>

                        <div className="flex items-center gap-4">
                            <span className="rounded-full bg-foreground p-3"> <PhoneCall /></span>
                            <div>
                                <span className="font-extralight">Call us</span>
                                <p className="text-lg font-semibold">(555) 123-4567</p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default About;
