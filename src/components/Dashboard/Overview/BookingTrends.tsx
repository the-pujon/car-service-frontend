import { Card,CardContent,CardDescription,CardHeader,CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CartesianGrid,Legend,Line,LineChart,ResponsiveContainer,Tooltip,XAxis,YAxis } from 'recharts';
import { TBooking } from "@/types/bookingType";
import { CustomTooltip } from "./CustomTooltip";

interface BookingTrendsProps {
    bookings: TBooking[];
}

export function BookingTrends({ bookings }: BookingTrendsProps) {
    const last30DaysBookings = bookings.filter(booking => {
        const bookingDate = new Date(booking.slot.date);
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        return bookingDate >= thirtyDaysAgo;
    });

    const dailyBookingsData = last30DaysBookings.reduce((acc: Record<string,number>,booking) => {
        const date = new Date(booking.slot.date).toLocaleDateString();
        acc[date] = (acc[date] || 0) + 1;
        return acc;
    },{});

    const lineChartData = Object.entries(dailyBookingsData).map(([date,count]) => ({
        date,
        bookings: count
    }));


    //const CustomTooltip = ({ active,payload,label }: TooltipProps<number,string>) => {
    //    if (active && payload && payload.length) {
    //        return (
    //            <div className="bg-background p-2 border border-border rounded-lg shadow-lg">
    //                <p className="text-foreground">{`${label}: ${payload[0].value}`}</p>
    //            </div>
    //        );
    //    }
    //    return null;
    //};

    return (
        <Card className="col-span-1 lg:col-span-2">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>Booking Trends</CardTitle>
                        <CardDescription>Daily bookings over the last 30 days</CardDescription>
                    </div>
                    <Badge variant="outline">
                        {last30DaysBookings.length} bookings
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="pt-4">
                <div className="h-[400px] w-full">
                    <ResponsiveContainer>
                        <LineChart data={lineChartData}>
                            <defs>
                                <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="bookings"
                                stroke="hsl(var(--primary))"
                                strokeWidth={2}
                                dot={{ r: 4 }}
                                activeDot={{ r: 6 }}
                                fillOpacity={1}
                                fill="url(#colorBookings)"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}