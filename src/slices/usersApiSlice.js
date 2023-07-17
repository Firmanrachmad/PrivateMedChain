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
  }),
});

export const { useLoginMutation } = usersApiSlice;
