/* eslint-disable @typescript-eslint/no-explicit-any */
// import AddService from "@/components/Dashboard/AddService";
import UpdateService from "@/components/Dashboard/UpdateService";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import {
    Dialog,
    DialogTrigger,
} from "@/components/ui/dialog";
import Loading from "@/components/ui/Loading";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useDeleteServiceMutation,useGetServicesQuery } from "@/redux/features/service/serviceApi";
import { Edit,Plus,Trash } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Tooltip,TooltipContent,TooltipProvider,TooltipTrigger } from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { Link } from "react-router-dom";

const ServiceManagement = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [sortOrder, setSortOrder] = useState<'high' | 'low' | ''>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [serviceId, setServiceId] = useState<string | null>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 500);

        return () => clearTimeout(timer);
    }, [searchTerm]);

    const { data: servicesData, isError, isLoading, error } = useGetServicesQuery({
        page: currentPage,
        search: debouncedSearchTerm,
        category: selectedCategory === 'all' ? '' : selectedCategory,
        sortBy: sortOrder === 'high' ? 'desc' : sortOrder === 'low' ? 'asc' : '',
    });

    console.log(servicesData)

    const services = servicesData?.data;
    const meta = servicesData?.data?.meta;
    const [deleteService] = useDeleteServiceMutation();

    if (isError && error) {
        const apiError = error as { data?: { message?: string } };
        toast.error(apiError.data?.message || "Something went wrong");
    }

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const generatePaginationNumbers = () => {
        if (!meta?.totalPages) return [];
        
        const pageNumbers: number[] = [];
        const currentPage = meta.page;
        const totalPages = meta.totalPages;
        
        pageNumbers.push(1);
        const start = Math.max(2, currentPage - 1);
        const end = Math.min(totalPages - 1, currentPage + 1);
        
        if (start > 2) pageNumbers.push(-1);
        
        for (let i = start; i <= end; i++) {
            pageNumbers.push(i);
        }
        
        if (end < totalPages - 1) pageNumbers.push(-1);
        
        if (totalPages > 1) pageNumbers.push(totalPages);
        
        return pageNumbers;
    };

    const renderList = (items: string[]) => (
        <ul className="list-disc pl-4">
            {items.map((item,index) => (
                <li key={index}>{item}</li>
            ))}
        </ul>
    );

    return (
        <div className="text-white min-h-screen p-5 relative">
            {isLoading && <Loading />}
            <div className="flex justify-between gap-2 mb-6">
                <div className="flex flex-col gap-2">
                    <h2 className="text-4xl font-bold">Service Management</h2>
                    <p className="text-sm text-gray-500">Manage your services</p>
                </div>
              
                        <Button asChild>
                            <Link to="/dashboard/add-service">
                                <Plus className="h-4 w-4 mr-2" />
                                Add Service
                            </Link>
                        </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="relative">
                    <Input
                        placeholder="Search services..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bg-white text-black"
                    />
                </div>
                
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="bg-white text-black">
                        <SelectValue placeholder="Filter by Category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="all">All Categories</SelectItem>
                            <SelectItem value="basicWash">Basic Wash</SelectItem>
                            <SelectItem value="detailing">Detailing</SelectItem>
                            <SelectItem value="specialtyService">Specialty Service</SelectItem>
                            <SelectItem value="premiumPackages">Premium Packages</SelectItem>
                            <SelectItem value="ecoFriendly">Eco-Friendly</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>

                <Select value={sortOrder} onValueChange={(value) => setSortOrder(value as 'high' | 'low' | '')}>
                    <SelectTrigger className="bg-white text-black">
                        <SelectValue placeholder="Sort by Price" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="high">Price: High to Low</SelectItem>
                            <SelectItem value="low">Price: Low to High</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            <CardContent className="bg-white/5 rounded-lg backdrop-blur-sm">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Duration</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Benefits</TableHead>
                            <TableHead>Suitable For</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {services?.data && services.data.length > 0 ? (
                            services.data.map((service: any) => (
                                <TableRow key={service._id}>
                                    <TableCell>{service.name}</TableCell>
                                    <TableCell>{service.description}</TableCell>
                                    <TableCell>${service.price}</TableCell>
                                    <TableCell>{service.duration} minutes</TableCell>
                                    <TableCell className="capitalize">{service.category}</TableCell>
                                    <TableCell>
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    {service.benefits.slice(0,2).join(', ')}
                                                    {service.benefits.length > 2 && '...'}
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <div className="max-w-xs">
                                                        <strong>Benefits:</strong>
                                                        {renderList(service.benefits)}
                                                    </div>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </TableCell>
                                    <TableCell>
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    {service.suitableFor.slice(0,2).join(', ')}
                                                    {service.suitableFor.length > 2 && '...'}
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <div className="max-w-xs">
                                                        <strong>Suitable For:</strong>
                                                        {renderList(service.suitableFor)}
                                                    </div>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </TableCell>
                                    <TableCell className="flex gap-2">
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button onClick={() => setServiceId(service._id)} variant="outline" className="mr-2">
                                                    <Edit />
                                                </Button>
                                            </DialogTrigger>
                                            {serviceId === service._id && <UpdateService serviceId={serviceId as string} />}
                                        </Dialog>
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button variant="destructive">
                                                    <Trash />
                                                </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        This action cannot be undone. This will permanently delete the service.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                    <AlertDialogAction
                                                        onClick={async () => {
                                                            try {
                                                                await deleteService(service._id).unwrap();
                                                                toast.success("Service Deleted");
                                                            } catch (error) {
                                                                console.error('Error deleting service:',error);
                                                                toast.error("Failed to delete service");
                                                            }
                                                        }}
                                                    >
                                                        Delete
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={8} className="text-center py-4">
                                    No services available
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>

            {meta && (
                <div className="mt-8 flex justify-center">
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
                </div>
            )}
        </div>
    );
};

export default ServiceManagement;
