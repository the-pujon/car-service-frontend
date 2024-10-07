import { motion } from 'framer-motion';
import SlotCounter from 'react-slot-counter';
import banner from "../../assets/heroImage/hero7.jpg"

const experienceData = [
    { value: "15",label: "Years of Experience" },
    { value: "500",label: "Projects Completed" },
    { value: "100",label: "Happy Clients" },
    { value: "50",label: "Team Members" },
];

const Experience = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className='backdrop-blur-sm'
        >
            <div className="wrapper mt-16 md:mt-32 z-50 w-full min-h-[30vh]"
                style={{
                    background: `linear-gradient(to bottom, rgba(17, 24, 39, 0.9) 50%, rgba(4, 53, 190, 0.2) 100%), url(${banner})`,
                    backgroundAttachment: "fixed",
                    backgroundSize: "cover",
                    backgroundPosition: 'center'
                }}
            >
                <div className='flex flex-col lg:flex-row justify-between items-center p-4 md:p-8'>
                    <motion.div
                        initial={{ x: -50,opacity: 0 }}
                        whileInView={{ x: 0,opacity: 1 }}
                        transition={{ duration: 0.5,delay: 0.2 }}
                        className='w-full lg:w-1/4 mb-8 lg:mb-0'
                    >
                        <h1 className='text-3xl md:text-5xl tracking-wider font-bold text-white'>We have</h1>
                        <p className='text-base text-gray-300 pt-2'>More Than...</p>
                    </motion.div>
                    <div className='w-full lg:w-3/4'>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {experienceData.map((item,index) => (
                                <motion.div
                                    key={index}
                                    initial={{ y: 50,opacity: 0 }}
                                    whileInView={{ y: 0,opacity: 1 }}
                                    transition={{ duration: 0.5,delay: 0.1 * index }}
                                    className="flex flex-col text-white justify-center items-center py-6 px-4 font-semibold w-full border-t lg:border-t-0 lg:border-l border-white first:border-t-0 first:lg:border-l-0"
                                >
                                    <div className='flex flex-col items-center'>
                                        <motion.div
                                            initial={{ scale: 0.5 }}
                                            whileInView={{ scale: 1 }}
                                            transition={{ duration: 0.5,delay: 0.3 + 0.1 * index }}
                                            className='text-4xl md:text-5xl font-semibold'
                                        >
                                            <SlotCounter
                                                value={item.value}
                                                animateOnVisible={{ triggerOnce: false,rootMargin: '0px 0px -100px 0px' }}
                                            />
                                        </motion.div>
                                        <motion.p
                                            initial={{ opacity: 0 }}
                                            whileInView={{ opacity: 1 }}
                                            transition={{ duration: 0.5,delay: 0.5 + 0.1 * index }}
                                            className='text-lg md:text-xl tracking-wider pt-2 text-center'
                                        >
                                            {item.label}
                                        </motion.p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default Experience