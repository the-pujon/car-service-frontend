/* eslint-disable @typescript-eslint/no-explicit-any */
import { CardContent,CardDescription,CardHeader,CardTitle } from '@/components/ui/card'
import { Table,TableBody,TableCell,TableHead,TableHeader,TableRow } from '@/components/ui/table'
import React from 'react'
import { useGetBookingsQuery } from '@/redux/features/bookings/bookingApi'
import Loading from '@/components/ui/Loading'

const AdminOverview: React.FC = () => {
    const { data: bookings,isLoading } = useGetBookingsQuery(undefined)

    // Reverse the bookings array and get the latest 15
    const recentBookings = bookings?.data?.slice().reverse().slice(0,15) || []

    return (
        <div className='text-white relative h-screen'>
            {
                isLoading && <Loading />
            }
            <CardHeader>
                <CardTitle>Recent Bookings</CardTitle>
                <CardDescription>Overview of the most recent bookings</CardDescription>
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
                        {recentBookings.map((booking: any) => (
                            <TableRow key={booking._id}>
                                <TableCell>{booking.customer.name}</TableCell>
                                <TableCell>{booking?.service?.name}</TableCell>
                                <TableCell>{booking.slot.date}</TableCell>
                                <TableCell>{`${booking.slot.startTime} - ${booking.slot.endTime}`}</TableCell>
                                <TableCell>{booking.vehicleType} - {booking.vehicleBrand} {booking.vehicleModel} ({booking.registrationPlate})</TableCell>
                                <TableCell>${booking?.service?.price}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            </CardContent>
        </div>
    )
}

export default AdminOverview