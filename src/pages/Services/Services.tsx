import { useState,useEffect } from 'react'
import { Select,SelectContent,SelectGroup,SelectItem,SelectTrigger,SelectValue } from '@/components/ui/select'
import ServiceCard from '@/components/ui/ServiceCard'
import { Search } from 'lucide-react'
import { RadioGroup,RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { useGetServicesQuery } from '@/redux/features/service/serviceApi'
import Loading from '@/components/ui/Loading'

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
    const [searchTerm,setSearchTerm] = useState<string>('');
    const [sortOrder,setSortOrder] = useState<'high' | 'low' | ''>('');

    const { data: services,isError,isLoading } = useGetServicesQuery(undefined);

    const handleRadioChange = (value: string) => {
        setSelectedCategory(value);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleSortChange = (value: string) => {
        setSortOrder(value as 'high' | 'low' | '');
    };

    const filteredAndSortedServices = services?.data
        ?.filter(service =>
            (selectedCategory === 'all' || service.category === selectedCategory) &&
            (service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                service.description.toLowerCase().includes(searchTerm.toLowerCase()))
        )
        .sort((a,b) => {
            if (sortOrder === 'high') return b.price - a.price;
            if (sortOrder === 'low') return a.price - b.price;
            return 0;
        });

    //if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading services</div>;

    return (
        <div className='wrapper mt-10'>
            <div className='flex gap-3'>
                <div className='w-1/4 sticky top-4 self-start'>
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
                            <input
                                type="text"
                                name="serviceSearch"
                                id="serviceSearch"
                                placeholder='search here'
                                className='w-full bg-none outline-none text-black'
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                            <button><Search className='text-black' /></button>
                        </div>
                        <div>
                            <Select onValueChange={handleSortChange}>
                                <SelectTrigger className="outline-none bg-white text-black w-[180px]">
                                    <SelectValue placeholder="Sort by Price" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="high">High to low</SelectItem>
                                        <SelectItem value="low">Low to high</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <hr />
                    <div className='relative min-h-[70vh]'>
                        {
                            isLoading && <Loading />
                        }
                        <div className='grid grid-cols-1 gap-y-4 gap-x-2 md:grid-cols-2 lg:grid-cols-3 my-8'>
                            {filteredAndSortedServices?.map(service => (
                                <ServiceCard
                                    key={service._id}
                                    image={service.image}
                                    description={service.description}
                                    title={service.name}
                                    price={service.price}
                                //duration={service.duration}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Services