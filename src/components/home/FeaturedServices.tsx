import service1 from '../../assets/Image/Services/Full Services Wash.jpg'
import { Button } from '../ui/button';
import ServiceCard from '../ui/ServiceCard'

const FeaturedServices = () => {
    return (
        <div className="wrapper pt-10">

            <div className='flex justify-between items-end pb-10'>
                <div className='w-1/2 space-y-3'>
                    <p className='tracking-widest'>WHAT WE OFFER</p>
                    <h1 className='text-5xl font-bold'>We are dedicated to providing our best service to you</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta, laborum?</p>
                </div>
                <Button className='tracking-widest bg-foreground text-white hover:text-black px-7 py-7'>VIEW ALL SERVICES</Button>
            </div>
            <div className='flex flex-col sm:flex-row gap-3'>
                <ServiceCard
                    image={service1}
                    description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit accusantium quis ut ratione fuga amet veniam, temporibus aliquid quam ex."
                    title="Full Car Wash"
                />
                <ServiceCard
                    image={service1}
                    description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit accusantium quis ut ratione fuga amet veniam, temporibus aliquid quam ex."
                    title="Full Car Wash"
                />
                <ServiceCard
                    image={service1}
                    description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit accusantium quis ut ratione fuga amet veniam, temporibus aliquid quam ex."
                    title="Full Car Wash"
                />
                {/*<ServiceCard
                    image={service1}
                    description="Complete exterior and interior wash for your vehicle."
                    title="Full Car Wash"
                />*/}
            </div>
        </div>
    );
}

export default FeaturedServices;