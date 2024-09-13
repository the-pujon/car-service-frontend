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

    //for signup
    signup: builder.mutation({
      query: (data) => {
        console.log(data);
        return {
          url: "/auth/signup",
          method: "POST",
          body: data,
        };
      },
    }),

    //for signin
    signin: builder.mutation({
      query: (data) => {
        //console.log(data);
        return {
          url: "/auth/login",
          method: "POST",
          body: data,
        };
      },
    }),
  }),
});

export const { useGetServicesQuery, useSignupMutation, useSigninMutation } =
  baseApi;
