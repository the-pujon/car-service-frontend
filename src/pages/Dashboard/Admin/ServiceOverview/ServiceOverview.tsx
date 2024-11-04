
import { useGetBookingsQuery } from '@/redux/features/bookings/bookingApi';
import { useGetServicesQuery } from '@/redux/features/service/serviceApi';
import { TBooking } from '@/types/bookingType';
import { TService,TServiceOverview } from '@/types/serviceType';
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Clock } from 'lucide-react';
import ServiceOverviewCard from '@/components/Dashboard/ServiceOverviewCard';
import Loading from '@/components/ui/Loading';

const ServiceOverview = (): React.ReactElement => {

    const { data: servicesData,isLoading: servicesLoading } = useGetServicesQuery({});
    const { data: bookingsData,isLoading: bookingsLoading } = useGetBookingsQuery({});
    const services = servicesData?.data || [];
    const bookings = bookingsData?.data || [];

    // Calculate total revenue and bookings
    const totalBookingsCount = bookings.length;
    const totalRevenue = bookings.reduce((sum: number,booking: TBooking) => sum + booking.service.price,0);

    // Calculate and sort services by revenue contribution
    const servicesWithMetrics = services.map((service: TService) => {
        const serviceBookings = bookings.filter(
            (booking: TBooking) => booking.service._id === service._id
        );
        const revenue = serviceBookings.reduce(
            (sum: number,booking: TBooking) => sum + booking.service.price,
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
    }).sort((a: TServiceOverview,b: TServiceOverview) => b.revenue - a.revenue);

    return (
        <div className="text-white h-screen p-5 relative">

            {
                servicesLoading && bookingsLoading && <Loading />
            }
            {/*<CardHeader>*/}
            <div className="flex items-center justify-between mb-5">
                <div>
                    <h2 className="text-4xl font-bold flex items-center gap-2">
                        <Clock className="h-6 w-6 text-primary" />
                        Services Overview
                    </h2>
                    <p className="text-base text-gray-500 mt-1">
                        Comprehensive view of all active services
                    </p>
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

                </div>
            </div>
            {/*</CardHeader>*/}
            {/*<CardContent>*/}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {servicesWithMetrics.map((service: TServiceOverview) => (
                    <ServiceOverviewCard service={service} />
                ))}
            </div>
            {/*</CardContent>*/}
        </div>
    );
};

export default ServiceOverview;