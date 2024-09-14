import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
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
  }),
});

export const { useGetServicesQuery } = baseApi;
