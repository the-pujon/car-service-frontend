/* eslint-disable @typescript-eslint/no-explicit-any */
import AddService from "@/components/Dashboard/AddService";
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
import { Edit,Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Tooltip,TooltipContent,TooltipProvider,TooltipTrigger } from "@/components/ui/tooltip";

const ServiceManagement = () => {
    const { data: services,isLoading,isError,error } = useGetServicesQuery(undefined);
    const [deleteService] = useDeleteServiceMutation();
    const [serviceId,setServiceId] = useState<string | null>(null);

    if (isError) {
        console.error(error);
        const apiError = error as { data?: { message?: string } };
        toast.error(apiError.data?.message || "Something went wrong");
    }

    const renderList = (items: string[]) => (
        <ul className="list-disc pl-4">
            {items.map((item,index) => (
                <li key={index}>{item}</li>
            ))}
        </ul>
    );

    return (
        <div className="text-white h-screen p-5 relative overflow-y-auto">
            {isLoading && <Loading />}
            <div className="flex justify-between gap-2">
                <div className="flex flex-col gap-2">
                    <h2 className="text-4xl font-bold">Service Management</h2>
                    <p className="text-sm text-gray-500">Manage your services</p>
                </div>
                <div>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="mb-4">Add Service</Button>
                        </DialogTrigger>
                        <AddService />
                    </Dialog>
                </div>
            </div>
            <CardContent>
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
        </div>
    );
};

export default ServiceManagement;
