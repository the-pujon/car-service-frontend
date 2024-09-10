import { CheckCircle,PhoneCall } from "lucide-react";
import hero1 from "../../assets/heroImage/hero4.jpg";
import hero2 from "../../assets/heroImage/hero5.jpeg";
import { Button } from "../ui/button";

const About = () => {
    return (
        <div className="wrapper py-32 z-30">
            <div className="flex gap-9 justify-center">
                <div className="relative w-11/12">
                    <img src={hero1} alt="" className="" />
                    <img
                        src={hero2}
                        alt=""
                        className="w-72 absolute -right-10 border-[12px] border-background -bottom-4"
                    />
                </div>
                <div className="flex flex-col gap-5">
                    <p className='tracking-widest'>WHO WE ARE?</p>
                    <h1 className="text-5xl font-bold">
                        Professional Car Wash and Detailing Center
                    </h1>
                    <div>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis
                        ab, sunt voluptatum nam esse magni quisquam harum tenetur? Ducimus,
                        modi illo? Ullam error adipisci sed, odio nostrum praesentium
                        officiis eveniet!
                    </div>
                    <div className="flex justify-around ">
                        <div className="flex flex-col gap-3">
                            <p className="flex items-center justify-center gap-2">

                                <CheckCircle className="inline" size={18} /> Lorem ipsum dolor
                                sit amet.
                            </p>
                            <p className="flex items-center justify-center gap-2">

                                <CheckCircle className="inline" size={18} /> Lorem ipsum dolor
                                sit amet.
                            </p>
                            <p className="flex items-center justify-center gap-2">

                                <CheckCircle className="inline" size={18} /> Lorem ipsum dolor
                                sit amet.
                            </p>
                        </div>
                        <div className="flex flex-col gap-3">
                            <p className="flex items-center justify-center gap-2">
                                <CheckCircle className="inline" size={18} /> Lorem ipsum dolor
                                sit amet.
                            </p>
                            <p className="flex items-center justify-center gap-2">
                                <CheckCircle className="inline" size={18} /> Lorem ipsum dolor
                                sit amet.
                            </p>
                            <p className="flex items-center justify-center gap-2">
                                <CheckCircle className="inline" size={18} /> Lorem ipsum dolor
                                sit amet.
                            </p>
                        </div>
                    </div>
                    <hr className=" border-white" />
                    <div className="flex gap-10 items-center">
                        <Button className="bg-foreground text-white font-bold hover:text-black ">
                            More about us
                        </Button>

                        <div className="flex items-center gap-4">
                            <span className="rounded-full bg-foreground p-3"> <PhoneCall /></span>
                            <div>
                                <span className="font-extralight">Call us</span>
                                <p className="text-lg font-semibold">9347983749327438</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
