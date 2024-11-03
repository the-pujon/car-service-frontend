import { Card,CardContent,CardDescription,CardHeader,CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock,DollarSign,LayoutGrid,LucideIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { TBooking } from "@/types/bookingType";
import { TService } from "@/types/serviceType";

interface ServicesOverviewProps {
    services: TService[];
    bookings: TBooking[];
}

export function ServicesOverview({ services,bookings }: ServicesOverviewProps) {
    const navigate = useNavigate();

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
                            Performance metrics for all active services
                        </CardDescription>
                    </div>
                    <div className="flex items-center gap-4">
                        <Badge variant="secondary" className="text-base px-4 py-1.5">
                            {services.length} Services
                        </Badge>
                        <Button
                            variant="default"
                            className="flex items-center gap-2"
                            onClick={() => navigate('/dashboard/admin/services')}
                        >
                            <LayoutGrid className="h-4 w-4" />
                            View All Services
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {services.slice(0,6).map((service) => {
                        const serviceBookings = bookings.filter(
                            (booking) => booking.service._id === service._id
                        );
                        const totalRevenue = serviceBookings.reduce(
                            (sum,booking) => sum + booking.service.price,
                            0
                        );
                        const utilization = (serviceBookings.length / bookings.length) * 100;

                        return (
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
                                        <Badge variant={utilization > 50 ? "default" : "secondary"}>
                                            {utilization.toFixed(0)}%
                                        </Badge>
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
                                            label="Bookings"
                                            value={serviceBookings.length}
                                        />
                                        <ServiceStat
                                            label="Revenue"
                                            value={`$${totalRevenue.toFixed(2)}`}
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
}


function ServiceMetric({ icon: Icon,label,value }: { icon: LucideIcon; label: string; value: string }) {
    return (
        <div className="flex justify-between items-center bg-background rounded-md p-3">
            <div className="flex items-center gap-2">
                <Icon className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{label}</span>
            </div>
            <span className="font-medium">{value}</span>
        </div>
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