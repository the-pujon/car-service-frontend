

import { Card,CardContent,CardDescription,CardHeader,CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock,LayoutGrid } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { TBooking } from "@/types/bookingType";
import { TService } from "@/types/serviceType";
import ServiceOverviewCard from "../ServiceOverviewCard";

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
                        <ServiceOverviewCard service={service} />
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
