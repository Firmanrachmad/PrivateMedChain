import { apiSlice } from "./apiSlice";
const USERS_URL = "http://localhost:5000/backend/users";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        credentials: "include",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
        credentials: "include",
      }),
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        credentials: "include",
        body: data,
      }),
    }),
    allUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/allusers`,
        method: "GET",
        credentials: "include",
      }),
    }),
    deleteUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/delete/${data._id}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),
    getUserId: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/get/${data._id}`,
        method: "GET",
        credentials: "include",
      }),
    }),
    updateUserId: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/update/${data._id}`,
        method: "PUT",
        credentials: "include",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUpdateUserMutation,
  useAllUserMutation,
  useDeleteUserMutation,
  useGetUserIdMutation,
  useUpdateUserIdMutation,
} = usersApiSlice;
