import { useGetBookingsQuery } from "@/redux/features/bookings/bookingApi";
import { useGetServicesQuery } from "@/redux/features/service/serviceApi";
import { TBooking } from "@/types/bookingType";
import { TService, TServiceOverview } from "@/types/serviceType";

const calculateRevenue = (bookings: TBooking[]): number => {
  return bookings.reduce((sum, booking) => sum + booking.service.price, 0);
};

const calculateServiceMetrics = (
  service: TService,
  bookings: TBooking[],
  totalBookings: number,
  totalRevenue: number
): TServiceOverview => {
  const serviceBookings = bookings.filter(
    (booking) => booking.service._id === service._id
  );
  const revenue = calculateRevenue(serviceBookings);

  return {
    ...service,
    bookings: serviceBookings.length,
    revenue,
    bookingPercentage: totalBookings
      ? (serviceBookings.length / totalBookings) * 100
      : 0,
    revenuePercentage: totalRevenue ? (revenue / totalRevenue) * 100 : 0,
  };
};

export const useServiceMetrics = () => {
  const { data: servicesData, isLoading: servicesLoading } =
    useGetServicesQuery({});
  const { data: bookingsData, isLoading: bookingsLoading } =
    useGetBookingsQuery({});

  const services = servicesData?.data || [];
  const bookings = bookingsData?.data || [];

  const totalBookings = bookings.length;
  const totalRevenue = calculateRevenue(bookings);

  const servicesWithMetrics = services
    .map((service: TService) =>
      calculateServiceMetrics(service, bookings, totalBookings, totalRevenue)
    )
    .sort((a: TServiceOverview, b: TServiceOverview) => b.revenue - a.revenue);

  return {
    servicesWithMetrics,
    totalBookings,
    totalRevenue,
    services,
    isLoading: servicesLoading || bookingsLoading,
  };
};
