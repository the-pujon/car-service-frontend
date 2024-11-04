

import { Card,CardContent,CardDescription,CardHeader,CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock,DollarSign,LayoutGrid,LucideIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { TBooking } from "@/types/bookingType";
import { TService } from "@/types/serviceType";
import { ServiceMetric } from "@/pages/Dashboard/Admin/ServiceOverview/ServiceOverview";

interface ServicesOverviewProps {
    services: TService[];
    bookings: TBooking[];
}

export function ServicesOverview({ services,bookings }: ServicesOverviewProps) {
    const navigate = useNavigate();

    // Calculate total revenue and bookings
    const totalBookingsCount = bookings.length;
    const totalRevenue = bookings.reduce((sum,booking) => sum + booking.service.price,0);

    // Calculate and sort services by revenue contribution
    const servicesWithMetrics = services.map(service => {
        const serviceBookings = bookings.filter(
            (booking) => booking.service._id === service._id
        );
        const revenue = serviceBookings.reduce(
            (sum,booking) => sum + booking.service.price,
            0
        );
        const bookingPercentage = (serviceBookings.length / totalBookingsCount) * 100;
        const revenuePercentage = (revenue / totalRevenue) * 100;

        return {
            ...service,
            bookings: serviceBookings.length,
            revenue,
            bookingPercentage,
            revenuePercentage
        };
    }).sort((a,b) => b.revenue - a.revenue); // Sort by revenue by default

    return (
        <Card className="col-span-2">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="text-2xl flex items-center gap-2">
                            <Clock className="h-6 w-6 text-primary" />
                            Services Overview
                        </CardTitle>
                        <CardDescription className="text-base mt-1">
                            Comprehensive view of all active services
                        </CardDescription>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex  items-center gap-1">
                            <Badge variant="outline" className="mb-1">
                                Total Revenue: ${totalRevenue.toFixed(2)}
                            </Badge>
                            <Badge variant="secondary">
                                {services.length} Active Services
                            </Badge>
                        </div>
                        <Button
                            variant="default"
                            className="flex items-center gap-2"
                            onClick={() => navigate('/dashboard/admin/services')}
                        >
                            <LayoutGrid className="h-4 w-4" />
                            View All Services Overview
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {servicesWithMetrics.slice(0,6).map((service) => (
                        <Card
                            key={service._id}
                            className="bg-card hover:bg-accent transition-colors"
                        >
                            <CardHeader className="pb-3">
                                <div className="flex justify-between items-start space-x-4">
                                    <div className="space-y-1">
                                        <CardTitle>{service.name}</CardTitle>
                                        <CardDescription>{service.category}</CardDescription>
                                    </div>
                                    <div className="flex flex-col items-end gap-1">
                                        <Badge
                                            variant="outline"
                                            className={`
                                                ${service.revenuePercentage >= 30 ? 'bg-green-500/10 text-green-500' :
                                                    service.revenuePercentage >= 15 ? 'bg-blue-500/10 text-blue-500' :
                                                        'bg-primary/10 text-primary'}
                                            `}
                                        >
                                            {service.revenuePercentage.toFixed(1)}% of revenue
                                        </Badge>
                                        <Badge
                                            variant="outline"
                                            className={`
                                                ${service.bookingPercentage >= 30 ? 'bg-green-500/10 text-green-500' :
                                                    service.bookingPercentage >= 15 ? 'bg-blue-500/10 text-blue-500' :
                                                        'bg-primary/10 text-primary'}
                                            `}
                                        >
                                            {service.bookingPercentage.toFixed(1)}% of bookings
                                        </Badge>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <ServiceMetric
                                    icon={Clock}
                                    label="Duration"
                                    value={`${service.duration} mins`}
                                />
                                <ServiceMetric
                                    icon={DollarSign}
                                    label="Price"
                                    value={`$${service.price}`}
                                />
                                <div className="grid grid-cols-2 gap-3 pt-2">
                                    <ServiceStat
                                        label="Total Bookings"
                                        value={service.bookings}
                                    />
                                    <ServiceStat
                                        label="Total Revenue"
                                        value={`$${service.revenue.toFixed(2)}`}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}




function ServiceStat({ label,value }: { label: string; value: string | number }) {
    return (
        <div className="bg-background rounded-md p-3">
            <div className="text-sm text-muted-foreground mb-1">{label}</div>
            <div className="font-semibold text-lg">{value}</div>
        </div>
    );
}