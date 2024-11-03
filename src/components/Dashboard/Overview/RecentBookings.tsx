import { Card,CardContent,CardDescription,CardHeader,CardTitle } from "@/components/ui/card";
//import { Badge } from "@/components/ui/badge";
//import { Calendar,Clock,Car } from "lucide-react";
import { TBooking } from "@/types/bookingType";
import { Table,TableBody,TableCell,TableHead,TableHeader,TableRow } from "@/components/ui/table";

interface RecentBookingsProps {
    bookings: TBooking[];
}

export function RecentBookings({ bookings }: RecentBookingsProps) {
    const recentBookings = [...bookings]
        .sort((a,b) => new Date(b.slot.date).getTime() - new Date(a.slot.date).getTime())
        .slice(0,5);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed':
                return 'bg-green-500/10 text-green-500';
            case 'pending':
                return 'bg-yellow-500/10 text-yellow-500';
            case 'cancelled':
                return 'bg-red-500/10 text-red-500';
            default:
                return 'bg-blue-500/10 text-blue-500';
        }
    };

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>Recent Bookings</CardTitle>
                        <CardDescription>Latest {recentBookings.length} bookings</CardDescription>
                    </div>
                    {/*<Badge variant="outline" className="ml-auto">
                            Total: {totalBookings}
                        </Badge>*/}
                </div>
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
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {recentBookings.map((booking) => (
                            <TableRow key={booking._id}>
                                <TableCell>
                                    <div>
                                        <p className="font-medium">{booking.customer.name}</p>
                                        <p className="text-sm text-muted-foreground">{booking.customer.email}</p>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div>
                                        <p className="font-medium">{booking.service.name}</p>
                                        <p className="text-sm text-muted-foreground">{booking.service.description}</p>
                                    </div>
                                </TableCell>
                                <TableCell>{booking.slot.date}</TableCell>
                                <TableCell>{`${booking.slot.startTime} - ${booking.slot.endTime}`}</TableCell>
                                <TableCell>
                                    <div>
                                        <p className="font-medium">{booking.vehicleType} - {booking.vehicleBrand}</p>
                                        <p className="text-sm text-muted-foreground">
                                            {booking.vehicleModel} ({booking.registrationPlate})
                                        </p>
                                    </div>
                                </TableCell>
                                <TableCell>${booking.service.price}</TableCell>
                                <TableCell>
                                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(booking.status)}`}>
                                        {booking.status}
                                    </span>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}