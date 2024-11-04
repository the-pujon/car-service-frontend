import React from 'react';
import { Card,CardHeader,CardContent,CardTitle,CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ServiceMetric } from "@/components/Dashboard/ServiceMetric";
import { ServiceStat } from "@/components/Dashboard/ServiceStat";
import { TServiceOverview } from '@/types/serviceType';
import { Clock,DollarSign } from 'lucide-react';
const ServiceOverviewCard = ({ service }: { service: TServiceOverview }): React.ReactElement => {
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
    );
};

export default ServiceOverviewCard;