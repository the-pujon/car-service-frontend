import { Card,CardContent,CardDescription,CardHeader,CardTitle } from "@/components/ui/card";
import { PieChart,Pie,Cell,ResponsiveContainer,Legend,Tooltip } from 'recharts';
import { TBooking } from "@/types/bookingType";
import { TService } from "@/types/serviceType";
import { CustomTooltip } from "./CustomTooltip";

interface ServiceCategoriesProps {
    services: TService[];
    bookings: TBooking[];
}

export function ServiceCategories({ services,bookings }: ServiceCategoriesProps) {
    const categoryData = services.reduce((acc: Record<string,number>,service) => {
        const category = service.category || 'Uncategorized';
        const serviceBookings = bookings.filter(booking => booking.service._id === service._id);
        acc[category] = (acc[category] || 0) + serviceBookings.length;
        return acc;
    },{});

    const data = Object.entries(categoryData)
        .map(([name,value]) => ({
            name,
            value,
            percentage: ((value / bookings.length) * 100).toFixed(1) + '%'
        }))
        .sort((a,b) => b.value - a.value);

    const COLORS = ['#0088FE','#00C49F','#FFBB28','#FF8042','#8884d8','#82ca9d'];

    return (
        <Card className="col-span-1">
            <CardHeader>
                <CardTitle>Service Categories</CardTitle>
                <CardDescription>Distribution of bookings by service category</CardDescription>
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
                <div className="mt-4 space-y-2">
                    {data.map((category,index) => (
                        <div
                            key={category.name}
                            className="flex items-center justify-between p-2 rounded-md bg-card hover:bg-accent transition-colors"
                        >
                            <div className="flex items-center gap-2">
                                <div
                                    className="w-3 h-3 rounded-full"
                                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                                />
                                <span>{category.name}</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <span>{category.value} bookings</span>
                                <span className="text-muted-foreground">
                                    {category.percentage}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}