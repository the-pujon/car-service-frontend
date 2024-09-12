import { AlertDialog,AlertDialogAction,AlertDialogCancel,AlertDialogContent,AlertDialogDescription,AlertDialogFooter,AlertDialogHeader,AlertDialogTitle,AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Card,CardContent,CardDescription,CardHeader,CardTitle } from '@/components/ui/card'
import { Dialog,DialogContent,DialogDescription,DialogFooter,DialogHeader,DialogTitle,DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Table,TableBody,TableCell,TableHead,TableHeader,TableRow } from '@/components/ui/table'
import React,{ useState } from 'react'

const ServiceManagement = () => {
    const [services,setServices] = useState([
        { id: 1,name: "Haircut",price: 30 },
        { id: 2,name: "Manicure",price: 25 },
        { id: 3,name: "Pedicure",price: 35 },
    ])
    const [isAddServiceModalOpen,setIsAddServiceModalOpen] = useState(false)
    const [newService,setNewService] = useState({ name: "",price: "" })
    const [editingService,setEditingService] = useState(null)

    const handleAddService = () => {
        const serviceToAdd = {
            id: services.length + 1,
            name: newService.name,
            price: parseFloat(newService.price),
        }
        setServices([...services,serviceToAdd])
        setNewService({ name: "",price: "" })
        setIsAddServiceModalOpen(false)
    }

    const handleUpdateService = () => {
        const updatedServices = services.map((service) =>
            service.id === editingService.id ? editingService : service
        )
        setServices(updatedServices)
        setEditingService(null)
    }

    const handleDeleteService = (id) => {
        const updatedServices = services.filter((service) => service.id !== id)
        setServices(updatedServices)
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Service Management</CardTitle>
                <CardDescription>Manage your services</CardDescription>
            </CardHeader>
            <CardContent>
                <Dialog open={isAddServiceModalOpen} onOpenChange={setIsAddServiceModalOpen}>
                    <DialogTrigger asChild>
                        <Button className="mb-4">Add Service</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add New Service</DialogTitle>
                            <DialogDescription>Enter the details for the new service.</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Name
                                </Label>
                                <Input
                                    id="name"
                                    value={newService.name}
                                    onChange={(e) => setNewService({ ...newService,name: e.target.value })}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="price" className="text-right">
                                    Price
                                </Label>
                                <Input
                                    id="price"
                                    type="number"
                                    value={newService.price}
                                    onChange={(e) => setNewService({ ...newService,price: e.target.value })}
                                    className="col-span-3"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button onClick={handleAddService}>Add Service</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {services.map((service) => (
                            <TableRow key={service.id}>
                                <TableCell>{service.name}</TableCell>
                                <TableCell>${service.price}</TableCell>
                                <TableCell>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant="outline" className="mr-2" onClick={() => setEditingService(service)}>
                                                Update
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Update Service</DialogTitle>
                                                <DialogDescription>Edit the details for this service.</DialogDescription>
                                            </DialogHeader>
                                            <div className="grid gap-4 py-4">
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label htmlFor="edit-name" className="text-right">
                                                        Name
                                                    </Label>
                                                    <Input
                                                        id="edit-name"
                                                        value={editingService?.name || ""}
                                                        onChange={(e) => setEditingService({ ...editingService,name: e.target.value })}
                                                        className="col-span-3"
                                                    />
                                                </div>
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label htmlFor="edit-price" className="text-right">
                                                        Price
                                                    </Label>
                                                    <Input
                                                        id="edit-price"
                                                        type="number"
                                                        value={editingService?.price || ""}
                                                        onChange={(e) => setEditingService({ ...editingService,price: e.target.value })}
                                                        className="col-span-3"
                                                    />
                                                </div>
                                            </div>
                                            <DialogFooter>
                                                <Button onClick={handleUpdateService}>Update Service</Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant="destructive">Delete</Button>
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
                                                <AlertDialogAction onClick={() => handleDeleteService(service.id)}>
                                                    Delete
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

export default ServiceManagement