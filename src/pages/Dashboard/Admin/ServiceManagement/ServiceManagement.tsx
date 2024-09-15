import AddService from "@/components/Dashboard/AddService";
import {
    AlertDialog,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

import {
    Dialog,
    DialogContent,

    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useGetServicesQuery } from "@/redux/features/service/serviceApi";
import { Edit,Trash } from "lucide-react";

const ServiceManagement = () => {
    //const [isAddServiceModalOpen,setIsAddServiceModalOpen] = useState(false)

    const { data: services,isLoading,isError } = useGetServicesQuery(undefined);



    return (
        <div className="text-white w-full max-w-screen-2xl mx-auto pt-5">
            <div className="flex justify-between gap-2">
                <div className="flex flex-col gap-2">
                    <h2 className="text-4xl font-bold">Service Management</h2>
                    <p className="text-sm text-gray-500">Manage your services</p>
                </div>
                <div>
                    <Dialog
                    //open={isAddServiceModalOpen}
                    //onOpenChange={setIsAddServiceModalOpen}
                    >
                        <DialogTrigger asChild>
                            <Button className="mb-4">Add Service</Button>
                        </DialogTrigger>
                        <AddService />
                    </Dialog>
                </div>
            </div>
            <div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Duration</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {services?.data?.map(
                            (service: {
                                _id: string;
                                name: string;
                                description: string;
                                price: number;
                                duration: number;
                            }) => (
                                <TableRow key={service._id}>
                                    <TableCell>{service.name}</TableCell>
                                    <TableCell>{service.description}</TableCell>
                                    <TableCell>${service.price}</TableCell>
                                    <TableCell>{service.duration} minutes</TableCell>
                                    <TableCell className="flex gap-2">
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button variant="outline" className="mr-2">
                                                    <Edit />
                                                </Button>

                                            </DialogTrigger>
                                            <DialogContent>update components here</DialogContent>
                                        </Dialog>
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button variant="destructive">
                                                    <Trash />
                                                </Button>

                                            </AlertDialogTrigger>
                                            {/*<AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    This action cannot be undone. This will permanently delete the service.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction onClick={() => handleDeleteService(service.id)}>
                                                    Delete
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>*/}
                                        </AlertDialog>
                                    </TableCell>
                                </TableRow>
                            )
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default ServiceManagement;
