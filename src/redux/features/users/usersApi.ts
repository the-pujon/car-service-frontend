import { baseApi } from "@/redux/api/baseApi";

const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // For getting all users (typically an admin operation)
    getUsers: builder.query({
      query: () => ({
        url: "/auth/users",
        method: "GET",
      }),
      providesTags: ["users"],
    }),
    // For getting a single user by ID
    getUserById: builder.query({
      query: (id) => ({
        url: `/auth/users/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "users", id }],
    }),
    // For updating a user's profile
    updateUserProfile: builder.mutation({
      query: (data) => ({
        url: `/auth/update-profile`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "users", id }],
    }),
    // For deleting a user (typically an admin operation)
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/auth/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["users"],
    }),
    updateUserRole: builder.mutation({
      query: (data) => ({
        url: `/auth/update-role/${data.id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "users", id }],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserProfileMutation,
  useDeleteUserMutation,
  useUpdateUserRoleMutation,
} = usersApi;
