import { Card,CardContent,CardDescription,CardHeader,CardTitle } from "@/components/ui/card";
import { BarChart,Bar,XAxis,YAxis,CartesianGrid,Tooltip,Legend,ResponsiveContainer } from 'recharts';
import { TBooking } from "@/types/bookingType";
import { TService } from "@/types/serviceType";
import { CustomTooltip } from "./CustomTooltip";

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
            name: service.name,
            revenue,
            bookings: bookingCount,
            averageRevenue: bookingCount > 0 ? revenue / bookingCount : 0
        };
    }).sort((a,b) => b.revenue - a.revenue);

    return (
        <Card className="col-span-1 lg:col-span-2">
            <CardHeader>
                <CardTitle>Service Performance</CardTitle>
                <CardDescription>Revenue and booking metrics by service</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-[400px] w-full">
                    <ResponsiveContainer>
                        <BarChart data={servicePerformance}>
                            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                            <XAxis
                                dataKey="name"
                                angle={-45}
                                textAnchor="end"
                                height={70}
                                interval={0}
                            />
                            <YAxis yAxisId="left" />
                            <YAxis yAxisId="right" orientation="right" />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                            <Bar
                                yAxisId="left"
                                dataKey="revenue"
                                fill="hsl(var(--primary))"
                                name="Revenue ($)"
                            />
                            <Bar
                                yAxisId="right"
                                dataKey="bookings"
                                fill="hsl(var(--secondary))"
                                name="Bookings"
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}