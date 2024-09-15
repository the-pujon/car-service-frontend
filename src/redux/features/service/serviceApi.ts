import { baseApi } from "@/redux/api/baseApi";

const serviceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //for getting services
    getServices: builder.query({
      query: () => {
        return {
          url: "/services",
          method: "GET",
        };
      },
    }),
    addService: builder.mutation({
      query: (data) => {
        return {
          url: "/services",
          method: "POST",
          body: data,
        };
      },
    }),
  }),
});

export const { useGetServicesQuery } = serviceApi;
