import baseApi from "@/redux/api/baseApi";

const serviceReviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // For getting all service reviews
    getServiceReviews: builder.query({
      query: () => ({
        url: "/service-reviews",
        method: "GET",
      }),
    }),
    // For adding a new service review
    addServiceReview: builder.mutation({
      query: (data) => ({
        url: "/service-reviews",
        method: "POST",
        body: data,
      }),
    }),
    // For deleting a service review by ID
    deleteServiceReview: builder.mutation({
      query: (id) => ({
        url: `/service-reviews/${id}`,
        method: "DELETE",
      }),
    }),

    // For updating a service review by ID
    updateServiceReview: builder.mutation({
      query: ({ id, data }) => ({
        url: `/service-reviews/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),

    // For getting a single service review by ID
    getSingleServiceReview: builder.query({
      query: (id) => ({
        url: `/service-reviews/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetServiceReviewsQuery, useAddServiceReviewMutation, useDeleteServiceReviewMutation, useUpdateServiceReviewMutation, useGetSingleServiceReviewQuery } = serviceReviewApi;
