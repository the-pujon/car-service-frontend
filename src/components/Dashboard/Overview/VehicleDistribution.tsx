import { Card,CardContent,CardDescription,CardHeader,CardTitle } from "@/components/ui/card";
import { PieChart,Pie,Cell,ResponsiveContainer,Legend,Tooltip } from 'recharts';
import { TBooking } from "@/types/bookingType";
import { CustomTooltip } from "./CustomTooltip";

interface VehicleDistributionProps {
    bookings: TBooking[];
}

export function VehicleDistribution({ bookings }: VehicleDistributionProps) {
    const vehicleTypes = bookings.reduce((acc: Record<string,number>,booking) => {
        acc[booking.vehicleType] = (acc[booking.vehicleType] || 0) + 1;
        return acc;
    },{});

    const data = Object.entries(vehicleTypes).map(([name,value]) => ({
        name,
        value,
        percentage: ((value / bookings.length) * 100).toFixed(1) + '%'
    }));

    const COLORS = ['#0088FE','#00C49F','#FFBB28','#FF8042','#8884d8'];

    return (
        <Card className="col-span-1">
            <CardHeader>
                <CardTitle>Vehicle Distribution</CardTitle>
                <CardDescription>Distribution of vehicle types in bookings</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name,percentage }) => `${name} (${percentage})`}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {data.map((_entry,index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}