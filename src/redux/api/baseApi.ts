/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BaseQueryApi,
  BaseQueryFn,
  createApi,
  DefinitionType,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { toast } from "sonner";
import { RootState } from "../store";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.VITE_SERVER_URL as string,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithErrorHandling: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  try {
    const result = await baseQuery(args, api, extraOptions);

    if (result.error) {
      if (result.error.status === 401) {
        console.error("Unauthorized access. Please check your credentials.");
      } else if (result.error.status === 403) {
        console.error(
          "Forbidden. You do not have permission to access this resource."
        );
      } else if (result.error.status === 404) {
        toast.error("Resource not found.");
      } else if (result.error.status === 500) {
        console.error("Server error:", result.error);
        toast.error(
          "An unexpected server error occurred. Please try again later."
        );
      } else {
        console.error("An unexpected error occurred:", result.error);
        toast.error("An unexpected error occurred. Please try again.");
      }
    }

    return result;
  } catch (error) {
    console.error("An error occurred during the request:", error);
    toast.error("An error occurred. Please try again later.");
    throw error;
  }
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithErrorHandling,
  tagTypes: ["services", "bookings", "users", "slots", "reviews"],
  endpoints: () => ({}),
});

export default baseApi;
