import { Card,CardContent,CardDescription,CardHeader,CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar,Clock,Car } from "lucide-react";
import { TBooking } from "@/types/bookingType";

interface RecentBookingsProps {
    bookings: TBooking[];
}

export function RecentBookings({ bookings }: RecentBookingsProps) {
    const recentBookings = bookings
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
                        <CardDescription>Latest service bookings</CardDescription>
                    </div>
                    <Badge variant="outline">
                        {bookings.length} total
                    </Badge>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {recentBookings.map((booking) => (
                        <div
                            key={booking._id}
                            className="bg-card hover:bg-accent transition-colors p-4 rounded-lg"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <div>
                                    <h4 className="font-semibold">{booking.customer.name}</h4>
                                    <p className="text-sm text-muted-foreground">
                                        {booking.service.name}
                                    </p>
                                </div>
                                <Badge
                                    className={getStatusColor(booking.status)}
                                    variant="outline"
                                >
                                    {booking.status}
                                </Badge>
                            </div>
                            <div className="grid grid-cols-3 gap-4 mt-3">
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm">
                                        {new Date(booking.slot.date).toLocaleDateString()}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm">
                                        {booking.slot.startTime}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Car className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm">
                                        {booking.vehicleBrand} {booking.vehicleModel}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}