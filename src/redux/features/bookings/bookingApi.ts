import { baseApi } from "@/redux/api/baseApi";

const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // For creating a new booking
    createBooking: builder.mutation({
      query: (data) => ({
        url: "/bookings",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["bookings"],
    }),
    // For getting all bookings (admin only)
    getBookings: builder.query({
      query: () => ({
        url: "/bookings",
        method: "GET",
      }),
      providesTags: ["bookings"],
    }),
    // For getting user's own bookings
    getUserBookings: builder.query({
      query: () => ({
        url: "/bookings/my-bookings",
        method: "GET",
      }),
      providesTags: ["bookings"],
    }),
    // For getting bookings by customer ID (admin only)
    getBookingsByCustomerId: builder.query({
      query: (customerId) => ({
        url: `/bookings/customer/${customerId}`,
        method: "GET",
      }),
      providesTags: (result, error, customerId) => [
        { type: "bookings", id: customerId },
      ],
    }),
  }),
});

export const {
  useCreateBookingMutation,
  useGetBookingsQuery,
  useGetUserBookingsQuery,
  useGetBookingsByCustomerIdQuery,
} = bookingApi;
