import { apiSlice } from "./apiSlice";
const USERS_URL = "https://bmb-76h1.onrender.com/api/users";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        credentials: "include",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        credentials: "include",
        method: "POST",
        body: data,
      }),
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        credentials: "include",
        method: "PUT",
        body: data,
      }),
    }),
    updateTotalIncome: builder.mutation({
      query: (totalIncome) => ({
        url: `${USERS_URL}/total`,
        credentials: "include",
        method: "PUT",
        body: { totalIncome },
      }),
    }),
    transferPoints: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/transfer-points`,
        credentials: "include",
        method: "PUT",
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
  useUpdateTotalIncomeMutation,
  useTransferPointsMutation,
} = userApiSlice;
