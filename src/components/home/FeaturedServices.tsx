/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetServicesQuery } from '@/redux/features/service/serviceApi';
import { Button } from '../ui/button';
import ServiceCard from '../ui/ServiceCard'
import { Link } from 'react-router-dom';

const FeaturedServices = () => {

    const { data: services,isError,isLoading } = useGetServicesQuery(undefined);
    return (
        <div className="wrapper pt-32">

            <div className='flex justify-between items-end pb-10'>
                <div className='w-1/2 space-y-3'>
                    <p className='tracking-widest'>WHAT WE OFFER</p>
                    <h1 className='text-5xl font-bold'>We are dedicated to providing our best service to you</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta, laborum?</p>
                </div>
                <Button asChild className='tracking-widest bg-foreground text-white hover:text-black px-7 py-7'>
                    <Link to="/services">VIEW ALL SERVICES</Link>
                </Button>
            </div>
            <div className='flex flex-col sm:flex-row gap-3'>
                {services?.data?.slice(0,3).map((service: any) => (
                    <ServiceCard
                        key={service._id}
                        image={service.image}
                        description={service.description}
                        title={service.name}
                        price={service.price}
                        _id={service._id}
                    />
                ))}
            </div>
        </div>
    );
}

export default FeaturedServices;