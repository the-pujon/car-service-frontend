/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/api/baseApi";

const serviceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // For getting services
    getServices: builder.query({
      query: () => ({
        url: "/services",
        method: "GET",
      }),
      providesTags: ["services"],
    }),
    // For adding a new service
    addService: builder.mutation({
      query: (data) => ({
        url: "/services",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["services"],
    }),
    // For deleting a service by ID
    deleteService: builder.mutation({
      query: (id) => ({
        url: `/services/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          serviceApi.util.updateQueryData("getServices", undefined, (draft) => {
            if (draft?.data) {
              draft.data = draft.data.filter(
                (service: any) => service._id !== id
              );
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: ["services"],
    }),
    // For updating a service by ID
    updateService: builder.mutation({
      query: (data) => {
        return {
          url: `/services/${data._id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["services"],
    }),
    getServiceById: builder.query({
      query: (id) => ({
        url: `/services/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "services", id }],
    }),
  }),
});

// Export hooks for each endpoint
export const {
  useGetServicesQuery,
  useAddServiceMutation,
  useDeleteServiceMutation,
  useUpdateServiceMutation,
  useGetServiceByIdQuery,
} = serviceApi;
