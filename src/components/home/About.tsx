import { motion,useAnimation,useInView } from "framer-motion";
import { CheckCircle,PhoneCall } from "lucide-react";
import { useEffect,useRef } from "react";
import hero1 from "../../assets/heroImage/hero4.jpg";
import hero2 from "../../assets/heroImage/hero5.jpeg";
import { Button } from "../ui/button";

const About = () => {
    const ref = useRef(null);
    const isInView = useInView(ref,{ once: true,amount: 0.3 });
    const mainControls = useAnimation();

    useEffect(() => {
        if (isInView) {
            mainControls.start("visible");
        }
    },[isInView,mainControls]);

    return (
        <motion.div
            ref={ref}
            variants={{
                hidden: { opacity: 0,y: 75 },
                visible: { opacity: 1,y: 0 },
            }}
            initial="hidden"
            animate={mainControls}
            transition={{ duration: 0.5,delay: 0.25 }}
            className="wrapper py-32 z-30"
        >
            <div className="flex flex-col lg:flex-row gap-9 justify-center">
                <motion.div
                    variants={{
                        hidden: { opacity: 0,x: -50 },
                        visible: { opacity: 1,x: 0 },
                    }}
                    className="relative w-11/12"
                >
                    <img src={hero1} alt="Car being washed" className="" />
                    <motion.img
                        variants={{
                            hidden: { opacity: 0,y: 50 },
                            visible: { opacity: 1,y: 0 },
                        }}
                        transition={{ delay: 0.2 }}
                        src={hero2}
                        alt="Detailed car interior"
                        className="w-72 absolute -right-10 border-[12px] border-background -bottom-4"
                    />
                </motion.div>
                <motion.div
                    variants={{
                        hidden: { opacity: 0,x: 50 },
                        visible: { opacity: 1,x: 0 },
                    }}
                    className="flex flex-col gap-5"
                >
                    <motion.p
                        variants={{
                            hidden: { opacity: 0,y: -20 },
                            visible: { opacity: 1,y: 0 },
                        }}
                        className='tracking-widest'
                    >
                        ABOUT SPARKLE CAR WASH
                    </motion.p>
                    <motion.h1
                        variants={{
                            hidden: { opacity: 0,y: -20 },
                            visible: { opacity: 1,y: 0 },
                        }}
                        className="text-5xl font-bold"
                    >
                        Your Trusted Car Wash and Detailing Center
                    </motion.h1>
                    <motion.div
                        variants={{
                            hidden: { opacity: 0,y: -20 },
                            visible: { opacity: 1,y: 0 },
                        }}
                    >
                        At Sparkle Car Wash, we're dedicated to keeping your vehicle looking its best.
                        With state-of-the-art equipment and eco-friendly products, we provide top-notch
                        car washing and detailing services that will make your car shine like new.
                    </motion.div>
                    <motion.div
                        variants={{
                            hidden: { opacity: 0,y: -20 },
                            visible: { opacity: 1,y: 0 },
                        }}
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
                        variants={{
                            hidden: { scaleX: 0 },
                            visible: { scaleX: 1 },
                        }}
                        className="border-white"
                    />
                    <motion.div
                        variants={{
                            hidden: { opacity: 0,y: 20 },
                            visible: { opacity: 1,y: 0 },
                        }}
                        className="flex flex-col lg:flex-row gap-10 sm:items-center"
                    >
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
