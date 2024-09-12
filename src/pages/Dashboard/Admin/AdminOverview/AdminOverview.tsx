import { Card,CardContent,CardDescription,CardHeader,CardTitle } from '@/components/ui/card'
import { Table,TableBody,TableCell,TableHead,TableHeader,TableRow } from '@/components/ui/table'
import React from 'react'

const AdminOverview = () => {
    const recentBookings = [
        { id: 1,user: "John Doe",service: "Haircut",date: "2023-06-15",time: "10:00 AM" },
        { id: 2,user: "Jane Smith",service: "Manicure",date: "2023-06-15",time: "11:00 AM" },
    ]

    return (
        <Card>
            <CardHeader>
                <CardTitle>Recent Bookings</CardTitle>
                <CardDescription>Overview of the most recent bookings</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>User</TableHead>
                            <TableHead>Service</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Time</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {recentBookings.map((booking) => (
                            <TableRow key={booking.id}>
                                <TableCell>{booking.user}</TableCell>
                                <TableCell>{booking.service}</TableCell>
                                <TableCell>{booking.date}</TableCell>
                                <TableCell>{booking.time}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

export default AdminOverview