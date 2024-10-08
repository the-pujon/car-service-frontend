
import { useState,useEffect } from "react"
import { Card,CardContent,CardDescription,CardHeader,CardTitle } from "@/components/ui/card"
import { Table,TableBody,TableCell,TableHead,TableHeader,TableRow } from "@/components/ui/table"
import { ServiceSlotCountdown } from "@/components/Dashboard/ServiceSlotCountdown"
import { useGetUserBookingsQuery } from "@/redux/features/bookings/bookingApi"
import Loading from "@/components/ui/Loading"

interface Booking {
    _id: string;
    service: {
        name: string;
        price: number;
    };
    slot: {
        date: string;
        startTime: string;
    };
}

const MyBookings = () => {
    const { data,isLoading,isError } = useGetUserBookingsQuery(undefined)

    console.log(data)

    const [pastBookings,setPastBookings] = useState<Booking[]>([])
    const [upcomingBookings,setUpcomingBookings] = useState<Booking[]>([])
    const [nextBooking,setNextBooking] = useState<Booking | null>(null)

    useEffect(() => {
        if (data?.data) {
            const now = new Date()
            const past: Booking[] = []
            const upcoming: Booking[] = []

            data.data.forEach((booking: Booking) => {
                const bookingDate = new Date(`${booking.slot.date} ${booking.slot.startTime}`)
                if (bookingDate < now) {
                    past.push(booking)
                } else {
                    upcoming.push(booking)
                }
            })

            setPastBookings(past)
            setUpcomingBookings(upcoming)

            // Sort upcoming bookings and set the next booking
            const sortedUpcoming = [...upcoming].sort((a,b) => {
                const dateA = new Date(`${a.slot.date} ${a.slot.startTime}`)
                const dateB = new Date(`${b.slot.date} ${b.slot.startTime}`)
                return dateA.getTime() - dateB.getTime()
            })
            setNextBooking(sortedUpcoming[0] || null)
        }
    },[data])

    const renderBookingInfo = (booking: Booking) => (
        <>
            <h3 className="text-lg font-semibold">{booking.service?.name || 'Unnamed Service'}</h3>
            <p className="text-sm text-gray-600">{`${booking.slot.date} at ${booking.slot.startTime}`}</p>
            <p className="text-sm font-medium mt-1">Price: ${booking.service?.price || 'N/A'}</p>
        </>
    )



    if (isError) {
        return <div>Error loading bookings</div>
    }

    return (
        <div className=" p-4 space-y-6 ">
            {
                isLoading && <Loading />
            }
            {nextBooking && (
                <Card className="">
                    <CardHeader>
                        <CardTitle>Next Upcoming Booking</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col md:flex-row gap-4 justify-between md:items-center">
                            <div>
                                {renderBookingInfo(nextBooking)}
                            </div>
                            <ServiceSlotCountdown date={nextBooking?.slot.date} time={nextBooking?.slot.startTime} />
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
                        {
                            upcomingBookings.length === 0 && (
                                <p className="text-center text-gray-500">No upcoming bookings</p>
                            )
                        }
                        {upcomingBookings.map((booking: Booking) => (
                            <Card key={booking._id}>
                                <CardHeader>
                                    <CardTitle>{booking.service?.name || 'Unnamed Service'}</CardTitle>
                                    <CardDescription>{`${booking.slot.date} at ${booking.slot.startTime}`}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="mb-2">Price: ${booking.service?.price || 'N/A'}</p>
                                    <ServiceSlotCountdown date={booking.slot.date} time={booking.slot.startTime} />
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
                            {pastBookings.map((booking: Booking) => (
                                <TableRow key={booking._id}>
                                    <TableCell>{booking.service?.name || 'Unnamed Service'}</TableCell>
                                    <TableCell>{booking.slot.date}</TableCell>
                                    <TableCell>{booking.slot.startTime}</TableCell>
                                    <TableCell>${booking.service?.price || 'N/A'}</TableCell>
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
