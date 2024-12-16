/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetServicesQuery } from '@/redux/features/service/serviceApi';
import { Button } from '../ui/button';
import ServiceCard from '../ui/ServiceCard'
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const FeaturedServices = () => {

    const { data: servicesData } = useGetServicesQuery({
        page: 1,
        search: '',
        category: '',
        sortBy: 'desc',
    });
    const services = servicesData?.data;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20,opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 100
            }
        }
    };

    return (
        <motion.div
            className="wrapper pt-32"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <div className='flex flex-col lg:flex-row justify-between sm:items-end pb-10'>
                <div className='w-full lg:w-1/2 space-y-3'>
                    <motion.p variants={itemVariants} className='tracking-widest'>OUR SERVICES</motion.p>
                    <motion.h1 variants={itemVariants} className='text-5xl font-bold'>Professional Car Washing Services</motion.h1>
                    <motion.p variants={itemVariants}>Experience the best car care with our range of washing and detailing services.</motion.p>
                </div>
                <motion.div variants={itemVariants}>
                    <Button asChild className='tracking-widest bg-foreground text-white hover:text-black px-7 py-7'>
                        <Link to="/services">VIEW ALL SERVICES</Link>
                    </Button>
                </motion.div>
            </div>
            <motion.div
                className='flex flex-col sm:flex-row gap-3'
                variants={containerVariants}
            >
                {services?.data?.slice(0,4).map((service: any,index: number) => (
                    <motion.div
                        key={service._id}
                        variants={itemVariants}
                        custom={index}
                    >
                        <ServiceCard
                            image={service.image}
                            description={service.description}
                            title={service.name}
                            price={service.price}
                            _id={service._id}
                        />
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    );
}

export default FeaturedServices;