import { TServiceOverview } from '@/types/serviceType';
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Clock } from 'lucide-react';
import ServiceOverviewCard from '@/components/Dashboard/ServiceOverviewCard';
import Loading from '@/components/ui/Loading';
import { useServiceMetrics } from '@/hooks/useServiceMetrics';

const ServiceOverview = (): React.ReactElement => {

    const {
        servicesWithMetrics,
        totalRevenue,
        servicesLength,
        isLoading
    } = useServiceMetrics();

    return (
        <div className="text-white h-screen p-5 relative">

            {
                isLoading && <Loading />
            }
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
                            {servicesLength} Active Services
                        </Badge>
                    </div>

                </div>
            </div>
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