import SlotCounter from 'react-slot-counter';
import banner from "../../assets/heroImage/hero7.jpg"


const Experience = () => {
    return (
        <div className='backdrop-blur-sm'>
            <div className="wrapper mt-32 z-50 w-full max-h-[50vh] "
                //style={{ backgroundImage: 'url(../../assets/heroImage/hero12.jpg)',backgroundSize: 'cover',backgroundPosition: 'center' }}
                style={{
                    background: `linear-gradient(to bottom, rgba(17, 24, 39, 0.9) 50%, rgba(4, 53, 190, 0.2) 100%), url(${banner})`,
                    backgroundAttachment: "fixed",
                    backgroundSize: "cover",
                    backgroundPosition: 'center'
                }}
            >
                <div className='flex justify-between items-center'  >
                    <div className='w-1/4'>
                        <h1 className='text-5xl tracking-wider font-bold'>We have</h1>
                        <p className='text-base text-gray-300 pt-2'>More Then...</p>
                    </div>
                    <div className=''>
                        <div className=" py-10 grid grid-cols-4 divide-white place-items-center divide-x ">
                            <div className="flex flex-col text-xl text-white  justify-center items-start py-6 px-9 font-semibold w-full">
                                <div className='flex flex-col text-5xl font-semibold'>
                                    <SlotCounter
                                        value="54321"
                                        animateOnVisible={{ triggerOnce: false,rootMargin: '0px 0px -100px 0px' }}
                                    />
                                    <p className='text-xl tracking-wider pt-2'>Years of Experience</p>
                                </div>

                            </div>
                            <div className="flex flex-col text-xl text-white  justify-center items-start py-6 px-9 font-semibold w-full">
                                <div className='flex flex-col text-5xl font-semibold'>
                                    <SlotCounter
                                        value="54321"
                                        animateOnVisible={{ triggerOnce: false,rootMargin: '0px 0px -100px 0px' }}
                                    />
                                    <p className='text-xl tracking-wider pt-2'>Years of Experience</p>
                                </div>

                            </div>
                            <div className="flex flex-col text-xl text-white  justify-center items-start py-6 px-9 font-semibold w-full" >
                                <div className='flex flex-col text-5xl font-semibold'>
                                    <SlotCounter
                                        value="54321"
                                        animateOnVisible={{ triggerOnce: false,rootMargin: '0px 0px -100px 0px' }}
                                    />
                                    <p className='text-xl tracking-wider pt-2'>Years of Experience</p>
                                </div>

                            </div>
                            <div className="flex flex-col text-xl text-white  justify-center items-start py-6 px-9 font-semibold w-full">
                                <div className='flex flex-col text-5xl font-semibold'>
                                    <SlotCounter
                                        value="54321"
                                        animateOnVisible={{ triggerOnce: false,rootMargin: '0px 0px -100px 0px' }}
                                    />
                                    <p className='text-xl tracking-wider pt-2'>Years of Experience</p>
                                </div>

                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Experience