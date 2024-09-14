import { baseApi } from "@/redux/api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
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

export const { useSigninMutation, useSignupMutation } = authApi;
