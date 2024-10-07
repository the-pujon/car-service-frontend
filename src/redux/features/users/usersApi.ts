import { baseApi } from "@/redux/api/baseApi";

const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: "/auth/users",
        method: "GET",
      }),
      providesTags: ["users"],
    }),
    getUserById: builder.query({
      query: (id) => ({
        url: `/auth/users/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "users", id }],
    }),
    updateUserProfile: builder.mutation({
      query: (data) => ({
        url: `/auth/update-profile`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "users", id }],
    }),
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
      invalidatesTags: (_result, _error, { id }) => [{ type: "users", id }],
    }),
    getUserByEmail: builder.query({
      query: (email) => ({
        url: `/auth/users/email/${email}`,
        method: "GET",
      }),
      providesTags: (_result, _error, email) => [{ type: "users", email }],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserProfileMutation,
  useDeleteUserMutation,
  useUpdateUserRoleMutation,
  useGetUserByEmailQuery,
} = usersApi;
