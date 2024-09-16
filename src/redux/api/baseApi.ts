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
  baseUrl: "http://localhost:5000/api",
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      } else {
        console.error("An unexpected error occurred:", result.error);
      }
    }

    return result;
  } catch (error) {
    console.error("An error occurred during the request:", error);
    throw error;
  }
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithErrorHandling,
  tagTypes: ["services"],
  endpoints: () => ({}),
});

export default baseApi;
