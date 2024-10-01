import { apiSlice } from "./apiSlice";
const USERS_URL = "https://bmb-nu.vercel.app/";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
        credentials: "include", // Include credentials (cookies) in the request
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
        credentials: "include", // Include credentials (cookies) in the request
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: data,
        credentials: "include", // Include credentials (cookies) in the request
      }),
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: data,
        credentials: "include", // Include credentials (cookies) in the request
      }),
    }),
    updateTotalIncome: builder.mutation({
      query: (totalIncome) => ({
        url: `${USERS_URL}/total`,
        method: "PUT",
        body: { totalIncome },
        credentials: "include", // Include credentials (cookies) in the request
      }),
    }),
    transferPoints: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/transfer-points`,
        method: "PUT",
        body: data,
        credentials: "include", // Include credentials (cookies) in the request
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
