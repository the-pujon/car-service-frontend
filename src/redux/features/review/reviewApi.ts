import { baseApi } from "@/redux/api/baseApi";

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // For getting all reviews
    getAllReviews: builder.query({
      query: () => ({
        url: "/reviews",
        method: "GET",
      }),
      providesTags: ["reviews"],
    }),

    // For creating a new review
    createReview: builder.mutation({
      query: (data) => ({
        url: "/reviews",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["reviews"],
    }),

    // For getting user's reviews
    getUserReviews: builder.query({
      query: () => ({
        url: "/reviews/my-reviews",
        method: "GET",
      }),
      providesTags: ["reviews"],
    }),
  }),
});

// Export hooks for each endpoint
export const {
  useGetAllReviewsQuery,
  useCreateReviewMutation,
  useGetUserReviewsQuery,
} = reviewApi;
