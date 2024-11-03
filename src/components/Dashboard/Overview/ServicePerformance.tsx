import { Card,CardContent,CardDescription,CardHeader,CardTitle } from "@/components/ui/card";
import { BarChart,Bar,XAxis,YAxis,CartesianGrid,Tooltip,Legend,ResponsiveContainer } from 'recharts';
import { TBooking } from "@/types/bookingType";
import { TService } from "@/types/serviceType";
import { CustomTooltip } from "./CustomTooltip";
import { TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
interface ServicePerformanceProps {
    services: TService[];
    bookings: TBooking[];
}

export function ServicePerformance({ services,bookings }: ServicePerformanceProps) {
    const servicePerformance = services.map(service => {
        const serviceBookings = bookings.filter(booking => booking.service._id === service._id);
        const revenue = serviceBookings.reduce((sum,booking) => sum + booking.service.price,0);
        const bookingCount = serviceBookings.length;

        return {
            _id: service._id,
            price: service.price,
            name: service.name,
            revenue,
            bookings: bookingCount,
            averageRevenue: bookingCount > 0 ? revenue / bookingCount : 0
        };
    }).sort((a,b) => b.revenue - a.revenue);


    console.log(servicePerformance);

    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-center">
                    <div>
                        <CardTitle className="flex items-center gap-2">
                            <TrendingUp className="h-5 w-5 text-primary" />
                            Top Performing Services
                        </CardTitle>
                        <CardDescription>Most booked services this month</CardDescription>
                    </div>
                    <Badge variant="secondary">Top 5</Badge>
                </div>
            </CardHeader>
            <CardContent>
                {[...(servicePerformance || [])]
                    //.sort((a,b) => {
                    //    const aBookings = (bookings || []).filter(booking => booking.service._id === a._id).length;
                    //    const bBookings = (bookings || []).filter(booking => booking.service._id === b._id).length;
                    //    return bBookings - aBookings;
                    //})
                    .slice(0,5)
                    .map((service: any,index: number) => {
                        //const serviceBookings = (bookings || []).filter(booking => booking.service._id === service._id);
                        //const revenue = serviceBookings.reduce((sum,booking) => sum + booking.service.price,0);

                        return (
                            <div key={service._id} className="flex items-center justify-between py-4 border-b last:border-0">
                                <div className="flex items-center gap-4">
                                    <div className="bg-primary/10 text-primary font-semibold h-8 w-8 rounded-full flex items-center justify-center">
                                        {index + 1}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">{service.name}</h4>
                                        <p className="text-sm text-muted-foreground">{service.bookings} bookings</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-semibold">${service.revenue.toFixed(2)}</p>
                                    <p className="text-sm text-muted-foreground">${service.price} per service</p>
                                </div>
                            </div>
                        );
                    })}
            </CardContent>
        </Card>
    );
}