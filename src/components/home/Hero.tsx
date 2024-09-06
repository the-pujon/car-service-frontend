import { Swiper,SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import required modules
import { EffectFade,Navigation,Pagination,Autoplay } from 'swiper/modules';

import hero1 from "../../assets/heroImage/hero7.jpg"
import hero2 from "../../assets/heroImage/hero8.jpg"
import hero3 from "../../assets/heroImage/hero9.jpg"
import hero4 from "../../assets/heroImage/hero10.jpg"
import hero5 from "../../assets/heroImage/hero11.jpg"
import hero6 from "../../assets/heroImage/hero12.jpg"


const Hero = () => {
    return (
        <div>
            <section
                className="relative overflow-hidden bg-gradient-to-b  pb-12 pt-16 sm:pb-16 sm:pt-24 lg:pb-24 xl:pb-32 xl:pt-30">
                <div className="relative  z-20 mx-auto wrapper px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-50 sm:text-6xl">
                            Sustainably Spotless :
                            <span className="text-foreground"> Car Washing
                            </span>
                        </h1>
                        <h2 className="mt-6 text-lg leading-8 text-gray-200">
                            Protect your car and the planet with our eco-friendly car cleaning services.
                        </h2>
                        <div className="mt-10 flex flex-col sm:flex-row gap-4 items-center justify-center gap-x-6">
                            <button className="bg-foreground hover:bg-gray-200 hover:text-black text-white font-bold px-4 xl:px-6 py-2 xl:py-3 w-full sm:w-fit" >
                                <>Book Now</>
                            </button>
                            <button className="bg-foreground hover:bg-gray-200 hover:text-black text-white font-bold px-4 xl:px-6 py-2 xl:py-3 w-full sm:w-fit" >
                                <>Check our services</>
                            </button>
                        </div>
                    </div>
                    <div className="relative mx-auto mt-10 max-w-7xl">
                        {/*<img className="w-full rounded-2xl border border-gray-100 shadow" src="https://images.unsplash.com/photo-1587502536575-6dfba0a6e017" alt="" />*/}
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
                                        <img className="w-full rounded-2xl border border-gray-100 " src={heroImage} alt="" />
                                    </SwiperSlide>
                                ))
                            }
                        </Swiper>
                    </div>
                </div >
            </section >
        </div >
    )
}

export default Hero