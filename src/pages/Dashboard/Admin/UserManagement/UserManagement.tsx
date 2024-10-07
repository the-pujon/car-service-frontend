/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button'
import { CardContent,CardDescription,CardHeader,CardTitle } from '@/components/ui/card'
import { Dialog,DialogContent,DialogDescription,DialogHeader,DialogTitle,DialogTrigger } from '@/components/ui/dialog'
import { Select,SelectContent,SelectItem,SelectTrigger,SelectValue } from '@/components/ui/select'
import { Table,TableBody,TableCell,TableHead,TableHeader,TableRow } from '@/components/ui/table'
import React,{ useState,useEffect } from 'react'
import { useGetUsersQuery,useUpdateUserRoleMutation } from '@/redux/features/users/usersApi'
import { toast } from 'sonner'
import { useGetBookingsByCustomerIdQuery } from '@/redux/features/bookings/bookingApi'
import Loading from '@/components/ui/Loading'

type TUser = {
    _id: string
    name: string
    email: string
    phone: string
    role: string
    address: string
}

const UserManagement: React.FC = () => {

    //get users
    const { data: users,isLoading: isLoadingUsers } = useGetUsersQuery(undefined)

    //update user role
    const [updateUser] = useUpdateUserRoleMutation()

    const [selectedUser,setSelectedUser] = useState<TUser | null>(null)
    const [userBookings,setUserBookings] = useState<any[]>([])


    const { data: fetchedBookings,isLoading: isLoadingUserBookings } = useGetBookingsByCustomerIdQuery(
        selectedUser?._id || 'no-user',
        {
            skip: !selectedUser,
            refetchOnMountOrArgChange: true
        }
    )

    useEffect(() => {
        if (fetchedBookings) {
            setUserBookings(fetchedBookings.data || [])
        } else {
            setUserBookings([])
        }
    },[fetchedBookings])

    console.log(users)

    //update user role
    const handleUpdateUserRole = async (id: string,newRole: string) => {

        const toastID = toast.loading("Updating user role...")

        console.log(id)
        try {
            await updateUser({ id,role: newRole }).unwrap()
            toast.success("User role updated successfully",{ id: toastID })
        } catch (error) {
            console.error('Failed to update user role:',error)
            toast.error("Failed to update user role",{ id: toastID })
        }
    }

    const handleDialogOpenChange = (open: boolean) => {
        if (!open) {
            setSelectedUser(null);
            setUserBookings([]);
            console.log("hi")
        }
    };

    const handleViewBookings = (user: TUser) => {
        setSelectedUser(user);
        setUserBookings([]);
    };

    return (
        <div className="space-y-6 relative h-screen">
            {
                isLoadingUsers && <Loading />
            }

            <div className='text-white '>
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
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users?.data?.map((user: TUser) => (
                                <TableRow key={user._id}>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.phone}</TableCell>
                                    <TableCell>{user.role}</TableCell>
                                    <TableCell>{user.address}</TableCell>
                                    <TableCell className="flex items-center">
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
                                        <Dialog onOpenChange={handleDialogOpenChange}>
                                            <DialogTrigger asChild>
                                                <Button variant="outline" className="ml-2" onClick={() => handleViewBookings(user)}>
                                                    View Bookings
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent className="max-w-4xl max-h-[60vh] overflow-y-scroll text-white">
                                                <DialogHeader>
                                                    <DialogTitle className='text-2xl text-white font-light'>Bookings for <span className='font-medium tracking-wider'>{selectedUser?.name}</span></DialogTitle>
                                                    <DialogDescription>
                                                        View all bookings for this user
                                                    </DialogDescription>
                                                </DialogHeader>
                                                {isLoadingUserBookings ? (
                                                    <Loading />
                                                ) : userBookings.length > 0 ? (
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
                                                        <TableBody className='text-white'>
                                                            {userBookings.map((booking: any) => (
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
                                                ) : (
                                                    <p className="text-center py-4">No bookings found for this user.</p>
                                                )}
                                            </DialogContent>
                                        </Dialog>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </div>
        </div>
    )
}

export default UserManagement