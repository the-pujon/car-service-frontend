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
      providesTags: (_result, _error, customerId) => [
        { type: "bookings", id: customerId },
      ],
    }),

    // For cancelling a booking
    cancelBooking: builder.mutation({
      query: (bookingId) => ({
        url: `/bookings/${bookingId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["bookings", "slots"],
    }),

    // For rescheduling a booking
    reScheduleBooking: builder.mutation({
      query: (bookingId) => ({
        url: `/bookings/${bookingId}`,
        method: "PUT",
      }),
    }),
  }),
});

export const {
  useCreateBookingMutation,
  useGetBookingsQuery,
  useGetUserBookingsQuery,
  useGetBookingsByCustomerIdQuery,
} = bookingApi;
