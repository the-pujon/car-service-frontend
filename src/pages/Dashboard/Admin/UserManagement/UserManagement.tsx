import { Button } from '@/components/ui/button'
import { Card,CardContent,CardDescription,CardHeader,CardTitle } from '@/components/ui/card'
import { Dialog,DialogContent,DialogHeader,DialogTitle,DialogTrigger } from '@/components/ui/dialog'
import { Select,SelectContent,SelectItem,SelectTrigger,SelectValue } from '@/components/ui/select'
import { Table,TableBody,TableCell,TableHead,TableHeader,TableRow } from '@/components/ui/table'
import React,{ useState } from 'react'
import { format } from "date-fns"

const UserManagement = () => {
    const [users,setUsers] = useState([
        {
            _id: "66e899e45b96f9b5c7a9d2dc",
            name: "Programming Hero",
            email: "web@programming-hero2.com",
            phone: "1234567890",
            role: "user",
            address: "123 Main Street, City, Country",
            createdAt: "2024-09-16T20:49:40.367Z",
            updatedAt: "2024-09-16T20:49:40.367Z",
        },
    ])

    const [bookings,setBookings] = useState([
        {
            _id: "66e89aea5b96f9b5c7a9d30e",
            customer: {
                _id: "66e899e45b96f9b5c7a9d2dc",
                name: "Programming Hero",
                email: "web@programming-hero2.com",
                phone: "1234567890",
                role: "user",
                address: "123 Main Street, City, Country",
                createdAt: "2024-09-16T20:49:40.367Z",
                updatedAt: "2024-09-16T20:49:40.367Z",
            },
            service: {
                _id: "66e86bbb5b96f9b5c7a9d270",
                name: "Bangla Wash",
                description: "Eiusmod mollit ad co",
                price: 103,
                duration: 39,
                isDeleted: false,
                image: "https://i.ibb.co/KDpV0GZ/hero8.jpg",
                createdAt: "2024-09-16T17:32:43.938Z",
                updatedAt: "2024-09-16T20:39:30.755Z",
            },
            slot: {
                _id: "66e89a8b5b96f9b5c7a9d2ec",
                service: "66e86bbb5b96f9b5c7a9d270",
                date: "2024-06-15",
                startTime: "09:39",
                endTime: "10:18",
                isBooked: "booked",
            },
            vehicleType: "car",
            vehicleBrand: "Camry",
            vehicleModel: "Camry",
            manufacturingYear: 2020,
            registrationPlate: "ABC123",
        },
    ])

    const handleUpdateUserRole = (id,newRole) => {
        const updatedUsers = users.map((user) =>
            user._id === id ? { ...user,role: newRole } : user
        )
        setUsers(updatedUsers)
    }

    const [selectedUser,setSelectedUser] = useState(null)

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>User Management</CardTitle>
                    <CardDescription>Manage your users</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Phone</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Address</TableHead>
                                <TableHead>Created At</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user._id}>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.phone}</TableCell>
                                    <TableCell>{user.role}</TableCell>
                                    <TableCell>{user.address}</TableCell>
                                    <TableCell>{format(new Date(user.createdAt),"PPP")}</TableCell>
                                    <TableCell>
                                        <Select
                                            onValueChange={(value) => handleUpdateUserRole(user._id,value)}
                                            defaultValue={user.role}
                                        >
                                            <SelectTrigger className="w-[100px]">
                                                <SelectValue placeholder="Update role" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="user">User</SelectItem>
                                                <SelectItem value="admin">Admin</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button variant="outline" className="ml-2" onClick={() => setSelectedUser(user)}>
                                                    View Bookings
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent className="max-w-4xl">
                                                <DialogHeader>
                                                    <DialogTitle>Bookings for {selectedUser?.name}</DialogTitle>
                                                </DialogHeader>
                                                <Table>
                                                    <TableHeader>
                                                        <TableRow>
                                                            <TableHead>Service</TableHead>
                                                            <TableHead>Date</TableHead>
                                                            <TableHead>Time</TableHead>
                                                            <TableHead>Vehicle</TableHead>
                                                            <TableHead>Price</TableHead>
                                                        </TableRow>
                                                    </TableHeader>
                                                    <TableBody>
                                                        {bookings
                                                            .filter((booking) => booking.customer._id === selectedUser?._id)
                                                            .map((booking) => (
                                                                <TableRow key={booking._id}>
                                                                    <TableCell>{booking.service.name}</TableCell>
                                                                    <TableCell>{booking.slot.date}</TableCell>
                                                                    <TableCell>{`${booking.slot.startTime} - ${booking.slot.endTime}`}</TableCell>
                                                                    <TableCell>{`${booking.vehicleType} - ${booking.vehicleBrand} ${booking.vehicleModel} (${booking.registrationPlate})`}</TableCell>
                                                                    <TableCell>${booking.service.price}</TableCell>
                                                                </TableRow>
                                                            ))}
                                                    </TableBody>
                                                </Table>
                                            </DialogContent>
                                        </Dialog>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>All Bookings</CardTitle>
                    <CardDescription>View all user bookings</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Customer</TableHead>
                                <TableHead>Service</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Time</TableHead>
                                <TableHead>Vehicle</TableHead>
                                <TableHead>Price</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {bookings.map((booking) => (
                                <TableRow key={booking._id}>
                                    <TableCell>{booking.customer.name}</TableCell>
                                    <TableCell>{booking.service.name}</TableCell>
                                    <TableCell>{booking.slot.date}</TableCell>
                                    <TableCell>{`${booking.slot.startTime} - ${booking.slot.endTime}`}</TableCell>
                                    <TableCell>{`${booking.vehicleType} - ${booking.vehicleBrand} ${booking.vehicleModel} (${booking.registrationPlate})`}</TableCell>
                                    <TableCell>${booking.service.price}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}

export default UserManagement