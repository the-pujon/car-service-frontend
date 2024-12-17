import React from 'react';
import { useGetBookingsQuery } from '@/redux/features/bookings/bookingApi';
import { useGetServicesQuery } from '@/redux/features/service/serviceApi';
import { useGetUsersQuery } from '@/redux/features/users/usersApi';
import { useGetAllReviewsQuery } from '@/redux/features/review/reviewApi';
import Loading from '@/components/ui/Loading';
import { ShoppingCart,DollarSign,Users,Star } from 'lucide-react';
import { StatCard } from '@/components/Dashboard/Overview/StarCard';
import { BookingTrends } from '@/components/Dashboard/Overview/BookingTrends';
import { ServicesOverview } from '@/components/Dashboard/Overview/ServicesOverview';
import { VehicleDistribution } from '@/components/Dashboard/Overview/VehicleDistribution';
import { RecentReviews } from '@/components/Dashboard/Overview/RecentReviews';
import { RecentBookings } from '@/components/Dashboard/Overview/RecentBookings';
import { ServicePerformance } from '@/components/Dashboard/Overview/ServicePerformance';
import { ServiceCategories } from '@/components/Dashboard/Overview/ServiceCategories';
import { TBooking } from '@/types/bookingType';
import { TReview } from '@/types/reviewType';

const AdminOverview: React.FC = () => {
    const { data: bookings,isLoading: bookingsLoading } = useGetBookingsQuery(undefined);
    const { data: servicesData,isLoading: servicesLoading } = useGetServicesQuery({});
    const { data: users,isLoading: usersLoading } = useGetUsersQuery(undefined);
    const { data: reviews,isLoading: reviewsLoading } = useGetAllReviewsQuery(undefined);

    const services = servicesData?.data

    const isLoading = bookingsLoading || servicesLoading || usersLoading || reviewsLoading;

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loading />
            </div>
        );
    }

    // Calculate statistics
    const totalBookings = bookings?.data?.length || 0;
    //const totalServices = services?.data?.length || 0;
    const totalUsers = users?.data?.length || 0;
    const totalReviews = reviews?.data?.length || 0;

    // Calculate revenue
    const totalRevenue = (bookings?.data || []).reduce(
        (sum: number,booking: TBooking) => sum + (booking.service.price || 0),
        0
    );

    // Calculate average rating
    const averageRating = (reviews?.data || []).reduce(
        (acc: number,review: TReview) => acc + review.rating,
        0
    ) / (reviews?.data?.length || 1);

    // Calculate last 30 days bookings
    const last30DaysBookings = (bookings?.data || []).filter((booking: TBooking) => {
        const bookingDate = new Date(booking.slot.date);
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        return bookingDate >= thirtyDaysAgo;
    });

    const last30DaysRevenue = last30DaysBookings.reduce(
        (sum: number,booking: TBooking) => sum + (booking.service.price || 0),
        0
    );

    return (
        <div className="min-h-screen bg-background p-6 space-y-8">
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Bookings"
                    value={totalBookings}
                    icon={ShoppingCart}
                    trend={`+${last30DaysBookings.length} this month`}
                    color="primary"
                />
                <StatCard
                    title="Total Revenue"
                    value={`$${totalRevenue.toFixed(2)}`}
                    icon={DollarSign}
                    trend={`$${last30DaysRevenue.toFixed(2)} this month`}
                    color="green-500"
                />
                <StatCard
                    title="Total Users"
                    value={totalUsers}
                    icon={Users}
                    trend={`Active users: ${totalUsers}`}
                    color="blue-500"
                />
                <StatCard
                    title="Average Rating"
                    value={`${averageRating.toFixed(1)} ⭐`}
                    icon={Star}
                    trend={`From ${totalReviews} reviews`}
                    color="yellow-500"
                />
            </div>

            {/* Booking Trends */}
            <BookingTrends bookings={bookings?.data || []} />
            {/* Services Insights Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ServicePerformance
                    services={services?.data || []}
                    bookings={bookings?.data || []}
                />
                <ServiceCategories
                    services={services?.data || []}
                    bookings={bookings?.data || []}
                />
            </div>

            {/* Services Overview and Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                <VehicleDistribution bookings={bookings?.data || []} />
                <RecentReviews reviews={reviews?.data || []} />
            </div>

            {/* Recent Bookings */}
            <RecentBookings bookings={bookings?.data || []} />

            <ServicesOverview
                services={services?.data || []}
                bookings={bookings?.data || []}
            />
        </div>
    );
};

export default AdminOverview;