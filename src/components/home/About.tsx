import { CheckCircle,PhoneCall } from "lucide-react";
import hero1 from "../../assets/heroImage/hero4.jpg";
import hero2 from "../../assets/heroImage/hero5.jpeg";
import { Button } from "../ui/button";

const About = () => {
    return (
        <div className="wrapper pt-20">
            <div className="flex gap-9">
                <div className="relative w-10/12">
                    <img src={hero1} alt="" className="w-[44rem]" />
                    <img
                        src={hero2}
                        alt=""
                        className="w-72 absolute -right-4 border-[12px] border-background -bottom-4"
                    />
                </div>
                <div className="flex flex-col gap-5">
                    <h2 className="text-3xl font-light  ">Who we are?</h2>
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
