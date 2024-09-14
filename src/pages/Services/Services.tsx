//import { Button } from '@/components/ui/button'
import { Select,SelectContent,SelectGroup,SelectItem,SelectTrigger,SelectValue } from '@/components/ui/select'
import ServiceCard from '@/components/ui/ServiceCard'
import { Search } from 'lucide-react'
import React,{ useState } from 'react'
import service1 from '../../assets/Image/Services/Full Services Wash.jpg'
import { RadioGroup,RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { useGetServicesQuery } from '@/redux/features/service/serviceApi'

const Services: React.FC = () => {

    interface Category {
        value: string;
        name: string;
    }

    const categories: Category[] = [
        { value: 'all',name: 'All' },
        { value: 'basicWash',name: 'Basic Wash' },
        { value: 'detailing',name: 'Detailing' },
        { value: 'specialtyService',name: 'Specialty Service' },
        { value: 'premiumPackages',name: 'Premium Packages' },
        { value: 'ecoFriendly',name: 'Eco-Friendly Services' },
        { value: 'convenience',name: 'Convenience Services' },
        { value: 'additional',name: 'Additional Services' }
    ];

    const [selectedCategory,setSelectedCategory] = useState<string>('all');

    // Handler for radio button change
    const handleRadioChange = (value: string) => {
        setSelectedCategory(value);
        // Add any additional logic needed when a radio button is selected
        //alert(value);
    };


    const { data,isError,isLoading } = useGetServicesQuery(undefined)
    console.log(data)


    return (
        <div className='wrapper mt-10'>
            <div className='flex gap-3'>
                <div className='w-1/4'>
                    <RadioGroup value={selectedCategory} onValueChange={handleRadioChange} >
                        {categories.map(category => (
                            <div key={category.value} className="flex items-center gap-2 py-2 border-b">
                                <RadioGroupItem value={category.value} id={category.value} />
                                <Label htmlFor={category.value}>{category.name}</Label>
                            </div>
                        ))}
                    </RadioGroup>
                </div>
                <div className='flex flex-col gap-4 w-full' >
                    <div className='flex gap-2'>
                        <div className='flex gap-3 w-full bg-white px-4 py-2' >
                            <input type="text" name="serviceSearch" id="serviceSearch" placeholder='search here' className='w-full bg-none outline-none text-black' />
                            <button><Search className='text-black' /></button>
                        </div>
                        <div>
                            <Select>
                                <SelectTrigger className="outline-none bg-white text-black w-[180px]">
                                    <SelectValue placeholder="Sort by Price" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="high">High to low</SelectItem>
                                        <SelectItem value="low">low to high</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <hr />
                    <div className='grid grid-cols-1 gap-y-4 gap-x-2 md:grid-cols-2 lg:grid-cols-3 my-8'>
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
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Services