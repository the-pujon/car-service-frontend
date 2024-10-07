import { motion } from 'framer-motion';
import { Swiper,SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { EffectFade,Navigation,Pagination,Autoplay } from 'swiper/modules';

import hero1 from "../../assets/heroImage/hero7.jpg"
import hero2 from "../../assets/heroImage/hero8.jpg"
import hero3 from "../../assets/heroImage/hero9.jpg"
import hero4 from "../../assets/heroImage/hero10.jpg"
import hero5 from "../../assets/heroImage/hero11.jpg"
import hero6 from "../../assets/heroImage/hero12.jpg"
import { Link } from 'react-router-dom';


const Hero = () => {
    return (
        <div>
            <section className="relative overflow-hidden bg-gradient-to-b pb-12 pt-16 sm:pb-16 sm:pt-24 lg:pb-24 xl:pb-32 xl:pt-30">
                <motion.div
                    initial={{ opacity: 0,y: 20 }}
                    animate={{ opacity: 1,y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-20 mx-auto wrapper px-6 lg:px-8"
                >
                    <div className="mx-auto max-w-2xl text-center">
                        <motion.h1
                            initial={{ opacity: 0,y: -20 }}
                            animate={{ opacity: 1,y: 0 }}
                            transition={{ duration: 0.8,delay: 0.2 }}
                            className="text-4xl font-bold tracking-tight text-gray-50 sm:text-6xl"
                        >
                            Sustainably Spotless :
                            <span className="text-foreground"> Car Washing
                            </span>
                        </motion.h1>
                        <motion.h2
                            initial={{ opacity: 0,y: -20 }}
                            animate={{ opacity: 1,y: 0 }}
                            transition={{ duration: 0.8,delay: 0.4 }}
                            className="mt-6 text-lg leading-8 text-gray-200"
                        >
                            Protect your car and the planet with our eco-friendly car cleaning services.
                        </motion.h2>
                        <motion.div
                            initial={{ opacity: 0,y: 20 }}
                            animate={{ opacity: 1,y: 0 }}
                            transition={{ duration: 0.8,delay: 0.6 }}
                            className="mt-10 flex flex-col sm:flex-row gap-4 items-center justify-center gap-x-6"
                        >
                            <Link to={'/services'} className="bg-foreground hover:bg-gray-200 hover:text-black text-white font-bold px-4 xl:px-6 py-2 xl:py-3 w-full sm:w-fit" >
                                <>Book Now</>
                            </Link>

                            <Link to={'/services'} className="bg-foreground hover:bg-gray-200 hover:text-black text-white font-bold px-4 xl:px-6 py-2 xl:py-3 w-full sm:w-fit" >
                                <>Check our services</>
                            </Link>
                        </motion.div>
                    </div>
                    <motion.div
                        initial={{ opacity: 0,scale: 0.9 }}
                        animate={{ opacity: 1,scale: 1 }}
                        transition={{ duration: 0.8,delay: 0.8 }}
                        className="relative mx-auto mt-10 max-w-7xl"
                    >
                        <Swiper
                            spaceBetween={30}
                            effect={'fade'}
                            navigation={false}
                            pagination={false}
                            autoplay={true}
                            grabCursor={true}
                            modules={[EffectFade,Navigation,Pagination,Autoplay]}
                            className="mySwiper border border-white rounded-2xl "
                        >

                            {
                                [hero3,hero2,hero4,hero1,hero5,hero6].map((heroImage,i) => (
                                    <SwiperSlide key={i} className='p-1'>
                                        <motion.img
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.5 }}
                                            className="w-full rounded-2xl border border-gray-100 "
                                            src={heroImage} alt="" />
                                    </SwiperSlide>
                                ))
                            }
                        </Swiper>
                    </motion.div>
                </motion.div>
            </section>
        </div>
    )
}

export default Hero