"use client"

import { useState,useEffect } from "react"
import { Card,CardContent,CardDescription,CardHeader,CardTitle } from "@/components/ui/card"
import { Table,TableBody,TableCell,TableHead,TableHeader,TableRow } from "@/components/ui/table"
import { ServiceSlotCountdown } from "@/components/Dashboard/ServiceSlotCountdown"

const MyBookings = () => {
    const [pastBookings,setPastBookings] = useState([
        { id: 1,service: "Car Wash",date: "2023-05-15",time: "10:00 AM",price: 30 },
        { id: 2,service: "Oil Change",date: "2023-06-01",time: "2:00 PM",price: 50 },
    ])

    const [upcomingBookings,setUpcomingBookings] = useState([
        {
            id: 3,
            service: "Tire Rotation",
            date: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString().split('T')[0], // 2 hours from now
            time: new Date(Date.now() + 2 * 60 * 60 * 1000).toTimeString().split(' ')[0].slice(0,5),
            price: 40
        },
        {
            id: 4,
            service: "Car Detailing",
            date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 24 hours from now
            time: new Date(Date.now() + 24 * 60 * 60 * 1000).toTimeString().split(' ')[0].slice(0,5),
            price: 100
        },
    ])

    const [nextBooking,setNextBooking] = useState(null)

    useEffect(() => {
        // Sort upcoming bookings by date and time
        const sortedBookings = [...upcomingBookings].sort((a,b) => {
            const dateA = new Date(`${a.date} ${a.time}`)
            const dateB = new Date(`${b.date} ${b.time}`)
            return dateA.getTime() - dateB.getTime()
        })

        // Set the next booking
        setNextBooking(sortedBookings[0])
    },[upcomingBookings])

    return (
        <div className="container mx-auto p-4 space-y-6">
            {nextBooking && (
                <Card className="bg-blue-50">
                    <CardHeader>
                        <CardTitle>Next Upcoming Booking</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-semibold">{nextBooking.service}</h3>
                                <p className="text-sm text-gray-600">{`${nextBooking.date} at ${nextBooking.time}`}</p>
                                <p className="text-sm font-medium mt-1">Price: ${nextBooking.price}</p>
                            </div>
                            <ServiceSlotCountdown date={nextBooking.date} time={nextBooking.time} />
                        </div>
                    </CardContent>
                </Card>
            )}

            <Card>
                <CardHeader>
                    <CardTitle>Upcoming Bookings</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {upcomingBookings.map((booking) => (
                            <Card key={booking.id}>
                                <CardHeader>
                                    <CardTitle>{booking.service}</CardTitle>
                                    <CardDescription>{`${booking.date} at ${booking.time}`}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="mb-2">Price: ${booking.price}</p>
                                    <ServiceSlotCountdown date={booking.date} time={booking.time} />
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Past Bookings</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Service</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Time</TableHead>
                                <TableHead>Price</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {pastBookings.map((booking) => (
                                <TableRow key={booking.id}>
                                    <TableCell>{booking.service}</TableCell>
                                    <TableCell>{booking.date}</TableCell>
                                    <TableCell>{booking.time}</TableCell>
                                    <TableCell>${booking.price}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}

export default MyBookings
