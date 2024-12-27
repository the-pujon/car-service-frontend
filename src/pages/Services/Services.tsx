/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState, useEffect } from 'react'
import { Select,SelectContent,SelectGroup,SelectItem,SelectTrigger,SelectValue } from '@/components/ui/select'
import ServiceCard from '@/components/ui/ServiceCard'
import { Search,Menu,X } from 'lucide-react'
import { RadioGroup,RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { useGetServicesQuery } from '@/redux/features/service/serviceApi'
// import Loading from '@/components/ui/Loading'
import { Button } from '@/components/ui/button'
import { motion,AnimatePresence } from 'framer-motion'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import ServiceCardSkeleton from '@/components/skeletons/ServiceCardSkeleton'

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

export default function Services() {
    const [selectedCategory,setSelectedCategory] = useState<string>('all');
    const [searchTerm,setSearchTerm] = useState<string>('');
    const [debouncedSearchTerm,setDebouncedSearchTerm] = useState<string>('');
    const [sortOrder,setSortOrder] = useState<'high' | 'low' | ''>('');
    const [currentPage,setCurrentPage] = useState<number>(1);
    const [isSidebarOpen,setIsSidebarOpen] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 500);

        return () => clearTimeout(timer);
    }, [searchTerm]);

    const { data: servicesData,isError,isLoading } = useGetServicesQuery({
        page: currentPage,
        search: debouncedSearchTerm,
        category: selectedCategory === 'all' ? '' : selectedCategory,
        sortBy: sortOrder === 'high' ? 'desc' : sortOrder === 'low' ? 'asc' : '',
    });
    
    const services = servicesData?.data;
    const meta = servicesData?.data?.meta;

   
    const handleRadioChange = (value: string) => {
        setSelectedCategory(value);
        setIsSidebarOpen(false);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleSortChange = (value: string) => {
        setSortOrder(value as 'high' | 'low' | '');
    };

    const filteredAndSortedServices = services?.data || [];

    // Pagination handlers
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const generatePaginationNumbers = () => {
        if (!meta?.totalPages) return [];
        
        const pageNumbers: number[] = [];
        const currentPage = meta.page;
        const totalPages = meta.totalPages;
        
        // Always show first page
        pageNumbers.push(1);
        
        // Calculate range around current page
        const start = Math.max(2, currentPage - 1);
        const end = Math.min(totalPages - 1, currentPage + 1);
        
        // Add ellipsis after first page if needed
        if (start > 2) {
            pageNumbers.push(-1); // -1 represents ellipsis
        }
        
        // Add pages around current page
        for (let i = start; i <= end; i++) {
            pageNumbers.push(i);
        }
        
        // Add ellipsis before last page if needed
        if (end < totalPages - 1) {
            pageNumbers.push(-1); // -1 represents ellipsis
        }
        
        // Always show last page if there's more than one page
        if (totalPages > 1) {
            pageNumbers.push(totalPages);
        }
        
        return pageNumbers;
    };

    if (isError) return <div className="text-center py-10">Error loading services</div>;

    return (
        <div className='wrapper mt-10'>
            <div className='flex flex-col md:flex-row gap-3'>
                {/* Desktop sidebar */}
                <div className="hidden md:block md:w-1/4 md:sticky md:top-44 md:self-start">
                    <div className="p-4">
                        <RadioGroup value={selectedCategory} onValueChange={handleRadioChange}>
                            {categories.map(category => (
                                <div key={category.value} className="flex items-center gap-2 py-2 border-b">
                                    <RadioGroupItem value={category.value} id={category.value} />
                                    <Label htmlFor={category.value}>{category.name}</Label>
                                </div>
                            ))}
                        </RadioGroup>
                    </div>
                </div>

                {/* Mobile sidebar */}
                <AnimatePresence>
                    {isSidebarOpen && (
                        <motion.div
                            className="md:hidden fixed inset-0 z-50 bg-primary-foreground/80 backdrop-blur-sm"
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring",stiffness: 300,damping: 30 }}
                        >
                            <div className="p-4 bg-primary-foreground">
                                <Button variant="ghost" className="mb-4 absolute top-5 right-0" onClick={() => setIsSidebarOpen(false)}>
                                    <X className='mr-2 h-4 w-4' />
                                </Button>
                                <RadioGroup value={selectedCategory} onValueChange={handleRadioChange} className='mt-10'>
                                    {categories.map(category => (
                                        <div key={category.value} className="flex items-center gap-2 py-2 border-b">
                                            <RadioGroupItem value={category.value} id={category.value} />
                                            <Label htmlFor={category.value}>{category.name}</Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className='flex flex-col gap-4 w-full'>
                    <div className='flex flex-col sm:flex-row gap-2'>
                        <div className='flex gap-3 w-full bg-white px-4 py-2 order-2 sm:order-1'>
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
                        <div className='w-full sm:w-auto order-1 sm:order-2'>
                            <Select onValueChange={handleSortChange}>
                                <SelectTrigger className="outline-none bg-white text-black w-full sm:w-[180px]">
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
                    <div className="md:hidden">
                        <Button variant="outline" className="w-full" onClick={() => setIsSidebarOpen(true)}>
                            <Menu className="mr-2 h-4 w-4" /> Filters
                        </Button>
                    </div>
                    <hr />
                    <div className='relative min-h-[70vh]'>
                        {isLoading && (
                            <div className='grid grid-cols-1 gap-y-4 gap-x-2 sm:grid-cols-2 lg:grid-cols-3 my-8'>
                                {[...Array(6)].map((_, index) => (
                                    <ServiceCardSkeleton key={index} />
                                ))}
                            </div>
                        )}
                        <motion.div
                            className='grid grid-cols-1 gap-y-4 gap-x-2 sm:grid-cols-2 lg:grid-cols-3 my-8'
                            initial="hidden"
                            animate="visible"
                            variants={{
                                hidden: { opacity: 0 },
                                visible: {
                                    opacity: 1,
                                    transition: {
                                        staggerChildren: 0.1
                                    }
                                }
                            }}
                        >
                            {filteredAndSortedServices?.map((service: any) => (
                                <motion.div
                                    key={service._id}
                                    variants={{
                                        hidden: { y: 20,opacity: 0 },
                                        visible: { y: 0,opacity: 1 }
                                    }}
                                >
                                    <ServiceCard
                                        image={service.image}
                                        category={service.category}
                                        description={service.description}
                                        title={service.name}
                                        price={service.price}
                                        _id={service._id}
                                    />
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Updated Pagination Check */}
                        {meta && (
                            <motion.div 
                                className="mt-8 mb-12"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Pagination>
                                    <PaginationContent>
                                        <PaginationItem>
                                            <PaginationPrevious 
                                                onClick={() => handlePageChange(meta.prevPage || 1)}
                                                className={!meta.hasPrevPage ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                                            />
                                        </PaginationItem>

                                        {generatePaginationNumbers().map((pageNum, index) => (
                                            <PaginationItem key={index}>
                                                {pageNum === -1 ? (
                                                    <PaginationEllipsis />
                                                ) : (
                                                    <PaginationLink
                                                        onClick={() => handlePageChange(pageNum)}
                                                        isActive={pageNum === meta.page}
                                                        className="cursor-pointer"
                                                    >
                                                        {pageNum}
                                                    </PaginationLink>
                                                )}
                                            </PaginationItem>
                                        ))}

                                        <PaginationItem>
                                            <PaginationNext 
                                                onClick={() => handlePageChange(meta.nextPage || meta.totalPages)}
                                                className={!meta.hasNextPage ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                                            />
                                        </PaginationItem>
                                    </PaginationContent>
                                </Pagination>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}